import { Container, Heading } from '@/components/ui/primitives';
import { purposeContent as content } from '@/content/purpose';
import { PurposeMotion } from './purpose-motion';
export function PurposeMission() {
  return <div className="purpose-mission" id="purpose-mission">
    <Container><PurposeMotion className="purpose-mission-layout">
      <div><Heading as="h3" className="purpose-mission-title" data-purpose-reveal>{content.mission.label}</Heading><span className="purpose-divider" data-purpose-divider aria-hidden="true" /></div>
      <p className="purpose-mission-statement" data-purpose-reveal>{content.mission.statement}</p>
    </PurposeMotion></Container>
  </div>;
}
