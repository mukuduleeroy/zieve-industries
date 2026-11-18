# Implementation and scope

Phase 11B.6 · 18 November 2026 · no deployment.

## Completed refinements

1. Added a pointer-transparent1px amber-derived boundary at actual enhanced panel edges. It distinguishes outgoing Civil media from incoming Manufacturing copy without hiding natural mid-transition states or changing travel/timing.
2. Changed the single shared sector structure to heading→labelled figure→supporting copy/links. Desktop places the figure alongside the heading/copy column across two grid rows; mobile uses DOM order directly, no duplicates or CSS order inversion.
3. Renewed original-publisher photography research. A stronger industrial gear/fluid lead is documented for PH06. None of the four placements has explicit image/crop approval and complete intended-use clearance, so all remain schematic.

## Exact application/test changes

- `src/components/sections/industry-experience/sector-panel.tsx`: separate existing heading and supporting copy around the same figure; pass H3 reference.
- `src/components/sections/industry-experience/industry-media.tsx`: optional labelledBy prop names the figure from its canonical H3; media/loading/error/alt/caption logic unchanged.
- `src/components/sections/industry-experience/industries.css`: two-row desktop grid, canonical one-column mobile sequence, headline spacing and local panel-edge pseudo-element.
- `src/hooks/use-industry-scroll.ts`: observe new industry-copy wrapper alongside existing measurement targets; timeline/travel/lifecycle otherwise unchanged.
- `tests/industries.test.ts`: additional SSR uniqueness/reading-order check.
- `tests/e2e/phase-11b6.spec.ts`: focused eight-width/enlarged ordering, intermediate containment/boundary/resize, no-JS anchor tests.

Appended current-checkpoint notes to docs/DESIGN.md, ARCHITECTURE.md, CONTENT.md and IMPLEMENTATION.md. Created the ten requested reports, matched screenshots/video and evidence. No existing test removed, skipped or weakened; original resize polling and exact ratios/tolerances remain.

## Baseline and verification

Reviewed mandatory documents, current components/styles/media/hook/tests and prior screenshots. Before any production edit, captured fresh1440/1920 horizontal states,320/375/390/430 mobile views, reduced/enlarged layouts and a real scroll-through video. Paired local performance uses the same script/build-server conditions. Baseline45 unit tests passed; latest verified prior full suite146 passed. After refinement46 units and152 Playwright tests passed, plus lint/types/build. See REGRESSION_REPORT for all runs and the one newly written fractional-scroll test failure/correction.

Before/after source hashes distinguish this checkpoint from prior uncommitted work. Brand tokens, typography/font delivery, all content/media configuration, public assets, header/hero/logo, quotation transport, routes and indexing settings remain untouched. No dependencies added, new section, backend, inner page, deployment or Phase11C.2B implementation.
