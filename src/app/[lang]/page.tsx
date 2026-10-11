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
} from "lucide-react";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleCatalogue } from "@/components/VehicleCatalogue";
import { business } from "@/data/constants";
import { vehicles } from "@/data/vehicles";
import { gallery } from "@/data/gallery";
import { languageAlternates, localePath } from "@/i18n/config";
import { fill, formatPrice, plural, whatsAppUrl } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";
import { getAgeRange, vehicleName } from "@/lib/vehicles";
import { skeleton } from "@/lib/skeleton";
import { socialMetadata } from "@/lib/metadata";
import QuestionsSection from "./_sections/QuestionsSection";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = getMessages(locale);
  return {
    title: meta.homeTitle,
    description: meta.homeDescription,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: languageAlternates("/"),
    },
    ...socialMetadata(locale, {
      title: meta.homeTitle,
      description: meta.homeDescription,
      path: "/",
    }),
  };
}

const highlights = [
  { type: "electric_car", photoOf: "jeep-yellow", tone: "aqua" },
  { type: "motorbike", photoOf: "moto-cross-red", tone: "yellow" },
  { type: "pony", photoOf: "pony-small", tone: "coral" },
].map((highlight) => {
  const models = vehicles.filter(({ type }) => type === highlight.type);
  return {
    ...highlight,
    models: models.length,
    minPrice: Math.min(...models.map(({ price }) => price)),
    image: vehicles.find(({ id }) => id === highlight.photoOf)!.images[0],
  };
});

export default async function HomePage() {
  const locale = await getLocale();
  const messages = getMessages(locale);
  const { home } = messages;
  const generalWhatsApp = whatsAppUrl(locale, messages.contact);
  const deposit = formatPrice(business.deposit, locale);
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
      name: messages.meta.itemList,
      itemListElement: vehicles.map((vehicle, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: vehicleName(vehicle, messages),
        url: new URL(localePath(locale, `/rent/${vehicle.id}`), business.url).href,
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
              <MapPin size={15} aria-hidden="true" /> {home.location}
            </p>
            <h1 id="hero-title">
              {home.heroTitle[0]}
              <br />
              {home.heroTitle[1]}
            </h1>
            <p className="hero-description">{home.heroDescription}</p>
            <div className="actions">
              <a className="action action-primary" href="#vehicles">
                {home.chooseVehicle} <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a
                className="hero-contact text-link"
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {home.talk} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <ul className="page-width hero-categories" aria-label={home.categoriesLabel}>
          {highlights.map(({ type, tone, models, minPrice, image }) => (
            <li key={type}>
              <a
                className={`category-tile tone-${tone}`}
                href="#vehicles"
                data-category={type}
              >
                <span className="category-name">
                  {messages.vehicles.categories[type]}
                </span>
                <span className="category-meta">
                  <span className="category-count">
                    {plural(locale, home.tileModels, models)}
                  </span>
                  {fill(home.tileFrom, { price: formatPrice(minPrice, locale) })}
                </span>
                <Image
                  className="category-image"
                  src={image}
                  alt=""
                  placeholder={skeleton(image)}
                  style={{ objectFit: "contain" }}
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
            <CalendarDays size={19} aria-hidden="true" /> {home.strip[0]}
          </span>
          <span>
            <MapPin size={19} aria-hidden="true" /> {home.strip[1]}
          </span>
          <span>
            <MessageCircle size={19} aria-hidden="true" /> {home.strip[2]}
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
              <p className="eyebrow">{home.catalogueEyebrow}</p>
              <h2 id="catalogue-title">{home.catalogueTitle}</h2>
              <p>{home.catalogueDescription}</p>
            </div>
            <span className="catalogue-note">
              {home.catalogueNote} <ArrowDown size={18} aria-hidden="true" />
            </span>
          </div>
          <VehicleCatalogue
            locale={locale}
            messages={messages.catalogue}
            categories={messages.vehicles.categories}
            items={vehicles.map((vehicle) => ({
              id: vehicle.id,
              type: vehicle.type,
              age: getAgeRange(vehicle),
            }))}
          >
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                locale={locale}
                messages={messages}
              />
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
              <p className="eyebrow">{home.infoEyebrow}</p>
              <h2 id="rental-title">{home.infoTitle}</h2>
            </div>
            <a
              className="text-link"
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {home.infoAction} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ol className="rental-steps">
            {home.steps.map(({ title, text }, index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="rental-terms">{fill(home.terms, { deposit })}</p>
        </div>
      </section>
      <section className="gallery-teaser section-space">
        <div className="page-width gallery-teaser-inner">
          <div>
            <p className="eyebrow">{home.galleryEyebrow}</p>
            <h2>
              {home.galleryTitle[0]}
              <br />
              {home.galleryTitle[1]}
            </h2>
            <p>{home.galleryText}</p>
            <Link
              className="action action-secondary"
              href={localePath(locale, "/gallery")}
            >
              {home.galleryAction} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <Link
            className="gallery-collage"
            href={localePath(locale, "/gallery")}
            aria-label={home.galleryLink}
          >
            {[18, 8, 13].map((index) => (
              <Image
                key={index}
                src={gallery[index].image}
                alt=""
                placeholder={skeleton(gallery[index].image)}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 700px) 60vw, 420px"
              />
            ))}
          </Link>
        </div>
      </section>
      <QuestionsSection eyebrow={home.faqEyebrow} title={home.faqTitle}>
        {home.faq.map(({ title, answer }) => ({
          title,
          answer: fill(answer, { deposit }),
        }))}
      </QuestionsSection>
      <section className="contact-band">
        <div className="page-width">
          <div>
            <p className="eyebrow">{home.contactEyebrow}</p>
            <h2>{home.contactTitle}</h2>
          </div>
          <div className="actions">
            <a
              className="action action-primary"
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {home.contactAction} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
