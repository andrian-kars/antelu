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
import { useState } from "react";
import { Check } from "lucide-react";

export function VehicleCard({
  name,
  id,
  // type,
  price,
  discount,
  images,
  characteristics,
}: (typeof vehicles)[number]) {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const handleDescriptionChange = () => setIsFullDescription((prev) => !prev);

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
        <ul className="mt-4 gap-3 flex flex-col text-gray-500">
          {characteristicsMapper(characteristics)
            .filter((char, index) => char && index < 4)
            .map((char, index) => (
              <li
                key={index}
                className="flex gap-3 border-b-2 border-dashed pb-2"
              >
                <Check color="white" className="bg-red-600 rounded-full p-1" />
                <p>{char}</p>
              </li>
            ))}
        </ul>
        <p
          className="mt-2 border-b-2 border-dashed pb-2 cursor-pointer font-medium"
          onClick={handleDescriptionChange}
        >
          Ver {isFullDescription ? "menos" : "más"} características
        </p>
        {isFullDescription && (
          <ul className="mt-4 gap-3 flex flex-col text-gray-500">
            {characteristicsMapper(characteristics)
              .filter((char, index) => char && index > 3)
              .map((char, index, currentArray) => (
                <li
                  key={index}
                  className={`flex gap-3 ${
                    index !== currentArray.length - 1
                      ? "border-b-2 border-dashed pb-2"
                      : ""
                  }`}
                >
                  <Check
                    color="white"
                    className="bg-red-600 rounded-full p-1"
                  />
                  <p>{char}</p>
                </li>
              ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <ReserveNowButton variant="secondary" />
      </CardFooter>
    </Card>
  );
}

function characteristicsMapper(characteristics: Array<Characteristic>) {
  return characteristics.map(({ name, value }) => {
    switch (name) {
      case "recommendedAge":
        return `Edades ${value} años`;
      case "battery":
        return `Batería ${value}`;
      case "isOpeningDoors":
        return "Puertas que se Abren";
      case "motor":
        return `Motores de ${value}`;
      case "seats":
        const { number, material } = value as SeatsDetail;
        return `${number} ${material === "leather" ? "Eco-Cuero" : ""} asiento${
          number > 1 ? "s" : ""
        }`;
      case "maxSpeed":
        return `Velocidad máxima ${value} Km/h`;
      case "maxWeight":
        return `Capacidad de carga de ${value} kg`;
      case "isBelts":
        return "Cinturones de seguridad";
      case "isRemoteControl":
        return "Control remoto para padres";
      case "sound":
        const { isMp3, isBluetooth, isUsb } = value as SoundSystem;
        return [isMp3 && "Mp3", isBluetooth && "Bluetooth", isUsb && "USB"]
          .filter((el) => el)
          .join(" & ");

      case "isOriginal":
        return "Con diseño y licencia oficiales";
    }
  });
}

type Characteristic = {
  name: string;
  value: string | number | boolean | SeatsDetail | SoundSystem;
};

type SeatsDetail = {
  number: number;
  material: string | null;
};

type SoundSystem = {
  isUsb: boolean;
  isBluetooth: boolean;
  isMp3: boolean;
};
