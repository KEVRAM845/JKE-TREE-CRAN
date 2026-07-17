"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import FeaturedVideo from "@/components/FeaturedVideo";
import TrustSignals from "@/components/TrustSignals";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { focusAndHighlightSection } from "@/lib/scrollToSection";
import { getEstimateHref, getLargeProjectEstimateHref, siteConfig } from "@/lib/site-config";
import {
  blackHighCapacityChipper,
  craneLiftingBranchHouse,
  crewBuckingLogs,
  crewTeamPhoto,
  crewTrucksSunset,
  landClearingVista,
  loaderMovingLog,
  stumpGrinderFreshCut,
  videoLoaderChipperAction,
  whiteTruckChipper,
} from "@/lib/media";

const SECTION_ID = "large-project-crew";

// Order matches the equipment photo grid below item-for-item, so the visual
// sequence and the written checklist tell the same story.
const included = [
  "Five-person crew, including a climber as assigned within the crew",
  "Bucket truck",
  "Chipper truck",
  "Cleanup within the agreed daily scope",
  "Articulating loader",
  "High-capacity chipper",
  "Stump grinder",
];

// Real media only, in checklist order — no stand-in or invented equipment
// photos. "Cleanup within the agreed daily scope" stays in the written
// checklist above but is intentionally omitted here: there's no approved
// still photo of a completed large-project cleanup result, and the
// previous placeholder (a generic cleanup clip) didn't actually represent
// this specific offering, so it's left out rather than filled with
// something inexact.
const equipmentPhotos = [
  { label: "Five-Person Crew", asset: crewTeamPhoto },
  { label: "Bucket Truck", asset: crewTrucksSunset },
  { label: "Chipper Truck", asset: whiteTruckChipper },
  { label: "Articulating Loader", asset: loaderMovingLog },
  { label: "High-Capacity Chipper", asset: blackHighCapacityChipper },
  { label: "Stump Grinder", asset: stumpGrinderFreshCut },
];

const categories = [
  {
    title: "Woodland Property Cleanup",
    points: [
      "Removing dead, damaged, unwanted, or overcrowded trees",
      "Improving safety, appearance, and property usability",
    ],
    image: crewBuckingLogs,
  },
  {
    title: "View Opening",
    points: [
      "Opening views toward a creek, hillside, valley, backyard, or wooded area",
      "Selective removal based on property-owner goals",
    ],
    image: landClearingVista,
  },
  {
    title: "Multiple Tree & Stump Projects",
    points: [
      "Coordinating several removals, trimming needs, and stump-grinding tasks",
      "Suitable for residential acreage, estates, farms, and larger properties",
    ],
    image: stumpGrinderFreshCut,
  },
  {
    title: "Storm & Hazard Cleanup",
    points: [
      "Addressing storm-damaged, broken, leaning, or hazardous trees",
      "Cleaning affected areas within the agreed project scope",
    ],
    image: craneLiftingBranchHouse,
  },
];

const assessmentIncludes = [
  "Walking the property",
  "Understanding the owner's goals",
  "Identifying hazardous, dead, damaged, or unwanted trees",
  "Reviewing terrain and equipment access",
  "Discussing which trees may be removed or retained",
  "Recommending ways to improve visibility and appearance",
  "Reviewing stump-removal and cleanup needs",
  "Developing an appropriate project plan",
  "Providing a detailed estimate",
];

export default function LargeProjectCrew() {
  const shouldReduceMotion = useReducedMotion();
  const hasCheckedHash = useRef(false);

  // Arriving here via a cross-page link (e.g. the floating widget on /about)
  // lands with #large-project-crew already in the URL — the browser handles
  // the native scroll, this just adds focus + the brief highlight so the
  // landing is unambiguous, matching what happens on a same-page click.
  useEffect(() => {
    if (hasCheckedHash.current) return;
    hasCheckedHash.current = true;
    if (window.location.hash === `#${SECTION_ID}`) {
      focusAndHighlightSection(SECTION_ID, Boolean(shouldReduceMotion));
    }
  }, [shouldReduceMotion]);

  const dailyRate = siteConfig.largeProjectCrew.dailyRate.toLocaleString("en-US");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Large Project Daily Crew",
    name: `Large Project Daily Crew | ${siteConfig.name}`,
    description:
      "A fully equipped daily crew for large tree and property projects — wooded backyard cleanup, multi-tree removal, estate and farm tree service, and hillside or creek-view tree clearing.",
    url: `${siteConfig.url}/#${SECTION_ID}`,
    areaServed:
      siteConfig.serviceAreas.length > 0 ? siteConfig.serviceAreas : siteConfig.serviceArea,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
  };

  return (
    <section id={SECTION_ID} className="bg-forest text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* 1–2. Headline + short value statement */}
        <SlideIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-light">
            For Larger Properties &amp; Projects
          </p>
          <h2
            data-section-heading
            tabIndex={-1}
            className="mt-2 text-3xl font-extrabold sm:text-4xl focus:outline-none"
          >
            Large Project Daily Crew
          </h2>
          <p className="mt-3 text-lg text-white/80">
            One coordinated crew. Professional equipment. One full day
            focused on your property — for wooded backyards, estates, farms,
            hillside and creek-side properties, and multi-tree projects.
          </p>
        </SlideIn>

        {/* 3. $7,500 daily rate */}
        <SlideIn className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/15 bg-white/5 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Large Project Daily Crew
          </p>
          <p className="mt-2 text-4xl font-extrabold text-orange-light sm:text-5xl">
            ${dailyRate}{" "}
            <span className="text-lg font-semibold text-white/70">per day</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
            This is our daily rate for a full-day project. Scope and
            scheduling are confirmed after an on-site project assessment.
          </p>
        </SlideIn>

        {/* 4. Featured action video */}
        <div className="mx-auto mt-14 max-w-4xl">
          <FeaturedVideo
            onDark
            title="A Fully Equipped Crew in Action"
            caption="An articulating loader feeds material into JKE's high-capacity chipper during a coordinated property cleanup project."
            video={videoLoaderChipperAction}
          />
        </div>

        {/* 5. Equipment included — checklist and photo grid share the same
             order, item for item. */}
        <div className="mx-auto mt-14 max-w-3xl">
          <SlideIn>
            <h3 className="text-xl font-bold">What&apos;s Included</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-light"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-white/80">
                    {item === "Stump grinder" ? (
                      <Link
                        href="/services/stump-grinding"
                        className="underline decoration-white/30 underline-offset-2 hover:text-white"
                      >
                        {item}
                      </Link>
                    ) : item === "Bucket truck" ? (
                      <Link
                        href="/services/crane-bucket-truck-service"
                        className="underline decoration-white/30 underline-offset-2 hover:text-white"
                      >
                        {item}
                      </Link>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </SlideIn>

          <StaggerContainer className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {equipmentPhotos.map(({ label, asset }, index) => (
              <StaggerItem
                key={label}
                index={index}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                  style={asset.focalPosition ? { objectPosition: asset.focalPosition } : undefined}
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white">
                    {label}
                  </span>
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* 6. Four visual project categories */}
        <div className="mx-auto mt-14 max-w-5xl">
          <SlideIn className="text-center">
            <h3 className="text-xl font-bold">Project Possibilities</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
              Examples of projects this service may be well suited for —
              residential, estate, farm, and commercial properties alike.
            </p>
          </SlideIn>
          <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2">
            {categories.map((category, index) => (
              <StaggerItem
                key={category.title}
                index={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={
                      category.image.focalPosition
                        ? { objectPosition: category.image.focalPosition }
                        : undefined
                    }
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold">{category.title}</h4>
                  <ul className="mt-2 space-y-1.5">
                    {category.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange-light" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* 7. Short scope clarification */}
        <SlideIn className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-sm text-white/60">
            Specialized crane removals, unusually complex trees, multi-day
            projects, and other separately scoped work are evaluated and
            quoted individually. Daily scope depends on tree size and
            condition, property access, terrain, safety requirements,
            disposal requirements, weather, and agreed project priorities.
          </p>
        </SlideIn>

        {/* 8. CTA */}
        <SlideIn className="mx-auto mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href={getLargeProjectEstimateHref()} variant="primary">
            Schedule a Large Project Assessment
          </ButtonLink>
          <ButtonLink href={getEstimateHref()} variant="outlineLight">
            Request a Free Estimate
          </ButtonLink>
        </SlideIn>

        <SlideIn className="mx-auto mt-6 max-w-xl text-center">
          <MinimumProjectNotice className="text-white/60" />
        </SlideIn>

        <SlideIn className="mx-auto mt-8 max-w-2xl">
          <TrustSignals onDark />
        </SlideIn>

        {/* 9. Expandable assessment details */}
        <SlideIn className="mx-auto mt-10 max-w-2xl">
          <details className="group rounded-2xl border border-white/15 bg-white/5 p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
              <span>What to expect from a Large Project Assessment</span>
              <svg
                className="h-5 w-5 flex-shrink-0 text-orange-light transition-transform duration-300 ease-premium group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="mt-4 text-sm text-white/70">
              A large project assessment is a professional site visit. It
              typically includes:
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {assessmentIncludes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-light" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
        </SlideIn>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
