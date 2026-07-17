import MediaVideo from "@/components/MediaVideo";
import type { VideoAsset } from "@/lib/media";

interface FeaturedVideoProps {
  title: string;
  caption: string;
  video: VideoAsset;
  onDark?: boolean;
  className?: string;
}

/**
 * Prominent single-video callout — a heading + caption beside (desktop) or
 * above (mobile) a large portrait video frame. Reuses <MediaVideo> for actual
 * playback behavior (muted, looped, poster-backed, scroll-triggered, reduced
 * -motion aware) so every video on the site behaves identically; this
 * component only adds the "featured" framing and copy around it.
 */
export default function FeaturedVideo({
  title,
  caption,
  video,
  onDark = false,
  className,
}: FeaturedVideoProps) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 md:items-center ${className ?? ""}`.trim()}>
      <div className={onDark ? "text-white" : ""}>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className={`mt-3 ${onDark ? "text-white/70" : "text-foreground/70"}`}>
          {caption}
        </p>
      </div>
      <div className="relative mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl shadow-xl md:max-w-sm">
        <MediaVideo
          src={video.src}
          poster={video.poster}
          label={video.alt}
          focalPosition={video.focalPosition}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
