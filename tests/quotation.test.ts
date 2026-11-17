import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { quotationSchema, quotationDefaults } from '@/lib/quotation/schema';
import { prepareEmailQuotation, MAILTO_MAX_LENGTH } from '@/lib/quotation/submission';
import { quotationCategories } from '@/content/quotation';
import { services } from '@/content/services';
import { contact } from '@/content/contact';
import { QuotationSection } from '@/components/sections/quotation/quotation-section';
const valid = { ...quotationDefaults, fullName: 'Tariro Moyo', email: 'tariro@example.com', category: services[0].slug, requirements: 'Please quote for excavator filters.' };

describe('Quotation validation and email preparation', () => {
  it('requires four meaningful fields and validates email and category membership', () => {
    const empty = quotationSchema.safeParse(quotationDefaults);
    expect(empty.success).toBe(false);
    if (!empty.success) expect(new Set(empty.error.issues.map(issue => issue.path[0]))).toEqual(new Set(['fullName', 'email', 'category', 'requirements']));
    expect(quotationSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
    expect(quotationSchema.safeParse({ ...valid, category: 'unsupported-category' }).success).toBe(false);
    expect(quotationSchema.safeParse({ ...valid, industry: 'unsupported-sector' }).success).toBe(false);
    expect(quotationSchema.safeParse({ ...valid, fullName: '  ', requirements: '  ' }).success).toBe(false);
    expect(quotationSchema.safeParse(valid).success).toBe(true);
  });
  it('enforces reasonable limits without changing the caller’s input', () => {
    expect(quotationSchema.safeParse({ ...valid, requirements: 'x'.repeat(4001) }).success).toBe(false);
    expect(quotationSchema.safeParse({ ...valid, fullName: 'x'.repeat(121) }).success).toBe(false);
    expect(quotationSchema.safeParse({ ...valid, company: 'Header\r\nInjection' }).success).toBe(false);
    const input = { ...valid, fullName: '  Tariro Moyo  ' };
    expect(quotationSchema.parse(input).fullName).toBe('Tariro Moyo');
    expect(input.fullName).toBe('  Tariro Moyo  ');
  });
  it('derives the company email and correctly round-trips special characters and newlines', () => {
    const input = { ...valid, fullName: 'Zoë & 李', company: 'A&B + Co', requirements: 'Filters & fittings?\nSize: 20% + 5 / "A" #1' };
    const draft = prepareEmailQuotation(input);
    expect(draft.kind).toBe('email');
    expect(draft.to).toBe(contact.email);
    expect(draft.body).toContain('Product / service category: Earthmoving & Construction Equipment');
    expect(draft.body).toContain('Industry sector: Not specified');
    expect(draft.body).toContain('Filters & fittings?\r\nSize: 20% + 5 / "A" #1');
    if (draft.kind === 'email') {
      expect(draft.href.length).toBeLessThanOrEqual(MAILTO_MAX_LENGTH);
      const uri = new URL(draft.href);
      expect(uri.protocol).toBe('mailto:');
      expect(uri.pathname).toBe(contact.email);
      expect(uri.searchParams.get('subject')).toBe(draft.subject);
      expect(uri.searchParams.get('body')).toBe(draft.body);
    }
  });
  it('keeps the complete long enquiry and omits an unsafe mailto href', () => {
    const requirements = 'Required: hydraulic oils & filters. '.repeat(90);
    const draft = prepareEmailQuotation({ ...valid, requirements });
    expect(draft.kind).toBe('copy');
    expect('href' in draft).toBe(false);
    expect(draft.summary).toContain(requirements.trim());
    expect(draft.summary).toContain(`To: ${contact.email}`);
  });
  it('uses existing categories and renders a named, safely disabled pre-hydration form', () => {
    expect(quotationCategories.map(item => item.label)).toEqual(services.map(item => item.name));
    const html = renderToStaticMarkup(createElement(QuotationSection));
    expect(html).toContain(contact.address);
    expect(html).toContain(contact.phone);
    expect(html).toContain(contact.email);
    expect(html).toContain('id="request-a-quote"');
    expect(html).toContain('aria-labelledby="quotation-form-title"');
    expect(html).toContain('<fieldset disabled=""');
    expect(html).toMatch(/novalidate=""/i);
    expect(html).not.toContain('<h1');
  });
});
