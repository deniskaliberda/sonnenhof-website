export interface Accommodation {
  id: string;
  slug: string;
  title: string;
  type: 'ferienwohnung' | 'zimmer';
  shortDescription: string;
  description: string;
  pricePerNight: number;
  pricePerNightLowSeason?: number;
  capacity: {
    adults: number;
    children: number;
    maxPersons: number;
  };
  size: number; // in m²
  floor: string;
  amenities: {
    icon: string;
    label: string;
  }[];
  highlights: string[];
  images: { src: string; alt: string }[];
  hasBalcony?: boolean;
  hasTerrasse?: boolean;
}

// Nebensaison: Januar, Februar, März, April, ab 10. Oktober, November, Dezember = 10€ weniger pro Tag
// Kurtaxe: 2,00 € pro Nacht und Erwachsenem
// Hunde: 10€ pro Nacht
// Weitere Personen: 23€/Nacht, Kinder bis 10 Jahre: 15€/Nacht, Kinder ab 10 Jahre: 20€/Nacht, Kinder bis 3 Jahre: frei
// Ausstattung: In jeder Ferienwohnung ist ein Toaster und Fön vorhanden

export const accommodations: Accommodation[] = [
  // ===== FERIENWOHNUNGEN =====
  {
    id: 'fewo-ammersee',
    slug: 'ferienwohnung-ammersee',
    title: 'Ferienwohnung Ammersee',
    type: 'ferienwohnung',
    shortDescription: 'Gemütliche Ferienwohnung mit großem, sonnigem Westbalkon',
    description: `Die Ferienwohnung "Ammersee" im 2. Stock bietet auf ca. 27 m² alles, was Sie für einen erholsamen Aufenthalt brauchen.

Die Wohnung verfügt über ein gemütliches Schlafzimmer und eine praktische Essküche, in der Sie sich selbst versorgen können. Das Bad ist mit Dusche und WC ausgestattet.

Das Highlight ist der große, sonnige Westbalkon – perfekt, um den Abend bei einem Glas Wein ausklingen zu lassen und die untergehende Sonne zu genießen.

Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Eine Endreinigungsgebühr fällt nicht an.`,
    pricePerNight: 100,
    pricePerNightLowSeason: 90,
    capacity: {
      adults: 2,
      children: 0,
      maxPersons: 2,
    },
    size: 27,
    floor: '2. Stock',
    hasBalcony: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Utensils', label: 'Essküche' },
      { icon: 'Sun', label: 'Sonniger Westbalkon' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Shirt', label: 'Bettwäsche & Handtücher inkl.' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Großer, sonniger Westbalkon',
      'Separate Essküche',
      'Ruhige Lage im 2. Stock',
    ],
    images: [
      { src: '/images/ferienwohnungen/ammersee/ammersee-02-kueche.jpg', alt: 'Voll ausgestattete Küche der Ferienwohnung Ammersee im Sonnenhof Herrsching' },
      { src: '/images/ferienwohnungen/ammersee/ammersee-03-schlafzimmer.jpg', alt: 'Gemütliches Schlafzimmer der Ferienwohnung Ammersee mit Doppelbett' },
      { src: '/images/ferienwohnungen/ammersee/ammersee-04-bad.jpg', alt: 'Modernes Badezimmer mit Dusche in der Ferienwohnung Ammersee' },
      { src: '/images/ferienwohnungen/ammersee/ammersee-05-balkon.jpg', alt: 'Sonniger Westbalkon der Ferienwohnung Ammersee mit Blick ins Grüne' },
      { src: '/images/ferienwohnungen/ammersee/ammersee-06-ausblick.jpg', alt: 'Ausblick vom Balkon der Ferienwohnung Ammersee auf die Umgebung' },
    ],
  },
  {
    id: 'fewo-utting',
    slug: 'ferienwohnung-utting',
    title: 'Ferienwohnung Utting',
    type: 'ferienwohnung',
    shortDescription: 'Geräumige Wohnung mit Wohn-Esszimmer und Westbalkon',
    description: `Die Ferienwohnung "Utting" im 2. Stock ist ca. 38 m² groß und ideal für Paare oder kleine Familien.

Sie verfügt über ein separates Schlafzimmer sowie ein gemütliches Wohn-Esszimmer mit praktischer Küchennische. Das moderne Bad ist mit Dusche und WC ausgestattet.

Der sonnige Westbalkon lädt zum Verweilen ein und bietet Ihnen einen schönen Rückzugsort im Freien.

Auf Wunsch können wir ein Kinderbett bereitstellen – so ist die Wohnung auch für junge Familien perfekt geeignet.

Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Eine Endreinigungsgebühr fällt nicht an.`,
    pricePerNight: 106,
    pricePerNightLowSeason: 96,
    capacity: {
      adults: 2,
      children: 2,
      maxPersons: 4,
    },
    size: 38,
    floor: '2. Stock',
    hasBalcony: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Utensils', label: 'Küchennische' },
      { icon: 'Sun', label: 'Sonniger Westbalkon' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Baby', label: 'Kinderbett möglich' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Separates Schlafzimmer',
      'Gemütliches Wohn-Esszimmer',
      'Kinderbett auf Anfrage',
    ],
    images: [
      { src: '/images/ferienwohnungen/utting/utting-01-wohnbereich.jpg', alt: 'Heller Wohnbereich der Ferienwohnung Utting im Sonnenhof Herrsching' },
      { src: '/images/ferienwohnungen/utting/utting-02-kueche.jpg', alt: 'Voll ausgestattete Küche der Ferienwohnung Utting' },
      { src: '/images/ferienwohnungen/utting/utting-03-schlafzimmer.jpg', alt: 'Gemütliches Schlafzimmer der Ferienwohnung Utting mit Doppelbett' },
      { src: '/images/ferienwohnungen/utting/utting-04-bad.jpg', alt: 'Modernes Badezimmer mit Dusche in der Ferienwohnung Utting' },
      { src: '/images/ferienwohnungen/utting/utting-05-balkon.jpg', alt: 'Sonniger Westbalkon der Ferienwohnung Utting mit Blick ins Grüne' },
      { src: '/images/ferienwohnungen/utting/utting-06-kinderbett.jpg', alt: 'Kinderbett im Schlafbereich der Ferienwohnung Utting' },
    ],
  },
  {
    id: 'fewo-andechs',
    slug: 'ferienwohnung-andechs',
    title: 'Ferienwohnung Andechs',
    type: 'ferienwohnung',
    shortDescription: 'Großzügige Familienwohnung mit zwei Schlafzimmern',
    description: `Die Ferienwohnung "Andechs" im 1. Stock ist mit ca. 55 m² unsere familienfreundlichste Wohnung.

Sie bietet ein großes Wohn-/Schlafzimmer sowie ein weiteres, kleineres Schlafzimmer – ideal für Familien mit Kindern. Die gemütliche Essküche lädt zu gemeinsamen Mahlzeiten ein. Das Bad ist mit Dusche und WC ausgestattet.

Das Highlight ist der große, sonnige Südostbalkon mit herrlichem Blick – perfekt für das Frühstück in der Morgensonne.

Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Eine Endreinigungsgebühr fällt nicht an.`,
    pricePerNight: 108,
    pricePerNightLowSeason: 98,
    capacity: {
      adults: 3,
      children: 2,
      maxPersons: 5,
    },
    size: 55,
    floor: '1. Stock',
    hasBalcony: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Utensils', label: 'Gemütliche Essküche' },
      { icon: 'Sun', label: 'Großer Südostbalkon' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Users', label: 'Ideal für Familien' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Zwei separate Schlafbereiche',
      'Großer, sonniger Südostbalkon',
      'Perfekt für Familien (max. 5 Personen)',
    ],
    images: [
      { src: '/images/ferienwohnungen/andechs/andechs-01-wohnbereich.jpg', alt: 'Geräumiger Wohnbereich der Ferienwohnung Andechs im Sonnenhof Herrsching' },
      { src: '/images/ferienwohnungen/andechs/andechs-02-schlafzimmer.jpg', alt: 'Schlafzimmer der Ferienwohnung Andechs mit Doppelbett' },
      { src: '/images/ferienwohnungen/andechs/andechs-02-schlafzimmer-klein.jpg', alt: 'Zweites Schlafzimmer der Ferienwohnung Andechs mit Einzelbett' },
      { src: '/images/ferienwohnungen/andechs/andechs-03-kueche.jpg', alt: 'Voll ausgestattete Küche der Ferienwohnung Andechs' },
      { src: '/images/ferienwohnungen/andechs/andechs-04-bad.jpg', alt: 'Badezimmer mit Dusche in der Ferienwohnung Andechs' },
    ],
  },
  {
    id: 'fewo-herrsching',
    slug: 'ferienwohnung-herrsching',
    title: 'Ferienwohnung Herrsching',
    type: 'ferienwohnung',
    shortDescription: 'Erdgeschoss-Wohnung mit großer, sonniger Terrasse',
    description: `Die Ferienwohnung "Herrsching" im Erdgeschoss ist ca. 38 m² groß und besticht durch ihre sehr große, sonnige Südostterrasse.

Sie verfügt über ein Schlafzimmer und eine geräumige Wohn-Essküche. Das Bad ist großzügig geschnitten und mit Dusche und WC ausgestattet.

Die Terrasse ist das Herzstück dieser Wohnung – hier können Sie die Morgensonne genießen und entspannte Stunden im Freien verbringen.

Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Eine Endreinigungsgebühr fällt nicht an.`,
    pricePerNight: 106,
    pricePerNightLowSeason: 96,
    capacity: {
      adults: 2,
      children: 0,
      maxPersons: 2,
    },
    size: 38,
    floor: 'Erdgeschoss',
    hasTerrasse: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Utensils', label: 'Wohn-Essküche' },
      { icon: 'Sun', label: 'Große Südostterrasse' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Accessibility', label: 'Erdgeschoss (ebenerdig)' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Sehr große, sonnige Südostterrasse',
      'Ebenerdiger Zugang',
      'Geräumiges Badezimmer',
    ],
    images: [
      { src: '/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg', alt: 'Großzügiger Wohnbereich der Ferienwohnung Herrsching im Sonnenhof' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-02-kueche.jpg', alt: 'Voll ausgestattete Küche der Ferienwohnung Herrsching' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-03-schlafzimmer.jpg', alt: 'Schlafzimmer der Ferienwohnung Herrsching mit Doppelbett' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-04-bad.jpg', alt: 'Modernes Badezimmer der Ferienwohnung Herrsching' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-05-terrasse.jpg', alt: 'Sonnige Südostterrasse der Ferienwohnung Herrsching' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-06-besonders.jpg', alt: 'Besonderes Detail der Ferienwohnung Herrsching' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-07-kamin.jpg', alt: 'Gemütlicher Kamin in der Ferienwohnung Herrsching' },
      { src: '/images/ferienwohnungen/herrsching/herrsching-08-sitzecke.jpg', alt: 'Einladende Sitzecke in der Ferienwohnung Herrsching' },
    ],
  },
  {
    id: 'fewo-diessen',
    slug: 'ferienwohnung-diessen',
    title: 'Ferienwohnung Dießen',
    type: 'ferienwohnung',
    shortDescription: 'Großzügige Familienwohnung mit Badewanne und Terrasse',
    description: `Die Ferienwohnung "Dießen" im Erdgeschoss ist mit ca. 55 m² unsere komfortabelste Wohnung.

Sie verfügt über ein großes Schlafzimmer mit Doppelbett und einem Extrabett für einen weiteren Erwachsenen oder zwei Kinder. Die Küche ist mit Spülmaschine, großem Kühlschrank und Mikrowelle ausgestattet.

Das Badezimmer ist ein besonderes Highlight: Eine Echtholzdecke schafft eine warme Atmosphäre, und die Badewanne mit Haltegriffen und Duschvorhang bietet Komfort für jeden Anspruch.

Das geräumige Wohn-/Esszimmer mit großem, gemütlichem Sofa und großem Esstisch lädt zum Verweilen ein. Die Terrasse ist nach Südosten ausgerichtet.

Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Eine Endreinigungsgebühr fällt nicht an.`,
    pricePerNight: 112,
    pricePerNightLowSeason: 102,
    capacity: {
      adults: 3,
      children: 2,
      maxPersons: 5,
    },
    size: 55,
    floor: 'Erdgeschoss',
    hasTerrasse: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Utensils', label: 'Küche mit Spülmaschine' },
      { icon: 'Sun', label: 'Südostterrasse' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Bath', label: 'Badewanne mit Haltegriffen' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Großzügige Küche mit Spülmaschine',
      'Badewanne mit Echtholzdecke',
      'Perfekt für Familien (max. 4-5 Personen)',
    ],
    images: [
      { src: '/images/ferienwohnungen/diessen/diessen-01-wohnbereich.jpg', alt: 'Großzügiger Wohnbereich der Ferienwohnung Dießen im Sonnenhof Herrsching' },
      { src: '/images/ferienwohnungen/diessen/diessen-02-kueche.jpg', alt: 'Voll ausgestattete Küche der Ferienwohnung Dießen' },
      { src: '/images/ferienwohnungen/diessen/diessen-03-schlafzimmer.jpg', alt: 'Hauptschlafzimmer der Ferienwohnung Dießen mit Doppelbett' },
      { src: '/images/ferienwohnungen/diessen/diessen-03-schlafzimmer-2.jpg', alt: 'Zweites Schlafzimmer der Ferienwohnung Dießen' },
      { src: '/images/ferienwohnungen/diessen/diessen-04-bad.jpg', alt: 'Geräumiges Badezimmer der Ferienwohnung Dießen mit Badewanne' },
      { src: '/images/ferienwohnungen/diessen/diessen-04-bad-2.jpg', alt: 'Zweites Badezimmer der Ferienwohnung Dießen' },
    ],
  },

  // ===== ZIMMER =====
  // Doppelzimmer mit Balkon
  {
    id: 'dz-balkon',
    slug: 'doppelzimmer-mit-balkon',
    title: 'Doppelzimmer mit Balkon',
    type: 'zimmer',
    shortDescription: 'Komfortables Doppelzimmer mit eigenem Balkon',
    description: `Unser Doppelzimmer mit Balkon bietet Ihnen einen komfortablen Rückzugsort mit eigenem Außenbereich.

Das Zimmer ist mit allem ausgestattet, was Sie brauchen: ein bequemes Doppelbett, eigenes Bad mit Dusche und WC sowie kostenloses WLAN.

Der Balkon lädt zum Entspannen ein und bietet Ihnen die Möglichkeit, den Tag in Ruhe ausklingen zu lassen.

Im 1. Stock befindet sich unsere kleine Teeküche mit Kaffeemaschine, Wasserkocher, Kühlschrank, Toaster und Mikrowelle – hier können Sie sich selbst ein kleines Frühstück zubereiten.

Mindestübernachtung: 2 Nächte. Zimmerreinigung jeden 3. Tag.`,
    pricePerNight: 117,
    pricePerNightLowSeason: 107,
    capacity: {
      adults: 2,
      children: 0,
      maxPersons: 2,
    },
    size: 22,
    floor: 'variiert',
    hasBalcony: true,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Sun', label: 'Eigener Balkon' },
      { icon: 'Shower', label: 'Eigenes Bad/Dusche/WC' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Coffee', label: 'Teeküche im 1. Stock' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Eigener Balkon',
      'Zugang zur Teeküche',
      'Ruhige Lage',
    ],
    images: [
      { src: '/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg', alt: 'Doppelzimmer mit Balkon im Sonnenhof Herrsching' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer-2.jpg', alt: 'Doppelzimmer mit Balkon – Blick zum Doppelbett' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer-3.jpg', alt: 'Doppelzimmer mit Balkon – Sitzbereich am Fenster' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-2-balkon-01-zimmer.jpg', alt: 'Zweites Doppelzimmer mit Balkon im Sonnenhof Herrsching' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-balkon-03-balkon.jpg', alt: 'Balkon des Doppelzimmers mit Aussicht ins Grüne' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-balkon-04-balkon.jpg', alt: 'Gemütlicher Balkon des Doppelzimmers am Sonnenhof' },
      { src: '/images/zimmer/doppelzimmer-balkon/dz-2-balkon-03-balkon.jpg', alt: 'Balkon des zweiten Doppelzimmers mit Blick in den Garten' },
    ],
  },
  // Doppelzimmer ohne Balkon
  {
    id: 'dz-ohne-balkon',
    slug: 'doppelzimmer-ohne-balkon',
    title: 'Doppelzimmer',
    type: 'zimmer',
    shortDescription: 'Gemütliches Doppelzimmer mit eigenem Bad',
    description: `Unser gemütliches Doppelzimmer bietet Ihnen alles für einen erholsamen Aufenthalt.

Das Zimmer verfügt über ein bequemes Doppelbett, eigenes Bad mit Dusche und WC sowie kostenloses WLAN.

Im 1. Stock befindet sich unsere kleine Teeküche mit Kaffeemaschine, Wasserkocher, Kühlschrank, Toaster und Mikrowelle – hier können Sie sich selbst ein kleines Frühstück zubereiten. Alternativ laden die vielen nahegelegenen Cafés und Bäckereien zum Frühstück ein.

Mindestübernachtung: 2 Nächte. Zimmerreinigung jeden 3. Tag.`,
    pricePerNight: 107,
    pricePerNightLowSeason: 97,
    capacity: {
      adults: 2,
      children: 0,
      maxPersons: 2,
    },
    size: 20,
    floor: 'variiert',
    hasBalcony: false,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Shower', label: 'Eigenes Bad/Dusche/WC' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Coffee', label: 'Teeküche im 1. Stock' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Ruhige, gemütliche Atmosphäre',
      'Zugang zur Teeküche',
      'Günstiger als Zimmer mit Balkon',
    ],
    images: [
      { src: '/images/zimmer/doppelzimmer/dz-01-zimmer.jpg', alt: 'Doppelzimmer im Sonnenhof Herrsching mit Doppelbett' },
      { src: '/images/zimmer/doppelzimmer/dz-02-zimmer.jpg', alt: 'Doppelzimmer im Sonnenhof – Ansicht vom Fenster' },
      { src: '/images/zimmer/doppelzimmer/dz-03-zimmer.jpg', alt: 'Doppelzimmer im Sonnenhof – Detailansicht' },
      { src: '/images/zimmer/doppelzimmer/dz-04-zimmer.jpg', alt: 'Doppelzimmer im Sonnenhof – Sitzbereich' },
      { src: '/images/zimmer/doppelzimmer/dz-05-bad.jpg', alt: 'Badezimmer des Doppelzimmers im Sonnenhof Herrsching' },
    ],
  },
  // Einzelzimmer
  {
    id: 'einzelzimmer',
    slug: 'einzelzimmer',
    title: 'Einzelzimmer',
    type: 'zimmer',
    shortDescription: 'Gemütliches Einzelzimmer mit eigenem Bad',
    description: `Unser gemütliches Einzelzimmer ist ideal für Alleinreisende und Geschäftsreisende.

Das Zimmer verfügt über ein bequemes Einzelbett, eigenes Bad mit Dusche und WC sowie kostenloses WLAN.

Im 1. Stock befindet sich unsere kleine Teeküche mit Kaffeemaschine, Wasserkocher, Kühlschrank, Toaster und Mikrowelle – hier können Sie sich selbst ein kleines Frühstück zubereiten. Alternativ laden die vielen nahegelegenen Cafés und Bäckereien zum Frühstück ein.

Mindestübernachtung: 2 Nächte. Zimmerreinigung jeden 3. Tag.`,
    pricePerNight: 85,
    pricePerNightLowSeason: 75,
    capacity: {
      adults: 1,
      children: 0,
      maxPersons: 1,
    },
    size: 14,
    floor: 'variiert',
    hasBalcony: false,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Shower', label: 'Eigenes Bad/Dusche/WC' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Coffee', label: 'Teeküche im 1. Stock' },
      { icon: 'Dog', label: 'Hunde willkommen (10€/Nacht)' },
    ],
    highlights: [
      'Kompakt und gemütlich',
      'Zugang zur Teeküche',
      'Unser günstigstes Angebot',
    ],
    images: [
      { src: '/images/zimmer/einzelzimmer/ez-01-zimmer.jpg', alt: 'Einzelzimmer im Sonnenhof Herrsching mit Einzelbett' },
      { src: '/images/zimmer/einzelzimmer/ez-01-zimmer-2.jpg', alt: 'Einzelzimmer im Sonnenhof – Schreibtischbereich' },
      { src: '/images/zimmer/einzelzimmer/ez-02-bad.jpg', alt: 'Badezimmer des Einzelzimmers im Sonnenhof Herrsching' },
    ],
  },
];

// Preishinweise
export const priceInfo = {
  kurtaxe: 2.0, // pro Nacht und Erwachsenem
  hundePreis: 10.0, // pro Nacht
  zusatzPersonErwachsen: 23.0, // pro Nacht
  zusatzKindBis10: 15.0, // pro Nacht
  zusatzKindAb10: 20.0, // pro Nacht
  kinderFrei: 3, // bis einschließlich Jahre
  nebensaisonRabatt: 10.0, // Euro weniger pro Tag
  nebensaisonMonate: ['Januar', 'Februar', 'März', 'April', 'November', 'Dezember'],
  nebensaisonAb: '10. Oktober',
  mindestaufenthaltZimmer: 2, // Nächte
};

// Buchungshinweise
export const bookingInfo = {
  ferienwohnungen: {
    buchungsart: 'Wochenweise von Wochenende zu Wochenende bzw. bis Mittwoch',
    anzahlung: true,
    hauptsaison: 'Juni, Juli, August, September, bis 15. Oktober',
  },
  zimmer: {
    mindestaufenthalt: 2,
    reinigung: 'Zimmerreinigung jeden 3. Tag',
    ohneFreuhstueck: true,
    teekueche: 'Im 1. Stock: Kaffeemaschine, Wasserkocher, Kühlschrank, Toaster, Mikrowelle',
  },
  allgemein: {
    anreise: '15:00 - 18:00 Uhr oder nach telefonischer Vereinbarung',
    erreichbarkeit: 'Anfragen ganztags per Mail oder telefonisch',
    bezahlung: ['Vorabüberweisung', 'Barzahlung bei Anreise'],
    keineKarten: 'Leider können wir keine EC-/Kreditkarten nehmen.',
    parkplatz: 'Kostenloser PKW Stellplatz auf dem Hof',
    wlan: 'Kostenloses WLAN vorhanden',
    haustiere: 'Hunde willkommen (10€ pro Nacht)',
    kinder: 'Kinder herzlich willkommen',
    ausstattungFewo: 'In jeder Ferienwohnung: Toaster und Fön',
  },
  lage: {
    baecker: '5 Minuten zu Fuß',
    supermarkt: '10 Minuten zu Fuß',
    sBahn: '10 Minuten zu Fuß zum S-Bahnhof Herrsching',
    muenchen: 'S8 nach München Marienplatz: 45 Minuten',
    flughafen: 'S8 direkt zum Münchner Flughafen',
  },
  ausflugsziele: {
    seen: ['Ammersee (direkt vor Ort)', 'Starnberger See (20 Min.)', 'Dampferfahrten & Baden'],
    muenchen: 'München mit S8 in 45 Min. – Marienplatz, Museen, Shopping',
    berge: ['Garmisch-Partenkirchen (1 Std.)', 'Zugspitze (1 Std.)', 'Schlösser König Ludwig (1 Std.)'],
  },
  stornierung: `Eine kostenlose Stornierung ist leider nicht möglich. Sollte eine Reise nicht angetreten werden können, muss trotzdem der gesamte Reisepreis bezahlt werden. Wir sind zu klein, um dieses Risiko für unsere Gäste zu tragen. Dieses Risiko müssten unsere Gäste über eine private Reiserücktrittversicherung abdecken, welche es schon für wenig Geld gibt. Wir bemühen uns jedoch sehr um Ersatzbuchungen. In diesem Fall ist eine Bezahlung natürlich nicht nötig.`,
};

export function getAccommodationBySlug(slug: string): Accommodation | undefined {
  return accommodations.find((acc) => acc.slug === slug);
}

export function getAccommodationsByType(type: 'ferienwohnung' | 'zimmer'): Accommodation[] {
  return accommodations.filter((acc) => acc.type === type);
}

export function getFerienwohnungen(): Accommodation[] {
  return getAccommodationsByType('ferienwohnung');
}

export function getZimmer(): Accommodation[] {
  return getAccommodationsByType('zimmer');
}
