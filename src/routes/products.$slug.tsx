import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { productBySlug, products } from "@/lib/products";
import { formatINR, useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Earthbaby` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Earthbaby` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to shop</Link>
    </div>
  ),
  component: PDP,
});

function PDP() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"ingredients" | "how" | "reviews">("ingredients");

  return (
    <>
      <section className="container-x pt-10 lg:pt-14">
        <nav className="text-[12px] text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>/
          <Link to="/shop" className="hover:text-foreground">Shop</Link>/
          <span className="text-foreground">{product.name}</span>
        </nav>
      </section>

      <section className="container-x py-8 lg:py-12 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[color:var(--muted)]">
          <img src={product.image} alt={product.name} width={900} height={1100} className="h-full w-full object-cover" />
        </div>

        <div>
          <div className="text-[12px] text-muted-foreground">★ {product.rating} ({product.reviews} reviews) · {product.size}</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl leading-tight">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl">{formatINR(product.price)}</span>
            <span className="text-xs text-muted-foreground pb-1">incl. all taxes · free shipping above ₹600</span>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.hero.map((h) => <li key={h} className="chip">{h}</li>)}
            <li className="chip bg-[color:var(--sage-deep)] text-[color:var(--background)]">{product.naturalOrigin}% natural origin</li>
          </ul>

          <p className="mt-6 text-foreground/85">{product.description}</p>

          <div className="mt-7 grid grid-cols-[auto_1fr] gap-3">
            <div className="inline-flex items-center rounded-full border border-border overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-lg">−</button>
              <span className="px-3 min-w-8 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-lg">+</button>
            </div>
            <button onClick={() => add(product.slug, qty)} className="btn-primary w-full">Add to cart · {formatINR(product.price * qty)}</button>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px] text-muted-foreground">
            <Trust>Ships in 24 hrs</Trust>
            <Trust>14-day easy returns</Trust>
            <Trust>COD available</Trust>
          </div>

          {/* Objection handling */}
          <div className="mt-8 card-soft p-5">
            <div className="eyebrow">Made for sensitive skin</div>
            <p className="mt-2 text-sm text-foreground/80">
              Patch-tested. Free from sulphates, parabens, and synthetic fragrance. If your baby's skin doesn't love it, we refund — no questions.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="flex gap-6 border-b border-border">
              {(["ingredients", "how", "reviews"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm capitalize ${tab === t ? "text-foreground border-b-2 border-[color:var(--ink)] -mb-px" : "text-muted-foreground"}`}>
                  {t === "how" ? "How to use" : t === "ingredients" ? "Ingredients" : "Reviews"}
                </button>
              ))}
            </div>
            <div className="pt-6">
              {tab === "ingredients" && (
                <ul className="divide-y divide-border">
                  {product.ingredients.map((i) => (
                    <li key={i.name} className="py-3 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <div>
                        <div className="font-display text-lg">{i.name}</div>
                        <div className="text-sm text-muted-foreground">{i.purpose}</div>
                      </div>
                      {i.percent && <span className="text-sm text-[color:var(--sage-deep)] shrink-0">{i.percent}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "how" && (
                <ol className="space-y-3 text-foreground/85">
                  {product.howToUse.map((s, i) => (
                    <li key={i} className="flex gap-3"><span className="h-6 w-6 rounded-full bg-[color:var(--secondary)] text-xs grid place-items-center">{i + 1}</span>{s}</li>
                  ))}
                </ol>
              )}
              {tab === "reviews" && (
                <div className="space-y-5">
                  {[
                    { n: "Aanya R.", t: "Worked when nothing else did", b: "My 6-month-old has eczema flares. This is the first product that didn't make it worse." },
                    { n: "Priya M.", t: "Smells like nothing — in a good way", b: "Finally a fragrance-free product that actually has no smell. My baby doesn't fuss." },
                    { n: "Sneha K.", t: "Love the transparency", b: "Showed the ingredient page to my paediatrician. She approved on the spot." },
                  ].map((r) => (
                    <div key={r.n} className="card-soft p-5">
                      <div className="text-[color:var(--clay)] tracking-[0.2em] text-sm">★★★★★</div>
                      <div className="mt-2 font-display text-lg">{r.t}</div>
                      <p className="mt-2 text-sm text-foreground/80">{r.b}</p>
                      <div className="mt-3 text-xs text-muted-foreground">{r.n} · Verified buyer</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container-x py-20">
        <h2 className="font-display text-3xl sm:text-4xl">Pairs well with</h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-5">
          {products.filter((p) => p.slug !== product.slug).slice(0, 3).map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[color:var(--muted)]">
                <img src={p.image} alt={p.name} width={900} height={1100} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg">{p.name}</span>
                <span className="font-display">{formatINR(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 rounded-lg bg-[color:var(--secondary)] px-3 py-2"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--sage-deep)]" />{children}</div>;
}
