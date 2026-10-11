import type { Metadata } from "next";
import { localePath, openGraphLocales, type Locale } from "@/i18n/config";

type SocialImage = { url: string; width: number; height: number; alt: string };

// Page-level openGraph replaces the layout's, so every page builds the full object here.
export function socialMetadata(
  locale: Locale,
  {
    title,
    description,
    path,
    images,
  }: { title: string; description: string; path: string; images?: SocialImage[] },
): Pick<Metadata, "openGraph" | "twitter"> {
  const shared = images ?? [
    { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: title },
  ];
  return {
    openGraph: {
      type: "website",
      siteName: "Antelu",
      locale: openGraphLocales[locale],
      url: localePath(locale, path),
      title,
      description,
      images: shared,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shared.map(({ url }) => url),
    },
  };
}
