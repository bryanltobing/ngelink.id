import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GCP_CLIENT_EMAIL,
  GCP_CLIENT_ID,
  GCP_PRIVATE_KEY,
  URLS_SPREADSHEET_ID,
} from "../../src/server/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GCP_CLIENT_EMAIL,
      client_id: GCP_CLIENT_ID,
      private_key: GCP_PRIVATE_KEY,
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
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: URLS_SPREADSHEET_ID,
    ranges: ["Sheet1!A2:C"],
  });
  const data = response.data;
  const values = data.valueRanges?.[0].values;

  const urls = (values || []).map((_, index) => {
    return {
      shortUrl: values?.[index]?.[0],
      longUrl: values?.[index]?.[1],
    };
  });

  res.status(201).json(urls);
}
