import type { MetadataRoute } from "next";
import { business } from "@/data/constants";
import { vehicles } from "@/data/vehicles";
import { languageAlternates, localePath, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, business.url).href;
  return ["/", "/gallery", ...vehicles.map(({ id }) => `/rent/${id}`)].flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([code, href]) => [
        code,
        absolute(href),
      ]),
    );
    return locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      alternates: { languages },
    }));
  });
}
