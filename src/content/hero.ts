import { quoteAction } from './navigation';
import { homepageDestinations } from './homepage-navigation';
import { profileSource } from './source';
/** Exact Section 02 brief copy, aligned with the profile's identity and portfolio. */
export const heroContent = {
  eyebrow: 'ZIEVE INDUSTRIES · HARARE, ZIMBABWE',
  headline: ['Equipping Industry.', 'Empowering Growth.'],
  supporting: 'A dependable partner for earthmoving equipment, gold-processing plants, industrial chemicals, lubricants and critical consumables.',
  primaryAction: { label: 'Explore Our Solutions', href: homepageDestinations['/solutions'] },
  secondaryAction: quoteAction,
  scrollAction: { label: 'Scroll', accessibleLabel: 'Scroll to the end of the hero', href: '#hero-end' },
  source: profileSource(2, 3, 4, 12),
} as const;
