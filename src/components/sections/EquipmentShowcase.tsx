import Image from "next/image";
import MediaVideo from "@/components/MediaVideo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { equipmentMedia } from "@/lib/media";

export default function EquipmentShowcase() {
  return (
    <Section>
      <SectionHeading
        title="Our Equipment"
        subtitle="Cranes, bucket trucks, grinders, and logging rigs — owned and operated in-house so we can take on the jobs others turn down."
      />

      <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {equipmentMedia.map((item, index) => {
          // An odd item count leaves a single orphaned tile at the 2-column
          // mobile breakpoint — let it fill that row instead of sitting alone
          // beside empty space. Not needed at 3-column tablet/desktop.
          const isOrphan = index === equipmentMedia.length - 1 && equipmentMedia.length % 2 === 1;
          return (
          <StaggerItem
            key={item.src}
            index={index}
            className={`group relative aspect-square overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-[box-shadow,transform] duration-300 ease-premium hover:-translate-y-1 hover:shadow-lg ${isOrphan ? "col-span-2 md:col-span-1" : ""}`}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                style={item.focalPosition ? { objectPosition: item.focalPosition } : undefined}
              />
            ) : (
              <MediaVideo
                src={item.src}
                poster={item.poster}
                label={item.alt}
                className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
              />
            )}
          </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
