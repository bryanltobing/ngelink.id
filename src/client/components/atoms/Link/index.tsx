import React from "react";
import { Link as LinkMUI, LinkProps as LinkMUIProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = Omit<LinkMUIProps, "href" | "classes"> &
  Pick<NextLinkProps, "href" | "as" | "prefetch">;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, as, prefetch, ...props }, ref) => (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <LinkMUI ref={ref} underline="hover" {...props} />
    </NextLink>
  )
);

Link.displayName = "Link";
