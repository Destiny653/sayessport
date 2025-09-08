// app/[locale]/contact/page.tsx
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/locales';
import { locales } from '@/lib/locales';
import ContactForm from '@/components/sections/ContactForm';
import type { Metadata } from 'next';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'contact-page');
  return {
    title: dict.contact_us + ' | Sayes Performance' || 'Contact Us | Sayes Performance',
    description: dict.get_in_touch_description || 'Get in touch with Sayes Performance for coaching and training inquiries.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale, 'contact-page');

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-start md:pt-20 pt-24 py-8 px-2 md:px-4 sm:px-6 lg:px-8 relative">
      {/* arrow back to home */}
      <div className="p-4 absolute left-6 top-32">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 
                         text-gray-700 shadow-sm transition-all duration-200
                         hover:bg-gray-200 hover:text-gray-900 hover:scale-105
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <ArrowBigLeft className="h-6 w-6" />
          <span className="font-medium">Back</span>
        </Link>
      </div>
      <div className="w-full max-w-7xl">
        <ContactForm dict={dict} />
      </div>
    </div>
  );
}