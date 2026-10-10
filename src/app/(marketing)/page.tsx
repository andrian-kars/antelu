import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleCatalogue } from "@/components/VehicleCatalogue";
import { business, formatPrice, getWhatsAppUrl } from "@/data/constants";
import { vehicles } from "@/data/vehicles";
import { gallery } from "@/data/gallery";
import { getAgeRange } from "@/lib/vehicles";
import QuestionsSection from "./_sections/QuestionsSection";

export const metadata: Metadata = {
  title: "Antelu | Alquiler de vehículos infantiles en Narón",
  description:
    "Coches eléctricos, motos, quads, tractores y caballitos infantiles de alquiler. Descubre los modelos y consulta tu alquiler con Antelu en Narón.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const highlights = [
    { type: "electric_car", label: "Coches", photoOf: "jeep-yellow", tone: "aqua" },
    { type: "motorbike", label: "Motos", photoOf: "moto-cross-red", tone: "yellow" },
    { type: "pony", label: "Caballitos", photoOf: "pony-small", tone: "coral" },
  ].map((highlight) => {
    const models = vehicles.filter(({ type }) => type === highlight.type);
    return {
      ...highlight,
      models: models.length,
      minPrice: Math.min(...models.map(({ price }) => price)),
      image: vehicles.find(({ id }) => id === highlight.photoOf)!.images[0],
    };
  });
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${business.url}/#business`,
      name: business.name,
      url: business.url,
      image: `${business.url}/opengraph-image.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Vehículos infantiles de Antelu",
      itemListElement: vehicles.map(({ id, name }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${business.url}/rent/${id}`,
      })),
    },
  ];
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="page-width">
            <p className="eyebrow">
              <MapPin size={15} aria-hidden="true" /> Antelu · Narón, A Coruña
            </p>
            <h1 id="hero-title">
              Vehículos infantiles
              <br />
              de alquiler.
            </h1>
            <p className="hero-description">
              Coches, motos y caballitos para sus pequeños grandes planes.
            </p>
            <div className="actions">
              <a className="action action-primary" href="#vehicles">
                Elige su vehículo <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a
                className="hero-contact text-link"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿Hablamos? <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <ul className="page-width hero-categories" aria-label="Categorías de vehículos">
          {highlights.map(({ type, label, tone, models, minPrice, image }) => (
            <li key={type}>
              <a
                className={`category-tile tone-${tone}`}
                href="#vehicles"
                data-category={type}
              >
                <span className="category-name">{label}</span>
                <span className="category-meta">
                  <span className="category-count">{models} modelos · </span>
                  desde {formatPrice(minPrice)}
                </span>
                <Image
                  className="category-image"
                  src={image}
                  alt=""
                  sizes="(max-width: 600px) 30vw, 400px"
                  loading="eager"
                />
                <ArrowRight className="category-arrow" size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <div className="intro-strip">
        <div className="page-width">
          <span>
            <CalendarDays size={19} aria-hidden="true" /> Alquiler por día
          </span>
          <span>
            <MapPin size={19} aria-hidden="true" /> Recogida en Narón
          </span>
          <span>
            <MessageCircle size={19} aria-hidden="true" /> Consulta por WhatsApp o
            teléfono
          </span>
        </div>
      </div>
      <section
        id="vehicles"
        className="catalogue section-space"
        aria-labelledby="catalogue-title"
      >
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Elige su próxima aventura</p>
              <h2 id="catalogue-title">¿Cuál será el suyo?</h2>
              <p>Encuentra su favorito. Los precios son por un día de alquiler.</p>
            </div>
            <span className="catalogue-note">
              Coches, motos y mucho más <ArrowDown size={18} aria-hidden="true" />
            </span>
          </div>
          <VehicleCatalogue
            items={vehicles.map((vehicle) => ({
              id: vehicle.id,
              type: vehicle.type,
              age: getAgeRange(vehicle),
            }))}
          >
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </VehicleCatalogue>
        </div>
      </section>
      <section
        id="info"
        className="rental-info section-space"
        aria-labelledby="rental-title"
      >
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Del catálogo a la diversión</p>
              <h2 id="rental-title">Un plan sencillo.</h2>
            </div>
            <a
              className="text-link"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulta tu alquiler <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ol className="rental-steps">
            <li>
              <span>01</span>
              <h3>Encuentra su favorito</h3>
              <p>Revisa la edad recomendada y las características de cada vehículo.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Cuéntanos tu plan</h3>
              <p>
                Contacta por teléfono o WhatsApp para acordar la fecha y confirmar
                disponibilidad.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Recoge y disfruta</h3>
              <p>
                Recoge el vehículo y devuélvelo en el lugar y la hora acordados. También
                puedes consultar la entrega con cargo adicional.
              </p>
            </li>
          </ol>
          <p className="rental-terms">
            Titular mayor de 18 años, DNI y fianza de {formatPrice(business.deposit)} por
            vehículo. La reserva se confirma directamente con Antelu.
          </p>
        </div>
      </section>
      <section className="gallery-teaser section-space">
        <div className="page-width gallery-teaser-inner">
          <div>
            <p className="eyebrow">Momentos Antelu</p>
            <h2>
              La diversión
              <br />
              tiene muchas formas.
            </h2>
            <p>
              Un paseo, un cumpleaños o un día en familia. Así se viven los pequeños
              grandes planes.
            </p>
            <Link className="action action-secondary" href="/gallery">
              Ver la galería <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <Link
            className="gallery-collage"
            href="/gallery"
            aria-label="Ver la galería de fotos de Antelu"
          >
            {[18, 8, 13].map((index) => (
              <Image
                key={index}
                src={gallery[index].image}
                alt=""
                sizes="(max-width: 700px) 60vw, 420px"
              />
            ))}
          </Link>
        </div>
      </section>
      <QuestionsSection />
      <section className="contact-band">
        <div className="page-width">
          <div>
            <p className="eyebrow">Estamos al otro lado</p>
            <h2>¿Preparamos su próximo plan?</h2>
          </div>
          <div className="actions">
            <a
              className="action action-primary"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href={business.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {business.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
