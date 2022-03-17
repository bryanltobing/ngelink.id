import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, USERS_SPREADSHEET_ID } from "@server/constants";
import { matchPassword, readFromGoogleSpreadsheet } from "@server/services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;

    const emailPasswordRows = await readFromGoogleSpreadsheet({
      spreadsheetId: USERS_SPREADSHEET_ID,
      ranges: ["Sheet1!A2:C"],
    });

    const emailPasswordValues = emailPasswordRows.data.valueRanges?.[0].values;

    const emailPasswordList: { email: string; password: string }[] =
      emailPasswordRows.data.valueRanges?.[0].values?.map((value, index) => {
        return {
          id: emailPasswordValues?.[index][0],
          email: emailPasswordValues?.[index][1],
          password: emailPasswordValues?.[index][2],
        };
      }) || [];

    try {
      const result = emailPasswordList.find((list) => list.email === email);

      if (!result) {
        throw new Error("LOGIN_INVALID");
      }

      if (matchPassword(password, result.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: result,
          },
          JWT_SECRET_KEY
        );
        res.send({
          meta: {
            status: "success",
            message: "LOGIN_SUCCESS",
          },
          data: { token },
        });
      } else {
        throw new Error("LOGIN_INVALID");
      }
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
