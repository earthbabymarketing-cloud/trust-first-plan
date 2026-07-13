export type CompositionRow = {
  ingredient: string;
  commonName?: string;       // friendly name (e.g. "Shea butter" for Butyrospermum Parkii)
  composition: number;       // % w/w in the formula
  naturalOriginPct: number;  // % of THIS ingredient that is natural per ISO 16128
  function: string;
  natural: boolean;          // true if naturalOriginPct === 100
  note?: string;             // shown when non-natural: why it's in the formula
};

export type Composition = {
  productName: string;
  totalNaturalOrigin: number; // %
  rows: CompositionRow[];
  whyItsGood: string[];
};

/* Keyed by shopify handle. Add more products over time. */
export const compositions: Record<string, Composition> = {
  "baby-moisturising-lotion": {
    productName: "Earthbaby Baby Moisturising Lotion",
    totalNaturalOrigin: 99.6,
    rows: [
      { ingredient: "Aqua", commonName: "Water", composition: 78.51, naturalOriginPct: 100, function: "Solvent base", natural: true },
      { ingredient: "Hydrogenated Ethylhexyl Olivate, Hydrogenated Olive Oil Unsaponifiables", commonName: "Olive-derived emollient", composition: 4, naturalOriginPct: 100, function: "Emollient and skin conditioning", natural: true },
      { ingredient: "Glycerin", commonName: "Glycerin", composition: 4, naturalOriginPct: 100, function: "Hydrating and moisture-retaining agent", natural: true },
      { ingredient: "Butyrospermum Parkii (Shea) Butter", commonName: "Shea butter", composition: 3, naturalOriginPct: 100, function: "Moisturizing, soothing, and healing for damaged skin", natural: true },
      { ingredient: "Cetearyl Olivate and Sorbitan Olivate", commonName: "Olive-based emulsifier", composition: 3, naturalOriginPct: 100, function: "Emulsifier; helps repair skin barrier and soothes redness", natural: true },
      { ingredient: "Argania Spinosa (Argan) Kernel Oil", commonName: "Argan oil", composition: 2, naturalOriginPct: 100, function: "Hydrates and repairs skin barrier to fix dry, flaky skin", natural: true },
      { ingredient: "Gluconolactone (and) Sodium Benzoate", commonName: "Gluconolactone & sodium benzoate", composition: 1.5, naturalOriginPct: 74.67, function: "Edible-grade, broad-spectrum preservative", natural: false, note: "Only 0.38% of the total formula is non-natural — used at the lowest effective dose to keep the formula safe for daily use on babies." },
      { ingredient: "Garcinia Indica (Kokum) Seed Butter", commonName: "Kokum butter", composition: 1, naturalOriginPct: 100, function: "Deep moisturisation and skin nourishing", natural: true },
      { ingredient: "Cetyl Alcohol", commonName: "Cetyl alcohol", composition: 1, naturalOriginPct: 100, function: "Emollient and thickening agent", natural: true },
      { ingredient: "Prunus Amygdalus Dulcis (Sweet Almond) Oil", commonName: "Sweet almond oil", composition: 1, naturalOriginPct: 100, function: "Nourishing and soothing for dry, irritated skin", natural: true },
      { ingredient: "Anthemis Nobilis (Chamomile) Flower Extract", commonName: "Chamomile extract", composition: 0.2, naturalOriginPct: 100, function: "Calming, anti-inflammatory, skin healing", natural: true },
      { ingredient: "Sodium Gluconate", commonName: "Sodium gluconate", composition: 0.2, naturalOriginPct: 100, function: "Chelating agent and skin conditioning", natural: true },
      { ingredient: "Xanthan Gum", commonName: "Xanthan gum", composition: 0.2, naturalOriginPct: 100, function: "Thickening agent and stabilizer", natural: true },
      { ingredient: "Propylene Glycol Caprylate", commonName: "Coconut-derived preservative", composition: 0.2, naturalOriginPct: 100, function: "Preservative", natural: true },
      { ingredient: "Sodium Stearoyl Glutamate", commonName: "Amino-acid emulsifier", composition: 0.1, naturalOriginPct: 100, function: "Emulsifier", natural: true },
      { ingredient: "Tocopherol (Natural Vitamin E)", commonName: "Vitamin E", composition: 0.05, naturalOriginPct: 100, function: "Powerful antioxidant; prevents eczema and builds a strong skin barrier", natural: true },
      { ingredient: "D-Panthenol", commonName: "Provitamin B5", composition: 0.02, naturalOriginPct: 0, function: "Combats inflammation and redness; soothes skin and heals wounds", natural: false, note: "Nature-identical Provitamin B5. Chosen because plant-form panthenol is not stable enough to deliver the same barrier-repair benefit for babies." },
      { ingredient: "Citric Acid", commonName: "Citric acid", composition: 0.02, naturalOriginPct: 100, function: "pH adjuster (keeps formula at skin-matched 5.5)", natural: true },
    ],
    whyItsGood: [
      "99.6% natural origin per ISO 16128 — declared ingredient-by-ingredient, not estimated.",
      "Free from sulphates, parabens, silicones, mineral oil and synthetic fragrance.",
      "Dermatologically tested and pH-balanced to 5.5 — safe for newborns.",
      "Every non-natural ingredient is used at the lowest effective dose, only where a plant alternative can't do the job safely.",
    ],
  },
};

/* Loose matcher: exact slug first, then substring fallback (e.g. any lotion handle). */
export function getComposition(slug: string | undefined): Composition | undefined {
  if (!slug) return undefined;
  if (compositions[slug]) return compositions[slug];
  const key = Object.keys(compositions).find((k) => slug.includes(k) || k.includes(slug));
  return key ? compositions[key] : undefined;
}
