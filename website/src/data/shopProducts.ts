// src/data/shopProducts.ts

export type ShopTag = "him" | "her" | "corporate" | "both" | "custom";

export interface ShopProductFeatureBlock {
  title: string;
  points: string[];
}

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;      // primary image
  images: string[];   // gallery for product page
  features: ShopProductFeatureBlock[];
  tags: ShopTag[];    // ✅ NEW
}

export const shopProducts: ShopProduct[] = [
  {
    id: "vision-board",
    name: "2026 Vision Board DIY Kit",
    description:
      "This all-in-one Vision Board DIY Kit helps you map out your goals, visualize your dream life, and stay motivated throughout the year.",
    price: 549,
    image: "/img/visionboard.jpg",
    images: [
      "/img/visionboard-img1.jpg",
      "/img/visionboard-img2.jpg",
      "/img/visionboard-img3.jpg",
    ],
    tags: ["her", "him", "corporate", "custom"], // ✅ multi‑tag
    features: [
      {
        title: "What's inside",
        points: [
          "Premium A3 vision board base to build your 2026 roadmap",
          "Glue for easy, mess-free assembling of your vision layout",
          "Aesthetic, theme-based photos tailored to 2026 goals",
          "Decorative washi-style tapes for borders and layouts",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Students and young professionals planning their 2026 goals",
          "Creators, founders, and side‑hustlers",
          "New Year and milestone gifting",
        ],
      },
    ],
  },
  {
    id: "mini-desk-calendar",
    name: "2026 Mini Desk Calendar",
    description:
      "A calm, nature‑inspired 2026 mini desk calendar with clean layout, perfect for desks and study tables.",
    price: 349,
    image: "/img/minicalendar1.jpg",
    images: [
      "/img/minicalendar1.jpg",
      "/img/minicalendar2.jpg",
      "/img/minicalendar3.jpg",
    ],
    tags: ["her", "him", "corporate"], // ✅ corporate friendly
    features: [
      {
        title: "What's inside",
        points: [
          "Nature‑themed artwork for all 12 months",
          "High‑quality print with sharp colors",
          "Premium wooden easel stand",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Daily planning & habit tracking",
          "New Year gifting",
          "Desk décor enhancement",
        ],
      },
    ],
  },
  // baad me aur products add karo with tags: ["him"], ["her"], ["corporate"], etc.
];
