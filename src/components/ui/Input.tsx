"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hideLabel = false, id, className, ...rest },
  ref,
) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-text-secondary",
            hideLabel && "sr-only",
          )}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-11 w-full rounded-full border border-border-subtle bg-subtle px-5 text-text-primary placeholder:text-text-tertiary",
          "transition-colors duration-200 focus:border-accent-warm focus:outline-none",
          error && "border-red-500/60 focus:border-red-500",
          className,
        )}
        aria-invalid={error ? "true" : "false"}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
});
