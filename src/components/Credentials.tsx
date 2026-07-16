import { siteConfig } from "@/lib/site-config";

interface CredentialsProps {
  /** "cards" = pill badges for light sections; "row" = inline list (e.g. footer). */
  variant?: "cards" | "row";
  /** Use on dark (forest) backgrounds. */
  onDark?: boolean;
  className?: string;
}

/**
 * Data-driven credentials. Every badge is derived from siteConfig; anything
 * without real data is omitted, and if nothing qualifies the component renders
 * nothing at all. No claims are hard-coded here.
 */
export default function Credentials({
  variant = "cards",
  onDark = false,
  className,
}: CredentialsProps) {
  const c = siteConfig.credentials;
  const items: string[] = [];

  if (c.licensed && c.insured && !c.licenseNumber) {
    // Combined into one item when both are true and there's no license
    // number to show — avoids two near-duplicate pills.
    items.push("Licensed & Insured");
  } else {
    if (c.licensed) {
      items.push(c.licenseNumber ? `Licensed #${c.licenseNumber}` : "Licensed");
    }
    if (c.insured) items.push("Fully Insured");
  }
  if (c.locallyOwned) items.push("Locally Owned & Operated");
  if (c.showUsdot && siteConfig.usdot) items.push(`USDOT #${siteConfig.usdot}`);
  if (c.yearEstablished) items.push(`Established ${c.yearEstablished}`);
  for (const cert of c.certifications) items.push(cert);

  if (items.length === 0) return null;

  if (variant === "row") {
    return (
      <ul
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${
          onDark ? "text-white/60" : "text-foreground/60"
        } ${className ?? ""}`.trim()}
      >
        {items.map((item, index) => (
          <li key={item} className="flex items-center gap-3">
            {index > 0 && (
              <span aria-hidden="true" className="opacity-40">
                &middot;
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap gap-2.5 ${className ?? ""}`.trim()}>
      {items.map((item) => (
        <li
          key={item}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${
            onDark
              ? "bg-white/10 text-white"
              : "border border-forest/15 bg-forest/5 text-forest"
          }`}
        >
          <svg
            className="h-4 w-4 text-orange"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
