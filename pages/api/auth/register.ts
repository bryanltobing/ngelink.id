import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { USERS_SPREADSHEET_ID } from "@server/constants";
import {
  hashPassword,
  readOneFromGoogleSpreadsheet,
  writeToGoogleSpreadsheet,
} from "@server/services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = uuidv4();
  const email = req.body.email;
  const password = hashPassword(req.body.password);
  const firstName = "Set Your";
  const lastName = "Name";
  const isEmailVerified = false;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const emailSheet = await readOneFromGoogleSpreadsheet({
    spreadsheetId: USERS_SPREADSHEET_ID,
    range: "Sheet1!B:B",
  });

  if (req.method === "POST") {
    try {
      if (
        (emailSheet.data.values?.flat() || []).find((value) => value === email)
      ) {
        throw new Error("EMAIL_IS_USED");
      }

      await writeToGoogleSpreadsheet({
        spreadsheetId: USERS_SPREADSHEET_ID,
        range: "Sheet1!A2:H",
        values: [
          id,
          email,
          password,
          firstName,
          lastName,
          isEmailVerified,
          createdAt,
          updatedAt,
        ],
      });

      res.send({
        meta: {
          status: "success",
          message: "USER_CREATED",
        },
        data: {},
      });
    } catch (err: unknown) {
      const errorMessage = (err as { message?: string }).message;

      res.send({
        meta: {
          status: "error",
          message: errorMessage ?? "SOMETHING_WENT_WRONG",
        },
        data: {},
      });
    }
  } else {
    res.send({
      meta: {
        status: "error",
        message: "NOT_FOUND",
      },
      data: {},
    });
  }
};

export default handler;
