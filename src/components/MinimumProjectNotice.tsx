import { siteConfig } from "@/lib/site-config";

interface MinimumProjectNoticeProps {
  /** "full" states the policy and why it exists — use once or twice sitewide.
   *  "compact" is a one-line disclosure for repeated placements near CTAs. */
  variant?: "full" | "compact";
  /** Bolds the dollar figure in the compact variant — for the one placement
   *  (Request Service page) where the policy needs to be clearly visible at
   *  a glance rather than read as a quiet footnote. Tasteful, not oversized. */
  emphasize?: boolean;
  className?: string;
}

/**
 * Shared minimum-project-investment notice, sourced from
 * siteConfig.largeProjectCrew.minimumProject so the figure only needs to
 * change in one place. Worded matter-of-factly — no exclusionary language.
 */
export default function MinimumProjectNotice({
  variant = "compact",
  emphasize = false,
  className,
}: MinimumProjectNoticeProps) {
  const amount = siteConfig.largeProjectCrew.minimumProject.toLocaleString("en-US");

  if (variant === "full") {
    return (
      <div className={`rounded-2xl border border-black/10 bg-white p-6 shadow-sm ${className ?? ""}`.trim()}>
        <p className="font-bold text-forest">Minimum Project Investment: ${amount}</p>
        <p className="mt-2 text-sm text-foreground/70">
          On-site estimates are free. JKE Tree & Crane specializes in
          professional, equipment-supported tree work, and our ${amount}{" "}
          minimum project investment helps ensure that every scheduled
          project receives the appropriate crew, equipment, transportation,
          preparation, and level of service required to complete the work
          safely and efficiently. The minimum applies only to accepted and
          scheduled projects, not to the estimate itself.
        </p>
      </div>
    );
  }

  // emphasize gets its own softly-shaded, bordered box rather than just
  // bolder inline text — this notice needs to read at a glance on the
  // request form, but a forest-tinted card (not red/yellow) keeps the tone
  // informational rather than alarm- or penalty-styled.
  if (emphasize) {
    return (
      <div
        className={`rounded-xl border border-forest/20 bg-forest/5 px-4 py-3 ${className ?? ""}`.trim()}
      >
        <p className="text-sm text-foreground/80">
          Free on-site estimates. Accepted projects are subject to a{" "}
          <strong className="font-bold text-forest">${amount} minimum project investment</strong>.
        </p>
      </div>
    );
  }

  return (
    <p className={`text-sm text-foreground/60 ${className ?? ""}`.trim()}>
      Free on-site estimates. Accepted projects are subject to a ${amount} minimum.
    </p>
  );
}
