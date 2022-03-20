import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@prismaClient";
import { omitKeys, validateToken } from "@helpers";

export const checkAuth = async (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) {
    throw new Error("INVALID_TOKEN");
  }
  const decodedToken = validateToken<DecodedToken>(token, "verify");
  if (!decodedToken.data) {
    throw new Error("INVALID_TOKEN");
  }
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.data.id },
  });
  if (!user) {
    throw new Error("INVALID_TOKEN");
  }
  const userWithoutPassword = omitKeys(user, ["password"]);

  return userWithoutPassword;
};
