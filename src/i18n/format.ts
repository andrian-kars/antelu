import { business, type ContactVehicle } from "@/data/constants";
import { intlLocales, localePath, type Locale } from "./config";

export type PluralForms = { one?: string; few?: string; many?: string; other: string };

export const plurals = (forms: PluralForms) => forms;

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function plural(
  locale: Locale,
  forms: PluralForms,
  count: number,
  values: Record<string, string | number> = {},
) {
  const category = new Intl.PluralRules(intlLocales[locale]).select(count);
  const template = forms[category as keyof PluralForms] ?? forms.other;
  return fill(template, { n: count, ...values });
}

export function formatPrice(price: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocales[locale], {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
  }).format(price);
}

export function whatsAppUrl(
  locale: Locale,
  templates: { whatsappGeneric: string; whatsappVehicle: string },
  vehicle?: ContactVehicle,
) {
  const url = new URL(`https://wa.me/${business.phone.replace(/\D/g, "")}`);
  const message = vehicle
    ? fill(templates.whatsappVehicle, {
        name: vehicle.name,
        url: new URL(localePath(locale, `/rent/${vehicle.id}`), business.url).href,
      })
    : templates.whatsappGeneric;
  url.searchParams.set("text", message);
  return url.href;
}
