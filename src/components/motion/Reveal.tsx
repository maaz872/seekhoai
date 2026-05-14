"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion-presets";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  amount?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const MotionComp = motion[as as "div"] as typeof motion.div;
  const variants: Variants = stagger ? staggerContainer : fadeUp;
  return (
    <MotionComp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </MotionComp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const MotionComp = motion[as as "div"] as typeof motion.div;
  return (
    <MotionComp variants={fadeUp} className={cn(className)}>
      {children}
    </MotionComp>
  );
}
