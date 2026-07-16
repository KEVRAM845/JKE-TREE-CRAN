import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

interface TrustPoint {
  label: string;
  icon: ReactNode;
  /** Regulated claims are shown only once confirmed in siteConfig. */
  show: boolean;
}

const iconProps = {
  className: "h-7 w-7",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function TrustBar() {
  const { credentials } = siteConfig;

  const trustPoints: TrustPoint[] = [
    {
      label: "Licensed",
      show: credentials.licensed,
      icon: (
        <svg {...iconProps}>
          <path d="m9 12.75 2.25 2.25 3.75-4.5" />
          <path d="M12 3 4.5 6v5c0 4.2 3 7.5 7.5 9 4.5-1.5 7.5-4.8 7.5-9V6L12 3Z" />
        </svg>
      ),
    },
    {
      label: "Insured",
      show: credentials.insured,
      icon: (
        <svg {...iconProps}>
          <path d="M12 21c5-1.5 8-5 8-9.5V5.5L12 3 4 5.5v6c0 4.5 3 8 8 9.5Z" />
          <path d="m9 11.5 2 2 4-4.5" />
        </svg>
      ),
    },
    {
      label: "Free Estimates",
      show: true,
      icon: (
        <svg {...iconProps}>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      ),
    },
    {
      label: "24/7 Emergency Service",
      show: true,
      icon: (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
    },
    // Already an established claim made throughout the site (service bullets,
    // "What to Expect" lists) — repeated here as a trust point, not a new one.
    {
      label: "Full Cleanup, Every Job",
      show: true,
      icon: (
        <svg {...iconProps}>
          <path d="M4 20 14 10" />
          <path d="M13 5.5 18.5 11 16 13.5 10.5 8Z" />
          <path d="m16.5 4.5 3 3" />
        </svg>
      ),
    },
    {
      label: "Locally Owned",
      show: credentials.locallyOwned,
      icon: (
        <svg {...iconProps}>
          <path d="M12 21s7-5.2 7-10.5A7 7 0 0 0 5 10.5C5 15.8 12 21 12 21Z" />
          <circle cx="12" cy="10.5" r="2.5" />
        </svg>
      ),
    },
  ].filter((point) => point.show);

  if (trustPoints.length === 0) return null;

  // Center a lone trailing item on the 2-col mobile grid; the desktop column
  // count tracks however many points are actually confirmed, so the bar
  // never shows empty/misaligned columns as credentials.* changes.
  const centerLastOnMobile = trustPoints.length % 2 === 1;

  return (
    <section className="border-b border-black/10 bg-forest" aria-label="Why homeowners trust us">
      <ul
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-7 px-4 py-8 sm:grid-cols-[repeat(var(--trust-cols),minmax(0,1fr))] sm:px-6"
        style={{ "--trust-cols": trustPoints.length } as React.CSSProperties}
      >
        {trustPoints.map((point, index) => (
          <li
            key={point.label}
            className={`flex flex-col items-center gap-2 text-center ${
              centerLastOnMobile && index === trustPoints.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <span className="text-orange-light">{point.icon}</span>
            <span className="text-sm font-semibold leading-tight text-white">
              {point.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
