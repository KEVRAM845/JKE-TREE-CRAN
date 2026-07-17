import type { Metadata } from "next";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import SocialLinks from "@/components/SocialLinks";
import TrustSignals from "@/components/TrustSignals";
import { Section } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { SlideIn } from "@/components/motion/SlideIn";
import { getEstimateHref, getGoogleMapsUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, text, or email JKE Tree & Crane, or stop by our LaGrange, NY office. Serving Orange and Dutchess Counties.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-14 pb-4 text-center sm:px-6 sm:pt-20">
        <SlideIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            Get In Touch
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-forest sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Call, text, or email us directly, or send a service request and
            we&apos;ll follow up.
          </p>
        </SlideIn>
        <SlideIn className="mt-8">
          <TrustSignals className="mx-auto max-w-xl" />
        </SlideIn>
      </section>

      <Section className="grid gap-10 md:grid-cols-2">
        <SlideIn>
          <h2 className="text-xl font-bold text-forest">Phone &amp; Email</h2>
          <div className="mt-4 space-y-4">
            <div>
              <a
                href={siteConfig.phoneHref}
                className="text-lg font-semibold text-forest transition-colors hover:text-orange"
              >
                {siteConfig.phone}
              </a>
              {siteConfig.phoneSecondary && (
                <span className="ml-2 text-sm text-foreground/50">
                  (Main Office)
                </span>
              )}
            </div>
            {siteConfig.phoneSecondary && (
              <div>
                <a
                  href={siteConfig.phoneSecondaryHref}
                  className="text-lg font-semibold text-forest transition-colors hover:text-orange"
                >
                  {siteConfig.phoneSecondary}
                </a>
                <span className="ml-2 text-sm text-foreground/50">
                  (Secondary Office Line)
                </span>
              </div>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-lg font-semibold text-forest transition-colors hover:text-orange"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonAnchor href={siteConfig.phoneHref}>
              Call {siteConfig.phone}
            </ButtonAnchor>
            <ButtonAnchor href={siteConfig.smsHref} variant="outline">
              Text Us
            </ButtonAnchor>
            <ButtonLink href={getEstimateHref()} variant="outline">
              Request a Free Estimate
            </ButtonLink>
          </div>

          <SocialLinks className="mt-6 [&_a]:bg-forest/5 [&_a]:text-forest [&_a:hover]:bg-forest/10" />
        </SlideIn>

        {siteConfig.address && (
          <SlideIn>
            <h2 className="text-xl font-bold text-forest">Office</h2>
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-foreground/80 transition-colors hover:text-orange"
            >
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.zip}
            </a>
            <p className="mt-4 text-sm text-foreground/60">
              Serving {siteConfig.serviceArea}.
            </p>
          </SlideIn>
        )}
      </Section>

      <Section tone="muted" className="!pt-0">
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
