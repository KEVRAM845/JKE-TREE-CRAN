// Central media registry. Every gallery/section reads from here, so adding a
// future photo or video is a one-line change and the layout never moves.
//
// To add media after a job:
//   1. Drop the optimized file in /public/images (photos) or /public/videos (mp4 + poster).
//   2. Add one entry below with its category tags.
// It will automatically appear in the Gallery (and any section that filters by tag).

export type MediaCategory =
  | "tree-removal"
  | "tree-trimming"
  | "crane"
  | "stump-grinding"
  | "land-clearing"
  | "logging"
  | "storm"
  | "equipment";

export interface ImageAsset {
  type: "image";
  src: string;
  alt: string;
  categories: MediaCategory[];
  orientation: "portrait" | "landscape" | "square";
  /** CSS object-position, for photos whose subject sits off-center relative
   *  to the aspect ratio a given grid crops it to. Defaults to centered. */
  focalPosition?: string;
}

export interface VideoAsset {
  type: "video";
  src: string; // compressed MP4 (H.264)
  poster: string;
  alt: string;
  categories: MediaCategory[];
  orientation: "portrait";
  /** CSS object-position for tight, wide crops (e.g. homepage service-card
   *  previews). Defaults to centered when omitted — only set when the subject
   *  sits off-center in the portrait source and a center crop would cut it out. */
  focalPosition?: string;
}

export type MediaAsset = ImageAsset | VideoAsset;

export const CATEGORY_LABELS: Record<MediaCategory, string> = {
  "tree-removal": "Tree Removal",
  "tree-trimming": "Tree Trimming",
  crane: "Crane & Bucket",
  "stump-grinding": "Stump Grinding",
  "land-clearing": "Land Clearing",
  logging: "Logging",
  storm: "Storm Response",
  equipment: "Equipment",
};

// ---- Photos -----------------------------------------------------------------

const heroCraneMaple: ImageAsset = {
  type: "image",
  src: "/images/hero-crane-maple.jpg",
  alt: "JKE crane truck reaching high into a large maple to remove limbs over a suburban yard",
  categories: ["crane"],
  orientation: "portrait",
};

export const stumpGrinderFreshCut: ImageAsset = {
  type: "image",
  src: "/images/stump-grinder-fresh-cut.jpg",
  alt: "Vermeer stump grinder positioned beside a large, freshly cut tree stump",
  categories: ["stump-grinding", "equipment"],
  orientation: "landscape",
};

const crewBuckingLogs: ImageAsset = {
  type: "image",
  src: "/images/crew-bucking-logs.jpg",
  alt: "JKE crew member in hearing and face protection cutting large oak logs into rounds",
  categories: ["tree-removal", "logging"],
  orientation: "portrait",
};

const craneOverRoof: ImageAsset = {
  type: "image",
  src: "/images/crane-over-roof.jpg",
  alt: "Crane lifting a storm-damaged limb high over the roof of a two-story home",
  categories: ["crane", "storm"],
  orientation: "portrait",
};

const craneOverRoof2: ImageAsset = {
  type: "image",
  src: "/images/crane-over-roof-2.jpg",
  alt: "Crane and ground crew removing a large limb over a house, side angle",
  categories: ["crane", "storm"],
  orientation: "portrait",
};

const landClearingVista: ImageAsset = {
  type: "image",
  src: "/images/land-clearing-vista.jpg",
  alt: "Freshly cleared hilltop lot with open valley views after forestry work",
  categories: ["land-clearing"],
  orientation: "portrait",
};

// Existing photography (trucks / earlier jobs) — now homed in Equipment + Gallery.
const craneTruckForestRoad: ImageAsset = {
  type: "image",
  src: "/images/crane-truck-forest-road.jpg",
  alt: "JKE crane truck staged on a forest road for a removal",
  categories: ["crane", "equipment"],
  orientation: "portrait",
};

const crewTrucksSunset: ImageAsset = {
  type: "image",
  src: "/images/crew-trucks-lot-sunset.jpg",
  alt: "JKE bucket and crane trucks lined up at sunset",
  categories: ["equipment"],
  orientation: "square",
};

const loggingTruckRoad: ImageAsset = {
  type: "image",
  src: "/images/logging-truck-loaded-road.jpg",
  alt: "JKE logging truck loaded with timber on a rural road",
  categories: ["logging", "equipment"],
  orientation: "square",
};

const loggingTruckYard: ImageAsset = {
  type: "image",
  src: "/images/logging-truck-loaded-yard.jpg",
  alt: "JKE logging truck loaded with cut timber in a yard",
  categories: ["logging", "equipment"],
  orientation: "square",
};

const stumpGrindingYard: ImageAsset = {
  type: "image",
  src: "/images/stump-grinding-yard.jpg",
  alt: "Stump grinding equipment clearing a residential yard",
  categories: ["stump-grinding"],
  orientation: "portrait",
};

export const bucketTruckHazard: ImageAsset = {
  type: "image",
  src: "/images/bucket-truck-hazard-removal.jpg",
  alt: "JKE bucket truck crew removing a large hazardous tree",
  categories: ["tree-removal"],
  orientation: "square",
};

const bucketTruckPineRemoval: ImageAsset = {
  type: "image",
  src: "/images/bucket-truck-pine-removal.jpg",
  alt: "Crew member trimming a tall pine tree from a bucket truck",
  categories: ["tree-trimming", "crane"],
  orientation: "portrait",
};

// Full-team photo for the /crew page hero and the homepage "Meet the Crew"
// section. Not part of the job-photo Gallery archive below (it's a team
// portrait, not tagged to a service category).
export const crewTeamPhoto: ImageAsset = {
  type: "image",
  src: "/images/jke-crew.jpg",
  alt: "The full JKE Tree & Crane crew standing together in front of the bucket truck",
  categories: ["equipment"],
  orientation: "landscape",
};

// New HD photography (crew presence + before shot).
const crewMemberBrandedHoodie: ImageAsset = {
  type: "image",
  src: "/images/crew-member-branded-hoodie.jpg",
  alt: "JKE crew member in a branded neon-green hoodie standing beside a freshly felled tree",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const crewStumpGrinderAction: ImageAsset = {
  type: "image",
  src: "/images/crew-stump-grinder-action.jpg",
  alt: "JKE crew member operating a stump grinder, wood chips flying",
  categories: ["stump-grinding"],
  orientation: "portrait",
};

const groundCrewChipperLoading: ImageAsset = {
  type: "image",
  src: "/images/ground-crew-chipper-loading.jpg",
  alt: "JKE ground crew loading trimmed branches into a chipper beneath a bucket truck near power lines",
  categories: ["tree-trimming", "crane"],
  orientation: "portrait",
};

const pineTreeBeforeRemoval: ImageAsset = {
  type: "image",
  src: "/images/pine-tree-before-removal.jpg",
  alt: "A bare pine tree in a residential front yard before removal",
  categories: ["tree-removal"],
  orientation: "portrait",
};

// New crane, crew, and equipment photography (major visual refresh) ----------

// Hero: the widest, most complete view of the crane in the library — full
// boom extended over a storm-damaged roof with the tree still hanging above
// it. Not reused elsewhere on the homepage (see featuredProject below).
export const craneRemovingTreeOffHouse: ImageAsset = {
  type: "image",
  src: "/images/crane-removing-tree-off-house.jpg",
  alt: "JKE crane truck with boom fully extended lifting a large limb off a storm-damaged home's roof",
  categories: ["crane", "storm"],
  orientation: "portrait",
};

const emergencyNightImage: ImageAsset = {
  type: "image",
  src: "/images/emergency-night.jpg",
  alt: "A JKE crew member working after dark to cut a large tree down off a home during an emergency call",
  categories: ["storm"],
  orientation: "portrait",
};

const craneLiftingBranchHouse: ImageAsset = {
  type: "image",
  src: "/images/crane-lifting-branch-house.jpg",
  alt: "A JKE crane truck lifting a limb off a rooftop at dusk while a crew member cuts from above",
  categories: ["crane", "storm"],
  orientation: "portrait",
};

const craneLogHouse: ImageAsset = {
  type: "image",
  src: "/images/crane-log-house.jpg",
  alt: "A crane lowering a large cut log over a storm-damaged home's roofline",
  categories: ["crane", "storm"],
  orientation: "portrait",
};

const blackDumpBlueCrane: ImageAsset = {
  type: "image",
  src: "/images/black-dump-blue-crane.jpg",
  alt: "A JKE crane truck staged beside a home with a storm-damaged roof, ladders and debris on the ground",
  categories: ["crane", "storm", "equipment"],
  orientation: "portrait",
};

const craneTreeShed: ImageAsset = {
  type: "image",
  src: "/images/crane-tree-shed.jpg",
  alt: "A crane boom lifting a large fallen tree off a backyard shed",
  categories: ["crane", "tree-removal"],
  orientation: "portrait",
};

const blueCrane: ImageAsset = {
  type: "image",
  src: "/images/blue-crane.jpg",
  alt: "JKE's crane truck staged in the equipment yard with boom raised",
  categories: ["crane", "equipment"],
  orientation: "portrait",
  // The boom and flag sit in the upper half of this frame — a centered crop
  // in the square Equipment grid shows too much empty gravel below.
  focalPosition: "50% 38%",
};

export const loaderMovingLog: ImageAsset = {
  type: "image",
  src: "/images/loader-moving-log.jpg",
  alt: "A compact grapple loader carrying a large cut log across a job site",
  categories: ["equipment", "logging"],
  orientation: "portrait",
  // The loader and log sit in the lower half of this frame — a centered crop
  // in the square Equipment grid shows too much bare sky and treeline above.
  focalPosition: "50% 65%",
};

const logMovedByCrane: ImageAsset = {
  type: "image",
  src: "/images/log-moved-by-crane.jpg",
  alt: "A crane lifting a large cut log section into a dump trailer",
  categories: ["crane", "logging"],
  orientation: "portrait",
};

const greyBucketTree: ImageAsset = {
  type: "image",
  src: "/images/grey-bucket-tree.png",
  alt: "A bucket truck raised into a tall bare tree beside a home for trimming",
  categories: ["tree-trimming", "crane"],
  orientation: "square",
};

export const whiteTruckChipper: ImageAsset = {
  type: "image",
  src: "/images/white-truck-chipper.jpg",
  alt: "JKE's chip truck and Vermeer chipper staged on a job site",
  categories: ["equipment"],
  orientation: "landscape",
};

export const workerNextToChipper: ImageAsset = {
  type: "image",
  src: "/images/worker-next-to-chipper.jpg",
  alt: "A JKE crew member feeding a cut log into a wood chipper",
  categories: ["tree-removal", "equipment"],
  orientation: "landscape",
};

// ---- Videos (portrait-friendly, muted, poster-backed) ------------------------

const videoTreeFell: VideoAsset = {
  type: "video",
  src: "/videos/tree-fell-backyard.mp4",
  poster: "/videos/posters/tree-fell-backyard.jpg",
  alt: "A tall backyard tree taken down and the yard cleared",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const videoLandClearing: VideoAsset = {
  type: "video",
  src: "/videos/land-clearing-field.mp4",
  poster: "/videos/posters/land-clearing-field.jpg",
  alt: "A cleared field with valley views after forestry work",
  categories: ["land-clearing"],
  orientation: "portrait",
};

const videoFleet: VideoAsset = {
  type: "video",
  src: "/videos/fleet-trucks.mp4",
  poster: "/videos/posters/fleet-trucks.jpg",
  alt: "The JKE truck and equipment fleet staged on a wooded access road",
  categories: ["equipment"],
  orientation: "portrait",
};

const videoStumpAction: VideoAsset = {
  type: "video",
  src: "/videos/stump-grinding-action.mp4",
  poster: "/videos/posters/stump-grinding-action.jpg",
  alt: "A stump grinder cutting into a stump, chips flying",
  categories: ["stump-grinding"],
  orientation: "portrait",
};

const videoClimber: VideoAsset = {
  type: "video",
  src: "/videos/climber-spruce.mp4",
  poster: "/videos/posters/climber-spruce.jpg",
  alt: "A JKE climber working at the top of a tall spruce beside a home",
  categories: ["tree-removal"],
  orientation: "portrait",
  // The climber sits in the upper third of this portrait clip — a centered
  // crop in a wide card pushes him out of frame entirely.
  focalPosition: "50% 28%",
};

const videoStormRigging: VideoAsset = {
  type: "video",
  src: "/videos/storm-rigging.mp4",
  poster: "/videos/posters/storm-rigging.jpg",
  alt: "Rope rigging a large tree during a difficult removal",
  categories: ["storm", "logging"],
  orientation: "portrait",
};

// New HD footage.
const videoWoodedLotAssessment: VideoAsset = {
  type: "video",
  src: "/videos/wooded-lot-assessment.mp4",
  poster: "/videos/posters/wooded-lot-assessment.jpg",
  alt: "A wooded residential lot with leaning trees ahead of a clearing job",
  categories: ["land-clearing"],
  orientation: "portrait",
};

const videoStumpGrinderWheelCloseup: VideoAsset = {
  type: "video",
  src: "/videos/stump-grinder-wheel-closeup.mp4",
  poster: "/videos/posters/stump-grinder-wheel-closeup.jpg",
  alt: "Close-up of a stump grinder wheel chewing through a stump, chips flying",
  categories: ["stump-grinding", "equipment"],
  orientation: "portrait",
};

const videoRootGrinderDriveway: VideoAsset = {
  type: "video",
  src: "/videos/root-grinder-driveway.mp4",
  poster: "/videos/posters/root-grinder-driveway.jpg",
  alt: "An excavator-mounted root grinder clearing a stump beside a driveway",
  categories: ["stump-grinding", "equipment"],
  orientation: "portrait",
};

const videoCrewOperatingStumpGrinder: VideoAsset = {
  type: "video",
  src: "/videos/crew-operating-stump-grinder.mp4",
  poster: "/videos/posters/crew-operating-stump-grinder.jpg",
  alt: "A JKE crew member operating a stump grinder in a residential yard, dust flying",
  categories: ["stump-grinding"],
  orientation: "portrait",
  // The grinder attachment sits near the top of the frame — a centered crop
  // in a wide card shows mostly grass and misses the equipment.
  focalPosition: "50% 18%",
};

const videoBackyardCanopyView: VideoAsset = {
  type: "video",
  src: "/videos/backyard-canopy-view.mp4",
  poster: "/videos/posters/backyard-canopy-view.jpg",
  alt: "Tall mature trees viewed from a backyard ahead of a removal",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const videoBackyardCanopyViewWide: VideoAsset = {
  type: "video",
  src: "/videos/backyard-canopy-view-wide.mp4",
  poster: "/videos/posters/backyard-canopy-view-wide.jpg",
  alt: "A wider view of tall backyard trees ahead of a removal",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const videoBucketTruckArrival: VideoAsset = {
  type: "video",
  src: "/videos/crane-truck-arrival-chipper-loading.mp4",
  poster: "/videos/posters/crane-truck-arrival-chipper-loading.jpg",
  alt: "A JKE bucket truck staged in a driveway, boom extended into a tree, while crew load branches into a chipper",
  categories: ["crane", "tree-trimming", "equipment"],
  orientation: "portrait",
};

const videoGrappleTruckLoadingLogs: VideoAsset = {
  type: "video",
  src: "/videos/grapple-truck-loading-logs.mp4",
  poster: "/videos/posters/grapple-truck-loading-logs.jpg",
  alt: "A grapple truck loading cut logs on a cleared job site, dust rising",
  categories: ["logging", "land-clearing", "equipment"],
  orientation: "portrait",
  // The truck sits in the upper third of this portrait clip.
  focalPosition: "50% 30%",
};

const videoBucketTruckPowerLineTrim: VideoAsset = {
  type: "video",
  src: "/videos/bucket-truck-power-line-trim.mp4",
  poster: "/videos/posters/bucket-truck-power-line-trim.jpg",
  alt: "A bucket truck trimming limbs away from power lines while ground crew clear debris",
  categories: ["tree-trimming", "crane"],
  orientation: "portrait",
  // The bucket and worker sit just above center in this clip.
  focalPosition: "50% 35%",
};

const videoFleetTrucksSunset: VideoAsset = {
  type: "video",
  src: "/videos/fleet-trucks-sunset.mp4",
  poster: "/videos/posters/fleet-trucks-sunset.jpg",
  alt: "JKE bucket and crane trucks staged in a lot at sunset",
  categories: ["equipment"],
  orientation: "portrait",
};

const videoCrewHazardTreeClearing: VideoAsset = {
  type: "video",
  src: "/videos/crew-hazard-tree-clearing.mp4",
  poster: "/videos/posters/crew-hazard-tree-clearing.jpg",
  alt: "A JKE crew member walking a wooded lot with dead and leaning hazard trees",
  categories: ["land-clearing", "storm"],
  orientation: "portrait",
};

const videoCraneCabinProperty: VideoAsset = {
  type: "video",
  src: "/videos/crane-truck-cabin-property.mp4",
  poster: "/videos/posters/crane-truck-cabin-property.jpg",
  alt: "A JKE crane truck staged on a wooded cabin property ahead of removal work",
  categories: ["land-clearing", "crane", "equipment"],
  orientation: "portrait",
};

const videoBucketTruckFenceLineTrim: VideoAsset = {
  type: "video",
  src: "/videos/bucket-truck-fence-line-trim.mp4",
  poster: "/videos/posters/bucket-truck-fence-line-trim.jpg",
  alt: "A bucket truck trimming trees along a fence line",
  categories: ["tree-trimming", "crane"],
  orientation: "portrait",
};

const videoChainsawTreeFelling: VideoAsset = {
  type: "video",
  src: "/videos/chainsaw-tree-felling.mp4",
  poster: "/videos/posters/chainsaw-tree-felling.jpg",
  alt: "A JKE crew member making the felling cut on a large tree as it comes down",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const videoTreeCanopyDropFencedYard: VideoAsset = {
  type: "video",
  src: "/videos/tree-canopy-drop-fenced-yard.mp4",
  poster: "/videos/posters/tree-canopy-drop-fenced-yard.jpg",
  alt: "A cut tree section dropping in a fenced backyard during a removal",
  categories: ["tree-removal"],
  orientation: "portrait",
};

const videoPineTreeRopeRiggingWinter: VideoAsset = {
  type: "video",
  src: "/videos/pine-tree-rope-rigging-winter.mp4",
  poster: "/videos/posters/pine-tree-rope-rigging-winter.jpg",
  alt: "A tall pine roped and rigged for a controlled removal near a roadway",
  categories: ["storm", "crane", "tree-removal"],
  orientation: "portrait",
};

const videoTreeRemovalCleanupResult: VideoAsset = {
  type: "video",
  src: "/videos/tree-removal-cleanup-result.mp4",
  poster: "/videos/posters/tree-removal-cleanup-result.jpg",
  alt: "A front yard after a tree removal, cleaned up with the stump ground down and the lawn ready to recover",
  categories: ["tree-removal", "stump-grinding"],
  orientation: "portrait",
};

const videoCraneCabinPropertyClose: VideoAsset = {
  type: "video",
  src: "/videos/crane-truck-cabin-property-close.mp4",
  poster: "/videos/posters/crane-truck-cabin-property-close.jpg",
  alt: "Close-up of a JKE crane truck staged beside a wooded cabin property",
  categories: ["land-clearing", "crane", "equipment"],
  orientation: "portrait",
};

const videoCrewMemberFelledTree: VideoAsset = {
  type: "video",
  src: "/videos/crew-member-felled-tree.mp4",
  poster: "/videos/posters/crew-member-felled-tree.jpg",
  alt: "A JKE crew member in branded gear beside a freshly felled tree",
  categories: ["tree-removal"],
  orientation: "portrait",
};

// ---- Homepage section picks -------------------------------------------------

// Widest, most complete crane composition in the library — full boom, the
// storm-damaged roofline, and the tree still hanging above it in one frame.
export const heroImage = craneRemovingTreeOffHouse;
export const whyChooseImage = crewBuckingLogs;
// Emergency Storm Response section: the nighttime emergency call communicates
// urgency far more directly than a daytime removal shot — a crew member still
// working a hazard tree off a home after dark.
export const stormFeaturedImage = emergencyNightImage;

// Two distinct daytime crane-over-home jobs (different properties, different
// angles) — neither repeats stormFeaturedImage or heroImage above.
export const featuredProject = {
  title: "Crane Removal Over a Home",
  summary:
    "A storm-damaged limb removed by crane over a two-story house — the safest way to protect the roof, gutters, and landscaping when a tree can't simply be dropped.",
  images: [craneLogHouse, blackDumpBlueCrane],
};

export const actionVideos: VideoAsset[] = [
  videoStumpAction,
  videoLandClearing,
  videoClimber,
  // Rope rigging in control — a second worker manages the line as the
  // section comes down, a distinct capability from the climber clip above.
  videoPineTreeRopeRiggingWinter,
  // Crane and bucket truck working together — visually distinct from the
  // stump, land-clearing, and climbing clips already in this reel.
  videoBucketTruckArrival,
];

// Curated for the /crew page's "Crew In Action" section — real crew-forward
// photo/video, distinct from the team portrait used in that page's hero.
export const crewActionMedia: MediaAsset[] = [
  crewMemberBrandedHoodie,
  crewStumpGrinderAction,
  groundCrewChipperLoading,
  videoCrewOperatingStumpGrinder,
  videoCrewMemberFelledTree,
  videoCrewHazardTreeClearing,
];

// Curated for breadth, not repetition: one strong pick per major piece of
// equipment. Near-duplicate shots (e.g. the second logging-truck angle, the
// sunset fleet-lineup video that repeats the crewTrucksSunset photo) stay out
// of this section but remain in the Gallery archive below. Uses
// loggingTruckYard rather than the grapple-truck video, which is already the
// land-clearing service preview in the "Our Services" grid on this same page.
//
// The remaining log-truck tile (loggingTruckYard) was replaced with a strong
// crane shot and a dedicated grapple-loader/log-handling shot, so the section
// reads as fleet breadth rather than repeated logging-truck views. crewTrucksSunset
// (a static fleet photo covering the same ground as videoFleet, just parked
// rather than staged) also drops to make room without crowding the grid —
// both blueCrane and loaderMovingLog stay unique to this section. Every
// removed photo remains in the Gallery archive and, where relevant, on its
// service page.
export const equipmentMedia: MediaAsset[] = [
  craneTruckForestRoad,
  videoBucketTruckFenceLineTrim,
  videoFleet,
  stumpGrinderFreshCut,
  videoRootGrinderDriveway,
  videoCraneCabinProperty,
  bucketTruckHazard,
  blueCrane,
  loaderMovingLog,
];

// ---- Full gallery archive ---------------------------------------------------
// Every unique photo/video in the project lives here — this is the complete
// portfolio. Homepage sections above feature a curated subset of the strongest
// media; the Gallery page shows all of it.

// Ordered to lead with the most visually striking work first: crane removals,
// then storm damage, then close-to-structure work, technical rigging, large
// removals, pruning, and finishing/cleanup work last. Filtering by category
// is unaffected by this order — it only changes the default "All" sequence.
export const galleryMedia: MediaAsset[] = [
  // Crane removals
  craneRemovingTreeOffHouse,
  craneLogHouse,
  blackDumpBlueCrane,
  blueCrane,
  craneTreeShed,
  craneOverRoof,
  craneOverRoof2,
  videoBucketTruckArrival,
  videoCraneCabinProperty,
  videoCraneCabinPropertyClose,
  craneTruckForestRoad,
  heroCraneMaple,
  // Storm damage
  emergencyNightImage,
  craneLiftingBranchHouse,
  videoStormRigging,
  videoCrewHazardTreeClearing,
  videoPineTreeRopeRiggingWinter,
  // Trees over homes / close to structures
  bucketTruckHazard,
  groundCrewChipperLoading,
  // Technical rigging
  crewBuckingLogs,
  videoTreeCanopyDropFencedYard,
  videoChainsawTreeFelling,
  videoClimber,
  // Large removals
  bucketTruckPineRemoval,
  crewMemberBrandedHoodie,
  workerNextToChipper,
  videoCrewMemberFelledTree,
  videoTreeFell,
  pineTreeBeforeRemoval,
  videoBackyardCanopyView,
  videoBackyardCanopyViewWide,
  videoWoodedLotAssessment,
  // Pruning
  greyBucketTree,
  videoBucketTruckPowerLineTrim,
  videoBucketTruckFenceLineTrim,
  // Cleanup & finishing work
  videoTreeRemovalCleanupResult,
  stumpGrinderFreshCut,
  stumpGrindingYard,
  crewStumpGrinderAction,
  videoStumpAction,
  videoStumpGrinderWheelCloseup,
  videoRootGrinderDriveway,
  videoCrewOperatingStumpGrinder,
  landClearingVista,
  videoLandClearing,
  logMovedByCrane,
  loaderMovingLog,
  loggingTruckRoad,
  loggingTruckYard,
  videoGrappleTruckLoadingLogs,
  crewTrucksSunset,
  whiteTruckChipper,
  videoFleet,
  videoFleetTrucksSunset,
];

export const galleryCategories: MediaCategory[] = [
  "tree-removal",
  "tree-trimming",
  "crane",
  "stump-grinding",
  "land-clearing",
  "logging",
  "storm",
  "equipment",
];

// ---- Per-service homepage preview videos + service-page extra galleries -----
// Used by ServiceCard (homepage "Our Services" grid) and the service detail
// page. Keyed by service slug from src/lib/services.ts.

export const servicePreviewVideos: Record<string, VideoAsset> = {
  // Third clip from the "See Us In Action" reel (actionVideos below) — a
  // climber actively working a takedown communicates "tree removal" more
  // clearly than the previous chainsaw-at-the-base clip did.
  "tree-removal": videoClimber,
  "tree-trimming-pruning": videoBucketTruckPowerLineTrim,
  "stump-grinding": videoCrewOperatingStumpGrinder,
  "crane-bucket-truck-service": videoBucketTruckArrival,
  "land-clearing-logging": videoGrappleTruckLoadingLogs,
};

export const serviceExtraMedia: Record<string, MediaAsset[]> = {
  "tree-removal": [
    videoTreeCanopyDropFencedYard,
    videoTreeRemovalCleanupResult,
    crewMemberBrandedHoodie,
    pineTreeBeforeRemoval,
    videoCrewMemberFelledTree,
  ],
  "tree-trimming-pruning": [
    videoBucketTruckFenceLineTrim,
    groundCrewChipperLoading,
    videoBackyardCanopyViewWide,
  ],
  "stump-grinding": [
    videoStumpGrinderWheelCloseup,
    videoRootGrinderDriveway,
    stumpGrindingYard,
    crewStumpGrinderAction,
    videoTreeRemovalCleanupResult,
  ],
  // Ordered to read as stages of a job — arrival, the lift itself, a
  // different property/angle, rigging control, then aerial trim work —
  // instead of repeating the same roof-lift angle twice back to back. Skips
  // craneTruckForestRoad (this page's own hero image) and craneOverRoof2
  // (near-duplicate angle of craneOverRoof) to keep every shot on this page
  // distinct.
  "crane-bucket-truck-service": [
    videoBucketTruckArrival,
    craneOverRoof,
    craneLiftingBranchHouse,
    videoCraneCabinProperty,
    videoPineTreeRopeRiggingWinter,
    videoBucketTruckPowerLineTrim,
  ],
  // Skips landClearingVista (this page's own hero image) and
  // videoCraneCabinPropertyClose (a close-up repeat of videoCraneCabinProperty
  // already below) to keep every shot on this page distinct.
  "land-clearing-logging": [
    videoCraneCabinProperty,
    videoWoodedLotAssessment,
    videoCrewHazardTreeClearing,
    logMovedByCrane,
    loggingTruckYard,
    videoGrappleTruckLoadingLogs,
  ],
};
