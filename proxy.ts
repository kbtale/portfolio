import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./src/i18n/locales";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\..*).*)"],
};
