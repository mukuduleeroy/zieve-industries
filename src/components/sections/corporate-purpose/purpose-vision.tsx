import { Container, Heading } from '@/components/ui/primitives';
import { purposeContent as content } from '@/content/purpose';
import { PurposeMotion } from './purpose-motion';
export function PurposeVision() {
  return <div className="purpose-vision" id="purpose-vision">
    <div className="purpose-linework" aria-hidden="true" />
    <Container><PurposeMotion className="purpose-vision-content">
      <p className="eyebrow purpose-eyebrow" data-purpose-reveal>{content.eyebrow}</p>
      <Heading as="h2" id="purpose-title" className="purpose-title" data-purpose-reveal>{content.heading}</Heading>
      <div className="purpose-vision-passage">
        <Heading as="h3" size="subtitle" id="purpose-vision-title" className="purpose-movement-label" data-purpose-reveal>{content.vision.label}</Heading>
        <span className="purpose-divider" data-purpose-divider aria-hidden="true" />
        <p className="purpose-vision-statement" data-purpose-reveal>{content.vision.statement}</p>
      </div>
    </PurposeMotion></Container>
  </div>;
}
