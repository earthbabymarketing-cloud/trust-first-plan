import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  qty: number;
  name: string;
  price: number;
  image: string;
  variantId: string;
  size?: string;
  naturalOrigin?: number;
};

export type CartProductLike = {
  slug: string;
  name: string;
  price: number;
  image: string;
  variantId: string;
  size?: string;
  naturalOrigin?: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: CartProductLike, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  detailed: { product: CartItem; qty: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "earthbaby_cart_v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Only keep entries with the new schema (have name/price)
          setItems(parsed.filter((i) => i && typeof i.name === "string" && typeof i.price === "number"));
        }
      }
      // Clear any legacy v1 cart
      localStorage.removeItem("earthbaby_cart_v1");
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items.map((i) => ({ product: i, qty: i.qty }));
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items, count, subtotal, detailed,
      add: (product, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((p) => p.slug === product.slug);
          if (found) return prev.map((p) => (p.slug === product.slug ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { ...product, qty }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.slug !== slug) : prev.map((p) => (p.slug === slug ? { ...p, qty } : p)),
        ),
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
