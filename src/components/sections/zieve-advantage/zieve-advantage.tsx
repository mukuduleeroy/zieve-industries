import { Container, Section, Heading, Text } from '@/components/ui/primitives';
import { advantageContent as content, operatingPillars } from '@/content/advantage';
import { AdvantageMotion } from './advantage-motion';
import { PillarAccordion } from './pillar-accordion';
export function ZieveAdvantage() {
  return <Section tabIndex={-1} id={content.id} className="zieve-advantage" aria-labelledby="advantage-title"><Container>
    <AdvantageMotion>
      <div className="advantage-editorial">
        <p className="eyebrow advantage-eyebrow" data-advantage-reveal>{content.eyebrow}</p>
        <Heading as="h2" id="advantage-title" className="advantage-title" data-advantage-reveal>{content.headline.map((line, index) => <span key={line}>{line}{index === 0 ? ' ' : ''}</span>)}</Heading>
        <Text className="advantage-supporting" data-advantage-reveal>{content.supporting}</Text>
        <div className="advantage-signature"><span className="advantage-divider" data-advantage-divider aria-hidden="true" /><Text data-advantage-reveal>{content.closing}</Text></div>
      </div>
      <PillarAccordion />
    </AdvantageMotion>
    <noscript><div className="advantage-static"><p>All five operating pillars</p><dl>{operatingPillars.map(pillar => <div key={pillar.id}><dt>{pillar.title}</dt><dd>{pillar.description}</dd></div>)}</dl></div></noscript>
  </Container></Section>;
}
