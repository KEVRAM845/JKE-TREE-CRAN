import { siteConfig } from "@/lib/site-config";

interface MinimumProjectNoticeProps {
  /** "full" states the policy and why it exists — use once or twice sitewide.
   *  "compact" is a one-line disclosure for repeated placements near CTAs. */
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Shared minimum-project-investment notice, sourced from
 * siteConfig.largeProjectCrew.minimumProject so the figure only needs to
 * change in one place. Worded matter-of-factly — no exclusionary language.
 */
export default function MinimumProjectNotice({
  variant = "compact",
  className,
}: MinimumProjectNoticeProps) {
  const amount = siteConfig.largeProjectCrew.minimumProject.toLocaleString("en-US");

  if (variant === "full") {
    return (
      <div className={`rounded-2xl border border-black/10 bg-white p-6 shadow-sm ${className ?? ""}`.trim()}>
        <p className="font-bold text-forest">Minimum Project Investment: ${amount}</p>
        <p className="mt-2 text-sm text-foreground/70">
          JKE Tree & Crane specializes in professional, equipment-supported
          tree work. Our ${amount} minimum project investment helps ensure
          that every scheduled project receives the appropriate crew,
          equipment, transportation, preparation, and level of service
          required to complete the work safely and efficiently.
        </p>
      </div>
    );
  }

  return (
    <p className={`text-sm text-foreground/60 ${className ?? ""}`.trim()}>
      Projects are subject to a ${amount} minimum investment so we can
      provide the experienced crew, specialized equipment, and professional
      service each job requires.
    </p>
  );
}
