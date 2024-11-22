import Carousel from "@/components/Carousel";
import { CharacteristicsList } from "@/components/CharacteristicsList";
import { ReserveNowButton } from "@/components/ReserveNowButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { vehicles } from "@/data/vehicles";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const vehicle = vehicles.find((vehicle) => vehicle.id === slug);

  const title = vehicle?.name;

  return {
    title: title ? `${title} - Antelu` : "Antelu",
  };
}

export default async function RentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const vehicle = vehicles.find((vehicle) => vehicle.id === slug);

  if (!vehicle) return <div className="mt-20">404</div>;

  const { images, name, discount, price, characteristics } = vehicle;

  return (
    <section className="px-8 py-16 bg-acccent/5 container">
      <Card className="flex flex-col lg:flex-row gap-5">
        <CardHeader className="relative flex justify-center items-center">
          <CardTitle className="text-2xl sm:text-3xl">{name}</CardTitle>
          <Carousel slides={images} name={name} />
          <div className="flex flex-col items-center justify-center absolute bottom-2 sm:bottom-4 right-2 sm:right-4 lg:bottom-8 lg:right-8 bg-red-600 rounded-full w-24 h-24 text-white">
            <span className="font-bold">Desde</span>
            <span className="font-bold text-xl">€{price}</span>
            {discount && <span className="line-through">€{discount}</span>}
          </div>
        </CardHeader>
        <CardHeader className="flex flex-col gap-4 justify-center">
          <CardTitle className="text-xl">Características</CardTitle>
          <CharacteristicsList
            characteristics={characteristics}
            isFull={true}
          />
          <ReserveNowButton variant="secondary" />
        </CardHeader>
      </Card>
    </section>
  );
}
