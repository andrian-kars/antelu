import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { languageAlternates, localePath } from "@/i18n/config";
import { translated, whatsAppUrl } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";
import { galleryPhotos } from "@/lib/content";
import { socialMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = getMessages(locale);
  return {
    title: meta.galleryTitle,
    description: meta.galleryDescription,
    alternates: {
      canonical: localePath(locale, "/gallery"),
      languages: languageAlternates("/gallery"),
    },
    ...socialMetadata(locale, {
      title: meta.galleryTitle,
      description: meta.gallerySocialDescription,
      path: "/gallery",
    }),
  };
}

export default async function GalleryPage() {
  const locale = await getLocale();
  const messages = getMessages(locale);
  const { gallery } = messages;
  return (
    <main id="main" className="gallery-page page-width">
      <Link className="text-link back-link" href={localePath(locale, "/#vehicles")}>
        <ArrowLeft size={18} aria-hidden="true" /> {gallery.back}
      </Link>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h1>{gallery.title}</h1>
          <p>{gallery.text}</p>
        </div>
        <a
          className="action action-primary"
          href={whatsAppUrl(locale, messages.contact)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {gallery.action} <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <Gallery
        photos={galleryPhotos.map(({ src, width, height, alt }) => ({
          src,
          width,
          height,
          alt: translated(alt, locale),
        }))}
        labels={gallery.lightbox}
      />
    </main>
  );
}
