# Image integration report

**Stage A only — Stage B not started.** No application/configuration/asset files were modified and no image was placed in public/. Existing schematics and provenance labels remain active. Proposed filenames in the inventory are plans, not installed assets. No remote hosts were added to Next configuration.

## Existing implementation and approved-stage plan

| Placement | Existing configuration | Preserved presentation |
|---|---|---|
| Hero | src/config/hero-media.ts | Viewport-cover image, current navy overlay, live heading/actions, wrapping caption/scroll footer, decorative empty alt, restrained entrance. |
| Introduction | src/config/introduction-media.ts | 5:6 reserved mask, descriptive alt/caption, responsive sizes and existing image reveal/parallax. |
| Five divisions | src/config/solutions-media.ts | 16:10 frames, active-only media, existing selector/keyboard/inert panels, responsive sizing and reduced motion. |
| Four sectors | src/config/industry-media.ts | 4:3 frames, alternating content-first layout, lazy images, existing masks/parallax and reduced motion. |

Once approved, acquire originals through the original publishers' download controls; record final files/rights evidence and export appropriately sized local WebP photographs under public/images/industrial/{hero,company,solutions,industries}. Preserve independent schematic fallback entries and accurate stock captions. Do not use the 1200px research copies as production masters. Do not make remote URLs into permanent production dependencies.

Use existing next/image optimisation. Below-fold images are lazy and have established sizes; preserve frame ratios and focal points. The hero image is the only high-priority photograph. Review its current schematic underlay, which is also marked priority, when switching kinds so a fallback does not compete unnecessarily with the primary image; any such change must be restricted to necessary photo/fallback presentation. Native art-direction support already exists for an approved mobile source. No Three.js, new gallery library, new section, typography change or routing framework is needed.

Two rights-blocked entries stay as schematics unless appropriate written permission/paid rights and brand approval are recorded. Never publish the reference PDFs, their watermarked stock previews or a generic unrelated plant as a substitute.

## Required Stage B verification

Verify original-resolution crops in the actual application at 375/390/768/1024/1440/1920px, normal/reduced motion, active division changes, image failures and small screens. Inspect hero contrast against the existing gradient without redesigning it; preserve Phase 11A enlarged-text and discovery behaviour. Run lint, strict TypeScript, production build, unit/component and full Playwright tests. Compare local image requests/bytes, loading priority, LCP and CLS with a freshly measured baseline using identical conditions. Record client vs production limitations. No after-integration claim can be made before this stage.
