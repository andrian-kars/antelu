import { vehicles } from "@/data/vehicles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export function VehicleCard({
  name,
  type,
  price,
  discount,
  images,
  characteristics,
}: (typeof vehicles)[number]) {
  return (
    <Card>
      <CardHeader>
        <Image src={images[0].src} width={500} height={500} alt={name} />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription></CardDescription>
      </CardContent>
    </Card>
  );
}
