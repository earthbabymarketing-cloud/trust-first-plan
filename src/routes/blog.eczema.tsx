import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/eczema")({
  head: () => ({
    meta: [
      { title: "I Stopped Fighting My Eczema. I Started Listening. — Earthbaby" },
      {
        name: "description",
        content:
          "Jiten Grover on the gut–skin axis, what eczema taught him, and why sometimes the skin isn't the problem — it's the messenger.",
      },
      { property: "og:title", content: "I Stopped Fighting My Eczema. I Started Listening." },
      {
        property: "og:description",
        content: "A personal essay on eczema, the gut–skin axis, and learning to listen to the body.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogEczema,
});

function BlogEczema() {
  return (
    <article className="container-x max-w-[720px] py-16 lg:py-24">
      <Link to="/" className="eyebrow hover:text-[color:var(--brand-sky)]">
        ← Conscious parenting
      </Link>

      <h1 className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05]">
        I Stopped Fighting My Eczema. I Started Listening.
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">by Jiten Grover</p>

      <hr className="my-10 border-[color:var(--border)]" />

      <div className="prose-content space-y-5 text-[17px] leading-[1.8] text-[color:var(--foreground)]">
        <p>
          For years, I treated eczema like <strong>the problem</strong>.
        </p>
        <p>
          Now I think it was trying to <em>solve</em> one — my body's way of saying:
        </p>

        <blockquote className="border-l-4 border-[color:var(--brand-leaf)] pl-5 italic text-[color:var(--brand-ink)] my-6">
          "Something isn't right. Please pay attention."
        </blockquote>

        <h2 className="font-display text-2xl sm:text-3xl pt-6">Where it began</h2>
        <p>My eczema began in my late twenties. Like most people, I tried everything:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Topical steroids</li>
          <li>Oral medication</li>
          <li>Ayurveda</li>
          <li>Homeopathy</li>
        </ul>
        <p>They all helped — for a while. Then the itching came back.</p>

        <p>Eventually I stopped asking,</p>
        <p className="text-lg font-display text-[color:var(--brand-ink)]">"Which cream should I use?"</p>
        <p>and started asking,</p>
        <p className="text-lg font-display text-[color:var(--brand-ink)]">
          "Why is my skin reacting in the first place?"
        </p>
        <p>That question changed everything.</p>

        <h2 className="font-display text-2xl sm:text-3xl pt-6">Clues from the gut</h2>
        <p>For me, the biggest clues came from my gut. Over time I noticed clear patterns.</p>
        <p className="font-display text-xl">Sugar. Alcohol. Certain foods.</p>
        <p>
          Whenever my digestion was off, my skin usually followed. Looking back, the connection seems obvious. I just
          wasn't looking for it.
        </p>
        <p>
          There's growing scientific interest in what's called the <strong>gut–skin axis</strong> — the idea that our
          digestive health, immune system and skin are closely connected. Research suggests the gut microbiome may
          influence inflammatory skin conditions such as eczema, although the relationship is still being actively
          studied and isn't the same for everyone.
        </p>
        <p>
          That doesn't mean food is the cause of every person's eczema. But it does mean it's worth paying attention to
          what's happening inside, not just what you're putting on your skin.
        </p>

        <h2 className="font-display text-2xl sm:text-3xl pt-6">The jaundice lesson</h2>
        <p>I often think of jaundice.</p>
        <p>When someone has jaundice, their skin may itch and their eyes turn yellow.</p>
        <p>You wouldn't try to cure jaundice with moisturiser. You'd look after the liver.</p>
        <p>Eczema taught me a similar lesson.</p>

        <blockquote className="border-l-4 border-[color:var(--brand-blossom)] pl-5 italic text-[color:var(--brand-ink)] my-6">
          Sometimes the skin isn't the problem. It's simply the messenger.
        </blockquote>

        <h2 className="font-display text-2xl sm:text-3xl pt-6">What we do at Earthbaby</h2>
        <p>
          At Earthbaby, we don't claim to treat eczema. What we can do is make sure the products touching sensitive skin
          are as gentle as possible. That's why we use:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Plant-derived surfactants instead of sulphates</li>
          <li>No synthetic fragrances</li>
          <li>Carefully selected plant-based ingredients</li>
          <li>Skin-friendly formulations designed to minimise irritation</li>
        </ul>
        <p>We focus on supporting the skin barrier — not masking what's happening underneath.</p>

        <h2 className="font-display text-2xl sm:text-3xl pt-6">My biggest lesson</h2>
        <p>Don't just ask,</p>
        <p className="text-lg font-display text-[color:var(--brand-ink)]">"Which cream should I use?"</p>
        <p>Also ask,</p>
        <p className="text-lg font-display text-[color:var(--brand-ink)]">"What is my body trying to tell me?"</p>
        <p>That question changed my life. Maybe it'll change yours too.</p>
      </div>

      <hr className="my-12 border-[color:var(--border)]" />

      <section className="text-sm text-muted-foreground space-y-3">
        <h3 className="font-display text-lg text-[color:var(--brand-ink)]">References</h3>
        <p>
          The gut–skin axis has become an active area of research in dermatology. Reviews suggest alterations in the gut
          microbiome may influence immune regulation and inflammatory skin diseases, including atopic dermatitis, though
          more research is needed before broad treatment recommendations can be made.
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            Salem I, et al. <em>The Gut Microbiome as a Major Regulator of the Gut–Skin Axis.</em> Frontiers in
            Microbiology (2018).
          </li>
          <li>
            Lee SY, et al. <em>The Role of the Gut Microbiome in Atopic Dermatitis.</em> International Journal of
            Molecular Sciences (2024).
          </li>
        </ol>
      </section>
    </article>
  );
}
