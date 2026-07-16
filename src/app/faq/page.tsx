import type { Metadata } from "next";
import Faq from "@/components/Faq";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { generalFaqs } from "@/lib/faqs";
import { getEstimateHref, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about free estimates, emergency tree service, debris cleanup, stump grinding, crane-assisted removal, and the service areas JKE Tree & Crane covers.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-extrabold text-forest sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-foreground/70">
          Answers to the questions we hear most from homeowners and property
          owners across {siteConfig.serviceArea}. Don&apos;t see yours below?
          Reach out — see the contact options at the bottom of this page.
        </p>

        <div className="mt-8">
          <Faq items={generalFaqs} heading="" />
        </div>

        <MinimumProjectNotice variant="full" className="mt-10" />
      </section>

      <Section tone="muted" className="text-center">
        <SectionHeading title="Still Have Questions?" />
        <p className="mx-auto mt-3 max-w-md text-foreground/70">
          Call, text, or email us directly, or send a service request and
          we&apos;ll follow up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonAnchor href={siteConfig.phoneHref}>
            Call {siteConfig.phone}
          </ButtonAnchor>
          <ButtonAnchor href={siteConfig.smsHref} variant="outline">
            Text Us
          </ButtonAnchor>
          <ButtonAnchor href={`mailto:${siteConfig.email}`} variant="outline">
            Email Us
          </ButtonAnchor>
          <ButtonLink href={getEstimateHref()} variant="outline">
            Request a Free Estimate
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
