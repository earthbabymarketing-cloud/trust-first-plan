import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { formatINR, useCart } from "@/lib/cart";
import { createShopifyCheckout } from "@/lib/shopify";
import { CartProgress } from "@/components/CartProgress";
import { CartRecommendations } from "@/components/CartRecommendations";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — Earthbaby" }, { name: "robots", content: "noindex" }] }),
  component: Cart,
});

function Cart() {
  const { detailed, subtotal, setQty, remove, count } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [giftNotice, setGiftNotice] = useState<string | null>(null);
  const hadGift = useRef(false);

  useEffect(() => {
    if (subtotal >= 2000) {
      hadGift.current = true;
    } else if (hadGift.current && subtotal < 2000) {
      hadGift.current = false;
      setGiftNotice("The free gift has been removed because your order no longer qualifies.");
      const t = setTimeout(() => setGiftNotice(null), 4000);
      return () => clearTimeout(t);
    }
  }, [subtotal]);

  const shipping = subtotal >= 599 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  const checkout = async () => {
    setCheckingOut(true);
    setError(null);
    try {
      const url = await createShopifyCheckout(
        detailed.map((d) => ({ merchandiseId: d.product.variantId, quantity: d.qty })),
      );
      window.open(url, "_blank");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  if (count === 0) {
    return (
      <section className="container-x py-14 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <CartProgress subtotal={0} />
        </div>
        <div className="mt-10 text-center">
          <span className="eyebrow">Your cart</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">It's quiet in here.</h1>
          <p className="mt-3 text-muted-foreground">
            Start with a bestseller — every product comes with full ingredient transparency.
          </p>
          <Link to="/shop" className="btn-primary mt-8 inline-flex">Shop bestsellers →</Link>
        </div>
        <div className="mt-12 mx-auto max-w-3xl">
          <CartRecommendations />
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-10 lg:py-16 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
      <div className="space-y-6">
        <CartProgress subtotal={subtotal} />
        {giftNotice && (
          <div className="rounded-2xl border border-[color:var(--tint-blossom)] bg-[color:var(--tint-blossom)]/40 px-4 py-3 text-sm animate-[fade-in_.25s_ease]">
            {giftNotice}
          </div>
        )}

        <div>
          <span className="eyebrow">Your cart</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl">Review your routine.</h1>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {detailed.map(({ product, qty }) => (
              <li key={product.slug} className="py-5 grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 sm:gap-6 items-center">
                <Link to="/products/$slug" params={{ slug: product.slug }} className="block h-22 w-22 overflow-hidden rounded-xl bg-white">
                  <img src={product.image} alt={product.name} width={200} height={200} className="h-full w-full object-contain p-1.5" />
                </Link>
                <div className="min-w-0">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="font-display text-lg sm:text-xl block truncate">{product.name}</Link>
                  <div className="text-[12px] text-muted-foreground">{product.size} · {product.naturalOrigin}% natural origin</div>
                  <div className="mt-3 inline-flex items-center rounded-full border border-border overflow-hidden text-sm">
                    <button onClick={() => setQty(product.slug, qty - 1)} className="px-3 py-1.5">−</button>
                    <span className="px-3">{qty}</span>
                    <button onClick={() => setQty(product.slug, qty + 1)} className="px-3 py-1.5">+</button>
                  </div>
                  <button onClick={() => remove(product.slug)} className="ml-4 text-[12px] text-muted-foreground hover:text-foreground">Remove</button>
                </div>
                <div className="font-display text-lg sm:text-xl text-right">{formatINR(product.price * qty)}</div>
              </li>
            ))}
          </ul>
        </div>

        <CartRecommendations />
      </div>

      <aside className="lg:sticky lg:top-28 h-fit card-soft p-7 bg-[color:var(--secondary)]">
        <h2 className="font-display text-2xl">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? <span className="text-[color:var(--brand-leaf)]">Free</span> : formatINR(shipping)}</dd>
          </div>
          {subtotal < 599 && (
            <div className="text-[12px] text-muted-foreground">Add {formatINR(599 - subtotal)} more for free shipping.</div>
          )}
        </dl>
        <div className="mt-5 pt-5 border-t border-border flex justify-between items-baseline">
          <span className="font-display text-xl">Total</span>
          <span className="font-display text-2xl">{formatINR(total)}</span>
        </div>
        <button onClick={checkout} disabled={checkingOut} className="btn-primary mt-6 w-full">{checkingOut ? "Opening checkout…" : "Secure checkout →"}</button>
        {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
        <ul className="mt-5 space-y-2 text-[12px] text-muted-foreground">
          <li>· 14-day easy returns</li>
          <li>· COD available across India</li>
          <li>· Ships in 24 hours from Bengaluru</li>
        </ul>
      </aside>
    </section>
  );
}
