import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-foreground/70">
        The page you&apos;re looking for may have moved or no longer exists.
        Head back home, or get in touch if you were looking for a free
        estimate.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/request-service" variant="outline">
          Request a Free Estimate
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Or call us directly at{" "}
        <a href={siteConfig.phoneHref} className="font-semibold text-orange">
          {siteConfig.phone}
        </a>
        .
      </p>
    </section>
  );
}
