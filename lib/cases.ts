export type Case = {
  slug: string;
  client: string;
  year: string;
  type: "bedrijf" | "kunst";
  title: string;
  intro: string;
  cover: string;
  images: string[];
  approach: string;
  quote?: { text: string; author: string };
};

export const cases: Case[] = [
  {
    slug: "de-waal-branding",
    client: "De Waal Advocaten",
    year: "2025",
    type: "bedrijf",
    title: "Een menselijke kant voor een formeel kantoor",
    intro:
      "Advocatenkantoor De Waal wilde af van het stockbeeld op hun website. Ik fotografeerde het team in hun eigen werkritme, zonder stropdas-poses.",
    cover: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=2000&q=85",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
      "https://images.unsplash.com/photo-1552581234-26160f608093?w=1600&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80"
    ],
    approach:
      "Een halve dag meelopen op kantoor, zonder strakke shotlist. Ik werk vaak het liefst als ik even onzichtbaar mag zijn: mensen vergeten de camera, en dan gebeurt het echte.",
    quote: {
      text: "Voor het eerst herkennen we onszelf op onze eigen website.",
      author: "Rutger de Waal, partner"
    }
  },
  {
    slug: "nova-campagne-ss25",
    client: "Nova Kledingmerk",
    year: "2025",
    type: "bedrijf",
    title: "SS25 campagne op locatie in Zeeland",
    intro:
      "Voor kledingmerk Nova schoot ik de zomercampagne op de Zeeuwse kust. Rustig licht, zoute lucht, en een paar gelukkige toevalligheden.",
    cover: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=2000&q=85",
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80"
    ],
    approach:
      "Moodboard samen met de ontwerper, locatiescouting vooraf, en op de dag zelf veel ruimte laten voor wat het weer en licht doen. De beste frames waren niet gepland."
  },
  {
    slug: "wachtkamer-serie",
    client: "Eigen werk",
    year: "2024",
    type: "kunst",
    title: "Wachtkamer — een serie over verstilde ruimtes",
    intro:
      "Een langlopend project over plekken waar mensen even niet weten wat ze met zichzelf aan moeten. Wachtkamers, stationshallen, gangen.",
    cover: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=2000&q=85",
    images: [
      "https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?w=1600&q=80",
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
      "https://images.unsplash.com/photo-1508182314998-3bd49473002f?w=1600&q=80"
    ],
    approach:
      "Anderhalf jaar rondlopen met een analoge camera. Geen opdracht, geen deadline. Alleen kijken wat blijft hangen als je terug thuiskomt."
  }
];
