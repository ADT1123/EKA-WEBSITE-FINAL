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
    id: "vision-board",
    name: "2026 Vision Board DIY Kit",
    description:
      "This all-in-one Vision Board DIY Kit helps you map out your goals, visualize your dream life, and stay motivated throughout the year. Whether you’re focusing on career growth, self-improvement, better habits, or lifestyle upgrades, this kit is your perfect starting point.",
    price: 549,
    image: "img/visionboard.jpg",
    images: [
      "/img/visionboard-img1.jpg",
      "/img/visionboard-img2.jpg",
      "/img/visionboard-img3.jpg",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Premium A3 vision board base to build your 2026 roadmap",
          "Glue for easy, mess-free assembling of your vision layout",
          "Aesthetic, theme-based photos tailored to 2026 goals (career, wellness, finances, lifestyle, relationships)",
          "Decorative washi-style tapes for borders, sections, and creative layouts",
        ],
      },
      {
        title: "Perfect for",
        points: [
          "Students and young professionals planning their 2026 goals and milestones",
          "Creators, founders, and side‑hustlers who want a visual roadmap for projects and ambitions",
          "Gifting for New Year, birthdays, or goal-setting retreats and workshops",
        ],
      },
    ],
  },
  {
    id: "mini-desk-calendar",
    name: "2026 Mini Desk Calendar",
    description:
      "Start your year with clarity and calm. This beautifully designed 2026 Mini Desk Calendar features soothing, nature-inspired artwork paired with a clean, minimalist date layout — perfect for your work desk, study table, or home décor.",
    price: 349,
    image: "/img/minicalendar1.jpg",
    images: [
      "/img/minicalendar1.jpg",
      "/img/minicalendar2.jpg",
      "/img/minicalendar3.jpg",
    ],
    features: [
      {
        title: "What's inside",
        points: [
          "Beautiful nature-themed artwork for all 12 months",
          "High-quality print with sharp colors",
          "Premium wooden easel stand included",
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
