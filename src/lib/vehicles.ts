import type { vehicles } from "@/data/vehicles";

export type Vehicle = (typeof vehicles)[number];
export const categories = [
  { id: "all", label: "Todos" },
  { id: "electric_car", label: "Coches" },
  { id: "motorbike", label: "Motos" },
  { id: "quad", label: "Quads" },
  { id: "tractor", label: "Tractores" },
  { id: "pony", label: "Caballitos" },
] as const;

export function getAgeRange(vehicle: Vehicle) {
  const value = vehicle.characteristics.find(
    (item) => item.name === "recommendedAge",
  )?.value;
  const match = typeof value === "string" ? /^(\d+)-(\d+)$/.exec(value) : null;
  return match
    ? {
        min: Number(match[1]),
        max: Number(match[2]),
        label: `${match[1]}-${match[2]} años`,
      }
    : null;
}

export function getCategoryLabel(type: string) {
  return categories.find((category) => category.id === type)?.label ?? "Vehículos";
}
