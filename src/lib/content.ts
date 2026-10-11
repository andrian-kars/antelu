import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { z } from "zod";
import galleryData from "@/content/gallery.json";
import vehicleData from "@/content/vehicles.json";
import { vehicleTypes } from "@/lib/vehicles";

// Content is edited in the CMS at /admin. Anything that would break a page fails the build,
// so a bad edit never replaces the live site.

export type Photo = { src: string; width: number; height: number };

function photo(folder: "vehicles" | "gallery") {
  const pattern = new RegExp(
    `^/images/${folder}/[\\w.-]+\\.(?:jpe?g|png|webp|avif)$`,
    "i",
  );
  return z.string().transform((src, ctx): Photo => {
    if (!pattern.test(src)) {
      ctx.addIssue({
        code: "custom",
        message: `Expected a JPG, PNG, WebP or AVIF file in /images/${folder}/, got "${src}"`,
      });
      return z.NEVER;
    }
    try {
      const { width, height, orientation } = imageSize(
        fs.readFileSync(path.join(process.cwd(), "public", src)),
      );
      // Browsers and next/image apply EXIF rotation, so orientations 5-8 swap the sides.
      return orientation && orientation >= 5
        ? { src, width: height, height: width }
        : { src, width, height };
    } catch {
      ctx.addIssue({
        code: "custom",
        message: `Missing or unreadable image public${src}`,
      });
      return z.NEVER;
    }
  });
}

const optionalText = z.string().trim().default("");
const localizedText = z.object({
  es: z.string().trim().min(1, "Spanish text is required"),
  gl: optionalText,
  en: optionalText,
  uk: optionalText,
});
const flag = z.boolean().default(false);
const optionalNumber = z.number().positive().nullable().default(null);
const optionalCount = z.number().int().min(0).nullable().default(null);

const vehicleSchema = z
  .object({
    name: localizedText,
    id: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
    type: z.enum(vehicleTypes),
    price: z.number().positive(),
    previousPrice: optionalNumber,
    images: z.array(photo("vehicles")).min(1, "Add at least one photo"),
    specs: z.object({
      ageMin: optionalCount,
      ageMax: optionalCount,
      battery: optionalText,
      openingDoors: flag,
      motors: optionalCount,
      motorPower: optionalText,
      seats: optionalCount,
      leatherSeats: flag,
      maxSpeed: optionalText.pipe(
        z.string().regex(/^(?:\d+(?:-\d+)?)?$/, "Use a number or a range like 4-5"),
      ),
      maxWeight: optionalNumber,
      belts: flag,
      remoteControl: flag,
      sound: z.array(z.enum(["mp3", "bluetooth", "usb"])).default([]),
      detachableTrailer: flag,
    }),
    hidden: flag,
  })
  // Inconsistent optional values are tolerated instead of failing the deploy.
  .transform(({ previousPrice, specs, ...vehicle }) => {
    const ages = [specs.ageMin, specs.ageMax];
    const [ageMin, ageMax] = ages.every((age) => age !== null)
      ? (ages as number[]).sort((a, b) => a - b)
      : [null, null];
    return {
      ...vehicle,
      previousPrice:
        previousPrice !== null && previousPrice > vehicle.price ? previousPrice : null,
      specs: { ...specs, ageMin, ageMax },
    };
  });

const vehiclesSchema = z.array(vehicleSchema).superRefine((vehicles, ctx) => {
  const seen = new Set<string>();
  vehicles.forEach(({ id }, index) => {
    if (seen.has(id)) {
      ctx.addIssue({
        code: "custom",
        path: [index, "id"],
        message: `Duplicate id "${id}"`,
      });
    }
    seen.add(id);
  });
});

const gallerySchema = z.array(
  z.object({
    image: photo("gallery"),
    alt: localizedText,
    homeSlot: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .nullable()
      .default(null),
  }),
);

function load<Schema extends z.ZodType>(schema: Schema, data: unknown, file: string) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid ${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const vehicles = load(
  vehiclesSchema,
  vehicleData,
  "src/content/vehicles.json",
).filter(({ hidden }) => !hidden);
export type Vehicle = (typeof vehicles)[number];

export const galleryPhotos = load(
  gallerySchema,
  galleryData,
  "src/content/gallery.json",
).map(({ image, ...photo }) => ({ ...image, ...photo }));
export type GalleryPhoto = (typeof galleryPhotos)[number];

// The home collage has three slots; unclaimed ones take the next photos in gallery order.
export const homePhotos = (() => {
  const claimed = ([1, 2, 3] as const).map((slot) =>
    galleryPhotos.find((photo) => photo.homeSlot === slot),
  );
  const spare = galleryPhotos.filter((photo) => !claimed.includes(photo));
  return claimed
    .map((photo) => photo ?? spare.shift())
    .filter((photo) => photo !== undefined);
})();
