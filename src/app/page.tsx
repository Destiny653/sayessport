// app/page.tsx - Root page that redirects to default locale
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/locales';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
