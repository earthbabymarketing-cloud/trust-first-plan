import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const data = getComposition(slug);
  if (!data) return null;

  const rows = [...data.rows].sort((a, b) => b.composition - a.composition);
  const naturalContribution = rows.reduce(
    (s, r) => s + (r.composition * r.naturalOriginPct) / 100,
    0,
  );
  const nonNaturalShare = Math.max(0, 100 - naturalContribution);
  const total = data.totalNaturalOrigin ?? naturalContribution;

  const fmt = (n: number) => (n >= 10 ? n.toFixed(1) : n.toFixed(2)).replace(/\.?0+$/, "");

  return (
    <div className="mt-5 rounded-2xl border border-border bg-[color:var(--wash-sky)] overflow-hidden">
      {/* Header: the big answer */}
      <div className="px-4 py-5 sm:px-6 sm:py-6 border-b border-border">
        <div className="eyebrow">Natural origin of {productName}</div>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <div className="font-display text-4xl sm:text-5xl leading-none text-[color:var(--brand-leaf)]">
            {total}%
          </div>
          <div className="text-sm text-muted-foreground">
            natural origin per ISO 16128 — weighted by how much of each ingredient is in the formula
          </div>
        </div>

        {/* Split bar */}
        <div className="mt-4 h-2 w-full rounded-full overflow-hidden flex bg-border">
          <div className="bg-[color:var(--brand-leaf)]" style={{ width: `${total}%` }} aria-hidden />
          <div className="bg-amber-400" style={{ width: `${100 - total}%` }} aria-hidden />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" /> Natural {total}%
          </span>
          <span className="flex items-center gap-1.5">
            Nature-identical {nonNaturalShare.toFixed(2)}%
            <span className="h-2 w-2 rounded-full bg-amber-400" />
          </span>
        </div>
      </div>

      {/* One clean table — every ingredient, sorted by how much is in the formula */}
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 sm:gap-x-6 items-center pb-2 border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Ingredient</span>
          <span className="text-right">In formula</span>
          <span className="text-right">Natural origin</span>
        </div>
        <ul>
          {rows.map((r) => (
            <li
              key={r.ingredient}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 sm:gap-x-6 items-start py-3 border-b border-border last:border-0"
            >
              <div className="flex items-start gap-2 min-w-0">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    r.natural ? "bg-[color:var(--brand-leaf)]" : "bg-amber-400"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className="font-display text-sm leading-snug">{r.ingredient}</div>
                  {!r.natural && r.note && (
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.note}</div>
                  )}
                </div>
              </div>
              <div className="font-display text-sm text-foreground/80 tabular-nums text-right">
                {fmt(r.composition)}%
              </div>
              <div
                className={`font-display text-sm tabular-nums text-right ${
                  r.natural ? "text-[color:var(--brand-leaf)]" : "text-amber-500"
                }`}
              >
                {fmt(r.naturalOriginPct)}%
              </div>
            </li>
          ))}
        </ul>

        {/* The math */}
        <div className="mt-5 rounded-xl bg-white border border-border p-4 text-sm text-foreground/80 leading-relaxed">
          <span className="font-medium text-foreground">How we get to {total}%:</span>{" "}
          multiply each ingredient's share of the formula by its own natural-origin %, add them up.
          That weighted sum is the product's natural origin per ISO 16128 — no rounding, no marketing math.
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 mr-3">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" /> Natural (100% natural origin)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Nature-identical — used only at the lowest effective dose, where a plant-based alternative can't match safety or performance.
          </span>
        </p>
      </div>
    </div>
  );
}
