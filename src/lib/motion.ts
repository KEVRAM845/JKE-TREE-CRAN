// Shared easing for every Framer Motion animation on the site — a smooth
// expo-out curve, not a generic named easing. Kept in sync by hand with the
// `--ease-premium` CSS token in globals.css (used by plain CSS transitions,
// e.g. card/button hovers) so JS-driven scroll reveals and CSS-driven
// hover/press states move with the exact same feel.
export const easePremium = [0.16, 1, 0.3, 1] as const;
