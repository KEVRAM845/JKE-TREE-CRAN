import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import CtaBanner from "@/components/CtaBanner";
import HeroContent from "@/components/HeroContent";
import TrustBar from "@/components/TrustBar";
import CrewPreview from "@/components/sections/CrewPreview";
import LargeProjectCrew from "@/components/sections/LargeProjectCrew";
import EmergencyStorm from "@/components/sections/EmergencyStorm";
import FeaturedProject from "@/components/sections/FeaturedProject";
import VideoReel from "@/components/sections/VideoReel";
import EquipmentShowcase from "@/components/sections/EquipmentShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import Reviews from "@/components/sections/Reviews";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer } from "@/components/motion/Stagger";
import { Section } from "@/components/ui/Section";
import { services } from "@/lib/services";
import { heroImage, whyChooseImage } from "@/lib/media";

const whyChooseUs = [
  "Crane and bucket truck equipment for tall or hard-to-reach trees",
  "Experience with hazardous, storm-damaged, and dangerous take-downs",
  "Fast response when a tree is already on a roof, car, or fence line",
  "An experienced crew on every job, from routine trims to complex crane removals",
  "Full debris cleanup and haul-away on every job",
  "Land clearing and logging capability for larger properties",
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden sm:min-h-[82vh] lg:min-h-[88vh]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          // A tall, wide-viewport hero crops most of this portrait photo's
          // height — bias toward the crane boom and roofline (upper third)
          // on desktop, where the crop window is narrowest, and ease toward
          // center on mobile, where the tall viewport already shows most of
          // the frame including the yard in front of the house.
          className="object-cover object-[50%_38%] sm:object-[50%_30%] lg:object-[50%_20%]"
        />
        {/* Lighter than the previous overlay so the crane and jobsite stay
            visible — a left-biased wash keeps the headline readable without
            darkening the equipment on the right side of the frame. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        <HeroContent />
      </section>

      <TrustBar />

      <Section id="services">
        <SlideIn className="text-center">
          <h2 className="text-3xl font-extrabold text-forest sm:text-4xl">Our Services</h2>
          <p className="mt-2 text-foreground/70">
            Tree removal, trimming, stump grinding, crane work, and land clearing —
            handled by the same crew, start to finish, from Poughkeepsie to Kingston.
          </p>
        </SlideIn>
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            // An odd service count leaves a single orphaned card at the
            // 2-column tablet breakpoint, and (for exactly 5 services) a
            // half-empty final row at the 3-column desktop breakpoint —
            // let the last card fill the remaining space at both instead of
            // leaving a visibly empty slot beside it.
            const isOrphan = index === services.length - 1 && services.length % 2 === 1;
            const isDesktopRowGap =
              index === services.length - 1 && services.length % 3 === 2;
            return (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                className={
                  [
                    isOrphan ? "sm:col-span-2" : "",
                    isDesktopRowGap ? "lg:col-span-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined
                }
              />
            );
          })}
        </StaggerContainer>
        <MinimumProjectNotice className="mt-10 text-center" />
      </Section>

      <LargeProjectCrew />

      <Section tone="muted" className="grid gap-10 md:grid-cols-2 md:items-center">
        <SlideIn className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/4]">
          <Image
            src={whyChooseImage.src}
            alt={whyChooseImage.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </SlideIn>
        <SlideIn>
          <h2 className="text-3xl font-extrabold text-forest sm:text-4xl">
            Why Property Owners Choose Us
          </h2>
          <ul className="mt-6 space-y-4">
            {whyChooseUs.map((point) => (
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
      </Section>

      <CrewPreview />

      <EmergencyStorm />
      <FeaturedProject />
      <VideoReel />
      <EquipmentShowcase />
      <HowItWorks />
      <Reviews />

      <CtaBanner />
    </>
  );
}
