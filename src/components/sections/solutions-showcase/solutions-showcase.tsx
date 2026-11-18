import { Container, Section, Heading, Text, Anchor as Link } from '@/components/ui/primitives';
import { solutionsShowcaseContent as content, solutionDivisions } from '@/content/solutions-showcase';
import { SolutionsWorkbench } from './solutions-workbench';
import { SolutionsMotion } from './solutions-motion';
export function SolutionsShowcase() {
  return <Section tabIndex={-1} id={content.id} className="solutions-showcase" aria-labelledby="solutions-title"><Container>
    <SolutionsMotion>
      <div className="solutions-section-header">
        <Heading as="h2" id="solutions-title" className="solutions-title" data-solutions-heading>{content.headline.map((line, index) => <span key={line}>{line}{index === 0 ? ' ' : ''}</span>)}</Heading>
        <Text className="solutions-supporting" data-solutions-heading>{content.supporting}</Text>
      </div>
      <SolutionsWorkbench />
    </SolutionsMotion>
    <noscript><div className="solutions-static"><p>Explore all five divisions:</p><ul>{solutionDivisions.map(division => <li key={division.slug}><Link href={division.href}>{division.name}</Link><Text>{division.description}</Text></li>)}</ul></div></noscript>
  </Container></Section>;
}
