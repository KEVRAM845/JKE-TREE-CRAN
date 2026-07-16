import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { featuredProject } from "@/lib/media";

export default function FeaturedProject() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Featured Project"
        title={featuredProject.title}
        subtitle={featuredProject.summary}
      />

      <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
        {featuredProject.images.map((image, index) => (
          <StaggerItem
            key={image.src}
            index={index}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
