import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { business, getWhatsAppUrl, navLinks } from "@/data/constants";
import { BrandLogo } from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-grid">
        <div>
          <Link href="/" aria-label="Antelu, inicio">
            <BrandLogo />
          </Link>
          <p>
            Pequeños vehículos.
            <br />
            Grandes recuerdos.
          </p>
        </div>
        <div>
          <h2>Ven a conocernos</h2>
          <address>
            {business.address}
            <br />
            {business.locality}
          </address>
          <p>{business.hours}</p>
          <a
            className="text-link"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.locality}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={17} aria-hidden="true" /> Cómo llegar{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div>
          <h2>¿Hablamos?</h2>
          <a className="footer-contact" href={business.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {business.phone}
          </a>
          <a
            className="text-link"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbenos por WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="page-width footer-bottom">
        <small>© {new Date().getFullYear()} Antelu</small>
        <nav aria-label="Enlaces del pie">
          {navLinks.map(({ name, path }) => (
            <Link key={path} href={path}>
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
