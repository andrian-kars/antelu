import type { vehicles } from "@/data/vehicles";
import type { Locale } from "@/i18n/config";
import { plural } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/es";

export type Vehicle = (typeof vehicles)[number];
export const categoryIds = [
  "all",
  "electric_car",
  "motorbike",
  "quad",
  "tractor",
  "pony",
] as const;

export function getAgeRange(vehicle: Vehicle) {
  const value = vehicle.characteristics.find(
    (item) => item.name === "recommendedAge",
  )?.value;
  const match = typeof value === "string" ? /^(\d+)-(\d+)$/.exec(value) : null;
  return match ? { min: Number(match[1]), max: Number(match[2]) } : null;
}

export function ageLabel(vehicle: Vehicle, locale: Locale, messages: Messages) {
  const range = getAgeRange(vehicle);
  return range
    ? plural(locale, messages.vehicles.ageRange, range.max, { min: range.min })
    : messages.vehicles.ageUnknown;
}

export function vehicleName(vehicle: Vehicle, messages: Messages) {
  return messages.vehicles.names[vehicle.id] ?? vehicle.name;
}

export function categoryLabel(type: string, messages: Messages) {
  return messages.vehicles.categories[type] ?? messages.shell.nav.vehicles;
}
