import copy
import json
import pathlib

import gspread  # type: ignore
import pandas as pd  # type: ignore
from oauth2client.service_account import ServiceAccountCredentials  # type: ignore
from schemas import qa_dict

# ------------------ Auth -----------------------


SECRET_FILE = str(pathlib.Path.home()) + "/keybase/google-sheets-key.json"
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)
gc = gspread.authorize(credentials)


gsheet_doc_name = "EW Protocol Review"


def get_qa_df(gsheet_doc_name: str) -> pd.DataFrame:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet("[ACTIVE] Quantification Approaches")
    data_dict = sheet.get_all_records()
    cols = [
        "variable",
        "method",
        "type",
        "category",
        "transient",
        "impacts",
        "notes",
        "comments",
        "references",
        "carbon_rock",
        "carbon_initial_weathering",
        "carbon_field",
        "carbon_watershed",
        "carbon_ocean",
    ]

    df = pd.DataFrame(data_dict, columns=cols)

    # Drop first row containing comments
    df.drop(labels=0, inplace=True)

    # df["id"] = df.index.astype(str)

    return df


def munge_qa_df(df: pd.DataFrame) -> pd.DataFrame:
    # apply string stripping to every col
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    df["type"] = df["type"].str.strip().str.split(", ")
    df["category"] = df["category"].str.strip().str.split(", ")
    df["transient"] = df["transient"].str.strip()
    df["impacts"] = df["impacts"].str.strip().str.split(", ")

    # splits each row into seperate refs, then splits each ref into name, href
    def parse_refs(ref_row):
        if ref_row == [""]:
            return []
        else:
            ref_item = [
                (ref + ")" if i != len(ref_row) - 1 else ref).strip()
                for i, ref in enumerate(ref_row)
            ]
            return [
                {
                    "name": ref.split("](")[0][1:],
                    "href": len(ref.split("](")) > 1 and ref.split("](")[1][:-1],
                }
                for ref in ref_item
            ]

    df["references"] = df["references"].str.split(r"\),").apply(parse_refs)

    return df


def build_qa_schema(df: pd.DataFrame) -> dict:
    combined = []
    for index, row in df.iterrows():
        subschema = copy.deepcopy(qa_dict)

        subschema["quant_approach"]["variable"] = row["variable"]
        subschema["quant_approach"]["method"] = row["method"]
        subschema["quant_approach"]["type"] = row["type"]
        subschema["quant_approach"]["category"] = row["category"]
        subschema["quant_approach"]["transient"] = row["transient"]
        subschema["quant_approach"]["impacts"] = row["impacts"]
        subschema["quant_approach"]["notes"] = row["notes"]
        subschema["quant_approach"]["comments"] = row["comments"]
        subschema["quant_approach"]["references"] = row["references"]
        subschema["quant_approach"]["coverage"]["rock"] = row["carbon_rock"]
        subschema["quant_approach"]["coverage"]["init_weathering"] = row[
            "carbon_initial_weathering"
        ]
        subschema["quant_approach"]["coverage"]["field"] = row["carbon_field"]
        subschema["quant_approach"]["coverage"]["watershed"] = row["carbon_watershed"]
        subschema["quant_approach"]["coverage"]["ocean"] = row["carbon_ocean"]

        # if one of these columns contains any [''], they are replaced with empty lists
        for list_col in ["type", "category", "impacts", "references"]:
            if subschema["quant_approach"][list_col] == [""]:
                subschema["quant_approach"][list_col] = []

        combined.append(subschema)

    return combined


def write_combined_list_json(combined_dict_list: list):
    sample_file = pathlib.Path("../public/research/ew-quantification") / "quant-methods.json"
    sample_file.parent.mkdir(exist_ok=True)
    with sample_file.open("w", encoding="utf-8") as fp:
        json.dump(combined_dict_list, fp, indent=4)


def get_legend_df(gsheet_doc_name: str) -> pd.DataFrame:
    # Retrieve legend sheet and convert to DataFrame

    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet("[ACTIVE] Legend")
    data_dict = sheet.get_all_records()
    cols = ["key", "value"]

    df = pd.DataFrame(data_dict, columns=cols)
    df["key"] = df["key"].str.strip()
    df["value"] = df["value"].str.strip()

    return df


def write_legend_df(df: pd.DataFrame):
    # Write legend dataframe to json
    sample_file = pathlib.Path("../public/research/ew-quantification") / "legend.json"
    df.set_index("key")["value"].to_json(sample_file, indent=4)


ldf = get_legend_df(gsheet_doc_name)
write_legend_df(ldf)
df = get_qa_df(gsheet_doc_name)
df = munge_qa_df(df)
combined = build_qa_schema(df)
write_combined_list_json(combined)
