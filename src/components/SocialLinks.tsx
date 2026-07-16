import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

const labels: Record<string, string> = {
  google: "Google",
  facebook: "Facebook",
  instagram: "Instagram",
};

const icons: Record<string, ReactNode> = {
  google: (
    <path d="M21.35 11.1H12v3.8h5.35c-.25 1.4-1.7 4.1-5.35 4.1a5.9 5.9 0 0 1 0-11.8c1.7 0 2.85.72 3.5 1.34l2.4-2.3A9.4 9.4 0 0 0 12 2.6a9.4 9.4 0 1 0 0 18.8c5.42 0 9-3.8 9-9.15 0-.62-.07-1.1-.15-1.55Z" />
  ),
  facebook: (
    <path d="M14 9h3V5.5h-3c-2.2 0-3.7 1.6-3.7 3.9V11H8v3.5h2.3V22H14v-7.5h2.6l.5-3.5H14V9.6c0-.4.3-.6.9-.6Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Renders only the social links that are set in siteConfig; hidden otherwise. */
export default function SocialLinks({ className }: { className?: string }) {
  const entries = Object.entries(siteConfig.social).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );
  if (entries.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`.trim()}>
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels[key] ?? key}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill={key === "instagram" ? "none" : "currentColor"}
            stroke={key === "instagram" ? "currentColor" : "none"}
            strokeWidth={key === "instagram" ? 1.7 : undefined}
            aria-hidden="true"
          >
            {icons[key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
