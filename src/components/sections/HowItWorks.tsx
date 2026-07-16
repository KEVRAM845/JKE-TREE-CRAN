import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

// What actually happens after someone reaches out — the engagement process,
// not the on-site work process (that's covered per-service in defaultProcess).
// Kept deliberately plain: no promised timelines beyond what's already true
// elsewhere on the site (free estimate, no obligation).
const steps = [
  {
    title: "Reach Out",
    description:
      "Call, or send a request with a few details about the job — photos help but aren't required. It takes about two minutes.",
  },
  {
    title: "We Review Your Project",
    description:
      "We look at what you've told us and follow up to ask anything else we need, so the estimate reflects your actual job.",
  },
  {
    title: "We Schedule the Work",
    description:
      "Estimates are free with no obligation. If you'd like to move forward, we find a time that works for your property.",
  },
  {
    title: "We Complete the Job & Clean Up",
    description:
      "We do the work and haul away the debris, so you're left with a finished job — not a mess to deal with yourself.",
  },
];

export default function HowItWorks() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="How It Works"
        title="What happens after you reach out"
        subtitle="No surprises — here's the whole process, start to finish."
      />

      <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <StaggerItem
            key={step.title}
            index={index}
            className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 font-bold text-forest">{step.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
