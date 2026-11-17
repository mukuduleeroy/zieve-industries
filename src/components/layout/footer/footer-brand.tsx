import { Heading, Text } from '@/components/ui/primitives';
import { footerContent } from '@/content/footer';
import { BrandLink } from '@/components/layout/brand-link';
export function FooterBrand() {
  return <div className="footer-brand-area">
    <div data-footer-reveal><BrandLink priority={false} /></div>
    <div className="footer-brand-editorial" data-footer-reveal>
      <Heading as="h2" size="display" id="footer-brand-statement">{footerContent.statement}</Heading>
      <Text>{footerContent.description}</Text>
    </div>
  </div>;
}
