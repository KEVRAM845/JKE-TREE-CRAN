import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function CtaBanner() {
  return (
    <section id="cta-banner" className="bg-orange">
      <FadeIn className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Let&apos;s Take a Look at the Job
          </h2>
          <p className="mt-1 text-white/90">
            Send us a few details or give us a call — we&apos;ll walk the property and
            tell you exactly what it takes. For hazardous or emergency work, call now.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-service" variant="forest">
            Request a Free Estimate
          </ButtonLink>
          <ButtonAnchor href={siteConfig.phoneHref} variant="white">
            Call {siteConfig.phone}
          </ButtonAnchor>
        </div>
      </FadeIn>
    </section>
  );
}
