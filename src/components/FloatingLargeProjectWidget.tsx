"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { focusAndHighlightSection } from "@/lib/scrollToSection";

const SECTION_ID = "large-project-crew";

const clipboardCheckIcon = (
  <svg
    className="h-5 w-5 flex-shrink-0"
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
    <path d="m9 13.5 2 2 4-4.5" />
  </svg>
);

// Separate, orange-accented widget distinct from FloatingContactWidget (which
// stays forest-colored) — this one's sole job is getting a visitor to the
// Large Project Daily Crew section, on this page or any other. Positioned
// well above FloatingContactWidget's fully-expanded height on desktop, and
// above MobileCallBar on mobile/tablet, so neither ever overlaps the other.
export default function FloatingLargeProjectWidget() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHomepage = pathname === "/";

  const label = "View Large Project Daily Crew information";

  const content = (
    <>
      {clipboardCheckIcon}
      <span className="lg:hidden">Large Project?</span>
      <span className="hidden lg:inline">Planning a Large Project?</span>
    </>
  );

  const sharedClassName =
    "flex min-h-[44px] items-center gap-2 rounded-full bg-orange px-4 py-3 text-sm font-semibold text-white shadow-lg transition-[background-color,transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-orange-strong hover:shadow-xl active:translate-y-0 active:scale-[0.98] active:duration-100 lg:px-5";

  if (isHomepage) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={() => focusAndHighlightSection(SECTION_ID, Boolean(shouldReduceMotion))}
        className={`fixed bottom-20 right-4 z-40 lg:bottom-96 lg:right-6 ${sharedClassName}`}
      >
        {content}
      </button>
    );
  }

  // On any other route, this is a real link to the homepage section — works
  // without JS, and the browser's native hash-scroll plus
  // LargeProjectCrew's own mount effect handle focus/highlight on arrival.
  return (
    <Link
      href={`/#${SECTION_ID}`}
      aria-label={label}
      className={`fixed bottom-20 right-4 z-40 lg:bottom-96 lg:right-6 ${sharedClassName}`}
    >
      {content}
    </Link>
  );
}
