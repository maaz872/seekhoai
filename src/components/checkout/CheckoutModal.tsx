"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { SuccessState } from "./SuccessState";
import { springModal } from "@/lib/motion-presets";

interface Props {
  open: boolean;
  onClose: () => void;
  finalPrice: number;
}

export function CheckoutModal({ open, onClose, finalPrice }: Props) {
  const [success, setSuccess] = useState(false);

  // Reset success state on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSuccess(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleSuccess = () => {
    setSuccess(true);
    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.45 },
      colors: ["#ff6b35", "#ffb084", "#4a9eff", "#f5f2eb"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.55 },
        colors: ["#ff6b35", "#ffb084"],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.55 },
        colors: ["#4a9eff", "#8fc4ff"],
      });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center bg-base/80 px-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={springModal}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border-strong bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 id="checkout-title" className="font-display text-2xl font-medium">
                {success ? "Welcome." : "Complete enrollment"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="grid size-9 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:text-text-primary"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6">
              {success ? (
                <SuccessState />
              ) : (
                <CheckoutForm onSuccess={handleSuccess} finalPrice={finalPrice} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
