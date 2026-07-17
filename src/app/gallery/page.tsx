import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import CaseStudy45Min from "@/components/sections/CaseStudy45Min";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Real photos and video from JKE Tree & Crane jobs — tree removal, crane work, stump grinding, land clearing, and storm response.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-forest sm:text-4xl">
        Project Gallery
      </h1>
      <p className="mt-2 max-w-2xl text-foreground/70">
        Real photos and video from our crews on real jobs across{" "}
        {siteConfig.serviceArea}. Filter by the type of work below.
      </p>
      <div className="mt-12 border-t border-black/10 pt-12">
        <CaseStudy45Min />
      </div>

      <div id="all-projects" className="mt-16 border-t border-black/10 pt-12">
        <h2 className="text-2xl font-bold text-forest">All Projects</h2>
        <GalleryGrid />
      </div>
    </section>
  );
}
