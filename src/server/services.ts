import { google } from "googleapis";

import {
  GCP_CLIENT_EMAIL,
  GCP_CLIENT_ID,
  GCP_PRIVATE_KEY,
  GCP_WRITE_SPREADSHEET_SCOPES,
} from "@server/constants";

export const googleAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GCP_CLIENT_EMAIL,
    client_id: GCP_CLIENT_ID,
    private_key: GCP_PRIVATE_KEY || "",
  },
  scopes: GCP_WRITE_SPREADSHEET_SCOPES,
});

export const googleSheets = google.sheets({
  auth: googleAuth,
  version: "v4",
});

export const writeToGoogleSpreadsheet = ({
  spreadsheetId,
  range,
  values,
}: {
  spreadsheetId: string;
  range: string;
  values: string[];
}) => {
  return googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
};

export const readFromGoogleSpreadsheet = ({
  spreadsheetId,
  ranges,
}: {
  spreadsheetId: string;
  ranges: string[];
}) => {
  return googleSheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
  });
};
