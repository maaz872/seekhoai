"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { popup } from "@/content/content";
import { useCoupon } from "@/context/CouponContext";
import { usePopupTriggers } from "./usePopupTriggers";
import { Button } from "@/components/ui/Button";
import { springModal } from "@/lib/motion-presets";

const CouponScene = dynamic(
  () => import("./CouponScene").then((m) => m.CouponScene),
  { ssr: false, loading: () => null },
);

export function DiscountPopup() {
  const shouldShow = usePopupTriggers();
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { apply } = useCoupon();
  const titleId = "discount-popup-title";
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (shouldShow) setOpen(true);
  }, [shouldShow]);

  // Body lock + Escape + focus management
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the CTA on open
    const t = setTimeout(() => ctaRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Simple focus trap
      if (e.key === "Tab") {
        const focusables = document
          .querySelectorAll<HTMLElement>(
            '#discount-popup [href], #discount-popup button, #discount-popup [tabindex]:not([tabindex="-1"])',
          );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  const handleClaim = (e: React.MouseEvent<HTMLButtonElement>) => {
    apply(popup.code, 0.2);
    // Small confetti from the button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#ff6b35", "#ffb084", "#f5f2eb"],
    });
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById("pricing");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="discount-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-base/85 px-4 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            transition={reducedMotion ? { duration: 0.18 } : springModal}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-border-subtle bg-base/60 text-text-secondary backdrop-blur-sm transition-colors hover:text-text-primary"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="px-6 pt-8 md:px-10 md:pt-10">
              <p className="eyebrow">[ {popup.eyebrow} ]</p>
              <h2 id={titleId} className="mt-3 font-display text-display-md font-medium">
                {popup.title}
              </h2>
            </div>

            <div className="mt-6 px-4 md:mt-8 md:px-10">
              <CouponScene reducedMotion={reducedMotion} />
            </div>

            <div className="px-6 py-6 md:px-10 md:py-8">
              <p className="text-base text-text-secondary md:text-lg">
                {popup.bodyBefore}{" "}
                <span className="font-mono font-medium text-accent-warm">{popup.code}</span>{" "}
                {popup.bodyAfter}{" "}
                <span className="font-medium text-text-primary">{popup.discountedDisplay}</span>.{" "}
                {popup.bodyEnd}
              </p>

              <Button
                ref={ctaRef}
                variant="warm"
                size="lg"
                className="mt-6 w-full"
                onClick={handleClaim}
              >
                {popup.primaryCta}
              </Button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mx-auto mt-4 block text-sm text-text-tertiary transition-colors hover:text-text-secondary"
              >
                {popup.dismissCta}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
