import { createFileRoute, Link } from "@tanstack/react-router";
import { ingredients } from "@/lib/ingredients";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredient Glossary — Earthbaby" },
      { name: "description", content: "Every chemically or biologically processed ingredient we use, what it does, and its % natural origin. No mystery, no chemistry degree required." },
      { property: "og:title", content: "Ingredient Glossary — Earthbaby" },
      { property: "og:description", content: "Plain-English explanations and natural-origin % for every processed ingredient in Earthbaby formulas." },
    ],
  }),
  component: IngredientsPage,
});

function originColor(p: number) {
  if (p >= 90) return "var(--sage-deep)";
  if (p >= 60) return "var(--brand-sky, #00A2C6)";
  return "var(--clay)";
}

function IngredientsPage() {
  return (
    <>
      <section className="bg-[color:var(--secondary)]">
        <div className="container-x py-16 lg:py-24 max-w-3xl">
          <span className="eyebrow">Ingredient glossary</span>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl tracking-[-0.015em]">
            The long names, <em className="not-italic text-[color:var(--sage-deep)]">explained simply.</em>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Some of our ingredients sound like chemicals because they are chemically or biologically processed —
            often from coconut, olive, or sugar. Here is every one of them, what it does, and how much of it
            originates from nature.
          </p>
        </div>
      </section>

      <section className="container-x py-14 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="hidden md:grid grid-cols-[1.4fr_1.4fr_auto] gap-6 px-6 py-4 bg-[color:var(--muted)] text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
            <div>Ingredient</div>
            <div>What it does</div>
            <div className="text-right">% Natural origin</div>
          </div>
          <ul className="divide-y divide-border bg-background">
            {ingredients.map((ing) => (
              <li
                key={ing.name}
                className="grid md:grid-cols-[1.4fr_1.4fr_auto] gap-2 md:gap-6 px-6 py-5 items-baseline"
              >
                <div className="font-display text-lg leading-snug">{ing.name}</div>
                <div className="text-sm text-muted-foreground">{ing.use}</div>
                <div
                  className="font-display text-xl md:text-right"
                  style={{ color: originColor(ing.naturalOrigin) }}
                >
                  {ing.naturalOrigin}%
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-sm text-muted-foreground max-w-2xl">
          A 0% natural origin figure means the ingredient is synthetically produced — we use it only where it
          is the safest, most skin-friendly option (e.g. D-Panthenol for healing, Allantoin for soothing).
          Every formula is dermatologically tested and Made Safe certified.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/shop" className="btn-primary">Shop transparent formulas →</Link>
          <Link to="/about" className="btn-ghost">Why we disclose everything</Link>
        </div>
      </section>
    </>
  );
}
