"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  hintDismissedCookie,
  isLocale,
  localeCookie,
  localePath,
  suggestionCookie,
  type Locale,
} from "@/i18n/config";

type Suggestion = { text: string; action: string; dismiss: string };

const subscribe = () => () => {};

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];
}

function remember(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

// The proxy reads Accept-Language and leaves its suggestion in a cookie, since pages are static.
export function LanguageSuggestion({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Record<Locale, Suggestion>;
}) {
  const [dismissed, setDismissed] = useState(false);
  const basePath = `/${useSelectedLayoutSegments().join("/")}`;
  const suggested = useSyncExternalStore(
    subscribe,
    () => {
      if (readCookie(localeCookie) || readCookie(hintDismissedCookie)) return null;
      const value = readCookie(suggestionCookie);
      return isLocale(value) && value !== locale ? value : null;
    },
    () => null,
  );

  if (!suggested || dismissed) return null;
  const text = messages[suggested];

  return (
    <aside
      className="language-suggestion"
      lang={suggested}
      aria-labelledby="language-hint"
    >
      <p id="language-hint">{text.text}</p>
      <a
        className="action action-primary"
        href={localePath(suggested, basePath)}
        hrefLang={suggested}
        onClick={() => remember(localeCookie, suggested)}
      >
        {text.action}
      </a>
      <button
        type="button"
        className="icon-button"
        aria-label={text.dismiss}
        onClick={() => {
          remember(hintDismissedCookie, "1");
          setDismissed(true);
        }}
      >
        <X size={20} aria-hidden="true" />
      </button>
    </aside>
  );
}
