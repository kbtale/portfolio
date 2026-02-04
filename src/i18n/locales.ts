export const locales = ["en", "es", "it"] as const;
export type Locale = (typeof locales)[number];
