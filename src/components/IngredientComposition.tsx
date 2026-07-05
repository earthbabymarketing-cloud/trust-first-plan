import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const nonNatural = data.rows.filter((r) => !r.natural);

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

      {/* Compact table */}
      <div className="px-4 py-4 sm:px-6">
        <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-[11px] uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
          <span>Ingredient</span>
          <span className="text-right">%</span>
        </div>

        <ul className="divide-y divide-border">
          {data.rows.map((r) => (
            <li
              key={r.ingredient}
              className="py-2.5 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3 sm:items-start"
            >
              <div>
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      r.natural ? "bg-[color:var(--brand-leaf)]" : "bg-amber-400"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="font-display text-sm leading-snug">{r.ingredient}</div>
                </div>
                {!r.natural && (
                  <div className="mt-1.5 ml-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">Function:</span> {r.function}
                    {r.note && (
                      <div className="mt-1 text-xs italic">Why added: {r.note}</div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right font-display text-sm text-foreground/80 mt-1 sm:mt-0">
                {r.composition}%
              </div>
            </li>
          ))}
        </ul>

        {/* Non-natural summary (compact footer) */}
        {nonNatural.length > 0 && (
          <div className="mt-4 rounded-xl bg-white border border-border p-3">
            <div className="text-xs font-medium text-foreground">
              {nonNatural.length} nature-identical ingredient{nonNatural.length === 1 ? "" : "s"} used at the lowest effective dose
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Non-natural ingredients are included only when a plant-based alternative cannot match safety or performance for your baby's skin.
            </p>
          </div>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Rated per ISO 16128 by ingredient weight. No marketing estimates.
        </p>
      </div>
    </div>
  );
}
