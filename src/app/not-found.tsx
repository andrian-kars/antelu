import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="not-found page-width">
      <p className="eyebrow">404 · Página no encontrada</p>
      <h1>Por aquí no es.</h1>
      <p>Este vehículo o esta página no está en nuestro catálogo.</p>
      <Link href="/#vehicles" className="action action-primary">
        <ArrowLeft size={18} aria-hidden="true" /> Volver a los vehículos
      </Link>
    </main>
  );
}
