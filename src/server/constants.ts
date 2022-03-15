export const URLS_SPREADSHEET_ID = process.env.URLS_SPREADSHEET_ID || "";
export const USERS_SPREADSHEET_ID = process.env.USERS_SPREADSHEET_ID || "";

export const GCP_CLIENT_ID = process.env.GCP_CLIENT_ID;
export const GCP_PRIVATE_KEY = process.env.GCP_PRIVATE_KEY;
export const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
export const GCP_WRITE_SPREADSHEET_SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
];
