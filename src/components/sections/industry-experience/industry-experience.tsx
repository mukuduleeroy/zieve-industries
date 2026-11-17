import { Container, Section, Heading } from '@/components/ui/primitives';
import { industryExperienceContent as content, industrySectors } from '@/content/industry-experience';
import { IndustryMotion } from './industry-motion';
import { SectorPanel } from './sector-panel';
export function IndustryExperience() {
  return <Section tabIndex={-1} id={content.id} className="industry-experience" aria-labelledby="industries-title">
    <Container><IndustryMotion className="industry-section-header">
      <p className="eyebrow" data-industry-reveal>{content.eyebrow}</p>
      <Heading as="h2" id="industries-title" data-industry-reveal>{content.heading}</Heading>
    </IndustryMotion></Container>
    <ol role="list" className="industry-sector-list">{industrySectors.map((sector, index) => <li key={sector.slug}><SectorPanel sector={sector} reverse={index % 2 === 1} /></li>)}</ol>
  </Section>;
}
