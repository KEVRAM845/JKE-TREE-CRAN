import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest sm:text-4xl">Privacy Policy</h1>

      <div className="mt-4 rounded-lg border border-orange/30 bg-orange/5 px-4 py-3 text-sm text-foreground/80">
        <strong>Draft for review.</strong> This page is a plain-language
        placeholder describing our current data practices. It has not been
        reviewed by an attorney and should be confirmed or replaced with
        professionally reviewed language before this is treated as a final,
        binding policy.
      </div>

      <div className="mt-8 space-y-6 text-foreground/80">
        <div>
          <h2 className="text-lg font-bold text-forest">Information We Collect</h2>
          <p className="mt-2">
            When you submit a service request through this website, we
            collect the information you provide directly — your name, phone
            number, email address, property address, a description of the
            job, and any photos you choose to attach.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">How We Use It</h2>
          <p className="mt-2">
            We use this information solely to respond to your request,
            schedule an estimate or assessment, and communicate with you
            about the work — by phone, text (SMS), or email, based on the
            contact method you select. We do not sell your information to
            third parties.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">SMS Communication</h2>
          <p className="mt-2">
            If you provide a phone number and select text as a contact
            method, we may text you regarding your specific service request.
            Message and data rates may apply; message frequency varies based
            on your request. You can reply STOP at any time to opt out of
            further text messages related to your request.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">Data Retention</h2>
          <p className="mt-2">
            We retain request information for as long as reasonably needed to
            respond to your request and maintain our business records.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-forest">Contact Us</h2>
          <p className="mt-2">
            Questions about this policy can be directed to{" "}
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
