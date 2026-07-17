"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/components/motion/useHasMounted";
import { focusAndHighlightSection } from "@/lib/scrollToSection";

const SECTION_ID = "large-project-crew";

// Anything a visitor could read or interact with — if any of these physically
// overlap the widget's own on-screen rectangle, the widget reacts rather than
// sit on top of it. Checked against live elements (re-queried on every scroll
// tick, not captured once at mount) because several sections on this site
// render a plain wrapper on first paint and swap to a motion-animated one a
// moment after mount (see SlideIn / StaggerItem) — a reference captured too
// early would go stale the instant that swap happens.
//
// Two layers: generic interactive elements (catches any link/button/form
// control/video anywhere, automatically, with no per-section maintenance),
// plus a few explicitly named dense containers — footer, the Large Project
// section, the case-study timeline, the full project grid, and forms — that
// count as occupied for their *entire* footprint, not just their individual
// buttons, since those are the specific areas most likely to have readable
// content in the gaps between controls.
//
// This is also exactly what desktop uses (unchanged) — desktop has no
// smaller state to fall back to, so any overlap here just hides it.
const OVERLAP_SELECTOR = [
  'a[href], button, input, select, textarea, video, [role="button"], [role="group"]',
  "footer",
  "#large-project-crew",
  "#case-study-45-min",
  "#all-projects",
  "form",
].join(", ");

// Mobile gets a stricter list on top of the above: plain paragraphs,
// headings, accordions, maps, and images — content with no button/link/form
// role that the generic selector above wouldn't otherwise catch, but that a
// visitor could still be reading or looking at when the pill would land on
// top of it.
const MOBILE_OVERLAP_SELECTOR = [
  OVERLAP_SELECTOR,
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "details",
  "iframe",
  "img",
].join(", ");

// Matches the site's `lg:` breakpoint, which is where this component's own
// classNames already switch from the mobile pill to the desktop circle.
const DESKTOP_BREAKPOINT = 1024;

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function rectsIntersect(a: Rect, b: Rect) {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

function rectFromCorner(anchorRight: number, anchorBottom: number, width: number, height: number): Rect {
  return {
    left: anchorRight - width,
    right: anchorRight,
    top: anchorBottom - height,
    bottom: anchorBottom,
  };
}

// Content inside a closed <details> (e.g. the assessment accordion) can
// still report a non-zero rect in current Chrome — collapsed <details>
// content hides via content-visibility rather than display:none, which
// getBoundingClientRect() alone doesn't zero out. checkVisibility() catches
// that (and display:none/visibility:hidden) in one call; elements too old to
// support it just skip the extra check rather than break.
function anyOverlap(rect: Rect, candidates: NodeListOf<Element>, widget: Element) {
  for (const el of candidates) {
    if (el === widget || widget.contains(el)) continue;
    const elRect = el.getBoundingClientRect();
    if (elRect.width === 0 || elRect.height === 0) continue;
    if ("checkVisibility" in el && !(el as Element & { checkVisibility(): boolean }).checkVisibility()) continue;
    if (rectsIntersect(rect, elRect)) return true;
  }
  return false;
}

type WidgetMode = "full" | "collapsed" | "hidden";

// A candidate mode must win two checks in a row (roughly MODE_DEBOUNCE_MS
// apart) before it's actually applied, so a borderline scroll position
// doesn't flip the pill between states every frame.
const MODE_DEBOUNCE_MS = 150;
const COLLAPSED_SIZE = 48;
// Rough natural footprint of the full pill (icon + gap + "Large Project?" +
// padding), used only until the real size has been measured once — the
// pill's content never changes, so one real measurement is reused after that.
const FALLBACK_PILL_SIZE = { width: 172, height: 44 };

function useWidgetMode(widgetRef: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  const [mode, setMode] = useState<WidgetMode>("full");
  const modeRef = useRef<WidgetMode>(mode);
  const pillSizeRef = useRef<{ width: number; height: number } | null>(null);
  const pendingRef = useRef<{ mode: WidgetMode; since: number } | null>(null);

  useEffect(() => {
    let rafId = 0;

    function commitDesktop(next: WidgetMode) {
      pendingRef.current = null;
      if (next === modeRef.current) return;
      modeRef.current = next;
      setMode(next);
    }

    function commitMobile(next: WidgetMode) {
      if (next === modeRef.current) {
        pendingRef.current = null;
        return;
      }
      const now = performance.now();
      if (!pendingRef.current || pendingRef.current.mode !== next) {
        pendingRef.current = { mode: next, since: now };
        return;
      }
      if (now - pendingRef.current.since >= MODE_DEBOUNCE_MS) {
        pendingRef.current = null;
        modeRef.current = next;
        setMode(next);
      }
    }

    function check() {
      const widget = widgetRef.current;
      if (!widget) return;
      const widgetRect = widget.getBoundingClientRect();
      if (widgetRect.width === 0) return;

      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

      if (isDesktop) {
        const candidates = document.querySelectorAll(OVERLAP_SELECTOR);
        const overlaps = anyOverlap(widgetRect, candidates, widget);
        commitDesktop(overlaps ? "hidden" : "full");
        return;
      }

      // Cache the pill's real footprint the first time it's actually
      // rendered at full size, so later checks can test "would the full
      // pill fit here" analytically even while currently collapsed/hidden.
      if (modeRef.current === "full" && !pillSizeRef.current) {
        pillSizeRef.current = { width: widgetRect.width, height: widgetRect.height };
      }
      const pillSize = pillSizeRef.current ?? FALLBACK_PILL_SIZE;

      // Both states share the same fixed bottom-right anchor, so the
      // corner can be read off the widget's current rect regardless of
      // which mode is actually rendered right now.
      const anchorRight = widgetRect.right;
      const anchorBottom = widgetRect.bottom;
      const fullRect = rectFromCorner(anchorRight, anchorBottom, pillSize.width, pillSize.height);
      const collapsedRect = rectFromCorner(anchorRight, anchorBottom, COLLAPSED_SIZE, COLLAPSED_SIZE);

      const candidates = document.querySelectorAll(MOBILE_OVERLAP_SELECTOR);
      if (!anyOverlap(fullRect, candidates, widget)) {
        commitMobile("full");
      } else if (!anyOverlap(collapsedRect, candidates, widget)) {
        commitMobile("collapsed");
      } else {
        commitMobile("hidden");
      }
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

  return mode;
}

const IDLE_DELAY_MS = 2500;
const RESET_EVENTS = ["scroll", "touchstart", "pointerdown", "mousemove", "focusin"] as const;

// Mobile-only "fade when idle" — after a couple of seconds with no activity
// the pill settles back to ~50% opacity so it reads as present but doesn't
// compete with page content; any renewed activity (tap, scroll, focus,
// pointer movement) brings it back to full opacity immediately. Desktop
// ignores this entirely (see the lg:opacity-100 override where it's used).
function useIdleFade() {
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
  }, []);

  return idle;
}

const clipboardCheckIcon = (isCompact: boolean) => (
  <svg
    className={`flex-shrink-0 lg:h-6 lg:w-6 ${isCompact ? "h-6 w-6" : "h-5 w-5"}`}
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
// fading to ~50% opacity after a couple of idle seconds (never fully gone).
// If the pill would land on top of readable content, it first collapses to
// a small icon-only circle rather than disappearing outright, and only
// hides completely if even that circle has nowhere clear to sit — restoring
// the full pill automatically as soon as there's room again.
//
// Desktop: unchanged from the last revision — a compact 56px icon-only
// circle, no idle-fade, hides completely on any overlap. No smaller state
// to fall back to since it's already icon-only.
export default function FloatingLargeProjectWidget() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useHasMounted();
  const isHomepage = pathname === "/";
  const widgetRef = useRef<HTMLElement | null>(null);
  const setWidgetRef = (el: HTMLElement | null) => {
    widgetRef.current = el;
  };
  const mode = useWidgetMode(widgetRef);
  const idle = useIdleFade();

  const label = "View Large Project Daily Crew";
  const isHidden = mode === "hidden";
  // Mobile-only collapsed circle; desktop's own lg: overrides always force
  // the icon-only circle regardless of this, so it's a no-op there.
  const isCollapsed = mode === "collapsed" || mode === "hidden";

  const opacityClassName = isHidden
    ? "pointer-events-none opacity-0"
    : idle
      ? "opacity-50 lg:opacity-100"
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
      : "transition-[background-color,transform,box-shadow,opacity,width,height,padding] duration-200 ease-premium";

  const shapeClassName = isCollapsed
    ? "h-12 w-12 justify-center px-0 py-0"
    : "min-h-[44px] px-4 py-3";

  const sharedClassName = `fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-orange text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5 hover:bg-orange-strong hover:shadow-xl active:translate-y-0 active:scale-[0.98] active:duration-100 lg:bottom-96 lg:right-6 lg:h-14 lg:w-14 lg:justify-center lg:px-0 lg:py-0 ${shapeClassName} ${transitionClassName} ${opacityClassName}`;

  const content = (
    <>
      {clipboardCheckIcon(isCollapsed)}
      <span className={`lg:hidden ${isCollapsed ? "hidden" : ""}`.trim()}>Large Project?</span>
    </>
  );

  if (isHomepage) {
    return (
      <button
        ref={setWidgetRef}
        type="button"
        aria-label={label}
        title={label}
        aria-hidden={isHidden || undefined}
        tabIndex={isHidden ? -1 : undefined}
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
      aria-hidden={isHidden || undefined}
      tabIndex={isHidden ? -1 : undefined}
      className={sharedClassName}
    >
      {content}
    </Link>
  );
}
