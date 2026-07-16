import type { ReactNode } from "react";
import { SlideIn } from "@/components/motion/SlideIn";

type Tone = "default" | "muted" | "forest";

const toneClass: Record<Tone, string> = {
  default: "",
  muted: "bg-black/[0.03]",
  forest: "bg-forest text-white",
};

/**
 * Consistent section shell — same max width, padding, and rhythm the site
 * already uses. Keeps new sections visually identical to the existing ones
 * without repeating the wrapper markup.
 */
export function Section({
  id,
  tone = "default",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={toneClass[tone]}>
      <div
        className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24 ${className ?? ""}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}

/** Eyebrow + heading + optional subtitle, animated with the existing SlideIn. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onDark?: boolean;
}) {
  return (
    <SlideIn>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-wide ${
            onDark ? "text-orange-light" : "text-orange"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-extrabold sm:text-4xl ${
          onDark ? "text-white" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl ${onDark ? "text-white/80" : "text-foreground/70"}`}
        >
          {subtitle}
        </p>
      )}
    </SlideIn>
  );
}
