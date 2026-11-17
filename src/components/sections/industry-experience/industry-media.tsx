'use client';
import { useState, type CSSProperties } from 'react';
import { Image } from '@/components/ui/primitives';
import type { EditorialMediaConfig } from '@/types/editorial-media';
export function IndustryMedia({ media, fallback }: { media: EditorialMediaConfig; fallback: EditorialMediaConfig }) {
  const [failed, setFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const current = failed ? fallback : media;
  const positions = { '--industry-desktop-position': current.desktopPosition, '--industry-mobile-position': current.mobilePosition } as CSSProperties;
  return <figure className="industry-figure" style={positions} data-media-failed={failed} data-media-kind={current.kind}>
    <div className="industry-image-mask" data-industry-mask>
      <div className="industry-image-parallax" data-industry-parallax>
        {unavailable ? <div className="industry-media-unavailable" role="img" aria-label="Sector illustration unavailable. Approved photography pending.">Approved sector photography pending</div> :
          <Image key={current.src} src={current.src} alt={current.alt} fill loading="lazy" sizes="(min-width: 80rem) 600px, (min-width: 64rem) 50vw, (min-width: 40rem) 640px, 100vw" unoptimized={current.kind === 'placeholder'} className="industry-image"
            onError={() => { if (failed || current.kind === 'placeholder') setUnavailable(true); setFailed(true); }} />}
      </div>
    </div>
    <figcaption>{unavailable ? 'Illustration unavailable · Approved sector photography pending' : current.caption}</figcaption>
  </figure>;
}
