import { useId } from "react";

/** Accessible star rating. Presentational — value comes from real data. */
export default function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;
  // Unique per instance — without this, multiple StarRating components on
  // one page (e.g. several review cards) would emit duplicate SVG <linearGradient>
  // ids, and url(#half-N) references would all resolve to the first one in the DOM.
  const uid = useId();
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className ?? ""}`.trim()}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = rounded >= i ? "full" : rounded >= i - 0.5 ? "half" : "empty";
        return (
          <svg
            key={i}
            className="h-4 w-4 text-orange"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`half-${uid}-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
              fill={
                fill === "full"
                  ? "currentColor"
                  : fill === "half"
                    ? `url(#half-${uid}-${i})`
                    : "transparent"
              }
              stroke="currentColor"
              strokeWidth={1.3}
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
}
