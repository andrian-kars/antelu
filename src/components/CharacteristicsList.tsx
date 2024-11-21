"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function CharacteristicsList({
  characteristics,
  isFull = false,
}: {
  characteristics: Array<Characteristic>;
  isFull?: boolean;
}) {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const handleDescriptionChange = () => setIsFullDescription((prev) => !prev);

  if (isFull)
    return (
      <ul className="mt-4 gap-3 flex flex-col text-gray-500">
        {characteristicsMapper(characteristics).map(
          (char, index, currentArray) => (
            <li
              key={index}
              className={`flex gap-3 ${
                index !== currentArray.length - 1
                  ? "border-b-2 border-dashed pb-2"
                  : ""
              }`}
            >
              <Check color="white" className="bg-red-600 rounded-full p-1" />
              <p>{char}</p>
            </li>
          )
        )}
      </ul>
    );

  return (
    <>
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
                <Check color="white" className="bg-red-600 rounded-full p-1" />
                <p>{char}</p>
              </li>
            ))}
        </ul>
      )}
    </>
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
