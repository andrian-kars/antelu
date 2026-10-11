"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { business, navLinks } from "@/data/constants";
import {
  localeCookie,
  localeNames,
  localePath,
  localeShortNames,
  locales,
  type Locale,
} from "@/i18n/config";
import type { Messages } from "@/i18n/messages/es";

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function LanguageLinks({ locale, basePath }: { locale: Locale; basePath: string }) {
  return locales.map((code) => (
    <a
      key={code}
      href={localePath(code, basePath)}
      lang={code}
      hrefLang={code}
      aria-current={code === locale ? "true" : undefined}
      onClick={() => rememberLocale(code)}
    >
      {localeNames[code]}
    </a>
  ));
}

function LanguageMenu({
  locale,
  label,
  basePath,
}: {
  locale: Locale;
  label: string;
  basePath: string;
}) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) {
        menu.current.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      className="language-menu"
      ref={menu}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          menu.current.open = false;
          menu.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <Globe size={17} aria-hidden="true" />
        <span>{localeShortNames[locale]}</span>
        <span className="sr-only">
          , {label}: {localeNames[locale]}
        </span>
      </summary>
      <div className="language-options" role="group" aria-label={label}>
        <LanguageLinks locale={locale} basePath={basePath} />
      </div>
    </details>
  );
}

export default function NavBar({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["shell"];
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const basePath = `/${useSelectedLayoutSegments().join("/")}`;

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
      <nav className="page-width nav-row" aria-label={messages.mainNavigation}>
        <Link
          className="brand-link"
          href={localePath(locale, "/")}
          aria-label={messages.home}
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </Link>
        <div className="desktop-links">
          {navLinks.map(({ key, path }) => (
            <Link key={path} href={localePath(locale, path)}>
              {messages.nav[key]}
            </Link>
          ))}
        </div>
        <LanguageMenu locale={locale} label={messages.language} basePath={basePath} />
        <a className="header-phone" href={business.phoneHref}>
          <Phone size={17} aria-hidden="true" />
          <span>{business.phone}</span>
        </a>
        <button
          className="icon-button menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? messages.closeMenu : messages.openMenu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <nav
        className="mobile-links page-width"
        id="mobile-navigation"
        aria-label={messages.mobileNavigation}
        hidden={!open}
      >
        {navLinks.map(({ key, path }) => (
          <Link key={path} href={localePath(locale, path)} onClick={() => setOpen(false)}>
            {messages.nav[key]}
          </Link>
        ))}
        <div className="mobile-languages" role="group" aria-label={messages.language}>
          <LanguageLinks locale={locale} basePath={basePath} />
        </div>
      </nav>
    </header>
  );
}
