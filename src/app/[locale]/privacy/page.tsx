// src/app/[locale]/privacy/page.tsx
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/locales';
import { locales } from '@/lib/locales';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'privacy');
  return {
    title: dict.privacy_policy + ' | Sayes Performance' || 'Privacy Policy | Sayes Performance',
    description: dict.intro_text || 'Privacy policy for Sayes Performance Center members and users.',
  };
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'privacy');

  return (
    <main className="max-w-5xl mx-auto pt-36 px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{dict.privacy_policy}</h1>
      </div>

      <div className="prose prose-lg max-w-none">
        <p><strong>Sayes Performance {dict.privacy_policy}</strong></p>
        <p>{dict.effective_date}</p>
        <p>{dict.intro_text}</p>

        <ol className="list-decimal pl-6 my-4">
          <li><strong>{dict.what_data_title}</strong></li>
        </ol>

        <p>{dict.data_collection_intro}</p>
        <ul className="list-disc pl-6 mb-4">
          <li>{dict.data_items.name}</li>
          <li>{dict.data_items.address}</li>
          <li>{dict.data_items.social_security}</li>
          <li>{dict.data_items.phone}</li>
          <li>{dict.data_items.email}</li>
          <li>{dict.data_items.photo}</li>
          <li>{dict.data_items.ip_address}</li>
          <li>{dict.data_items.login_details}</li>
          <li>{dict.data_items.payment_info}</li>
          <li>{dict.data_items.facility_access}</li>
        </ul>

        <p>{dict.additional_data_text}</p>

        <p>{dict.surveillance_text}</p>

        <ol className="list-decimal pl-6 my-4">
          <li><strong>{dict.data_usage_title}</strong></li>
        </ol>

        <p>{dict.data_usage_intro}</p>

        <p><strong>{dict.membership_management_title}</strong></p>
        <p>{dict.membership_management_text}</p>

        <p>{dict.company_info.name}</p>
        <p>{dict.company_info.org_number}</p>
        <p>{dict.company_info.phone}</p>
        <p>{dict.company_info.address}</p>
        <p>{dict.company_info.register_extract}</p>

        <p><strong>{dict.rights.rectification_title}</strong></p>
        <p>{dict.rights.rectification_text}</p>

        <p><strong>{dict.rights.erasure_title}</strong></p>
        <p>{dict.rights.erasure_text}</p>

        <p><strong>{dict.rights.limitation_title}</strong></p>
        <p>{dict.rights.limitation_text}</p>

        <p><strong>{dict.rights.object_title}</strong></p>
        <p>{dict.rights.object_text}</p>

        <p><strong>{dict.complaint_title}</strong></p>
        <p>{dict.complaint_text}</p>

        <p><strong>{dict.contact_title}</strong></p>
        <p>{dict.contact_intro}</p>

        <p><strong>{dict.contact_info.controller}</strong></p>
        <p><strong>{dict.contact_info.company}</strong></p>
        <p><strong>{dict.contact_info.box}</strong></p>
        <p><strong>{dict.contact_info.postal}</strong></p>
        <p><strong>{dict.contact_info.phone}</strong></p>
      </div>
    </main>
  );
}