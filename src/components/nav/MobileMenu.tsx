"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { nav, brand } from "@/content/content";
import { Button } from "@/components/ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: Props) {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-base md:hidden"
        >
          <div className="container-content flex h-16 items-center justify-between">
            <span className="font-display text-xl font-medium">{brand.name}</span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border-subtle"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="container-content mt-8 flex flex-col gap-6"
          >
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-4xl text-text-primary transition-colors duration-200 hover:text-accent-warm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
          <div className="container-content mt-auto pb-10">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                onClose();
                window.location.hash = "pricing";
              }}
            >
              {nav.cta.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
