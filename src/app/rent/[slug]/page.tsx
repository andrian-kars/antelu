import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Phone } from "lucide-react";
import Carousel from "@/components/Carousel";
import { CharacteristicsList } from "@/components/CharacteristicsList";
import { ReserveNowButton } from "@/components/ReserveNowButton";
import { vehicles } from "@/data/vehicles";
import { business, formatPrice, getWhatsAppUrl } from "@/data/constants";
import { getAgeRange, getCategoryLabel } from "@/lib/vehicles";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

function getVehicle(slug: string) {
  const vehicle = vehicles.find((item) => item.id === slug);
  if (!vehicle) notFound();
  return vehicle;
}

export function generateStaticParams() {
  return vehicles.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = getVehicle((await params).slug);
  const title = `${vehicle.name} de alquiler | Antelu`;
  const description = `Descubre ${vehicle.name}: fotos, características y alquiler por día. Consulta la disponibilidad con Antelu en Narón.`;
  const url = `/rent/${vehicle.id}`;
  const image = {
    url: vehicle.images[0].src,
    width: vehicle.images[0].width,
    height: vehicle.images[0].height,
    alt: vehicle.name,
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [image],
      locale: "es_ES",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function RentPage({ params }: Props) {
  const vehicle = getVehicle((await params).slug);
  const { id, name, price, discount, images, characteristics, type } = vehicle;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vehículos", item: business.url },
      { "@type": "ListItem", position: 2, name, item: `${business.url}/rent/${id}` },
    ],
  };

  return (
    <main id="main" className="product-page page-width">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
      <Link className="text-link back-link" href="/#vehicles">
        <ArrowLeft size={18} aria-hidden="true" /> Todos los vehículos
      </Link>
      <div className="product-layout">
        <Carousel slides={images} name={name} />
        <div className="product-summary">
          <p className="eyebrow">
            {getCategoryLabel(type)} · {getAgeRange(vehicle)?.label}
          </p>
          <h1>{name}</h1>
          <p className="product-price">
            Desde <strong>{formatPrice(price)}</strong> / día{" "}
            {discount ? (
              <del>
                <span className="sr-only">Precio anterior: </span>
                {formatPrice(discount)}
              </del>
            ) : null}
          </p>
          <p className="product-intro">
            Un vehículo para su próximo gran plan. Consulta la fecha que tienes en mente y
            confirmaremos contigo el alquiler.
          </p>
          <div className="product-enquiry">
            <ReserveNowButton vehicle={{ id, name }} />
            <a className="text-link" href={business.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {business.phone}
            </a>
          </div>
          <a
            className="text-link whatsapp-direct"
            href={getWhatsAppUrl({ id, name })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
          <div className="product-facts">
            <p>
              <CalendarDays size={18} aria-hidden="true" /> Alquiler por día
            </p>
            <p>
              <MapPin size={18} aria-hidden="true" /> Recogida en el C. C. Odeón, Narón
            </p>
          </div>
        </div>
      </div>
      <div className="product-details">
        <section aria-labelledby="specifications">
          <p className="eyebrow">Conoce el vehículo</p>
          <h2 id="specifications">Características</h2>
          <CharacteristicsList characteristics={characteristics} isFull />
        </section>
        <section className="product-conditions" aria-labelledby="conditions">
          <p className="eyebrow">Antes de salir</p>
          <h2 id="conditions">Tu alquiler</h2>
          <ul>
            <li>La reserva se confirma directamente con Antelu.</li>
            <li>Fianza de {formatPrice(business.deposit)} por vehículo.</li>
            <li>La persona titular debe ser mayor de 18 años y presentar su DNI.</li>
            <li>Recogida y devolución en el lugar y horario acordados.</li>
            <li>Consulta las condiciones de entrega con cargo adicional.</li>
          </ul>
          <p>
            Comprueba la edad recomendada, la carga máxima y las condiciones de uso antes
            del alquiler.
          </p>
        </section>
      </div>
    </main>
  );
}
