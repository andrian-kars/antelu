import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  hintDismissedCookie,
  isLocale,
  localeCookie,
  localePath,
  suggestionCookie,
  type Locale,
} from "@/i18n/config";

const automaticLocales: Locale[] = ["en", "uk"];
const crawlers =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|embedly|lighthouse/i;

/** Supported languages from Accept-Language, most preferred first. */
function browserLocales(header: string | null): Locale[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part, order) => {
      const [tag, ...parameters] = part.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      return {
        locale: tag.trim().toLowerCase().split("-")[0],
        weight: quality ? Number(quality.trim().slice(2)) : 1,
        order,
      };
    })
    .filter(({ weight }) => weight > 0)
    .sort((a, b) => b.weight - a.weight || a.order - b.order)
    .map(({ locale }) => locale)
    .filter(isLocale);
}

/** English and Ukrainian browsers switch automatically unless they also read Spanish or Galician. */
function automaticLocale(preferred: Locale[]) {
  if (preferred.some((locale) => locale === "es" || locale === "gl")) return null;
  return preferred.find((locale) => automaticLocales.includes(locale)) ?? null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  // Spanish pages live under /es internally; canonical tags point to the unprefixed URLs.
  if (segment === defaultLocale) return NextResponse.next();

  const pageLocale: Locale = isLocale(segment) ? segment : defaultLocale;
  const saved = request.cookies.get(localeCookie)?.value;
  const preferred = browserLocales(request.headers.get("accept-language"));
  const isCrawler = crawlers.test(request.headers.get("user-agent") ?? "");

  if (pageLocale === defaultLocale && !isCrawler) {
    const target = isLocale(saved) ? saved : automaticLocale(preferred);
    if (target && target !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = localePath(target, pathname);
      const response = NextResponse.redirect(url, 307);
      response.headers.set("Vary", "Accept-Language, Cookie");
      return response;
    }
  }

  const rewrite = request.nextUrl.clone();
  rewrite.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response =
    pageLocale === defaultLocale ? NextResponse.rewrite(rewrite) : NextResponse.next();

  const suggestion =
    !isCrawler &&
    !isLocale(saved) &&
    !request.cookies.has(hintDismissedCookie) &&
    preferred[0] &&
    preferred[0] !== pageLocale
      ? preferred[0]
      : null;
  if (suggestion) {
    response.cookies.set(suggestionCookie, suggestion, { path: "/", sameSite: "lax" });
  } else if (request.cookies.has(suggestionCookie)) {
    response.cookies.delete(suggestionCookie);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
