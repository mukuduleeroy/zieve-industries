import { profileSource } from './source';
import { solutionDivisions, type SolutionSlug } from './solutions-showcase';

const relevantSolutions = (...slugs: SolutionSlug[]) => slugs.map(slug => {
  const division = solutionDivisions.find(item => item.slug === slug)!;
  return { label: division.name, href: division.href };
});
/** Exact Section 05 narratives; editorial subheadlines describe applications, not achievements. */
export const industrySectors = [
  {
    slug: 'mining-mineral-processing', number: '01', name: 'Mining & Mineral Processing',
    headline: 'Equipment and inputs for the recovery chain.',
    description: 'Supporting large-scale mining and artisanal and small-scale mining operations through equipment, gold-processing systems, industrial chemicals, lubricants and critical consumables.',
    procurementNote: null,
    solutions: relevantSolutions('earthmoving-construction', 'elution-gold-processing', 'industrial-chemicals', 'lubricants-fluids', 'consumables-spares'),
    surface: 'paper', source: profileSource(3, 4, 5, 6, 7, 8),
  },
  {
    slug: 'civil-infrastructure', number: '02', name: 'Civil & Infrastructure Construction',
    headline: 'From earthworks to essential infrastructure.',
    description: 'Supplying earthmoving machinery, generators, construction-related chemicals, lubricants and maintenance essentials for infrastructure and civil works.',
    procurementNote: 'For civil contractors, government agencies and public infrastructure procurement.',
    solutions: relevantSolutions('earthmoving-construction', 'industrial-chemicals', 'lubricants-fluids', 'consumables-spares'),
    surface: 'surface', source: profileSource(3, 4, 5, 7, 8),
  },
  {
    slug: 'manufacturing', number: '03', name: 'Manufacturing',
    headline: 'Processing inputs. Maintenance essentials.',
    description: 'Providing industrial processing chemicals, lubricants, filters, fittings and essential inputs for plant operations.',
    procurementNote: null,
    solutions: relevantSolutions('industrial-chemicals', 'lubricants-fluids', 'consumables-spares'),
    surface: 'navy', source: profileSource(3, 4, 7, 8),
  },
  {
    slug: 'agro-processing', number: '04', name: 'Agro-processing',
    headline: 'Supporting the processing cycle.',
    description: 'Supporting agro-processing facilities through industrial chemicals, machinery-related consumables, lubricants and maintenance inputs.',
    procurementNote: null,
    solutions: relevantSolutions('industrial-chemicals', 'lubricants-fluids', 'consumables-spares'),
    surface: 'paper', source: profileSource(3, 4, 7, 8),
  },
] as const;
export type IndustryPanelContent = (typeof industrySectors)[number];
export type IndustrySlug = IndustryPanelContent['slug'];
export const industryExperienceContent = {
  id: 'industries-we-serve',
  heading: 'Built for the industries that build tomorrow.',
} as const;
