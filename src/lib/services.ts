import type { FaqItem } from "@/components/Faq";
import type { VideoAsset } from "@/lib/media";
import { videoLandClearingAction } from "@/lib/media";

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  navLabel: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  /** Tailwind `object-[...]` position utility classes for the hero banner's
   *  tight, wide crop — e.g. `"object-[50%_60%] sm:object-[50%_55%]"`.
   *  Responsive because the banner's fixed pixel height (h-72/h-96) combined
   *  with a 100vw-wide image means wider viewports scale the photo larger
   *  and crop a proportionally smaller vertical slice — the same position
   *  value doesn't always keep the subject framed the same way at every
   *  width. Defaults to centered when omitted. Applied via className, not
   *  inline style, specifically so the sm:/lg: variants can take effect. */
  heroImagePosition?: string;
  /** "cover" (default) crops the source photo to fill the hero banner edge
   *  to edge. "blurred-contain" instead shows the *entire* source image
   *  uncropped (object-contain) as a sharp centered strip, with a blurred,
   *  scaled-up copy of the same image filling the leftover space on either
   *  side — for a source photo whose aspect ratio is too extreme (e.g. a
   *  tall portrait video frame) for "cover" to show enough of the subject
   *  in this banner's short, wide box without cropping out most of it.
   *  Same file both times — not a different image, just a different fit. */
  heroFillMode?: "cover" | "blurred-contain";
  bullets: string[];
  // Optional depth content — rendered on the service page only when present.
  equipment?: string[];
  /** Optional prominent single-video callout, rendered between the intro and
   *  "What's Included" — for a service with a strong piece of real action
   *  footage worth featuring on its own rather than folded into the generic
   *  "More From This Work" grid below. */
  featuredVideo?: { title: string; caption: string; video: VideoAsset };
  faqs?: FaqItem[];
  /** Overrides the shared process/expect/safety defaults if a service needs to. */
  process?: ProcessStep[];
  whatToExpect?: string[];
  safety?: string[];
}

// Shared, factual content reused across every service page (single source of
// truth — not repeated per service). Describes how the company actually works;
// no invented stats, credentials, or guarantees.
export const defaultProcess: ProcessStep[] = [
  {
    title: "Free On-Site Assessment",
    description:
      "We walk the property, evaluate the tree and the access around it, and give you a clear estimate — at no cost and no obligation.",
  },
  {
    title: "Property Protection & Planning",
    description:
      "Before any cutting, we plan rigging, drop zones, and equipment placement, and protect your lawn, driveway, and structures.",
  },
  {
    title: "Controlled Removal",
    description:
      "Using cranes, bucket trucks, and rigging as the job calls for, we take the work down in controlled sections — never guesswork near your home.",
  },
  {
    title: "Complete Cleanup",
    description:
      "We haul away the debris, rake the site, and leave your property cleaner than we found it.",
  },
];

export const defaultWhatToExpect: string[] = [
  "A free, no-obligation estimate before any work begins",
  "A clear scope and timeline for your job",
  "A crew in proper protective gear, working carefully and communicating clearly the whole time",
  "Full debris cleanup and haul-away on completion",
  "Respect for your lawn, landscaping, and neighbors",
];

export const defaultSafety: string[] = [
  "Every removal is planned before the first cut — drop zones, rigging, and equipment placement.",
  "We use cranes and bucket trucks to keep crews out of dangerous positions and loads away from structures.",
  "Ground crews maintain clear communication and controlled work zones throughout the job.",
  "Proper personal protective equipment on every crew member, on every job.",
];

export const services: Service[] = [
  {
    slug: "tree-removal",
    title: "Tree Removal",
    navLabel: "Tree Removal",
    summary:
      "When a tree has to come down, it comes down clean. We handle everything from a single dead or hazardous tree to a full-property clearing — roped and rigged, sectioned safely, and lowered without touching what's around it. Tree removal includes the controlled removal of the agreed tree and cleanup within the approved scope; stump grinding is available when included in the estimate or scheduled as a separate service.",
    heroImage: "/images/bucket-truck-hazard-removal.jpg",
    heroImageAlt: "Bucket truck crew removing a large hazardous tree",
    // The source photo is a wide, close-to-square shot with the bucket truck
    // and worker aloft near the top — a centered crop of this banner's very
    // short aspect ratio cuts both out and shows mostly canopy. Biasing the
    // crop toward the top keeps the actual work in frame, nudged slightly
    // tighter as the banner scales wider and the visible band narrows.
    heroImagePosition: "object-[50%_18%] sm:object-[50%_15%] lg:object-[50%_12%]",
    bullets: [
      "Full tree removal, from single trees to multiple-tree jobs",
      "Hazardous, dead, and storm-damaged tree take-downs",
      "Close-quarter removal near homes, garages, and power lines",
      "Complete debris cleanup and haul-away",
    ],
    equipment: [
      "Bucket trucks for aerial access",
      "Cranes for heavy or tight-access removals",
      "Professional chainsaws and rigging gear",
      "Chippers and haul-away trucks",
    ],
    faqs: [
      {
        q: "Can you remove trees close to my house or power lines?",
        a: "Yes. We use cranes, bucket trucks, and controlled rigging to safely remove trees in tight spots near homes, garages, and utility lines — from tight Wappingers Falls and Fishkill lots to larger properties throughout Dutchess County.",
      },
      {
        q: "Do you clean up afterward?",
        a: "Always. Every removal includes complete debris cleanup and haul-away.",
      },
      {
        q: "Do you also grind the stump?",
        a: "We can. Stump grinding is available as an add-on so you're left with a clean, usable yard.",
      },
      {
        q: "Is an estimate free?",
        a: "Yes — estimates are always free. Contact us to schedule an on-site visit.",
      },
    ],
  },
  {
    slug: "tree-trimming-pruning",
    title: "Tree Trimming & Pruning",
    navLabel: "Trimming & Pruning",
    summary:
      "Healthy trees start with the right cuts. We prune for shape, clearance, and long-term structure — removing deadwood, thinning heavy canopies before storm season, and lifting limbs off roofs, wires, and driveways. It's the maintenance that keeps a bigger, more expensive problem from showing up later.",
    heroImage: "/videos/posters/bucket-truck-power-line-trim.jpg",
    heroImageAlt: "JKE crew member trimming limbs from a bucket truck while ground crew clears debris below",
    // Video-frame extraction, portrait 540x960 (9:16) — the most extreme
    // aspect ratio of any hero photo on the site. In this banner's short,
    // wide box a plain "cover" crop (even with tuned object-position) can
    // only ever show ~15-40% of the image's height depending on viewport
    // width, cropping out most of the worker, the branch, and the
    // surrounding tree. blurred-contain shows the whole frame instead.
    heroFillMode: "blurred-contain",
    bullets: [
      "Deadwooding and canopy thinning",
      "Clearance trimming near rooflines and power lines",
      "Storm-damage prevention pruning",
      "Shaping and health-focused pruning for long-term tree care",
    ],
    equipment: [
      "Bucket trucks for high canopy access",
      "Pole saws and professional chainsaws",
      "Rigging for controlled limb removal",
      "Chippers for on-site cleanup",
    ],
    faqs: [
      {
        q: "How often should trees be pruned?",
        a: "It depends on the species and your goals, but many trees benefit from pruning every three to five years. We'll advise during your estimate.",
      },
      {
        q: "Can pruning help prevent storm damage?",
        a: "Yes. Removing deadwood and thinning heavy limbs reduces the risk of breakage in high winds.",
      },
      {
        q: "Do you trim near power lines?",
        a: "We perform clearance trimming near rooflines and lines using bucket trucks and proper techniques.",
      },
    ],
    process: [
      defaultProcess[0],
      {
        title: "A Plan for Every Cut",
        description:
          "We look at the whole tree — deadwood, clearance issues, storm risk — before a single cut is made, so the pruning has a purpose.",
      },
      {
        title: "Precision Trimming",
        description:
          "Working from bucket trucks or by climbing where needed, we make clean cuts that support the tree's health, not just its looks.",
      },
      defaultProcess[3],
    ],
    safety: [
      "We assess limb weight and lean before cutting near roofs, driveways, or power lines.",
      "Bucket trucks keep our crew off ladders and out of the tree for most cuts near structures.",
      "Ground crews stay clear of the drop zone while pruning cuts are made.",
      "Proper personal protective equipment on every crew member, on every job.",
    ],
  },
  {
    slug: "stump-grinding",
    title: "Stump Grinding",
    navLabel: "Stump Grinding",
    summary:
      "A stump left behind is still a job half-finished. We grind it below grade with equipment sized to the stump — small enough to fit through a gate, powerful enough to finish in one visit — so the spot can be seeded, sodded, or built on without a mower deck-breaker waiting in the grass. Every grind includes cleanup, so you're left with a level, usable yard, not a pile of chips to deal with yourself.",
    heroImage: "/images/stump-grinder-fresh-cut.jpg",
    heroImageAlt: "Vermeer stump grinder beside a large, freshly cut tree stump",
    // The grinder and stump sit in the lower two-thirds of this portrait
    // photo — a centered crop in the short banner shows mostly treeline
    // above and crops the equipment itself. Biasing down keeps it in frame,
    // nudged further down as the banner scales wider and the band narrows.
    heroImagePosition: "object-[50%_60%] sm:object-[50%_65%] lg:object-[50%_68%]",
    bullets: [
      "Grinding below grade for a clean, level yard",
      "Root flare and surface root grinding",
      "Mulch removal or spread, your choice",
      "Yard-ready cleanup when the job is done",
    ],
    equipment: [
      "Vermeer stump grinder",
      "Root and surface-root grinding attachments",
      "Site cleanup and leveling tools",
    ],
    faqs: [
      {
        q: "How deep do you grind?",
        a: "We grind below grade so the area can be leveled, seeded, or replanted.",
      },
      {
        q: "What happens to the grindings?",
        a: "Your choice — we can spread the mulch on-site or remove it.",
      },
      {
        q: "Can you grind hard-to-reach stumps?",
        a: "In most cases, yes — including tighter backyards around Goshen, Chester, and Monroe. We'll confirm access during the estimate.",
      },
    ],
    process: [
      defaultProcess[0],
      {
        title: "Access & Site Check",
        description:
          "We check ground clearance, nearby landscaping, and utility lines before bringing the grinder in, so nothing gets damaged reaching the stump.",
      },
      {
        title: "Grinding Below Grade",
        description:
          "The stump and surface roots get ground down below grade — deep enough that the area can be seeded, sodded, or paved over without the stump ever resurfacing.",
      },
      {
        title: "Cleanup, Your Way",
        description:
          "We clear the grindings or leave them for mulch, whichever you'd rather have — either way, the yard is level and ready when we leave.",
      },
    ],
    safety: [
      "We check for buried utility lines and irrigation before grinding starts.",
      "Grinding equipment stays clear of structures, fences, and landscaping we've confirmed with you.",
      "Eye and hearing protection, plus proper footing, on every operator, every job.",
      "The work area stays marked off while the grinder is running.",
    ],
  },
  {
    slug: "crane-bucket-truck-service",
    title: "Crane & Bucket Truck Service",
    navLabel: "Crane & Bucket Truck",
    summary:
      "Some trees are too big, too close to the house, or too far back to climb safely. Our crane and bucket trucks lift whole sections out over rooftops and set them down exactly where we want them — the safest, fastest way to handle the removals other companies turn down. When there's no room for error, precision equipment isn't optional.",
    heroImage: "/images/crew-trucks-lot-sunset.jpg",
    heroImageAlt: "Two JKE bucket trucks parked together in a lot at sunset",
    // Square (1600x1600) source with both trucks sitting in the lower-middle
    // band and open sky above. Wider breakpoints scale the square source up
    // to fill a proportionally shorter banner, so the crop is nudged
    // progressively lower to keep both trucks framed instead of drifting
    // toward showing more sky.
    heroImagePosition: "object-[50%_55%] sm:object-[50%_58%] lg:object-[50%_62%]",
    bullets: [
      "Precision crane-assisted tree take-downs",
      "Aerial bucket truck access for tall or hard-to-reach trees",
      "Safe work near power lines, roofs, and structures",
      "Reduces property risk on difficult or dangerous removals",
    ],
    equipment: [
      "Truck-mounted crane",
      "Aerial bucket trucks",
      "Precision rigging and load control",
      "Ground-crew spotters",
    ],
    faqs: [
      {
        q: "When is a crane the right choice?",
        a: "For very tall, dead, or tightly-surrounded trees, a crane lifts sections out cleanly instead of dropping them — protecting your property.",
      },
      {
        q: "Is crane work safe near my home?",
        a: "It's often the safest option. Loads are controlled and lifted away from structures rather than felled toward them — a common need on the tighter, hillside properties around Warwick and Beacon.",
      },
      {
        q: "Do you handle setup and access?",
        a: "Yes. We plan crane placement, ground protection, and rigging before work begins.",
      },
    ],
  },
  {
    slug: "land-clearing-logging",
    title: "Land Clearing & Logging",
    navLabel: "Land Clearing & Logging",
    summary:
      "Some jobs are bigger than a single tree — clearing a building site, opening up a trail, or taking down leaning and storm-split timber that's too dangerous to leave standing. Our log trucks and grapple gear move big timber off a property fast, and usable hardwood goes to the mill instead of rotting in a pile. We size the job to the property, not the other way around.",
    heroImage: "/images/land-clearing-vista.jpg",
    heroImageAlt: "Freshly cleared hilltop lot with open valley views after forestry work",
    // A very tall, narrow source photo — the cleared field and valley view
    // sit in the upper-middle band, with out-of-focus equipment filling the
    // immediate foreground at the bottom. Biasing up toward that band keeps
    // the actual view (the point of this photo) in the short hero banner,
    // nudged slightly up as the banner scales wider and the band narrows.
    heroImagePosition: "object-[50%_45%] sm:object-[50%_42%] lg:object-[50%_38%]",
    bullets: [
      "Site clearing for construction and development",
      "Selective timber removal and logging",
      "Brush, deadfall, and debris clearing",
      "Access road and trail clearing",
    ],
    equipment: [
      "Logging trucks",
      "Forestry clearing equipment",
      "Cranes and chippers",
      "Chainsaws and skidding gear",
    ],
    faqs: [
      {
        q: "Do you clear lots for construction?",
        a: "Yes — we clear building sites, driveways, trails, and overgrown areas.",
      },
      {
        q: "Do you handle the timber?",
        a: "We handle selective logging and haul-away as part of the job.",
      },
      {
        q: "How large a property can you clear?",
        a: "From single lots to larger acreage — we've worked properties throughout Orange County, including Newburgh and Middletown. Contact us with the details for an estimate.",
      },
    ],
    process: [
      defaultProcess[0],
      {
        title: "Site & Access Planning",
        description:
          "We map out what's coming down, what's staying, and how equipment gets in and out without tearing up the property.",
      },
      {
        title: "Clearing & Hauling",
        description:
          "Chainsaws, chippers, and grapple loaders clear brush, deadfall, and timber — usable logs get set aside for hauling, not just chipped.",
      },
      {
        title: "Site Left Ready",
        description:
          "Once the agreed clearing work is complete, the work area can be left cleared and graded. Backfill, imported material, excavation, drainage work, and additional site preparation are not included unless separately evaluated and quoted.",
      },
    ],
    safety: [
      "We flag what's staying before equipment moves in, so nothing gets taken down by mistake.",
      "Grapple loaders and log trucks keep crews clear of suspended or shifting loads.",
      "Leaning and storm-damaged trees get assessed and handled before general clearing starts.",
      "Ground crews maintain clear communication and controlled work zones throughout the job.",
    ],
    featuredVideo: {
      title: "Land Clearing in Action",
      caption:
        "See JKE Tree & Crane working through an active clearing project using professional equipment and a coordinated crew.",
      video: videoLandClearingAction,
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
