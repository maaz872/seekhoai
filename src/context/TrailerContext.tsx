"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface TrailerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const TrailerCtx = createContext<TrailerState | null>(null);

export function TrailerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  );
  return <TrailerCtx.Provider value={value}>{children}</TrailerCtx.Provider>;
}

export function useTrailer() {
  const ctx = useContext(TrailerCtx);
  if (!ctx) throw new Error("useTrailer must be used within TrailerProvider");
  return ctx;
}
