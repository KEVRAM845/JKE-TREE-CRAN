"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/components/motion/useHasMounted";

interface MediaVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
  /** CSS object-position, for clips whose subject sits off-center. */
  focalPosition?: string;
}

/**
 * Shared video player enforcing the site's media rules everywhere:
 * muted, looped, inline, poster-backed, lazy (preload="none"), and it
 * autoplays only while scrolled into view. Under prefers-reduced-motion it
 * does not autoplay — it shows the poster and exposes controls instead.
 */
export default function MediaVideo({
  src,
  poster,
  label,
  className,
  focalPosition,
}: MediaVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();
  // Only diverge from the server render (controls off) after mount, so the
  // reduced-motion branch can't cause a hydration mismatch.
  const showControls = hasMounted && shouldReduceMotion;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void el.play().catch(() => {
              /* autoplay can be blocked; poster stays visible */
            });
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <video
      ref={ref}
      className={className}
      style={focalPosition ? { objectPosition: focalPosition } : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={showControls || undefined}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
