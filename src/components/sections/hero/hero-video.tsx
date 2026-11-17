'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { HeroMediaConfig } from '@/types/hero';

export function HeroVideo({ media, onError }: { media: Extract<HeroMediaConfig, { kind: 'video' }>; onError: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setAllowed(query.matches && !connection?.saveData);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!allowed || !element) return;
    let inView = false;
    const update = () => {
      if (!userPaused && inView && !document.hidden) void element.play().catch(() => { /* Poster remains visible if autoplay is blocked. */ });
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); element.pause(); };
  }, [allowed, userPaused]);
  if (!allowed) return null;
  return <>
    <video ref={video} className="hero-background-video" data-ready={ready} src={media.src} poster={media.poster}
      muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} onError={onError}
      onPlaying={() => { setPlaying(true); setReady(true); }} onPause={() => setPlaying(false)} />
    <button type="button" className="hero-video-control" aria-label={playing ? 'Pause background video' : 'Play background video'}
      onClick={() => { setUserPaused(playing); if (playing) video.current?.pause(); else void video.current?.play().catch(() => {}); }}>
      {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
      <span>{playing ? 'Pause' : 'Play'} background</span>
    </button>
  </>;
}
