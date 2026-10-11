import { Check } from "lucide-react";
import { fill, plural } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";

type SeatsDetail = { number: number; material: string | null };
type SoundSystem = { isUsb: boolean; isBluetooth: boolean; isMp3: boolean };
type Characteristic = {
  name: string;
  value: string | number | boolean | SeatsDetail | SoundSystem;
};

export async function CharacteristicsList({
  characteristics,
}: {
  characteristics: Characteristic[];
}) {
  const locale = await getLocale();
  const { specs } = getMessages(locale);
  // Source data uses "12V 4.5AH"; each language formats decimals and units its own way.
  const units = (value: string) =>
    value
      .replace(/(\d)\.(\d)/g, `$1${specs.units.decimal}$2`)
      .replace(/(\d)\s?V\b/g, `$1 ${specs.units.volt}`)
      .replace(/(\d)\s?AH\b/gi, `$1 ${specs.units.ampHour}`);

  const descriptions = characteristics
    .map(({ name, value }) => {
      if (value === false) return null;
      switch (name) {
        case "recommendedAge": {
          const [min, max] = String(value).split("-").map(Number);
          return plural(locale, specs.age, max, { min });
        }
        case "battery":
          return fill(specs.battery, { value: units(String(value)) });
        case "isOpeningDoors":
          return specs.doors;
        case "motor": {
          const [count, power] = String(value).split("*");
          if (!power) return fill(specs.motor, { value: units(count) });
          return Number(count) > 1
            ? plural(locale, specs.motors, Number(count), { value: units(power) })
            : fill(specs.motor, { value: units(power) });
        }
        case "seats": {
          const { number, material } = value as SeatsDetail;
          return plural(
            locale,
            material === "leather" ? specs.leatherSeats : specs.seats,
            number,
          );
        }
        case "maxSpeed":
          return fill(specs.speed, { value: String(value) });
        case "maxWeight":
          return fill(specs.load, { value: String(value) });
        case "isBelts":
          return specs.belts;
        case "isRemoteControl":
          return specs.remote;
        case "sound": {
          const sound = value as SoundSystem;
          const options = [
            sound.isMp3 && "MP3",
            sound.isBluetooth && "Bluetooth",
            sound.isUsb && "USB",
          ].filter(Boolean);
          return options.length ? fill(specs.sound, { value: options.join(", ") }) : null;
        }
        case "isTrailerDetachable":
          return specs.trailer;
        default:
          return null;
      }
    })
    .filter((description): description is string => Boolean(description));

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
