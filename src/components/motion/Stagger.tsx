"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useHasMounted } from "./useHasMounted";
import { easePremium } from "@/lib/motion";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
}

/**
 * Layout wrapper for a group of StaggerItems. Each child reveals itself on
 * scroll with a delay derived from its index, so the group appears in sequence.
 * (Per-item reveal is used instead of parent-variant orchestration because it
 * stays reliable alongside the SSR-safe mount gate.)
 */
export function StaggerContainer({ className, children }: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  index?: number;
  staggerDelay?: number;
  children?: ReactNode;
}

export function StaggerItem({
  index = 0,
  staggerDelay = 0.08,
  className,
  children,
  ...props
}: StaggerItemProps) {
  const hasMounted = useHasMounted();
  const shouldReduceMotion = useReducedMotion();

  // Deterministic hidden fallback for SSR + first client render (no mismatch).
  if (!hasMounted) {
    return (
      <div className={className} style={{ opacity: 0, transform: "translateY(16px)" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * staggerDelay,
        ease: easePremium,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
