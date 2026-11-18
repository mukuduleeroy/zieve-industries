import type { HeroMediaConfig } from '@/types/hero';
/** Replace this object with approved local media. See public/images/hero/README.md. */
export const heroPlaceholder: Extract<HeroMediaConfig, { kind: 'placeholder' }> = {
  kind: 'placeholder',
  src: '/images/hero/industrial-placeholder.svg',
  caption: 'Visual placeholder · Approved industrial photography pending',
  desktopPosition: '70% 50%',
  mobilePosition: '68% 50%',
};

/** PH01 R1 approved by the user. Original/source/rights and crop evidence: Phase 11A.5 reports. */
export const heroMedia: HeroMediaConfig = {
  kind: 'image',
  src: '/images/industrial/hero/sunrise-excavator-desktop.webp',
  mobileSrc: '/images/industrial/hero/sunrise-excavator-mobile-focus.webp',
  caption: 'Illustrative stock photo · Metehan Özaras / Pexels · Not a Zieve site',
  desktopPosition: '85% 50%',
  mobilePosition: '50% 50%',
  approval: 'PH01 R1 direction approved; Pexels source-specific licence/download and original verified 2026-11-17. See docs/homepage-refinement/phase-11a5/IMAGE_LICENSE_REGISTER.md. No mirroring.',
};
