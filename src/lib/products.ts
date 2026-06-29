const babyWash = "https://cdn.shopify.com/s/files/1/0913/7704/1688/files/53.jpg?v=1756793579";
const ubtan = "https://cdn.shopify.com/s/files/1/0913/7704/1688/files/26_64dbc5e7-91da-4013-875a-b6eab4f866d4.jpg?v=1767935786";
const coconut = "https://cdn.shopify.com/s/files/1/0913/7704/1688/files/Coconut275.jpg?v=1757289027";
const butter = "https://cdn.shopify.com/s/files/1/0913/7704/1688/files/28.jpg?v=1742198783";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  variantId: string;
  concern: "sensitive" | "everyday" | "traditional" | "massage" | "mom";
  naturalOrigin: number;
  size: string;
  description: string;
  hero: string[];
  ingredients: { name: string; purpose: string; percent?: string }[];
  howToUse: string[];
};

export const products: Product[] = [
  {
    slug: "baby-wash",
    name: "Baby Wash",
    tagline: "Gentle cleansing for sensitive skin",
    price: 599,
    rating: 4.8,
    reviews: 245,
    image: babyWash,
    concern: "everyday",
    naturalOrigin: 97,
    size: "200 ml",
    description:
      "A tear-free, fragrance-free wash formulated for newborn skin. Cleanses without stripping the skin barrier — leaves skin soft, calm, and never tight.",
    hero: ["Tear-free", "Fragrance-free", "pH 5.5 — skin-matched"],
    ingredients: [
      { name: "Coco Glucoside", purpose: "Ultra-mild plant-derived cleanser", percent: "12%" },
      { name: "Calendula Extract", purpose: "Soothes sensitive skin", percent: "2%" },
      { name: "Glycerin (vegetable)", purpose: "Locks in moisture", percent: "5%" },
      { name: "Aqua", purpose: "Solvent base", percent: "78%" },
    ],
    howToUse: [
      "Wet baby's skin with warm water.",
      "Take a 5-rupee-coin sized amount, lather between palms.",
      "Massage gently, rinse thoroughly. Use daily.",
    ],
  },
  {
    slug: "ubtan-sunni-pindi",
    name: "Ubtan Sunni Pindi",
    tagline: "Traditional baby bath powder",
    price: 490,
    rating: 4.9,
    reviews: 320,
    image: ubtan,
    concern: "traditional",
    naturalOrigin: 100,
    size: "150 g",
    description:
      "A heritage Telugu recipe of stone-ground green gram, turmeric, and almond. Gently exfoliates, evens tone, and softens skin — the way grandmothers always knew.",
    hero: ["100% natural origin", "No preservatives", "Heritage recipe"],
    ingredients: [
      { name: "Green Gram Flour", purpose: "Gentle cleanse + exfoliation", percent: "60%" },
      { name: "Turmeric (Lakadong)", purpose: "Brightens, calms", percent: "8%" },
      { name: "Sweet Almond Powder", purpose: "Nourishes & softens", percent: "20%" },
      { name: "Sandalwood", purpose: "Cooling, soothing", percent: "12%" },
    ],
    howToUse: [
      "Mix 1 tsp with milk or water into a soft paste.",
      "Apply to damp skin in circular motions.",
      "Rinse with lukewarm water. Use 2–3× per week.",
    ],
  },
  {
    slug: "virgin-coconut-oil",
    name: "Virgin Coconut Oil",
    tagline: "Massage & daily nourishment",
    price: 566,
    rating: 4.8,
    reviews: 180,
    image: coconut,
    concern: "massage",
    naturalOrigin: 100,
    size: "250 ml",
    description:
      "Cold-pressed, unrefined virgin coconut oil from Kerala. The same oil generations of Indian mothers have trusted — bottled with full traceability.",
    hero: ["Cold-pressed", "Single-origin", "Edible-grade"],
    ingredients: [
      { name: "Virgin Coconut Oil", purpose: "Nourishes & moisturises", percent: "100%" },
    ],
    howToUse: [
      "Warm a few drops between palms.",
      "Massage in slow, gentle strokes before bath.",
      "Use daily — body, scalp, and dry patches.",
    ],
  },
  {
    slug: "moisturising-butter",
    name: "Moisturising Butter",
    tagline: "Deep moisture for dry skin",
    price: 699,
    rating: 4.9,
    reviews: 210,
    image: butter,
    concern: "sensitive",
    naturalOrigin: 96,
    size: "100 g",
    description:
      "A rich, whipped body butter with raw shea, mango butter, and oat. Locks in moisture for 24 hours without feeling heavy or sticky.",
    hero: ["24h moisture", "Non-greasy", "Eczema-friendly"],
    ingredients: [
      { name: "Raw Shea Butter", purpose: "Deep barrier repair", percent: "35%" },
      { name: "Mango Butter", purpose: "Softens & smooths", percent: "20%" },
      { name: "Colloidal Oats", purpose: "Calms itchy, dry skin", percent: "5%" },
      { name: "Sunflower Oil", purpose: "Supports skin barrier", percent: "36%" },
    ],
    howToUse: [
      "Apply to clean, slightly damp skin.",
      "Massage in gently after bath.",
      "Reapply on dry patches as needed.",
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

import concernSensitive from "@/assets/concern-sensitive.jpg";
import concernEveryday from "@/assets/concern-everyday.jpg";
import concernTraditional from "@/assets/concern-traditional.jpg";
import concernMassage from "@/assets/concern-massage.jpg";
import concernMom from "@/assets/concern-mom.jpg";
import concernDiaper from "@/assets/concern-diaper.jpg";

export const concerns = [
  { id: "sensitive", label: "Dry & Sensitive Skin", image: concernSensitive },
  { id: "everyday", label: "Gentle Everyday Cleansing", image: concernEveryday },
  { id: "traditional", label: "Traditional Baby Bath", image: concernTraditional },
  { id: "diaper", label: "Diaper Rash", image: concernDiaper },
  { id: "massage", label: "Massage & Moisture", image: concernMassage },
  { id: "mom", label: "New Mom Care", image: concernMom },
] as const;
