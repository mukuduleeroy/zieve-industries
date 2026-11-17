import { contact } from '@/content/contact';
import { company } from '@/content/company';
import { quotationCategories, quotationIndustries } from '@/content/quotation';
import { quotationSchema, type QuotationData } from './schema';
/** Conservative interoperability budget, not a universal browser/email-client guarantee. */
export const MAILTO_MAX_LENGTH = 1800;
interface EnquiryDraft { to: string; subject: string; body: string; summary: string }
export type PreparedQuotation = EnquiryDraft & ({ kind: 'email'; href: string } | { kind: 'copy' });
export interface QuotationSubmissionAdapter { prepare(data: QuotationData): PreparedQuotation | Promise<PreparedQuotation> }

/** Pure preparation only: no delivery, logging, persistence or network request. */
export function prepareEmailQuotation(input: QuotationData): PreparedQuotation {
  const data = quotationSchema.parse(input);
  const category = quotationCategories.find(item => item.value === data.category)!.label;
  const industry = quotationIndustries.find(item => item.value === data.industry)?.label ?? 'Not specified';
  const subject = `Quotation enquiry — ${category} — ${data.company || data.fullName}`;
  const body = [
    `Quotation enquiry for ${company.name}`, '',
    `Full name: ${data.fullName}`, `Email: ${data.email}`,
    `Company / organisation: ${data.company || 'Not specified'}`,
    `Telephone / WhatsApp: ${data.telephone || 'Not specified'}`,
    `Product / service category: ${category}`, `Industry sector: ${industry}`,
    `Delivery / project location: ${data.location || 'Not specified'}`, '',
    'Requirements / project description:', data.requirements.replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n'),
  ].join('\r\n');
  const summary = `To: ${contact.email}\r\nSubject: ${subject}\r\n\r\n${body}`;
  const href = `${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const draft = { to: contact.email, subject, body, summary };
  return href.length <= MAILTO_MAX_LENGTH ? { ...draft, kind: 'email', href } : { ...draft, kind: 'copy' };
}
export const emailQuotationAdapter: QuotationSubmissionAdapter = { prepare: prepareEmailQuotation };
