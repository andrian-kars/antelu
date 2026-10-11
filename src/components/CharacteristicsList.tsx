import { Check } from "lucide-react";
import { fill, plural } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";
import type { Vehicle } from "@/lib/vehicles";

const soundLabels = { mp3: "MP3", bluetooth: "Bluetooth", usb: "USB" } as const;

export async function CharacteristicsList({ specs: data }: { specs: Vehicle["specs"] }) {
  const locale = await getLocale();
  const { specs } = getMessages(locale);
  // Source data uses "12V 4.5AH"; each language formats decimals and units its own way.
  const units = (value: string) =>
    value
      .replace(/(\d)\.(\d)/g, `$1${specs.units.decimal}$2`)
      .replace(/(\d)\s?V\b/g, `$1 ${specs.units.volt}`)
      .replace(/(\d)\s?AH\b/gi, `$1 ${specs.units.ampHour}`);
  const sound = (Object.keys(soundLabels) as (keyof typeof soundLabels)[])
    .filter((option) => data.sound.includes(option))
    .map((option) => soundLabels[option]);

  const descriptions = [
    data.ageMin !== null &&
      data.ageMax !== null &&
      plural(locale, specs.age, data.ageMax, { min: data.ageMin }),
    data.battery && fill(specs.battery, { value: units(data.battery) }),
    data.openingDoors && specs.doors,
    data.motorPower &&
      (data.motors !== null && data.motors > 1
        ? plural(locale, specs.motors, data.motors, { value: units(data.motorPower) })
        : fill(specs.motor, { value: units(data.motorPower) })),
    data.seats &&
      plural(locale, data.leatherSeats ? specs.leatherSeats : specs.seats, data.seats),
    data.maxSpeed && fill(specs.speed, { value: data.maxSpeed }),
    data.maxWeight !== null && fill(specs.load, { value: String(data.maxWeight) }),
    data.belts && specs.belts,
    data.remoteControl && specs.remote,
    sound.length > 0 && fill(specs.sound, { value: sound.join(", ") }),
    data.detachableTrailer && specs.trailer,
  ].filter((description): description is string => typeof description === "string");

  return (
    <ul className="specification-list">
      {descriptions.map((description) => (
        <li key={description}>
          <Check size={17} aria-hidden="true" />
          <span>{description}</span>
        </li>
      ))}
    </ul>
  );
}
