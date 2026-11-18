import { services } from './services';
import { industrySectors } from './industry-experience';
import { profileSource } from './source';
import { quotationAnchor } from './anchors';
export const quotationCategories = services.map(service => ({ value: service.slug, label: service.name }));
export const quotationIndustries = [
  { value: industrySectors[0].slug, label: 'Mining' },
  ...industrySectors.slice(1).map(sector => ({ value: sector.slug, label: sector.name })),
  { value: 'government-public-sector', label: 'Government / Public Sector' },
  { value: 'other', label: 'Other' },
] as const;
export const quotationContent = {
  id: 'partner-with-zieve', formId: quotationAnchor.id,
  heading: 'Your next project starts with the right partner.',
  supporting: "Whether you're commissioning a gold-recovery circuit, mobilising an equipment fleet or sourcing essential industrial consumables, let's discuss what your operation needs.",
  formTitle: 'Prepare a quotation enquiry',
  instructions: 'Fields marked required are needed to prepare your email. Review the draft, open your email application, then send it manually.',
  source: profileSource(12),
} as const;
