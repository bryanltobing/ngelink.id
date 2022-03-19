import { NextResponse } from "next/server";

import type { NextMiddleware } from "next/server";

export const middleware: NextMiddleware = (req, ev) => {
  const { next, redirect } = NextResponse;

  const pageName = req.page.name || "";
  const token = (req.cookies as { "ngelink-token"?: string })["ngelink-token"];
  const authPageUrls = ["/login", "/register"];

  if (authPageUrls.includes(pageName)) {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return redirect(url, 307);
    }
  } else {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return redirect(url, 307);
    }
  }

  return next();
};
