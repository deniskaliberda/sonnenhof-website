export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  heading?: string;
  subheading?: string;
}

export function FAQ({ items, heading = "Häufige Fragen", subheading }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
          {heading}
        </h2>
        {subheading && (
          <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
        {!subheading && <div className="mb-12" />}

        <div className="space-y-3">
          {items.map((item, index) => (
            <details
              key={index}
              className="border border-forest/10 rounded-xl overflow-hidden group"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer bg-stone/50 hover:bg-stone transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-forest text-lg">
                  {item.question}
                </span>
                <svg
                  className="w-5 h-5 text-forest/60 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="px-6 py-5">
                <p className="text-text-primary/80 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
