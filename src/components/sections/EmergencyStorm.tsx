import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { Section } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { stormFeaturedImage } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

export default function EmergencyStorm() {
  return (
    <Section tone="forest" className="grid items-center gap-10 md:grid-cols-2">
      <SlideIn>
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-light">
          Emergency Storm Response
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Storm damage doesn&apos;t wait. Neither do we.
        </h2>
        <p className="mt-4 max-w-md text-white/80">
          A split trunk, a fallen limb, or a tree resting on your roof isn&apos;t
          something to leave for a routine appointment. We handle hazardous
          and storm-damaged trees with the crane, bucket truck, and rigging
          it takes to bring a dangerous removal down safely — not guess our
          way through it. If a tree is already on your home, car, or fence
          line, call us directly and we&apos;ll prioritize it.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={siteConfig.phoneHref} variant="primary">
            Call {siteConfig.phone}
          </ButtonAnchor>
          <ButtonLink href="/request-service" variant="outlineLight">
            Request a Free Estimate
          </ButtonLink>
        </div>
      </SlideIn>

      <FadeIn className="mx-auto w-full max-w-sm">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
          <Image
            src={stormFeaturedImage.src}
            alt={stormFeaturedImage.alt}
            fill
            sizes="(min-width: 640px) 384px, 90vw"
            className="object-cover"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
