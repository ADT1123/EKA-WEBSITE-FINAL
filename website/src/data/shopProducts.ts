// src/data/shopProducts.ts

export interface ShopProductFeatureBlock {
  title: string;
  points: string[];
}

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;               // primary image
  images: string[];            // gallery images for product page
  features: ShopProductFeatureBlock[];
}

export const shopProducts: ShopProduct[] = [
  {
    id: "luxury-her-1",
    name: "Elegance Collection",
    description:
      "A refined curation of self-care, accessories, and indulgent treats for a luxe gifting experience.",
    price: 2499,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Elegance",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Elegance+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Elegance+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Elegance+3",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Elegance+4",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Premium skincare minis set",
          "Delicate everyday jewelry piece",
          "Artisanal chocolates or gourmet sweets",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Birthdays and anniversaries",
          "Congratulations or milestones",
          "Thank‑you gestures",
        ],
      },
    ],
  },
  {
    id: "luxury-him-1",
    name: "Gentleman's Choice",
    description:
      "Thoughtfully curated essentials for someone who appreciates quality, comfort, and style.",
    price: 2799,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Gentleman",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Gentleman+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Gentleman+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Gentleman+3",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Premium grooming essentials",
          "Leather or faux‑leather accessory",
          "Snack or beverage add‑on",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Colleagues and friends",
          "Festive gifting",
          "Graduation or promotion",
        ],
      },
    ],
  },
  {
    id: "luxury-both-1",
    name: "Couple's Delight",
    description:
      "A cozy, shared box designed to be enjoyed together and remembered for longer.",
    price: 3499,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Couple",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Couple+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Couple+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Couple+3",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Paired or complementary keepsakes",
          "Gourmet treats to share",
          "Home ambience item (candle, diffuser, etc.)",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Anniversaries and weddings",
          "Valentine’s Day",
          "Housewarming for couples",
        ],
      },
    ],
  },
  {
    id: "budget-her-1",
    name: "Sweet Surprise",
    description:
      "A compact, value‑friendly box that still feels warm, personal, and thoughtful.",
    price: 999,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Sweet",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Sweet+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Sweet+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Sweet+3",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Cute lifestyle or stationery item",
          "Snack or confectionery",
          "Mini self‑care or beauty pick",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Last‑minute gifts",
          "Casual appreciation",
          "Small celebrations",
        ],
      },
    ],
  },
  {
    id: "budget-him-1",
    name: "Classic Combo",
    description:
      "Practical, easy‑to‑use pieces that make everyday life a little nicer.",
    price: 1299,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Classic",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Classic+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Classic+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Classic+3",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Daily‑use accessory or organizer",
          "Snack / beverage element",
          "Utility or desk item",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Team gifting",
          "Festivals",
          "First‑time gifting",
        ],
      },
    ],
  },
  {
    id: "premium-both-1",
    name: "Anniversary Special",
    description:
      "An elevated celebration box built around keepsakes, indulgence, and memorable details.",
    price: 4999,
    image: "https://placehold.co/600x400/ffd27a/4b2c5e?text=Anniversary",
    images: [
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Anniv+1",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Anniv+2",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Anniv+3",
      "https://placehold.co/600x400/ffd27a/4b2c5e?text=Anniv+4",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Hero keepsake or custom item",
          "Premium gourmet / dessert element",
          "Home decor or ambience piece",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Anniversaries",
          "Major milestones",
          "“Big gesture” surprises",
        ],
      },
    ],
  },
];
