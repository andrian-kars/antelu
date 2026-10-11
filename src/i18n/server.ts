import { lang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./config";
import { en } from "./messages/en";
import { es } from "./messages/es";
import { gl } from "./messages/gl";
import { uk } from "./messages/uk";

const messages = { es, gl, en, uk };

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function getSuggestionMessages() {
  return {
    es: es.suggestion,
    gl: gl.suggestion,
    en: en.suggestion,
    uk: uk.suggestion,
  };
}
