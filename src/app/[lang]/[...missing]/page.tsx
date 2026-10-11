import { notFound } from "next/navigation";

// Unprefixed Spanish URLs are rewritten under /es, so unknown paths need a localized 404 here.
export default function UnknownPage() {
  notFound();
}
