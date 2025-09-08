// lib/get-dictionary.ts
import 'server-only';
import type { Locale } from './locales';
import fs from 'fs';
import path from 'path';

const dictionaries = new Map<string, any>();

export async function getDictionary(locale: Locale, namespace: string) {
  const cacheKey = `${locale}:${namespace}`;
  if (dictionaries.has(cacheKey)) {
    return dictionaries.get(cacheKey);
  }
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const dictionary = JSON.parse(fileContents);
    dictionaries.set(cacheKey, dictionary);
    return dictionary;
  } catch (error) {
    console.error(`Error loading translations for ${locale}/${namespace}:`, error);
    return {};
  }
}