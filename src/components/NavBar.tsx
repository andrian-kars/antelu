"use client";

import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { name: "Vehículos", path: "/#vehicles" },
  { name: "Información", path: "/#info" },
  { name: "Galería", path: "/gallery" },
];

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header className="flex py-6 shadow-xl sticky top-0 w-full z-50 bg-background/95">
      <nav className="flex items-center container font-semibold">
        <Link href="/" className="mr-auto">
          <BrandLogo />
        </Link>
        <ul className="gap-10 hidden md:flex">
          {LINKS.map(({ name, path }) => (
            <li key={name}>
              <Link className="text-lg" href={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex md:hidden">
          {isNavOpen ? (
            <X size={32} className="cursor-pointer" onClick={handleToggleNav} />
          ) : (
            <Menu
              size={32}
              className="cursor-pointer"
              onClick={handleToggleNav}
            />
          )}

          {createPortal(
            <div
              className={cn(
                isNavOpen ? "flex" : "hidden",
                "fixed top-0 right-0 bottom-0 left-0 min-h-screen z-40 bg-white"
              )}
            >
              <ul className="w-full flex flex-col items-center justify-center gap-10">
                {LINKS.map(({ name, path }) => (
                  <li key={name} className="border-b border-gray-400 uppercase">
                    <Link
                      className="text-lg font-semibold"
                      href={path}
                      onClick={handleToggleNav}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )}
        </div>
      </nav>
    </header>
  );
}
