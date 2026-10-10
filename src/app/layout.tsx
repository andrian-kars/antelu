import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-sans-3";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { business } from "@/data/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: "Antelu | Vehículos infantiles de alquiler",
  description:
    "Coches, motos y caballitos infantiles de alquiler en Narón. Encuentra su favorito y consulta la disponibilidad con Antelu.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Antelu",
    title: "Antelu | Vehículos infantiles de alquiler",
    description: "Pequeños vehículos. Grandes recuerdos.",
  },
  twitter: { card: "summary_large_image" },
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className="antialiased">
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
