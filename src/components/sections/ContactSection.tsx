'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ContactSection({ dict }: { dict: any }): JSX.Element {

   const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <section className="w-full bg-gradient-to-b from-[#040022] to-[#120088] py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {/* Contact Details Section */}
          <div className="flex flex-col w-full md:w-2/3 gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              {dict.contact_us}
            </h2>
            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-white" />
                <Image
                  src="/images/img_frame_yellow_a200.svg"
                  alt="Phone icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-base sm:text-lg md:text-xl text-white">
                  +46 72 333 87 87
                </span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-white" />
                <Image
                  src="/images/img_frame_yellow_a200_24x24.svg"
                  alt="Email icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-base sm:text-lg md:text-xl text-white">
                  info@sayesperformance.se
                </span>
              </div>
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-px bg-white mt-2" />
                <Image
                  src="/images/img_frame_yellow_a200.svg"
                  alt="Address icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-base sm:text-lg md:text-xl text-white">
                  Västanforsgatan 30 A, 214 50<br />
                  Malmö, Sweden
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col w-full md:w-1/3 mt-8 md:mt-0 gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              {dict.get_in_touch}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              {dict.latest_insights}<br />
              {dict.resources_expert}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/30 my-8" />

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Link
            href={`/${currentLocale}/terms`}
            className="text-sm sm:text-base md:text-lg text-white hover:text-amber-400 transition-colors duration-200"
          >
            {dict.terms_conditions}
          </Link>
          <div className="w-px h-6 bg-white/30 hidden sm:block" />
          <Link
            href={`/${currentLocale}/privacy`}
            className="text-sm sm:text-base md:text-lg text-white hover:text-amber-400 transition-colors duration-200"
          >
            {dict.privacy_policy}
          </Link>
        </div>
      </div>
    </section>
  );
}