import { Check } from "lucide-react";

type SeatsDetail = { number: number; material: string | null };
type SoundSystem = { isUsb: boolean; isBluetooth: boolean; isMp3: boolean };
type Characteristic = {
  name: string;
  value: string | number | boolean | SeatsDetail | SoundSystem;
};

export function CharacteristicsList({
  characteristics,
  isFull = false,
}: {
  characteristics: Characteristic[];
  isFull?: boolean;
}) {
  const descriptions = characteristics
    .map(({ name, value }) => {
      if (value === false) return null;
      switch (name) {
        case "recommendedAge":
          return `Edad recomendada: ${value} años`;
        case "battery":
          return `Batería: ${formatUnits(String(value))}`;
        case "isOpeningDoors":
          return "Puertas que se abren";
        case "motor": {
          const [count, power] = String(value).split("*");
          if (!power) return `Motor: ${formatUnits(count)}`;
          return Number(count) > 1
            ? `${count} motores de ${formatUnits(power)}`
            : `Motor: ${formatUnits(power)}`;
        }
        case "seats": {
          const { number, material } = value as SeatsDetail;
          return `${number} ${number === 1 ? "asiento" : "asientos"}${material === "leather" ? " de ecocuero" : ""}`;
        }
        case "maxSpeed":
          return `Velocidad máxima: ${value} km/h`;
        case "maxWeight":
          return `Carga máxima: ${value} kg`;
        case "isBelts":
          return "Cinturones de seguridad";
        case "isRemoteControl":
          return "Control remoto para adultos";
        case "sound": {
          const sound = value as SoundSystem;
          const options = [
            sound.isMp3 && "MP3",
            sound.isBluetooth && "Bluetooth",
            sound.isUsb && "USB",
          ].filter(Boolean);
          return options.length ? `Sonido: ${options.join(", ")}` : null;
        }
        case "isTrailerDetachable":
          return "Remolque desmontable";
        default:
          return null;
      }
    })
    .filter((description): description is string => Boolean(description));

  return (
    <ul className="specification-list">
      {(isFull ? descriptions : descriptions.slice(0, 4)).map((description) => (
        <li key={description}>
          <Check size={17} aria-hidden="true" />
          <span>{description}</span>
        </li>
      ))}
    </ul>
  );
}

// Source data uses "12V 4.5AH"; Spanish style is "12 V 4,5 Ah".
function formatUnits(value: string) {
  return value
    .replace(/(\d)\.(\d)/g, "$1,$2")
    .replace(/(\d)\s?V\b/g, "$1 V")
    .replace(/(\d)\s?AH\b/gi, "$1 Ah");
}
