import type { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

import { hashPassword } from "@server/services";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = hashPassword(req.body.password);
    const firstName = "Set Your";
    const lastName = "Name";
    try {
      const userFound = await prisma.user.findUnique({ where: { email } });

      if (userFound) {
        throw new Error("EMAIL_IS_USED");
      }

      await prisma.user.create({
        data: { email, password, firstName, lastName },
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
