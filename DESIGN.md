# DESIGN.md — Redesign „Landhaus" (Branch `redesign-landhaus`)

> **Status: built & QA-geprüft, WARTET AUF LAUNCH-FREIGABE** · Gebaut: 2026-08-14 · Design von Conny freigegeben (14.08., via Denis) · Vorlage: `02_delivery/sonnenhof-landhaus-preview/` (DESIGN.md dort `approved`)
> **Launch = Denis:** Merge auf `main` + `git push` + `vercel deploy --prod --yes`. Vorher offen: Connys Vorwort-Bestätigung fürs Gästebuch (Ein-Satz-Frage) — Notlösung: ohne Vorwort launchen.

## Was auf dem Branch liegt (4 Commits)
1. `4f847ee` Doppelzimmer plus (mock-data 22 m²/130/120 €/Hunde, Schema-JSON, ItemList, 5 Fotos, Detailseite + Sitemap automatisch).
2. `d5681d0` Phase 1: Tokens (Creme/Sand/Gold/Tinte statt Kalt-Grau, forest/wood unverändert), Fonts Spectral + Hanken Grotesk + Petit Formal Script via next/font (lokal), Navigation mit Logo + Wortmarke, Footer forest-deep.
3. `e8f1dd4` Phase 2: alle Seiten-Templates (Start, Wohnen, FeWo, Zimmer inkl. DZ-plus-Feature-Block mit Lightbox-Galerie, Preise, Erleben, Über uns, Kontakt, Blog DE/EN/Hund-Sonderroute, Gästebuch als Handschrift-Blätter, Unterkunft-Detail, geteilte Sections) + Fixes: Impressum-Mobil-Overflow (Bestandsbug), sitemap.ts git-log-Quoting (Bestandsbug).
4. `e97f8a0` (parallele Session): Herbst-Blogartikel `content/blog/ammersee-im-herbst.md` — fährt beim Launch mit.

## Nicht verändert (Verlust-Versicherung, geprüft)
Routen/Slugs 1:1 · Formspree-Endpoint + gtag-Events (form_submit/generate_lead) · Neon-DB-Blog + BlogStayLinks auf allen 3 Routentypen · alle JSON-LD/FAQ-Einbindungen · Translations (nur `Footer.pricing` neu) · Sitemap (48 URLs, +doppelzimmer-plus).

## QA (2026-08-14, Prod-Build lokal)
`tsc` grün · Build grün · 20 Routen (DE+EN) je Desktop 1440 + Mobil 390: HTTP 200, keine Konsolenfehler, kein horizontaler Overflow · DZ plus auf /wohnen/zimmer + /preise + Detailseite · StayLinks auf Hund-Route · Gästebuch-Einträge server-gerendert (lokal ohne DB leer — live kommt Neon).

## Bewusst offen
- **3D-Gästebuch-Buch** aus der Preview ist NICHT portiert — die Live-Seite zeigt die Einträge als flache Handschrift-Blätter (Petit Formal Script), wie die Preview unter 1120 px. Alle Einträge stehen im Markup (SEO-Anforderung erfüllt). Buch-Portierung = eigenes Arbeitspaket nach Launch-Entscheidung.
- Gästebuch-Schema: Denis' eigener Eintrag zählt weiter als Review im JSON-LD; doppeltes Datum in der Meta-Zeile nicht geprüft — beide Alt-Bugs, separat fixen.
- Herrsching-Schema-Overclaim „stufenlos erreichbar" (Conny-Input §5) — wartet auf Denis-Freigabe der ehrlichen Formulierung (rechtlich gated).

---

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
