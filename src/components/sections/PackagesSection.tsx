// components/sections/PackagesSection.tsx (keep 'use client' due to state and Swiper)
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { packages } from '@/app/data/package';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PackagesSection({ dict }: { dict: any }): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
   const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';
  const router = useRouter();

  return (
    <section className="w-full py-[40px] sm:py-[60px] md:py-[80px]" id='packages'>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center w-full">
          <h2 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold leading-[36px] sm:leading-[48px] md:leading-[60px] lg:leading-[73px] text-[#120088] text-center mb-4 sm:mb-6 md:mb-[16px] font-inter">
            {dict.our_packages}
          </h2>
          <p className="text-[18px] sm:text-[22px] md:text-[28px] font-medium leading-[22px] sm:leading-[27px] md:leading-[33px] text-[#3c3c3c] text-center mb-[39px] sm:mb-[58px] md:mb-[78px] font-inter">
            {dict.train_smarter}
            <br />
            {dict.individually_or_groups}
          </p>

          {/* Mobile Layout (flex-col, no Swiper) */}
          <div className="flex flex-col gap-8 w-full md:hidden">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative w-full h-[314px] overflow-hidden cursor-pointer rounded-lg shadow-lg ${
                  pkg.type === 'membership' ? 'bg-[#151515]' : ''
                }`}
                onClick={() => router.push(`/${currentLocale}/booking/${pkg.id}`)}
              >
                {/* Always show image and hover content for mobile */}
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120088]/80 via-[#050022]/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col items-start h-full justify-end">
                  <h3 className="text-[18px] sm:text-[22px] font-bold leading-[22px] sm:leading-[26px] text-[#ffffff] mb-1 font-inter">
                    {pkg.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] font-bold leading-[16px] sm:leading-[18px] text-[#ff2323] mb-2 font-inter">
                    {pkg.price}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src="/images/img_arrow_1_white_a700.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-[16px] h-[16px]"
                    />
                    <span className="text-[14px] sm:text-[16px] font-medium leading-[16px] sm:leading-[18px] text-[#ffffff] font-inter">
                      {dict.view_details}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="!rounded-[0px] w-full"
                  >
                    {dict.book_now}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout (Swiper) */}
          <div className="hidden md:block w-full">
            <Swiper
              spaceBetween={30}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="packages-swiper"
            >
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div
                    className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg group cursor-pointer"
                    onMouseEnter={() => setHoveredCard(pkg.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120088]/80 via-[#050022]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <AnimatePresence>
                      {hoveredCard !== pkg.id && (
                        <motion.div
                          className="absolute  shadowxl shadow-[#000] bg-gradient-to-t from-[#120088]/90 via-[#050022]/80 to-transparent  bottom-0 left-0 right-0 p-6 pt-10 z-10 flex flex-col items-start"
                          initial={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold leading-[24px] sm:leading-[29px] md:leading-[34px] text-[#ffffff] mb-1 sm:mb-2 md:mb-3 font-inter">
                            {pkg.title}
                          </h3>
                          <p className="text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-[20px] sm:leading-[22px] md:leading-[24px] text-[#ff2323] mb-3 sm:mb-4 md:mb-6 font-inter">
                            {pkg.price}
                          </p>
                          <div className="flex items-center gap-2">
                            <Image
                              src="/images/img_arrow_1_white_a700.svg"
                              alt=""
                              width={16}
                              height={16}
                              className="w-[16px] h-[16px]"
                            />
                            <span className="text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-[16px] sm:leading-[19px] md:leading-[22px] text-[#ffffff] font-inter">
                              {dict.view_details}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {hoveredCard === pkg.id && (
                        <motion.div
                          className="absolute inset-0 p-6 z-10 flex flex-col justify-between"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 50 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.h3
                            className="text-[20px] sm:text-[24px] md:text-[28px] font-bold leading-[24px] sm:leading-[29px] md:leading-[34px] text-[#ffffff] mb-1 sm:mb-2 md:mb-3 font-inter"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {pkg.title}
                          </motion.h3>

                          <p className="text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-[20px] sm:leading-[22px] md:leading-[24px] text-[#ff2323] mb-3 sm:mb-4 md:mb-6 font-inter">
                            {pkg.price}
                          </p>

                          {/* Features List */}
                          <div className="flex flex-col gap-[12px] sm:gap-[14px] md:gap-[16px] w-full mb-4 sm:mb-6 md:mb-8">
                            {pkg.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                className="flex flex-row justify-start items-center w-full"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                              >
                                <Image
                                  src="/images/img_frame_white_a700.svg"
                                  alt=""
                                  width={16}
                                  height={16}
                                  className="w-[16px] h-[16px] flex-shrink-0"
                                />
                                <span className="text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-[14px] sm:leading-[16px] md:leading-[18px] text-[#ffffff] ml-2 font-inter">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="w-full mt-auto"
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              className="!rounded-[0px] w-full"
                              onClick={() => router.push(`/${currentLocale}/booking/${pkg.id}`)}
                            >
                              {dict.book_now}
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .packages-swiper {
          padding-bottom: 40px;


        }

        .packages-swiper .swiper-button-next,
        .packages-swiper .swiper-button-prev {
          color: #120088;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .packages-swiper .swiper-button-next:after,
        .packages-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }

        .packages-swiper .swiper-pagination-bullet {
          background: #120088;
          opacity: 0.3;
        }

        .packages-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}