import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import StarRating from "@/components/StarRating";
import { siteConfig } from "@/lib/site-config";

/**
 * Social proof. Renders nothing until real reviews (or a real aggregate rating)
 * are added to siteConfig — never fabricates authors, text, or ratings.
 */
export default function Reviews() {
  const { aggregate, items } = siteConfig.reviews;

  if (items.length === 0 && !aggregate) return null;

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Reviews"
        title="What our customers say"
        subtitle={`Real feedback from homeowners across ${siteConfig.serviceArea}.`}
      />

      {aggregate && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StarRating rating={aggregate.rating} />
          <span className="text-sm font-semibold text-forest">
            {aggregate.rating.toFixed(1)} / 5
          </span>
          <span className="text-sm text-foreground/70">
            from {aggregate.count} review{aggregate.count === 1 ? "" : "s"}
          </span>
          {aggregate.url && (
            <a
              href={aggregate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-orange hover:text-orange-strong"
            >
              Read them on Google &rarr;
            </a>
          )}
        </div>
      )}

      {items.length > 0 && (
        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((review, index) => (
            <StaggerItem key={`${review.author}-${index}`} index={index}>
              <figure className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <StarRating rating={review.rating} />
                <blockquote className="mt-3 flex-1 text-foreground/80">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-forest">
                  {review.author}
                  {review.source && (
                    <span className="font-normal text-foreground/60">
                      {" "}
                      &middot; {review.source}
                    </span>
                  )}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </Section>
  );
}
