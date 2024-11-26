import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import initial_background from "@/data/general/images/initial_background.jpg";

export default function HomePage() {
  return (
    <>
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
        className="py-16 sm:py-56 bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4 text-white"
      >
        <h1
          itemProp="name"
          className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight m-4"
        >
          ALQUILER DE VEHÍCULOS INFANTILES: COCHES, MOTOS, CABALLITOS.
        </h1>
        <h2
          itemProp="description"
          className="text-lg lg:text-3xl max-w-screen-xl"
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
      <section id="vehicles" className="px-8 pt-28 pb-16 bg-acccent/5">
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
    </>
  );
}
