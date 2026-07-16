import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// Persistent tap-to-call + estimate bar shown on mobile and tablet, where a
// service business needs one-tap contact. Hidden at lg+ (the header shows
// its own phone button there instead) — matches the breakpoint where
// Header switches from its hamburger menu to the full inline nav, so there's
// no width range where neither one is visible.
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-black/10 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.1)] lg:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-forest px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-forest-light active:bg-forest-light"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 5.5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.2a1.5 1.5 0 0 0-1.2-1.47l-3-.6a1.5 1.5 0 0 0-1.5.66l-.7 1.05a11.5 11.5 0 0 1-5-5l1.05-.7a1.5 1.5 0 0 0 .66-1.5l-.6-3A1.5 1.5 0 0 0 6.7 3.5H4.5a2 2 0 0 0-2 2Z" />
        </svg>
        Call Now
      </a>
      <Link
        href="/request-service"
        className="flex flex-1 items-center justify-center gap-2 bg-orange px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-strong active:bg-orange-strong"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
        Free Estimate
      </Link>
    </div>
  );
}
