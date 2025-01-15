"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/data/constants";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleOpenNav = () => {
    setIsNavOpen(true);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <header className="flex py-4 md:py-6 shadow-xl sticky top-0 w-full z-50 bg-background/95">
        <nav className="flex items-center container font-semibold">
          <Link
            href="/"
            className="mr-auto hover:text-gray-600 active:text-gray-600 focus:text-gray-600 transition focus:outline-none"
          >
            <BrandLogo onClick={handleCloseNav} />
          </Link>
          <ul className="gap-10 hidden md:flex">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  className="text-lg hover:text-gray-600 active:text-gray-600 focus:text-gray-600 transition focus:outline-none"
                  href={path}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex md:hidden">
            {isNavOpen ? (
              <X
                size={28}
                className="cursor-pointer"
                onClick={handleCloseNav}
              />
            ) : (
              <Menu
                size={28}
                className="cursor-pointer"
                onClick={handleOpenNav}
              />
            )}
          </div>
        </nav>
      </header>
      <div
        className={cn(
          isNavOpen ? "flex" : "hidden",
          "fixed top-14 right-0 bottom-0 left-0 z-40 bg-background/95"
        )}
      >
        <ul className="w-full flex flex-col items-center justify-center gap-4">
          {navLinks.map(({ name, path }) => (
            <li key={name} className="border-b border-gray-400 uppercase">
              <Link
                className="text-lg font-semibold"
                href={path}
                onClick={handleCloseNav}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
