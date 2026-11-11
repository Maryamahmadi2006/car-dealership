# Luxury Car Dealership — React + Vite

A multi-page rebuild of the [Framer car dealership template](https://car-dealership.framer.website/)
with real client-side routing, animated reveals, a live-search hero, working inventory
filters, and a fully responsive layout.

## Run

```bash
npm install     # once
npm run dev     # dev server (http://localhost:5173)
```

Production build & preview:

```bash
npm run build   # outputs dist/
npm run preview # serves dist/ (http://localhost:4173)
```

> If the workspace hoists `vite` to the parent folder, the equivalent command is
> `node "..\node_modules\vite\bin\vite.js" build` from this directory.

## Routes

| Path                  | Page                       |
| --------------------- | -------------------------- |
| `/`                   | Home (hero, featured, services, testimonials, team, blog, CTA, FAQ) |
| `/inventory`          | Inventory + live filters   |
| `/inventory/:slug`    | Vehicle detail (gallery, specs, accordions, CTA, featured cars) |
| `/trade-in`           | Trade-in (steps, why-us, valuation form, FAQ) |
| `/financing`          | Financing (steps, why-us, application form, FAQ) |
| `/about-us`           | About (mission, promise stats, team) |
| `/contact`            | Contact (map, info cards, form, FAQ) |
| `*`                   | 404                        |

## Structure

```
src/
  components/   Navbar, Footer, Button, Hero, CarCard, PageHero, LeadForm,
                Accordion, FaqSection, CtaSection, StepsSection, WhyUsSection,
                ServicesSection, SearchBox, Reveal, Icons, Section…
  data/site.js      All page copy (single source of truth)
  data/vehicles.js  8 vehicles with specs/history/features (getCar/getVehicle)
  pages/        Home, InventoryPage, VehicleDetail, TradeIn, Financing,
                About, Contact, NotFound
  styles/       global.css (tokens, shell, nav, buttons, footer, vehicle)
                ui.css (section headers, stats, search, FAQ, forms, team)
                home.css (hero card, featured, services, testimonials, blog)
                pages.css (page heroes, filters, steps, why-us, mission, contact)
public/images/  43 optimized .webp/.png assets
```

## Notes

- Forms are front-end only: native validation, then a confirmation panel (no backend).
- Anchor CTAs (`#filters`, `#form`, `#blog`, `/about-us#team`) clear the fixed nav via
  `scroll-margin-top`.
- The hero search shows the top 5 matching vehicles and links to their detail pages.
- Breakpoints: `1199.98px`, `809.98px`, `599.98px`.
