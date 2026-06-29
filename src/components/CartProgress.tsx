import { useEffect, useMemo, useRef, useState } from "react";
import { Truck, Tag, Gift, Check } from "lucide-react";
import { formatINR } from "@/lib/cart";

type Milestone = {
  id: "shipping" | "discount" | "gift";
  amount: number;
  label: string;
  reward: string;
  Icon: typeof Truck;
};

const MILESTONES: Milestone[] = [
  { id: "shipping", amount: 599, label: "Free Shipping", reward: "FREE SHIPPING", Icon: Truck },
  { id: "discount", amount: 1499, label: "10% OFF", reward: "10% OFF on the entire order", Icon: Tag },
  { id: "gift", amount: 2000, label: "Free Gift", reward: "FREE Lipstick worth ₹650", Icon: Gift },
];

const MAX = MILESTONES[MILESTONES.length - 1].amount;

function Confetti() {
  const pieces = Array.from({ length: 24 });
  const colors = ["var(--brand-sky)", "var(--brand-leaf)", "var(--brand-blossom)", "var(--brand-sun)"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 1.4 + Math.random() * 1.2;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute top-[-12px] h-2 w-2 rounded-[2px] opacity-90"
            style={{
              left: `${left}%`,
              background: color,
              animation: `eb-confetti ${duration}s ${delay}s ease-out forwards`,
            }}
          />
        );
      })}
      <style>{`@keyframes eb-confetti{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(180px) rotate(540deg);opacity:0}}`}</style>
    </div>
  );
}

export function CartProgress({ subtotal }: { subtotal: number }) {
  const pct = Math.min(100, (subtotal / MAX) * 100);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [celebrated, setCelebrated] = useState(false);
  const wasUnlocked = useRef<Record<string, boolean>>({});
  const [burst, setBurst] = useState(false);

  const unlocked = useMemo(
    () => MILESTONES.map((m) => subtotal >= m.amount),
    [subtotal],
  );

  useEffect(() => {
    let newlyUnlocked = false;
    MILESTONES.forEach((m, i) => {
      if (unlocked[i] && !wasUnlocked.current[m.id]) {
        wasUnlocked.current[m.id] = true;
        newlyUnlocked = true;
      }
      if (!unlocked[i]) wasUnlocked.current[m.id] = false;
    });
    if (newlyUnlocked && subtotal > 0) {
      setBurst(true);
      const t = setTimeout(() => setBurst(false), 1600);
      return () => clearTimeout(t);
    }
  }, [unlocked, subtotal]);

  useEffect(() => {
    if (subtotal >= MAX) setCelebrated(true);
    else setCelebrated(false);
  }, [subtotal]);

  const message = useMemo(() => {
    if (subtotal === 0) return "Start shopping to unlock exciting rewards.";
    if (subtotal < 599) return `You're only ${formatINR(599 - subtotal)} away from FREE SHIPPING 🚚`;
    if (subtotal < 1499)
      return `🎉 You've unlocked FREE SHIPPING! Spend just ${formatINR(1499 - subtotal)} more to unlock 10% OFF.`;
    if (subtotal < 2000)
      return `🎉 FREE SHIPPING unlocked · 🎉 10% OFF unlocked. Add just ${formatINR(2000 - subtotal)} more to receive a FREE Lipstick worth ₹650.`;
    return "Congratulations! 🎉 You've unlocked FREE SHIPPING, 10% OFF & a FREE Lipstick worth ₹650.";
  }, [subtotal]);

  return (
    <div
      className="relative rounded-2xl border border-border bg-card p-5 sm:p-6"
      style={{ boxShadow: "0 10px 30px -16px color-mix(in oklab, var(--brand-sky) 25%, transparent)" }}
      aria-label="Cart rewards progress"
    >
      {burst && <Confetti />}

      <p className="text-sm sm:text-[15px] text-foreground/90 leading-snug">{message}</p>

      {/* Bar */}
      <div className="relative mt-6 mb-2">
        <div className="h-2 w-full rounded-full bg-[color:var(--tint-mist)] overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, var(--brand-leaf), var(--brand-sky))",
            }}
          />
        </div>

        {/* Milestone markers */}
        <ul className="absolute inset-x-0 -top-1.5 flex justify-between">
          {MILESTONES.map((m, i) => {
            const done = unlocked[i];
            const left = (m.amount / MAX) * 100;
            return (
              <li
                key={m.id}
                className="absolute -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <button
                  type="button"
                  onClick={() => setRevealed(revealed === m.id ? null : m.id)}
                  aria-label={`${m.label} at ${formatINR(m.amount)} — ${m.reward}`}
                  className={`grid h-5 w-5 place-items-center rounded-full border-2 transition-all ${
                    done
                      ? "bg-[color:var(--brand-leaf)] border-[color:var(--brand-leaf)] scale-110"
                      : "bg-card border-[color:var(--tint-mist)]"
                  }`}
                  style={
                    done
                      ? { boxShadow: "0 0 0 6px color-mix(in oklab, var(--brand-leaf) 18%, transparent)" }
                      : undefined
                  }
                >
                  {done && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Icons + labels */}
      <ul className="mt-7 grid grid-cols-3 gap-2">
        {MILESTONES.map((m, i) => {
          const done = unlocked[i];
          const Icon = m.Icon;
          return (
            <li key={m.id} className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setRevealed(revealed === m.id ? null : m.id)}
                className={`grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl transition-all ${
                  done
                    ? "bg-[color:var(--tint-leaf)] text-[color:var(--brand-leaf)]"
                    : "bg-[color:var(--tint-mist)] text-muted-foreground"
                } ${done ? "animate-[eb-bounce_0.6s_ease]" : ""}`}
                style={
                  done
                    ? { boxShadow: "0 8px 20px -12px color-mix(in oklab, var(--brand-leaf) 60%, transparent)" }
                    : undefined
                }
                aria-pressed={revealed === m.id}
              >
                <Icon className="h-5 w-5" />
              </button>
              <div className="mt-2 text-[11px] sm:text-xs font-medium leading-tight">{m.label}</div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground">{formatINR(m.amount)}</div>
              {revealed === m.id && (
                <div className="mt-1 text-[10px] sm:text-[11px] text-foreground/80 px-1 animate-[fade-in_.2s_ease]">
                  {m.reward}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Free gift card */}
      {celebrated && (
        <div
          className="mt-5 flex items-center gap-3 rounded-2xl border border-[color:var(--tint-leaf)] bg-[color:var(--tint-leaf)]/40 p-3 sm:p-4 animate-[fade-in_.3s_ease]"
        >
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-white text-2xl shadow-sm">💄</div>
          <div className="min-w-0">
            <div className="font-display text-base sm:text-lg leading-tight">FREE Lipstick</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground">Worth ₹650 · auto-added at checkout</div>
          </div>
          <div className="ml-auto text-[11px] font-semibold text-[color:var(--brand-leaf)]">UNLOCKED</div>
        </div>
      )}

      <style>{`@keyframes eb-bounce{0%{transform:scale(1)}30%{transform:scale(1.18)}60%{transform:scale(.96)}100%{transform:scale(1)}}`}</style>
    </div>
  );
}
