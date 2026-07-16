"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true after mount.
 * Used to keep motion components' server output deterministic so Framer Motion's
 * hidden initial styles don't cause React hydration mismatches. Implemented with
 * useSyncExternalStore so it stays hydration-safe without a setState-in-effect.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
