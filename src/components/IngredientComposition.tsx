import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const naturalRows = data.rows.filter((r) => r.natural);
  const nonNaturalRows = data.rows.filter((r) => !r.natural);
  const naturalSum = naturalRows.reduce((s, r) => s + r.composition, 0);

  return (
    <div className="mt-6 rounded-3xl border border-border bg-[color:var(--wash-sky)]/50 overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-7 grid sm:grid-cols-[1fr_auto] gap-4 sm:items-end border-b border-border">
        <div>
          <div className="eyebrow">Composition breakdown</div>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl leading-tight">{productName}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Every ingredient, declared with its exact composition and function. Rated per ISO 16128 — no marketing math.
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-border px-5 py-4 text-center shrink-0">
          <div className="font-display text-3xl text-[color:var(--brand-leaf)]">{data.totalNaturalOrigin}%</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Natural origin</div>
        </div>
      </div>

      {/* Composition table */}
      <div className="p-5 sm:p-7">
        <div className="hidden sm:grid grid-cols-[minmax(0,2.4fr)_auto_minmax(0,2fr)_auto] gap-4 text-[11px] uppercase tracking-wider text-muted-foreground pb-3 border-b border-border">
          <span>Ingredient</span>
          <span className="text-right">%</span>
          <span>Function</span>
          <span className="text-right">Origin</span>
        </div>

        <ul className="divide-y divide-border">
          {data.rows.map((r) => (
            <li
              key={r.ingredient}
              className="py-3 sm:grid sm:grid-cols-[minmax(0,2.4fr)_auto_minmax(0,2fr)_auto] sm:gap-4 sm:items-start"
            >
              <div>
                <div className="font-display text-[15px] leading-snug">{r.ingredient}</div>
                {!r.natural && r.note && (
                  <div className="sm:hidden mt-1 text-xs text-muted-foreground italic">Why: {r.note}</div>
                )}
              </div>
              <div className="sm:text-right font-display text-sm text-foreground/80 mt-1 sm:mt-0">
                {r.composition}%
              </div>
              <div className="text-sm text-muted-foreground mt-1 sm:mt-0">{r.function}</div>
              <div className="sm:text-right mt-2 sm:mt-0">
                <span
                  className={
                    r.natural
                      ? "inline-flex items-center gap-1 rounded-full bg-[color:var(--tint-leaf)] text-[color:var(--brand-leaf)] text-[11px] px-2.5 py-1"
                      : "inline-flex items-center gap-1 rounded-full bg-[color:var(--tint-sky)] text-foreground/80 text-[11px] px-2.5 py-1"
                  }
                >
                  {r.natural ? "✓ Natural" : "◐ Nature-identical"}
                </span>
              </div>
              {!r.natural && r.note && (
                <div className="hidden sm:block sm:col-span-4 mt-2 rounded-xl bg-white/70 border border-border px-3 py-2 text-xs text-foreground/70 italic">
                  <span className="not-italic font-medium text-foreground">Why we added it:</span> {r.note}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="mt-5 rounded-2xl bg-white border border-border p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-display text-xl text-[color:var(--brand-leaf)]">{naturalSum.toFixed(2)}%</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Natural</div>
          </div>
          <div>
            <div className="font-display text-xl text-foreground/70">
              {(100 - naturalSum).toFixed(2)}%
            </div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Nature-identical</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="font-display text-xl">{data.totalNaturalOrigin}%</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
              ISO 16128 rating
            </div>
          </div>
        </div>
      </div>

      {/* Non-natural spotlight */}
      {nonNaturalRows.length > 0 && (
        <div className="border-t border-border bg-white/60 p-5 sm:p-7">
          <div className="eyebrow">The {nonNaturalRows.length} non-natural {nonNaturalRows.length === 1 ? "ingredient" : "ingredients"} — and why</div>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {nonNaturalRows.map((r) => (
              <div key={r.ingredient} className="rounded-2xl border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-base leading-tight">{r.ingredient}</div>
                  <span className="font-display text-sm text-foreground/70 shrink-0">{r.composition}%</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why it's good */}
      <div className="border-t border-border p-5 sm:p-7">
        <div className="eyebrow">Why this formula is good</div>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2">
          {data.whyItsGood.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl bg-white border border-border px-4 py-3">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[color:var(--tint-leaf)] text-[color:var(--brand-leaf)] grid place-items-center text-xs">
                ✓
              </span>
              <span className="text-sm text-foreground/85 leading-snug">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
