"use client";

import { useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { business, navLinks } from "@/data/constants";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <nav className="page-width nav-row" aria-label="Navegación principal">
        <Link
          className="brand-link"
          href="/"
          aria-label="Antelu, inicio"
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </Link>
        <div className="desktop-links">
          {navLinks.map(({ name, path }) => (
            <Link key={path} href={path}>
              {name}
            </Link>
          ))}
        </div>
        <a className="header-phone" href={business.phoneHref}>
          <Phone size={17} aria-hidden="true" />
          <span>{business.phone}</span>
        </a>
        <button
          className="icon-button menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <nav
        className="mobile-links page-width"
        id="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!open}
      >
        {navLinks.map(({ name, path }) => (
          <Link key={path} href={path} onClick={() => setOpen(false)}>
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
