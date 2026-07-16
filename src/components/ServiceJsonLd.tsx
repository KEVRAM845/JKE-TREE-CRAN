import { siteConfig } from "@/lib/site-config";
import type { Service } from "@/lib/services";

/**
 * Service + BreadcrumbList structured data for a single /services/[slug]
 * page. Mirrors the same "only include what's real" approach as
 * LocalBusinessJsonLd in JsonLd.tsx — every field is sourced from the
 * service catalog or site-config, nothing invented per page. The breadcrumb
 * trail matches the visible Home / {service.title} nav already rendered in
 * the page's hero — this just gives search engines the same structure.
 */
export default function ServiceJsonLd({ service }: { service: Service }) {
  const serviceUrl = `${siteConfig.url}/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} | ${siteConfig.name}`,
    description: service.summary,
    url: serviceUrl,
    areaServed:
      siteConfig.serviceAreas.length > 0
        ? siteConfig.serviceAreas
        : siteConfig.serviceArea,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: service.title, item: serviceUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
