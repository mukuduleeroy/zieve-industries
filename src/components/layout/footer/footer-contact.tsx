import { Heading, Link } from '@/components/ui/primitives';
import { contact } from '@/content/contact';
import { footerContent } from '@/content/footer';
import { QuoteLink } from '@/components/layout/quote-link';
export function FooterContact() {
  return <div className="footer-contact" data-footer-reveal>
    <Heading as="h3" size="subtitle">{footerContent.contactLabel}</Heading>
    <address><p>{contact.address}</p><Link href={contact.phoneHref}>{contact.phone}</Link><Link href={contact.emailHref}>{contact.email}</Link></address>
    <QuoteLink />
  </div>;
}
