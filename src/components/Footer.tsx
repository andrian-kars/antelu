import { navLinks, phoneNumber } from "@/data/constants";
import Link from "next/link";
import { ContactDialog } from "./ContactDialog";

const currentYear = new Date().getFullYear(); // Gets the current year

export default function Footer() {
  return (
    <footer className="pt-12 md:pt-20 shadow-xl sticky bottom-0 w-full bg-black/90 overflow-hidden text-white/85">
      <section className="flex flex-col md:flex-row gap-6 md:gap-10 container border-t border-neutral-500 py-6 md:py-10">
        <div className="flex-1 hidden md:block">
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
              <p>Lunes-Domingo:</p>
            </li>
            <li>
              <p>
                Centro comercial Odeón, Polígono de La Gándara, Estrada
                Castelao, s/n, 15570 Narón, A Coruña, España
              </p>
            </li>
            <li>
              <p>Horario: 11:00 a 21:00</p>
            </li>
            <li>
              <ContactDialog>
                <p className="text-neutral-500 hover:text-white active:text-white focus:text-white transition focus:outline-none cursor-pointer">
                  {phoneNumber}
                </p>
              </ContactDialog>
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
