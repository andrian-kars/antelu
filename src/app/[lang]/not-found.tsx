import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { business } from "@/data/constants";
import { localePath } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = getMessages(await getLocale());
  return {
    metadataBase: new URL(business.url),
    title: meta.notFoundTitle,
    robots: { index: false },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const { notFound } = getMessages(locale);
  return (
    <main id="main" className="not-found page-width">
      <p className="eyebrow">{notFound.eyebrow}</p>
      <h1>{notFound.title}</h1>
      <p>{notFound.text}</p>
      <Link href={localePath(locale, "/#vehicles")} className="action action-primary">
        <ArrowLeft size={18} aria-hidden="true" /> {notFound.back}
      </Link>
    </main>
  );
}
