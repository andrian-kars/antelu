"use client";

import { vehicles } from "@/data/vehicles";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ReserveNowButton } from "./ReserveNowButton";
import { CharacteristicsList } from "./CharacteristicsList";

export function VehicleCard({
  name,
  id,
  price,
  discount,
  images,
  characteristics,
}: (typeof vehicles)[number]) {
  return (
    <Card>
      <Link href={`/rent/${id}`}>
        <CardHeader className="relative">
          <Image
            className="scale-90 hover:scale-100 transition-all"
            src={images[0].src}
            width={500}
            height={500}
            alt={name}
          />
          <div className="flex flex-col items-center justify-center absolute bottom-2 right-2 lg:bottom-4 lg:right-4 bg-red-600 rounded-full w-24 h-24 text-white">
            <span className="font-bold">Desde</span>
            <span className="font-bold text-xl">€{price}</span>
            {discount && <span className="line-through">€{discount}</span>}
          </div>
        </CardHeader>
      </Link>
      <CardContent>
        <Link href={`/rent/${id}`}>
          <CardTitle className="text-xl">{name}</CardTitle>
        </Link>
        <CharacteristicsList characteristics={characteristics} />
      </CardContent>
      <CardFooter>
        <ReserveNowButton variant="secondary" />
      </CardFooter>
    </Card>
  );
}
