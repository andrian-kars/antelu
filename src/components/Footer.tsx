import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { business, navLinks } from "@/data/constants";
import { localePath } from "@/i18n/config";
import { whatsAppUrl } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";
import { BrandLogo } from "./BrandLogo";

export default async function Footer() {
  const locale = await getLocale();
  const { footer, shell, contact } = getMessages(locale);
  return (
    <footer className="site-footer">
      <div className="page-width footer-grid">
        <div>
          <Link href={localePath(locale, "/")} aria-label={shell.home}>
            <BrandLogo />
          </Link>
          <p>
            {footer.tagline[0]}
            <br />
            {footer.tagline[1]}
          </p>
        </div>
        <div>
          <h2>{footer.visitUs}</h2>
          <address>
            {business.address}
            <br />
            {business.locality}
          </address>
          <p>{footer.hours}</p>
          <a
            className="text-link"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.locality}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={17} aria-hidden="true" /> {footer.directions}{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div>
          <h2>{footer.talk}</h2>
          <a className="footer-contact" href={business.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {business.phone}
          </a>
          <a
            className="text-link"
            href={whatsAppUrl(locale, contact)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {footer.writeWhatsApp} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="page-width footer-bottom">
        <small>© {new Date().getFullYear()} Antelu</small>
        <nav aria-label={shell.footerNavigation}>
          {navLinks.map(({ key, path }) => (
            <Link key={path} href={localePath(locale, path)}>
              {shell.nav[key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
