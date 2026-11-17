'use client';
import { getImageProps } from 'next/image';
import { Image } from '@/components/ui/primitives';
/** Art direction without preloading both crops. Photography is optimised by Next Image. */
export function HeroImage({ src, mobileSrc, onError }: { src: string; mobileSrc?: string; onError: () => void }) {
  const mobile = mobileSrc ? getImageProps({ src: mobileSrc, alt: '', fill: true, sizes: '100vw' }).props : undefined;
  return <picture>
    {mobile && <source media="(max-width: 47.999rem)" srcSet={mobile.srcSet ?? mobile.src} sizes="100vw" />}
    <Image src={src} alt="" fill sizes="100vw" priority={!mobileSrc} loading={mobileSrc ? 'eager' : undefined} fetchPriority="high" className="hero-background-image" onError={onError} />
  </picture>;
}
