import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import initial_background from "@/data/general/images/initial_background.jpg";
import Image from "next/image";
import infoLeft from "@/data/general/images/info_left.jpg";
import infoRight from "@/data/general/images/info_right.jpg";
import QuestionsSection from "./_sections/QuestionsSection";

export default function HomePage() {
  return (
    <main className="z-30 relative bg-white">
      <section
        itemScope
        itemType="http://schema.org/Product"
        style={{
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(${initial_background.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
        className="py-16 sm:py-56 bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-4 md:gap-8 px-4 text-white"
      >
        <h1
          itemProp="name"
          className="text-3xl md:text-5xl xl:text-6xl font-bold tracking-tight m-2 md:m-4"
        >
          ALQUILER DE VEHÍCULOS INFANTILES: COCHES, MOTOS, CABALLITOS.
        </h1>
        <h2
          itemProp="description"
          className="text-lg md:text-2xl xl:text-3xl max-w-screen-xl"
        >
          Ofrecemos una selección diversa de vehículos para que los más pequeños
          disfruten en cualquier evento: fiestas de cumpleaños, bodas, cualquier
          otra fiesta o eventos, o simplemente por diversión. ANTELU te ofrece
          la elección definitiva a precios muy asequibles para el alquiler de
          vehículos divertidos y seguros para los más pequeños.
        </h2>
        <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
          <meta itemProp="priceCurrency" content="EUR" />
          <link itemProp="availability" href="http://schema.org/InStock" />
          <span itemProp="price" className="hidden">
            Consultar en la página
          </span>
        </div>
      </section>
      <section id="vehicles" className="px-8 pt-20 md:pt-28 bg-acccent/5">
        <h3 className="text-4xl lg:text-6xl text-center text-balance font-semibold mb-2">
          Elige La Aventura De Tu Hijo/Hija
        </h3>
        <p className="text-center mb-8 lg:text-xl italic">
          *Con estos precios, puedes disfrutar del vehículo durante todo el día.
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto"
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {vehicles.map((vehicle, index) => (
            <div
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/Product"
              key={vehicle.id}
              className="vehicle-card"
            >
              <VehicleCard {...vehicle} />
              <meta itemProp="position" content={`${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
      <section id="info" className="pt-14 md:pt-20 bg-acccent/5">
        <div className="flex flex-1">
          <Image
            src={infoLeft}
            alt="Info cars"
            className="w-1/2 hidden md:block"
          />
          <div className="flex flex-col justify-center md:w-1/2 px-6 lg:px-12 xl:px-24 py-3 lg:py-6">
            <h4 className="text-xl lg:text-4xl text-balance font-semibold mb-2 lg:mb-4">
              Alquilar un coche para niños es una opción excelente por varias
              razones:
            </h4>
            <p className="text-base lg:text-lg">
              Desde fomentar la conveniencia y ofrecer diversas opciones, hasta
              facilitar la planificación de eventos y permitir pruebas de
              manejo, los alquileres de coches para niños son una opción
              versátil para diferentes necesidades y ocasiones. Son ideales para
              vacaciones, eventos especiales o simplemente un fin de semana de
              diversión, ya que los beneficios de alquilar estos coches van más
              allá de la diversión, creando experiencias memorables en la
              infancia. 🚗
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col justify-center md:w-1/2 px-6 lg:px-12 xl:px-24 py-3 lg:py-6">
            <h4 className="text-xl lg:text-4xl text-balance font-semibold mb-2 lg:mb-4">
              Cómo Alquilar:
            </h4>
            <ol>
              <li>
                <p className="text-base lg:text-lg font-semibold">
                  1. Selección
                </p>
                <p className="text-base lg:text-lg">
                  ¡Descubre nuestro impresionante escaparate de vehículos,
                  precios competitivos y políticas de alquiler amigables con el
                  cliente! 🚗💨
                </p>
              </li>
              <li>
                <p className="text-base lg:text-lg font-semibold">
                  2. Hacer una Reserva
                </p>
                <p className="text-base lg:text-lg">
                  Si te gusta alguno puedes proceder a reservar el coche. Haz
                  una sencilla llamada telefónica e iniciaremos el trámite.
                </p>
              </li>
              <li>
                <p className="text-base lg:text-lg font-semibold">
                  3. Recoger y Devolver el vehículo
                </p>
                <p className="text-base lg:text-lg">
                  En el día y hora acordado para el alquiler recoge el coche en
                  nuestras instalaciones o utiliza nuestro servicio de entrega
                  por un cargo extra. Al concluir el alquiler, devuelve el coche
                  en el lugar y hora convenido, y en mismo estado para evitar
                  cargos adicionales. El titular del contrato de alquiler deberá
                  tener más de 18 años y dar sus datos personales y presentar su
                  DNI, junto con el depósito de 50€ de fianza por vehículo.
                </p>
              </li>
            </ol>
          </div>
          <Image
            src={infoRight}
            alt="Info hourses"
            className="w-1/2 hidden md:block"
          />
        </div>
      </section>
      <QuestionsSection />
    </main>
  );
}
