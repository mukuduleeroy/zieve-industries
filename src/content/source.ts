import type { ProfileSource } from '@/types/content';
export const profileDocument = 'Zieve_Industries_Executive_Premium_Company_Profile(1).pdf';
/** Physical PDF pages, including the cover as page 1. */
export function profileSource(...pages: number[]): ProfileSource {
  return { document: profileDocument, pages };
}
