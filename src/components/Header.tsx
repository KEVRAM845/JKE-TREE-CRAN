"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/crew", label: "Crew" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/request-service", label: "Request Service" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-black/10 shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : "border-black/10 shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          {/* The logo is a white mark on a transparent background — it only
              reads against a dark surface, so it sits on a small forest badge
              rather than directly on the header's white bar. */}
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-forest p-1.5 sm:h-11 sm:w-11">
            <Image
              src={siteConfig.logo.src}
              alt=""
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="whitespace-nowrap text-lg font-bold tracking-tight text-forest sm:text-xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 text-sm font-medium transition-colors hover:text-orange ${
                  active ? "text-forest" : "text-foreground/80"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-orange transition-transform duration-300 ease-premium group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-shrink-0 lg:block">
          <a
            href={siteConfig.phoneHref}
            className="whitespace-nowrap rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-orange-strong hover:shadow-md active:translate-y-0 active:scale-[0.98] active:duration-100"
          >
            Call {siteConfig.phone}
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-forest transition-colors hover:bg-black/5 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="overflow-hidden border-t border-black/10 bg-white lg:hidden"
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-1 border-t border-black/10 pt-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Services
                </p>
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block rounded-md px-2 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-black/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {service.navLabel}
                  </Link>
                ))}
              </div>
              <a
                href={siteConfig.phoneHref}
                className="mt-4 rounded-full bg-orange px-5 py-3 text-center text-sm font-semibold text-white transition-[background-color,transform] duration-150 active:scale-[0.98]"
                onClick={() => setMenuOpen(false)}
              >
                Call {siteConfig.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
