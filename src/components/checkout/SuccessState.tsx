"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 14, stiffness: 200 }}
        className="grid size-20 place-items-center rounded-full bg-accent-warm/15 ring-2 ring-accent-warm/40"
      >
        <Check className="size-10 text-accent-warm" strokeWidth={3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <h3 className="font-display text-3xl font-medium">You're in.</h3>
        <p className="mt-2 max-w-sm text-text-secondary">
          Check your email for next steps. Your access link will arrive within a minute.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-text-tertiary"
      >
        [ Demo mode — no real payment processed ]
      </motion.p>
    </div>
  );
}
