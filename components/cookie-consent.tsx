'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

type ConsentState = 'pending' | 'accepted' | 'declined';

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem('cookie_consent');
  if (stored === 'accepted' || stored === 'declined') return stored;
  return 'pending';
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored === 'pending') {
      // Kleine Verzögerung damit der Banner nicht sofort aufploppt
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem('cookie_consent', 'declined');
    setConsent('declined');
    setVisible(false);
  }, []);

  return (
    <>
      {/* GA4 gtag.js — nur laden wenn Consent gegeben UND GA_ID konfiguriert */}
      {consent === 'accepted' && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');${ADS_ID ? `gtag('config','${ADS_ID}');` : ''}`,
            }}
          />
        </>
      )}

      {/* Consent Banner */}
      {visible && (
        <div
          role="dialog"
          aria-label="Cookie-Einstellungen"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-stone p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-forest">
                Wir respektieren Ihre Privatsphäre
              </h3>
              <p className="text-sm text-text-primary/70 leading-relaxed">
                Wir nutzen Cookies und Google Analytics, um unsere Website zu verbessern und
                die Wirksamkeit unserer Werbung zu messen. Ihre Daten werden nicht an Dritte
                verkauft. Mehr erfahren Sie in unserer{' '}
                <Link
                  href="/datenschutz"
                  className="text-forest underline hover:text-wood transition-colors"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors text-sm"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-6 py-3 bg-stone text-text-primary font-semibold rounded-lg hover:bg-stone/80 transition-colors text-sm"
                >
                  Nur notwendige
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Hilfsfunktion: Prüft ob Analytics-Consent gegeben wurde.
 * Wird von inquiry-form.tsx genutzt um Conversion-Events zu feuern.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent') === 'accepted';
}
