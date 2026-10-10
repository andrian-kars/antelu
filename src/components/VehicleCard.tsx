import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, UsersRound } from "lucide-react";
import { ReserveNowButton } from "./ReserveNowButton";
import { formatPrice } from "@/data/constants";
import { getAgeRange, getCategoryLabel, type Vehicle } from "@/lib/vehicles";

export function VehicleCard(vehicle: Vehicle) {
  const { id, name, images, price, discount, type } = vehicle;
  return (
    <article className="vehicle-card" aria-labelledby={`vehicle-${id}`}>
      <Link
        className="vehicle-image"
        href={`/rent/${id}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={images[0]}
          alt=""
          sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1000px) 46vw, 390px"
        />
        <span className="vehicle-category">{getCategoryLabel(type)}</span>
      </Link>
      <div className="vehicle-body">
        <h3 id={`vehicle-${id}`}>
          <Link href={`/rent/${id}`}>{name}</Link>
        </h3>
        <p className="vehicle-age">
          <UsersRound size={17} aria-hidden="true" />
          {getAgeRange(vehicle)?.label ?? "Consultar edad recomendada"}
        </p>
        <div className="vehicle-price">
          <span>
            Desde <strong>{formatPrice(price)}</strong>
            <span className="price-period"> / día</span>
          </span>
          {discount ? (
            <del>
              <span className="sr-only">Precio anterior: </span>
              {formatPrice(discount)}
            </del>
          ) : null}
        </div>
        <div className="vehicle-actions">
          <ReserveNowButton vehicle={{ id, name }} />
          <Link
            className="icon-button"
            href={`/rent/${id}`}
            aria-label={`Ver ${name}`}
            title={`Ver ${name}`}
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
