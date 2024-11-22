import { VehicleCard } from "@/components/VehicleCard";
import { ReserveNowButton } from "@/components/ReserveNowButton";
import { vehicles } from "@/data/vehicles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antelu | Alquiler de Coches para Niños",
  description:
    "Ya sea para una fiesta de cumpleaños, un evento especial o simplemente por diversión, Antelu es la elección definitiva para el alquiler de vehículos amigables para niños.",
};

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Alquiler de Coches para Niños
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Ofrecemos una selección diversa de vehículos para que los niños
          disfruten. Ya sea para una fiesta de cumpleaños, un evento especial o
          simplemente por diversión, Antelu es la elección definitiva para el
          alquiler de vehículos amigables para niños.
        </p>
        <ReserveNowButton />
      </section>
      <section id="pricing" className="px-8 py-16 bg-acccent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Elige La Aventura De Tu Hijo/Hija
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </section>
    </>
  );
}
