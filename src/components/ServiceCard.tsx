"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/services";
import { useHasMounted } from "@/components/motion/useHasMounted";
import ServiceIcon from "@/components/ServiceIcon";
import MediaVideo from "@/components/MediaVideo";
import { servicePreviewVideos } from "@/lib/media";
import { easePremium } from "@/lib/motion";

const MotionLink = motion.create(Link);

const cardClassName =
  "group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-[box-shadow,transform,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-forest/20 hover:shadow-lg";

export default function ServiceCard({
  service,
  index = 0,
  className,
}: {
  service: Service;
  index?: number;
  /** Extra grid-placement classes (e.g. to fill an odd-count last row). */
  className?: string;
}) {
  const hasMounted = useHasMounted();
  const shouldReduceMotion = useReducedMotion();
  const previewVideo = servicePreviewVideos[service.slug];
  const mergedClassName = className ? `${cardClassName} ${className}` : cardClassName;

  const inner = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/[0.04]">
        {previewVideo ? (
          <MediaVideo
            src={previewVideo.src}
            poster={previewVideo.poster}
            label={previewVideo.alt}
            focalPosition={previewVideo.focalPosition}
            className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
        ) : (
          <Image
            src={service.heroImage}
            alt={service.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-forest shadow-sm">
          <ServiceIcon slug={service.slug} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-forest">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm text-foreground/70">{service.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange group-hover:text-orange-strong">
          Learn more
          <svg
            className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </>
  );

  // Deterministic hidden fallback for SSR + first client render (no mismatch).
  if (!hasMounted) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className={mergedClassName}
        style={{ opacity: 0, transform: "translateY(16px)" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <MotionLink
      href={`/services/${service.slug}`}
      className={mergedClassName}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: easePremium,
      }}
    >
      {inner}
    </MotionLink>
  );
}
