# Google Ads — Sonnenhof Herrsching

## Was ist das hier?

Dieser Ordner enthält alles, was für die Google-Werbung des Sonnenhof gebraucht wird:
- **Keyword-Listen** zum Hochladen in Google Ads
- **Anzeigentexte** als Vorlagen
- **Automatisierungs-Scripts** für Google Ads
- **Berichts-Vorlagen** für die monatliche Auswertung

## Für Conny: Was Google Ads macht

Google Ads zeigt Ihre Pension genau dann an, wenn jemand bei Google nach "Ferienwohnung Ammersee" oder "Pension Herrsching" sucht. Sie bezahlen nur, wenn jemand auf die Anzeige klickt (ca. 1-2 Euro pro Klick).

### Aktuelle Ergebnisse (Stand März 2026)
- Budget: €25/Tag (erhöht von €16/Tag am 21.03.2026)
- **23 Anfragen in 5 Wochen** (13 davon seit Ads-Start)
- Anfragen pro Tag: **3× mehr seit Google Ads** (0,4 → 1,2/Tag)
- Kosten pro Anfrage: ~€12,80
- CPC: €0,30 (sehr günstig)
- ROAS: 25-40× (jeder Werbe-Euro bringt 25-40€ Buchungsumsatz)

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

### Kampagnen-Struktur (aktuell)
- **Kampagne:** Performance Max "Ferienwohnung am Ammersee" — 1 Asset Group
- Ad Strength: **Good** (Video fehlt für Excellent)
- 15 Headlines, 5 Long Headlines, 5 Descriptions, 11 Images, 0 Videos
- 6 Sitelinks, 8 Callouts, Structured Snippets, Price Extensions
- Brand Guidelines: Sonnenhof Herrsching, #2C4F40 / #C59D5F, Playfair Display

### Kampagnen-Struktur (geplante Expansion)
- **Kampagne 1: Lokal** (bestehend, optimieren) — München, Starnberg, Landsberg, FFB, Augsburg — €15/Tag
- **Kampagne 2: Ballungsräume Süd** (NEU, ab April) — Stuttgart, Frankfurt, Nürnberg — €15/Tag
- **Kampagne 3: Ballungsräume Nord** (NEU, ab Mai) — NRW, Berlin, Hamburg — €20/Tag

### Geo-Targeting Erkenntnisse (März 2026)
- **Problem:** 48% Impressionen gehen an PLZ 82211 (Herrsching = Locals, keine Urlauber)
- **Fix:** Herrsching ausschließen, Budget nach München/überregional verschieben
- **Beste Tage:** Sonntag (126 Klicks), Samstag (55), Freitag (54)
- **Schwächste Tage:** Montag (36), Dienstag (39)
- **Empfehlung:** Wochenend-Gebotsanpassung +30%, Mo-Di -20%

### Quellmärkte (Reiseanalyse Bayern 2022)
Top innerdeutsche Quellmärkte für Bayern-Tourismus:
1. Bayern selbst: 22,7% (haben wir lokal)
2. **Baden-Württemberg: 18,6%** → Stuttgart
3. **NRW: 16,7%** → Köln, Düsseldorf, Ruhrgebiet (schon Anfragen aus Essen)
4. **Hessen: 8,2%** → Frankfurt (Connys Tipp bestätigt)
5. Niedersachsen: 7,7%
6. **Berlin: 7,3%** (schon Anfragen vorhanden)

### Gäste-Insights aus Anfragen (Feb-Mär 2026)
- Gäste kommen bereits aus: Berlin, Essen/NRW, Niedersachsen, Nürnberg, Österreich, Hamburg
- 6/23 fragen nach **Frühstück** → prominenter kommunizieren
- 2× Anfragen für **10 Personen** → Gruppen-Sitelink hinzufügen
- 2× **E-Bike/Radtouristen** → sichere Abstellmöglichkeit bewerben
- 80% Buchungen für **Mai–August** → Saisonales Budget (Sommer verdoppeln)

### Conversion Tracking — ACHTUNG
- Google Ads zeigt 0 Conversions trotz 13+ Anfragen seit Ads-Start
- GA4 Event (form_submit) funktioniert möglicherweise nicht korrekt
- **Muss dringend geprüft und repariert werden** — ohne Tracking kann Google nicht optimieren

### To-Do (priorisiert)
1. ⚠️ Conversion Tracking reparieren (GA4 form_submit Event prüfen)
2. 📹 Video hochladen → Ad Strength "Excellent"
3. 📍 Herrsching (82211) als Standort ausschließen
4. 📝 Long Headline 1 fixen ("Ferienwohnung am Ammersee" zu kurz → mind. 30 Zeichen)
5. 📅 Wochenend-Gebotsanpassung einrichten
6. 🌍 Phase 2: Neue Asset-Gruppe für Stuttgart/Frankfurt/Nürnberg (April)
7. 🌍 Phase 3: Neue Asset-Gruppe für NRW/Berlin/Hamburg (Mai)

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
├── reports/
│   ├── monthly-template.md                          # Monatsbericht-Vorlage
│   └── research-report-expansion-2026-03.html       # Expansions-Strategie für Conny (PDF-ready)
└── data/
    └── (CSV-Exports aus Google Ads hier ablegen)
```

### Reports
- **research-report-expansion-2026-03.html** — Expansions-Strategie (12 Slides, Sonnenhof-Branding). Im Browser öffnen → Print → PDF speichern.
