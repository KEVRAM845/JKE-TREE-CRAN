import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SlideIn } from "@/components/motion/SlideIn";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudy45Min } from "@/lib/media";
import { CASE_STUDY_ID } from "@/components/sections/CaseStudy45Min";

const before = caseStudy45Min[0];
const after = caseStudy45Min[caseStudy45Min.length - 1];

/**
 * Concise homepage teaser for the full 45-Minute Case Study, which lives on
 * the Gallery page. Two static poster frames (before/after) instead of an
 * autoplaying reel — enough to communicate the story without duplicating the
 * full interactive timeline on the homepage.
 */
export default function CaseStudyPreview() {
  return (
    <Section tone="muted">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <SlideIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            A Real Project, Start to Finish
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">
            45-Minute Tree Project: Before, During &amp; After
          </h2>
          <p className="mt-4 text-foreground/70">
            A complete look at a real JKE Tree &amp; Crane job — from the
            original site condition through active work and final cleanup.
          </p>
          <p className="mt-3 text-sm text-foreground/60">
            Project duration varies based on tree size, condition, property
            access, terrain, weather, and the approved scope of work.
          </p>
          <ButtonLink href={`/gallery#${CASE_STUDY_ID}`} variant="outline" className="mt-6">
            View Full Project
          </ButtonLink>
        </SlideIn>
        <SlideIn className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-md">
            <Image
              src={before.video.poster}
              alt={before.video.alt}
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
              Before
            </span>
          </div>
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-md">
            <Image
              src={after.video.poster}
              alt={after.video.alt}
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-cover"
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-white">
              After
            </span>
          </div>
        </SlideIn>
      </div>
    </Section>
  );
}
