'use client';
import { LockIcon, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { handleScroll } from '@/lib/smoothScoll';
import Button from '../ui/Button';

interface HeaderProps {
  className?: string;
  dict: any;
}

const languages = [
  { code: 'en', name: 'English', flag: '/images/british.png' },
  { code: 'sv', name: 'Svenska', flag: '/images/swidish.png' },
  // Add more languages as needed
];

const Header: React.FC<HeaderProps> = ({ className = '', dict }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] || 'en';

  // Determine background based on locale
  const isTransparentBg = ['en', 'sv'].includes(currentLocale);
  const bgClass = isTransparentBg ? 'bg-[#ffffff4f]' : 'bg-[#010381]/95';

  // Determine text color based on className or background
  const isBlackText = className.includes('text-black') || isTransparentBg;
  const textColor = isBlackText ? 'text-gray-900' : 'text-white';
  const hoverColor = isBlackText ? 'hover:text-amber-600' : 'hover:text-amber-400';

  const handleLanguageChange = (langCode: string) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${langCode}`);
    router.push(newPath);
    setLangDropdownOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLocale) || languages[0];

  // Add flag links for language switching in the header
  function LanguageSwitcher() {
    return (
      <div className="flex space-x-4">
        <Link href="/en">
          <Image src="/images/british.png" alt="English" width={24} height={24} />
        </Link>
        <Link href="/sv">
          <Image src="/images/swidish.png" alt="Swedish" width={24} height={24} />
        </Link>
      </div>
    );
  }

  return (
    <header className={`w-full absolute z-20  ${bgClass} ${textColor} shadow-lg transition-all duration-300 ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Mobile Header */}
        <div className="flex md:hidden justify-between items-center w-full">
          {/* Logo */}
          <div className="w-[140px] h-[60px] grid place-items-center">
            <Link href={`/${currentLang.code}`}>
              <Image
                src="/sayeslogo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain"
                priority
              />
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`p-2 ${textColor} ${hoverColor} transition-colors duration-200 rounded-full hover:bg-gray-100/10`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between items-center w-full">
          {/* Logo */}
          <div className="w-[180px] h-[70px] grid place-items-center">
            <Link href={`/${currentLang.code}`}>
              <Image
                src="/sayeslogo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain cursor-pointer transition-transform hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-row items-center space-x-10">
            <Link
              href={`/${currentLang.code}/contact`}
              className={`text-lg font-medium ${textColor} ${hoverColor} transition-colors duration-200 tracking-wide uppercase`}
            >
              {dict.contact_us}
            </Link>
            <button
              onClick={(e) => handleScroll("offer")}
              className={`text-lg font-medium ${textColor} ${hoverColor} transition-colors duration-200 tracking-wide uppercase`}
            >
              <Link href={`#offer`}>
                {dict.offers}
              </Link>
            </button>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center space-x-2 ${textColor} ${hoverColor} transition-colors duration-200 rounded-lg px-3 py-2 hover:bg-gray-100/10`}
            >
              <Image
                src={currentLang.flag}
                alt={`${currentLang.name} flag`}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-sm font-medium">{currentLang.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Image
                      src={lang.flag}
                      alt={`${lang.name} flag`}
                      width={20}
                      height={20}
                      className="mr-2 rounded-sm"
                    />
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 w-full h-full bg-white ${textColor} z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMenuOpen(false)}
                className={`${hoverColor} transition-colors duration-200 p-2 rounded-full hover:bg-gray-100/10`}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-6">
              <Link
                href={`/${currentLocale}/contact`}
                className={`text-xl font-medium ${hoverColor} transition-colors duration-200 tracking-wide uppercase`}
                onClick={() => setMenuOpen(false)}
              >
                {dict.contact_us}
              </Link>
              <Link
                href="#offers"
                className={`text-xl font-medium ${hoverColor} transition-colors duration-200 tracking-wide uppercase`}
                onClick={() => setMenuOpen(false)}
              >
                {dict.offers}
              </Link>
            </div>

            {/* Mobile Language Dropdown */}
            <div className="flex flex-col space-y-4 pt-6 mt-6 border-t border-gray-200/30">
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={`flex items-center space-x-2 ${textColor} ${hoverColor} transition-colors duration-200 rounded-lg px-3 py-2 hover:bg-gray-100/10 w-full`}
                >
                  <Image
                    src={currentLang.flag}
                    alt={`${currentLang.name} flag`}
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  <span className="text-base font-medium">{currentLang.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {langDropdownOpen && (
                  <div className="mt-2 w-full bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Image
                          src={lang.flag}
                          alt={`${lang.name} flag`}
                          width={20}
                          height={20}
                          className="mr-2 rounded-sm"
                        />
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;