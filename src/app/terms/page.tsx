import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing the use of the ${siteConfig.name} website and service requests submitted through it.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest sm:text-4xl">Terms of Service</h1>

      <div className="mt-4 rounded-lg border border-orange/30 bg-orange/5 px-4 py-3 text-sm text-foreground/80">
        <strong>Draft for review.</strong> This page is a plain-language
        placeholder. It has not been reviewed by an attorney and should be
        confirmed or replaced with professionally reviewed language before
        this is treated as a final, binding policy.
      </div>

      <div className="mt-8 space-y-6 text-foreground/80">
        <div>
          <h2 className="text-lg font-bold text-forest">Website Use</h2>
          <p className="mt-2">
            This website provides information about {siteConfig.name}&apos;s
            tree removal, trimming, stump grinding, crane and bucket truck,
            and land clearing services, and lets you submit a service
            request. Submitting a request does not obligate you to accept
            any estimate or schedule any work.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">Estimates &amp; Pricing</h2>
          <p className="mt-2">
            On-site estimates are free. Figures referenced on this site — including
            the Large Project Daily Crew daily rate and the minimum project
            investment — describe our general pricing approach and are not a
            binding quote for any specific property. A final price is
            confirmed after an on-site visit and agreed in writing before
            work begins.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">Accuracy of Content</h2>
          <p className="mt-2">
            We aim to keep the information on this site accurate and current,
            but service availability, equipment, and scope can vary by
            property and project. Nothing on this site constitutes a
            guarantee of a specific outcome, timeframe, or completed
            work quantity.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be directed to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-orange">
              {siteConfig.email}
            </a>{" "}
            or{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-orange">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
