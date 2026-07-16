import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import Credentials from "@/components/Credentials";
import Faq from "@/components/Faq";
import MediaVideo from "@/components/MediaVideo";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import MinimumProjectNotice from "@/components/MinimumProjectNotice";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  getServiceBySlug,
  services,
  defaultProcess,
  defaultWhatToExpect,
  defaultSafety,
} from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { serviceExtraMedia } from "@/lib/media";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
      images: [service.heroImage],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const process = service.process ?? defaultProcess;
  const whatToExpect = service.whatToExpect ?? defaultWhatToExpect;
  const safety = service.safety ?? defaultSafety;
  const extraMedia = serviceExtraMedia[service.slug] ?? [];

  return (
    <>
      <section className="relative flex h-72 items-end overflow-hidden sm:h-96">
        <Image
          src={service.heroImage}
          alt={service.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={service.heroImagePosition ? { objectPosition: service.heroImagePosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </nav>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            {service.title}
          </h1>
        </div>
      </section>

      <Section className="!pb-0">
        <p className="max-w-2xl text-lg text-foreground/80">{service.summary}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-service">Request a Free Estimate</ButtonLink>
          <ButtonAnchor href={siteConfig.phoneHref} variant="outline">
            Call {siteConfig.phone}
          </ButtonAnchor>
        </div>

        <Credentials className="mt-8" />
        <MinimumProjectNotice className="mt-4" />

        <h2 className="mt-12 text-xl font-bold text-forest">What&apos;s Included</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 rounded-lg border border-black/10 bg-white p-4"
            >
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" />
              <span className="text-sm text-foreground/80">{bullet}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="How We Work" title="A clear, careful process" />
        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <StaggerItem key={step.title} index={index}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-bold text-forest">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-forest">What to Expect</h2>
            <ul className="mt-4 space-y-3">
              {whatToExpect.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" />
                  <span className="text-foreground/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-forest">Safety First</h2>
            <ul className="mt-4 space-y-3">
              {safety.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" />
                  <span className="text-foreground/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {service.equipment && service.equipment.length > 0 && (
        <Section tone="muted" className="!py-12">
          <h2 className="text-xl font-bold text-forest">Equipment Used</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {service.equipment.map((item) => (
              <li
                key={item}
                className="rounded-full border border-forest/15 bg-white px-4 py-2 text-sm font-medium text-forest"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {extraMedia.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="From Our Jobs" title="More From This Work" />
          <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {extraMedia.map((item, index) => {
              // An odd media count leaves a single orphaned tile at the 2-column
              // mobile breakpoint — let it fill that row instead of sitting alone
              // beside empty space. Capped at 3 columns (not 4) so every service's
              // curated set (3 or 5 items) fills evenly at sm+ without a stray tile.
              const isOrphan = index === extraMedia.length - 1 && extraMedia.length % 2 === 1;
              return (
              <StaggerItem
                key={item.src}
                index={index}
                className={`group relative aspect-[3/4] overflow-hidden rounded-xl bg-black/[0.04] shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg ${isOrphan ? "col-span-2 sm:col-span-1" : ""}`}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                  />
                ) : (
                  <MediaVideo
                    src={item.src}
                    poster={item.poster}
                    label={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                  />
                )}
              </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <Section>
          <Faq items={service.faqs} />
        </Section>
      )}

      <Section className="!pt-0">
        <h2 className="text-xl font-bold text-forest">Other Services</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {services
            .filter((other) => other.slug !== service.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 ease-premium hover:border-orange hover:text-orange"
              >
                {other.navLabel}
              </Link>
            ))}
        </div>
      </Section>

      <Section tone="muted" className="!pt-0">
        <ServiceAreaMap heading={`Areas We Serve for ${service.title}`} />
      </Section>

      <CtaBanner />
      <ServiceJsonLd service={service} />
    </>
  );
}
