import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const SPREADSHEET_ID = "1xEJd1HFDeYHS5wQd__XAFLsz-cv_blDRkyfHYBHbQWI";
const CLIENT_ID = "107274073414535919114";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1vrQVzU8Rc/ZW\nW9fqdSpVfIouYPMSIHdMI2wZ3YsQXkfTRGQeMOm+bmnaJcJJPU2rH7muikVDTZtp\nOPfCcO7ef3C48sodMcGYdNaOUbwWdtClAZNPWZMTEj1YRd2P+mR4O4GREXK6lmfx\n55oCt2rRgeC7s01TmT1Ymn/Qxe9yJ5VJmkig/tLaOLgnf9W8m2xxLw0CfO4IVvm9\ntXMS6F39rPSw8b0hVH/O1OVFNsNGYaTvv0zdEY7vY5hEcEeXecpgo9gEXtkwMCPv\nC7xQRnhtBXatHV0lCKvflO4ysc6Vhxck7Likn4Fb4tS6B7FL2t/tEoNafAKlIbXl\n/X67OHX5AgMBAAECggEAC2oSvVvLn3j8+6eBBASfyAauVwNXwMexNmLzIxy64yhI\nsogVEaBYzdD5bO36Kcdj3V98te2RNAznudAOH3QgTHEMj1EQSI0bb4vG/eE8Qtzr\ndbGHovApQIVgvO6GX8iGDtcN6CKEZhuUI6k8DveeCdJyXtd//8QcCjiJ1n7X7v9Z\n+ykjpSpljtHDHHCeBRz19z9x5/D28wVwYsJytV9C3PYYAwenRVBDuRDwIVgBQAGt\nOmDBRlu2LKkyvo5mPk1f5E/dhBOrjnwV195flBPMD3uSx4CsMseR15zisM00di6J\nq1PdgKWYD66evbtKOi5BToL6O0OzjXQwP0IdAKjWAQKBgQD9Rs1SZP9hVvX5lArK\no3p+65MABoLrtLEcnRIZlUcpQvCxRTAuu6woKXEo6C8vq3h6cXyBaYp2qcyn9Wfb\ncQyFvKuNMOtOJfC1YFFAAZ6dgFKbZFwOvPsL7EXgh5vCBUticLaB5gKkjZVQu13j\nk8TrVZ0e7KYkgWpmwaq+fFK/8QKBgQC3sv7LDRllftMrKH8XLla5A+ecEu9hXRPd\nHXn1vTI7rnxD2T4N9rpwcRqEvgwkZbzOMMPvlI4HFR2RiW0heIy6NgWc7b+xt2yw\nvL2BYRrJDo5kq85C/xSNV6X8Jf4WTd6rYgRnuTIW8Tb5ZkfI5pQfFhKUDm4yp5ac\nzBtBcQmeiQKBgQCaMPJqyOXYgrJ44LG5L9ExV4VErLIjgPuaKd2NCZ4q9n/FzBNL\nQCHMyX4Eo2WmpcNQ96oOtwv+tdzMG9DAfZBcEsJ10GRQTTS/lwWf69x+klK4G18X\n8eD8HzljOeuPMN317hyN9FODjlZqsca0948YniRrYTK8YrU+HYUvNkzCYQKBgQCP\n7XqcdQL09s1U/0G0U+Y2x8xsCJnt2xN5J2MrGrWE9Uz/i/KG1k11U+jHIHA7BEtN\n8f9Scz5kZjLomJgcpWr9at4y+kQ7Zc+PGhIQkJh/9xux3Lqa22iq5YVzbgEKULCp\n7v4slnmcaBn+hhiwW5iqUozz2+qTXaMv7utb9sjmoQKBgQDr7+KrS8euoUjI+Lgo\nhA3XvCpW3pSRtJVCWMfR+mqqYCiN5rSK9fse94SUoWJHixHvqS4m7JkRf9YFbne5\nKu7kL5wHm4M05v03UEv5m9ZG997SYS5qzpfcuJCj2m9PaSX+LdNoBKRWKHt6xKsa\njWj7Unx9pP8qPpq5XUwQoFj3mw==\n-----END PRIVATE KEY-----\n";
const CLIENT_EMAIL = "ngelink@ngelink.iam.gserviceaccount.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      client_id: CLIENT_ID,
      private_key: PRIVATE_KEY,
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
    spreadsheetId: SPREADSHEET_ID,
    ranges: ["Sheet1!A2:C"],
  });
  const data = response.data;

  res.status(201).json({ data, result: "Feedback fetched successfully" });
}
