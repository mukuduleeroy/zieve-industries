'use client';
import { useState, type CSSProperties, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Container, Image } from '@/components/ui/primitives';
import type { HeroMediaConfig } from '@/types/hero';
import { HeroImage } from './hero-image';
import { heroPlaceholder } from '@/config/hero-media';

const HeroVideo = dynamic(() => import('./hero-video').then(module => module.HeroVideo));
export function HeroMedia({ media, children, footer }: { media: HeroMediaConfig; children?: ReactNode; footer?: ReactNode }) {
  const [failed, setFailed] = useState(false);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);
  const fallbackMode = failed || media.kind === 'placeholder';
  const style = { '--hero-desktop-position': media.desktopPosition, '--hero-mobile-position': media.mobilePosition } as CSSProperties;
  return <><div className="hero-visual" data-media-kind={failed ? 'placeholder' : media.kind} data-media-failed={failed || placeholderFailed} style={style}>
    <div className="hero-media" data-hero-background aria-hidden="true">
      {!placeholderFailed && <Image src={media.kind === 'placeholder' ? media.src : heroPlaceholder.src} alt="" fill priority unoptimized className="hero-background-image hero-placeholder-image" onError={() => setPlaceholderFailed(true)} />}
      {!fallbackMode && <HeroImage src={media.kind === 'video' ? media.poster : media.src} mobileSrc={media.kind === 'video' ? media.mobilePoster : media.mobileSrc} onError={() => setFailed(true)} />}
    </div>
    {!fallbackMode && media.kind === 'video' && <HeroVideo media={media} onError={() => setFailed(true)} />}
    <div className="hero-overlay" aria-hidden="true" />
  </div>
    {children}
    <Container className="hero-footer">{footer}<p className="hero-media-caption">{failed ? heroPlaceholder.caption : media.caption}</p></Container>
  </>;
}
