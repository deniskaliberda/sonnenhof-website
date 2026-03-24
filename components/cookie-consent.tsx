'use client';

import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

type ConsentState = 'pending' | 'accepted' | 'declined';

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem('cookie_consent');
  if (stored === 'accepted' || stored === 'declined') return stored;
  return 'pending';
}

function updateGoogleConsent(granted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const state = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [visible, setVisible] = useState(false);
  const t = useTranslations('CookieConsent');

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored === 'accepted') {
      updateGoogleConsent(true);
    }
    if (stored === 'pending') {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
    updateGoogleConsent(true);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem('cookie_consent', 'declined');
    setConsent('declined');
    setVisible(false);
    updateGoogleConsent(false);
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script
            id="consent-default"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
            }}
          />
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

      {visible && (
        <div
          role="dialog"
          aria-label={t('ariaLabel')}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-stone p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-forest">
                {t('title')}
              </h3>
              <p className="text-sm text-text-primary/70 leading-relaxed">
                {t('description')}{' '}
                <a
                  href="/datenschutz"
                  className="text-forest underline hover:text-wood transition-colors"
                >
                  {t('privacyPolicy')}
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors text-sm"
                >
                  {t('acceptAll')}
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-6 py-3 bg-stone text-text-primary font-semibold rounded-lg hover:bg-stone/80 transition-colors text-sm"
                >
                  {t('onlyNecessary')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.gtag === 'function';
}
