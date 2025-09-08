// app/[locale]/page.tsx
import { HeroSection, PackagesSection, WhatWeOfferSection, WhyChooseSection } from '@/components/sections';
import { Award, User, Users, Zap } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/locales';
import { locales } from '@/lib/locales';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params; // Unwrap the Promise
  const homeDict = await getDictionary(locale, 'home');
  const packagesDict = await getDictionary(locale, 'packages');
  const whatWeOfferDict = await getDictionary(locale, 'what-we-offer');
  const whyChooseDict = await getDictionary(locale, 'why-choose');

  // Define the data for service cards using translations
  const services = [
    {
      title: homeDict.personal_coaching,
      icon: <User className="w-6 h-6" />,
    },
    {
      title: homeDict.skill_development,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: homeDict.group_training,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: homeDict.training_camps,
      icon: <Award className="w-6 h-6" />,
    },
  ];

  // ServiceCard component for reusability
  const ServiceCard = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
    return (
      <div className="p-6 rounded-xl border border-gray-700 text-center hover:border-[#4ef5ff] hover:shadow-lg hover:bg-[#2a2847] transition-all duration-200 cursor-pointer">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-[#4ef5ff] text-xl bg-[#2a2847]">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-start items-center w-full bg-[#ffffff]">
      <HeroSection dict={homeDict} />
      <PackagesSection dict={packagesDict} />
      <WhatWeOfferSection dict={whatWeOfferDict} />
      <WhyChooseSection dict={whyChooseDict} />
      {/* Optional: Add ServiceSection if needed */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#120088] mb-8">{homeDict.services_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} title={service.title} icon={service.icon} />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}