"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const KEY_CLAIMED = "seekhoai_coupon_claimed";
const KEY_MAX = "seekhoai_popup_dismissed_max";

const FIRST_DELAY_MS = 40_000;
const RETRY_DELAY_MS = 180_000;
const MAX_DISMISSES = 3;

interface PopupTriggers {
  shouldShow: boolean;
  onDismiss: () => void;
  onClaim: () => void;
}

/**
 * Time-only popup triggers.
 *
 * Flow:
 *   - First show: 40s after mount (unless previously claimed / max-dismissed).
 *   - On dismiss: retry in 180s.
 *   - After 3 dismissals: stop permanently for this session.
 *   - On claim: stop permanently for this session.
 *
 * Debug helpers:
 *   - window.__resetPopup()    — clears session flags and reloads.
 *   - window.__triggerPopup()  — force-fires the popup, bypassing timers.
 */
export function usePopupTriggers(): PopupTriggers {
  const [shouldShow, setShouldShow] = useState(false);
  const dismissCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    clearTimer();
  }, [clearTimer]);

  const scheduleShow = useCallback(
    (delay: number, reason: string) => {
      if (stoppedRef.current) return;
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        console.log("[popup] triggered by:", reason);
        timerRef.current = null;
        setShouldShow(true);
      }, delay);
    },
    [clearTimer],
  );

  const onDismiss = useCallback(() => {
    setShouldShow(false);
    dismissCountRef.current += 1;
    console.log("[popup] dismissed; count:", dismissCountRef.current);
    if (dismissCountRef.current >= MAX_DISMISSES) {
      try {
        sessionStorage.setItem(KEY_MAX, "1");
      } catch {
        /* ignore */
      }
      console.log("[popup] max dismissals reached; stopping");
      stop();
      return;
    }
    scheduleShow(RETRY_DELAY_MS, "retry-after-dismiss");
  }, [scheduleShow, stop]);

  const onClaim = useCallback(() => {
    setShouldShow(false);
    try {
      sessionStorage.setItem(KEY_CLAIMED, "1");
    } catch {
      /* ignore */
    }
    console.log("[popup] claimed; stopping");
    stop();
  }, [stop]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as unknown as { __resetPopup?: () => void }).__resetPopup = () => {
      try {
        sessionStorage.removeItem(KEY_CLAIMED);
        sessionStorage.removeItem(KEY_MAX);
      } catch {
        /* ignore */
      }
      window.location.reload();
    };

    (window as unknown as { __triggerPopup?: () => void }).__triggerPopup =
      () => {
        console.log("[popup] forced trigger");
        setShouldShow(true);
      };

    try {
      if (sessionStorage.getItem(KEY_CLAIMED) === "1") {
        stoppedRef.current = true;
        return;
      }
      if (sessionStorage.getItem(KEY_MAX) === "1") {
        stoppedRef.current = true;
        return;
      }
    } catch {
      /* ignore */
    }

    scheduleShow(FIRST_DELAY_MS, "first-show-40s");

    return () => {
      clearTimer();
    };
    // hook helpers are referentially stable via useCallback([]) chains
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { shouldShow, onDismiss, onClaim };
}
