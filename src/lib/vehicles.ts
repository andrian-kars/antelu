import type { Locale } from "@/i18n/config";
import { plural, translated } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/es";
import type { Vehicle } from "@/lib/content";

export type { Vehicle };
export const vehicleTypes = [
  "electric_car",
  "motorbike",
  "quad",
  "tractor",
  "pony",
] as const;
export const categoryIds = ["all", ...vehicleTypes] as const;

export function getAgeRange({ specs }: Vehicle) {
  return specs.ageMin !== null && specs.ageMax !== null
    ? { min: specs.ageMin, max: specs.ageMax }
    : null;
}

export function ageLabel(vehicle: Vehicle, locale: Locale, messages: Messages) {
  const range = getAgeRange(vehicle);
  return range
    ? plural(locale, messages.vehicles.ageRange, range.max, { min: range.min })
    : messages.vehicles.ageUnknown;
}

export function vehicleName(vehicle: Vehicle, locale: Locale) {
  return translated(vehicle.name, locale);
}

export function categoryLabel(type: string, messages: Messages) {
  return messages.vehicles.categories[type] ?? messages.shell.nav.vehicles;
}
