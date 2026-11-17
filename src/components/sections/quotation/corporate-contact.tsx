import { MapPin, Phone, Mail } from 'lucide-react';
import { contact } from '@/content/contact';
import { company } from '@/content/company';
import { Link } from '@/components/ui/primitives';
export function CorporateContact() {
  return <address className="quotation-contact" aria-label={`${company.name} contact information`}>
    <dl>
      <div data-quotation-contact><dt><MapPin size={18} aria-hidden="true" />Visit us</dt><dd>{contact.address}</dd></div>
      <div data-quotation-contact><dt><Phone size={18} aria-hidden="true" />Call us</dt><dd><Link href={contact.phoneHref}>{contact.phone}</Link></dd></div>
      <div data-quotation-contact><dt><Mail size={18} aria-hidden="true" />Email us</dt><dd><Link href={contact.emailHref}>{contact.email}</Link></dd></div>
    </dl>
  </address>;
}
