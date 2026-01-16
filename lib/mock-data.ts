export interface Accommodation {
  id: string;
  slug: string;
  title: string;
  type: 'ferienwohnung' | 'zimmer';
  shortDescription: string;
  description: string;
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: number; // in m²
  amenities: {
    icon: string;
    label: string;
  }[];
  images: string[];
}

export const accommodations: Accommodation[] = [
  {
    id: '1',
    slug: 'ferienwohnung-alpenblick',
    title: 'Ferienwohnung Alpenblick',
    type: 'ferienwohnung',
    shortDescription: 'Geräumige Ferienwohnung mit Balkon und Seeblick',
    description: `Willkommen in unserer liebevoll eingerichteten Ferienwohnung "Alpenblick". Auf 65 m² bietet diese helle und moderne Wohnung alles, was Sie für einen erholsamen Aufenthalt am Ammersee brauchen.

Der großzügige Wohn-Essbereich mit gemütlicher Sitzecke und Flat-TV lädt zum Entspannen ein. Die voll ausgestattete Küche lässt keine Wünsche offen – vom Backofen über Geschirrspüler bis zur Kaffeemaschine ist alles vorhanden.

Das separate Schlafzimmer verfügt über ein komfortables Doppelbett und einen großen Kleiderschrank. Das moderne Badezimmer ist mit Dusche, WC und Föhn ausgestattet.

Das Highlight ist der sonnige Balkon mit Blick ins Grüne und auf die Alpen. Hier können Sie Ihren Morgenkaffee genießen oder den Tag bei einem Glas Wein ausklingen lassen.

Die Wohnung liegt im Erdgeschoss und verfügt über einen eigenen Eingang. Ein kostenloser Parkplatz direkt am Haus steht Ihnen zur Verfügung. Zum Ammersee und Dampfersteg sind es nur 5 Gehminuten.`,
    pricePerNight: 95,
    capacity: {
      adults: 4,
      children: 2,
    },
    size: 65,
    amenities: [
      { icon: 'Wifi', label: 'Kostenloses WLAN' },
      { icon: 'Tv', label: 'Flat-TV' },
      { icon: 'Utensils', label: 'Voll ausgestattete Küche' },
      { icon: 'Waves', label: '5 Min. zum See' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
      { icon: 'Home', label: 'Eigener Eingang' },
      { icon: 'Wind', label: 'Balkon mit Alpenblick' },
      { icon: 'Shirt', label: 'Waschmaschine' },
      { icon: 'Baby', label: 'Kinderbett auf Anfrage' },
      { icon: 'Dog', label: 'Haustiere erlaubt' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260066-6bc35f0a1f80?w=800&q=80',
    ],
  },
  {
    id: '2',
    slug: 'doppelzimmer-seerosentraum',
    title: 'Doppelzimmer Seerosentraum',
    type: 'zimmer',
    shortDescription: 'Romantisches Doppelzimmer mit eigenem Bad',
    description: `Unser charmantes Doppelzimmer "Seerosentraum" verbindet bayerische Gemütlichkeit mit modernem Komfort. Auf 24 m² finden Sie alles, was Sie für einen erholsamen Aufenthalt brauchen.

Das Zimmer ist mit einem bequemen Doppelbett (180x200 cm) ausgestattet und verfügt über einen großen Kleiderschrank sowie eine gemütliche Sitzecke am Fenster. Von hier aus blicken Sie in unseren ruhigen Garten.

Das eigene, moderne Badezimmer ist mit einer geräumigen Dusche, WC, Föhn und hochwertigen Pflegeprodukten ausgestattet. Flauschige Handtücher werden selbstverständlich gestellt.

Für Business-Reisende steht ein Schreibtisch mit bequemem Stuhl zur Verfügung. Das schnelle WLAN (50 Mbit/s) ermöglicht problemloses Arbeiten. Ein Flat-TV und ein Minikühlschrank runden die Ausstattung ab.

Optional können Sie unser reichhaltiges bayerisches Frühstück dazubuchen (12 € pro Person). Dieses servieren wir Ihnen zwischen 7:30 und 10:00 Uhr in unserem gemütlichen Frühstücksraum.`,
    pricePerNight: 79,
    capacity: {
      adults: 2,
      children: 0,
    },
    size: 24,
    amenities: [
      { icon: 'Wifi', label: 'Schnelles WLAN (50 Mbit/s)' },
      { icon: 'Tv', label: 'Flat-TV' },
      { icon: 'Briefcase', label: 'Schreibtisch' },
      { icon: 'Coffee', label: 'Frühstück optional (12 €)' },
      { icon: 'Shower', label: 'Eigenes Bad mit Dusche' },
      { icon: 'Wind', label: 'Gartenblick' },
      { icon: 'Sparkles', label: 'Tägliche Reinigung' },
      { icon: 'Car', label: 'Kostenloser Parkplatz' },
    ],
    images: [
      'https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    ],
  },
  {
    id: '3',
    slug: 'einzelzimmer-bergfrieden',
    title: 'Einzelzimmer Bergfrieden',
    type: 'zimmer',
    shortDescription: 'Gemütliches Einzelzimmer für Business und Solo-Reisende',
    description: `Unser "Bergfrieden" ist das perfekte Einzelzimmer für Geschäftsreisende und Solo-Traveller, die Ruhe und Komfort schätzen. Auf kompakten 18 m² ist alles clever durchdacht.

Das hochwertige Einzelbett (120x200 cm) garantiert erholsamen Schlaf. Ein großes Fenster sorgt für viel Tageslicht und einen schönen Ausblick auf die Berge.

Das eigene Badezimmer ist modern und funktional mit Dusche, WC und allen wichtigen Pflegeprodukten ausgestattet.

Besonders praktisch für Business-Gäste: Ein großzügiger Schreibtisch mit ergonomischem Stuhl, schnelles WLAN und ausreichend Steckdosen für alle Geräte. Ein Flat-TV und ein kleiner Kühlschrank sind ebenfalls vorhanden.

Die Lage ist ideal: Ruhig gelegen und trotzdem nur wenige Minuten zu Fuß vom Bahnhof Herrsching entfernt. Perfekt für Pendler und Geschäftsreisende.

Unser reichhaltiges Frühstück können Sie optional für 12 € pro Person dazubuchen – der perfekte Start in einen produktiven Tag.`,
    pricePerNight: 65,
    capacity: {
      adults: 1,
      children: 0,
    },
    size: 18,
    amenities: [
      { icon: 'Wifi', label: 'Schnelles WLAN' },
      { icon: 'Tv', label: 'Flat-TV' },
      { icon: 'Briefcase', label: 'Großer Schreibtisch' },
      { icon: 'Coffee', label: 'Frühstück optional (12 €)' },
      { icon: 'Shower', label: 'Eigenes Bad' },
      { icon: 'Train', label: 'Nähe Bahnhof' },
      { icon: 'Sparkles', label: 'Tägliche Reinigung' },
      { icon: 'Car', label: 'Parkplatz' },
    ],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    ],
  },
];

export function getAccommodationBySlug(slug: string): Accommodation | undefined {
  return accommodations.find((acc) => acc.slug === slug);
}

export function getAccommodationsByType(type: 'ferienwohnung' | 'zimmer'): Accommodation[] {
  return accommodations.filter((acc) => acc.type === type);
}
