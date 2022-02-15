import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GCP_CLIENT_EMAIL,
  GCP_CLIENT_ID,
  GCP_PRIVATE_KEY,
  URLS_SPREADSHEET_ID,
} from "../../src/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GCP_CLIENT_EMAIL,
      client_id: GCP_CLIENT_ID,
      private_key: GCP_PRIVATE_KEY || "",
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
  const sheets = google.sheets({
    auth,
    version: "v4",
  });
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: URLS_SPREADSHEET_ID,
    range: "Sheet1!A2:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["Hello", "World"]],
    },
  });

  res.status(201).json({ response, result: "Feedback posted to spreadsheet!" });
}
