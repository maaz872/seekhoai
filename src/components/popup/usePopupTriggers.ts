"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Debug helper
    (window as unknown as { __resetPopup?: () => void }).__resetPopup = () => {
      try {
        sessionStorage.removeItem(SESSION_KEY);
        console.log("[popup] sessionStorage flag cleared. Refresh to retrigger.");
      } catch {
        /* ignore */
      }
    };

    // If already shown this session, skip everything.
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setShouldShow(true);
      cleanup();
    };

    // 1. Time trigger
    const timeId = window.setTimeout(fire, 35_000);

    // 2. Scroll trigger
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      if (pct >= 0.6) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3. Exit intent (desktop only)
    let onMouseOut: ((e: MouseEvent) => void) | null = null;
    if (!isTouch) {
      onMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 10) fire();
      };
      document.addEventListener("mouseout", onMouseOut);
    }

    function cleanup() {
      window.clearTimeout(timeId);
      window.removeEventListener("scroll", onScroll);
      if (onMouseOut) document.removeEventListener("mouseout", onMouseOut);
    }

    return cleanup;
  }, []);

  return shouldShow;
}
