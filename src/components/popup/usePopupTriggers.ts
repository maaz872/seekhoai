"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "seekhoai_popup_seen";

/**
 * Returns `shouldShow = true` when one of the triggers fires.
 * Triggers:
 *   - time on page ≥ 35s
 *   - scroll depth ≥ 60% of total page height (manual; Lenis was removed)
 *   - exit intent (desktop only): mouseY crosses above 10px
 *
 * Show-once: gated by sessionStorage. Cleared on tab close.
 * Debug: console.log marks which trigger fired.
 * Manual reset: window.__resetPopup() clears the flag and reloads.
 */
export function usePopupTriggers() {
  const [shouldShow, setShouldShow] = useState(false);
  const firedRef = useRef(false);

  const fire = useCallback((reason: string) => {
    if (firedRef.current) return;
    firedRef.current = true;
    console.log("[popup] triggered by:", reason);
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
      } catch {
        /* ignore */
      }
      window.location.reload();
    };

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        firedRef.current = true;
        return;
      }
    } catch {
      /* ignore */
    }

    // Time trigger — 35s
    const timeId = window.setTimeout(() => fire("time"), 35_000);

    // Scroll trigger — 60% of total page height
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max > 0.6) fire("scroll");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Exit intent — desktop only
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let onMouseOut: ((e: MouseEvent) => void) | null = null;
    if (!isTouch) {
      onMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 10) fire("exit-intent");
      };
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      window.clearTimeout(timeId);
      window.removeEventListener("scroll", onScroll);
      if (onMouseOut) document.removeEventListener("mouseout", onMouseOut);
    };
    // fire is stable (useCallback []); empty deps keeps registration one-shot per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return shouldShow;
}
