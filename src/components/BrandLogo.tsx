import { CarFront } from "lucide-react";

export function BrandLogo() {
  return (
    <span className="brand">
      <CarFront aria-hidden="true" strokeWidth={2.5} />
      <span>
        antelu<span className="brand-dot">.</span>
      </span>
    </span>
  );
}
