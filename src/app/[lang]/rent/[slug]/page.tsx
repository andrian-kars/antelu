import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Phone } from "lucide-react";
import Carousel from "@/components/Carousel";
import { CharacteristicsList } from "@/components/CharacteristicsList";
import { ReserveNowButton } from "@/components/ReserveNowButton";
import { business } from "@/data/constants";
import { languageAlternates, localePath } from "@/i18n/config";
import { fill, formatPrice, whatsAppUrl } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";
import { vehicles } from "@/lib/content";
import { ageLabel, categoryLabel, vehicleName } from "@/lib/vehicles";
import { socialMetadata } from "@/lib/metadata";

export const dynamicParams = false;

function getVehicle(slug: string) {
  const vehicle = vehicles.find((item) => item.id === slug);
  if (!vehicle) notFound();
  return vehicle;
}

export function generateStaticParams() {
  return vehicles.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/rent/[slug]">): Promise<Metadata> {
  const vehicle = getVehicle((await params).slug);
  const locale = await getLocale();
  const messages = getMessages(locale);
  const name = vehicleName(vehicle, locale);
  const title = fill(messages.meta.vehicleTitle, { name });
  const description = fill(messages.meta.vehicleDescription, { name });
  const path = `/rent/${vehicle.id}`;
  const image = {
    url: vehicle.images[0].src,
    width: vehicle.images[0].width,
    height: vehicle.images[0].height,
    alt: name,
  };
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    ...socialMetadata(locale, { title, description, path, images: [image] }),
  };
}

export default async function RentPage({ params }: PageProps<"/[lang]/rent/[slug]">) {
  const vehicle = getVehicle((await params).slug);
  const locale = await getLocale();
  const messages = getMessages(locale);
  const { vehicle: text } = messages;
  const { id, price, previousPrice, images, specs, type } = vehicle;
  const name = vehicleName(vehicle, locale);
  const deposit = formatPrice(business.deposit, locale);
  const enquiryUrl = whatsAppUrl(locale, messages.contact, { id, name });
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: text.breadcrumb,
        item: new URL(localePath(locale, "/"), business.url).href,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: new URL(localePath(locale, `/rent/${id}`), business.url).href,
      },
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
      <Link className="text-link back-link" href={localePath(locale, "/#vehicles")}>
        <ArrowLeft size={18} aria-hidden="true" /> {text.back}
      </Link>
      <div className="product-layout">
        <Carousel slides={images} name={name} labels={messages.carousel} />
        <div className="product-summary">
          <p className="eyebrow">
            {categoryLabel(type, messages)} · {ageLabel(vehicle, locale, messages)}
          </p>
          <h1>{name}</h1>
          <p className="product-price">
            {messages.vehicles.from} <strong>{formatPrice(price, locale)}</strong>{" "}
            {messages.vehicles.perDay}{" "}
            {previousPrice ? (
              <del>
                <span className="sr-only">{messages.vehicles.previousPrice}</span>
                {formatPrice(previousPrice, locale)}
              </del>
            ) : null}
          </p>
          <p className="product-intro">{text.intro}</p>
          <div className="product-enquiry">
            <ReserveNowButton
              whatsappUrl={enquiryUrl}
              description={name}
              messages={messages.contact}
            />
            <a className="text-link" href={business.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {business.phone}
            </a>
          </div>
          <a
            className="text-link whatsapp-direct"
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.whatsapp}
          </a>
          <div className="product-facts">
            <p>
              <CalendarDays size={18} aria-hidden="true" /> {text.dailyRental}
            </p>
            <p>
              <MapPin size={18} aria-hidden="true" /> {text.pickup}
            </p>
          </div>
        </div>
      </div>
      <div className="product-details">
        <section aria-labelledby="specifications">
          <p className="eyebrow">{text.specsEyebrow}</p>
          <h2 id="specifications">{text.specsTitle}</h2>
          <CharacteristicsList specs={specs} />
        </section>
        <section className="product-conditions" aria-labelledby="conditions">
          <p className="eyebrow">{text.conditionsEyebrow}</p>
          <h2 id="conditions">{text.conditionsTitle}</h2>
          <ul>
            {text.conditions.map((condition) => (
              <li key={condition}>{fill(condition, { deposit })}</li>
            ))}
          </ul>
          <p>{text.conditionsNote}</p>
        </section>
      </div>
    </main>
  );
}
