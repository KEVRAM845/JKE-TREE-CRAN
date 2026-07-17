import Image from "next/image";
import { SlideIn } from "@/components/motion/SlideIn";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { crewTeamPhoto } from "@/lib/media";

const iconProps = {
  className: "h-5 w-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const highlights = [
  {
    label: "Experienced Local Crew",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
  {
    label: "Safety-First Process",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21c5-1.5 8-5 8-9.5V5.5L12 3 4 5.5v6c0 4.5 3 8 8 9.5Z" />
        <path d="m9 11.5 2 2 4-4.5" />
      </svg>
    ),
  },
  {
    label: "Clear Communication",
    icon: (
      <svg {...iconProps}>
        <path d="M4 4.5h16v12H9l-4 3.5v-3.5H4Z" />
      </svg>
    ),
  },
  {
    label: "Respect for Your Property",
    icon: (
      <svg {...iconProps}>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9.5h12V10" />
      </svg>
    ),
  },
];

export default function CrewPreview() {
  return (
    <Section id="crew-preview" className="grid gap-10 md:grid-cols-2 md:items-center">
      <SlideIn className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={crewTeamPhoto.src}
          alt={crewTeamPhoto.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </SlideIn>

      <SlideIn>
        <p className="text-sm font-semibold uppercase tracking-wide text-orange">
          Our Team
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">
          Meet the Crew
        </h2>
        <p className="mt-3 text-lg text-foreground/80">
          The experienced professionals behind every safe, efficient, and
          reliable job.
        </p>
        <p className="mt-4 text-foreground/70">
          Every job is handled by experienced in-house crews and specialized
          equipment — not a rotating cast of subcontractors. They show up
          with the right equipment, communicate clearly from the first call
          to final cleanup, and take the same care around your property
          that they&apos;d want at home.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-foreground/80">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/crew">Meet the Crew</ButtonLink>
          <ButtonLink href="/request-service" variant="outline">
            Request a Free Estimate
          </ButtonLink>
        </div>
      </SlideIn>
    </Section>
  );
}
