'use client';
import { useState, type CSSProperties } from 'react';
import { Image } from '@/components/ui/primitives';
import { introductionPlaceholder } from '@/config/introduction-media';
import type { EditorialMediaConfig } from '@/types/editorial-media';

export function IntroductionMedia({ media }: { media: EditorialMediaConfig }) {
  const [failed, setFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const current = failed ? introductionPlaceholder : media;
  const unavailable = failed && fallbackFailed;
  const positions = { '--intro-desktop-position': current.desktopPosition, '--intro-mobile-position': current.mobilePosition } as CSSProperties;
  return <figure className="introduction-figure" style={positions} data-media-kind={current.kind} data-media-failed={failed}>
    <div className="introduction-image-mask" data-intro-image-mask>
      <div className="introduction-image-parallax" data-intro-parallax>
        {!unavailable ? <Image key={current.src} src={current.src} alt={current.alt} fill
          sizes="(min-width: 80rem) 500px, (min-width: 64rem) 42vw, (min-width: 40rem) 576px, 100vw"
          loading="lazy" unoptimized={current.kind === 'placeholder'} className="introduction-image"
          onError={() => { if (failed || current.kind === 'placeholder') setFallbackFailed(true); setFailed(true); }} />
          : <div className="introduction-media-unavailable" role="img" aria-label="Industrial visual unavailable. Approved company photography is pending."><span>Industrial visual<br />awaiting approved photography</span></div>}
      </div>
    </div>
    <figcaption>{unavailable ? 'Visual placeholder unavailable · Approved photography pending' : current.caption}</figcaption>
  </figure>;
}
