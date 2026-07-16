"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHasMounted } from "./useHasMounted";
import { easePremium } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

// Animates in on mount. For a transition on every route change, drop this
// into `src/app/template.tsx` (App Router re-mounts templates per navigation,
// unlike layout.tsx) wrapping `children` — no other wiring is needed.
export function PageTransition({ children }: PageTransitionProps) {
  const hasMounted = useHasMounted();
  const shouldReduceMotion = useReducedMotion();
  // useReducedMotion() can't see the client's prefers-reduced-motion media
  // query during SSR, so it always resolves server-side as falsy. Gating on
  // hasMounted keeps this false (matching the server) through the first
  // client paint, then lets it pick up the real value one render later —
  // same pattern as MediaVideo's showControls, to avoid a hydration mismatch.
  const reduceMotion = hasMounted && shouldReduceMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: easePremium }}
    >
      {children}
    </motion.div>
  );
}
