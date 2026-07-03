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
