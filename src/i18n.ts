import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "es", "it"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "en";
  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
