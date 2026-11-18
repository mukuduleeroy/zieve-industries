import { services } from './services';
import { homepageSolutionNavigation } from './homepage-navigation';

/** Exact Section 04 brief descriptions, condensed from PDF pages 4–8. */
const descriptions = {
  'earthmoving-construction': 'Excavators, bulldozers, motor graders, compaction rollers, concrete mixers, generators and genuine spare parts.',
  'elution-gold-processing': 'AARL and Zadra elution circuits, acid wash, electrowinning and carbon regeneration systems.',
  'industrial-chemicals': 'Mining and flotation reagents, construction chemical admixtures, industrial solvents and processing chemicals.',
  'lubricants-fluids': 'Hydraulic oils, gear and transmission oils, engine oils, coolants and transformer oils.',
  'consumables-spares': 'Wear parts, filters, fasteners, fittings and personal protective equipment.',
} as const;
const headlines = {
  'earthmoving-construction': 'Built for demanding sites.',
  'elution-gold-processing': 'Engineered recovery.',
  'industrial-chemicals': 'Chemistry behind performance.',
  'lubricants-fluids': 'Protection + uptime.',
  'consumables-spares': 'Small components can stop big machines.',
} as const;
export type SolutionSlug = (typeof services)[number]['slug'];
export const solutionDivisions = services.map((service, index) => ({
  slug: service.slug,
  number: String(index + 1).padStart(2, '0'),
  name: service.name,
  headline: headlines[service.slug],
  description: descriptions[service.slug],
  href: homepageSolutionNavigation[index].href,
  source: service.source,
}));
export type SolutionDivision = (typeof solutionDivisions)[number];
export const solutionsShowcaseContent = {
  id: 'industrial-solutions',
  headline: ['One accountable partner.', 'Five core divisions.'],
  supporting: 'Everything a heavy-industry client needs to acquire, run and maintain their plant and fleet.',
  exploreLabel: 'Link to this solution',
} as const;
