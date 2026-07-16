export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible FAQ using native <details>/<summary> (zero JS, keyboard-friendly).
 * Emits FAQPage structured data for rich results. Renders nothing when empty.
 */
export default function Faq({
  items,
  heading = "Frequently Asked Questions",
}: {
  items?: FaqItem[];
  heading?: string;
}) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-forest">{heading}</h2>
      <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest transition-colors marker:hidden hover:text-orange">
              <span>{item.q}</span>
              <svg
                className="h-5 w-5 flex-shrink-0 text-orange transition-transform duration-300 ease-premium group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="mt-3 text-foreground/80">{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
