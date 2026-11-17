import { Container, Heading, Text } from '@/components/ui/primitives';
import { purposeContent as content, purposeValues } from '@/content/purpose';
import { PurposeMotion } from './purpose-motion';
export function PurposeValues() {
  return <div className="purpose-values" id="purpose-values">
    <Container><PurposeMotion className="purpose-values-content">
      <Heading as="h3" id="purpose-values-title" data-purpose-reveal>{content.valuesLabel}</Heading>
      <span className="purpose-divider" data-purpose-divider aria-hidden="true" />
      <ol role="list" className="purpose-values-list" aria-labelledby="purpose-values-title">{purposeValues.map(value => <li key={value.id} className="purpose-value" data-purpose-value>
        <span className="purpose-value-number" aria-hidden="true">{value.number}</span>
        <Heading as="h4" size="subtitle" id={`purpose-value-${value.id}`}>{value.name}</Heading>
        <Text>{value.description}</Text>
      </li>)}</ol>
    </PurposeMotion></Container>
  </div>;
}
