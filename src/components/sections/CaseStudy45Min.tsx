"use client";

import { useRef, useState } from "react";
import { SlideIn } from "@/components/motion/SlideIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { caseStudy45Min } from "@/lib/media";

export const CASE_STUDY_ID = "case-study-45-min";

const snapshotPoints = [
  "Approximate project time: 45 minutes",
  "Residential property",
  "Professional crew",
  "Equipment-supported work",
  "Cleanup completed within the agreed scope",
  "Real JKE Tree & Crane project",
];

function PlayIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

/**
 * Full 45-Minute Case Study — a real four-stage residential job (Before,
 * Work Begins, Progress, Completed). Each stage is a user-initiated video
 * (no autoplay reel here — this is a narrative sequence, not ambient
 * background footage) and starting one pauses whichever other stage is
 * currently playing, so at most one plays at a time.
 */
export default function CaseStudy45Min() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  function handlePlay(index: number) {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
    setPlayingIndex(index);
    const target = videoRefs.current[index];
    if (target) {
      void target.play().catch(() => {
        /* autoplay/play can be blocked; controls remain available */
      });
    }
  }

  return (
    <section id={CASE_STUDY_ID} className="scroll-mt-20">
      <SlideIn className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">
          A Real Project, Start to Finish
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">
          45-Minute Tree Project: Before, During &amp; After
        </h2>
        <p className="mt-2 text-lg text-foreground/70">Watch a Real JKE Project from Start to Finish</p>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          This project provides a complete look at a real JKE Tree &amp;
          Crane job — from the original site condition through active work
          and final cleanup. It highlights the planning, equipment,
          coordination, and attention to detail involved in completing a
          smaller residential project efficiently.
        </p>
      </SlideIn>

      <StaggerContainer className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        {caseStudy45Min.map((entry, index) => {
          const isPlaying = playingIndex === index;
          return (
            <StaggerItem key={entry.video.src} index={index} className="w-64 shrink-0 snap-start md:w-auto">
              <div className="relative">
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white shadow">
                  {index + 1}. {entry.stage}
                </span>
                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black/[0.04] shadow-md">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    poster={entry.video.poster}
                    muted
                    playsInline
                    preload="none"
                    controls={isPlaying}
                    aria-label={entry.video.alt}
                    className="h-full w-full object-cover"
                    onPause={() => setPlayingIndex((current) => (current === index ? null : current))}
                    onEnded={() => setPlayingIndex((current) => (current === index ? null : current))}
                  >
                    <source src={entry.video.src} type="video/mp4" />
                  </video>
                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={() => handlePlay(index)}
                      aria-label={`Play: ${entry.title} — ${entry.video.alt}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition-colors hover:bg-black/30"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-forest shadow-lg transition-transform duration-200 ease-premium hover:scale-105">
                        <PlayIcon />
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <h3 className="mt-3 font-bold text-forest">{entry.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{entry.caption}</p>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <SlideIn className="mt-10 grid gap-6 md:grid-cols-[2fr,1fr] md:items-start">
        <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-foreground/70 shadow-sm">
          Project duration varies based on tree size, condition, property
          access, terrain, weather, safety requirements, cleanup needs, and
          the approved scope of work.
        </div>
        <div className="rounded-2xl border border-black/10 bg-forest/5 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-forest">
            Project Snapshot
          </p>
          <ul className="mt-3 space-y-2">
            {snapshotPoints.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-foreground/80">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </SlideIn>
    </section>
  );
}
