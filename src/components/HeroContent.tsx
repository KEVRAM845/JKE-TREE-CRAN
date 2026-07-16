"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SlideIn } from "@/components/motion/SlideIn";
import { siteConfig } from "@/lib/site-config";

const MotionLink = motion.create(Link);

// Gentle hover/tap feedback. These are kept identical on the server and client
// (no reduced-motion branch here) so hydration stays stable; the root layout's
// <MotionConfig reducedMotion="user"> neutralizes the scale for users who
// prefer reduced motion.
const hover = { scale: 1.03 };
const tap = { scale: 0.97 };

export default function HeroContent() {
  return (
    <SlideIn
      direction="up"
      distance={20}
      // w-full is load-bearing: this is the hero <section>'s only in-flow
      // flex child, so without it the box sizes to its unwrapped text's
      // max-content width instead of the viewport, and long lines get
      // clipped by the section's overflow-hidden instead of wrapping.
      className="relative mx-auto flex w-full max-w-6xl flex-col px-4 py-24 sm:px-6"
    >
      {/* The hero overlay is intentionally light so the crane and jobsite stay
          visible — a drop-shadow keeps the headline readable over brighter
          patches of sky or siding without darkening the photo further. */}
      <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
        {siteConfig.tagline}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
        From routine trimming to removals other crews turn down, we bring the
        crane, bucket truck, and rigging experience to get it done safely —
        for homeowners and property owners across {siteConfig.serviceArea}.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <motion.a
          href={siteConfig.phoneHref}
          whileHover={hover}
          whileTap={tap}
          className="rounded-full bg-orange px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-orange-strong"
        >
          Call {siteConfig.phone}
        </motion.a>
        <MotionLink
          href="/request-service"
          whileHover={hover}
          whileTap={tap}
          className="rounded-full bg-white px-6 py-3.5 text-center text-base font-semibold text-forest transition-colors hover:bg-white/90"
        >
          Request a Free Estimate
        </MotionLink>
      </div>
    </SlideIn>
  );
}
