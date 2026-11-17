import { ArrowDown } from 'lucide-react';
import { Container, Section, Heading, Text } from '@/components/ui/primitives';
import { heroContent } from '@/content/hero';
import { heroMedia } from '@/config/hero-media';
import { HeroMotion } from './hero-motion';
import { HeroMedia } from './hero-media';
import { HeroAction } from './hero-action';
export function Hero() {
  return <Section className="hero" aria-labelledby="hero-title" id="hero">
    <HeroMotion>
      <HeroMedia media={heroMedia} footer={<a href={heroContent.scrollAction.href} className="hero-scroll" aria-label={heroContent.scrollAction.accessibleLabel}>
        <span className="hero-scroll-track" aria-hidden="true"><span /></span><span>{heroContent.scrollAction.label}</span><ArrowDown size={14} aria-hidden="true" />
      </a>}>
      <Container className="hero-container">
        <div className="hero-editorial">
          <p className="eyebrow hero-eyebrow" data-hero-eyebrow><span aria-hidden="true" />{heroContent.eyebrow}</p>
          <Heading as="h1" size="display" id="hero-title" className="hero-title">
            {heroContent.headline.map((line, index) => <span className="hero-headline-line" data-hero-headline key={line}>{line}{index === 0 ? ' ' : ''}</span>)}
          </Heading>
          <Text className="hero-supporting" data-hero-copy>{heroContent.supporting}</Text>
          <div className="hero-actions"><HeroAction action={heroContent.primaryAction} primary /><HeroAction action={heroContent.secondaryAction} /></div>
        </div>
      </Container>
      </HeroMedia>
    </HeroMotion>
  </Section>;
}
