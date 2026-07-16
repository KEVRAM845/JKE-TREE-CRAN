import MediaVideo from "@/components/MediaVideo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { actionVideos } from "@/lib/media";

export default function VideoReel() {
  return (
    <Section tone="muted">
      <SectionHeading
        title="See Us In Action"
        subtitle="Real footage from recent jobs — no stock, no staging."
      />

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {actionVideos.map((video) => (
          <div key={video.src} className="w-64 shrink-0 snap-start md:w-auto">
            <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl shadow-md transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-xl">
              <MediaVideo
                src={video.src}
                poster={video.poster}
                label={video.alt}
                className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
