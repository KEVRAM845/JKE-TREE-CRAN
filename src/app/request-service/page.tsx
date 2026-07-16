import type { Metadata } from "next";
import RequestForm from "@/components/RequestForm";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import TrustSignals from "@/components/TrustSignals";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request Service",
  description:
    "Request a free estimate for tree removal, trimming, stump grinding, or crane and bucket truck service.",
  alternates: { canonical: "/request-service" },
};

export default function RequestServicePage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest sm:text-4xl">Request Service</h1>
      <p className="mt-2 text-foreground/70">
        Fill out the details below and we&apos;ll follow up to schedule a free
        estimate — no pressure, no obligation. It takes about two minutes;
        photos are the only optional part, and a few of them help us quote
        faster and more accurately. For an active emergency, skip the form and
        call us directly at{" "}
        <a href={siteConfig.phoneHref} className="font-semibold text-orange">
          {siteConfig.phone}
        </a>
        .
      </p>

      <TrustSignals className="mt-8" />
      <MinimumProjectNotice className="mt-6" />

      <div className="mt-8">
        <RequestForm />
      </div>

      <div className="mt-16 border-t border-black/10 pt-10">
        <ServiceAreaMap />
      </div>
    </section>
  );
}
