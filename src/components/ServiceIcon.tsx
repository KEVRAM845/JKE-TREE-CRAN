import type { ReactNode, SVGProps } from "react";

// Minimal line icons keyed by service slug. Stroke-based so they inherit
// currentColor and stay crisp at any size (no raster, no dependency).
const paths: Record<string, ReactNode> = {
  "tree-removal": (
    <>
      <path d="M12 22v-6" />
      <path d="M12 16c-3.5 0-6-2.4-6-5.5C6 7 8.5 3 12 3s6 4 6 7.5c0 3.1-2.5 5.5-6 5.5Z" />
      <path d="M9 19h6" />
    </>
  ),
  "tree-trimming-pruning": (
    <>
      <path d="M14.5 4.5 20 10" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.7 5 20 14M8.5 16 15 11" />
    </>
  ),
  "stump-grinding": (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  "crane-bucket-truck-service": (
    <>
      <path d="M3 20h18" />
      <path d="M6 20V8l3-3 12 4" />
      <path d="M9 5v4" />
      <path d="M14 6.5V11" />
    </>
  ),
  "land-clearing-logging": (
    <>
      <path d="M4 20h16" />
      <path d="M7 20V9M11 20V6M15 20v-8M19 20v-5" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  ...props
}: { slug: string } & SVGProps<SVGSVGElement>) {
  const icon = paths[slug];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {icon}
    </svg>
  );
}
