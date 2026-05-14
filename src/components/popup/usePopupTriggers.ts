"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const SESSION_KEY = "seekhoai_popup_seen";

/**
 * Returns `shouldShow = true` when one of the triggers fires.
 * Triggers:
 *   - time on page ≥ 35s
 *   - scroll depth ≥ 60% of total page height
 *   - exit intent (desktop only): mouseY crosses above 10px
 *
 * Show-once: gated by sessionStorage. Cleared on tab close.
 * Debug helper: window.__resetPopup() clears the session flag.
 */
export function usePopupTriggers() {
  const [shouldShow, setShouldShow] = useState(false);
  const firedRef = useRef(false);
  const { scrollYProgress } = useScroll();

  const fire = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShouldShow(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as unknown as { __resetPopup?: () => void }).__resetPopup = () => {
      try {
        sessionStorage.removeItem(SESSION_KEY);
        console.log("[popup] sessionStorage flag cleared. Refresh to retrigger.");
      } catch {
        /* ignore */
      }
    };

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        firedRef.current = true;
        return;
      }
    } catch {
      /* ignore */
    }

    const timeId = window.setTimeout(fire, 35_000);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let onMouseOut: ((e: MouseEvent) => void) | null = null;
    if (!isTouch) {
      onMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 10) fire();
      };
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      window.clearTimeout(timeId);
      if (onMouseOut) document.removeEventListener("mouseout", onMouseOut);
    };
  }, [fire]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.6) fire();
  });

  return shouldShow;
}
