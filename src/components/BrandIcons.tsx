/**
 * Brand iconography — geometric, rounded, flat-color icons.
 * Includes playful baby animals (brand guide pg. 24) plus clear semantic trust icons
 * for product claims. Each icon is a self-contained SVG; pass `size` to scale.
 * Colors lock to the brand palette so they always feel on-brand.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const SKY = "#00A2C6";
const SKY_LIGHT = "#8BE7FA";
const LEAF = "#89C650";
const LEAF_LIGHT = "#DBFFB9";
const BLOSSOM = "#F16786";
const BLOSSOM_LIGHT = "#FFD9E1";
const SUN = "#FFCC00";
const INK = "#1F2A33";
const CREAM = "#FFFDF8";

function base(p: IconProps) {
  const { size = 72, ...rest } = p;
  return { width: size, height: size, viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...rest };
}


export function BunnyIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      {/* ears */}
      <rect x="22" y="6" width="16" height="42" rx="8" fill={SKY} />
      <rect x="62" y="6" width="16" height="42" rx="8" fill={SKY} />
      {/* head */}
      <rect x="14" y="38" width="72" height="56" rx="28" fill={SKY} />
      {/* cheek smile */}
      <path d="M36 70 q6 6 14 0 q-2 4 -7 4 q-5 0 -7 -4 z" fill={INK} opacity=".75" />
      <circle cx="40" cy="60" r="2.5" fill={INK} />
      <circle cx="60" cy="60" r="2.5" fill={INK} />
    </svg>
  );
}

export function ElephantIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="48" r="38" fill={BLOSSOM} />
      {/* ears */}
      <circle cx="20" cy="46" r="14" fill={BLOSSOM_LIGHT} />
      <circle cx="80" cy="46" r="14" fill={BLOSSOM_LIGHT} />
      {/* trunk */}
      <path d="M50 60 q-8 8 -8 18 q0 8 8 8 q8 0 8 -8" fill="none" stroke={BLOSSOM} strokeWidth="10" strokeLinecap="round" />
      <circle cx="42" cy="46" r="3" fill={INK} />
      <circle cx="58" cy="46" r="3" fill={INK} />
    </svg>
  );
}

export function BirdIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="52" r="34" fill={SKY_LIGHT} />
      {/* wing */}
      <path d="M30 50 q14 14 36 6" fill="none" stroke={SKY} strokeWidth="7" strokeLinecap="round" />
      {/* beak */}
      <path d="M80 50 l10 -4 l0 12 z" fill={SUN} />
      <circle cx="68" cy="44" r="3" fill={INK} />
      {/* feet */}
      <path d="M44 86 l0 8 M56 86 l0 8" stroke={SUN} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function BearIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      {/* ears */}
      <circle cx="22" cy="26" r="12" fill={INK} />
      <circle cx="78" cy="26" r="12" fill={INK} />
      <circle cx="22" cy="26" r="5" fill={BLOSSOM_LIGHT} />
      <circle cx="78" cy="26" r="5" fill={BLOSSOM_LIGHT} />
      {/* head */}
      <circle cx="50" cy="54" r="34" fill={INK} />
      {/* snout */}
      <ellipse cx="50" cy="66" rx="18" ry="13" fill={BLOSSOM_LIGHT} />
      <circle cx="50" cy="60" r="4" fill={INK} />
      <circle cx="38" cy="48" r="3" fill={SKY_LIGHT} />
      <circle cx="62" cy="48" r="3" fill={SKY_LIGHT} />
    </svg>
  );
}

export function DuckIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      {/* body */}
      <path d="M22 64 q0 -22 26 -22 q22 0 24 18 l8 0 q0 16 -22 16 l-30 0 q-6 0 -6 -6 z" fill={SUN} />
      {/* head */}
      <circle cx="68" cy="40" r="16" fill={SUN} />
      {/* beak */}
      <path d="M82 40 l10 -2 l0 8 z" fill={BLOSSOM} />
      <circle cx="68" cy="36" r="2.5" fill={INK} />
    </svg>
  );
}

export function GiraffeIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      {/* body */}
      <rect x="40" y="50" width="40" height="36" rx="10" fill={LEAF} />
      {/* neck */}
      <rect x="58" y="18" width="14" height="40" rx="6" fill={LEAF} />
      {/* head */}
      <rect x="50" y="10" width="28" height="18" rx="8" fill={LEAF} />
      {/* legs */}
      <rect x="44" y="80" width="6" height="14" rx="3" fill={LEAF} />
      <rect x="70" y="80" width="6" height="14" rx="3" fill={LEAF} />
      <circle cx="56" cy="20" r="2.5" fill={INK} />
      {/* horn */}
      <rect x="64" y="6" width="3" height="6" rx="1.5" fill={INK} />
    </svg>
  );
}

/** Semantic trust icons — clear, readable meaning for product claims. */

export function ListSearchIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      {/* clipboard */}
      <rect x="18" y="16" width="64" height="70" rx="12" fill={CREAM} stroke={SKY} strokeWidth="3" />
      <rect x="38" y="8" width="24" height="14" rx="6" fill={SKY} />
      {/* lines */}
      <rect x="28" y="34" width="44" height="4" rx="2" fill={SKY_LIGHT} />
      <rect x="28" y="46" width="34" height="4" rx="2" fill={SKY_LIGHT} />
      <rect x="28" y="58" width="40" height="4" rx="2" fill={SKY_LIGHT} />
      {/* magnifying glass */}
      <circle cx="68" cy="70" r="11" fill={SKY} />
      <circle cx="68" cy="70" r="5" fill={CREAM} />
      <rect x="75" y="77" width="9" height="4" rx="2" fill={SKY} transform="rotate(45 75 77)" />
    </svg>
  );
}

export function LeafPercentIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="50" r="40" fill={LEAF_LIGHT} />
      {/* leaf */}
      <path d="M50 24 q20 18 20 36 q0 14 -20 16 q-20 -2 -20 -16 q0 -18 20 -36 z" fill={LEAF} />
      <path d="M50 32 q0 30 0 44" stroke={LEAF_LIGHT} strokeWidth="4" strokeLinecap="round" />
      {/* percent symbol */}
      <circle cx="38" cy="40" r="4" fill={CREAM} />
      <circle cx="62" cy="60" r="4" fill={CREAM} />
      <path d="M62 36 l-24 28" stroke={CREAM} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function TestTubeCheckIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="50" r="40" fill={BLOSSOM_LIGHT} />
      {/* test tube */}
      <rect x="40" y="18" width="20" height="56" rx="9" fill={BLOSSOM} />
      <rect x="36" y="16" width="28" height="10" rx="4" fill={BLOSSOM} />
      {/* liquid */}
      <path d="M44 62 h12 v8 a6 6 0 0 1 -12 0 z" fill={BLOSSOM_LIGHT} />
      {/* check */}
      <path d="M32 54 l8 8 l18 -18" fill="none" stroke={CREAM} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldHeartIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="50" r="40" fill={SKY_LIGHT} />
      {/* shield */}
      <path d="M50 18 l24 10 v20 q0 18 -24 28 q-24 -10 -24 -28 v-20 z" fill={SKY} />
      {/* heart */}
      <path d="M50 62 q-14 -10 -14 -20 a7 7 0 0 1 14 -4 a7 7 0 0 1 14 4 q0 10 -14 20 z" fill={CREAM} />
    </svg>
  );
}

export function HandLeafIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="50" r="40" fill={SUN} opacity="0.25" />
      {/* hand */}
      <path d="M34 72 q-8 -8 -8 -18 v-12 q0 -6 6 -6 q6 0 6 6 v6 h6 v-16 q0 -6 6 -6 q6 0 6 6 v16 h6 v-10 q0 -6 6 -6 q6 0 6 6 v10 q0 14 -12 22 z" fill={SUN} />
      {/* leaf */}
      <path d="M60 26 q14 12 14 26 q0 10 -14 12 q-14 -2 -14 -12 q0 -14 14 -26 z" fill={LEAF} />
      <path d="M60 32 q0 18 0 32" stroke={LEAF_LIGHT} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BadgeCheckIcon(p: IconProps) {
  return (
    <svg {...base(p)} aria-hidden>
      <circle cx="50" cy="50" r="40" fill={BLOSSOM_LIGHT} />
      {/* badge star */}
      <path d="M50 18 l6 14 h14 l-11 9 l4 14 l-13 -8 l-13 8 l4 -14 l-11 -9 h14 z" fill={BLOSSOM} />
      {/* check */}
      <path d="M42 52 l6 6 l14 -14" fill="none" stroke={CREAM} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Soft dotted cloud — from the brand guide's secondary visual language */

export function DottedCloud(p: IconProps) {
  const { size = 120, ...rest } = p;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden {...rest}>
      <path
        d="M40 80 q0 -30 30 -30 q6 -22 32 -22 q26 0 32 22 q30 0 30 30 q0 16 -22 16 l-80 0 q-22 0 -22 -16 z"
        fill={SKY_LIGHT}
        stroke={SKY}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export const BRAND_ANIMAL_ICONS = [BunnyIcon, ElephantIcon, BirdIcon, BearIcon, DuckIcon, GiraffeIcon] as const;
