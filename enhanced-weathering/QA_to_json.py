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
    sheet = sh.worksheet("[Active] Quantification Approaches")
    data_dict = sheet.get_all_records()
    cols = [
        "type",
        "target",
        "tool",
        "category",
        "frequency",
        "notes",
        "comments",
        "references",
        "coverage_rock",
        "coverage_initial_weathering",
        "coverage_field",
        "coverage_watershed",
        "coverage_ocean",
        "coverage_counterfactual",
        "coverage_LCA",
        "coverage_impacts",
        "EW001_coverage_relationship",
        "EW001_coverage_citation",
        "EW001_coverage_comments",
        "EW002_coverage_relationship",
        "EW002_coverage_citation",
        "EW002_coverage_comments",
        "equilibrium",
        "carbon_parcel",
        "Eion",
        "UNDO",
        "Silicate",
        "Lithos",
        "YCNCC",
    ]
    df = pd.DataFrame(data_dict, columns=cols)
    # Drop first row containing comments
    df.drop(labels=0, inplace=True)
    df["id"] = df.index.astype(str)

    return df


def munge_qa_df(df: pd.DataFrame) -> pd.DataFrame:
    # import pdb; pdb.set_trace()
    df["type"] = df["type"].str.strip().str.split(", ")
    df["category"] = df["category"].str.strip().str.split(", ")
    df["frequency"] = df["frequency"].str.strip().str.split(", ")
    df["tool"] = df["tool"].str.strip()
    df["references"] = df["references"].str.split("; ")
    return df


def build_qa_schema(df: pd.DataFrame) -> dict:
    combined = []
    for index, row in df.iterrows():
        subschema = copy.deepcopy(qa_dict)

        subschema["id"] = row["id"]
        subschema["target"] = row["target"]
        subschema["tool"] = row["tool"]
        subschema["type"] = row["type"]
        subschema["category"] = row["category"]
        subschema["frequency"] = row["frequency"]
        subschema["notes"] = row["notes"]
        subschema["comments"] = row["comments"]
        subschema["references"] = row["references"]
        subschema["coverage"]["rock"] = row["coverage_rock"]
        subschema["coverage"]["initial_weathering"] = row["coverage_initial_weathering"]
        subschema["coverage"]["field"] = row["coverage_field"]
        subschema["coverage"]["watershed"] = row["coverage_watershed"]
        subschema["coverage"]["ocean"] = row["coverage_ocean"]
        subschema["coverage"]["lca"] = row["coverage_LCA"]
        subschema["coverage"]["impacts"] = row["coverage_impacts"]

        # Protocols:

        # EW001
        subschema["EW001"]["relationship"] = row["EW001_coverage_relationship"]
        subschema["EW001"]["citation"] = row["EW001_coverage_citation"]
        subschema["EW001"]["comments"] = row["EW001_coverage_comments"]

        # EW002
        subschema["EW002"]["relationship"] = row["EW002_coverage_relationship"]
        subschema["EW002"]["citation"] = row["EW002_coverage_citation"]
        subschema["EW002"]["comments"] = row["EW002_coverage_comments"]

        combined.append(subschema)
    return combined


def write_combined_protocol_list_json(combined_dict_list: list):
    sample_file = pathlib.Path("../data") / "QA.json"
    sample_file.parent.mkdir(exist_ok=True)
    with sample_file.open("w", encoding="utf-8") as fp:
        json.dump(combined_dict_list, fp, indent=4)


df = get_qa_df(gsheet_doc_name)
df = munge_qa_df(df)
combined = build_qa_schema(df)
write_combined_protocol_list_json(combined)
