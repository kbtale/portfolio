import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "./locales";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value as Locale | undefined;
  const locale = locales.includes(cookieLocale as Locale) ? (cookieLocale as Locale) : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
