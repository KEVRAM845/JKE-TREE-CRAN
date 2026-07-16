import type { Metadata } from "next";
import Image from "next/image";
import MediaVideo from "@/components/MediaVideo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { crewTeamPhoto, crewActionMedia } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Meet the Crew",
  description:
    "Meet the experienced, local crew behind JKE Tree & Crane — safety-focused professionals serving Dutchess, Putnam, Orange, and Ulster Counties, NY.",
  alternates: { canonical: "/crew" },
};

interface CrewFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iconProps = {
  className: "h-6 w-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const coreFeatures: CrewFeature[] = [
  {
    title: "Experienced Professionals",
    description:
      "Our operators have run cranes, bucket trucks, and rigging on properties across the Hudson Valley — routine trims and the difficult removals other crews turn down.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
  {
    title: "Modern Equipment",
    description:
      "Cranes, bucket trucks, stump grinders, and grapple gear — owned and maintained in-house, sized to the job in front of us.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 20h18" />
        <path d="M6 20V8l3-3 12 4" />
        <path d="M9 5v4" />
        <path d="M14 6.5V11" />
      </svg>
    ),
  },
  {
    title: "Safety Focused",
    description:
      "Every job is planned before the first cut — drop zones, rigging, and equipment placement — so the work stays controlled from start to finish.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21c5-1.5 8-5 8-9.5V5.5L12 3 4 5.5v6c0 4.5 3 8 8 9.5Z" />
        <path d="m9 11.5 2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: "Reliable Scheduling",
    description:
      "Clear timelines and a crew that shows up when we say we will, with straightforward communication from the first call through cleanup.",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="16" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    title: "Clean Job Sites",
    description:
      "Full debris cleanup and haul-away on every job — we leave your property looking better than the mess a storm or a stubborn tree left behind.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20 14 10" />
        <path d="M13 5.5 18.5 11 16 13.5 10.5 8Z" />
        <path d="m16.5 4.5 3 3" />
      </svg>
    ),
  },
];

const insuredFeature: CrewFeature = {
  title: "Fully Insured",
  description:
    "Work performed under active insurance coverage, so your property is protected on every job we do.",
  icon: (
    <svg {...iconProps}>
      <path d="M12 21c5-1.5 8-5 8-9.5V5.5L12 3 4 5.5v6c0 4.5 3 8 8 9.5Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </svg>
  ),
};

const locallyOwnedFeature: CrewFeature = {
  title: "Locally Owned & Operated",
  description:
    "A local crew that knows the Hudson Valley's properties, terrain, and towns — not a call center dispatching a stranger to your door.",
  icon: (
    <svg {...iconProps}>
      <path d="M12 21s7-5.2 7-10.5A7 7 0 0 0 5 10.5C5 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  ),
};

// Six cards, always — "Fully Insured" only appears once that credential is
// confirmed in siteConfig; until then, "Locally Owned" (already an affirmed
// claim) fills that slot instead of asserting unverified insurance.
const whyChooseFeatures: CrewFeature[] = [
  ...coreFeatures,
  siteConfig.credentials.insured ? insuredFeature : locallyOwnedFeature,
];

export default function CrewPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-20">
        <SlideIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            Our Team
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-forest sm:text-5xl">
            Meet the JKE Tree & Crane Crew
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Experienced, local professionals who show up prepared, work safely, and
            treat every property like their own — serving homeowners across
            Dutchess, Putnam, Orange, and Ulster Counties.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/request-service">Request a Free Estimate</ButtonLink>
          </div>
        </SlideIn>

        <FadeIn className="relative mx-auto mt-10 aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          <Image
            src={crewTeamPhoto.src}
            alt={crewTeamPhoto.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </FadeIn>
      </section>

      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Who We Are" title="About Our Crew" />
          <div className="mt-6 space-y-4 text-foreground/80">
            <p>
              Every job that gets estimated is the job our crew actually shows up to
              do. Our operators have run cranes, bucket trucks, and rigging on
              properties across the Hudson Valley — routine trims and the kind of
              hazardous, storm-damaged removals other companies turn down. Safety
              comes first on every job: before a single cut is made, we walk the
              property, plan the drop zone, and protect what&apos;s around it.
            </p>
            <p>
              We show up with the right equipment for the job, communicate clearly
              from the first phone call through cleanup, and leave your property the
              way we found it — or better. It&apos;s the same crew on every job, and
              every one of them takes pride in the work.
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "Clear communication from arrival through cleanup",
              "Careful, respectful work around homes and landscaping",
              "Full debris cleanup on every job — no mess left behind",
              "The same experienced hands, job after job",
            ].map((point) => (
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
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Why Homeowners Choose Our Crew"
          title="What working with us looks like"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseFeatures.map((feature, index) => (
            <StaggerItem
              key={feature.title}
              index={index}
              className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/5 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                {feature.icon}
              </span>
              <h3 className="mt-4 font-bold text-forest">{feature.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{feature.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="On The Job"
          title="Crew In Action"
          subtitle="Real footage from recent jobs — no stock, no staging."
        />
        <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {crewActionMedia.map((item, index) => (
            <StaggerItem
              key={item.src}
              index={index}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
              ) : (
                <MediaVideo
                  src={item.src}
                  poster={item.poster}
                  label={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <section className="bg-orange">
        <FadeIn className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to work with a crew you can trust?
          </h2>
          <p className="max-w-xl text-white/90">
            Tell us about the job and we&apos;ll send the same experienced crew you
            just met — no subcontractors, no surprises.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/request-service" variant="forest">
              Request a Free Estimate
            </ButtonLink>
            <ButtonAnchor href={siteConfig.phoneHref} variant="white">
              Call {siteConfig.phone}
            </ButtonAnchor>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
