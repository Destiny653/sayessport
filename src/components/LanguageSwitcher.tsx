// components/LanguageSwitcher.tsx (add this for client-side switching, 'use client')
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] as string;

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-4">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`text-blue-500 ${currentLocale === locale ? 'font-bold' : ''}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}