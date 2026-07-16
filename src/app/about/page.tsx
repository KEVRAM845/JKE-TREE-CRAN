import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import TrustSignals from "@/components/TrustSignals";
import { crewTeamPhoto } from "@/lib/media";
import { getEstimateHref, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "JKE Tree & Crane is a locally operated tree removal, trimming, and crane service across the Hudson Valley — the same experienced crew, start to finish, on every job.",
  alternates: { canonical: "/about" },
};

const missionPoints = [
  "Plan every job before the first cut — drop zones, rigging, and equipment placement",
  "Protect what's around the tree as carefully as we handle the tree itself",
  "Communicate clearly with property owners from the first call to final cleanup",
  "Show up as the same dependable crew, job after job",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-14 pb-4 text-center sm:px-6 sm:pt-20">
        <SlideIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            Our Company
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-forest sm:text-5xl">
            About JKE Tree & Crane
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            A Hudson Valley tree and crane service built around the equipment
            routine crews don&apos;t carry — cranes, bucket trucks, and the
            rigging experience to take down what other companies turn away.
          </p>
        </SlideIn>
        <SlideIn className="mt-8">
          <TrustSignals className="mx-auto max-w-xl" />
        </SlideIn>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <SlideIn className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={crewTeamPhoto.src}
              alt={crewTeamPhoto.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </SlideIn>
          <SlideIn>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">
              Our Story
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">
              A local crew built for the hard jobs
            </h2>
            <p className="mt-4 text-foreground/70">
              JKE Tree & Crane handles everything from routine trimming to the
              removals that need a crane instead of a chainsaw. We show up
              with our own equipment — bucket trucks for aerial access, a
              truck-mounted crane for heavy or tightly-surrounded jobs, and
              the rigging know-how to bring a tree down in controlled
              sections rather than guessing.
            </p>
            <p className="mt-4 text-foreground/70">
              It&apos;s the same experienced crew on every job, not a
              rotating cast of subcontractors. Before the first cut, we walk
              the property, plan the drop zone, and protect your lawn,
              driveway, and structures — and the job isn&apos;t finished
              until the site is cleaned up and the debris is hauled away.
            </p>
          </SlideIn>
        </div>
      </Section>

      {siteConfig.aboutStats.show && (
        <Section tone="forest">
          <StaggerContainer className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: siteConfig.aboutStats.customersServed, label: "Customers Served" },
              { value: siteConfig.aboutStats.teamSize, label: "On the Crew" },
              { value: siteConfig.aboutStats.yearsExperience, label: "Industry Experience" },
            ]
              .filter((stat) => stat.value)
              .map((stat, index) => (
                <StaggerItem key={stat.label} index={index}>
                  <p className="text-4xl font-extrabold sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/70">
                    {stat.label}
                  </p>
                </StaggerItem>
              ))}
          </StaggerContainer>
        </Section>
      )}

      <Section tone="muted">
        <div className="grid gap-10 md:grid-cols-2">
          <SlideIn>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">
              Mission
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-forest">
              Tree and crane work, done the way we&apos;d want it on our own
              property
            </h2>
            <ul className="mt-5 space-y-3">
              {missionPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange"
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
                  <span className="text-foreground/80">{point}</span>
                </li>
              ))}
            </ul>
          </SlideIn>

          <SlideIn>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">
              Vision
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-forest">
              The tree and crane service Hudson Valley property owners call
              first
            </h2>
            <p className="mt-5 text-foreground/70">
              Not just for the routine work, but for the removals other
              companies turn down. We&apos;re working toward that by
              investing in the right equipment for the job, training our crew
              on the techniques that keep both people and property safe, and
              improving how we work on every job — not just the hard ones.
            </p>
          </SlideIn>
        </div>
      </Section>

      <Section>
        <ServiceAreaMap />
      </Section>

      <section className="bg-orange">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="max-w-xl text-white/90">
            Tell us about the job and we&apos;ll follow up to schedule a free,
            no-obligation estimate.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={getEstimateHref()} variant="forest">
              Request a Free Estimate
            </ButtonLink>
            <ButtonAnchor href={siteConfig.phoneHref} variant="white">
              Call Now
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
