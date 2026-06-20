import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-mother-baby.jpg";
import flatlay from "@/assets/products-flatlay.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Earthbaby" },
      { name: "description", content: "Earthbaby was built on radical transparency. Read our story, our standards, and our promise to parents." },
      { property: "og:title", content: "About Earthbaby" },
      { property: "og:description", content: "Honest baby and mom care, built on radical transparency." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <span className="eyebrow">Our story</span>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl leading-[1.05]">
            Built for parents who ask <em className="italic text-[color:var(--clay)]">what's inside</em> — and deserve an answer.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Earthbaby started in a small kitchen in Hyderabad, with one frustrated mother and an INCI list she couldn't decode. We've grown — but the standard hasn't moved. Every product page still names every ingredient, in plain English, with its natural origin %.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[color:var(--muted)]">
          <img src={hero} alt="Mother and baby" width={1600} height={2000} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="bg-[color:var(--secondary)]">
        <div className="container-x py-20 lg:py-28 grid lg:grid-cols-3 gap-10">
          {[
            ["01", "Transparency", "Every ingredient. Every percentage. Every batch."],
            ["02", "Restraint", "If an ingredient doesn't serve the formula, it's out."],
            ["03", "Respect", "We won't market with fear. We won't shout. We'll show."],
          ].map(([n, t, d]) => (
            <div key={n}>
              <div className="font-display text-5xl text-[color:var(--sage-deep)]">{n}</div>
              <h3 className="mt-4 font-display text-2xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ingredients" className="container-x py-20 lg:py-28 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div className="aspect-square overflow-hidden rounded-3xl bg-[color:var(--muted)]">
          <img src={flatlay} alt="Ingredients" width={1280} height={960} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="eyebrow">Our standards</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">No grey areas.</h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {[
              ["Dermatologically tested", "On sensitive skin panels, not just standard skin."],
              ["No synthetic fragrance", "Ever. If it smells, we tell you why."],
              ["Vegetable-derived surfactants", "No SLS, no SLES."],
              ["Made Safe certified", "Independent verification of every ingredient."],
            ].map(([t, d]) => (
              <li key={t} className="py-5">
                <div className="font-display text-xl">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reviews" className="bg-[color:var(--ink)] text-[color:var(--background)]">
        <div className="container-x py-20 lg:py-28 text-center">
          <span className="eyebrow text-white/60">From the parents we serve</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl max-w-3xl mx-auto">
            "Finally a brand that explains everything."
          </h2>
          <p className="mt-6 text-white/70">— Bangalore Mom, Baby 1 year</p>
          <Link to="/shop" className="mt-10 inline-flex items-center gap-2 bg-white text-foreground px-7 py-4 rounded-full">Shop bestsellers →</Link>
        </div>
      </section>
    </>
  );
}
