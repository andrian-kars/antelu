import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "./ContactDialog";

export function ReserveNowButton({
  variant,
}: {
  variant?: "default" | "secondary";
}) {
  return (
    <ContactDialog>
      <Button variant={variant} className="text-lg p-6 rounded-xl flex gap-2">
        Reserva Ahora <ArrowRightIcon className="size-5" />
      </Button>
    </ContactDialog>
  );
}
