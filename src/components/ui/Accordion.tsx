"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  id: string;
  title: ReactNode;
  body: ReactNode;
  number?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: string | null;
}

export function Accordion({ items, className, defaultOpen = null }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-border-subtle border-y border-border-subtle", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="group flex w-full items-center gap-6 py-6 text-left transition-colors duration-200 hover:text-accent-warm-2"
            >
              {item.number && (
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary group-hover:text-accent-warm">
                  {item.number}
                </span>
              )}
              <span className="flex-1 font-display text-xl md:text-2xl">{item.title}</span>
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-subtle transition-all duration-200",
                  open
                    ? "rotate-45 border-accent-warm bg-accent-warm/10 text-accent-warm"
                    : "text-text-secondary group-hover:border-accent-warm-2",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 md:pl-[5.5rem]">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
