import { CarFront } from "lucide-react";

export function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <span
      className="flex items-center gap-2 font-simebold flex-shrink-2 md:text-lg"
      onClick={onClick}
    >
      <CarFront className="size-6 md:size-8" />
      <span>ANTELU</span>
    </span>
  );
}
