import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { MotionProvider } from '@/components/motion/provider';
import { SkipLink } from '@/components/layout/navigation';
import { heroContent } from '@/content/hero';
import { company } from '@/content/company';
import { SiteHeader } from '@/components/layout/site-header';
import './globals.css';
export const metadata: Metadata = {
  title: `${company.name} | ${company.tagline}`,
  description: heroContent.supporting,
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-ZW"><body><MotionProvider><SkipLink /><SiteHeader />{children}</MotionProvider></body></html>;
}
