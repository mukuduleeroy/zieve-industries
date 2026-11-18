import type { EditorialMediaConfig } from '@/types/editorial-media';

/** Local stock photographs only. Source-specific rights and file hashes live in the Phase 11A.5 registers.
 * These scenes never represent Zieve staff, stock, clients or facilities. Schematics remain independent. */
export const industrialPhotography = {
  "company": {
    "kind": "image",
    "src": "/images/industrial/company/industrial-component-detail.webp",
    "alt": "Large metal component suspended in an industrial workshop. Not a Zieve facility photograph.",
    "caption": "Illustrative stock photo · Kateryna Babaieva / Pexels",
    "desktopPosition": "50% 50%",
    "mobilePosition": "50% 50%",
    "approval": "PH02 — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  },
  "chemicals": {
    "kind": "image",
    "src": "/images/industrial/solutions/chemical-processing-infrastructure.webp",
    "alt": "Industrial process towers and vessels connected by pipes and access platforms. Not a Zieve facility or inventory photograph.",
    "caption": "Illustrative stock photo · Hazel J / Unsplash",
    "desktopPosition": "50% 45%",
    "mobilePosition": "50% 45%",
    "approval": "PH05 — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  },
  "spares": {
    "kind": "image",
    "src": "/images/industrial/solutions/neutral-steel-fasteners.webp",
    "alt": "Silver nuts and bolts arranged on a neutral background. Not a Zieve facility or inventory photograph.",
    "caption": "Illustrative stock photo · Edge2Edge Media / Unsplash",
    "desktopPosition": "50% 50%",
    "mobilePosition": "50% 50%",
    "approval": "PH07-B — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  },
  "mining": {
    "kind": "image",
    "src": "/images/industrial/industries/open-pit-mineral-handling.webp",
    "alt": "Overhead view of a surface extraction site with processing equipment, stockpiles and access tracks. Not a Zieve facility or employee photograph.",
    "caption": "Illustrative stock photo · Volker Braun / Pexels",
    "desktopPosition": "50% 50%",
    "mobilePosition": "50% 50%",
    "approval": "PH08 — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  },
  "manufacturing": {
    "kind": "image",
    "src": "/images/industrial/industries/heavy-manufacturing-machined-shaft.webp",
    "alt": "Factory worker in high-visibility clothing beside a large machined metal shaft. Not a Zieve facility or employee photograph.",
    "caption": "Illustrative stock photo · Kateryna Babaieva / Pexels",
    "desktopPosition": "50% 45%",
    "mobilePosition": "50% 45%",
    "approval": "PH10 — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  },
  "agro": {
    "kind": "image",
    "src": "/images/industrial/industries/grain-handling-silos.webp",
    "alt": "Grain silos linked by an elevated material-handling walkway in warm evening light. Not a Zieve facility or employee photograph.",
    "caption": "Illustrative stock photo · Psilo Cybe / Pexels",
    "desktopPosition": "50% 50%",
    "mobilePosition": "50% 50%",
    "approval": "PH11 — conditional Stage B direction approved; source/file and intended use reviewed 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. Final visual review pending."
  }
} satisfies Record<string, Extract<EditorialMediaConfig, { kind: 'image' }>>;
