import { ArrowRightIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { phoneNumber } from "@/data/constants";

export function ReserveNowButton({
  variant,
}: {
  variant?: "default" | "secondary";
}) {
  return (
    <ButtonLink
      href={`tel:${phoneNumber}`}
      variant={variant}
      className="text-lg p-6 rounded-xl flex gap-2"
    >
      Reserva Ahora <ArrowRightIcon className="size-5" />
    </ButtonLink>
  );
}
