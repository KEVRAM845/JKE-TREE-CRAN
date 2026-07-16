import { siteConfig } from "@/lib/site-config";
import { heroImage } from "@/lib/media";

/**
 * LocalBusiness structured data for local SEO / rich results. Every optional
 * block (address, geo, hours, ratings, reviews, social) is included only when
 * real data exists in siteConfig — nothing is invented.
 */
export default function LocalBusinessJsonLd() {
  const s = siteConfig;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: s.name,
    legalName: s.legalName,
    description: s.tagline,
    url: s.url,
    telephone: s.phone,
    email: s.email,
    image: `${s.url}${heroImage.src}`,
    areaServed:
      s.serviceAreas.length > 0 ? s.serviceAreas : s.serviceArea,
  };

  if (s.credentials.showUsdot && s.usdot) {
    schema.identifier = {
      "@type": "PropertyValue",
      propertyID: "USDOT",
      value: s.usdot,
    };
  }

  if (s.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressRegion: s.address.state,
      postalCode: s.address.zip,
      addressCountry: "US",
    };
  }

  if (s.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: s.geo.latitude,
      longitude: s.geo.longitude,
    };
  }

  if (s.hours.length > 0) {
    schema.openingHoursSpecification = s.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  if (s.reviews.aggregate) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: s.reviews.aggregate.rating,
      reviewCount: s.reviews.aggregate.count,
    };
  }

  if (s.reviews.items.length > 0) {
    schema.review = s.reviews.items.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    }));
  }

  const sameAs = [s.social.google, s.social.facebook, s.social.instagram].filter(
    (link): link is string => Boolean(link),
  );
  if (sameAs.length > 0) schema.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no field value (e.g. a future free-text review) could
      // break out of the script tag via "</script>" or similar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
