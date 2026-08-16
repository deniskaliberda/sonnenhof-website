'use client';

/**
 * Aufklappbares Gästebuch nach der freigegebenen Landhaus-Preview
 * (sonnenhof-landhaus-preview/index.html, "PAGE: GAESTEBUCH" + DESIGN.md §4).
 *
 * Regeln aus der Preview:
 * - Kein Eintrag wird aufgeteilt. Passt er nicht auf eine Seite, bekommt er die
 *   ganze Doppelseite (Split an einer Satzgrenze, beide Seiten etwa gleich voll).
 * - Schriftgröße pro Eintrag 13–21 px, zur Laufzeit per Messung ermittelt;
 *   das Linienraster des Papiers folgt der jeweiligen Zeilenhöhe.
 * - Keine Leerseite: Muss ein Doppelseiten-Eintrag links beginnen und eine rechte
 *   Seite ist frei, wird sie mit dem nächsten einseitigen Eintrag gefüllt.
 * - Buch 1040 × 660, nur ab 1120 px. Darunter (und ohne JS / vor dem Aufbau):
 *   flache Einzelseiten, jeder Eintrag vollständig auf einer Seite, 17 px.
 * - prefers-reduced-motion: Überblenden statt 3D-Flip.
 *
 * SEO: Alle Einträge stehen als flaches semantisches Markup im Server-HTML;
 * das 3D-Buch ist reines Progressive Enhancement darüber.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface BookEntry {
  id: number;
  name: string;
  /** z. B. "Basel · Juli 2026" (Ort · Aufenthalt · Unterkunft, ohne doppeltes Datum) */
  meta: string;
  rating: number | null;
  message: string;
  photoUrl: string | null;
}

export interface BookStrings {
  coverKicker: string;
  coverTitle: string;
  coverSubtitle: string;
  coverFooter: string;
  forewordKicker: string;
  forewordTitle: string;
  forewordP1: string;
  forewordP2: string;
  forewordSignature: string;
  forewordRole: string;
  closingTitle: string;
  closingText: string;
  closingCta: string;
  jumpLabel: string;
  jumpDog: string;
  jumpNoCar: string;
  jumpAccessible: string;
  prevAria: string;
  nextAria: string;
  labelClosed: string;
  /** Template mit {from}, {to}, {total} */
  pageLabel: string;
  entryAriaPrefix: string;
}

interface GuestbookBookProps {
  entries: BookEntry[];
  strings: BookStrings;
  /** Einträge (per Name), auf die die "Blättern zu"-Chips springen */
  jumpTargets: { dog?: string; noCar?: string; accessible?: string };
}

/* ---------- Geometrie (Preview: Buch 1040×660, Seiten-Padding 50/52) ---------- */
const BOOK_W = 1040;
const BOOK_H = 660;
const PAD_X = 52;
const PAD_TOP = 50;
const INNER_W = BOOK_W / 2 - 2 * PAD_X; // 416
const INNER_H = BOOK_H - 2 * PAD_TOP; // 560
const STAR_BLOCK = 42; // 18px Sternzeile + 24px Abstand
const FS_MAX = 21;
const FS_MIN = 13;

const SCRIPT_FONT = 'var(--font-script), cursive';
const SANS_FONT = 'var(--font-hanken), ui-sans-serif, system-ui, sans-serif';
const SERIF_FONT = 'var(--font-spectral), ui-serif, Georgia, serif';

const lineHeightFor = (fs: number) => Math.round(fs * 1.65);

const linedPaper = (lh: number) =>
  `repeating-linear-gradient(to bottom,transparent 0px,transparent ${lh - 1}px,rgba(166,121,78,0.2) ${lh - 1}px,rgba(166,121,78,0.2) ${lh}px)`;

const paperBg = (dir: 'left' | 'right') =>
  `linear-gradient(to ${dir},rgba(120,90,60,0.16),rgba(120,90,60,0) 10%),` +
  `linear-gradient(${dir === 'right' ? '105deg' : '255deg'},#FAF4E6,#FCF8EE 30%,#F8F1E0 90%)`;

const COVER_BG = 'linear-gradient(140deg,#33594A 0%,#2C4F40 45%,#24422F 100%)';

/* ---------- Seitenmodell ---------- */
type Page =
  | { kind: 'foreword' }
  | { kind: 'entry'; entryIdx: number; text: string; fs: number; stars: boolean; sig: boolean }
  | { kind: 'closing' }
  | { kind: 'blank' };

interface BookLayout {
  pages: Page[];
  /** Index der ersten Seite je Eintrag (Position in pages) */
  firstPage: number[];
}

/* An Satzgrenzen in zwei etwa gleich volle Hälften teilen (DESIGN.md §4). */
function splitAtSentence(text: string): { left: string; right: string } {
  const chunks: string[] = [];
  const re = /[.!?…]+[)"»«'“”]*\s+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    chunks.push(text.slice(last, m.index + m[0].length));
    last = m.index + m[0].length;
  }
  if (last < text.length) chunks.push(text.slice(last));

  if (chunks.length < 2) {
    // Kein Satzende gefunden: an der Wortgrenze nächst der Mitte teilen.
    const mid = Math.floor(text.length / 2);
    const before = text.lastIndexOf(' ', mid);
    const after = text.indexOf(' ', mid);
    const cut = before > 0 ? before : after > 0 ? after : mid;
    return { left: text.slice(0, cut).trimEnd(), right: text.slice(cut).trimStart() };
  }

  const total = text.length;
  let best = 1;
  let bestDiff = Infinity;
  let acc = 0;
  for (let k = 0; k < chunks.length - 1; k++) {
    acc += chunks[k].length;
    const diff = Math.abs(acc - (total - acc));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = k + 1;
    }
  }
  return {
    left: chunks.slice(0, best).join('').trimEnd(),
    right: chunks.slice(best).join('').trimStart(),
  };
}

/* Schriftgrößen-Fitting per Messung im unsichtbaren Container. */
function computeLayout(entries: BookEntry[]): BookLayout {
  const host = document.createElement('div');
  host.style.cssText = `position:absolute;left:-99999px;top:0;width:${INNER_W}px;visibility:hidden;pointer-events:none;`;
  const p = document.createElement('p');
  p.style.cssText = `margin:0;white-space:pre-line;overflow-wrap:break-word;font-family:${SCRIPT_FONT};`;
  const sig = document.createElement('div');
  sig.style.cssText = 'padding-top:22px;';
  const sigName = document.createElement('div');
  sigName.style.cssText = `font-family:${SCRIPT_FONT};font-size:23px;line-height:1.3;`;
  const sigMeta = document.createElement('div');
  sigMeta.style.cssText = `font-family:${SANS_FONT};font-size:12.5px;line-height:1.4;margin-top:2px;`;
  sig.append(sigName, sigMeta);
  host.append(p, sig);
  document.body.appendChild(host);

  const textHeight = (text: string, fs: number) => {
    p.style.fontSize = `${fs}px`;
    p.style.lineHeight = `${lineHeightFor(fs)}px`;
    p.textContent = text;
    return p.offsetHeight;
  };
  const sigHeight = (name: string, meta: string) => {
    sigName.textContent = name;
    sigMeta.textContent = meta;
    return sig.offsetHeight;
  };

  type EntryLayout =
    | { type: 'single'; fs: number }
    | { type: 'double'; fs: number; left: string; right: string };

  const layouts: EntryLayout[] = entries.map((e) => {
    const sh = sigHeight(e.name, e.meta);
    for (let fs = FS_MAX; fs >= FS_MIN; fs--) {
      if (STAR_BLOCK + textHeight(e.message, fs) + sh <= INNER_H) {
        return { type: 'single', fs };
      }
    }
    // Doppelseite: Split an Satzgrenze, beide Hälften gleiche Schriftgröße.
    const { left, right } = splitAtSentence(e.message);
    for (let fs = FS_MAX; fs >= FS_MIN; fs--) {
      const leftOk = STAR_BLOCK + textHeight(left, fs) <= INNER_H;
      const rightOk = STAR_BLOCK + textHeight(right, fs) + sh <= INNER_H;
      if (leftOk && rightOk) return { type: 'double', fs, left, right };
    }
    return { type: 'double', fs: FS_MIN, left, right };
  });

  document.body.removeChild(host);

  /* Seiten belegen: Vorwort = Seite 1 (links). Gerade Indizes = linke Seiten,
     ungerade = rechte. Doppelseiten müssen links beginnen; eine offene rechte
     Seite wird mit dem nächsten einseitigen Eintrag gefüllt (keine Leerseite). */
  const pages: Page[] = [{ kind: 'foreword' }];
  const firstPage: number[] = new Array(entries.length).fill(-1);
  const queue = entries.map((_, i) => i);

  const pushSingle = (i: number) => {
    firstPage[i] = pages.length;
    const l = layouts[i] as { type: 'single'; fs: number };
    pages.push({ kind: 'entry', entryIdx: i, text: entries[i].message, fs: l.fs, stars: true, sig: true });
  };

  while (queue.length > 0) {
    const i = queue[0];
    const layout = layouts[i];
    if (layout.type === 'single') {
      queue.shift();
      pushSingle(i);
    } else if (pages.length % 2 === 0) {
      // Linke Seite frei → Doppelseite beginnt hier.
      queue.shift();
      firstPage[i] = pages.length;
      pages.push({ kind: 'entry', entryIdx: i, text: layout.left, fs: layout.fs, stars: true, sig: false });
      pages.push({ kind: 'entry', entryIdx: i, text: layout.right, fs: layout.fs, stars: false, sig: true });
    } else {
      // Rechte Seite offen → mit dem nächsten einseitigen Eintrag füllen.
      const k = queue.findIndex((j) => layouts[j].type === 'single');
      if (k >= 0) {
        const [j] = queue.splice(k, 1);
        pushSingle(j);
      } else {
        pages.push({ kind: 'blank' });
      }
    }
  }

  // Abschlussseite muss eine rechte Seite (Blatt-Vorderseite) sein.
  if (pages.length % 2 === 0) pages.push({ kind: 'blank' });
  pages.push({ kind: 'closing' });

  return { pages, firstPage };
}

/* ---------- Gemeinsame Gesichter (Buch + reduzierte Bewegung) ---------- */
type FaceKind = 'cover' | 'foreword' | 'left' | 'right' | 'closing';

function faceStyle(kind: FaceKind, flat: boolean): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  };
  if (!flat) {
    base.backfaceVisibility = 'hidden';
    base.WebkitBackfaceVisibility = 'hidden';
  }
  if (kind === 'cover') {
    return {
      ...base,
      transform: flat ? undefined : 'translateZ(0.6px)',
      borderRadius: '4px 12px 12px 4px',
      background: COVER_BG,
      boxShadow: 'inset 0 0 0 1px rgba(232,197,126,0.25),inset 12px 0 24px rgba(0,0,0,0.28)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 44,
    };
  }
  if (kind === 'foreword') {
    return {
      ...base,
      transform: flat ? undefined : 'rotateY(180deg) translateZ(0.6px)',
      borderRadius: '12px 0 0 12px',
      background: paperBg('left'),
      padding: '52px 54px',
    };
  }
  if (kind === 'left') {
    return {
      ...base,
      transform: flat ? undefined : 'rotateY(180deg) translateZ(0.6px)',
      borderRadius: '10px 0 0 10px',
      background: paperBg('left'),
      padding: `${PAD_TOP}px ${PAD_X}px`,
    };
  }
  if (kind === 'closing') {
    return {
      ...base,
      transform: flat ? undefined : 'translateZ(0.6px)',
      borderRadius: '0 10px 10px 0',
      background: paperBg('right'),
      padding: `${PAD_TOP}px ${PAD_X}px`,
      cursor: 'default',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    };
  }
  return {
    ...base,
    transform: flat ? undefined : 'translateZ(0.6px)',
    borderRadius: '0 10px 10px 0',
    background: paperBg('right'),
    padding: `${PAD_TOP}px ${PAD_X}px`,
  };
}

function PageNumber({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 18,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 11,
        color: '#A08F73',
        fontFamily: SANS_FONT,
      }}
    >
      — {n} —
    </div>
  );
}

function StarRow({ rating }: { rating: number | null }) {
  return (
    <div
      aria-hidden="true"
      style={{ height: 18, marginBottom: 24, color: '#C59D5F', fontSize: 15, letterSpacing: 3, lineHeight: '18px' }}
    >
      {rating ? '★'.repeat(Math.min(5, Math.max(1, rating))) : ''}
    </div>
  );
}

function Signature({ name, meta }: { name: string; meta: string }) {
  return (
    <div style={{ marginTop: 'auto', paddingTop: 22 }}>
      <div style={{ fontFamily: SCRIPT_FONT, fontSize: 23, lineHeight: 1.3, color: '#2C4F40', transform: 'rotate(-1.5deg)' }}>
        {name}
      </div>
      {meta && (
        <div style={{ fontFamily: SANS_FONT, fontSize: 12.5, lineHeight: 1.4, color: '#9A8C72', marginTop: 2 }}>{meta}</div>
      )}
    </div>
  );
}

export function GuestbookBook({ entries, strings, jumpTargets }: GuestbookBookProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [layout, setLayout] = useState<BookLayout | null>(null);
  const [cur, setCur] = useState(0);
  const [moving, setMoving] = useState(-1);
  const curRef = useRef(0);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mqDesk = window.matchMedia('(min-width: 1120px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyDesk = () => setIsDesktop(mqDesk.matches);
    const applyMotion = () => setReducedMotion(mqMotion.matches);
    applyDesk();
    applyMotion();
    mqDesk.addEventListener('change', applyDesk);
    mqMotion.addEventListener('change', applyMotion);
    return () => {
      mqDesk.removeEventListener('change', applyDesk);
      mqMotion.removeEventListener('change', applyMotion);
    };
  }, []);

  // Schriftgrößen-Fitting erst nach dem Laden der Handschrift messen.
  useLayoutEffect(() => {
    if (!isDesktop || layout !== null || entries.length === 0) return;
    let cancelled = false;
    const run = () => {
      if (!cancelled) setLayout(computeLayout(entries));
    };
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }
    return () => {
      cancelled = true;
    };
  }, [isDesktop, layout, entries]);

  const pages = layout?.pages ?? [];
  const totalPages = pages.length;
  const leafCount = totalPages > 0 ? 1 + Math.ceil((totalPages - 1) / 2) : 0;
  const bookActive = isDesktop && layout !== null && entries.length > 0;

  const flip = useCallback(
    (dir: 1 | -1) => {
      const prev = curRef.current;
      if (dir > 0 && prev >= leafCount - 1) return;
      if (dir < 0 && prev <= 0) return;
      const leaf = dir > 0 ? prev : prev - 1;
      if (flipTimer.current) clearTimeout(flipTimer.current);
      curRef.current = prev + dir;
      setCur(prev + dir);
      setMoving(leaf);
      flipTimer.current = setTimeout(() => setMoving(-1), 800);
    },
    [leafCount]
  );

  const goToSpread = useCallback(
    (n: number) => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
      setMoving(-1);
      const next = Math.min(Math.max(n, 0), leafCount - 1);
      curRef.current = next;
      setCur(next);
    },
    [leafCount]
  );

  useEffect(() => {
    if (!bookActive) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'ArrowRight') flip(1);
      else if (e.key === 'ArrowLeft') flip(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookActive, flip]);

  useEffect(() => () => {
    if (flipTimer.current) clearTimeout(flipTimer.current);
  }, []);

  /* "Blättern zu": Doppelseite des jeweiligen Eintrags per Namensabgleich. */
  const spreadForEntryName = (target?: string): number | null => {
    if (!target || !layout) return null;
    const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const idx = entries.findIndex((e) => norm(e.name) === norm(target));
    if (idx < 0 || layout.firstPage[idx] < 0) return null;
    const pos = layout.firstPage[idx];
    return pos % 2 === 0 ? pos / 2 + 1 : (pos + 1) / 2;
  };

  const jumps: { label: string; spread: number }[] = [];
  if (bookActive) {
    const dog = spreadForEntryName(jumpTargets.dog);
    const noCar = spreadForEntryName(jumpTargets.noCar);
    const accessible = spreadForEntryName(jumpTargets.accessible);
    if (dog !== null) jumps.push({ label: strings.jumpDog, spread: dog });
    if (noCar !== null) jumps.push({ label: strings.jumpNoCar, spread: noCar });
    if (accessible !== null) jumps.push({ label: strings.jumpAccessible, spread: accessible });
  }

  const label =
    cur === 0
      ? strings.labelClosed
      : strings.pageLabel
          .replace('{from}', String(cur * 2 - 1))
          .replace('{to}', String(Math.min(cur * 2, totalPages)))
          .replace('{total}', String(totalPages));

  /* ---------- Seiteninhalte ---------- */

  const renderForeword = (pageNo: number): ReactNode => (
    <>
      <div style={{ fontFamily: SANS_FONT, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#A6794E', marginBottom: 22 }}>
        {strings.forewordKicker}
      </div>
      <h3 style={{ fontFamily: SERIF_FONT, fontWeight: 500, fontSize: 26, color: '#2C4F40', margin: '0 0 18px', lineHeight: 1.25 }}>
        {strings.forewordTitle}
      </h3>
      {/* TODO: Vorwort durch Connys bestätigten Text ersetzen (Gate) */}
      <p style={{ fontFamily: SERIF_FONT, fontSize: 16.5, lineHeight: 1.75, color: '#4A4234', margin: '0 0 14px' }}>
        {strings.forewordP1}
      </p>
      <p style={{ fontFamily: SERIF_FONT, fontSize: 16.5, lineHeight: 1.75, color: '#4A4234', margin: 0 }}>
        {strings.forewordP2}
      </p>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontFamily: SCRIPT_FONT, fontSize: 27, color: '#A6794E', transform: 'rotate(-2deg)' }}>
          {strings.forewordSignature}
        </div>
        <div style={{ fontFamily: SANS_FONT, fontSize: 12, color: '#9A8C72', marginTop: 2 }}>{strings.forewordRole}</div>
      </div>
      <PageNumber n={pageNo} />
    </>
  );

  const renderCoverContent = (): ReactNode => (
    <>
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(232,197,126,0.55)', borderRadius: 6 }} />
      <div style={{ position: 'absolute', inset: 28, border: '1px solid rgba(232,197,126,0.28)', borderRadius: 4 }} />
      <div style={{ fontFamily: SANS_FONT, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A96B', marginBottom: 26 }}>
        {strings.coverKicker}
      </div>
      <div style={{ fontFamily: SERIF_FONT, fontWeight: 500, fontSize: 52, color: '#E8C57E', lineHeight: 1.1, textShadow: '0 1px 0 rgba(0,0,0,0.35)' }}>
        {strings.coverTitle}
      </div>
      <div style={{ width: 54, height: 1, background: 'rgba(232,197,126,0.6)', margin: '28px 0' }} />
      <div style={{ fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: 16, color: '#C9D5CB' }}>{strings.coverSubtitle}</div>
      <div style={{ position: 'absolute', bottom: 52, fontFamily: SANS_FONT, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#9DB5A0' }}>
        {strings.coverFooter}
      </div>
    </>
  );

  const renderClosing = (pageNo: number): ReactNode => (
    <>
      <div style={{ fontFamily: SERIF_FONT, fontSize: 30, color: '#C59D5F' }}>❦</div>
      <h3 style={{ fontFamily: SERIF_FONT, fontWeight: 500, fontSize: 26, color: '#2C4F40', margin: '18px 0 12px' }}>
        {strings.closingTitle}
      </h3>
      <p style={{ fontFamily: SANS_FONT, fontSize: 15, lineHeight: 1.7, color: '#5A5142', margin: '0 0 26px', maxWidth: 300 }}>
        {strings.closingText}
      </p>
      <a
        href="#gb-form"
        style={{
          display: 'inline-block',
          background: '#2C4F40',
          color: '#F3EADA',
          fontFamily: SANS_FONT,
          fontSize: 14,
          fontWeight: 600,
          padding: '12px 26px',
          borderRadius: 999,
          textDecoration: 'none',
        }}
      >
        {strings.closingCta}
      </a>
      <PageNumber n={pageNo} />
    </>
  );

  const renderEntryPage = (page: Extract<Page, { kind: 'entry' }>, pageNo: number): ReactNode => {
    const entry = entries[page.entryIdx];
    const lh = lineHeightFor(page.fs);
    return (
      <>
        <StarRow rating={page.stars ? entry.rating : null} />
        <p
          style={{
            fontFamily: SCRIPT_FONT,
            fontSize: page.fs,
            lineHeight: `${lh}px`,
            color: '#3A3226',
            margin: 0,
            whiteSpace: 'pre-line',
            overflowWrap: 'break-word',
            background: linedPaper(lh),
          }}
        >
          {page.text}
        </p>
        {page.sig && <Signature name={entry.name} meta={entry.meta} />}
        <PageNumber n={pageNo} />
      </>
    );
  };

  const renderPageContent = (page: Page, pageNo: number): ReactNode => {
    switch (page.kind) {
      case 'foreword':
        return renderForeword(pageNo);
      case 'closing':
        return renderClosing(pageNo);
      case 'blank':
        return <PageNumber n={pageNo} />;
      case 'entry':
        return renderEntryPage(page, pageNo);
    }
  };

  const kindForPage = (page: Page, side: 'left' | 'right'): FaceKind => {
    if (page.kind === 'foreword') return 'foreword';
    if (page.kind === 'closing') return 'closing';
    return side;
  };

  /* ---------- Blätter für das 3D-Buch ---------- */
  const renderLeaf = (i: number): ReactNode => {
    const isLast = i === leafCount - 1;
    const flipped = i < cur && !isLast;
    // Stapel-Logik: umgeblätterte Blätter links aufsteigend, geschlossene rechts
    // absteigend, das fliegende Blatt darüber (DESIGN.md §4, generalisiert).
    const z = moving === i ? 2000 : flipped ? 100 + i : 1000 - i;

    const frontPage: Page | undefined = i === 0 ? undefined : pages[2 * i - 1];
    const backPage: Page | undefined = pages[2 * i];

    const faces: ReactNode[] = [];
    if (i === 0) {
      faces.push(
        <div key="f" onClick={() => flip(1)} style={faceStyle('cover', false)}>
          {renderCoverContent()}
        </div>
      );
    } else if (frontPage) {
      faces.push(
        <div key="f" onClick={() => flip(1)} style={faceStyle(kindForPage(frontPage, 'right'), false)}>
          {renderPageContent(frontPage, 2 * i)}
        </div>
      );
    }
    if (backPage) {
      faces.push(
        <div key="b" onClick={() => flip(-1)} style={faceStyle(kindForPage(backPage, 'left'), false)}>
          {renderPageContent(backPage, 2 * i + 1)}
        </div>
      );
    }

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '50%',
          height: '100%',
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.78s cubic-bezier(0.4,0.08,0.28,1)',
          transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          zIndex: z,
        }}
      >
        {faces}
      </div>
    );
  };

  /* Buch-Rahmen: Schatten, Blattschnitt, Einband-Hälften, Bund. */
  const renderChrome = (): ReactNode => (
    <>
      <div
        style={{
          position: 'absolute',
          left: '6%',
          right: '6%',
          bottom: -30,
          height: 44,
          background: 'radial-gradient(ellipse at center,rgba(42,36,28,0.32),transparent 68%)',
          filter: 'blur(7px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -9,
          top: 5,
          bottom: 5,
          width: 10,
          borderRadius: '0 3px 3px 0',
          background: 'repeating-linear-gradient(90deg,#F1E7D2 0px,#F1E7D2 1.5px,#D8C7A5 1.5px,#D8C7A5 3px)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -9,
          top: 5,
          bottom: 5,
          width: 10,
          borderRadius: '3px 0 0 3px',
          background: 'repeating-linear-gradient(90deg,#F1E7D2 0px,#F1E7D2 1.5px,#D8C7A5 1.5px,#D8C7A5 3px)',
          zIndex: 1,
          transition: 'opacity 0.5s',
          opacity: cur > 0 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          borderRadius: '12px 0 0 12px',
          background: 'linear-gradient(135deg,#2E5243,#23402F)',
          zIndex: 2,
          transition: 'opacity 0.5s',
          opacity: cur > 0 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '50%',
          height: '100%',
          borderRadius: '0 12px 12px 0',
          background: 'linear-gradient(225deg,#2E5243,#23402F)',
          zIndex: 2,
        }}
      />
    </>
  );

  const spineShadow = (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 44,
        transform: 'translateX(-50%)',
        zIndex: 58,
        pointerEvents: 'none',
        background:
          'linear-gradient(to right,rgba(90,60,30,0) 0%,rgba(90,60,30,0.10) 44%,rgba(60,40,20,0.18) 50%,rgba(90,60,30,0.10) 56%,rgba(90,60,30,0) 100%)',
        transition: 'opacity 0.5s',
        opacity: cur > 0 ? 1 : 0,
      }}
    />
  );

  /* prefers-reduced-motion: Überblenden statt 3D-Flip — gleiche Optik, Crossfade. */
  const renderReducedMotionBook = (): ReactNode => {
    const leftPage = cur > 0 ? pages[2 * cur - 2] : undefined;
    const rightPage = cur > 0 ? pages[2 * cur - 1] : undefined;
    return (
      <div
        style={{
          position: 'relative',
          width: BOOK_W,
          height: BOOK_H,
          margin: '0 auto',
          transition: 'transform 0.8s cubic-bezier(0.35,0.1,0.25,1)',
          transform: cur === 0 ? 'translateX(-24.5%)' : 'translateX(0%)',
        }}
      >
        {renderChrome()}
        <div key={cur} style={{ position: 'absolute', inset: 0, zIndex: 10, animation: 'gbFade 0.45s ease' }}>
          {cur === 0 ? (
            <div style={{ position: 'absolute', left: '50%', top: 0, width: '50%', height: '100%' }}>
              <div onClick={() => flip(1)} style={faceStyle('cover', true)}>
                {renderCoverContent()}
              </div>
            </div>
          ) : (
            <>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}>
                {leftPage && (
                  <div onClick={() => flip(-1)} style={faceStyle(kindForPage(leftPage, 'left'), true)}>
                    {renderPageContent(leftPage, 2 * cur - 1)}
                  </div>
                )}
              </div>
              <div style={{ position: 'absolute', left: '50%', top: 0, width: '50%', height: '100%' }}>
                {rightPage && (
                  <div onClick={() => flip(1)} style={faceStyle(kindForPage(rightPage, 'right'), true)}>
                    {renderPageContent(rightPage, 2 * cur)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {spineShadow}
      </div>
    );
  };

  const renderBook = (): ReactNode => (
    <div style={{ perspective: 3000, maxWidth: 1180, margin: '0 auto' }}>
      <div
        style={{
          position: 'relative',
          width: BOOK_W,
          height: BOOK_H,
          margin: '0 auto',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.35,0.1,0.25,1)',
          transform: cur === 0 ? 'translateX(-24.5%)' : 'translateX(0%)',
        }}
      >
        {renderChrome()}
        {Array.from({ length: leafCount }, (_, i) => renderLeaf(i))}
        {spineShadow}
      </div>
    </div>
  );

  /* ---------- Flache Einzelseiten (Server-Markup, SEO, < 1120 px) ---------- */
  const flatCardBase: CSSProperties = {
    position: 'relative',
    borderRadius: 8,
    border: '1px solid rgba(166,121,78,0.28)',
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 26px rgba(42,36,28,0.14)',
    overflow: 'hidden',
  };

  const renderFlat = (): ReactNode => (
    <div className="max-w-[560px] mx-auto">
      {/* Einband */}
      <div
        style={{
          ...flatCardBase,
          minHeight: 440,
          padding: '44px 30px',
          background: COVER_BG,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {renderCoverContent()}
      </div>
      {/* Vorwort */}
      <div style={{ ...flatCardBase, minHeight: 360, padding: '32px 26px 38px', background: paperBg('right') }}>
        {renderForeword(1)}
        <div style={{ height: 30 }} />
      </div>
      {/* Alle Einträge — jeder vollständig auf einer Seite, 17 px */}
      {entries.map((entry) => {
        const lh = lineHeightFor(17);
        return (
          <article
            key={entry.id}
            aria-label={`${strings.entryAriaPrefix} ${entry.name}`}
            style={{ ...flatCardBase, minHeight: 360, padding: '32px 26px 38px', background: paperBg('right') }}
          >
            <StarRow rating={entry.rating} />
            {entry.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={entry.photoUrl}
                alt={`${strings.entryAriaPrefix} ${entry.name}`}
                style={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain', marginBottom: 18, borderRadius: 4 }}
              />
            )}
            <p
              style={{
                fontFamily: SCRIPT_FONT,
                fontSize: 17,
                lineHeight: `${lh}px`,
                color: '#3A3226',
                margin: 0,
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
                background: linedPaper(lh),
              }}
            >
              {entry.message}
            </p>
            <Signature name={entry.name} meta={entry.meta} />
          </article>
        );
      })}
      {/* Abschluss */}
      <div
        style={{
          ...flatCardBase,
          minHeight: 320,
          padding: '44px 30px',
          background: paperBg('right'),
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {renderClosing(0)}
      </div>
    </div>
  );

  return (
    <div>
      <style>{'@keyframes gbFade{from{opacity:0}to{opacity:1}}'}</style>

      {bookActive ? (
        <div role="region" aria-label={strings.coverTitle} style={{ overflow: 'visible' }}>
          {reducedMotion ? renderReducedMotionBook() : renderBook()}

          {/* "Blättern zu"-Sprungliste */}
          {jumps.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-11">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#8A7C63] mr-1.5">{strings.jumpLabel}</span>
              {jumps.map((j) => (
                <button
                  key={j.label}
                  type="button"
                  onClick={() => goToSpread(j.spread)}
                  className="cursor-pointer text-sm text-forest bg-[#FBF6EC] border border-[rgba(166,121,78,0.28)] rounded-full px-5 py-[9px] hover:bg-forest hover:text-[#F3EADA] hover:border-forest transition-colors"
                >
                  {j.label}
                </button>
              ))}
            </div>
          )}

          {/* Steuerleiste */}
          <div className="flex items-center justify-center gap-[22px] mt-[26px]">
            <button
              type="button"
              onClick={() => flip(-1)}
              aria-label={strings.prevAria}
              disabled={cur <= 0}
              className="w-[46px] h-[46px] rounded-full border border-[rgba(166,121,78,0.4)] bg-[#FBF6EC] text-lg cursor-pointer hover:bg-white transition-colors disabled:cursor-default"
              style={{ color: cur > 0 ? '#2C4F40' : '#C4B69C' }}
            >
              ←
            </button>
            <div aria-live="polite" className="text-[13.5px] text-[#5A5142] min-w-[250px] text-center">
              {label}
            </div>
            <button
              type="button"
              onClick={() => flip(1)}
              aria-label={strings.nextAria}
              disabled={cur >= leafCount - 1}
              className="w-[46px] h-[46px] rounded-full border border-[rgba(166,121,78,0.4)] bg-[#FBF6EC] text-lg cursor-pointer hover:bg-white transition-colors disabled:cursor-default"
              style={{ color: cur < leafCount - 1 ? '#2C4F40' : '#C4B69C' }}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        renderFlat()
      )}
    </div>
  );
}
