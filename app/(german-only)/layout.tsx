import { NextIntlClientProvider } from 'next-intl';
import { StickyCTA } from '@/components/sections/sticky-cta';
import { CookieConsent } from '@/components/cookie-consent';
import deMessages from '@/messages/de.json';

export default function GermanOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="de" messages={deMessages}>
      {children}
      <StickyCTA />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
