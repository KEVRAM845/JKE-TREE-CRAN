// =============================================================================
// SINGLE SOURCE OF BUSINESS INFORMATION
// -----------------------------------------------------------------------------
// This is the ONLY file you edit to publish real business data. Every trust,
// credentials, reviews, service-area, and SEO/schema feature reads from here.
//
// Anything left null / false / [] stays HIDDEN on the site — nothing is
// fabricated. Fill a field in and its UI (and structured data) appears
// automatically. No layout changes required.
// =============================================================================

export interface Review {
  author: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** e.g. "Google" */
  source?: string;
  /** ISO date, e.g. "2025-06-01" */
  date?: string;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OpeningHours {
  /** Schema day tokens, e.g. ["Monday","Tuesday"] */
  days: string[];
  /** 24h "HH:MM" */
  opens: string;
  closes: string;
}

export const siteConfig = {
  // ---- Brand basics (already live) ----------------------------------------
  name: "JKE Tree & Crane",
  legalName: "JKE Contracting Inc.",
  tagline: "Crane, Bucket Truck & Tree Removal Specialists",
  phone: "845-721-0772",
  phoneHref: "tel:+18457210772",
  email: "info@jketreeandcrane.com",
  usdot: "3497970",
  serviceArea: "Dutchess, Putnam, Orange, and Ulster Counties",

  /** Official crest logo. It's a white mark on a transparent background, so
   *  it only reads on a dark surface (the forest header badge, the forest
   *  footer) — never place it directly on a light background. */
  logo: {
    src: "/images/jke-tree-crane-logo.png",
    width: 1200,
    height: 1512,
  },

  /** Canonical site URL — update to the real domain before launch. Used for
   *  SEO metadata, Open Graph, sitemap, and structured data. */
  url: "https://www.jketreeandcrane.com",

  // ---- Credentials (R2) ----------------------------------------------------
  // Regulated claims (licensed/insured) are OFF by default so nothing is
  // asserted until you confirm it. Flip to true once verified.
  credentials: {
    licensed: false, // set true (optionally add licenseNumber) once confirmed
    licenseNumber: null as string | null,
    insured: false, // set true to show a "Fully Insured" badge
    locallyOwned: true, // family/locally owned — already an affirmed claim
    showUsdot: true, // display the (real) USDOT number
    /** Year the business started, e.g. 2015 → "Established 2015". null = hidden. */
    yearEstablished: null as number | null,
    /** e.g. ["ISA Certified Arborist", "TCIA Member"]. Empty = hidden. */
    certifications: [] as string[],
  },

  // ---- Physical location (LocalBusiness schema). null = omitted -----------
  address: null as BusinessAddress | null,
  geo: null as { latitude: number; longitude: number } | null,
  /** Empty = omitted from schema. */
  hours: [] as OpeningHours[],

  // ---- Service areas (R3 — ready for future /service-areas pages) ----------
  // Real towns only, e.g. ["Poughkeepsie, NY", "Beacon, NY"]. Empty = hidden.
  // Powers the LocalBusiness schema's areaServed (see JsonLd.tsx).
  serviceAreas: [
    "Dutchess County, NY",
    "Putnam County, NY",
    "Orange County, NY",
    "Ulster County, NY",
    "Poughkeepsie, NY",
    "Fishkill, NY",
    "Wappingers Falls, NY",
    "Hopewell Junction, NY",
    "Beacon, NY",
    "Cold Spring, NY",
    "Carmel, NY",
    "Mahopac, NY",
    "Brewster, NY",
    "Newburgh, NY",
    "Middletown, NY",
    "Kingston, NY",
  ] as string[],

  // ---- Reviews / social proof (R1). Empty = the section stays hidden -------
  reviews: {
    /** Real aggregate from Google, or null. Powers the rating badge + schema. */
    aggregate: null as { rating: number; count: number; url?: string } | null,
    /** Real, individually-sourced reviews only. */
    items: [] as Review[],
  },

  // ---- Social / profile links (schema sameAs). null values are omitted -----
  social: {
    google: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
  },
};

export type SiteConfig = typeof siteConfig;
