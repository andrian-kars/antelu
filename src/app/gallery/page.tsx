import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { getWhatsAppUrl } from "@/data/constants";

export const metadata: Metadata = {
  title: "Galería | Antelu",
  description:
    "Paseos, coches, motos y caballitos: descubre los momentos de Antelu en nuestra galería de fotos.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    url: "/gallery",
    title: "Galería | Antelu",
    description: "Los pequeños grandes planes de Antelu, en imágenes.",
  },
};

export default function GalleryPage() {
  return (
    <main id="main" className="gallery-page page-width">
      <Link className="text-link back-link" href="/#vehicles">
        <ArrowLeft size={18} aria-hidden="true" /> Volver a los vehículos
      </Link>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Momentos Antelu</p>
          <h1>Pequeños grandes recuerdos.</h1>
          <p>Paseos, celebraciones y muchas formas de pasarlo bien.</p>
        </div>
        <a
          className="action action-primary"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prepara tu plan <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <Gallery />
    </main>
  );
}
