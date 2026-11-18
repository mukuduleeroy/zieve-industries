import { company } from './company';
export interface PurposeValue { id: string; number: string; name: string; description: string }
/** Single-source company purpose; wording is the verified page 11 content from Phase 0. */
export const purposeValues: readonly PurposeValue[] = company.values.map((value, index) => ({
  ...value, id: value.name.toLowerCase(), number: String(index + 1).padStart(2, '0'),
}));
export const purposeContent = {
  id: 'our-purpose', heading: 'The standard we operate by.',
  vision: { label: 'Our Vision', statement: company.vision },
  mission: { label: 'Our Mission', statement: company.mission },
  valuesLabel: 'Our Core Values',
  source: company.sources.missionVisionValues,
} as const;
