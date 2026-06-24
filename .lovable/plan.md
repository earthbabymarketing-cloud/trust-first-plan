
## What needs to change

The current build uses an editorial sage/clay/cream palette with Instrument Serif + Inter. That looks calm but reads "adult skincare," not joyful baby care, and it doesn't match the brand book or the logo you sent. I want to realign the entire system to the brand guide, plus the new #ffcc00 you've started using.

## Proposed brand system (for approval)

### Color palette — "calm + joyful"

Pulled directly from the brand guide, with #ffcc00 added per your note.

| Token | Hex | Role |
|---|---|---|
| `--brand-sky` | `#00A2C6` | Primary — logo cyan; used for headers, primary CTAs, links |
| `--brand-leaf` | `#89C650` | Primary — "nature inside" green; secondary CTAs, success, badges |
| `--brand-blossom` | `#F16786` | Accent — pink from logo; highlights, sale, hearts, hover states |
| `--brand-sun` | `#FFCC00` | Energy accent (your addition); price chips, "new", limited bursts only |
| `--brand-cream` | `#FFFDF8` | Background — warmer than pure white, calmer than sand |
| `--brand-ink` | `#1F2A33` | Body text (cool charcoal, friendlier than current near-black) |
| Tints | `#DBFFB9` `#8BE7FA` `#FFD9E1` `#E2E9EB` | Section backgrounds, illustration fills (from guide's secondary palette) |

Distribution rule (to keep it calm, not loud): ~70% cream + ink, ~20% sky/leaf, ~8% blossom, ~2% sun. Sun is used as a spark, never as a surface.

### Typography

Brand guide specifies **Livvic** (headlines) + **Abel** (body). Both are free on Google Fonts. Recommendation:

- **Headlines:** Livvic (600/700) — rounded, friendly, on-brand
- **Body:** Abel (400) for short labels/captions where the brand book uses it, but **Nunito (400/600) for long-form body** because Abel is condensed single-weight and hurts readability on PDPs/FAQs at small sizes. Nunito's soft rounded terminals match the logo's mood.

If you want strict adherence, I'll use Abel everywhere and skip Nunito — say the word.

I'd retire Instrument Serif (off-brand: too editorial/luxury for baby care).

### Logo & visual language

- Use your white "nature inside" lockup on cyan or photo backgrounds in the header/hero.
- Add a dark/positive lockup variant on cream backgrounds (I'll need a non-white version — can extract from PDF or you can send).
- Rounded everything: `--radius-lg: 18px`, buttons fully pill, cards 22px. Matches logo's rounded rectangle.
- Soft drop shadows tinted with sky (not neutral gray) for the "airy" feel.
- Imagery direction stays per brand book: Indian models, candid, soft natural light, lots of negative space.

### What stays

- All page structure, copy, section order, offer architecture, products data, cart logic, routes — untouched.
- Only the design tokens, fonts, logo placement, and accent treatments change.

## Files to touch

1. `src/styles.css` — replace palette tokens (oklch values for new hexes), swap font stack, add tint tokens, retune shadows/radii.
2. `src/routes/__root.tsx` — swap Google Fonts `<link>` from Instrument Serif + Inter → Livvic + Nunito (+ Abel for captions).
3. `src/assets/` — add the uploaded logo as a Lovable asset; reference in header/footer.
4. Header/footer components inside routes — swap text wordmark for logo image, retune colors.
5. Light pass on PDP/PLP/Home accent treatments so the new palette lands (chip colors, CTA colors, badge colors) — no layout changes.

No new routes, no data/logic changes.

## Decisions I need from you before building

1. **Body font:** Nunito for readability, or strict Abel everywhere?
2. **Sun yellow #FFCC00 usage:** spark-only (my recommendation) or larger surfaces too?
3. **Logo on cream backgrounds:** OK for me to derive a dark version from the PDF, or will you send one?

Reply with answers (or "go with your defaults") and I'll switch to build mode.
