// src/data/shopProducts.ts
export type Audience = "her" | "him" | "both";

export type ShopProduct = {
  id: string;
  name: string;
  audience: Audience;
  price: number;
  description: string;
  image: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: "s1",
    name: "Pastel Self-Care Kit",
    audience: "her",
    price: 1499,
    description: "A soft, calming box with bath, skin and journaling accents.",
    image: "/img/EKAPNGLOGO.png",
  },
  {
    id: "s2",
    name: "Workspace Upgrade Set",
    audience: "him",
    price: 1799,
    description: "Desk add-ons for a clean, focused work setup.",
    image: "/img/EKAPNGLOGO.png",
  },
  {
    id: "s3",
    name: "Movie Night for Two",
    audience: "both",
    price: 1999,
    description: "Snacks, cosy add-ons and small touches for an easy movie night.",
    image: "/img/EKAPNGLOGO.png",
  },
  // aur products add kar sakta hai...
];
