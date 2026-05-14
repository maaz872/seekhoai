"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/content/content";
import { useCoupon, priceWithCoupon } from "@/context/CouponContext";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export function Pricing() {
  const [open, setOpen] = useState(false);
  const { applied, code, discountPct } = useCoupon();
  const { final, formatted } = priceWithCoupon(pricing.price, discountPct);
  const ctaLabel = applied ? `Enroll Now — ${formatted}` : pricing.cta.label;

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-40"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-warm opacity-40"
      />

      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">[ {pricing.eyebrow} ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            {pricing.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mx-auto mt-14 max-w-2xl">
          <RevealItem className="relative overflow-hidden rounded-3xl border border-border-strong bg-elevated p-8 backdrop-blur-md md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent-warm/20 blur-3xl"
            />

            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-text-tertiary line-through">
                  ${pricing.priceAnchor}
                </span>
                {applied && (
                  <span className="font-display text-2xl text-text-tertiary line-through">
                    ${pricing.price}
                  </span>
                )}
              </div>

              <p className="mt-2 font-display text-display-xl font-medium text-accent-warm">
                {applied ? formatted : `$${pricing.price}`}
              </p>

              <p className="mt-3 text-sm text-text-secondary">{pricing.priceNote}</p>

              {applied && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-warm">
                  🏷 {code} applied — {Math.round(discountPct * 100)}% off
                </span>
              )}

              <Button
                variant="warm"
                size="lg"
                className="mt-8"
                onClick={() => setOpen(true)}
              >
                {ctaLabel}
              </Button>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-3 border-t border-border-subtle pt-8 md:grid-cols-2 md:gap-x-8">
              {pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent-warm"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} finalPrice={final} />
    </section>
  );
}
