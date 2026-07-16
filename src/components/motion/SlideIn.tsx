"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useHasMounted } from "./useHasMounted";
import { easePremium } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

interface SlideInProps extends HTMLMotionProps<"div"> {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  repeat?: boolean;
  children?: ReactNode;
}

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
  }
}

function getHiddenTransform(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(${-distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(${-distance}px)`;
  }
}

export function SlideIn({
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.5,
  repeat = false,
  className,
  children,
  ...props
}: SlideInProps) {
  const hasMounted = useHasMounted();
  const shouldReduceMotion = useReducedMotion();

  // Deterministic hidden fallback for SSR + first client render (no mismatch).
  if (!hasMounted) {
    const style: CSSProperties = {
      opacity: 0,
      transform: getHiddenTransform(direction, distance),
    };
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const offset = getOffset(direction, distance);

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
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
