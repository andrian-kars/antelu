import { CarFront } from "lucide-react";

export function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <span
      className="flex items-center gap-2 font-simebold flex-shrink-2 text-lg"
      onClick={onClick}
    >
      <CarFront className="size-8" />
      <span>ANTELU</span>
    </span>
  );
}
