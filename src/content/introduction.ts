import { profileSource } from './source';
/** User-approved editorial adaptation of the Executive Summary, physical PDF page 2. */
export const introductionContent = {
  id: 'company-introduction',
  heading: 'Built around uptime.',
  paragraphs: [
    'In heavy industry, every hour matters. A machine waiting for parts, a processing plant missing critical inputs or a project delayed by unreliable supply can create significant operational costs.',
    'Zieve Industries brings equipment, gold-processing plants, industrial chemicals, lubricants and essential consumables together through one dependable industrial supply partner.',
  ],
  closing: 'Reliable Supply. Real Impact.',
  source: profileSource(2),
} as const;
