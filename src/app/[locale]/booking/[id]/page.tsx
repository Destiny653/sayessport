// app/[locale]/booking/[id]/page.tsx
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/locales';
import BookingForm from '@/components/booking/BookingForm';
import { promises as fs } from 'fs';
import path from 'path';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = [];
  const locales = ['en', 'sv'];
  let packages = [];

  // Load packages from a default locale (e.g., 'en') to generate paths
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', 'en', 'packages.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    packages = JSON.parse(jsonData);
    if (!Array.isArray(packages)) {
      packages = packages.packages || [];
    }
  } catch (error) {
    console.error('Error reading packages for static params:', error);
    return [];
  }

  for (const locale of locales) {
    for (const pkg of packages) {
      paths.push({ locale, id: pkg.id.toString() });
    }
  }
  return paths;
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params; // Unwrap the Promise
  const dict = await getDictionary(locale as Locale, 'booking-form');

  // Load package data from locale-specific JSON file
  let packages = [];
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'packages.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    packages = JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading package data for locale '${locale}':`, error);
    // Fallback to English
    try {
      const fallbackPath = path.join(process.cwd(), 'public', 'locales', 'en', 'packages.json');
      const fallbackJsonData = await fs.readFile(fallbackPath, 'utf-8');
      packages = JSON.parse(fallbackJsonData);
    } catch (fallbackError) {
      console.error(`Error reading fallback package data for locale 'en':`, fallbackError);
      return <p>Package data not available</p>;
    }
  }

  // Normalize packages data
  if (!Array.isArray(packages)) {
    if (packages && Array.isArray(packages.packages)) {
      packages = packages.packages;
    } else {
      console.error('Packages data is not an array:', packages);
      return <p>Invalid package data</p>;
    }
  }

  const pkg = packages.find((p: { id: string | number }) => p.id.toString() === id);
  console.log("Package ID:", id, "Found Package:", pkg);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{dict.package_not_found}</h1>
            <p className="text-gray-600">{dict.package_not_found_description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-start pb-0 pt-32 md:pt-20 px-0 sm:px-6 lg:px-8">
      <div className="w-full  sm:p-12 lg:p-16">
        {/* arrow back to home */}
        <div className="p-4">
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

        {/* Package Details Section */}
        <div className="mb-0 mx-auto max-w-5xl bg-white p-4 md:p-8 flex items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{pkg.title}</h2>
            <p className="text-xl font-semibold text-blue-600 mb-4">{pkg.price}</p>
            <p className="text-gray-700 mb-6">{pkg.description}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{dict.whats_included}</h3>
            <ul className="space-y-2">
              {pkg.features && pkg.features.length > 0 ? (
                pkg.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">{dict.no_features_available}</li>
              )}
            </ul>
          </div>
        </div>

        <BookingForm packageTitle={pkg.title} packageId={pkg.id} dict={dict} />
      </div>
    </div>
  );
}