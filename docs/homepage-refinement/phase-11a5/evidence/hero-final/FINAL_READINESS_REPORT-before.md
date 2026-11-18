# Phase 11A.5 — final readiness

Updated 2026-11-17. Conditional Stage B integration only. Hero remains schematic until final visual approval.

**Conditional integration complete; ready for image review, not deployment or Phase 11B.**

- Integrated six: **PH02, PH05, PH07-B, PH08, PH10, PH11**. PH07-B is the cleaner neutral fasteners alternative, documented against the original. PH02's displayed crop excludes the worker profile; PH10 shows a distinct long shaft/rear-view composition.
- Remain schematic: **PH01, PH03, PH04, PH06, PH09**. PH04/PH06 by instruction; PH03/PH09 because source-specific brand/people conditions are unresolved. Direction approval was not treated as blanket commercial clearance.
- Hero: original Built/Komatsu candidate rejected. Two replacement crop studies with original URLs/licence evidence are in [FINAL_SELECTION_BOARD.html](FINAL_SELECTION_BOARD.html) and [IMAGE_SELECTION_REPORT.md](IMAGE_SELECTION_REPORT.md). R1 is scenic with a small excavator; R2 is equipment-led but requires approval of horizontal reflection. Neither is connected to the app. Google Images was attempted but inaccessible; this limitation is recorded.
- Six native originals were acquired, fully decoded, inspected and hashed; source/download links, modification/commercial conditions, optional attribution, local filenames, resolutions and intended-use assessments are in the source/licence registers. No separate release certificate or blanket rights warranty is fabricated. Contributor/publisher credits and stock provenance are visible.
- Preserved all nine sections, original logo, typography/tokens, header/hero behaviors, layout/motion utilities, navigation, quotation form, inner pages and deployment configuration. No packages installed, purchases, permission requests, AI photos or deployment. Existing schematic fallback files/objects remain intact.

## Verification

- ESLint: passed.
- Strict TypeScript: passed.
- Production build: passed.
- Unit/component tests: **43 passed / 12 files**.
- Playwright: **126 passed**, desktop and mobile. Includes Phase 11A discovery/reflow, 200% root text, photo loading/failure and existing section/navigation/form behavior.
- Actual homepage captures: **390, 768, 1024, 1440, 1920px**; no horizontal overflow or page errors in the capture inventory. Photo frames remained reserved.
- Local before/after measurements and actual responsive payloads recorded. Photo payload increases over schematics; no causal LCP improvement or production CWV claim. Small tablet startup hero/footer shifts (~0.008 CLS) remain documented and outside the photography change.
- Source integrity: existing changes limited to three media maps and relevant tests; header/hero/components/content/tokens/routes/logo/deployment unchanged. See evidence/stage-b/scope-integrity.json.

## Files changed

Created src/config/industrial-photography.ts; six public/images/industrial/**/*.webp assets; tests/photography.test.ts; tests/e2e/photography.spec.ts; tests/e2e/media-routes.ts. Modified src/config/{introduction,solutions,industry}-media.ts; tests/{introduction,industries}.test.ts; tests/e2e/{introduction,solutions,industries}.spec.ts. Updated the seven required current reports, research follow-up, review board/screenshots/evidence, docs/IMPLEMENTATION.md and docs/CONTENT.md. No production component or CSS file was rebuilt.

## Review needed

Choose R1 or R2 (including its stated crop/reflection tradeoff), or reject both; review the six actual integrated placements for final visual acceptance. No additional permission is needed to keep PH03/PH09 on their current schematic holds. Any future replacement or paid acquisition needs its own approved source and appropriate rights. Stop here: no Phase 11B or deployment authorization is inferred.
