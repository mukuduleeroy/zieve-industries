import { profileSource } from './source';
export interface OperatingPillar { id: string; number: string; title: string; description: string }
/** Exact Section 06 brief, editorially adapted from physical PDF page 10. */
export const operatingPillars = [
  { id: 'reliable-supply-chain', number: '01', title: 'Reliable Supply Chain', description: 'Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.' },
  { id: 'technical-after-sales-support', number: '02', title: 'Technical After-Sales Support', description: 'Support beyond the point of supply, including elution plant commissioning guidance, equipment spares and lubricant specification.' },
  { id: 'genuine-quality-assurance', number: '03', title: 'Genuine Quality Assurance', description: 'Authentic, fit-for-purpose products that support dependable performance and reduce operational risks associated with substandard inputs.' },
  { id: 'one-stop-shop-convenience', number: '04', title: 'One-Stop-Shop Convenience', description: 'Equipment, processing plants, chemicals, lubricants and consumables from one accountable industrial supply partner.' },
  { id: 'sector-specialisation', number: '05', title: 'Sector Specialisation', description: 'Technical understanding of mining, construction and processing operations, including recovery rates, haul roads and uptime.' },
] as const satisfies readonly OperatingPillar[];
export const advantageContent = {
  id: 'zieve-advantage',
  eyebrow: '04 / THE ZIEVE ADVANTAGE',
  headline: ['Built on reliability.', 'Driven by performance.'],
  supporting: 'More than a supplier. A dependable partner for the operations that cannot afford to stand still.',
  closing: 'Supply. Support. Quality. Convenience. Specialisation.',
  source: profileSource(10),
} as const;
