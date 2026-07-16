"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useHasMounted } from "./useHasMounted";
import { easePremium } from "@/lib/motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  /** Re-run every time the element scrolls into view instead of once. */
  repeat?: boolean;
  children?: ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.5,
  repeat = false,
  className,
  children,
  ...props
}: FadeInProps) {
  const hasMounted = useHasMounted();
  const shouldReduceMotion = useReducedMotion();

  // Deterministic hidden fallback for SSR + first client render (no mismatch).
  if (!hasMounted) {
    return (
      <div className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: !repeat, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: easePremium,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
