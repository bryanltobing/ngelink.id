import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { randomBytes, scryptSync } from "crypto";

import { USERS_SPREADSHEET_ID } from "@server/constants";
import { writeToGoogleSpreadsheet } from "@server/services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = uuidv4();
  const email = req.body.email;
  const password = scryptSync(
    req.body.password,
    randomBytes(16).toString("hex"),
    32
  ).toString("hex");
  const firstName = "Set Your";
  const lastName = "Name";
  const isEmailVerified = false;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  if (req.method === "POST") {
    try {
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

      res.send("User created");
    } catch (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    }
  } else {
    res.send("Not Found");
  }
};

export default handler;
