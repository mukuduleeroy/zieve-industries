import { Container, Section, Heading } from '@/components/ui/primitives';
import { industryExperienceContent as content, industrySectors } from '@/content/industry-experience';
import { IndustryMotion } from './industry-motion';
import { SectorPanel } from './sector-panel';
export function IndustryExperience() {
  return <Section tabIndex={-1} id={content.id} className="industry-experience" aria-labelledby="industries-title">
    <IndustryMotion>
      <Container><div className="industry-section-header"><Heading as="h2" id="industries-title">{content.heading}</Heading></div></Container>
      <div className="industry-viewport">
        <ol role="list" className="industry-sector-list">{industrySectors.map((sector, index) => <li key={sector.slug}><SectorPanel sector={sector} reverse={index % 2 === 1} /></li>)}</ol>
      </div>
      <Container><div className="industry-progress" aria-hidden="true"><span data-industry-current>01</span><span className="industry-progress-track"><span data-industry-progress /></span><span>04</span></div></Container>
    </IndustryMotion>
  </Section>;
}
