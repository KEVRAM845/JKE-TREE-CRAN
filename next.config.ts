import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drop the `X-Powered-By: Next.js` response header — no functional benefit,
  // just unnecessary fingerprinting of the stack.
  poweredByHeader: false,
  images: {
    // Serve AVIF when the browser supports it (smaller than WebP at
    // comparable quality), falling back to WebP, then the source format.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Baseline hardening that's safe for every route on this site — no
    // inline-script/CSP tuning attempted here, since that requires auditing
    // every third-party resource and there's no monitoring in place yet to
    // catch a misconfigured policy silently breaking the page.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
