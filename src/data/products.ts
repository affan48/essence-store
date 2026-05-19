import coat from "@/assets/product-coat.jpg";
import boots from "@/assets/product-boots.jpg";
import glasses from "@/assets/product-glasses.jpg";
import bag from "@/assets/product-bag.jpg";
import knit from "@/assets/product-knit.jpg";
import trouser from "@/assets/product-trouser.jpg";
import editorialModel from "@/assets/editorial-model.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  image: string;
  altImage: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "sculpted-wool-overcoat",
    name: "Sculpted Wool Overcoat",
    category: "Outerwear",
    collection: "winter-archive",
    price: 1240,
    image: coat,
    altImage: editorialModel,
    colors: [
      { name: "Onyx", hex: "#0a0a0a" },
      { name: "Ash", hex: "#3d3d3d" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description:
      "An oversized double-breasted overcoat cut from densely woven Italian virgin wool. Cocoon silhouette with dropped shoulders and a single back vent.",
  },
  {
    id: "oblique-chelsea-boot",
    name: "Oblique Chelsea Boot",
    category: "Footwear",
    collection: "winter-archive",
    price: 890,
    image: boots,
    altImage: coat,
    colors: [
      { name: "Noir", hex: "#0a0a0a" },
      { name: "Espresso", hex: "#3a2a1f" },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description:
      "Hand-finished calfskin Chelsea with an angled topline and stacked leather sole. Made in our Tuscan atelier.",
  },
  {
    id: "mono-lens-frame",
    name: "Mono Lens Frame",
    category: "Accessories",
    collection: "objects",
    price: 420,
    image: glasses,
    altImage: bag,
    colors: [
      { name: "Tortoise", hex: "#2a1a0f" },
      { name: "Matte Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    description:
      "Italian acetate frame with bio-based hinges and micro-engraved temples. Clear lenses, prescription-ready.",
  },
  {
    id: "atrium-leather-tote",
    name: "Atrium Leather Tote",
    category: "Accessories",
    collection: "objects",
    price: 1480,
    image: bag,
    altImage: glasses,
    colors: [
      { name: "Noir", hex: "#0a0a0a" },
      { name: "Concrete", hex: "#7a7a78" },
    ],
    sizes: ["One Size"],
    badge: "Editor's Pick",
    description:
      "Unlined tote in vegetable-tanned calfskin that develops a patina with use. Magnetic closure, interior phone slip.",
  },
  {
    id: "cirrus-cashmere-knit",
    name: "Cirrus Cashmere Knit",
    category: "Knitwear",
    collection: "winter-archive",
    price: 680,
    image: knit,
    altImage: trouser,
    colors: [
      { name: "Ivory", hex: "#f1ead9" },
      { name: "Smoke", hex: "#5a5a5a" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Mid-weight rib-knit pullover spun from Mongolian cashmere. Boxy fit, ribbed crew neck, hand-linked seams.",
  },
  {
    id: "pleated-twill-trouser",
    name: "Pleated Twill Trouser",
    category: "Trousers",
    collection: "tailoring",
    price: 540,
    image: trouser,
    altImage: coat,
    colors: [
      { name: "Onyx", hex: "#0a0a0a" },
      { name: "Char", hex: "#2c2c2c" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Double-pleat tailored trouser in heavy black twill. Tapered through the leg with a clean unbroken hem.",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export type Collection = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
};

export const collections: Collection[] = [
  {
    slug: "winter-archive",
    title: "Winter Archive 01",
    tagline: "Monochrome layering, sculptural silhouettes",
    description:
      "Twelve pieces studying weight, drape, and the geometry of cold weather.",
    cover: editorialModel,
  },
  {
    slug: "tailoring",
    title: "Tailoring Studio",
    tagline: "Cut for the modern body, finished by hand",
    description: "Suits, trousers, and shirting drafted in our Antwerp studio.",
    cover: trouser,
  },
  {
    slug: "objects",
    title: "Objects & Accessories",
    tagline: "Quiet companions for daily ritual",
    description: "Leather, lenses, and small goods designed to last decades.",
    cover: bag,
  },
];

export const posts = [
  {
    slug: "the-permanence-of-black",
    title: "The Permanence of Black",
    excerpt:
      "Why we keep returning to the absence of color, and what it teaches us about restraint.",
    category: "Editorial",
    readTime: "6 min",
    date: "Nov 2026",
    cover: editorialModel,
  },
  {
    slug: "inside-the-antwerp-atelier",
    title: "Inside the Antwerp Atelier",
    excerpt:
      "A photo essay from the small studio where the Winter Archive was drafted.",
    category: "Studio",
    readTime: "9 min",
    date: "Oct 2026",
    cover: coat,
  },
  {
    slug: "a-note-on-cashmere",
    title: "A Note on Cashmere",
    excerpt: "How we source, grade, and finish the fiber that defines our knitwear.",
    category: "Materials",
    readTime: "4 min",
    date: "Sep 2026",
    cover: knit,
  },
];