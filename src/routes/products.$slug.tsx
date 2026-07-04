import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useProductBySlug, useProducts, type Product } from "@/lib/products";
import { formatINR, useCart } from "@/lib/cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/products/$slug")({
  head: () => ({
    meta: [{ title: "Product — Earthbaby" }],
  }),
  component: PDP,
});

/* ---------- brand-wide FAQ fallback (from earthbaby.in product pages) ---------- */
const BRAND_FAQS: { q: string; a: string }[] = [
  {
    q: "Is this safe for newborns and sensitive skin?",
    a: "Yes. Every Earthbaby formula is dermatologically tested, pH-balanced to 5.5, and free from sulphates, parabens, silicones and synthetic fragrance. Safe from day one.",
  },
  {
    q: "What does “natural origin” actually mean?",
    a: "We follow the ISO 16128 standard — the percentage tells you exactly how much of the formula, by weight, is derived from natural sources. No greenwashing, no marketing math.",
  },
  {
    q: "Where is it made, and who formulates it?",
    a: "Formulated in-house at Earthbaby's lab in India, made in small batches at a cGMP-certified facility. Every batch is quality-checked before it leaves.",
  },
  {
    q: "How soon will I see results?",
    a: "Most parents notice softer, calmer skin within 5–7 days of daily use. For eczema-prone or very dry skin, allow 2–3 weeks of consistent use.",
  },
  {
    q: "Return policy?",
    a: "If your baby's skin doesn't love it, return within 10 days for a full refund — no questions, no forms. Just write to hello@earthbaby.in.",
  },
];

function PDP() {
  const { slug } = Route.useParams();
  const { product, isLoading } = useProductBySlug(slug);
  const { data: allProducts = [] } = useProducts();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) {
    return <div className="container-x py-32 text-center text-muted-foreground">Loading product…</div>;
  }
  if (!product) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to shop</Link>
      </div>
    );
  }

  const isBestseller = product.reviews >= 200;
  const gallery = product.images.length ? product.images : [product.image];
  const heroImg = gallery[activeImg] ?? product.image;

  return (
    <>
      {/* Breadcrumb */}
      <section className="container-x pt-8 lg:pt-12">
        <nav className="text-[12px] text-muted-foreground flex gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>/
          <Link to="/shop" className="hover:text-foreground">Shop</Link>/
          <span className="text-foreground truncate">{product.name}</span>
        </nav>
      </section>

      {/* Hero: gallery + buy box */}
      <section className="container-x py-6 lg:py-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14">
        {/* Gallery */}
        <div className="grid sm:grid-cols-[72px_1fr] gap-4">
          <div className="hidden sm:flex flex-col gap-3">
            {gallery.slice(0, 5).map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square overflow-hidden rounded-xl bg-white border transition ${
                  i === activeImg ? "border-[color:var(--ink)]" : "border-border hover:border-foreground/40"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-contain p-2" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
            {isBestseller && (
              <span className="absolute top-4 left-4 z-10 rounded-full bg-[color:var(--ink)] text-[color:var(--brand-cream)] text-[11px] px-3 py-1 tracking-wide">
                Bestseller
              </span>
            )}
            {product.naturalOrigin ? (
              <span className="absolute top-4 right-4 z-10 rounded-full bg-[color:var(--brand-leaf)] text-white text-[11px] px-3 py-1">
                {product.naturalOrigin}% natural origin
              </span>
            ) : null}
            <img src={heroImg} alt={product.name} className="h-full w-full object-contain p-8" />
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="text-[12px] text-muted-foreground flex items-center gap-2">
            <Stars value={product.rating} />
            <span>{product.rating.toFixed(1)}</span>
            <span>· {product.reviews} reviews</span>
            {product.size ? <span>· {product.size}</span> : null}
          </div>

          {/* Title = same as Shopify product title */}
          <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[42px] leading-[1.1]">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

          {/* Price */}
          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl">{formatINR(product.price)}</span>
            <span className="text-xs text-muted-foreground pb-1">
              incl. all taxes · free shipping above ₹600
            </span>
          </div>

          {/* Hero USP chips */}
          {product.hero.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.hero.map((h) => (
                <li key={h} className="chip">{h}</li>
              ))}
            </ul>
          )}

          {/* Qty + CTA */}
          <div className="mt-7 grid grid-cols-[auto_1fr] gap-3">
            <div className="inline-flex items-center rounded-full border border-border overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-lg">−</button>
              <span className="px-3 min-w-8 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-lg">+</button>
            </div>
            <button onClick={() => add(product, qty)} className="btn-primary w-full">
              Add to cart · {formatINR(product.price * qty)}
            </button>
          </div>

          {/* Guarantee / risk-remover row (from template) */}
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[12px]">
            <RiskItem icon="🚚" title="Ships in 24 hrs" sub="Pan-India" />
            <RiskItem icon="↩️" title="10-day returns" sub="No questions" />
            <RiskItem icon="💳" title="COD available" sub="Prepaid = free ship" />
          </div>

          {/* Product promise */}
          <div className="mt-6 card-soft p-5">
            <div className="eyebrow">Made for sensitive skin</div>
            <p className="mt-2 text-sm text-foreground/80">
              Patch-tested. Free from sulphates, parabens, silicones and synthetic fragrance. If
              your baby's skin doesn't love it, we refund — no questions.
            </p>
          </div>

          {/* Description — kept from current site */}
          <div className="mt-8">
            <div className="eyebrow">About this product</div>
            <p className="mt-3 text-foreground/85 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Accordion tabs: Ingredients / How to use / Shipping / Returns / FAQ */}
      <section className="container-x pb-4">
        <Accordion type="multiple" defaultValue={["ingredients"]} className="border-t border-border">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-lg font-display">Full ingredients list</AccordionTrigger>
            <AccordionContent>
              {product.ingredients.length > 0 ? (
                <ul className="divide-y divide-border">
                  {product.ingredients.map((i) => (
                    <li key={i.name} className="py-3 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <div>
                        <div className="font-display text-base">{i.name}</div>
                        <div className="text-sm text-muted-foreground">{i.purpose}</div>
                      </div>
                      {i.percent && (
                        <span className="text-sm text-[color:var(--brand-leaf)] shrink-0">{i.percent}</span>
                      )}
                    </li>
                  ))}
                  {product.naturalOrigin && (
                    <li className="py-3 text-xs text-muted-foreground">
                      Rated {product.naturalOrigin}% natural origin per ISO 16128. Plant-derived
                      ingredients sourced from organic farming. For external use only.
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Full ingredient list on the pack. Every Earthbaby formula is dermatologically tested.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how">
            <AccordionTrigger className="text-lg font-display">How to use</AccordionTrigger>
            <AccordionContent>
              {product.howToUse.length > 0 ? (
                <ol className="space-y-3 text-foreground/85">
                  {product.howToUse.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="h-6 w-6 rounded-full bg-[color:var(--secondary)] text-xs grid place-items-center shrink-0">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-muted-foreground">Refer to the pack for full usage directions.</p>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping">
            <AccordionTrigger className="text-lg font-display">Shipping & delivery</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-foreground/80">
                Orders ship in 24 hours from our warehouse in Bengaluru. Standard delivery reaches
                metros in 2–3 days and rest of India in 4–6 days. Free shipping on orders above ₹600.
                Cash on delivery is available.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns">
            <AccordionTrigger className="text-lg font-display">Returns & warranty</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-foreground/80">
                Not happy? Return in 10 days, no questions asked. If the product feels wrong for your
                baby's skin — even after use — write to hello@earthbaby.in and we'll refund it.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq">
            <AccordionTrigger className="text-lg font-display">Frequently asked questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {BRAND_FAQS.map((f) => (
                  <div key={f.q}>
                    <div className="font-display text-base">{f.q}</div>
                    <p className="text-sm text-muted-foreground mt-1">{f.a}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Kalki — brand ambassador testimonial (kept from current site) */}
      <section className="container-x py-14">
        <div className="rounded-3xl bg-[color:var(--tint-sky)]/40 p-6 sm:p-10 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-white shrink-0 grid place-items-center text-4xl overflow-hidden">
            <img
              src="https://earthbaby.in/cdn/shop/files/image.png?crop=center&height=200&v=1737621024&width=200"
              alt="Kalki Koechlin"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="eyebrow">Loved by parents · Loved by Kalki</div>
            <p className="mt-2 text-foreground/90 leading-relaxed">
              “I love that Earthbaby is parabens and sulphates free — Sappho loves that it's tear-free.
              The after-sun cream leaves his skin soft after a day out. And the sandalwood soap smells
              just amazing.”
            </p>
            <div className="mt-3 font-display text-lg">Kalki Koechlin</div>
            <div className="text-xs text-muted-foreground">Actor · Earthbaby parent</div>
          </div>
        </div>
      </section>

      {/* Company objection busters (from template) */}
      <section className="container-x pb-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <USP title="Made in India" body="Small-batch, cGMP-certified. Formulated in Earthbaby's own lab." />
          <USP title="Dermatologically tested" body="Every SKU clinically evaluated for baby-safe use." />
          <USP title="Delivery you can trust" body="Ships in 24 hrs. Free above ₹600. COD across India." />
          <USP title="10-day easy returns" body="Skin didn't love it? We refund. No forms, no fuss." />
        </div>
      </section>

      {/* Pairs well with */}
      <section className="container-x pb-20">
        <h2 className="font-display text-3xl sm:text-4xl">Pairs well with</h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-5">
          {allProducts
            .filter((p: Product) => p.slug !== product.slug)
            .slice(0, 3)
            .map((p: Product) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-3 transition group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-display text-lg truncate">{p.name}</span>
                  <span className="font-display shrink-0">{formatINR(p.price)}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Sticky mobile buy bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[11px] text-muted-foreground truncate">{product.name}</div>
          <div className="font-display text-lg leading-tight">{formatINR(product.price * qty)}</div>
        </div>
        <button onClick={() => add(product, qty)} className="btn-primary shrink-0 px-6">
          Add to cart
        </button>
      </div>
      <div className="lg:hidden h-20" aria-hidden />
    </>
  );
}

function RiskItem({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--secondary)] px-2 py-3">
      <div className="text-lg leading-none">{icon}</div>
      <div className="mt-1 text-[12px] font-medium text-foreground">{title}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function USP({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-soft p-5">
      <div className="h-8 w-8 rounded-lg bg-[color:var(--tint-leaf)] grid place-items-center text-sm">✓</div>
      <div className="mt-3 font-display text-lg">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span aria-label={`${value} out of 5`} className="text-[color:var(--brand-sun)]">
      {"★".repeat(full)}
      <span className="text-muted-foreground/40">{"★".repeat(5 - full)}</span>
    </span>
  );
}
