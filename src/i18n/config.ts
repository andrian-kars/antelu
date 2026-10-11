export const locales = ["es", "gl", "en", "uk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";
export const localeCookie = "NEXT_LOCALE";
export const suggestionCookie = "antelu_suggest";
export const hintDismissedCookie = "antelu_hint_dismissed";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  gl: "Galego",
  en: "English",
  uk: "Українська",
};

// "UA" is what Ukrainian sites show; the URL and hreflang still use the language code "uk".
export const localeShortNames: Record<Locale, string> = {
  es: "ES",
  gl: "GL",
  en: "EN",
  uk: "UA",
};

export const intlLocales: Record<Locale, string> = {
  es: "es-ES",
  gl: "gl-ES",
  en: "en-GB",
  uk: "uk-UA",
};

export const openGraphLocales: Record<Locale, string> = {
  es: "es_ES",
  gl: "gl_ES",
  en: "en_GB",
  uk: "uk_UA",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Prefixes a site path for a locale: Spanish keeps the original unprefixed URLs. */
export function localePath(locale: Locale, href: string) {
  if (locale === defaultLocale) return href;
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  return `/${locale}${path === "/" ? "" : path}${hash}`;
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localePath(locale, path)])),
    "x-default": path,
  };
}
