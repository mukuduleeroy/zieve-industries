import { Container, Section, Heading, Text } from '@/components/ui/primitives';
import { quotationContent as content } from '@/content/quotation';
import { CorporateContact } from './corporate-contact';
import { QuotationForm } from './quotation-form';
import { QuotationMotion } from './quotation-motion';
export function QuotationSection() {
  return <Section tabIndex={-1} id={content.id} className="quotation-section" aria-labelledby="quotation-title"><Container>
    <QuotationMotion>
      <div className="quotation-editorial">
        <div className="quotation-linework" aria-hidden="true" />
        <p className="eyebrow quotation-eyebrow" data-quotation-reveal>{content.eyebrow}</p>
        <Heading as="h2" id="quotation-title" data-quotation-reveal>{content.heading}</Heading>
        <Text className="quotation-supporting" data-quotation-reveal>{content.supporting}</Text>
        <CorporateContact />
      </div>
      <QuotationForm />
    </QuotationMotion>
  </Container></Section>;
}
