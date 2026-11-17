import type { HeroMediaConfig } from '@/types/hero';
/** Replace this object with approved local media. See public/images/hero/README.md. */
export const heroPlaceholder: Extract<HeroMediaConfig, { kind: 'placeholder' }> = {
  kind: 'placeholder',
  src: '/images/hero/industrial-placeholder.svg',
  caption: 'Visual placeholder · Approved industrial photography pending',
  desktopPosition: '70% 50%',
  mobilePosition: '68% 50%',
};

export const heroMedia: HeroMediaConfig = heroPlaceholder;
