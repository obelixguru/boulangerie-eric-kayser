import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eric Kayser Louvre-Rivoli | Boulangerie Artisanale Paris",
    template: "%s | Eric Kayser Louvre-Rivoli",
  },
  description:
    "Pains au levain naturel et viennoiseries pur beurre. Commandez en ligne, retirez au Louvre-Rivoli. Boulangerie artisanale premium Paris 1er.",
  metadataBase: new URL("https://boulangerie-eric-kayser-louvre-rivo.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh flex flex-col font-sans antialiased bg-[#FAF9F6] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
