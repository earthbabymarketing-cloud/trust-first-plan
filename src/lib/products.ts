import { useQuery } from "@tanstack/react-query";
import { SHOPIFY_DOMAIN, SHOPIFY_API_VERSION, SHOPIFY_STOREFRONT_TOKEN } from "./shopify";

export type ProductIngredient = { name: string; purpose: string; percent?: string };

export type Product = {
  slug: string;            // shopify handle
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  variantId: string;
  concern?: "sensitive" | "everyday" | "traditional" | "massage" | "mom";
  naturalOrigin?: number;
  size?: string;
  description: string;
  hero: string[];
  ingredients: ProductIngredient[];
  howToUse: string[];
};

/* ---------- enrichment for the originally hand-curated products ---------- */
type Enrichment = Partial<Omit<Product, "slug" | "name" | "image" | "price" | "variantId" | "description">>;

const ENRICHMENT: Record<string, Enrichment> = {
  "baby-wash": {
    tagline: "Gentle cleansing for sensitive skin",
    rating: 4.8, reviews: 245, concern: "everyday", naturalOrigin: 97, size: "200 ml",
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
  "ubtan-sunni-pindi": {
    tagline: "Traditional baby bath powder",
    rating: 4.9, reviews: 320, concern: "traditional", naturalOrigin: 100, size: "150 g",
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
  "virgin-coconut-oil": {
    tagline: "Massage & daily nourishment",
    rating: 4.8, reviews: 180, concern: "massage", naturalOrigin: 100, size: "250 ml",
    hero: ["Cold-pressed", "Single-origin", "Edible-grade"],
    ingredients: [{ name: "Virgin Coconut Oil", purpose: "Nourishes & moisturises", percent: "100%" }],
    howToUse: [
      "Warm a few drops between palms.",
      "Massage in slow, gentle strokes before bath.",
      "Use daily — body, scalp, and dry patches.",
    ],
  },
  "moisturising-butter": {
    tagline: "Deep moisture for dry skin",
    rating: 4.9, reviews: 210, concern: "sensitive", naturalOrigin: 96, size: "100 g",
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
  "handmade-baby-soap-for-babies-below-1-year-90-natural-origin": {
    tagline: "Cold-pressed edible oils, made for babies below 1",
    rating: 4.7, reviews: 21, concern: "sensitive", naturalOrigin: 90, size: "100 g",
    hero: ["90% natural origin", "No essential oils", "Ayurvedic recipe"],
    ingredients: [
      { name: "Saponified Coconut Oil", purpose: "Gentle cleanse + lather", percent: "40%" },
      { name: "Saponified Sesame Oil", purpose: "Nourishes & softens", percent: "35%" },
      { name: "Saponified Castor Oil", purpose: "Moisture lock", percent: "15%" },
      { name: "Rain-water", purpose: "Pure solvent base", percent: "10%" },
    ],
    howToUse: [
      "Wet baby's body and face with lukewarm water.",
      "Work the soap into a soft lather between your palms and gently massage over the skin, avoiding the eyes.",
      "Rinse thoroughly and pat dry.",
      "Store the soap away from moisture after bathing to keep it firm and lasting longer.",
    ],
  },
};

/* ---------- heuristics for products with no enrichment ---------- */
function inferConcern(title: string): Product["concern"] | undefined {
  const t = title.toLowerCase();
  if (/(nappy|diaper)/.test(t)) return "everyday";
  if (/(mom|stretch|postpartum)/.test(t)) return "mom";
  if (/(massage|oil)/.test(t)) return "massage";
  if (/(ubtan|sunni|traditional|honey|tea)/.test(t)) return "traditional";
  if (/(butter|lotion|cream|moistur)/.test(t)) return "sensitive";
  return "everyday";
}
function inferNaturalOrigin(title: string): number | undefined {
  const m = title.match(/(\d{2,3}(?:\.\d+)?)\s*%/);
  if (m) return Math.round(parseFloat(m[1]));
  return undefined;
}
function inferSize(title: string): string | undefined {
  const m = title.match(/(\d+\s?(?:ml|g|kg|ML|G))\b/);
  return m ? m[1].toLowerCase().replace(/\s+/, " ") : undefined;
}
function cleanTitle(t: string): string {
  return t.split(",")[0].split("—")[0].split("–")[0].trim();
}

/* ---------- Storefront fetch ---------- */
const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const QUERY = `query AllProducts($first: Int!) {
  products(first: $first) {
    edges { node {
      id handle title description
      featuredImage { url }
      images(first: 4) { edges { node { url } } }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 1) { edges { node { id } } }
    } }
  }
}`;

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: QUERY, variables: { first: 100 } }),
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}`);
  const data = await res.json();
  const edges = data?.data?.products?.edges ?? [];
  return edges
    .map((e: any) => {
      const n = e.node;
      const variant = n.variants?.edges?.[0]?.node;
      if (!variant) return null;
      const image = n.featuredImage?.url ?? n.images?.edges?.[0]?.node?.url ?? "";
      const gallery: string[] = (n.images?.edges ?? []).map((g: any) => g.node.url).filter(Boolean);
      const images = Array.from(new Set([image, ...gallery].filter(Boolean)));
      const enr = ENRICHMENT[n.handle] ?? {};
      const name = enr.size ? n.title.split(",")[0].trim() : cleanTitle(n.title);
      const p: Product = {
        slug: n.handle,
        name,
        tagline: enr.tagline ?? n.title,
        price: Math.round(parseFloat(n.priceRange?.minVariantPrice?.amount ?? "0")),
        rating: enr.rating ?? 4.8,
        reviews: enr.reviews ?? 0,
        image,
        images,
        variantId: variant.id,
        concern: enr.concern ?? inferConcern(n.title),
        naturalOrigin: enr.naturalOrigin ?? inferNaturalOrigin(n.title),
        size: enr.size ?? inferSize(n.title),
        description: n.description || enr.tagline || "",
        hero: enr.hero ?? [],
        ingredients: enr.ingredients ?? [],
        howToUse: enr.howToUse ?? [],
      };
      return p;
    })
    .filter(Boolean) as Product[];
}

export function useProducts() {
  return useQuery({
    queryKey: ["shopify", "products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductBySlug(slug: string | undefined) {
  const q = useProducts();
  const product = q.data?.find((p) => p.slug === slug);
  return { ...q, product };
}

/* ---------- Concerns (unchanged for UI) ---------- */
import concernSensitive from "@/assets/concern-img2_2.png.asset.json";
import concernEveryday from "@/assets/concern-img2_1.png.asset.json";
import concernTraditional from "@/assets/concern-img1_2.png.asset.json";
import concernDiaper from "@/assets/concern-img1_3.png.asset.json";
import concernMassage from "@/assets/concern-img1_4.png.asset.json";
import concernMom from "@/assets/concern-img2_4.png.asset.json";

export const concerns = [
  { id: "sensitive", label: "Dry & Sensitive Skin", image: concernSensitive.url },
  { id: "everyday", label: "Gentle Everyday Cleansing", image: concernEveryday.url },
  { id: "traditional", label: "Traditional Baby Bath", image: concernTraditional.url },
  { id: "diaper", label: "Diaper Rash", image: concernDiaper.url },
  { id: "massage", label: "Massage & Moisture", image: concernMassage.url },
  { id: "mom", label: "New Mom Care", image: concernMom.url },
] as const;
