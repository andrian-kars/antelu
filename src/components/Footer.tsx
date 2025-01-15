import { navLinks } from "@/data/constants";
import Link from "next/link";

const currentYear = new Date().getFullYear(); // Gets the current year

export default function Footer() {
  return (
    <footer className="pt-12 md:pt-20 shadow-xl sticky bottom-0 w-full bg-black/90 overflow-hidden text-white/85">
      <section className="flex flex-col md:flex-row gap-6 md:gap-10 container border-t border-neutral-500 py-6 md:py-10">
        <div className="flex-1">
          <h5 className="text-base lg:text-xl font-semibold mb-3">
            Acerca de Antelu
          </h5>
          <p>
            Ofrecemos una selección diversa de vehículos para que los más
            pequeños disfruten en cualquier evento: fiestas de cumpleaños,
            bodas, cualquier otra fiesta o eventos, o simplemente por diversión.
            ANTELU te ofrece la elección definitiva a precios muy asequibles
            para el alquiler de vehículos divertidos y seguros para los más
            pequeños.
          </p>
        </div>
        <div className="flex-1">
          <h5 className="text-base lg:text-xl font-semibold mb-3">
            Contáctenos
          </h5>
          <ul className="flex flex-col gap-3">
            <li>
              <p>Monday-Friday:</p>
            </li>
            <li>
              <p>
                Address: 250 Trowers Rd, Unit 1, Woodbridge, ON L4L 5Z6, Canada.
                (Back door)
              </p>
            </li>
            <li>
              <p>Hours: 10am-6pm</p>
            </li>
            <li>
              <p>437-848-4684</p>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h5 className="text-base lg:text-xl font-semibold mb-3">
            Menú Rápido
          </h5>
          <ul className="text-neutral-500 flex flex-col gap-3">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  className="hover:text-white active:text-white focus:text-white transition focus:outline-none"
                  href={path}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container border-t border-neutral-500 py-6 md:py-10 text-right text-neutral-500">
        {currentYear} Antelu. Todos los derechos reservados.
      </section>
    </footer>
  );
}
