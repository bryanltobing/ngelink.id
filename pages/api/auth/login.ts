import { NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { JWT_SECRET_KEY } from "@server/constants";
import { matchPassword } from "@server/services";

import { omitKeys } from "@helpers";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const userFound = await prisma.user.findUnique({ where: { email } });

      if (!userFound) {
        throw new Error("LOGIN_INVALID");
      }

      if (matchPassword(password, userFound.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: omitKeys(userFound, ["password", "createdAt", "updatedAt"]),
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

      res.status(403).send({
        meta: {
          status: "error",
          message: errorMessage ?? "SOMETHING_WENT_WRONG",
        },
        data: {},
      });
    }
  } else {
    res.status(400).send({
      meta: {
        status: "error",
        message: "NOT_FOUND",
      },
      data: {},
    });
  }
};

export default handler;
