import { useState } from "react";
import { getComposition } from "@/lib/compositions";

export function IngredientComposition({
  slug,
  productName,
}: {
  slug: string;
  productName: string;
}) {
  const data = getComposition(slug);
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const rows = [...data.rows].sort((a, b) => b.composition - a.composition);
  const naturals = rows.filter((r) => r.natural);
  const essentials = rows.filter((r) => !r.natural);

  const colorList = data.colorIngredients
    ? Object.values(data.colorIngredients).map((c) => ({
        ingredient: c.ingredient,
        commonName: c.commonName,
        composition: c.composition,
        naturalOriginPct: c.naturalOriginPct,
      }))
    : [];

  const naturalContribution = rows.reduce(
    (s, r) => s + (r.composition * r.naturalOriginPct) / 100,
    0,
  );
  const total = data.totalNaturalOrigin ?? naturalContribution;
  const naturalsFormulaShare = naturals.reduce((s, r) => s + r.composition, 0);

  const fmt = (n: number) =>
    (n >= 10 ? n.toFixed(1) : n.toFixed(2)).replace(/\.?0+$/, "");
  const nameOf = (r: { ingredient: string; commonName?: string }) =>
    r.commonName ?? r.ingredient;

  const PREVIEW_COUNT = 4;
  const previewNames = naturals.slice(0, PREVIEW_COUNT).map(nameOf);
  const hiddenNaturals = naturals.slice(PREVIEW_COUNT).map(nameOf);
  const hiddenCount = hiddenNaturals.length;

  return (
    <div className="mt-5 rounded-2xl border border-border bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 sm:py-6 bg-[color:var(--wash-sky)] border-b border-border">
        <div className="eyebrow">Natural origin of {productName}</div>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <div className="font-display text-4xl sm:text-5xl leading-none text-[color:var(--brand-leaf)]">
            {total}%
          </div>
          {total !== 100 && (
            <div className="text-sm text-muted-foreground">
              Certified natural origin per ISO 16128 — weighted by how much of
              each ingredient is in the formula.
            </div>
          )}
        </div>

        <div className="mt-4 h-2 w-full rounded-full overflow-hidden flex bg-border">
          <div
            className="bg-[color:var(--brand-leaf)]"
            style={{ width: `${total}%` }}
            aria-hidden
          />
          <div
            className="bg-amber-400"
            style={{ width: `${100 - total}%` }}
            aria-hidden
          />
        </div>
      </div>

      {/* Ingredient rows */}
      <div className="divide-y divide-border">
        {/* Naturals collapsible row */}
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base text-foreground leading-relaxed">
                {previewNames.join(", ")}
                {hiddenCount > 0 && !expanded && (
                  <>
                    ,{" "}
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="text-[color:var(--brand-leaf)] underline underline-offset-2 font-medium"
                    >
                      Read more ({hiddenCount})
                    </button>
                  </>
                )}
                {expanded && hiddenCount > 0 && (
                  <>
                    , {hiddenNaturals.join(", ")}{" "}
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="text-[color:var(--brand-leaf)] underline underline-offset-2 font-medium"
                    >
                      Show less
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs sm:text-sm text-[color:var(--brand-clay)] tabular-nums font-medium">
                {fmt(naturalsFormulaShare)}% in formula
              </div>
              <div className="text-xs sm:text-sm text-[color:var(--brand-leaf)] tabular-nums font-semibold">
                100%
              </div>
            </div>
          </div>
        </div>

        {/* Colour pigments (lipstick shades) */}
        {colorList.map((c) => (
          <div
            key={c.ingredient + c.commonName}
            className="px-4 sm:px-6 py-4 flex items-start justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base font-medium text-foreground">
                {c.ingredient}
              </div>
              {c.commonName && (
                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  shade: {c.commonName}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs sm:text-sm text-[color:var(--brand-clay)] tabular-nums font-medium">
                {fmt(c.composition)}% in formula
              </div>
              <div className="text-xs sm:text-sm text-[color:var(--brand-leaf)] tabular-nums font-semibold">
                {fmt(c.naturalOriginPct)}%
              </div>
            </div>
          </div>
        ))}

        {/* Essentials */}
        {essentials.map((r) => (
          <div
            key={r.ingredient}
            className="px-4 sm:px-6 py-4 flex items-start justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base font-medium text-foreground">
                {nameOf(r)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {r.function}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs sm:text-sm text-[color:var(--brand-clay)] tabular-nums font-medium">
                {fmt(r.composition)}% in formula
              </div>
              <div
                className={`text-xs sm:text-sm tabular-nums font-semibold ${
                  r.naturalOriginPct >= 100
                    ? "text-[color:var(--brand-leaf)]"
                    : "text-amber-600"
                }`}
              >
                {fmt(r.naturalOriginPct)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="px-4 sm:px-6 py-4 bg-[color:var(--wash-sand,#faf6ef)] border-t border-border flex items-center justify-between">
        <div className="font-display text-base sm:text-lg">
          Total natural origin
        </div>
        <div className="font-display text-lg sm:text-xl text-[color:var(--brand-leaf)] tabular-nums">
          {total}%
        </div>
      </div>
    </div>
  );
}
