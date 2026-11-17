import { describe, expect, it } from 'vitest';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { contact } from '@/content/contact';
import { company } from '@/content/company';
import { navigation, routes } from '@/content/navigation';
describe('Profile content integrity', () => {
  it('retains five distinct divisions and traceable PDF pages', () => {
    expect(services).toHaveLength(5);
    expect(new Set(services.map(service => service.slug)).size).toBe(services.length);
    for (const item of [...services, ...industries, contact]) {
      expect(item.source.document).toMatch(/\.pdf$/);
      expect(item.source.pages.length).toBeGreaterThan(0);
      expect(item.source.pages.every(page => Number.isInteger(page) && page >= 1 && page <= 12)).toBe(true);
    }
  });
  it('preserves source contact details and values', () => {
    expect(contact.phoneHref).toBe(`tel:${contact.phone.replaceAll(' ', '')}`);
    expect(contact.emailHref).toBe(`mailto:${contact.email}`);
    expect(company.values.map(value => value.name)).toEqual(['Reliability', 'Integrity', 'Partnership', 'Excellence', 'Growth']);
  });
  it('only exposes implemented destinations', () => {
    expect(navigation.map(item => item.href)).toEqual(Object.values(routes));
  });
});
