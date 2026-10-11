# Antelu

Children's vehicle-rental catalogue for [antelu.es](https://antelu.es) in Spanish, Galician,
English and Ukrainian.
Next.js App Router, React, strict TypeScript, Tailwind, Radix, Embla and a photo gallery.
Enquiries go directly to phone or WhatsApp; there is no booking backend or payment processing.

## Development

Use Node 24 (see `.nvmrc`) and Yarn Classic 1.22.22. Do not create a second lockfile.

```sh
nvm use
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install --frozen-lockfile
yarn dev
```

The development server normally uses http://localhost:3000. If that port is occupied:

```sh
yarn dev --port 3101
```

No credentials or environment variables are needed locally. `VERCEL_ENV=preview` disables
search indexing on Vercel preview deployments; production remains indexable.

## Quality Checks

```sh
yarn lint
yarn typecheck
yarn format:check
yarn build
yarn playwright install chromium webkit
yarn test:e2e
```

The browser suite starts its own **production** server on port 3102. Build first, and keep
that port free or set `PLAYWRIGHT_PORT`. To test an existing development server:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:3000 yarn test:e2e
```

Tests cover Chromium, WebKit and mobile Chromium, catalogue filtering, vehicle-specific
enquiries, photo controls, keyboard navigation, axe accessibility, 320-1920px layouts,
no-JavaScript content, all existing vehicle URLs, canonical metadata, the sitemap and the
language rules below. The suite browses as a Spanish browser unless a test sets a language.
External phone/chat links are inspected, never used to place calls or send messages.
GitHub Actions runs the same quality gates and retains browser failure artifacts.

## Languages

Spanish keeps the original unprefixed URLs (`/`, `/gallery`, `/rent/[slug]`). Galician,
English and Ukrainian live under `/gl`, `/en` and `/uk` (`uk` is the language code; the
switcher shows "UA"). [src/proxy.ts](src/proxy.ts) decides which version to show:

1. A `/gl`, `/en` or `/uk` URL is always shown as requested.
2. A language chosen in the switcher is saved in the `NEXT_LOCALE` cookie and wins over
   the browser language, redirecting Spanish URLs on later visits.
3. Otherwise, browsers that prefer English or Ukrainian are redirected to that language,
   unless they also list Spanish or Galician.
4. Everyone else sees Spanish. If their preferred language differs, a dismissible bar
   suggests it once (for example Galician browsers, or English browsers that also read Spanish).
5. Search engines and link-preview bots are never redirected.

Spanish pages are rendered from `/es/...` internally. Each page declares its translations
with `hreflang`, and the sitemap lists all four versions. Text lives in
[src/i18n/messages](src/i18n/messages); `es.ts` defines the structure the other languages
must follow, so TypeScript reports missing translations. Vehicle names and photo descriptions
are translated in the content files (below); an empty translation falls back to Spanish and
brand model names stay unchanged. WhatsApp enquiries are prefilled in the
visitor's language. Ukrainian headings use Manrope because Bricolage has no Cyrillic.

## Editing Vehicles And Photos

Vehicles and gallery photos are edited at **antelu.es/admin** with
[Sveltia CMS](https://sveltiacms.app), a free editor that saves straight to this repository.
There is no database or extra service; every save is a commit to `master`, which Vercel
publishes in a minute or two.

1. Open `https://antelu.es/admin` in a desktop or mobile browser.
2. Choose **Sign In Using Access Token** (the only option shown; GitHub's own login would
   need an extra OAuth server) and follow its link to GitHub, which pre-fills the
   permissions. The account needs write access to this repository. The token stays in that
   browser; generate a new one if it expires.
3. Edit **Vehicles** or **Gallery**, then **Save**. Spanish is the only required language.
   Photos (including iPhone HEIC) are resized to 2000 px and converted to WebP on upload.

What each field does:

- `id` is the public URL (`/rent/<id>`); keep it unchanged once published.
- The first vehicle photo is the catalogue cover; drag to reorder.
- `previousPrice` is the crossed-out price; it is ignored unless it is higher than `price`.
- **Ocultar en la web** hides a vehicle (and its page) without deleting it.
- In the gallery, **Mostrar en la página de inicio** picks the three homepage collage photos.

The content is in [src/content](src/content) and the photos in [public/images](public/images);
the editor's fields are defined in [public/admin/config.yml](public/admin/config.yml). Every
build checks the content in [src/lib/content.ts](src/lib/content.ts): a missing photo, an
empty Spanish name or a duplicate `id` fails the build with the entry's position, so a bad
edit never replaces the live site (Vercel keeps the previous deployment and emails the
failure). Fix it in the editor or revert the commit.

To try changes without publishing, run `yarn dev`, open
`http://localhost:3000/admin/index.html` in Chrome or Edge and choose **Work with Local
Repository**; it edits local files that you commit yourself.

The editor script is pinned to an exact version with an integrity hash in
[public/admin/index.html](public/admin/index.html), because that page holds a GitHub token.
To upgrade, change the version in both files and replace the hash with the output of
`curl -sL https://unpkg.com/@sveltia/cms@VERSION/dist/sveltia-cms.js | openssl dgst -sha384 -binary | openssl base64 -A`.

## Content And Structure

- [src/data/constants.ts](src/data/constants.ts): business details, navigation paths and phone numbers.
- [src/i18n](src/i18n): supported languages, URL helpers, plural rules, price formatting and WhatsApp links.
- [src/content](src/content): vehicles and gallery photos, edited through the CMS (see above) and validated by [src/lib/content.ts](src/lib/content.ts).
- [src/components/VehicleCatalogue.tsx](src/components/VehicleCatalogue.tsx): category and age controls; the cards themselves are server-rendered. Unknown ages do not match a selected numeric age.
- [src/components/ReserveNowButton.tsx](src/components/ReserveNowButton.tsx): a direct WhatsApp link before hydration, enhanced to a Radix contact dialog. Phone links always work without JavaScript.
- [src/app/globals.css](src/app/globals.css): shared tokens, typography and responsive layouts. Fonts are served locally through Fontsource.
- [src/app/sitemap.ts](src/app/sitemap.ts): generated from the same vehicle IDs. Pages retain `/`, `/gallery`, `/rent/[slug]` and the existing homepage anchors.

Product pages are statically generated, so content changes are published by a rebuild.
Gallery thumbnails use CSS columns and intrinsic image dimensions so the layout is stable
before JavaScript loads; only the existing lightbox is loaded on demand. Carousel photos
do not autoplay.
Unsupported slugs use Next's not-found handling rather than a success response containing "404".
There are no invented stock states, reviews, safety certifications or structured offers.
Structured business data omits provisional operational details until they are confirmed.

The homepage category tiles reuse existing Jeep, motocross and pony product photographs;
CSS blends their white backgrounds into the tile colour, so no edited copies are stored.
Tile counts and starting prices are calculated from the vehicle data. The social image
([public/opengraph-image.jpg](public/opengraph-image.jpg)) is a 1200x630 capture of the
local design, styled for sharing. Regenerate it when branding changes. The favicon was
regenerated from the existing icon SVG to fix
an invalid ICO dimension header.

## Required Before Launch

Business facts were carried over from the published site and are **provisional**:

- Confirm the phone/WhatsApp account and that the secondary Telegram phone link works and is monitored.
- Confirm the Odeon location in Naron and daily 11:00-21:00 hours.
- Confirm daily prices, crossed-out prices and the EUR 50 deposit per vehicle.
- Confirm collection/return arrangements, adult renter and ID requirements, delivery coverage and extra charges.
- Verify every age range, maximum load, battery and motor specification. Existing motor units such as `25V` were retained, not silently changed to watts.
- Verify any insurance, damage, cancellation or licensing claims before adding them. The old unverified insurance guarantee and official-licence display are not repeated.
- Confirm permission to publish all existing photographs, especially those with identifiable children.
- Have a native speaker review the Galician and Ukrainian text, and confirm the owner can reply to WhatsApp enquiries in English and Ukrainian.
- Review the final site on a real phone, verify the intended WhatsApp account manually without sending an automated message, and check the live social preview after deployment.

No booking is confirmed by the website. Dates, availability and final terms are agreed
directly with Antelu.

## Revision Verification

The local production build passed lint, strict typechecking, formatting and 48 browser
tests on Chromium, WebKit and mobile Chromium. Desktop/mobile screenshots were reviewed.
Mobile Lighthouse measurements on the final build (10 October 2026):

| Page            | Performance | Accessibility | Best Practices | SEO | LCP   | CLS   |
| --------------- | ----------- | ------------- | -------------- | --- | ----- | ----- |
| Home            | 94          | 100           | 100            | 100 | 3.1 s | 0.003 |
| Mercedes detail | 96          | 100           | 100            | 100 | 2.8 s | 0.011 |
| Gallery         | 91          | 100           | 100            | 100 | 3.6 s | 0     |

These are local lab measurements, not field Core Web Vitals. All performance scores meet
the 90-point target, but LCP still exceeds the aspirational 2.5-second budget. Recheck on
the deployed CDN before claiming field performance. No real-device or owner-operated
phone/chat verification has been performed.

Yarn currently reports peer-range warnings from Radix icons and Next's ESLint plugins,
plus the axe/Playwright transitive dependency. The installed tree passes the checks above;
the warnings should be revisited with compatible upstream releases. No dependency
vulnerability audit is claimed by the Lighthouse best-practices score.
