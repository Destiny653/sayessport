// app/[locale]/layout.tsx
import '@/styles/index.css';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/lib/get-dictionary';
import { locales } from '@/lib/locales';
import type { ReactNode } from 'react';
import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: 'Next Generation Athlete',
  description: 'Performance Coaching & Training',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // <-- Awaiting the params object
  const commonDict = await getDictionary(locale as Locale, 'common');
  const contactDict = await getDictionary(locale as Locale, 'contact');

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {locales.map((loc) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`/${loc}`} />
        ))}
      </head>
      <body className="font-inter box-border">
        <div className="w-full relative border-b border-white">
          <Header dict={commonDict} />
        </div>
        {children}
        <ContactSection dict={contactDict} />
      </body>
    </html>
  );
}

export default RootLayout;