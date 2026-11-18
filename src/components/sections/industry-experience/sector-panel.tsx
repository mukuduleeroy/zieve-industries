import { Container, Heading, Text, Anchor as Link } from '@/components/ui/primitives';
import type { IndustryPanelContent } from '@/content/industry-experience';
import { industryMedia, industryPlaceholders } from '@/config/industry-media';
import { IndustryMedia } from './industry-media';
export function SectorPanel({ sector, reverse }: { sector: IndustryPanelContent; reverse: boolean }) {
  return <article className="industry-panel" data-surface="navy" data-reverse={reverse} id={`industry-${sector.slug}`} aria-labelledby={`industry-title-${sector.slug}`}>
    <Container><div className="industry-panel-grid">
      <div className="industry-editorial">
        <span className="industry-number" data-industry-number aria-hidden="true">{sector.number}</span>
        <Heading as="h3" id={`industry-title-${sector.slug}`} className="industry-name" data-industry-reveal>{sector.name}</Heading>
      </div>
      <IndustryMedia media={industryMedia[sector.slug]} fallback={industryPlaceholders[sector.slug]} labelledBy={`industry-title-${sector.slug}`} />
      <div className="industry-copy">
        <p className="industry-headline" data-industry-reveal>{sector.headline}</p>
        <Text className="industry-description" data-industry-reveal>{sector.description}</Text>
        {sector.procurementNote && <Text className="industry-procurement" data-industry-reveal>{sector.procurementNote}</Text>}
        <div className="industry-product-context" data-industry-reveal>
          <span className="industry-divider" data-industry-divider aria-hidden="true" />
          <p className="eyebrow">Relevant solutions</p>
          <ul className="industry-solution-links">{sector.solutions.map(solution => <li key={solution.href}><Link href={solution.href}>{solution.label}</Link></li>)}</ul>
        </div>
      </div>
    </div></Container>
  </article>;
}
