import type { FAQItem } from '@/components/sections/faq';
import homepageAdditions from '@/schema/homepage-additions.json';
import ferienwohnungenPage from '@/schema/ferienwohnungen-page.json';
import zimmerPage from '@/schema/zimmer-page.json';
import erlebenPage from '@/schema/erleben-page.json';

import ammersee from '@/schema/einzelne-unterkuenfte/ferienwohnung-ammersee.json';
import utting from '@/schema/einzelne-unterkuenfte/ferienwohnung-utting.json';
import andechs from '@/schema/einzelne-unterkuenfte/ferienwohnung-andechs.json';
import herrsching from '@/schema/einzelne-unterkuenfte/ferienwohnung-herrsching.json';
import diessen from '@/schema/einzelne-unterkuenfte/ferienwohnung-diessen.json';
import dzBalkon from '@/schema/einzelne-unterkuenfte/doppelzimmer-mit-balkon.json';
import dzOhneBalkon from '@/schema/einzelne-unterkuenfte/doppelzimmer-ohne-balkon.json';
import einzelzimmer from '@/schema/einzelne-unterkuenfte/einzelzimmer.json';

// Each accommodation JSON is an array: [VacationRental/HotelRoom, FAQPage]
const accommodationSchemas: Record<string, Record<string, unknown>[]> = {
  'ferienwohnung-ammersee': ammersee as unknown as Record<string, unknown>[],
  'ferienwohnung-utting': utting as unknown as Record<string, unknown>[],
  'ferienwohnung-andechs': andechs as unknown as Record<string, unknown>[],
  'ferienwohnung-herrsching': herrsching as unknown as Record<string, unknown>[],
  'ferienwohnung-diessen': diessen as unknown as Record<string, unknown>[],
  'doppelzimmer-mit-balkon': dzBalkon as unknown as Record<string, unknown>[],
  'doppelzimmer-ohne-balkon': dzOhneBalkon as unknown as Record<string, unknown>[],
  'einzelzimmer': einzelzimmer as unknown as Record<string, unknown>[],
};

export function getAccommodationSchema(slug: string): Record<string, unknown> | undefined {
  return accommodationSchemas[slug]?.[0];
}

export function getAccommodationFaqSchema(slug: string): Record<string, unknown> | undefined {
  return accommodationSchemas[slug]?.[1];
}

export function getAccommodationFaqItems(slug: string): FAQItem[] {
  const faqSchema = accommodationSchemas[slug]?.[1];
  if (!faqSchema) return [];
  return extractFaqItems(faqSchema);
}

// homepage-additions.json is an array: [LodgingBusiness additions, FAQPage]
export const homepageLodgingAdditions = homepageAdditions[0] as Record<string, unknown>;
export const homepageFaqSchema = homepageAdditions[1] as Record<string, unknown>;

// ferienwohnungen-page.json is an array: [ItemList, FAQPage]
export const ferienwohnungenSchemas = ferienwohnungenPage as Record<string, unknown>[];

// zimmer-page.json is an array: [ItemList, FAQPage]
export const zimmerSchemas = zimmerPage as Record<string, unknown>[];

// erleben-page.json is an array: [TouristDestination, FAQPage]
export const erlebenSchemas = erlebenPage as Record<string, unknown>[];

// Extract FAQ items from a FAQPage schema object for visual rendering
export function extractFaqItems(schema: Record<string, unknown>): FAQItem[] {
  const mainEntity = schema?.mainEntity;
  if (!Array.isArray(mainEntity)) return [];

  return mainEntity
    .filter((item: Record<string, unknown>) => item['@type'] === 'Question')
    .map((item: Record<string, unknown>) => ({
      question: String(item.name || ''),
      answer: String((item.acceptedAnswer as Record<string, unknown>)?.text || ''),
    }));
}
