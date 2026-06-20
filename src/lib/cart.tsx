import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { slug: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  detailed: { product: Product; qty: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "earthbaby_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((i) => {
        const product = products.find((p) => p.slug === i.slug);
        return product ? { product, qty: i.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = detailed.reduce((s, d) => s + d.product.price * d.qty, 0);
    return {
      items, count, subtotal, detailed,
      add: (slug, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((p) => p.slug === slug);
          if (found) return prev.map((p) => (p.slug === slug ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { slug, qty }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) => (qty <= 0 ? prev.filter((p) => p.slug !== slug) : prev.map((p) => (p.slug === slug ? { ...p, qty } : p)))),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside CartProvider");
  return v;
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
