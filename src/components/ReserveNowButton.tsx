"use client";

import { ArrowUpRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { ContactDialog } from "./ContactDialog";
import { getWhatsAppUrl, type ContactVehicle } from "@/data/constants";

const subscribe = () => () => {};

export function ReserveNowButton({ vehicle }: { vehicle?: ContactVehicle }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!hydrated) {
    return (
      <a
        className="action action-primary"
        href={getWhatsAppUrl(vehicle)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Consultar alquiler<span className="sr-only"> por WhatsApp</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    );
  }

  return (
    <ContactDialog vehicle={vehicle}>
      <button type="button" className="action action-primary">
        Consultar alquiler <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </ContactDialog>
  );
}
