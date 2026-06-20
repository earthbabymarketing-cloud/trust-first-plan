import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { products, concerns } from "@/lib/products";
import { formatINR, useCart } from "@/lib/cart";

const search = z.object({
  concern: z.enum(["sensitive", "everyday", "traditional", "massage", "mom"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop — Earthbaby" },
      { name: "description", content: "Shop dermatologically tested baby and mom skincare. Every ingredient disclosed, natural origin % declared." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { concern } = Route.useSearch();
  const filtered = concern ? products.filter((p) => p.concern === concern) : products;
  const { add } = useCart();
  return (
    <>
      <section className="bg-[color:var(--secondary)]">
        <div className="container-x py-14 lg:py-20">
          <span className="eyebrow">Shop the range</span>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl max-w-3xl">
            Calm, considered care for the most sensitive skin in the family.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Filter by concern. Every product page shows the full ingredient list and natural origin %.
          </p>
        </div>
      </section>

      <section className="container-x py-10 lg:py-14">
        <div className="flex flex-wrap gap-2">
          <Link to="/shop" className={`chip ${!concern ? "bg-[color:var(--ink)] text-[color:var(--background)]" : ""}`}>All</Link>
          {concerns.map((c) => (
            <Link key={c.id} to="/shop" search={{ concern: c.id }} className={`chip ${concern === c.id ? "bg-[color:var(--ink)] text-[color:var(--background)]" : ""}`}>
              {c.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {filtered.map((p) => (
            <article key={p.slug} className="group">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] overflow-hidden rounded-2xl bg-[color:var(--muted)]">
                <img src={p.image} alt={p.name} width={900} height={1100} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </Link>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground">★ {p.rating} ({p.reviews}) · {p.naturalOrigin}% natural origin</div>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="font-display text-xl leading-tight mt-1 block truncate">{p.name}</Link>
                  <p className="text-[13px] text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="font-display text-lg shrink-0">{formatINR(p.price)}</div>
              </div>
              <button onClick={() => add(p.slug)} className="mt-3 w-full rounded-full border border-border bg-background py-2.5 text-sm hover:bg-[color:var(--secondary)] transition">Add to cart</button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No products in this concern yet. <Link to="/shop" className="underline">View all →</Link></p>
        )}
      </section>
    </>
  );
}
