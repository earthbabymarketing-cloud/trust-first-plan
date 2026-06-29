import { Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { formatINR, useCart } from "@/lib/cart";

export function CartRecommendations() {
  const { items, add } = useCart();
  const inCart = new Set(items.map((i) => i.slug));
  const recs = products.filter((p) => !inCart.has(p.slug)).slice(0, 3);
  if (recs.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-border bg-card p-5 sm:p-6"
      aria-label="Complete your baby care routine"
    >
      <h2 className="font-display text-xl sm:text-2xl">Complete Your Baby Care Routine</h2>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
        Picked to pair with what's already in your cart.
      </p>

      <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
        {recs.map((p) => (
          <li key={p.slug} className="flex flex-col">
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="block aspect-square overflow-hidden rounded-2xl bg-[color:var(--tint-mist)]"
            >
              <img
                src={p.image}
                alt={p.name}
                width={300}
                height={300}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </Link>
            <div className="mt-2 min-w-0">
              <div className="truncate font-display text-sm sm:text-base leading-tight">{p.name}</div>
              <div className="text-[11px] sm:text-xs text-muted-foreground">{formatINR(p.price)}</div>
            </div>
            <button
              onClick={() => add(p.slug, 1)}
              className="mt-2 w-full rounded-full border border-[color:var(--brand-sky)] text-[color:var(--brand-sky)] hover:bg-[color:var(--brand-sky)] hover:text-white transition-colors text-[11px] sm:text-xs font-semibold py-1.5"
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
