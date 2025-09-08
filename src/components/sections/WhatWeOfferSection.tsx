// components/sections/WhatWeOfferSection.tsx (keep 'use client' due to state and effects)
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface WhatWeOfferSectionProps {
  dict: any;
}

export default function WhatWeOfferSection({ dict }: WhatWeOfferSectionProps): JSX.Element {
  const [activeOption, setActiveOption] = useState('personal-coaching');
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastManualSelection, setLastManualSelection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      id: 'personal-coaching',
      title: dict.personal_coaching,
      image: '/new/offer1.jpg',
      description: dict.personal_coaching_description,
    },
    {
      id: 'skill-development',
      title: dict.skill_development,
      image: '/new/offer3.jpg',
      description: dict.skill_development_description,
    },
    {
      id: 'group-training',
      title: dict.group_training,
      image: '/new/offer4.jpg',
      description: dict.group_training_description,
    },
    {
      id: 'training-camps',
      title: dict.training_camps,
      image: '/new/offer5.jpg',
      description: dict.training_camps_description,
    },
  ];

  const currentOption = options.find((option) => option.id === activeOption) || options[0];
  
  // Use a state to track screen width
  const [isMobile, setIsMobile] = useState(false);

  // Hook to handle window resize and determine mobile status
  useEffect(() => {
    const handleResize = () => {
      // 800px is the breakpoint for this responsive behavior
      setIsMobile(window.innerWidth <= 800);
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection logic only for non-mobile views
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile || !sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        if (scrollY + windowHeight - sectionTop < 100) {
          setLastManualSelection(null);
        }
        const sectionScrollProgress = (scrollY + windowHeight - sectionTop) / sectionHeight;
        const optionIndex = Math.min(
          Math.floor(sectionScrollProgress * options.length),
          options.length - 1
        );

        if (optionIndex >= 0 && optionIndex < options.length) {
          const targetOptionId = options[optionIndex].id;
          if (lastManualSelection) {
            const manualIndex = options.findIndex((opt) => opt.id === lastManualSelection);
            if (optionIndex >= manualIndex) {
              if (!isAnimating && targetOptionId !== activeOption) {
                setIsAnimating(true);
                setActiveOption(targetOptionId);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }
          } else {
            if (!isAnimating && targetOptionId !== activeOption) {
              setIsAnimating(true);
              setActiveOption(targetOptionId);
              setTimeout(() => setIsAnimating(false), 500);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeOption, isAnimating, lastManualSelection, isMobile, options]);

  const handleOptionClick = (id: string) => {
    setLastManualSelection(id);
    setActiveOption(id);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px] bg-[#f7f7f7] rounded-[5px]"
      id="offer"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <div className="flex flex-col gap-8">
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-[31px] sm:leading-[41px] md:leading-[51px] text-[#120088] text-center font-inter">
              {dict.what_we_offer}
            </h2>
            {options.map((option) => (
              <div key={option.id} className="flex flex-col items-center">
                <h3 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold leading-[26px] sm:leading-[34px] md:leading-[44px] text-[#120088] mb-4 font-inter">
                  {option.title}
                </h3>
                <div className="w-full h-auto rounded-[15px] overflow-hidden shadow-lg mb-4">
                  <Image
                    src={option.image}
                    alt={option.title}
                    width={816}
                    height={434}
                    className="w-full h-auto max:h-[200px] rounded-[15px]"
                  />
                </div>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#3c3c3c] w-full mb-8 font-inter">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-row justify-between items-start w-full gap-[20px] lg:gap-[44px]">
            <div className="flex flex-col gap-[22px] sm:gap-[33px] md:gap-[44px] justify-start items-start w-full lg:w-[44%] mt-0 lg:mt-[20px] mb-8 lg:mb-0">
              <h2 className="hidden lg:block text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-[31px] sm:leading-[41px] md:leading-[51px] text-[#120088] font-inter">
                {dict.what_we_offer}
              </h2>
              <div
                ref={optionsRef}
                className="flex flex-col gap-[27px] sm:gap-[40px] md:gap-[54px] justify-start items-center w-full px-4 sm:px-6 lg:px-[26px]"
              >
                {options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex flex-row justify-start items-end w-full cursor-pointer transition-all duration-500 ease-in-out hover:opacity-80 transform lg:hover:translate-x-2 ${
                      activeOption === option.id ? 'opacity-100 items-center' : 'opacity-60'
                    }`}
                    onClick={() => handleOptionClick(option.id)}
                  >
                    <div
                      className={`w-[11px] sm:w-[16px] md:w-[22px] h-[1px] bg-[#120088] transition-all duration-500 ${
                        activeOption === option.id
                          ? 'w-[22px] sm:w-[28px] md:w-[35px] '
                          : 'mb-[8px] sm:mb-[12px] md:mb-[16px]'
                      }`}
                    />
                    <span
                      className={`font-medium leading-[24px] sm:leading-[30px] md:leading-[37px] ml-3 transition-all duration-500 ease-in-out font-inter ${
                        activeOption === option.id
                          ? 'text-[22px] sm:text-[28px] md:text-[36px] leading-[26px] sm:leading-[34px] md:leading-[44px] text-[#120088]'
                          : 'text-[18px] sm:text-[22px] md:text-[26px] text-[#c7c7c7]'
                      }`}
                    >
                      {option.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[18px] justify-start items-center w-full lg:w-[54%] mt-8 lg:mt-0">
              <div
                key={`image-${activeOption}`}
                className="w-full h-auto rounded-[15px] overflow-hidden shadow-lg transform lg:hover:scale-[1.005] transition-all duration-700 ease-in-out animate-fadeInUp"
              >
                <Image
                  src={currentOption.image}
                  alt={currentOption.title}
                  width={816}
                  height={434}
                  className="w-full h-auto max-h-[650px] rounded-[15px] transition-all duration-700 ease-in-out"
                />
              </div>
              <p
                key={`description-${activeOption}`}
                className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#3c3c3c] w-full transition-all duration-700 ease-in-out font-inter animate-fadeInUp"
              >
                {currentOption.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}