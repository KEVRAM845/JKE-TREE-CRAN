"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easePremium } from "@/lib/motion";
import { getEstimateHref, siteConfig } from "@/lib/site-config";

// Desktop-only by design (hidden below lg, matching the breakpoint where
// Header switches to its full inline nav). Mobile and tablet already have a
// persistent contact surface — MobileCallBar (Call + Free Estimate, fixed to
// the bottom of every screen, visible below lg) — covering the same core
// actions. A second floating widget stacked on top of that would cover
// content and contradict the "must not block content, avoid crowded menus"
// requirement this widget itself is built to satisfy, so anything below lg
// is intentionally left to MobileCallBar alone.
export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const actions = [
    {
      key: "estimate",
      href: getEstimateHref(),
      label: "Request a Free Estimate",
      primary: true,
      external: getEstimateHref().startsWith("http"),
      icon: (
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2ZM9 12h6M9 16h4" />
      ),
    },
    {
      key: "call",
      href: siteConfig.phoneHref,
      label: `Call ${siteConfig.phone}`,
      primary: false,
      external: true,
      icon: (
        <path d="M2.5 5.5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.2a1.5 1.5 0 0 0-1.2-1.47l-3-.6a1.5 1.5 0 0 0-1.5.66l-.7 1.05a11.5 11.5 0 0 1-5-5l1.05-.7a1.5 1.5 0 0 0 .66-1.5l-.6-3A1.5 1.5 0 0 0 6.7 3.5H4.5a2 2 0 0 0-2 2Z" />
      ),
    },
    {
      key: "text",
      href: siteConfig.smsHref,
      label: "Text Us",
      primary: false,
      external: true,
      icon: <path d="M4 4.5h16v12H9l-4 3.5v-3.5H4Z" />,
    },
    {
      key: "email",
      href: `mailto:${siteConfig.email}`,
      label: "Email Us",
      primary: false,
      external: true,
      icon: (
        <path d="M3.5 5.5h17v13h-17zM3.5 6l8.5 7 8.5-7" />
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Contact options"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: easePremium }}
            className="flex w-64 flex-col gap-1.5 rounded-2xl border border-black/10 bg-white p-2.5 shadow-xl"
          >
            {actions.map((action) =>
              action.external ? (
                <a
                  key={action.key}
                  role="menuitem"
                  href={action.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ease-premium ${
                    action.primary
                      ? "bg-orange text-white hover:bg-orange-strong"
                      : "text-forest hover:bg-forest/5"
                  }`}
                >
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
                    {action.icon}
                  </svg>
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.key}
                  role="menuitem"
                  href={action.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ease-premium ${
                    action.primary
                      ? "bg-orange text-white hover:bg-orange-strong"
                      : "text-forest hover:bg-forest/5"
                  }`}
                >
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
                    {action.icon}
                  </svg>
                  {action.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-lg transition-[background-color,transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-xl active:translate-y-0 active:scale-[0.96] active:duration-100"
      >
        <motion.svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: easePremium }}
        >
          {open ? (
            <path d="M12 5v14M5 12h14" />
          ) : (
            <path d="M4 4.5h16v12H9l-4 3.5v-3.5H4Z" />
          )}
        </motion.svg>
      </button>
    </div>
  );
}
