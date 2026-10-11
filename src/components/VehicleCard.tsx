import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, UsersRound } from "lucide-react";
import { ReserveNowButton } from "./ReserveNowButton";
import { localePath, type Locale } from "@/i18n/config";
import { fill, formatPrice, whatsAppUrl } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/es";
import { ageLabel, categoryLabel, vehicleName, type Vehicle } from "@/lib/vehicles";
import { skeleton } from "@/lib/skeleton";

export function VehicleCard({
  vehicle,
  locale,
  messages,
}: {
  vehicle: Vehicle;
  locale: Locale;
  messages: Messages;
}) {
  const { id, images, price, previousPrice, type } = vehicle;
  const name = vehicleName(vehicle, locale);
  const href = localePath(locale, `/rent/${id}`);
  const { vehicles: text } = messages;
  return (
    <article className="vehicle-card" aria-labelledby={`vehicle-${id}`}>
      <Link className="vehicle-image" href={href} tabIndex={-1} aria-hidden="true">
        <Image
          src={images[0].src}
          width={images[0].width}
          height={images[0].height}
          alt=""
          placeholder={skeleton(images[0])}
          style={{ objectFit: "contain" }}
          sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1000px) 46vw, 390px"
        />
        <span className="vehicle-category">{categoryLabel(type, messages)}</span>
      </Link>
      <div className="vehicle-body">
        <h3 id={`vehicle-${id}`}>
          <Link href={href}>{name}</Link>
        </h3>
        <p className="vehicle-age">
          <UsersRound size={17} aria-hidden="true" />
          {ageLabel(vehicle, locale, messages)}
        </p>
        <div className="vehicle-price">
          <span>
            {text.from} <strong>{formatPrice(price, locale)}</strong>
            <span className="price-period"> {text.perDay}</span>
          </span>
          {previousPrice ? (
            <del>
              <span className="sr-only">{text.previousPrice}</span>
              {formatPrice(previousPrice, locale)}
            </del>
          ) : null}
        </div>
        <div className="vehicle-actions">
          <ReserveNowButton
            whatsappUrl={whatsAppUrl(locale, messages.contact, { id, name })}
            description={name}
            messages={messages.contact}
          />
          <Link
            className="icon-button"
            href={href}
            aria-label={fill(text.view, { name })}
            title={fill(text.view, { name })}
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
