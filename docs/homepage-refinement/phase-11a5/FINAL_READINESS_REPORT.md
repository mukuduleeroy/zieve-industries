# Phase 11A.5 — final PH01 integration

**R1 Sunrise Excavator is installed. R2 is rejected for this checkpoint.** Updated 2026-11-17. This PH01-only update supersedes the earlier hero hold; the other six configured photographs and four held placements are unchanged.

**PH01 implementation and verification complete. Stop here; no Phase 11B or deployment.**

- R1 Sunrise Excavator by Metehan Özaras is integrated through the established hero media configuration. R2 rejected. The original schematic remains intact beneath the photograph and on image failure.
- Original Pexels page, detailed commercial/modification/download terms, photographer, acquisition date, native resolution and exact file hashes are recorded. Visible caption identifies illustrative stock and disclaims a Zieve site. No blanket model/property-release claim, purchase or permission request.
- Two optimized local WebP derivatives use the approved desktop starting crop and a refined mobile crop, without mirroring. Existing navy overlay, copy, layout, fonts, CTA destinations, animation behavior and header remain intact.
- ESLint, strict TypeScript and production build passed. **44 unit/component tests across 12 files** and the **full 132-test desktop/mobile Playwright suite** passed.
- Actual homepage/hero screenshots captured at **390, 768, 1024, 1440 and 1920px**. No horizontal overflow or page errors in responsive inventory. Sampled headline/supporting-copy contrast passes the relevant normal-text/large-text thresholds at these widths.
- Responsive image selection/loading, failures, reduced motion, enlarged text, CDP visual magnification and existing navigation/quotation/section regressions checked. Local before/after LCP, payloads and layout shifts measured; no production CWV claim. Native browser-chrome zoom and physical assistive-technology testing remain unverified.
- PH02/PH05/PH07-B/PH08/PH10/PH11 photography is unchanged. **PH03/PH04/PH06/PH09 remain labelled schematics** with their existing rights/instruction holds. No logo/font/inner-page/deployment configuration changes or dependencies added.

## Files changed at this checkpoint

`src/config/hero-media.ts`; two assets under `public/images/industrial/hero/`; `tests/hero.test.ts`, the PH01 assertion in `tests/photography.test.ts`, the hero failure case in `tests/e2e/hero.spec.ts`; new `tests/e2e/hero-photography.spec.ts`; the seven Phase 11A.5 reports, this checkpoint's evidence/screenshots and small documentation status updates. All production component/CSS/motion files and other media maps/assets are unchanged relative to the checkpoint snapshot.

## Evidence and remaining dependencies

See [source register](IMAGE_SOURCE_REGISTER.md), [licence register](IMAGE_LICENSE_REGISTER.md), [visual QA](VISUAL_QA_REPORT.md), [performance report](PERFORMANCE_REPORT.md) and `evidence/hero-final/`. Source-integrity JSON distinguishes this PH01 checkpoint from earlier uncommitted work. Small pre-existing tablet startup hero/header sizing shifts remain recorded; no universal zero-CLS guarantee. Remaining photography dependencies are the four held placements, not further R1 selection approval. Existing broader release requirements (approved brand masters/webfonts and other earlier gates) are unchanged. Nothing was deployed.
