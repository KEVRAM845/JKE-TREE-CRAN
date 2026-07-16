import Image from "next/image";
import Link from "next/link";
import Credentials from "@/components/Credentials";
import SocialLinks from "@/components/SocialLinks";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest pb-16 text-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={siteConfig.logo.src}
              alt=""
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="h-14 w-auto flex-shrink-0"
            />
            <p className="text-lg font-bold">{siteConfig.name}</p>
          </div>
          <p className="mt-3 text-sm text-white/70">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-white/70">
            Serving {siteConfig.serviceArea}
          </p>
          <p className="mt-1 text-sm text-white/50">
            Including Poughkeepsie, Fishkill, Wappingers Falls, Hopewell Junction,
            Beacon, Cold Spring, Carmel, Mahopac, Brewster, Newburgh, Middletown, and
            Kingston.
          </p>
          <Credentials variant="row" onDark className="mt-3" />
        </div>

        <nav aria-label="Footer services">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Services
          </h2>
          <ul className="mt-3 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/80 transition-colors hover:text-orange-light"
                >
                  {service.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/crew"
                className="text-sm font-medium text-white transition-colors hover:text-orange-light"
              >
                Meet the Crew
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="text-sm font-medium text-white transition-colors hover:text-orange-light"
              >
                View Project Gallery
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Contact
          </h2>
          <div className="mt-3 space-y-2 text-sm text-white/80">
            <a
              href={siteConfig.phoneHref}
              className="block transition-colors hover:text-orange-light"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block transition-colors hover:text-orange-light"
            >
              {siteConfig.email}
            </a>
            <Link
              href="/request-service"
              className="mt-2 inline-block rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition-[background-color,transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-orange-strong hover:shadow-md active:translate-y-0 active:scale-[0.98] active:duration-100"
            >
              Request a Free Estimate
            </Link>
          </div>
          <SocialLinks className="mt-5" />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6">
        &copy; {year} {siteConfig.legalName} All rights reserved.
      </div>
    </footer>
  );
}
