// Placeholder foto's van Unsplash.
// Vervang deze door Nina's eigen werk: zet bestanden in /public/images/ en pas het src-pad aan.

export type Photo = {
  src: string;
  alt: string;
  title?: string;
  meta?: string;
};

export const businessPhotos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80", alt: "Zakelijk portret", title: "Brand portret", meta: "Amsterdam, 2025" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80", alt: "Team foto", title: "Team De Waal", meta: "Rotterdam, 2025" },
  { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", alt: "Interieur shoot", title: "Studio visit", meta: "Den Haag, 2024" },
  { src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80", alt: "Campagne shoot", title: "Campagne SS25", meta: "Utrecht, 2025" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80", alt: "Corporate event", title: "Jaarevent Nova", meta: "Rotterdam, 2024" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80", alt: "Branding portret", title: "Maker portret", meta: "Rotterdam, 2025" }
];

export const artPhotos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1600&q=80", alt: "Stil", title: "Wachtkamer", meta: "Serie &middot; 2024" },
  { src: "https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?w=1600&q=80", alt: "Schaduw", title: "Zacht licht", meta: "Serie &middot; 2024" },
  { src: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1600&q=80", alt: "Portret", title: "Ongezien", meta: "Serie &middot; 2025" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80", alt: "Landschap", title: "Randen", meta: "Serie &middot; 2025" },
  { src: "https://images.unsplash.com/photo-1508182314998-3bd49473002f?w=1600&q=80", alt: "Detail", title: "Fragment", meta: "Serie &middot; 2024" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80", alt: "Nacht", title: "Na middernacht", meta: "Serie &middot; 2025" }
];

export const heroStrip: Photo[] = [
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80", alt: "Portret 1" },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80", alt: "Portret 2" },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80", alt: "Portret 3" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80", alt: "Portret 4" },
  { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", alt: "Werk 1" },
  { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80", alt: "Werk 2" },
  { src: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=1200&q=80", alt: "Werk 3" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80", alt: "Werk 4" }
];

// Placeholder — vervang door Nina's eigen werk (bijv. Zeeland kust of Rotterdam haven)
export const heroImage = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2000&q=85";
export const ninaPortret = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=85";
