import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { industrialPhotography } from '@/config/industrial-photography';
import { heroMedia, heroPlaceholder } from '@/config/hero-media';
import { introductionPlaceholder } from '@/config/introduction-media';
import { solutionsMedia, solutionPlaceholders } from '@/config/solutions-media';
import { industryMedia, industryPlaceholders } from '@/config/industry-media';

describe('conditional photography integration', () => {
  it('preserves the hero fallback and holds every unresolved placement on its schematic', () => {
    expect(heroMedia.kind).toBe('image');
    expect(heroPlaceholder.kind).toBe('placeholder');
    for (const slug of ['earthmoving-construction', 'elution-gold-processing', 'lubricants-fluids'] as const) {
      expect(solutionsMedia[slug]).toBe(solutionPlaceholders[slug]);
      expect(solutionsMedia[slug].kind).toBe('placeholder');
    }
    expect(industryMedia['civil-infrastructure']).toBe(industryPlaceholders['civil-infrastructure']);
    expect(introductionPlaceholder.kind).toBe('placeholder');
  });
  it('publishes exactly the six verified derivatives recorded in the source register', () => {
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
