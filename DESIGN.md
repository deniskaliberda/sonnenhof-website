# DESIGN.md — BlogStayLinks (interne Verlinkung Blog → Buchungsseiten)

> **Status: approved & live** · Erstellt: 2026-08-14 · Freigabe Denis + Deploy: 2026-08-14 · Scope: ein neuer Abschnitt am Ende jedes Blog-Artikels (DE + EN)
> Gate gemäß Master-CLAUDE.md: kein Deploy vor Freigabe durch Denis.

## Warum (Datenlage GSC, Stand 14.08.)
Der Blog sammelt ~80 % der organischen Klicks (Ausflugsziele allein 275 von ~784 im August MTD), die Buchungsseiten hängen auf Seite 2: `/preise` Pos 14,5 · `/wohnen/ferienwohnungen` 13,0 · `/wohnen/zimmer` 26,5 (rutscht). Bisher führte **kein einziger Link** aus einem Artikel auf eine Buchungsseite — nur die Kontakt-CTA in der Artikelmitte und „Zurück zum Blog" am Ende. Anfragen laufen zugleich −21 % im MTD-Vergleich: der Traffic-Zuwachs konvertiert nicht.

## Was gebaut ist
- `components/sections/blog-stay-links.tsx` — Abschnitt „Übernachten im Sonnenhof" am Artikelende (nach FAQ, vor „Zurück zum Blog"), in beiden Templates (`(german-only)` + `[locale]`) **und in der Sonderroute `ferienwohnung-ammersee-mit-hund/`** (eigene page.tsx am `[slug]`-Template vorbei — wäre sonst der einzige Artikel ohne den Block gewesen, ausgerechnet der Hund-Artikel).
- Drei Karten mit beschreibenden Ankern: **Ferienwohnungen am Ammersee** → `/wohnen/ferienwohnungen` · **Gästezimmer in Herrsching** → `/wohnen/zimmer` · **Preise & Verfügbarkeit** → `/preise`.
- Einleitungssatz kategoriebewusst: „Urlaub mit Hund" und „Familienurlaub" bekommen je eine passende Zeile, alle anderen die Standardzeile. Texte in `messages/de.json` + `en.json` (`BlogStayLinks`).

## Design-Entscheidungen
- Sprache der bestehenden Seite: weiße Karten, `border-forest/10`, Serif-Überschrift, `wood`-Hover — identisch zur BlogCTA-Ästhetik, keine neuen Farben, keine Emoji, keine Gradients (Anti-Slop-Regeln).
- Bewusst am Artikel**ende**: die Kontakt-CTA in der Mitte bleibt einziger Conversion-Unterbrecher; der neue Block bedient Leser, die fertig sind („vom Lesen zum Ankommen").
- Faktencheck der Textbausteine gegen `lib/mock-data.ts`: max. 5 Personen ✓ · eigene Küche ✓ · ab 2 Nächten ✓ · fünf Gehminuten zum See ✓ (bestehende Formulierung der Site). „Balkon" wurde entfernt — nicht für alle Wohnungen belegt.
- Kein Eingriff in Artikel-Content (Blog rendert aus der Neon-DB; dieser Block ist Template-Ebene → normaler Deploy reicht, kein `sync-md-to-db`).

## Nicht gemacht (bewusst)
- Keine Meta-Änderungen an `/wohnen/zimmer` — die Seite ist on-page bereits sauber (Pension-Cluster, Preis im Titel); ihr fehlten eingehende Links, nicht Optimierung.
- Keine In-Content-Links in einzelnen Artikeln (wäre DB-Sync je Artikel; Kandidat für Ausbaustufe 2, wenn der Block wirkt).

## Messbarkeit
Wirkung ablesbar am nächsten Messpunkt (~28.08.): Positionen `/preise`, `/wohnen/*` in GSC; Klickpfade Blog → Buchungsseiten in GA4.

## Verifikation live (2026-08-14)
Alle drei Routentypen auf www.sonnenhof-herrsching.de geprüft: DE-Slug (Standard-Zeile), Hunde-Sonderroute (Hund-Zeile), EN (lokalisierte Pfade `/en/accommodation/*`, `/en/pricing`) — Block überall mit 3 Links gerendert. Commit `11a9896`.
