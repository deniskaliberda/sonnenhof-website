# Google Ads — Sonnenhof Herrsching

## Was ist das hier?

Dieser Ordner enthält alles, was für die Google-Werbung des Sonnenhof gebraucht wird:
- **Keyword-Listen** zum Hochladen in Google Ads
- **Anzeigentexte** als Vorlagen
- **Automatisierungs-Scripts** für Google Ads
- **Berichts-Vorlagen** für die monatliche Auswertung

## Für Conny: Was Google Ads macht

Google Ads zeigt Ihre Pension genau dann an, wenn jemand bei Google nach "Ferienwohnung Ammersee" oder "Pension Herrsching" sucht. Sie bezahlen nur, wenn jemand auf die Anzeige klickt (ca. 1-2 Euro pro Klick).

### Was Sie erwarten können (bei 500 Euro/Monat Budget)
- ~330 Besucher pro Monat auf Ihrer Website
- ~13 Anfragen über das Kontaktformular
- ~3-4 Buchungen daraus
- ~1.800 Euro Umsatz = **3,6x Ihre Investition zurück**

### Wöchentlicher Bericht
Jeden Montag erhalten Sie eine E-Mail mit:
- Wie viele Klicks diese Woche
- Wie viele Anfragen eingegangen sind
- Wie viel ausgegeben wurde

### Budget anpassen oder pausieren
Jederzeit möglich — kein Vertrag, keine Bindung. Einfach Denis Bescheid geben.

## Für Denis: Technische Übersicht

### Voraussetzungen (Phase 0)
1. Google Ads Account erstellen (Expert Mode)
2. GA4 Property erstellen + GTM Container
3. Cookie-Consent-Banner (`components/cookie-consent.tsx`)
4. GTM-Script in `app/layout.tsx`
5. Conversion-Event in `components/inquiry-form.tsx`
6. CSP-Header in `vercel.json` aktualisieren
7. Datenschutz-Seite ergänzen

### Kampagnen-Struktur
- **Kampagne 1:** Ferienwohnungen (70% Budget) — 3 Ad Groups
- **Kampagne 2:** Pension/Zimmer (30% Budget) — 2 Ad Groups
- **Kampagne 3 (später):** Events/Saisonal (Oktoberfest, Messen)

### Dateien in diesem Ordner
```
ads/
├── keywords/
│   ├── campaign-1-ferienwohnungen.csv   # Keyword-Liste Fewo-Kampagne
│   ├── campaign-2-pension.csv           # Keyword-Liste Pension-Kampagne
│   └── negative-keywords-shared.csv     # Ausschluss-Keywords (alle Kampagnen)
├── ad-copy/
│   ├── rsa-ferienwohnungen.csv          # Anzeigentexte Fewo
│   ├── rsa-pension.csv                  # Anzeigentexte Pension
│   └── extensions.csv                   # Sitelinks, Callouts, etc.
├── scripts/
│   ├── budget-alert.js                  # Tagesbudget-Warnung per E-Mail
│   ├── negative-keyword-miner.js        # Auto-Negatives aus Suchbericht
│   └── weekly-report.js                 # Wöchentliche Zusammenfassung
└── reports/
    └── monthly-template.md              # Monatsbericht-Vorlage
```
