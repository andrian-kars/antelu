"use client";

import { ArrowUpRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { ContactDialog, type ContactMessages } from "./ContactDialog";

const subscribe = () => () => {};

export function ReserveNowButton({
  whatsappUrl,
  description,
  messages,
}: {
  whatsappUrl: string;
  description?: string;
  messages: ContactMessages;
}) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!hydrated) {
    return (
      <a
        className="action action-primary"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {messages.enquire}
        <span className="sr-only">{messages.enquireNoScript}</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    );
  }

  return (
    <ContactDialog
      whatsappUrl={whatsappUrl}
      description={description}
      messages={messages}
    >
      <button type="button" className="action action-primary">
        {messages.enquire} <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </ContactDialog>
  );
}
