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
  console.log(characteristics);

  return (
    <Card>
      <CardHeader>
        <Image src={images[0].src} width={500} height={500} alt={name} />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <div>Type: {type}</div>
          <div>Price: {discount || price}</div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
