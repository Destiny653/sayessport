// app/[locale]/terms/page.tsx
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/locales';
import { locales } from '@/lib/locales';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'terms');
  return {
    title: dict.membership_terms + ' | Sayes Performance' || 'Terms & Conditions | Sayes Performance',
    description: dict.membership_personal || 'Membership terms and conditions for Sayes Performance Center.',
  };
}

export default async function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'terms');

  return (
    <>
      <main id="content" className="site-main max-w-5xl post-1060 page type-page status-publish hentry px-4 pt-28 py-10 mx-auto">

        <div className="page-content">
          <h1 className="wp-block-heading has-black-color has-text-color font-inter text-xl sm:text-3xl py-8">{dict.membership_terms}</h1>

          <p className="has-black-color has-text-color">{dict.section_1_title}</p>

          <p className="has-black-color has-text-color">
            {dict.membership_personal}<br />
            <strong>{dict.age_11_12_title}</strong><br />
            {dict.age_11_12_text}<br /><br />
            <strong>{dict.age_13_15_title}</strong><br />
            {dict.age_13_15_text}
          </p>

          <p className="has-black-color has-text-color">
            <strong>{dict.infants_title}</strong><br />
            {dict.infants_text}
          </p>

          <p className="has-black-color has-text-color">
            {dict.keycard_text}
          </p>

          <p className="has-black-color has-text-color">
            <br />{dict.section_11_title}
          </p>

          <p className="has-black-color has-text-color">
            {dict.callout_text}<br /><br />
          </p>

          <p className="has-black-color has-text-color">
            {dict.section_12_title}
          </p>

          <p className="has-black-color has-text-color">
            {dict.identification_text}<br />
          </p>

          <p className="has-black-color has-text-color">
            {dict.section_13_title}
          </p>

          <p className="has-black-color has-text-color">
            {dict.withdrawal_text}
          </p>

          <p className="has-black-color has-text-color">
            {dict.section_14_title}
          </p>

          <p className="has-black-color has-text-color">
            {dict.complaints_text}
          </p>
        </div>
      </main>
    </>
  );
}