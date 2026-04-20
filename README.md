# Nina Passenier Fotografie

Persoonlijke website voor Nina Passenier — bedrijfsfotografie en vrij werk uit Rotterdam.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** met een minimalistisch palet
- **Next/Image** met remote Unsplash placeholders
- Deploy target: **Vercel**

## Palet

| Naam | Hex | Gebruik |
|---|---|---|
| Cream | `#FAF7F2` | Achtergrond |
| Ink | `#1A1A1A` | Tekst & accenten |

Aanvullende kleuren uit het logo (oranje, geel, groen, petrol, beige) zijn nog gedefinieerd in `tailwind.config.ts` maar worden in de huidige minimalistische stijl niet gebruikt.

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
  vrij-werk/          Vrij werk + series + exposities
  cases/              Overzicht + dynamische detail route
  over/               Over Nina
  werkwijze/          Proces in 6 stappen
  contact/            Contactformulier
components/
  Navigation.tsx      Sticky nav + mobile menu
  Footer.tsx
  Logo.tsx
  PhotoCard.tsx
  SectionHeader.tsx
  Button.tsx
lib/
  photos.ts           Alle foto-urls (placeholders uit Unsplash)
  cases.ts            Case data
```

## Content vervangen

**Foto's** — Vervang Unsplash URL's in [lib/photos.ts](lib/photos.ts) en [lib/cases.ts](lib/cases.ts) door Nina's eigen werk. Upload naar `public/images/` en gebruik `/images/bestand.jpg` als src.

**Teksten** — Alle teksten staan direct in de page-bestanden. Zoek en vervang.

## Design principes

- **Minimalistisch** — rust, witruimte en typografie voeren het beeld
- **Beeld eerst** — foto's leidend, tekst ondersteunend
- **Palet van twee** — cream en ink; geen gekleurde accenten die afleiden van het werk
- **Scherpe randen** — geen afgeronde hoeken of decoratieve vormen

## Volgende stappen (optioneel)

- [ ] Echte foto's van Nina invoegen
- [ ] Echt logo als SVG
- [ ] CMS koppelen (Sanity) voor cases
- [ ] Contactformulier via Resend of Formspree
- [ ] Open Graph afbeelding
- [ ] Favicon
