import { heroPlaceholder } from './hero-media';
import type { EditorialMediaConfig } from '@/types/editorial-media';
/** Existing original schematic, not a photograph of company property or operations. */
export const introductionPlaceholder: Extract<EditorialMediaConfig, { kind: 'placeholder' }> = {
  kind: 'placeholder',
  src: heroPlaceholder.src,
  alt: 'Illustrative excavator schematic; a visual placeholder, not a Zieve Industries facility.',
  caption: 'Illustrative equipment schematic · Approved photography pending',
  desktopPosition: '80% 50%',
  mobilePosition: '78% 50%',
};
/** Switch only after image rights/caption/crops are approved. No media is fabricated. */
export const introductionMedia: EditorialMediaConfig = introductionPlaceholder;
