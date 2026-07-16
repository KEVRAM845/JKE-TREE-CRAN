import type { FaqItem } from "@/components/Faq";

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
  /** CSS object-position for the hero banner's tight, wide crop. Defaults to
   *  centered when omitted — only set this when the subject sits off-center
   *  in the source photo (e.g. equipment near one edge) and the default crop
   *  would cut it out of the banner. */
  heroImagePosition?: string;
  bullets: string[];
  // Optional depth content — rendered on the service page only when present.
  equipment?: string[];
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
      "When a tree has to come down, it comes down clean. We handle everything from a single dead or hazardous tree to a full-property clearing — roped and rigged, sectioned safely, and lowered without touching what's around it. Every removal ends with the stump ground below grade and the site raked out, not just a pile of brush left behind.",
    heroImage: "/images/bucket-truck-hazard-removal.jpg",
    heroImageAlt: "Bucket truck crew removing a large hazardous tree",
    // The source photo is a wide, close-to-square shot with the bucket truck
    // and worker aloft near the top — a centered crop of this banner's very
    // short aspect ratio cuts both out and shows mostly canopy. Biasing the
    // crop toward the top keeps the actual work in frame.
    heroImagePosition: "50% 15%",
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
    heroImage: "/images/bucket-truck-pine-removal.jpg",
    heroImageAlt: "Crew member trimming a tall pine tree from a bucket truck",
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
        a: "In most cases, yes — including tighter backyards around Carmel, Mahopac, and Brewster. We'll confirm access during the estimate.",
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
    heroImage: "/images/crane-truck-forest-road.jpg",
    heroImageAlt: "Crane truck positioned on a forest road for a tree removal",
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
        a: "It's often the safest option. Loads are controlled and lifted away from structures rather than felled toward them — a common need on the tighter, hillside properties around Cold Spring and Beacon.",
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
          "We finish with a cleared, graded site — ready for building, planting, or whatever comes next.",
      },
    ],
    safety: [
      "We flag what's staying before equipment moves in, so nothing gets taken down by mistake.",
      "Grapple loaders and log trucks keep crews clear of suspended or shifting loads.",
      "Leaning and storm-damaged trees get assessed and handled before general clearing starts.",
      "Ground crews maintain clear communication and controlled work zones throughout the job.",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
