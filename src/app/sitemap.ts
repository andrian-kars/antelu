import type { MetadataRoute } from "next";
import { business } from "@/data/constants";
import { vehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/gallery", ...vehicles.map(({ id }) => `/rent/${id}`)].map((path) => ({
    url: new URL(path, business.url).href,
  }));
}
