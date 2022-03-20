import { NextApiRequest, NextApiResponse } from "next";

import { checkAuth } from "@server/middlewares";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await checkAuth(req);

    res.send({
      meta: {
        status: "success",
        message: "PROFILE_FETCHED_SUCCESS",
      },
      data: { ...user },
    });
  } catch (err) {
    const errorMessage = (err as { message?: string }).message;
    res.send({
      meta: {
        status: "error",
        message: errorMessage ?? "SOMETHING_WENT_WRONG",
      },
      data: {},
    });
  }
};

export default handler;
