import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const naturalRows = [...data.rows.filter((r) => r.natural)].sort((a, b) => b.composition - a.composition);
  const nonNaturalRows = [...data.rows.filter((r) => !r.natural)].sort((a, b) => b.composition - a.composition);
  const nonNaturalShare = nonNaturalRows.reduce(
    (s, r) => s + (r.composition * (100 - r.naturalOriginPct)) / 100,
    0,
  );

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

      {/* Split bar */}
      <div className="px-4 sm:px-6 pt-5">
        <div className="h-2 w-full rounded-full overflow-hidden flex bg-border">
          <div
            className="bg-[color:var(--brand-leaf)]"
            style={{ width: `${data.totalNaturalOrigin}%` }}
            aria-hidden="true"
          />
          <div
            className="bg-amber-400"
            style={{ width: `${100 - data.totalNaturalOrigin}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" /> Natural {data.totalNaturalOrigin}%
          </span>
          <span className="flex items-center gap-1.5">
            Nature-identical {nonNaturalShare.toFixed(2)}%
            <span className="h-2 w-2 rounded-full bg-amber-400" />
          </span>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6 space-y-6">
        {/* Natural ingredients */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Natural ingredients</h4>
            <span className="ml-auto text-[11px] uppercase tracking-wider text-muted-foreground">Natural origin</span>
          </div>
          <ul className="divide-y divide-border">
            {naturalRows.map((r) => (
              <li key={r.ingredient} className="py-2 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-leaf)]" aria-hidden="true" />
                  <span className="font-display text-sm leading-snug">{r.ingredient}</span>
                </div>
                <span className="font-display text-sm text-[color:var(--brand-leaf)] tabular-nums">100%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nature-identical ingredients */}
        {nonNaturalRows.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Nature-identical ingredients</h4>
              <span className="ml-auto text-[11px] uppercase tracking-wider text-muted-foreground">Natural origin</span>
            </div>
            <ul className="space-y-3">
              {nonNaturalRows.map((r) => (
                <li
                  key={r.ingredient}
                  className="rounded-xl bg-white border border-border p-3 sm:p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-display text-sm leading-snug">{r.ingredient}</div>
                        <div className="font-display text-sm text-amber-500 tabular-nums shrink-0">
                          {r.naturalOriginPct}%
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground/80">Function:</span> {r.function}
                      </div>
                      {r.note && (
                        <div className="mt-1 text-xs text-muted-foreground italic">Why added: {r.note}</div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Natural-origin % is declared per ingredient as per ISO 16128 and listed in descending order of composition. Nature-identical ingredients are used only at the lowest effective dose, where a plant-based alternative cannot match safety or performance.
        </p>
      </div>
    </div>
  );
}
