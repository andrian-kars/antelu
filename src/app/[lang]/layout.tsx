import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";
import "@fontsource-variable/source-sans-3";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { LanguageSuggestion } from "@/components/LanguageSuggestion";
import NavBar from "@/components/NavBar";
import { business } from "@/data/constants";
import { locales } from "@/i18n/config";
import { getLocale, getMessages, getSuggestionMessages } from "@/i18n/server";
import { socialMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = getMessages(locale);
  return {
    metadataBase: new URL(business.url),
    title: meta.siteTitle,
    description: meta.siteDescription,
    ...socialMetadata(locale, {
      title: meta.siteTitle,
      description: meta.socialDescription,
      path: "/",
    }),
    robots:
      process.env.VERCEL_ENV === "preview"
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const messages = getMessages(locale);
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className="antialiased">
        <a className="skip-link" href="#main">
          {messages.shell.skipLink}
        </a>
        <NavBar locale={locale} messages={messages.shell} />
        {children}
        <Footer />
        <LanguageSuggestion locale={locale} messages={getSuggestionMessages()} />
      </body>
    </html>
  );
}
