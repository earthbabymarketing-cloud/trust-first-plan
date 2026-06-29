import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider, useCart } from "../lib/cart";
import logoAsset from "../assets/earthbaby-logo.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">This page wandered off. Let's get you back.</p>
        <Link to="/" className="btn-primary mt-6">Back home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Refresh and try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Earthbaby — Calming, radically transparent baby & mom care" },
      { name: "description", content: "Dermatologically tested baby and mom skincare with 100% ingredient disclosure and natural origin % declared for every product." },
      { name: "theme-color", content: "#00A2C6" },
      { property: "og:title", content: "Earthbaby — Honest care for sensitive skin" },
      { property: "og:description", content: "Calming, radically transparent care for sensitive baby and mom skin. Every ingredient disclosed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Livvic:wght@400;600;700&family=Nunito:wght@400;500;600;700&family=Abel&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[color:var(--brand-sky)] via-[color:var(--brand-leaf)] to-[color:var(--brand-sun)] text-[color:var(--brand-ink)] text-[11.5px] sm:text-[13px]">
      <div className="container-x flex items-center justify-center gap-2 py-2 text-center">
        <span className="hidden sm:inline tracking-[0.18em]">★★★★★</span>
        <span className="opacity-95 font-medium">Trusted by 10,000+ families · Free shipping above ₹600 · Dermatologically tested</span>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { to: "/shop", label: "Shop", search: undefined as undefined | { concern: "sensitive" } },
  { to: "/shop", label: "Concerns", search: { concern: "sensitive" as const } },
  { to: "/about", label: "Ingredients", hash: "ingredients" },
  { to: "/about", label: "Reviews", hash: "reviews" },
  { to: "/about", label: "About" },
] as const;

function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--background)]/90 border-b border-border">
      <div className="container-x grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
        {/* Left: hamburger on mobile, nav on desktop */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background"
        >
          <span aria-hidden className="block h-[2px] w-4 bg-[color:var(--brand-ink)] relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-4 before:bg-[color:var(--brand-ink)] after:content-[''] after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-4 after:bg-[color:var(--brand-ink)]" />
        </button>
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-foreground/80">
          <Link to="/shop" className="hover:text-[color:var(--brand-sky)]">Shop</Link>
          <Link to="/shop" search={{ concern: "sensitive" }} className="hover:text-[color:var(--brand-sky)]">Concerns</Link>
          <Link to="/about" hash="ingredients" className="hover:text-[color:var(--brand-sky)]">Ingredients</Link>
          <Link to="/about" hash="reviews" className="hover:text-[color:var(--brand-sky)]">Reviews</Link>
        </nav>
        <Link to="/" className="flex items-center justify-center" aria-label="Earthbaby home">
          <img src={logoAsset.url} alt="Earthbaby — nature inside" className="h-11 sm:h-12 md:h-14 w-auto" />
        </Link>
        <div className="flex items-center justify-end gap-4 sm:gap-5 text-sm font-semibold">
          <Link to="/about" className="hidden md:inline hover:text-[color:var(--brand-sky)]">About</Link>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5" aria-label={`Cart (${count})`}>
            <span className="hidden sm:inline">Cart</span>
            <svg aria-hidden viewBox="0 0 24 24" className="sm:hidden h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
              <circle cx="10" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
            <span className="inline-flex h-5 min-w-5 sm:h-6 sm:min-w-6 items-center justify-center rounded-full bg-[color:var(--brand-sky)] px-1.5 text-[10px] sm:text-[11px] text-white">{count}</span>
          </Link>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-0 bottom-0 w-[84%] max-w-[320px] bg-background shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img src={logoAsset.url} alt="Earthbaby" className="h-10 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Close" className="h-10 w-10 rounded-full border border-border grid place-items-center text-lg">✕</button>
            </div>
            <nav className="p-5 flex flex-col gap-1 text-base font-display">
              {NAV_LINKS.map((l, i) => {
                const props: Record<string, unknown> = { to: l.to };
                if ("search" in l && l.search) props.search = l.search;
                if ("hash" in l && l.hash) props.hash = l.hash;
                return (
                  <Link
                    key={i}
                    {...(props as { to: string })}
                    onClick={() => setOpen(false)}
                    className="py-3 px-3 rounded-xl hover:bg-[color:var(--tint-sky)]"
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="hairline my-3" />
              <Link to="/cart" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-[color:var(--tint-sky)] flex items-center justify-between">
                <span>Cart</span>
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[color:var(--brand-sky)] px-1.5 text-[11px] text-white">{count}</span>
              </Link>
              <Link to="/faq" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-[color:var(--tint-sky)]">FAQ</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="py-3 px-3 rounded-xl hover:bg-[color:var(--tint-sky)]">Contact</Link>
            </nav>
            <div className="mt-auto p-5 text-xs text-muted-foreground">Pure. Safe. Honest.</div>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--brand-ink)] text-white">
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={logoAsset.url} alt="Earthbaby" className="h-16 w-auto" />
          <p className="mt-5 text-sm opacity-80 max-w-xs">Calming, radically transparent care for sensitive baby and mom skin.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip chip-leaf">Made Safe</span>
            <span className="chip">Dermatologically Tested</span>
            <span className="chip chip-blossom">PETA</span>
            <span className="chip chip-sun">FDA Approved</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="eyebrow text-white/60">Shop</div>
          <ul className="mt-4 space-y-2">
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop" search={{ concern: "sensitive" }}>Sensitive Skin</Link></li>
            <li><Link to="/shop" search={{ concern: "traditional" }}>Traditional</Link></li>
            <li><Link to="/shop" search={{ concern: "mom" }}>New Mom Care</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="eyebrow text-white/60">Brand</div>
          <ul className="mt-4 space-y-2">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about" hash="ingredients">Ingredients</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="eyebrow text-white/60">Support</div>
          <ul className="mt-4 space-y-2">
            <li><Link to="/contact">Track Order</Link></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs opacity-60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Earthbaby. Made in India.</span>
          <span>Honest claims. Full disclosure. Always.</span>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}
