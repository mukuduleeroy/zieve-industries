import type { IndustrySector } from '@/types/content';
import { profileSource } from './source';
export const industries = [
  { name: 'Mining (Large-scale & ASM)', source: profileSource(3) },
  { name: 'Civil & Infrastructure Construction', source: profileSource(3) },
  { name: 'Government Agencies', source: profileSource(3) },
  { name: 'Agro-processing & Manufacturing', source: profileSource(3) },
] as const satisfies readonly IndustrySector[];
