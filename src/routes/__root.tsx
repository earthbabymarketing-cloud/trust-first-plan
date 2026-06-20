import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider, useCart } from "../lib/cart";

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
      { name: "theme-color", content: "#FAF6EE" },
      { property: "og:title", content: "Earthbaby — Honest care for sensitive skin" },
      { property: "og:description", content: "Calming, radically transparent care for sensitive baby and mom skin. Every ingredient disclosed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" },
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
    <div className="bg-[color:var(--ink)] text-[color:var(--background)] text-[12px] sm:text-[13px]">
      <div className="container-x flex items-center justify-center gap-2 py-2 text-center">
        <span className="hidden sm:inline tracking-[0.18em]">★★★★★</span>
        <span className="opacity-90">Trusted by 10,000+ families · Free shipping above ₹600 · Dermatologically tested</span>
      </div>
    </div>
  );
}

function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--background)]/85 border-b border-border">
      <div className="container-x grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4">
        <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <Link to="/shop" search={{ concern: "sensitive" }} className="hover:text-foreground">Concerns</Link>
          <Link to="/about" hash="ingredients" className="hover:text-foreground">Ingredients</Link>
          <Link to="/about" hash="reviews" className="hover:text-foreground">Reviews</Link>
        </nav>
        <Link to="/" className="font-display text-2xl md:text-[28px] tracking-[0.02em] text-center">
          earthbaby<span className="text-[color:var(--clay)]">.</span>
        </Link>
        <div className="flex items-center justify-end gap-5 text-sm">
          <Link to="/about" className="hidden md:inline hover:text-foreground/70">About</Link>
          <Link to="/cart" className="relative inline-flex items-center gap-1.5">
            <span>Cart</span>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[color:var(--ink)] px-1.5 text-[11px] text-[color:var(--background)]">{count}</span>
          </Link>
        </div>
      </div>
      {/* Mobile nav row */}
      <div className="md:hidden border-t border-border">
        <div className="container-x flex items-center justify-between gap-4 py-2 text-[13px] overflow-x-auto">
          <Link to="/shop">Shop</Link>
          <Link to="/shop" search={{ concern: "sensitive" }}>Concerns</Link>
          <Link to="/about" hash="ingredients">Ingredients</Link>
          <Link to="/about" hash="reviews">Reviews</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--ink)] text-[color:var(--background)]">
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-3xl">earthbaby<span className="text-[color:var(--clay)]">.</span></div>
          <p className="mt-4 text-sm opacity-75 max-w-xs">Calming, radically transparent care for sensitive baby and mom skin.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip bg-white/10 text-white/90">Made Safe</span>
            <span className="chip bg-white/10 text-white/90">Dermatologically Tested</span>
            <span className="chip bg-white/10 text-white/90">PETA</span>
            <span className="chip bg-white/10 text-white/90">FDA Approved</span>
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
            <li><a href="#">YouTube</a></li>
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
