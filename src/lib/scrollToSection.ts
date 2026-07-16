// Shared "jump to a section" behavior used by the floating Large Project
// widget (same-page click) and by LargeProjectCrew's own mount effect
// (arriving via a cross-page link to /#large-project-crew, where the browser
// already handles the native scroll — this just adds the accessible extras
// native anchor navigation doesn't give you for free: moved focus and a
// brief visual confirmation of where you landed).
export function focusAndHighlightSection(id: string, reduceMotion: boolean) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  window.setTimeout(
    () => {
      // Re-query fresh here rather than capturing a reference above:
      // section content built from <SlideIn> renders a plain SSR-safe <div>
      // until mount, then swaps to a motion.div once mounted — a different
      // element type, so React tears down and rebuilds that subtree. A
      // reference captured before that swap would already be a detached
      // node by the time this timeout fires, and .focus() on a detached
      // node is a silent no-op.
      const liveSection = document.getElementById(id);
      if (!liveSection) return;
      // The heading itself carries tabIndex={-1} so it's programmatically
      // focusable without joining the normal tab order.
      const heading = liveSection.querySelector<HTMLElement>("[data-section-heading]");
      const focusTarget = heading ?? liveSection;
      focusTarget.focus({ preventScroll: true });
      focusTarget.classList.add("highlight-target");
      window.setTimeout(() => focusTarget.classList.remove("highlight-target"), 1600);
    },
    reduceMotion ? 0 : 500,
  );
}
