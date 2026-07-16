import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "forest" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-[background-color,color,border-color,transform,box-shadow,opacity] duration-200 ease-premium hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

// These map 1:1 to the button styles already used across the site, so adopting
// <Button> introduces no visual change beyond a subtle shadow lift on hover —
// it just removes duplicated class lists.
const variants: Record<Variant, string> = {
  primary: "bg-orange text-white shadow-sm hover:bg-orange-strong hover:shadow-md",
  outline:
    "border border-forest text-forest hover:bg-forest hover:text-white hover:shadow-md",
  outlineLight: "border border-white/30 text-white hover:bg-white/10",
  // For use on orange section backgrounds (e.g. CTA banners), where the
  // primary/outline pair above wouldn't have enough contrast.
  forest: "bg-forest text-white shadow-sm hover:bg-forest-light hover:shadow-md",
  white: "bg-white text-orange shadow-sm hover:bg-white/90 hover:shadow-md",
};

type CommonProps = {
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

function classes(variant: Variant, fullWidth: boolean, className?: string) {
  return [base, variants[variant], fullWidth ? "w-full" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

type LinkButtonProps = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type PlainButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

/** Internal navigation via next/link (href starting with "/" or "#"). */
export function ButtonLink({
  href,
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={classes(variant, fullWidth, className)} {...rest}>
      {children}
    </Link>
  );
}

/** External / protocol links (tel:, mailto:, https:). */
export function ButtonAnchor({
  href,
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...rest
}: CommonProps &
  Omit<ComponentProps<"a">, "className" | "children"> & { href: string }) {
  return (
    <a href={href} className={classes(variant, fullWidth, className)} {...rest}>
      {children}
    </a>
  );
}

/** Real <button> (form actions, etc.). Pass `loading` for async submits —
 *  it shows a spinner, forces `disabled`, and sets `aria-busy` so screen
 *  readers announce the pending state. */
export function Button({
  variant = "primary",
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: PlainButtonProps & { loading?: boolean }) {
  return (
    <button
      className={classes(variant, fullWidth, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <svg
          className="h-4 w-4 flex-shrink-0 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
