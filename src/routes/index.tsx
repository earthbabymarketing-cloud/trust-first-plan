import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-mother-baby.jpg";
import flatlay from "@/assets/products-flatlay.jpg";
import { useProducts, concerns } from "@/lib/products";
import { formatINR, useCart } from "@/lib/cart";
import { BunnyIcon, ElephantIcon, BirdIcon, BearIcon, DuckIcon, GiraffeIcon, DottedCloud } from "@/components/BrandIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earthbaby — Calming, radically transparent baby & mom care" },
      { name: "description", content: "Dermatologically tested baby and mom skincare with 100% ingredient disclosure and natural origin % declared for every product." },
      { property: "og:title", content: "Earthbaby — Honest care for sensitive skin" },
      { property: "og:description", content: "Calming, radically transparent care for sensitive baby and mom skin." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Empathy />
      <WhyTrust />
      <ShopByConcern />
      <Bestsellers />
      <Bundles />
      <Difference />
      <Ingredients />
      <Reviews />
      <FounderStory />
      <LearnBlock />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--secondary)]">
      {/* Soft brand-color decoration */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[color:var(--tint-blossom)] opacity-60 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[color:var(--tint-leaf)] opacity-50 blur-2xl" />

      <div className="relative container-x grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 py-10 sm:py-14 lg:py-20 items-center">
        <div className="order-2 lg:order-1">
          <span className="eyebrow">For sensitive baby & mom skin · Made in India</span>
          <h1 className="mt-4 sm:mt-5 font-display text-[34px] leading-[1.08] sm:text-[52px] lg:text-[72px] tracking-[-0.015em]">
            Calming care for <em className="not-italic text-[color:var(--sage-deep)]">sensitive skin.</em>
            <br />
            Complete <span className="italic text-[color:var(--clay)]">transparency</span> for parents.
          </h1>
          <p className="mt-4 sm:mt-5 max-w-xl text-[15px] sm:text-lg text-muted-foreground">
            Thoughtfully formulated for babies and moms with sensitive skin. Dermatologically tested. Certified natural origin. Every ingredient disclosed.
          </p>
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Link to="/shop" className="btn-primary w-full sm:w-auto justify-center">Shop bestsellers →</Link>
            <Link to="/about" className="btn-ghost self-center sm:self-auto">Why parents trust Earthbaby</Link>
          </div>
          <div className="mt-7 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 text-[12px] text-muted-foreground">
            <Bullet>★★★★★ 10,000+ families</Bullet>
            <Bullet>Made Safe Certified</Bullet>
            <Bullet>Dermatologically Tested</Bullet>
            <Bullet>Easy Returns</Bullet>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[color:var(--muted)] shadow-[var(--shadow-soft)]">
            <img
              src={hero}
              alt="Indian mother holding her baby in soft natural light"
              width={1600}
              height={2000}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 card-soft px-4 py-3 max-w-[210px] sm:max-w-[230px]">
            <div className="text-[11px] eyebrow">Natural origin</div>
            <div className="font-display text-2xl text-[color:var(--sage-deep)]">90–100%</div>
            <div className="text-[11px] text-muted-foreground">declared on every product</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--sage-deep)]" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const logos = ["Economic Times", "The Better India", "Startup India Seed Fund"];
  return (
    <section className="border-y border-border bg-background">
      <div className="container-x py-6 flex flex-wrap items-center justify-between gap-6">
        <span className="eyebrow">As featured in</span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-foreground/55">
          {logos.map((l) => <span key={l} className="font-display text-lg sm:text-xl tracking-tight">{l}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Empathy ---------- */
function Empathy() {
  return (
    <section className="container-x py-14 sm:py-20 lg:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">Why we exist</span>
        <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-tight">
          Choosing baby care shouldn't feel overwhelming.
        </h2>
        <div className="mt-8 space-y-4 text-lg text-muted-foreground">
          <p>Every brand claims to be natural.</p>
          <p>Understanding ingredients isn't easy.</p>
          <p>And when it comes to your baby, guessing doesn't feel right.</p>
          <p className="text-foreground">That's why we created Earthbaby.<br />Because parents deserve <em className="italic text-[color:var(--clay)]">confidence</em>, not confusion.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why trust ---------- */
function WhyTrust() {
  const points = [
    { t: "Every ingredient disclosed", d: "Full ingredient list, in plain English, on every product page.", Icon: BunnyIcon },
    { t: "Natural origin % transparency", d: "We declare the exact natural origin % — no rounding up.", Icon: GiraffeIcon },
    { t: "Dermatologically tested", d: "Patch-tested for sensitive baby and mom skin.", Icon: ElephantIcon },
    { t: "No fear-based marketing", d: "We won't scare you into buying. Just facts.", Icon: BirdIcon },
    { t: "Sensitive skin first", d: "Formulated for the most reactive skin in the family.", Icon: DuckIcon },
    { t: "Honest claims", d: "No buzzwords. No half-truths. If we say it, we can prove it.", Icon: BearIcon },
  ];
  return (
    <section className="bg-[color:var(--wash-sky)] relative overflow-hidden">
      <DottedCloud size={220} className="absolute -top-6 right-6 opacity-70" />
      <div className="container-x py-14 sm:py-20 lg:py-28 relative">
        <div className="max-w-2xl">
          <span className="eyebrow">Our promise</span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">We don't ask you to trust us blindly.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {points.map(({ t, d, Icon }) => (
            <div key={t} className="bg-white p-7">
              <Icon size={56} />
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Shop by concern ---------- */
function ShopByConcern() {
  return (
    <section className="container-x py-14 sm:py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Shop by concern</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">What are you looking for?</h2>
        </div>
        <Link to="/shop" className="btn-ghost">View all →</Link>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {concerns.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ concern: c.id }}
            className="group flex flex-col items-center text-center"
          >
            <div className="aspect-square w-full rounded-full overflow-hidden bg-[color:var(--wash-mint)] border border-border transition group-hover:shadow-[var(--shadow-lift)]">
              <img
                src={c.image}
                alt={c.label}
                width={400}
                height={400}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 font-display text-sm sm:text-base leading-tight text-foreground">{c.label}</div>
            <div className="text-[12px] text-[color:var(--sage-deep)] mt-1 opacity-0 group-hover:opacity-100 transition">Explore →</div>
          </Link>
        ))}
      </div>

    </section>
  );
}

/* ---------- Bestsellers ---------- */
function Bestsellers() {
  const { add } = useCart();
  const { data: products = [] } = useProducts();
  const FEATURED_HANDLES = [
    "lipstick-au-naturale-certified-100-natural-origin",
    "ubtan-sunni-pindi-bath-powder-100-natural-origin-500g",
    "virgin-coconut-oil-100-certified-natural-origin",
    "handmade-baby-soap-for-babies-below-1-year-90-natural-origin",
  ];
  const featured = FEATURED_HANDLES
    .map((h) => products.find((p) => p.slug === h))
    .filter(Boolean) as typeof products;
  return (
    <section className="bg-background">
      <div className="container-x py-14 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Bestsellers</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">Loved by parents who value gentle care.</h2>
          </div>
          <Link to="/shop" className="btn-ghost">Shop all →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {featured.map((p) => (
            <article key={p.slug} className="group">
              <Link to="/products/$slug" params={{ slug: p.slug }} className="block aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                <img src={p.image} alt={p.name} width={900} height={1100} loading="lazy" className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03]" />
              </Link>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground">★ {p.rating} ({p.reviews})</div>
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="font-display text-lg leading-tight mt-1 block truncate">{p.name}</Link>
                  <p className="text-[13px] text-muted-foreground line-clamp-2">{p.tagline}</p>
                </div>
                <div className="font-display text-lg shrink-0">{formatINR(p.price)}</div>
              </div>
              <button onClick={() => add(p)} className="mt-3 w-full rounded-full border border-border bg-background py-2.5 text-sm hover:bg-[color:var(--secondary)] transition">Add to cart</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Bundles ---------- */
function Bundles() {
  return (
    <section className="container-x py-14 sm:py-20 lg:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">Routines</span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl">Start with a complete routine.</h2>
      </div>
      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <BundleCard
          title="Sensitive Skin Essentials"
          items={["Baby Wash", "Moisturising Butter", "Virgin Coconut Oil"]}
          price={1490}
          strike={1864}
          badge="Save 10%"
          accent
        />
        <BundleCard
          title="Traditional Care Bundle"
          items={["Ubtan Sunni Pindi", "Coconut Oil", "Baby Wash"]}
          price={1590}
          strike={1655}
          badge="Heritage"
        />
      </div>
    </section>
  );
}

function BundleCard({ title, items, price, strike, badge, accent }: { title: string; items: string[]; price: number; strike: number; badge: string; accent?: boolean }) {
  return (
    <div className={`card-soft p-7 lg:p-9 ${accent ? "bg-[color:var(--wash-blush)]" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl sm:text-3xl">{title}</h3>
        <span className="chip bg-[color:var(--clay)] text-[color:var(--accent-foreground)]">{badge}</span>
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {items.map((i) => <li key={i} className="flex gap-2"><span className="text-[color:var(--sage-deep)]">✓</span>{i}</li>)}
      </ul>
      <div className="mt-6 flex items-end gap-3">
        <span className="font-display text-3xl">{formatINR(price)}</span>
        <span className="text-sm text-muted-foreground line-through pb-1">{formatINR(strike)}</span>
      </div>
      <button className="btn-primary mt-6 w-full sm:w-auto">Get this routine</button>
    </div>
  );
}

/* ---------- Difference ---------- */
function Difference() {
  const rows = [
    ["Chemical-free claims", "Full ingredient disclosure"],
    ["Hidden ingredients", "Natural origin % declared"],
    ["Fear marketing", "Calm confidence"],
    ["Buzzwords", "Sensitive skin first"],
    ["Fragrance mystery", "No artificial fragrance,\never"],
  ];
  return (
    <section className="bg-[color:var(--ink)] text-[color:var(--background)]">
      <div className="container-x py-14 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow text-white/60">The Earthbaby difference</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl text-[color:var(--background)]">Honest care, without the marketing noise.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          <div className="bg-[color:var(--ink)] p-7">
            <div className="eyebrow text-white/50">Other brands</div>
            <ul className="mt-5 space-y-3 text-white/75">
              {rows.map(([a]) => <li key={a} className="flex gap-3"><span className="text-white/40">✗</span>{a}</li>)}
            </ul>
          </div>
          <div className="bg-[color:var(--sage-deep)] p-7">
            <div className="eyebrow text-white/70">Earthbaby</div>
            <ul className="mt-5 space-y-3">
              {rows.map(([, b]) => <li key={b} className="flex gap-3 whitespace-pre-line"><span>✓</span>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ingredients ---------- */
function Ingredients() {
  // Featured processed ingredients shown on the home page — full list lives on /ingredients.
  const ings: Array<[string, string, number]> = [
    ["Coco Glucoside", "Mild cleanser & bubbles maker", 100],
    ["Disodium Cocoyl Glutamate", "Gentle cleanser", 98],
    ["Sodium Hyaluronate", "Powerhouse hydration", 100],
    ["Sodium Cocoyl Isethionate", "Mild cleanser with creamy feel", 86],
  ];
  return (
    <section id="ingredients" className="container-x py-14 sm:py-20 lg:py-28">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        <div className="aspect-square w-full overflow-hidden rounded-3xl bg-[color:var(--muted)]">
          <img src={flatlay} alt="Natural ingredients flatlay" width={1280} height={960} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="eyebrow">Ingredient transparency</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">The long names, explained simply.</h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Some ingredients sound like chemicals because they are processed — often minimally from naturals like coconut & olive
          </p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {ings.map(([n, d, p]) => (
              <li key={n} className="py-4 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                <div>
                  <div className="font-display text-xl">{n}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
                <span className="font-display text-lg text-[color:var(--sage-deep)] whitespace-nowrap">{p}% natural origin</span>
              </li>
            ))}
          </ul>
          <Link to="/ingredients" className="btn-ghost mt-8 inline-flex">See all ingredients →</Link>
        </div>
      </div>
    </section>
  );
}


/* ---------- Reviews ---------- */
function Reviews() {
  const list = [
    { q: "After trying 3 brands, this is the only one that worked for my baby's dry skin.", a: "Mumbai Mom · Baby 8 months" },
    { q: "Finally a brand that explains everything. I know what I'm putting on my baby.", a: "Bangalore Mom · Baby 1 year" },
    { q: "The ubtan reminded me of my grandmother's recipe. Comforting and effective.", a: "Hyderabad Mom · Baby 4 months" },
  ];
  return (
    <section id="reviews" className="bg-[color:var(--secondary)]">
      <div className="container-x py-14 sm:py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Real mothers. Real stories.</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">From parents who switched.</h2>
          </div>
      <div className="text-sm text-muted-foreground">★ 4.9 average · 950+ verified reviews</div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {list.map((r, i) => (
            <figure key={i} className="card-soft p-6 bg-[color:var(--wash-blush)]">
              <div className="text-[color:var(--brand-sun)] tracking-[0.2em]">★★★★★</div>
              <blockquote className="mt-4 font-display text-xl leading-snug">"{r.q}"</blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">{r.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */
function FounderStory() {
  return (
    <section className="container-x py-14 sm:py-20 lg:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">Founder story</span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl">Why Earthbaby exists.</h2>
        <p className="mt-6 text-lg text-muted-foreground">
          We were tired of endless claims and confusing labels. So we built Earthbaby around one belief:
          <span className="text-foreground"> parents deserve complete transparency.</span> Because confidence matters more than marketing.
        </p>
        <Link to="/about" className="btn-ghost mt-7 inline-flex">Read our story →</Link>
      </div>
    </section>
  );
}

/* ---------- Learn ---------- */
function LearnBlock() {
  const items = [
    "How to choose baby skincare without getting overwhelmed",
    "What does dermatologically tested actually mean?",
    "Why fragrance matters for sensitive skin",
    "Understanding ingredients, made simple",
  ];
  return (
    <section className="bg-background">
      <div className="container-x py-14 sm:py-20 lg:py-28">
        <span className="eyebrow">Learn before you buy</span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl max-w-2xl">A small library for confident parents.</h2>
        <ul className="mt-10 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {items.map((i) => (
            <li key={i} className="bg-background p-6 hover:bg-[color:var(--secondary)] transition cursor-pointer">
              <div className="font-display text-xl leading-snug">{i}</div>
              <div className="mt-3 text-sm text-[color:var(--sage-deep)]">Read article →</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FAQ teaser ---------- */
function HomeFAQ() {
  const qs = [
    "Is it suitable for sensitive skin?",
    "Can newborns use it?",
    "Why is Earthbaby priced higher?",
    "Are your products fragrance free?",
    "How are you different from other brands?",
    "Why buy from your website instead of Amazon?",
  ];
  return (
    <section className="container-x py-14 sm:py-20 lg:py-28">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
        <div>
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">Honest answers.</h2>
          <p className="mt-4 text-muted-foreground">Everything we get asked, answered plainly.</p>
          <Link to="/faq" className="btn-ghost mt-6 inline-flex">All FAQs →</Link>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {qs.map((q) => (
            <li key={q} className="py-5 flex items-center justify-between gap-4">
              <span className="font-display text-lg sm:text-xl">{q}</span>
              <span className="h-8 w-8 rounded-full border border-border grid place-items-center text-foreground/60">+</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="bg-[color:var(--sage-deep)] text-[color:var(--background)]">
      <div className="container-x py-24 lg:py-32 text-center">
        <div className="flex justify-center items-end gap-3 sm:gap-5 mb-6 opacity-95">
          <BunnyIcon size={48} />
          <DuckIcon size={56} />
          <ElephantIcon size={64} />
          <BearIcon size={56} />
          <BirdIcon size={48} />
        </div>
        <span className="eyebrow text-white/70">For sensitive skin</span>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl mx-auto">
          Because parents deserve <em className="italic">confidence</em>, not confusion.
        </h2>
        <p className="mt-5 text-white/80 max-w-xl mx-auto">Calming, radically transparent care for sensitive skin.</p>
        <Link to="/shop" className="mt-8 inline-flex items-center justify-center gap-2 bg-[color:var(--background)] text-[color:var(--foreground)] px-7 py-4 rounded-full font-medium hover:bg-white transition">
          Shop bestsellers →
        </Link>
      </div>
    </section>
  );
}
