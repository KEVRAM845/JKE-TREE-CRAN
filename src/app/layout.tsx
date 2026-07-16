import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import LocalBusinessJsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { heroImage } from "@/lib/media";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Condensed industrial display face for headings — reads "established
// contractor," not "SaaS." Body/UI stays Inter.
const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const description =
  "Tree removal, tree trimming, stump grinding, crane and bucket truck service, and land clearing across Dutchess, Putnam, Orange, and Ulster Counties, NY.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description,
    url: siteConfig.url,
    images: [
      {
        // Sourced from the same heroImage the homepage renders, so a future
        // hero swap in media.ts can't leave this pointing at a stale photo.
        url: heroImage.src,
        width: 2400,
        height: 3200,
        alt: siteConfig.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description,
    images: [heroImage.src],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCallBar />
          <FloatingContactWidget />
        </MotionConfig>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
