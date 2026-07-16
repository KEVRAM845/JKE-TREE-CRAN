import type { FaqItem } from "@/components/Faq";
import { siteConfig } from "@/lib/site-config";

// General, site-wide FAQ for the /faq page. Every answer is grounded in
// facts already established elsewhere in the codebase (site-config.ts,
// services.ts, RequestForm.tsx, defaultProcess/defaultWhatToExpect) — no new
// claims, response times, pricing, certifications, or insurance procedures
// are introduced here. Per-service FAQs stay on their own service pages
// (see src/lib/services.ts); this list covers questions that apply
// regardless of which service someone needs.
//
// One recommended topic — insurance-documentation assistance — is
// intentionally omitted until the business owner confirms whether it's a
// real service. See DEPLOYMENT.md for the full list of items awaiting
// verification.
export const generalFaqs: FaqItem[] = [
  {
    q: "Do you provide free estimates?",
    a: "Yes. Every estimate starts with a free, no-obligation on-site visit — we look at the job and give you a clear price before any work begins.",
  },
  {
    q: "What information should I include in a service request?",
    a: `Your name, phone number, and the property address, plus which service you need and a short description of the job — the tree's location, size, and anything nearby like a house, fence, or power line. The more detail you give us, the more accurate our estimate can be.`,
  },
  {
    q: "Can I upload photos of the tree or damage?",
    a: "Yes — the request form lets you attach up to six photos. A photo or two of the tree or the damage helps us quote faster and more accurately, often before we even arrive.",
  },
  {
    q: "Do you provide emergency tree service?",
    a: "Yes. We handle hazardous and storm-damaged trees, including situations where a tree is already on a home, vehicle, or fence line. Marking a request as an emergency flags it so we know to prioritize it.",
  },
  {
    q: "What should I do when a tree falls on a house, vehicle, or power line?",
    a: "First, keep everyone clear of the area — especially away from any downed power lines, which should always be treated as live. If utility lines are involved, contact the power company or 911 as appropriate. Once the area is safe, call us and we'll prioritize getting the hazard assessed and handled.",
  },
  {
    q: "What is included with tree removal?",
    a: "A full removal — cutting, rigging, and safely lowering the tree in sections where needed — plus grinding the stump below grade and a complete cleanup, so you're left with a cleared, raked site rather than a pile of brush.",
  },
  {
    q: "Do you remove and haul away debris?",
    a: "Always. Every job, from a single tree to a full clearing, ends with complete debris cleanup and haul-away — we don't leave the mess for you to deal with.",
  },
  {
    q: "Is stump grinding included or scheduled separately?",
    a: "Stump grinding is available as an add-on to tree removal, or as its own scheduled service if you already have stumps to clear. Let us know what you need when you request an estimate and we'll scope it accordingly.",
  },
  {
    q: "How far below grade is a stump normally ground?",
    a: "We grind stumps below grade — deep enough that the area can be leveled, seeded, sodded, or built on without the stump resurfacing later. Exact depth depends on the stump and what you're planning for the spot, which we'll confirm during your estimate.",
  },
  {
    q: "When is crane-assisted removal necessary?",
    a: "When a tree is too tall, too dead, or too tightly surrounded by structures to climb or drop safely. A crane lifts sections up and out and sets them down exactly where we want them, instead of felling toward your house, garage, or fence — often the safest option on tight or hillside properties.",
  },
  {
    q: "Do I need to be home during the estimate or work?",
    a: "Being there for the estimate helps, since we can walk the property together and answer questions on the spot — but it's not strictly required as long as we can access the area and reach you by phone. We'll work out the details when you schedule.",
  },
  {
    q: "How do you protect lawns, driveways, roofs, and nearby structures?",
    a: "Before any cutting starts, we plan rigging, drop zones, and equipment placement around what's near the tree, and take care to protect your lawn, driveway, and structures throughout the job — not just clean up after the fact.",
  },
  {
    q: "What counties and towns do you serve?",
    a: `We serve ${siteConfig.serviceArea}, including towns like Poughkeepsie, Fishkill, Wappingers Falls, Beacon, Cold Spring, Carmel, Mahopac, Brewster, Newburgh, Middletown, and Kingston. If you're nearby and not sure whether you're in range, just reach out.`,
  },
  {
    q: "How does scheduling work after the estimate?",
    a: "Once you've had your free estimate, there's no pressure to move forward right away. If you'd like to go ahead, we find a time that works for your property and schedule the job.",
  },
];
