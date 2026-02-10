import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { locales, type Locale } from "./locales";

export default getRequestConfig(async () => {
  const store = await cookies();
  let locale: Locale = "en";

  const cookieLocale = store.get("locale")?.value as Locale | undefined;
  
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Attempt to detect from headers
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    
    if (acceptLanguage) {
      // Parse accept-language: "es-VE,es;q=0.9,en;q=0.8"
      const preferredLocales = acceptLanguage.split(",").map(lang => {
        const [code] = lang.split(";"); // Remove quality factor
        return code.trim();
      });

      for (const pref of preferredLocales) {
        // Check exact match or base language match (es-VE -> es)
        const baseLang = pref.split("-")[0]; 
        // Cast to Locale to check inclusion safely
        if (locales.includes(baseLang as Locale)) {
          locale = baseLang as Locale;
          break;
        }
      }
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
