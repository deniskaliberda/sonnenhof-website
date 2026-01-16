import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
}

export function FeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  ctaText,
  ctaLink,
}: FeatureSectionProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            isImageLeft ? '' : 'lg:grid-flow-dense'
          }`}
        >
          {/* Image */}
          <div 
            className={`relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl ${
              isImageLeft ? '' : 'lg:col-start-2'
            }`}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className={isImageLeft ? '' : 'lg:col-start-1 lg:row-start-1'}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-6 leading-tight">
              {title}
            </h2>
            <div className="prose prose-lg max-w-none text-text-primary/80 leading-relaxed space-y-4">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {ctaText && ctaLink && (
              <div className="mt-8">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-forest hover:bg-forest/90"
                >
                  <Link href={ctaLink}>{ctaText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
