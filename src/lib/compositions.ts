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
      { ingredient: "Aqua", composition: 78.51, naturalOriginPct: 100, function: "Solvent base", natural: true },
      { ingredient: "Hydrogenated Ethylhexyl Olivate, Hydrogenated Olive Oil Unsaponifiables", composition: 4, naturalOriginPct: 100, function: "Emollient and skin conditioning", natural: true },
      { ingredient: "Glycerin", composition: 4, naturalOriginPct: 100, function: "Hydrating and moisture-retaining agent", natural: true },
      { ingredient: "Butyrospermum Parkii (Shea) Butter", commonName: "Shea butter", composition: 3, naturalOriginPct: 100, function: "Moisturizing, soothing, and healing for damaged skin", natural: true },
      { ingredient: "Cetearyl Olivate and Sorbitan Olivate", composition: 3, naturalOriginPct: 100, function: "Emulsifier; helps repair skin barrier and soothes redness", natural: true },
      { ingredient: "Argania Spinosa (Argan) Kernel Oil", commonName: "Argan oil", composition: 2, naturalOriginPct: 100, function: "Hydrates and repairs skin barrier to fix dry, flaky skin", natural: true },
      { ingredient: "Gluconolactone (and) Sodium Benzoate", composition: 1.5, naturalOriginPct: 74.67, function: "Edible-grade, broad-spectrum preservative", natural: false },
      { ingredient: "Garcinia Indica (Kokum) Seed Butter", commonName: "Kokum butter", composition: 1, naturalOriginPct: 100, function: "Deep moisturisation and skin nourishing", natural: true },
      { ingredient: "Cetyl Alcohol", composition: 1, naturalOriginPct: 100, function: "Emollient and thickening agent", natural: true },
      { ingredient: "Prunus Amygdalus Dulcis (Sweet Almond) Oil", commonName: "Sweet almond oil", composition: 1, naturalOriginPct: 100, function: "Nourishing and soothing for dry, irritated skin", natural: true },
      { ingredient: "Anthemis Nobilis (Chamomile) Flower Extract", commonName: "Chamomile extract", composition: 0.2, naturalOriginPct: 100, function: "Calming, anti-inflammatory, skin healing", natural: true },
      { ingredient: "Sodium Gluconate", composition: 0.2, naturalOriginPct: 100, function: "Chelating agent and skin conditioning", natural: true },
      { ingredient: "Xanthan Gum", composition: 0.2, naturalOriginPct: 100, function: "Thickening agent and stabilizer", natural: true },
      { ingredient: "Propylene Glycol Caprylate", composition: 0.2, naturalOriginPct: 100, function: "Preservative", natural: true },
      { ingredient: "Sodium Stearoyl Glutamate", composition: 0.1, naturalOriginPct: 100, function: "Emulsifier", natural: true },
      { ingredient: "Tocopherol (Natural Vitamin E)", commonName: "Vitamin E", composition: 0.05, naturalOriginPct: 100, function: "Powerful antioxidant; prevents eczema and builds a strong skin barrier", natural: true },
      { ingredient: "D-Panthenol", composition: 0.02, naturalOriginPct: 0, function: "Combats inflammation and redness; soothes skin and heals wounds", natural: false },
      { ingredient: "Citric Acid", composition: 0.02, naturalOriginPct: 100, function: "pH adjuster (keeps formula at skin-matched 5.5)", natural: true },
    ],
    whyItsGood: [
      "99.6% natural origin per ISO 16128 — declared ingredient-by-ingredient, not estimated.",
      "Free from sulphates, parabens, silicones, mineral oil and synthetic fragrance.",
      "Dermatologically tested and pH-balanced to 5.5 — safe for newborns.",
      "Every non-natural ingredient is used at the lowest effective dose, only where a plant alternative can't do the job safely.",
    ],
  },

  "baby-wash": {
    productName: "Earthbaby Top-to-Toe Body Wash",
    totalNaturalOrigin: 96.12,
    rows: [
      // Plant-derived 100% natural origin ingredients (72.30% of formula)
      { ingredient: "Aqua", commonName: "Water", composition: 55.6, naturalOriginPct: 100, function: "Solvent base", natural: true },
      { ingredient: "Glycerin", composition: 5, naturalOriginPct: 100, function: "Hydrating and moisture-retaining agent", natural: true },
      { ingredient: "Coco Glucoside", composition: 5, naturalOriginPct: 100, function: "Ultra-mild plant-derived cleanser", natural: true },
      { ingredient: "Aloe Barbadensis Leaf Juice", commonName: "Aloe vera juice", composition: 2, naturalOriginPct: 100, function: "Soothes and hydrates delicate skin", natural: true },
      { ingredient: "Glyceryl Oleate", composition: 1, naturalOriginPct: 100, function: "Skin-conditioning co-emulsifier", natural: true },
      { ingredient: "Acacia Senegal Gum & Xanthan Gum", commonName: "Natural gum blend", composition: 1, naturalOriginPct: 100, function: "Thickener and stabiliser", natural: true },
      { ingredient: "Propylene Glycol Caprylate", composition: 1, naturalOriginPct: 100, function: "Preservative booster", natural: true },
      { ingredient: "Calendula Officinalis Flower Extract", commonName: "Calendula extract", composition: 0.5, naturalOriginPct: 100, function: "Soothes sensitive skin", natural: true },
      { ingredient: "Xanthan Gum", composition: 0.5, naturalOriginPct: 100, function: "Thickening agent", natural: true },
      { ingredient: "Glycyrrhiza Glabra Root Extract", commonName: "Licorice root extract", composition: 0.5, naturalOriginPct: 100, function: "Brightens and calms skin", natural: true },
      { ingredient: "Sodium Gluconate", composition: 0.1, naturalOriginPct: 100, function: "Chelating agent", natural: true },
      { ingredient: "Citric Acid", composition: 0.1, naturalOriginPct: 100, function: "pH adjuster (keeps formula at skin-matched 5.5)", natural: true },

      // Essentials
      { ingredient: "Disodium Cocoyl Glutamate", composition: 8, naturalOriginPct: 98, function: "Ultra-mild amino-acid cleanser", natural: false, note: "Derived from coconut and fermented sugar — the gentlest cleanser in the formula." },
      { ingredient: "Cocamidopropyl Betaine", composition: 8, naturalOriginPct: 86, function: "Mild secondary cleanser and foam booster", natural: false, note: "Coconut-derived; used to keep foam gentle and tear-free." },
      { ingredient: "Disodium Cocoamphoacetate", composition: 6, naturalOriginPct: 81, function: "Amphoteric cleanser; balances mildness", natural: false, note: "Coconut-derived; helps the wash rinse clean without stripping." },
      { ingredient: "Sodium Cocoyl Isethionate", composition: 3, naturalOriginPct: 86, function: "Creamy lather from coconut fatty acids", natural: false, note: "Solid, coconut-derived surfactant used at low levels for a soft creamy foam." },
      { ingredient: "Gluconolactone (and) Sodium Benzoate", composition: 1.8, naturalOriginPct: 74.5, function: "Edible-grade, broad-spectrum preservative", natural: false, note: "Food-grade preservative system — safest available for daily baby use." },
      { ingredient: "Panthenyl Hydroxypropyl Steardimonium Chloride", commonName: "Provitamin B5 conditioner", composition: 0.5, naturalOriginPct: 63, function: "Conditions skin and softens", natural: false, note: "Provitamin B5 derivative that leaves skin soft after rinse." },
      { ingredient: "Polyquaternium-10", composition: 0.2, naturalOriginPct: 0, function: "Conditioning agent; reduces static and dryness", natural: false, note: "Used at 0.2% because no plant-derived alternative gives the same after-feel." },
      { ingredient: "D-Panthenol", composition: 0.2, naturalOriginPct: 0, function: "Combats inflammation and redness; soothes skin", natural: false, note: "Nature-identical Provitamin B5 — the only form stable in a water-based wash." },
    ],
    whyItsGood: [
      "96.12% natural origin per ISO 16128 — declared ingredient-by-ingredient, not estimated.",
      "Tear-free, pH-balanced to 5.5 — safe from head to toe, from day one.",
      "Free from sulphates, parabens, silicones and synthetic fragrance.",
      "Every essential is used at the lowest effective dose, only where a plant alternative can't do the job safely.",
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
