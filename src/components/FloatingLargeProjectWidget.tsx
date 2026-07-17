"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/components/motion/useHasMounted";
import { focusAndHighlightSection } from "@/lib/scrollToSection";

const SECTION_ID = "large-project-crew";

// Desktop-only collision list — anything a visitor could read or interact
// with; if any of these physically overlap the desktop icon's rectangle, it
// hides rather than sit on top of it. Checked against live elements
// (re-queried on every scroll tick, not captured once at mount) because
// several sections on this site render a plain wrapper on first paint and
// swap to a motion-animated one a moment after mount (see SlideIn /
// StaggerItem) — a reference captured too early would go stale the instant
// that swap happens.
//
// Mobile does NOT use this — the mobile pill stays visible at all times by
// design (client-review direction: a fixed CTA should never disappear or
// collapse unpredictably on mobile), so this collision check only runs at
// the desktop breakpoint. See useDesktopHidden below.
const OVERLAP_SELECTOR = [
  'a[href], button, input, select, textarea, video, [role="button"], [role="group"]',
  "footer",
  "#large-project-crew",
  "#case-study-45-min",
  "#all-projects",
  "form",
].join(", ");

// Matches the site's `lg:` breakpoint, which is where this component's own
// classNames already switch from the mobile pill to the desktop circle.
const DESKTOP_BREAKPOINT = 1024;

function rectsIntersect(a: DOMRect, b: DOMRect) {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

// Desktop-only: hides the icon completely when it would overlap real
// content. Always false below the desktop breakpoint — mobile has no
// collision-based hide behavior at all.
function useDesktopHidden(widgetRef: React.RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId = 0;

    function check() {
      const widget = widgetRef.current;
      if (!widget) return;

      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        setHidden(false);
        return;
      }

      const widgetRect = widget.getBoundingClientRect();
      if (widgetRect.width === 0) return;

      const candidates = document.querySelectorAll(OVERLAP_SELECTOR);
      let overlaps = false;
      for (const el of candidates) {
        if (el === widget || widget.contains(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        // Content inside a closed <details> (e.g. the assessment accordion)
        // can still report a non-zero rect in current Chrome — collapsed
        // <details> content hides via content-visibility rather than
        // display:none, which getBoundingClientRect() alone doesn't zero
        // out. checkVisibility() catches that (and display:none/
        // visibility:hidden) in one call; elements too old to support it
        // just skip the extra check rather than break.
        if ("checkVisibility" in el && !el.checkVisibility()) continue;
        if (rectsIntersect(widgetRect, rect)) {
          overlaps = true;
          break;
        }
      }
      setHidden(overlaps);
    }

    function scheduleCheck() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    }

    check();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    // Catches layout shifts a scroll/resize listener wouldn't see on its own
    // — e.g. the SlideIn/StaggerItem post-mount swap mentioned above, video
    // posters loading in, or Framer Motion reveal animations settling.
    const intervalId = window.setInterval(check, 400);

    return () => {
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      window.clearInterval(intervalId);
      cancelAnimationFrame(rafId);
    };
  }, [pathname, widgetRef]);

  return hidden;
}

const IDLE_DELAY_MS = 2500;
const RESET_EVENTS = ["scroll", "touchstart", "pointerdown", "mousemove", "focusin"] as const;

// Mobile-only "fade when idle" — after a couple of seconds with no activity
// the pill settles back to a 65%-opacity floor so it reads as present but
// doesn't compete with page content; it never goes any lower and never
// disappears. Any renewed activity (tap, scroll, focus, pointer movement)
// or a route change brings it back to full opacity immediately. Desktop
// ignores this entirely (see the lg:opacity-100 override where it's used).
function useIdleFade(pathname: string) {
  const [idle, setIdle] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    function resetIdle() {
      setIdle(false);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIdle(true), IDLE_DELAY_MS);
    }

    resetIdle();
    for (const event of RESET_EVENTS) {
      window.addEventListener(event, resetIdle, { passive: true });
    }
    return () => {
      window.clearTimeout(timeoutRef.current);
      for (const event of RESET_EVENTS) {
        window.removeEventListener(event, resetIdle);
      }
    };
    // Re-running on pathname change resets to full opacity on every route
    // change, in addition to the interaction-based resets above.
  }, [pathname]);

  return idle;
}

const clipboardCheckIcon = (
  <svg
    className="h-5 w-5 flex-shrink-0 lg:h-6 lg:w-6"
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
// Large Project Daily Crew section, on this page or any other.
//
// Mobile: a rounded pill with the clipboard icon and "Large Project?" label,
// always visible — it only fades to a 65% floor after a couple of idle
// seconds, never collapses to an icon, and never disappears.
// Desktop: unchanged — a compact 56px icon-only circle, no idle-fade, hides
// completely the instant its rectangle would overlap real page content.
export default function FloatingLargeProjectWidget() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();
  const isHomepage = pathname === "/";
  const widgetRef = useRef<HTMLElement | null>(null);
  const setWidgetRef = (el: HTMLElement | null) => {
    widgetRef.current = el;
  };
  const hidden = useDesktopHidden(widgetRef);
  const idle = useIdleFade(pathname);

  const label = "View Large Project Daily Crew";

  const opacityClassName = hidden
    ? "pointer-events-none opacity-0"
    : idle
      ? "opacity-[0.65] lg:opacity-100"
      : "opacity-100";

  // Gated on hasMounted, not just shouldReduceMotion directly: Framer
  // Motion's hook resolves the real media query as soon as it can on the
  // client, which can differ from the server's un-informed default on the
  // very first render — branching on it unguarded here would make this
  // className disagree between server and client and trip a hydration
  // mismatch. hasMounted is false for that first render on both sides, so
  // it always falls through to the same branch there.
  const transitionClassName =
    hasMounted && shouldReduceMotion
      ? "transition-none"
      : "transition-[background-color,transform,box-shadow,opacity] duration-200 ease-premium";

  const sharedClassName = `fixed bottom-20 right-4 z-40 flex min-h-[44px] items-center gap-2 rounded-full bg-orange px-4 py-3 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 hover:bg-orange-strong hover:shadow-xl active:translate-y-0 active:scale-[0.98] active:duration-100 lg:bottom-96 lg:right-6 lg:h-14 lg:w-14 lg:justify-center lg:px-0 lg:py-0 ${transitionClassName} ${opacityClassName}`;

  const content = (
    <>
      {clipboardCheckIcon}
      <span className="lg:hidden">Large Project?</span>
    </>
  );

  if (isHomepage) {
    return (
      <button
        ref={setWidgetRef}
        type="button"
        aria-label={label}
        title={label}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        onClick={() => focusAndHighlightSection(SECTION_ID, Boolean(shouldReduceMotion))}
        className={sharedClassName}
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
      ref={setWidgetRef}
      href={`/#${SECTION_ID}`}
      aria-label={label}
      title={label}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={sharedClassName}
    >
      {content}
    </Link>
  );
}
