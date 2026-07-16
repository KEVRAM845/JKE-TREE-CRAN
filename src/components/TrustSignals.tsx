import type { ReactElement } from "react";
import { siteConfig } from "@/lib/site-config";

interface TrustSignalsProps {
  /** Use on dark (forest) backgrounds. */
  onDark?: boolean;
  className?: string;
}

const iconProps = {
  className: "h-6 w-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * A focused, 4-item trust row distinct from the homepage <TrustBar> — used
 * selectively on high-value pages (About, Large Project Crew, Request
 * Service) rather than everywhere, so it reads as credible rather than
 * repetitive. "Licensed & Insured" only appears once both are confirmed in
 * siteConfig.credentials; the rest are already-established, non-regulated
 * claims made throughout the site.
 */
export default function TrustSignals({ onDark = false, className }: TrustSignalsProps) {
  const { credentials } = siteConfig;

  const items = [
    credentials.licensed &&
      credentials.insured && {
        label: "Licensed & Insured",
        icon: (
          <svg {...iconProps}>
            <path d="M12 21c5-1.5 8-5 8-9.5V5.5L12 3 4 5.5v6c0 4.5 3 8 8 9.5Z" />
            <path d="m9 11.5 2 2 4-4.5" />
          </svg>
        ),
      },
    {
      label: "Experienced Crew",
      icon: (
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
        </svg>
      ),
    },
    {
      label: "Specialized Equipment",
      icon: (
        <svg {...iconProps}>
          <path d="M3 20h18" />
          <path d="M6 20V8l3-3 12 4" />
          <path d="M9 5v4" />
          <path d="M14 6.5V11" />
        </svg>
      ),
    },
    {
      label: "Free Estimates",
      icon: (
        <svg {...iconProps}>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      ),
    },
  ].filter((item): item is { label: string; icon: ReactElement } => Boolean(item));

  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(var(--trust-cols),minmax(0,1fr))] ${className ?? ""}`.trim()}
      style={{ "--trust-cols": items.length } as React.CSSProperties}
    >
      {items.map((item, index) => (
        <li
          key={item.label}
          className={`flex flex-col items-center gap-2 text-center ${
            items.length % 2 === 1 && index === items.length - 1 ? "col-span-2 sm:col-span-1" : ""
          }`}
        >
          <span
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
              onDark ? "bg-white/10 text-orange-light" : "bg-forest/5 text-forest"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-sm font-semibold leading-tight ${onDark ? "text-white" : "text-forest"}`}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
