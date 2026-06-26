export type Ingredient = {
  name: string;
  use: string;
  naturalOrigin: number; // %
};

export const ingredients: Ingredient[] = [
  { name: "Disodium Cocoyl Glutamate", use: "Gentle cleanser", naturalOrigin: 98 },
  { name: "Cocamidopropyl Betaine", use: "Mild cleanser & bubbles maker", naturalOrigin: 86 },
  { name: "Disodium Cocoamphoacetate", use: "Mild cleanser & bubbles maker", naturalOrigin: 81 },
  { name: "Coco Glucoside", use: "Mild cleanser & bubbles maker", naturalOrigin: 100 },
  { name: "Sodium Cocoyl Isethionate", use: "Mild cleanser with creamy feel", naturalOrigin: 86 },
  { name: "Gluconolactone (and) Sodium Benzoate", use: "Preservative", naturalOrigin: 75 },
  { name: "Xanthan Gum", use: "Thickener and texture maker", naturalOrigin: 100 },
  { name: "Coco-Glucoside, Glyceryl Oleate", use: "Moisturiser", naturalOrigin: 100 },
  { name: "Acacia Senegal Gum & Xanthan Gum", use: "Moisturiser, stabilizer and texture maker", naturalOrigin: 100 },
  { name: "Panthenyl Hydroxypropyl Steardimonium Chloride", use: "Conditions and moisturizes skin and hair", naturalOrigin: 63 },
  { name: "Propylene Glycol Caprylate", use: "Moisturiser", naturalOrigin: 100 },
  { name: "D-Panthenol", use: "Moisturiser, repairs and heals", naturalOrigin: 0 },
  { name: "Sodium Gluconate", use: "Stabilizer", naturalOrigin: 100 },
  { name: "Citric Acid", use: "pH adjuster", naturalOrigin: 100 },
  { name: "Polyquaternium-10", use: "Stops frizz and static, detangles hair", naturalOrigin: 0 },
  { name: "Hydrogenated Ethylhexyl Olivate, Hydrogenated Olive Oil Unsaponifiables", use: "Moisturiser. Luxurious silky texture maker", naturalOrigin: 100 },
  { name: "Cetearyl Olivate and Sorbitan Olivate", use: "Skin moisturiser & improves product texture", naturalOrigin: 100 },
  { name: "Cetyl Alcohol", use: "Moisturiser, stabilizer and texture maker", naturalOrigin: 100 },
  { name: "Sodium Stearoyl Glutamate", use: "Emulsifier and skin-conditioning agent", naturalOrigin: 100 },
  { name: "Tocopherol (Natural Vitamin E)", use: "Antioxidant. Heals and calms", naturalOrigin: 100 },
  { name: "Glycerine, Glyceryl Glucoside", use: "Powerhouse hydration", naturalOrigin: 100 },
  { name: "Allantoin", use: "Soothing, healing balm", naturalOrigin: 0 },
  { name: "Sodium Hyaluronate", use: "Powerhouse hydration", naturalOrigin: 100 },
  { name: "Stearic Acid", use: "Cleanser, moisturiser & texture maker", naturalOrigin: 100 },
];

// Featured on the home page — recognisable, high natural origin, varied uses.
export const featuredIngredientNames = [
  "Coco Glucoside",
  "Tocopherol (Natural Vitamin E)",
  "Sodium Hyaluronate",
  "Xanthan Gum",
];

export const featuredIngredients = featuredIngredientNames
  .map((n) => ingredients.find((i) => i.name === n)!)
  .filter(Boolean);
