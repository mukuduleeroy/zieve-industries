import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { approvedPhotography } from '@/config/approved-photography';
import { industrialPhotography } from '@/config/industrial-photography';
import { heroMedia, heroPlaceholder } from '@/config/hero-media';
import { introductionPlaceholder } from '@/config/introduction-media';
import { solutionsMedia, solutionPlaceholders } from '@/config/solutions-media';
import { industryMedia, industryPlaceholders } from '@/config/industry-media';

describe('conditional photography integration', () => {
  it('retains Elution and all independent fallbacks while enabling the three specifically approved placements', () => {
    expect(heroMedia.kind).toBe('image');
    expect(heroPlaceholder.kind).toBe('placeholder');
    expect(solutionsMedia['elution-gold-processing']).toBe(solutionPlaceholders['elution-gold-processing']);
    expect(solutionsMedia['earthmoving-construction']).toBe(approvedPhotography.earthmoving);
    expect(solutionsMedia['lubricants-fluids']).toBe(approvedPhotography.lubricants);
    expect(industryMedia['civil-infrastructure']).toBe(approvedPhotography.civil);
    for (const fallback of [solutionPlaceholders['earthmoving-construction'], solutionPlaceholders['lubricants-fluids'], industryPlaceholders['civil-infrastructure'], introductionPlaceholder]) expect(fallback.kind).toBe('placeholder');
  });
  it('verifies the three user-approved crops against their source/licence register', () => {
    const register = JSON.parse(readFileSync('public/images/industrial/approved-photography.json', 'utf8'));
    expect(register.images).toHaveLength(3);
    for (const media of Object.values(approvedPhotography)) {
      const record = register.images.find((item: { publishedSrc: string }) => item.publishedSrc === media.src);
      expect(record.approvedForPlacement).toBe(true);
      expect(record.license).toMatch(/^https:/);
      expect(createHash('sha256').update(readFileSync(`public${media.src}`)).digest('hex')).toBe(record.publishedSha256);
      expect(media.approval).toContain('User approved');
    }
  });
  it('preserves the original six verified derivatives recorded in the source register', () => {
    const register: { localFilename: string; sha256: string }[] = JSON.parse(readFileSync('docs/homepage-refinement/phase-11a5/evidence/stage-b/integrated-images.json', 'utf8'));
    expect(Object.values(industrialPhotography)).toHaveLength(6);
    for (const media of Object.values(industrialPhotography)) {
      const record = register.find(item => item.localFilename === `public${media.src}`);
      expect(record).toBeDefined();
      expect(createHash('sha256').update(readFileSync(`public${media.src}`)).digest('hex')).toBe(record!.sha256);
      expect(media.caption).toContain('Illustrative stock photo');
      expect(media.alt).toContain('Not a Zieve');
      expect(media.src).toMatch(/^\/images\/industrial\/.+\.webp$/);
    }
  });
  it('uses distinct component and manufacturing photographs', () => {
    expect(industrialPhotography.company.src).not.toBe(industrialPhotography.manufacturing.src);
    expect(industrialPhotography.company.alt).toContain('component');
    expect(industrialPhotography.manufacturing.alt).toContain('shaft');
  });
});
