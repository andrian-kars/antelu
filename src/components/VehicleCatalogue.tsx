"use client";

import { useEffect, useState, type ReactNode } from "react";
import { RotateCcw, Search } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { plural } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/es";
import { categoryIds } from "@/lib/vehicles";

type CatalogueItem = {
  id: string;
  type: string;
  age: { min: number; max: number } | null;
};

export function VehicleCatalogue({
  items,
  children,
  locale,
  messages,
  categories,
}: {
  items: CatalogueItem[];
  children: ReactNode[];
  locale: Locale;
  messages: Messages["catalogue"];
  categories: Record<string, string>;
}) {
  const [category, setCategory] = useState("all");
  const [age, setAge] = useState("");

  // Category shortcuts elsewhere on the page are plain links, so they still scroll without JS.
  useEffect(() => {
    function selectCategory(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLElement>("[data-category]");
      if (!link?.dataset.category) return;
      setCategory(link.dataset.category);
      setAge("");
    }
    document.addEventListener("click", selectCategory);
    return () => document.removeEventListener("click", selectCategory);
  }, []);
  const visible = items.map(
    (item) =>
      (category === "all" || item.type === category) &&
      (!age ||
        (item.age !== null &&
          Number(age) >= item.age.min &&
          Number(age) <= item.age.max)),
  );
  const count = visible.filter(Boolean).length;
  const filtered = category !== "all" || Boolean(age);

  function reset() {
    setCategory("all");
    setAge("");
  }

  return (
    <>
      <div className="catalogue-toolbar">
        <div className="category-filters" role="group" aria-label={messages.typeLabel}>
          {categoryIds.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {categories[id]}
            </button>
          ))}
        </div>
        <label className="age-filter">
          {messages.ageLabel}{" "}
          <select
            value={age}
            onChange={(event) => setAge(event.target.value)}
            aria-label={messages.ageAria}
          >
            <option value="">{messages.allAges}</option>
            {Array.from({ length: 15 }, (_, index) => index + 1).map((years) => (
              <option key={years} value={years}>
                {plural(locale, messages.years, years)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="catalogue-status">
        <p role="status" aria-live="polite">
          {plural(locale, messages.count, count)}
        </p>
        {filtered && (
          <button type="button" className="text-link" onClick={reset}>
            <RotateCcw size={15} aria-hidden="true" /> {messages.reset}
          </button>
        )}
      </div>
      <div className="vehicle-grid">
        {items.map((item, index) => (
          <div key={item.id} hidden={!visible[index]}>
            {children[index]}
          </div>
        ))}
      </div>
      {count === 0 && (
        <div className="empty-state">
          <Search size={32} aria-hidden="true" />
          <h3>{messages.emptyTitle}</h3>
          <button className="action action-secondary" onClick={reset}>
            {messages.showAll}
          </button>
        </div>
      )}
    </>
  );
}
