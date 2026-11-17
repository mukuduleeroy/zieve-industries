import { Section } from '@/components/ui/primitives';
import { purposeContent } from '@/content/purpose';
import { PurposeVision } from './purpose-vision';
import { PurposeMission } from './purpose-mission';
import { PurposeValues } from './purpose-values';
export function CorporatePurpose() {
  return <Section tabIndex={-1} id={purposeContent.id} className="corporate-purpose" aria-labelledby="purpose-title">
    <PurposeVision /><PurposeMission /><PurposeValues />
  </Section>;
}
