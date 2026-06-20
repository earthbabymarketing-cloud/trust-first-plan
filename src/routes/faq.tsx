import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Earthbaby" },
      { name: "description", content: "Honest answers to every question about Earthbaby baby and mom skincare." },
    ],
  }),
  component: FAQ,
});

const qa: { q: string; a: string }[] = [
  { q: "Is it suitable for sensitive skin?", a: "Yes. Every Earthbaby product is formulated for sensitive skin first and patch-tested on sensitive skin panels. If your baby's skin doesn't respond well, we'll refund — no questions." },
  { q: "Can newborns use it?", a: "Our Baby Wash, Virgin Coconut Oil and Moisturising Butter are safe from day one. The Ubtan Sunni Pindi is best introduced after 3 months." },
  { q: "Why is Earthbaby priced higher?", a: "We use higher-grade, traceable raw materials, full natural origin % disclosure, and independent Made Safe certification. We don't cut corners on the ingredients you can't see — and we tell you exactly where every rupee goes." },
  { q: "Are your products fragrance free?", a: "Most are. Where we use a botanical scent, it comes from the natural ingredients themselves (e.g. cold-pressed coconut). We never use synthetic fragrance or hidden 'parfum'." },
  { q: "How are you different from other brands?", a: "We disclose every ingredient with its purpose and natural origin %. We don't use fear-based marketing. We don't hide behind buzzwords like 'chemical-free'. We treat parents as adults who can read a label — so we make labels worth reading." },
  { q: "Why buy from your website instead of Amazon?", a: "Direct from us: freshest batches, full traceability, free shipping above ₹600, 14-day returns, and access to bundle pricing. Plus, you get our care team — actual humans who can answer ingredient questions." },
  { q: "Do you ship across India?", a: "Yes — pan-India in 2–5 days from Bengaluru. COD available in most pincodes." },
  { q: "What's your return policy?", a: "14-day easy returns on unopened products. If a product caused a reaction, we accept opened returns and refund fully." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="container-x py-16 lg:py-24 max-w-3xl">
        <span className="eyebrow">FAQs</span>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Honest answers, plainly.</h1>
        <p className="mt-5 text-muted-foreground">Anything we don't cover here? <Link to="/contact" className="underline">Ask us directly.</Link></p>
      </section>

      <section className="container-x pb-24">
        <ul className="divide-y divide-border border-y border-border max-w-3xl">
          {qa.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full py-6 flex items-center justify-between gap-6 text-left">
                  <span className="font-display text-xl sm:text-2xl">{item.q}</span>
                  <span className={`h-9 w-9 rounded-full border border-border grid place-items-center transition ${isOpen ? "bg-[color:var(--ink)] text-[color:var(--background)] rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <p className="pb-6 pr-12 text-foreground/80 max-w-2xl">{item.a}</p>}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
