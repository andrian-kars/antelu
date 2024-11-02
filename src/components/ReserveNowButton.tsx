import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReserveNowButton() {
  return (
    <Button className="text-lg p-6 rounded-xl flex gap-2">
      Reserva Ahora <ArrowRightIcon className="size-5" />
    </Button>
  );
}
