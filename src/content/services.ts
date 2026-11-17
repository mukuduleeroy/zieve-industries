import type { ServiceDivision } from '@/types/content';
import { profileSource } from './source';
export const services = [
  { slug: 'earthmoving-construction', name: 'Earthmoving & Construction Equipment', offerings: ['Excavators', 'Bulldozers', 'Graders', 'Rollers', 'Concrete mixers', 'Generators', 'New and refurbished machinery', 'Genuine spares'], clients: 'Civil contractors, mines, government agencies', source: profileSource(4, 5) },
  { slug: 'elution-gold-processing', name: 'Elution Plants & Gold Processing', offerings: ['Complete AARL/Zadra elution circuits', 'Acid wash', 'Electrowinning', 'Carbon regeneration', '0.5–2t+ batch capacities'], clients: 'ASM cooperatives, gold producers', source: profileSource(4, 6) },
  { slug: 'industrial-chemicals', name: 'Industrial Chemicals', offerings: ['Flotation reagents', 'Leaching chemistry', 'Concrete admixtures', 'Solvents and processing chemicals'], clients: 'Mines, construction, manufacturing', source: profileSource(4, 7) },
  { slug: 'lubricants-fluids', name: 'Lubricants & Fluids', offerings: ['Hydraulic oils', 'Gear and transmission oils', 'Engine oils', 'Transformer oils', 'Coolants'], clients: 'All heavy-plant operators', source: profileSource(4, 8) },
  { slug: 'consumables-spares', name: 'Consumables & Spares', offerings: ['Wear parts', 'Filters', 'Fasteners', 'Fittings', 'Personal Protective Equipment (PPE)'], clients: 'Every operation, all sectors', source: profileSource(4, 8) },
] as const satisfies readonly ServiceDivision[];
