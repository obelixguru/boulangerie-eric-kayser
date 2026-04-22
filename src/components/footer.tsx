import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-serif text-lg text-white uppercase tracking-wide">
            Eric Kayser
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Boulangerie artisanale de tradition depuis 1996. Pains au levain
            naturel et viennoiseries pur beurre.
          </p>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 mt-0.5 shrink-0 text-amber-500" />
            <span>226 Rue de Rivoli, 75001 Paris</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="size-4 mt-0.5 shrink-0 text-amber-500" />
            <span>Lun–Sam : 7h–20h · Dim : 7h30–19h</span>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="size-4 mt-0.5 shrink-0 text-amber-500" />
            <span>01 42 97 59 29</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/boutique" className="hover:text-white transition-colors">
            Boutique
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Notre Histoire
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Journal
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <div className="border-t border-stone-800 text-center text-xs text-stone-500 py-4">
        &copy; {new Date().getFullYear()} Eric Kayser Louvre-Rivoli. Tous droits
        réservés.
      </div>
    </footer>
  );
}
