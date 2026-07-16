"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MediaVideo from "@/components/MediaVideo";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";
import { easePremium } from "@/lib/motion";
import {
  galleryMedia,
  galleryCategories,
  CATEGORY_LABELS,
  type MediaCategory,
} from "@/lib/media";

type Filter = MediaCategory | "all";

export default function GalleryGrid() {
  const [active, setActive] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const items = useMemo(
    () =>
      active === "all"
        ? galleryMedia
        : galleryMedia.filter((item) => item.categories.includes(active)),
    [active],
  );

  // Lightbox navigates only across the images currently shown.
  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      items
        .filter((item) => item.type === "image")
        .map((item) => ({ src: item.src, alt: item.alt })),
    [items],
  );

  function selectFilter(next: Filter) {
    setActive(next);
    setLightboxIndex(null); // close the viewer when the filtered set changes
  }

  function openImage(src: string) {
    const idx = lightboxImages.findIndex((image) => image.src === src);
    if (idx >= 0) setLightboxIndex(idx);
  }

  return (
    <div>
      <div className="relative">
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          role="group"
          aria-label="Filter projects"
        >
          <FilterButton active={active === "all"} onClick={() => selectFilter("all")}>
            All
          </FilterButton>
          {galleryCategories.map((category) => (
            <FilterButton
              key={category}
              active={active === category}
              onClick={() => selectFilter(category)}
            >
              {CATEGORY_LABELS[category]}
            </FilterButton>
          ))}
        </div>
        {/* Hints that the filter row scrolls horizontally on mobile; hidden
            once it wraps to a normal row at sm+. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent sm:hidden"
        />
      </div>

      {/* mode="popLayout" lets exiting tiles drop out of grid flow immediately
          so the remaining tiles can slide (via `layout`) into their new
          positions instead of jumping. initial={false} means the tiles
          already on screen at first paint never play an entrance animation —
          only a filter change (add/remove/reorder) is animated, so switching
          categories never delays the first render of the gallery. */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, index) => {
            const label = CATEGORY_LABELS[item.categories[0]];
            // The first row is above the fold on every breakpoint — prioritize
            // it instead of lazy-loading, so it doesn't compete for LCP.
            const isAboveFold = index < 3;
            const overlay = (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wide text-white">
                  {label}
                </span>
                {item.type === "image" && (
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                  </svg>
                )}
              </span>
            );

            const tileMotionProps = {
              layout: true as const,
              initial: shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              exit: shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 },
              transition: {
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: easePremium,
              },
            };

            if (item.type === "image") {
              return (
                <motion.button
                  key={item.src}
                  {...tileMotionProps}
                  type="button"
                  onClick={() => openImage(item.src)}
                  aria-label={`View: ${item.alt}`}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/[0.04] shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    priority={isAboveFold}
                    className="object-cover transition-transform duration-300 ease-premium group-hover:scale-105"
                  />
                  {overlay}
                </motion.button>
              );
            }

            return (
              <motion.div
                key={item.src}
                {...tileMotionProps}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/[0.04] shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
              >
                <MediaVideo
                  src={item.src}
                  poster={item.poster}
                  label={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 ease-premium group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                >
                  <svg className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                {overlay}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <p className="mt-10 text-center text-foreground/60">
          No projects in this category yet — check back soon.
        </p>
      )}

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-premium ${
        active
          ? "bg-forest text-white"
          : "border border-black/15 text-foreground/80 hover:border-forest hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}
