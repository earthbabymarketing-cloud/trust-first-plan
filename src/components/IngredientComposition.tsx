import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const naturalRows = [...data.rows.filter((r) => r.natural)].sort((a, b) => b.composition - a.composition);
  const nonNaturalRows = [...data.rows.filter((r) => !r.natural)].sort((a, b) => b.composition - a.composition);
  const nonNaturalSum = nonNaturalRows.reduce((s, r) => s + r.composition, 0);

  return (
    <div className="mt-5 rounded-2xl border border-border bg-[color:var(--wash-sky)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="eyebrow">Composition</div>
          <div className="font-display text-lg sm:text-xl leading-tight">{productName}</div>
        </div>
        <div className="rounded-full bg-white border border-border px-3 py-1.5 flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" />
          <span className="font-display text-base">{data.totalNaturalOrigin}% natural origin</span>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 space-y-6">
        {/* Natural ingredients — names only, sorted desc by composition */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Natural ingredients</h4>
            </div>
            <span className="font-display text-sm text-[color:var(--brand-leaf)]">{data.totalNaturalOrigin}% of formula</span>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {naturalRows.map((r) => (
              <li key={r.ingredient} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
                <span className="font-display text-sm leading-snug">{r.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nature-identical ingredients — with %, function, why added */}
        {nonNaturalRows.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Nature-identical ingredients</h4>
              </div>
              <span className="font-display text-sm text-amber-500">{nonNaturalSum.toFixed(2)}% of formula</span>
            </div>
            <ul className="divide-y divide-border">
              {nonNaturalRows.map((r) => (
                <li key={r.ingredient} className="py-3 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3 sm:items-start">
                  <div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                      <div className="font-display text-sm leading-snug">{r.ingredient}</div>
                    </div>
                    <div className="mt-1 ml-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">Function:</span> {r.function}
                    </div>
                    {r.note && (
                      <div className="mt-1 ml-4 text-xs text-muted-foreground italic">Why added: {r.note}</div>
                    )}
                  </div>
                  <div className="text-right font-display text-sm text-amber-500 mt-1 sm:mt-0 pl-4 sm:pl-0">
                    {r.composition}%
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Rated per ISO 16128 by ingredient weight, listed in descending order of composition. Nature-identical ingredients are used only at the lowest effective dose, where a plant-based alternative cannot match safety or performance.
        </p>
      </div>
    </div>
  );
}
