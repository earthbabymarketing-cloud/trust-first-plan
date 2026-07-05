import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const naturalRows = data.rows.filter((r) => r.natural);
  const nonNaturalRows = data.rows.filter((r) => !r.natural);
  const naturalSum = naturalRows.reduce((s, r) => s + r.composition, 0);
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
        {/* Natural ingredients */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Natural ingredients</h4>
          </div>
          <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-[11px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
            <span>Ingredient</span>
            <span className="text-right">%</span>
          </div>
          <ul className="divide-y divide-border">
            {naturalRows.map((r) => (
              <li
                key={r.ingredient}
                className="py-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3 sm:items-start"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
                  <div className="font-display text-sm leading-snug">{r.ingredient}</div>
                </div>
                <div className="text-right font-display text-sm text-foreground/80 mt-1 sm:mt-0 pl-4 sm:pl-0">
                  {r.composition}%
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Non-natural ingredients */}
        {nonNaturalRows.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Nature-identical ingredients
              </h4>
            </div>
            <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-[11px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
              <span>Ingredient</span>
              <span className="text-right">%</span>
            </div>
            <ul className="divide-y divide-border">
              {nonNaturalRows.map((r) => (
                <li
                  key={r.ingredient}
                  className="py-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3 sm:items-start"
                >
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
                  <div className="text-right font-display text-sm text-foreground/80 mt-1 sm:mt-0 pl-4 sm:pl-0">
                    {r.composition}%
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Totals */}
        <div className="rounded-xl bg-white border border-border p-4 grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="font-display text-xl text-[color:var(--brand-leaf)]">{naturalSum.toFixed(2)}%</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Natural</div>
          </div>
          <div>
            <div className="font-display text-xl text-amber-500">{nonNaturalSum.toFixed(2)}%</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Nature-identical</div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Rated per ISO 16128 by ingredient weight. Non-natural ingredients are used at the lowest effective dose only when a plant-based alternative cannot match safety or performance.
        </p>
      </div>
    </div>
  );
}
