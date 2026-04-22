"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "Notre Histoire" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-stone-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Hamburger */}
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="md:hidden p-2 -ml-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Maison Kayser"
            width={120}
            height={40}
            className="h-8 w-auto dark:invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Cart icon */}
        <Link href="/boutique" className="p-2 -mr-2">
          <ShoppingBag className="size-5" />
        </Link>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-stone-200 bg-[#FAF9F6] px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-stone-700 border-b border-stone-100 last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
