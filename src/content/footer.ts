import { company } from './company';
import { contact } from './contact';
import { profileSource } from './source';
export const footerContent = {
  companyName: company.name,
  statement: company.tagline,
  description: "A dependable industrial supply and equipment partner serving Zimbabwe's mining, construction, manufacturing and agro-processing sectors.",
  location: contact.address.split(', ').slice(-2).join(', '),
  primaryLabel: 'Explore Zieve', solutionsLabel: 'Our Solutions', contactLabel: 'Get in touch',
  source: profileSource(2, 3, 12),
} as const;
