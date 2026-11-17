import type { EditorialMediaConfig } from '@/types/editorial-media';
import type { SolutionSlug } from '@/content/solutions-showcase';
import { heroPlaceholder } from './hero-media';
const schematic = (src: string, subject: string): EditorialMediaConfig => ({
  kind: 'placeholder', src,
  alt: `Illustrative ${subject} schematic. Not a Zieve facility or inventory photograph.`,
  caption: 'Illustrative schematic · Approved division photography pending',
  desktopPosition: '50% 50%', mobilePosition: '50% 50%',
});
export const solutionPlaceholders = {
  'earthmoving-construction': { ...schematic(heroPlaceholder.src, 'earthmoving equipment'), desktopPosition: '80% 50%', mobilePosition: '80% 50%' },
  'elution-gold-processing': schematic('/images/solutions/elution-placeholder.svg', 'gold-processing equipment'),
  'industrial-chemicals': schematic('/images/solutions/chemicals-placeholder.svg', 'industrial chemical vessels'),
  'lubricants-fluids': schematic('/images/solutions/lubricants-placeholder.svg', 'lubricant drums and gears'),
  'consumables-spares': schematic('/images/solutions/consumables-placeholder.svg', 'filters, fittings and protective equipment'),
} satisfies Record<SolutionSlug, EditorialMediaConfig>;
/** Replace individual entries only with rights-approved local photographs and truthful captions. */
export const solutionsMedia: Record<SolutionSlug, EditorialMediaConfig> = solutionPlaceholders;
