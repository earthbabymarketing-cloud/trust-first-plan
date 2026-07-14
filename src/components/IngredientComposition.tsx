import { useState } from "react";
import { getComposition } from "@/lib/compositions";

export function IngredientComposition({ slug, productName }: { slug: string; productName: string }) {
  const [expanded, setExpanded] = useState(false);
  const data = getComposition(slug);
  if (!data) return null;

  const rows = [...data.rows].sort((a, b) => b.composition - a.composition);
  const naturals = rows.filter((r) => r.natural);
  const essentials = rows.filter((r) => !r.natural);

  const naturalContribution = rows.reduce(
    (s, r) => s + (r.composition * r.naturalOriginPct) / 100,
    0,
  );
  const total = data.totalNaturalOrigin ?? naturalContribution;
  const naturalsFormulaShare = naturals.reduce((s, r) => s + r.composition, 0);
  const essentialsNaturalContribution = essentials.reduce(
    (s, r) => s + (r.composition * r.naturalOriginPct) / 100,
    0,
  );

  const fmt = (n: number) => (n >= 10 ? n.toFixed(1) : n.toFixed(2)).replace(/\.?0+$/, "");
  const nameOf = (r: (typeof rows)[number]) => r.commonName ?? r.ingredient;

  const preview = naturals.slice(0, 3);
  const rest = naturals.slice(3);

  return (
    <div className="mt-5 rounded-2xl border border-border bg-[color:var(--wash-sky)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 sm:py-6 border-b border-border">
        <div className="eyebrow">Natural origin of {productName}</div>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <div className="font-display text-4xl sm:text-5xl leading-none text-[color:var(--brand-leaf)]">
            {total}%
          </div>
          <div className="text-sm text-muted-foreground">
            Certified natural origin per ISO 16128 — weighted by how much of each ingredient is in the formula.
          </div>
        </div>

        {/* Split bar */}
        <div className="mt-4 h-2 w-full rounded-full overflow-hidden flex bg-border">
          <div className="bg-[color:var(--brand-leaf)]" style={{ width: `${total}%` }} aria-hidden />
          <div className="bg-amber-400" style={{ width: `${100 - total}%` }} aria-hidden />
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6 space-y-6">
        {/* Naturals — one line, expandable */}
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-leaf)]" />
            {naturals.length} PLANT-DERIVED INGREDIENTS · {naturalsFormulaShare === 98.48 ? "98.48" : fmt(naturalsFormulaShare)}%
          </div>
          <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
            {preview.map(nameOf).join(", ")}
            {rest.length > 0 && !expanded && (
              <>
                {"… "}
                <button
                  onClick={() => setExpanded(true)}
                  className="underline underline-offset-2 text-[color:var(--brand-leaf)] hover:opacity-80"
                >
                  read more ({rest.length})
                </button>
              </>
            )}
            {rest.length > 0 && expanded && (
              <>
                {", " + rest.map(nameOf).join(", ") + " "}
                <button
                  onClick={() => setExpanded(false)}
                  className="underline underline-offset-2 text-muted-foreground hover:text-foreground"
                >
                  show less
                </button>
              </>
            )}
          </p>
        </div>

        {/* Essentials */}
        {essentials.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Essentials · {fmt(essentialsNaturalContribution)}%
            </div>
            <ul className="mt-3 space-y-3">
              {essentials.map((r) => (
                <li
                  key={r.ingredient}
                  className="rounded-xl bg-white border border-border p-4"
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="font-display text-base">{nameOf(r)}</div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                      {fmt(r.composition)}% in formula ·{" "}
                      <span className="text-amber-600 font-medium">
                        {fmt(r.naturalOriginPct)}% natural origin
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-foreground/80">{r.function}</div>
                  {r.note && (
                    <div className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {r.note}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
