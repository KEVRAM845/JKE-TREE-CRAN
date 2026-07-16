"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import TrustSignals from "@/components/TrustSignals";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { focusAndHighlightSection } from "@/lib/scrollToSection";
import { getEstimateHref, siteConfig } from "@/lib/site-config";
import {
  bucketTruckHazard,
  loaderMovingLog,
  stumpGrinderFreshCut,
  whiteTruckChipper,
  workerNextToChipper,
} from "@/lib/media";

const SECTION_ID = "large-project-crew";

const included = [
  "Five-person professional crew",
  "Climber on site",
  "Articulating loader",
  "Stump grinder",
  "Bucket truck / boom truck",
  "High-capacity wood chipper",
  "Chipper truck",
  "Cleanup within the agreed project scope",
];

const scopeFactors = [
  "Property access",
  "Tree size and condition",
  "Terrain",
  "Safety requirements",
  "Disposal requirements",
  "Crane requirements",
  "Weather",
  "The agreed project plan",
];

const idealFor = [
  "Cleaning up wooded residential backyards",
  "Removing multiple dead or hazardous trees",
  "Opening views toward a creek, valley, hillside, or wooded area",
  "Improving visibility from a hilltop property",
  "Clearing trees and debris around a home",
  "Removing unwanted trees throughout a large property",
  "Completing several tree removals, trimming tasks, and stump-grinding needs during one coordinated project",
  "Cleaning storm-damaged or neglected areas",
  "Improving the appearance and usability of residential acreage",
  "Large estate, farm, or commercial property projects",
];

const equipmentGrid = [
  { asset: bucketTruckHazard, label: "Bucket Truck / Boom Truck" },
  { asset: loaderMovingLog, label: "Articulating Loader" },
  { asset: stumpGrinderFreshCut, label: "Stump Grinder" },
  { asset: whiteTruckChipper, label: "High-Capacity Chipper & Chipper Truck" },
  { asset: workerNextToChipper, label: "Crew Loading the Chipper" },
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
            focused on your property.
          </p>
          <p className="mt-5 text-white/70">
            For larger tree and property projects, JKE Tree &amp; Crane
            offers a fully equipped daily crew designed to complete
            substantial work efficiently. This service is ideal for
            homeowners, property managers, estates, farms, and businesses
            that need multiple trees addressed, wooded areas cleaned up,
            views opened, stumps removed, or several related tasks completed
            during one coordinated project — from large wooded backyards and
            hillside or creek-side properties to farms and commercial sites.
          </p>
        </SlideIn>

        {/* Rate + scope dependency */}
        <SlideIn className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Large Project Daily Crew
          </p>
          <p className="mt-2 text-4xl font-extrabold text-orange-light sm:text-5xl">
            ${dailyRate}{" "}
            <span className="text-lg font-semibold text-white/70">per day</span>
          </p>
          <p className="mt-3 text-sm text-white/60">
            Scope and scheduling are confirmed after an on-site project
            assessment.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm text-white/70">
            The ${dailyRate} daily rate applies to the Large Project Daily
            Crew described on this page. Specialized crane removals,
            unusually complex trees, multi-day projects, and other advanced
            work are evaluated and quoted separately after an on-site
            assessment.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-xs text-white/50">
            Actual results depend on property access, tree size and
            condition, terrain, safety requirements, disposal requirements,
            crane requirements, weather, and the agreed project plan.
          </p>
        </SlideIn>

        {/* What's included */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2">
          <SlideIn>
            <h3 className="text-xl font-bold">What&apos;s Included</h3>
            <ul className="mt-4 space-y-3">
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
                      <Link href="/services/stump-grinding" className="underline decoration-white/30 underline-offset-2 hover:text-white">
                        {item}
                      </Link>
                    ) : item === "Bucket truck / boom truck" ? (
                      <Link href="/services/crane-bucket-truck-service" className="underline decoration-white/30 underline-offset-2 hover:text-white">
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

          <SlideIn>
            <h3 className="text-xl font-bold">Scope Depends On</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {scopeFactors.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-light" />
                  {item}
                </li>
              ))}
            </ul>
          </SlideIn>
        </div>

        {/* Ideal for */}
        <div className="mx-auto mt-14 max-w-5xl">
          <SlideIn>
            <h3 className="text-xl font-bold">Project Possibilities</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Examples of projects this service may be well suited for
              include:
            </p>
          </SlideIn>
          <StaggerContainer className="mt-6 grid gap-3 sm:grid-cols-2">
            {idealFor.map((item, index) => (
              <StaggerItem
                key={item}
                index={index}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
              >
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-light"
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
                {item}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Equipment media */}
        <div className="mx-auto mt-14 max-w-5xl">
          <SlideIn>
            <h3 className="text-xl font-bold">Our Large Project Equipment</h3>
          </SlideIn>
          <StaggerContainer className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {equipmentGrid.map(({ asset, label }, index) => (
              <StaggerItem
                key={asset.src}
                index={index}
                className={`group relative aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg ${
                  index === equipmentGrid.length - 1 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white">
                    {label}
                  </span>
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Minimum project + trust signals */}
        <div className="mx-auto mt-14 max-w-3xl">
          <MinimumProjectNotice
            variant="full"
            className="!border-white/15 !bg-white/5 [&_p:first-child]:text-white [&_p:last-child]:text-white/70"
          />
        </div>

        <SlideIn className="mx-auto mt-10 max-w-3xl">
          <TrustSignals onDark />
        </SlideIn>

        {/* Assessment CTA */}
        <SlideIn className="mx-auto mt-14 max-w-3xl rounded-2xl bg-white/5 p-6 text-center sm:p-8">
          <h3 className="text-xl font-bold">Schedule a Large Project Assessment</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            A large project assessment is a professional site visit — we walk
            the property, talk through your goals, and put together a plan.
            It typically includes:
          </p>
          <ul className="mx-auto mt-4 grid max-w-xl gap-2 text-left sm:grid-cols-2">
            {assessmentIncludes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-light" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={getEstimateHref()} variant="primary">
              Schedule a Large Project Assessment
            </ButtonLink>
            <ButtonLink href={getEstimateHref()} variant="outlineLight">
              Request a Free Estimate
            </ButtonLink>
          </div>
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
