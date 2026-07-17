import { siteConfig } from "@/lib/site-config";

interface ServiceAreaMapProps {
  /** Overrides the default "Areas We Serve" heading — e.g. for a service
   *  page where a more specific heading reads better. */
  heading?: string;
  className?: string;
}

/**
 * Single reusable "where we work" block: a lazy-loaded map centered on
 * siteConfig.serviceAreaMap.focusLocation (the business's primary service
 * focus, not necessarily the mailing address), an "Open in Google Maps"
 * link, and a hand-written service-area paragraph. Update the location or
 * copy once here and every placement of this component updates together.
 */
export default function ServiceAreaMap({ heading = "Areas We Serve", className }: ServiceAreaMapProps) {
  const focus = siteConfig.serviceAreaMap.focusLocation;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(focus)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(focus)}&output=embed`;

  return (
    <div className={className}>
      <h2 className="text-xl font-bold text-forest">{heading}</h2>
      <p className="mt-2 max-w-2xl text-foreground/70">
        Serving customers throughout Orange and Dutchess Counties, including
        Middletown, Goshen, Chester, Monroe, Warwick, Montgomery, New
        Windsor, Newburgh, Wallkill, Pine Bush, Washingtonville, Beacon,
        Fishkill, East Fishkill, Hopewell Junction, Wappingers Falls,
        Poughkeepsie, LaGrange, Pleasant Valley, Hyde Park, Pawling,
        Millbrook, and surrounding communities.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 md:items-start">
        {/* Fixed aspect ratio reserves the space up front — no layout shift
            once the iframe loads. loading="lazy" keeps it out of the initial
            page weight until it's actually scrolled into view. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.04] shadow-sm">
          <iframe
            title={`Map of the area JKE Tree & Crane serves: ${focus}`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-foreground/70">
            Located nearby but not listed? Contact us to confirm availability
            for your property.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-forest text-forest px-5 py-2.5 text-sm font-semibold transition-[background-color,color,transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-forest hover:text-white hover:shadow-md active:translate-y-0 active:scale-[0.98] active:duration-100"
          >
            Open in Google Maps
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
