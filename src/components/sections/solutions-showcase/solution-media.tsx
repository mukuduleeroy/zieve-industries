'use client';
import { useState, type CSSProperties } from 'react';
import { Image } from '@/components/ui/primitives';
import type { EditorialMediaConfig } from '@/types/editorial-media';
export function SolutionMedia({ media, fallback, eager = false }: { media: EditorialMediaConfig; fallback: EditorialMediaConfig; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const current = failed ? fallback : media;
  const positions = { '--solution-desktop-position': current.desktopPosition, '--solution-mobile-position': current.mobilePosition } as CSSProperties;
  return <figure className="solution-media" style={positions} data-media-failed={failed} data-media-kind={current.kind}>
    <div className="solution-media-frame">
      {unavailable ? <div className="solution-media-unavailable" role="img" aria-label="Division illustration unavailable. Approved photography pending.">Approved division photography pending</div> :
        <Image src={current.src} key={current.src} alt={current.alt} fill loading={eager ? 'eager' : 'lazy'} sizes="(min-width: 80rem) 720px, (min-width: 64rem) 58vw, 100vw" unoptimized={current.kind === 'placeholder'} className="solution-media-image"
          onError={() => { if (failed || current.kind === 'placeholder') setUnavailable(true); setFailed(true); }} />}
    </div>
    <figcaption>{unavailable ? 'Illustration unavailable · Approved division photography pending' : current.caption}</figcaption>
  </figure>;
}
