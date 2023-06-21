import json
import pathlib
from ast import literal_eval

import gspread  # type: ignore
import numpy as np
import pandas as pd  # type: ignore
from oauth2client.service_account import ServiceAccountCredentials  # type: ignore
from schemas import components_dict

# ------------------ Auth -----------------------


SECRET_FILE = str(pathlib.Path.home()) + "/keybase/google-sheets-key.json"
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)
gc = gspread.authorize(credentials)


gsheet_doc_name = "EW Protocol Review"


def get_component_df(gsheet_doc_name: str) -> pd.DataFrame:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet("Protocols")
    data_dict = sheet.get_all_records()
    cols = [
        "id",
        "entity",
        "protocol",
        "metadata_links",
        "metadata_year",
        "metadata_status",
        "metadata_notes",
        "metadata_comments",
        "timeline_application",
        "timeline_weathering",
        "timeline_registration",
        "timeline_measurement",
        "timeline_verification",
        "timeline_crediting",
        "practices_geographies",
        "practices_application_site",
        "practices_feedstock",
        "practices_notes",
        "practices_comments",
        "rigor_score",
        "rigor_regime",
        "rigor_rock_characterization",
        "rigor_initial_weathering",
        "rigor_field",
        "rigor_watershed",
        "rigor_ocean",
        "rigor_time_dynamics",
        "rigor_empirical_redundancy",
        "rigor_sampling_approach",
        "rigor_model_validation",
        "rigor_uncertainty",
        "rigor_lca",
        "rigor_notes",
        "rigor_comments",
        "additionality_score",
        "additionality_baseline",
        "additionality_counterfactual_carbonate_weathering",
        "additionality_tests",
        "additionality_notes",
        "additionality_comments",
        "safeguards_score",
        "safeguards_application",
        "safeguards_toxic_elements",
        "safeguards_soil_physical_properties",
        "safeguards_yield",
        "safeguards_notes",
        "safeguards_comments",
        "governance_score",
        "governance_credit_timing",
        "governance_data_transparency",
        "governance_model_transparency",
        "governance_learning_and_updates",
        "governance_notes",
        "governance_comments",
        "rating",
        "revisions",
    ]
    df = pd.DataFrame(data_dict, columns=cols)

    # drops rows not containing ID
    df = (
        df.replace("", np.nan)
        .dropna(axis=0, subset="id", how="any")
        .reset_index()
        .replace(np.nan, "")
    )
    df["metadata_year"] = df["metadata_year"].astype(int)
    return df


def _listify_links(df: pd.DataFrame) -> pd.DataFrame:
    """These lists are read in as strings, convert them to lists for json"""

    # replace any '' with empty list
    for col in df.columns:
        df[col].mask(df[col] == "", "[]", inplace=True)

    # convert stringified lists ie. '[]' or '[0,1,2]' to [] or [1,2,3]
    df["metadata_status"] = df["metadata_status"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_application"] = df["timeline_application"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_weathering"] = df["timeline_weathering"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_verification"] = df["timeline_verification"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_registration"] = df["timeline_registration"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_crediting"] = df["timeline_crediting"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["timeline_measurement"] = df["timeline_measurement"].apply(
        lambda d: literal_eval(d) if d[0] == "[" else d
    )
    df["rigor_field"] = df["rigor_field"].apply(lambda d: literal_eval(d) if d[0] == "[" else d)

    return df


def _split_links_components_df(df: pd.DataFrame) -> pd.DataFrame:
    """Data sheet contains lists of links and references formatted to markdown.
    Split these lists into individual elements and assign to new columns"""
    df["metadata_name"] = ""
    df["metadata_href"] = ""
    for index, row in df.iterrows():
        name_list = []
        href_list = []
        link_list = row["metadata_links"].split(", ")
        for val in link_list:
            split_val = val.split("](")
            name = split_val[0].strip("[")
            href = split_val[1].strip(")")
            name_list.append(name)
            href_list.append(href)
        df["metadata_name"].iloc[index] = name_list
        df["metadata_href"].iloc[index] = href_list
    df.drop(["metadata_links"], axis=1, inplace=True)
    return df


def _split_revisions_components_df(df: pd.DataFrame) -> pd.DataFrame:
    df["revisions_date"] = ""
    df["revisions_note"] = ""
    for index, row in df.iterrows():
        date_list = []
        note_list = []
        link_list = literal_eval(row["revisions"])
        for val in link_list:
            date_list.append(val["date"])
            note_list.append(val["note"])
        df["revisions_date"].iloc[index] = date_list[0]
        df["revisions_note"].iloc[index] = note_list[0]
    df.drop(["revisions"], axis=1, inplace=True)
    return df


def build_component_schema(df: pd.DataFrame) -> dict:
    import copy

    # Assign each piece of schema
    # Iterate through row by row and assign? yuck...
    # append to dict
    # return combined dict
    combined = []
    for index, row in df.iterrows():
        subschema = copy.deepcopy(components_dict)

        subschema["id"] = row["id"]
        subschema["entity"] = row["entity"]
        subschema["protocol"] = row["protocol"]
        subschema["metadata"]["links"]["name"] = row["metadata_name"]
        subschema["metadata"]["links"]["href"] = row["metadata_href"]
        subschema["metadata"]["year"] = row["metadata_year"]
        subschema["metadata"]["status"] = row["metadata_status"]
        subschema["metadata"]["notes"] = row["metadata_notes"]
        subschema["metadata"]["comments"] = row["metadata_comments"]

        subschema["timeline"]["application"] = row["timeline_application"]
        subschema["timeline"]["weathering"] = row["timeline_weathering"]
        subschema["timeline"]["registration"] = row["timeline_registration"]
        subschema["timeline"]["measurement"] = row["timeline_measurement"]
        subschema["timeline"]["verification"] = row["timeline_verification"]
        subschema["timeline"]["crediting"] = row["timeline_crediting"]

        subschema["practices"]["geographies"] = row["practices_geographies"]
        subschema["practices"]["application_site"] = row["practices_application_site"]
        subschema["practices"]["feedstock"] = row["practices_feedstock"]
        subschema["practices"]["notes"] = row["practices_notes"]
        subschema["practices"]["comments"] = row["practices_comments"]

        subschema["rigor"]["score"] = row["rigor_score"]
        subschema["rigor"]["details"]["regime"] = row["rigor_regime"]
        subschema["rigor"]["details"]["rock_characterization"] = row["rigor_rock_characterization"]
        subschema["rigor"]["details"]["initial_weathering"] = row["rigor_initial_weathering"]
        subschema["rigor"]["details"]["field"] = row["rigor_field"]
        subschema["rigor"]["details"]["watershed"] = row["rigor_watershed"]
        subschema["rigor"]["details"]["ocean"] = row["rigor_ocean"]
        subschema["rigor"]["details"]["time_dynamics"] = row["rigor_time_dynamics"]
        subschema["rigor"]["details"]["empirical_redundancy"] = row["rigor_empirical_redundancy"]
        subschema["rigor"]["details"]["sampling_approach"] = row["rigor_sampling_approach"]
        subschema["rigor"]["details"]["model_validation"] = row["rigor_model_validation"]
        subschema["rigor"]["details"]["uncertainty"] = row["rigor_uncertainty"]
        subschema["rigor"]["details"]["lca"] = row["rigor_lca"]

        subschema["rigor"]["details"]["notes"] = row["rigor_notes"]
        subschema["rigor"]["details"]["comments"] = row["rigor_comments"]

        subschema["additionality"]["score"] = row["additionality_score"]
        subschema["additionality"]["details"]["baseline"] = row["additionality_baseline"]
        subschema["additionality"]["details"]["counterfactual_carbonate_weathering"] = row[
            "additionality_counterfactual_carbonate_weathering"
        ]
        subschema["additionality"]["details"]["tests"] = row["additionality_tests"]
        subschema["additionality"]["details"]["notes"] = row["additionality_notes"]
        subschema["additionality"]["details"]["comments"] = row["additionality_comments"]

        subschema["safeguards"]["score"] = row["safeguards_score"]
        subschema["safeguards"]["details"]["application"] = row["safeguards_application"]
        subschema["safeguards"]["details"]["toxic_elements"] = row["safeguards_toxic_elements"]
        subschema["safeguards"]["details"]["soil_physical_properties"] = row[
            "safeguards_soil_physical_properties"
        ]
        subschema["safeguards"]["details"]["yield"] = row["safeguards_yield"]
        subschema["safeguards"]["details"]["notes"] = row["safeguards_notes"]
        subschema["safeguards"]["details"]["comments"] = row["safeguards_comments"]

        subschema["governance"]["score"] = row["governance_score"]
        subschema["governance"]["details"]["credit_timing"] = row["governance_credit_timing"]
        subschema["governance"]["details"]["data_transparency"] = row[
            "governance_data_transparency"
        ]
        subschema["governance"]["details"]["model_transparency"] = row[
            "governance_model_transparency"
        ]
        subschema["governance"]["details"]["learning_and_updates"] = row[
            "governance_learning_and_updates"
        ]
        subschema["governance"]["details"]["notes"] = row["governance_notes"]
        subschema["governance"]["details"]["comments"] = row["governance_comments"]

        subschema["rating"] = row["rating"]
        subschema["revisions"]["date"] = [row["revisions_date"]]
        subschema["revisions"]["note"] = [row["revisions_note"]]

        combined.append(subschema)

    return combined


def write_combined_protocol_list_json(combined_dict_list: list):
    sample_file = pathlib.Path("../data") / "protocols.json"
    sample_file.parent.mkdir(exist_ok=True)
    with sample_file.open("w", encoding="utf-8") as fp:
        # for val in combined_dict_list
        json.dump(combined_dict_list, fp, indent=4)


df = get_component_df(gsheet_doc_name)
df = _split_links_components_df(df)
df = _split_revisions_components_df(df)
df = _listify_links(df)
combined = build_component_schema(df)
write_combined_protocol_list_json(combined)
