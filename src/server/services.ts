import { google } from "googleapis";
import { scryptSync, randomBytes } from "crypto";

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
    valueRenderOption: "FORMATTED_VALUE",
  });
};

export const readOneFromGoogleSpreadsheet = ({
  spreadsheetId,
  range,
}: {
  spreadsheetId: string;
  range: string;
}) => {
  return googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
};

const encryptPassowrd = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  return encryptPassowrd(password, salt) + salt;
};

/**
 * Match password against the stored hash
 */
export const matchPassword = (passowrd: string, hash: string): boolean => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassowrd(passowrd, salt);
  return originalPassHash === currentPassHash;
};
