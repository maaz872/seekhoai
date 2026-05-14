"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import Lenis from "@studio-freight/lenis";

interface LenisContextValue {
  scrollProgress: MotionValue<number>;
  scrollY: MotionValue<number>;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const scrollProgress = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const value = useMemo(() => ({ scrollProgress, scrollY }), [scrollProgress, scrollY]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      lerp: prefersReduced ? 1 : 0.1,
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      const limit = lenis.limit || 0;
      const scroll = lenis.scroll || 0;
      scrollY.set(scroll);
      scrollProgress.set(limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0);
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [scrollProgress, scrollY]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useSmoothScroll(): MotionValue<number> {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within LenisProvider");
  return ctx.scrollProgress;
}

export function useSmoothScrollY(): MotionValue<number> {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useSmoothScrollY must be used within LenisProvider");
  return ctx.scrollY;
}
