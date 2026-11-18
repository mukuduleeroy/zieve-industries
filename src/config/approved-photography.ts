import type { EditorialMediaConfig } from '@/types/editorial-media';

/** Specific images/crops approved in conversation, 2026-11-18.
 * Sources, licences, original/crop metadata and hashes: public/images/industrial/approved-photography.json. */
export const approvedPhotography = {
  earthmoving: {
    kind: 'image', src: '/images/industrial/solutions/earthmoving-excavator-bucket.webp',
    alt: 'Excavator bucket unloading earth against a blue sky. Not a Zieve facility or inventory photograph.',
    caption: 'Illustrative stock photo · Adrian Sulyok / Unsplash · sulyokimaging.ro',
    desktopPosition: '50% 50%', mobilePosition: '50% 50%',
    approval: 'User approved Earthmoving image and shown crop, 2026-11-18.',
  },
  lubricants: {
    kind: 'image', src: '/images/industrial/solutions/industrial-gear-lubrication.webp',
    alt: 'Fluid applied to an industrial metal gear during machining. Not a Zieve facility or inventory photograph.',
    caption: 'Illustrative stock photo · Connor Lucock / Pexels',
    desktopPosition: '50% 50%', mobilePosition: '50% 50%',
    approval: 'User approved Lubricants image and shown crop, 2026-11-18.',
  },
  civil: {
    kind: 'image', src: '/images/industrial/industries/bridge-construction.webp',
    alt: 'Bridge infrastructure under construction across a river. Not a Zieve project, facility or customer photograph.',
    caption: 'Illustrative stock photo · Jeffrey Eisen / Unsplash',
    desktopPosition: '50% 50%', mobilePosition: '50% 50%',
    approval: 'User approved Civil image and shown crop, 2026-11-18.',
  },
} as const satisfies Record<string, Extract<EditorialMediaConfig, { kind: 'image' }>>;
