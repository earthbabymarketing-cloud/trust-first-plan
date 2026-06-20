import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Earthbaby" },
      { name: "description", content: "Talk to the Earthbaby care team. Ingredient questions, orders, partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
      <div>
        <span className="eyebrow">Talk to us</span>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl leading-[1.05]">A real human will reply within 24 hours.</h1>
        <p className="mt-5 text-muted-foreground max-w-md">
          Ingredient questions, order help, or feedback — we read every message. Our care team is parents themselves.
        </p>
        <dl className="mt-10 space-y-6 text-sm">
          <div><dt className="eyebrow">Email</dt><dd className="mt-1 font-display text-xl">care@earthbaby.in</dd></div>
          <div><dt className="eyebrow">WhatsApp</dt><dd className="mt-1 font-display text-xl">+91 90000 00000</dd></div>
          <div><dt className="eyebrow">Hours</dt><dd className="mt-1 text-foreground/80">Mon–Sat, 10am – 7pm IST</dd></div>
          <div><dt className="eyebrow">Studio</dt><dd className="mt-1 text-foreground/80">Jubilee Hills, Hyderabad, India</dd></div>
        </dl>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="card-soft p-7 sm:p-10 bg-[color:var(--secondary)]"
      >
        {sent ? (
          <div className="py-12 text-center">
            <div className="font-display text-3xl">Thank you.</div>
            <p className="mt-3 text-muted-foreground">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-3xl">Send us a note</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-4">
              <Field label="Order number (optional)" name="order" />
            </div>
            <div className="mt-4">
              <label className="eyebrow block">Message</label>
              <textarea required rows={5} className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--sage-deep)]" />
            </div>
            <button className="btn-primary mt-6 w-full sm:w-auto">Send message</button>
            <p className="mt-4 text-[12px] text-muted-foreground">We'll never share your email. Used only to reply.</p>
          </>
        )}
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--sage-deep)]"
      />
    </label>
  );
}
