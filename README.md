# Nina Passenier Fotografie

Persoonlijke website voor Nina Passenier — bedrijfsfotografie en kunstfotografie uit Rotterdam.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** met custom palette uit het logo
- **Framer Motion** voor subtiele animaties
- **Next/Image** met remote Unsplash placeholders
- Deploy target: **Vercel**

## Kleurenpalet (uit logo)

| Naam | Hex | Gebruik |
|---|---|---|
| Oranje | `#E8913A` | Accent bedrijfsfotografie |
| Mosterdgeel | `#E8B544` | Highlights |
| Saliegroen | `#8FA368` | Accent kunstfotografie |
| Petrolblauw | `#3E6773` | Secundair/nav |
| Warm beige | `#C9A988` | Zachte vlakken |
| Cream | `#FAF7F2` | Achtergrond |
| Ink | `#1A1A1A` | Tekst |

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy naar Vercel

1. Push naar GitHub
2. Ga naar vercel.com → "New Project" → importeer deze repo
3. Klik Deploy — geen config nodig

## Structuur

```
app/
  layout.tsx          Root layout + fonts + nav/footer
  page.tsx            Homepage
  bedrijfsfotografie/ Zakelijk werk
  kunstfotografie/    Vrij werk + series
  cases/              Overzicht + dynamische detail route
  over/               Over Nina
  werkwijze/          Proces in 6 stappen
  contact/            Contactformulier
components/
  Navigation.tsx      Sticky nav + mobile menu
  Footer.tsx
  Logo.tsx            SVG-reconstructie van het logo — vervang door /public/logo.svg wanneer beschikbaar
  PhotoCard.tsx       Herbruikbare foto met hover
  SectionHeader.tsx
  Button.tsx
  ColorBlob.tsx       Decoratieve blur-vlek uit logo-palet
lib/
  photos.ts           Alle foto-urls (placeholders uit Unsplash)
  cases.ts            Case data
```

## Content vervangen

**Foto's** — Vervang Unsplash URL's in [lib/photos.ts](lib/photos.ts) en [lib/cases.ts](lib/cases.ts) door Nina's eigen werk. Upload naar `public/images/` en gebruik `/images/bestand.jpg` als src.

**Logo** — [components/Logo.tsx](components/Logo.tsx) is een reconstructie. Upload het echte logo als `public/logo.svg` en vervang de component-inhoud door:
```tsx
import Image from "next/image";
export default function Logo({ className }) {
  return <Image src="/logo.svg" alt="Nina Passenier Fotografie" width={200} height={70} className={className} />;
}
```

**Teksten** — Alle teksten staan direct in de page-bestanden. Zoek en vervang.

## Mobile first

De site is mobile first ontworpen: hero vult het scherm, pijlers onder elkaar, swipebare beeldstrips, grote typografie, duidelijke CTA's. Desktop breidt uit met grid-layouts en meer witruimte.

## Design principes

- **Twee pijlers, één merk** — bedrijf (oranje/petrol) en kunst (groen/beige) delen typografie, witruimte en nav
- **Beeld eerst** — foto's leidend, tekst ondersteunend
- **Rust & ruimte** — veel whitespace, ongehaaste opbouw
- **Overlappende kleurvlakken** — ColorBlob-component vertaalt logo-vormtaal naar de site

## Volgende stappen (optioneel)

- [ ] Echte foto's van Nina invoegen
- [ ] Echt logo als SVG
- [ ] CMS koppelen (Sanity) voor cases
- [ ] Contactformulier via Resend of Formspree
- [ ] Open Graph afbeelding
- [ ] Favicon
