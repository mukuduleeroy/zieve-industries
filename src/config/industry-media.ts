import { industrialPhotography } from './industrial-photography';
import type { EditorialMediaConfig } from '@/types/editorial-media';
import type { IndustrySlug } from '@/content/industry-experience';
const illustration = (src: string, subject: string): Extract<EditorialMediaConfig, { kind: 'placeholder' }> => ({
  kind: 'placeholder', src,
  alt: `Illustrative ${subject}. Not a Zieve project, facility or customer photograph.`,
  caption: 'Illustrative sector schematic · Approved photography pending',
  desktopPosition: '50% 50%', mobilePosition: '50% 50%',
});
export const industryPlaceholders = {
  'mining-mineral-processing': illustration('/images/industries/mining-placeholder.svg', 'open-pit mining and ore-handling scene'),
  'civil-infrastructure': illustration('/images/industries/civil-placeholder.svg', 'bridge and civil works scene'),
  manufacturing: illustration('/images/industries/manufacturing-placeholder.svg', 'manufacturing plant and process line'),
  'agro-processing': illustration('/images/industries/agro-placeholder.svg', 'grain storage and processing scene'),
} satisfies Record<IndustrySlug, EditorialMediaConfig>;
/** Replace entries with approved local photography; keep illustrative fallbacks independent. */
export const industryMedia: Record<IndustrySlug, EditorialMediaConfig> = {
  ...industryPlaceholders,
  'mining-mineral-processing': industrialPhotography.mining,
  // Civil stays schematic: branded machinery and recognizable workers are not cleared.
  manufacturing: industrialPhotography.manufacturing,
  'agro-processing': industrialPhotography.agro,
};
