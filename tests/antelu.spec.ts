import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("contact links are named, normalized and keyboard accessible", async ({ page }) => {
  await page.goto("/");
  const trigger = page
    .getByRole("button", { name: /Reserva Ahora|Consultar alquiler/ })
    .first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Hablemos de tu alquiler" });
  await expect(dialog).toBeVisible();
  const whatsapp = dialog.getByRole("link", { name: "Consultar por WhatsApp" });
  const url = new URL((await whatsapp.getAttribute("href"))!);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/34604952317");
  expect(url.searchParams.get("text")).toContain("disponibilidad");
  await expect(dialog.getByRole("link", { name: /Llamar al/ })).toHaveAttribute(
    "href",
    "tel:+34604952317",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("catalogue filters categories and ages and resets empty results", async ({
  page,
}) => {
  await page.goto("/#vehicles");
  const cards = page.locator(".vehicle-card:visible");
  await expect(cards).toHaveCount(23);
  await page.getByRole("button", { name: "Motos", exact: true }).click();
  await expect(cards).toHaveCount(4);
  await page.getByRole("combobox", { name: "Edad del niño o niña" }).selectOption("15");
  await expect(cards).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No hay vehículos con estos filtros" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver todos los vehículos" }).click();
  await expect(cards).toHaveCount(23);
  await page.getByRole("button", { name: "Caballitos", exact: true }).click();
  await page.getByRole("combobox", { name: "Edad del niño o niña" }).selectOption("15");
  await expect(cards).toHaveCount(2);
});

test("vehicle detail changes photos and includes model in contact enquiry", async ({
  page,
}) => {
  await page.goto("/rent/mercedes-csl-350-amg");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Mercedes CLS 350 AMG",
  );
  await page.getByRole("button", { name: "Foto siguiente", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Ir a la foto 2", exact: true }),
  ).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Consultar alquiler" }).click();
  const href = await page
    .getByRole("dialog")
    .getByRole("link", { name: "Consultar por WhatsApp" })
    .getAttribute("href");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Mercedes CLS 350 AMG");
  expect(message).toContain("https://antelu.es/rent/mercedes-csl-350-amg");
});

test("gallery opens a labelled lightbox and closes with Escape", async ({ page }) => {
  await page.goto("/gallery");
  const first = page.locator(".photo-album a").first();
  await first.click();
  await expect(page.getByRole("button", { name: "Cerrar", exact: true })).toBeVisible();
  const slide = page.locator(".yarl__slide_current img");
  await expect(slide).toHaveAttribute("src", /\/_next\/image\?/);
  await expect
    .poll(() => slide.evaluate((image: HTMLImageElement) => image.currentSrc))
    .toContain("/_next/image?");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Cerrar", exact: true }),
  ).not.toBeVisible();
  await expect(first).toBeFocused();
});

for (const route of ["/", "/rent/mercedes-csl-350-amg", "/gallery"]) {
  test(`${route} has accessible content and a route-specific canonical`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).href).toBe(new URL(route, "https://antelu.es").href);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);
  });

  test(`${route} reflows and loads real images`, async ({ page }, testInfo) => {
    await page.goto(route);
    const widths =
      testInfo.project.name === "chromium"
        ? [320, 390, 768, 1024, 1440, 1920]
        : [390, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      await expect
        .poll(() =>
          page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        )
        .toBe(true);
      const image = page.locator("main img").first();
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) => element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    const errors: string[] = await page
      .locator("main a, main button, main h1, main h2, main h3")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const box = element.getBoundingClientRect();
            return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1);
          })
          .map((element) => element.textContent ?? ""),
      );
    expect(errors).toEqual([]);
  });

  test(`${route} keeps content and enquiry links without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}${route}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('a[href="tel:+34604952317"]').first()).toBeVisible();
    await expect(
      page.locator('a[href^="https://wa.me/34604952317"]').first(),
    ).toBeVisible();
    if (route === "/") await expect(page.locator(".vehicle-card")).toHaveCount(23);
    if (route === "/gallery")
      await expect(page.locator(".photo-album a")).toHaveCount(20);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBe(true);
    await context.close();
  });
}

test("mobile navigation is keyboard operable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/rent/mercedes-csl-350-amg");
  await expect(page.getByRole("button", { name: "Consultar alquiler" })).toBeVisible();
  const toggle = page.getByRole("button", { name: "Abrir menú", exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeHidden();
});

test.describe("section links", () => {
  test.use({ reducedMotion: "no-preference" });

  const sections = [
    { label: "Vehículos", id: "vehicles" },
    { label: "Información", id: "info" },
    { label: "Preguntas", id: "questions" },
  ];

  async function expectSectionUnderHeader(page: Page, id: string) {
    const gap = () =>
      page.evaluate((target) => {
        const header = document.querySelector(".site-header")!.getBoundingClientRect();
        const section = document.getElementById(target)!.getBoundingClientRect();
        return Math.round(section.top - header.bottom);
      }, id);
    // The header's 1px bottom border overlaps the section's first pixel.
    await expect.poll(gap, { timeout: 4000 }).toBeGreaterThanOrEqual(-1);
    await expect.poll(gap, { timeout: 4000 }).toBeLessThanOrEqual(0);
  }

  async function clickSection(page: Page, label: string) {
    const toggle = page.locator(".menu-toggle");
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.locator("#mobile-navigation").getByRole("link", { name: label }).click();
      await expect(page.locator("#mobile-navigation")).toBeHidden();
    } else {
      await page.locator(".desktop-links").getByRole("link", { name: label }).click();
    }
  }

  for (const width of [320, 600, 601, 900, 901, 1440]) {
    test(`land exactly below the header at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Breakpoint sweep runs once.");
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      for (const { label, id } of sections) {
        await clickSection(page, label);
        await expect(page).toHaveURL(new RegExp(`/#${id}$`));
        await expectSectionUnderHeader(page, id);
      }
    });
  }

  for (const { id } of sections) {
    test(`direct /#${id} load lands below the header`, async ({ page }) => {
      await page.goto(`/#${id}`);
      await expectSectionUnderHeader(page, id);
    });
  }

  test("other pages jump to the section instead of scrolling through the page", async ({
    page,
  }) => {
    await page.goto("/rent/mercedes-csl-350-amg");
    await expect(page.getByRole("button", { name: "Consultar alquiler" })).toBeVisible();
    await page.evaluate(() => {
      const positions: number[] = [];
      (window as unknown as { scrollPositions: number[] }).scrollPositions = positions;
      addEventListener("scroll", () => positions.push(Math.round(scrollY)));
    });
    await clickSection(page, "Información");
    await expect(page).toHaveURL(/\/#info$/);
    await expectSectionUnderHeader(page, "info");
    const positions = await page.evaluate(
      () => (window as unknown as { scrollPositions: number[] }).scrollPositions,
    );
    expect(new Set(positions).size).toBeLessThanOrEqual(2);
  });
});

test("contact dialog has no accessibility violations", async ({ page }) => {
  await page.goto("/rent/mercedes-csl-350-amg");
  await page.getByRole("button", { name: "Consultar alquiler" }).click();
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});

test("catalogue URLs, sitemap, robots and not-found responses remain correct", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const urls = await page
    .locator(".vehicle-card h3 a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  expect(new Set(urls).size).toBe(23);
  for (const url of urls) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const url of urls) expect(xml).toContain(`https://antelu.es${url}`);
  expect((xml.match(/<loc>/g) ?? []).length).toBe(25);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://antelu.es/sitemap.xml",
  );
  const missing = await request.get("/rent/not-a-vehicle", {
    headers: { "User-Agent": "Googlebot" },
  });
  expect(missing.status()).toBe(404);
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  const data = JSON.parse(schema!);
  expect(data[1].itemListElement).toHaveLength(23);
  expect(schema).not.toContain("InStock");
  const socialImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(socialImage).toBeTruthy();
  const imageURL = new URL(socialImage!);
  const imageResponse = await request.get(`${imageURL.pathname}${imageURL.search}`);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toContain("image/");
});

for (const route of ["/", "/rent/mercedes-csl-350-amg"]) {
  test(`${route} has the same layout before and after hydration`, async ({
    browser,
    baseURL,
  }) => {
    const layout = async (hydrate: boolean) => {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      // Blocking app bundles keeps scripting on but freezes the pre-hydration markup.
      if (!hydrate)
        await page.route(/\/_next\/static\/chunks\/.*\.js/, (route) => route.abort());
      await page.goto(`${baseURL}${route}`);
      await page.evaluate(() => document.fonts.ready);
      if (hydrate) await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      const tops = await page.evaluate(() =>
        [".vehicle-card", "#info", ".product-details", ".site-footer"].map(
          (selector) =>
            document.querySelector(selector)?.getBoundingClientRect().top ?? null,
        ),
      );
      await context.close();
      return tops;
    };
    expect(await layout(true)).toEqual(await layout(false));
  });
}

test("hero category tiles open the matching filtered catalogue", async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const tiles = page.locator(".category-tile");
    await expect(tiles).toHaveCount(3);
    const clipped = await tiles.evaluateAll((elements) =>
      elements.flatMap((tile) =>
        [...tile.querySelectorAll<HTMLElement>(".category-name, .category-meta")]
          .filter((text) => text.scrollWidth > tile.clientWidth)
          .map((text) => text.textContent),
      ),
    );
    expect(clipped, `${width}px`).toEqual([]);
  }
  await expect(page.locator(".category-tile").nth(1)).toContainText("desde 9,99 €");
  await page.getByRole("link", { name: /^Motos/ }).click();
  await expect(page).toHaveURL(/#vehicles$/);
  await expect(page.getByRole("button", { name: "Motos", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".vehicle-card:visible")).toHaveCount(4);
});

test("specifications and prices use Spanish formatting", async ({ page }) => {
  await page.goto("/rent/mercedes-csl-350-amg");
  const specs = page.locator(".specification-list");
  await expect(specs).toContainText("Batería: 12 V 4,5 Ah");
  await expect(specs).toContainText("2 motores de 25 V");
  await page.goto("/rent/moto-cross-red");
  await expect(page.locator(".specification-list")).toContainText("Motor: 12 V");
  await expect(page.locator(".specification-list")).not.toContainText("×");
  await page.goto("/rent/moto-red");
  await expect(page.locator(".product-price del")).toHaveText("Precio anterior: 29,99 €");
  await page.goto("/rent/jeep-wragler");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Jeep Wrangler");
});

test("dialog close button is a full-size target without a mouse focus ring", async ({
  page,
}) => {
  await page.goto("/rent/mercedes-csl-350-amg");
  await page.getByRole("button", { name: "Consultar alquiler" }).click();
  const close = page.getByRole("button", { name: "Cerrar", exact: true });
  await expect(close).toBeFocused();
  const box = await close.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(await close.evaluate((element) => getComputedStyle(element).boxShadow)).toBe(
    "none",
  );
});

test("images show a skeleton until they load", async ({ page }) => {
  let release!: () => void;
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route(/\/_next\/image\?/, async (route) => {
    await held;
    await route.continue();
  });
  await page.goto("/rent/mercedes-csl-350-amg", { waitUntil: "domcontentloaded" });
  const photo = page.locator(".embla__slide img").first();
  await expect(photo).toHaveCSS("background-image", /data:image\/svg\+xml/);
  release();
  await expect(photo).toHaveCSS("background-image", "none");
  expect(
    await photo.evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);
});
