# Regression verification

Phase 11B.6 · 18 November 2026 · no deployment.

## Exact results

|Check|Result|Evidence|
|---|---|---|
|Fresh baseline units|45 passed,12 files|evidence/baseline-unit.log|
|Build / strict TypeScript / ESLint|Passed|evidence/build.log,typecheck.log,lint.log,lint-final.log|
|Final units|46 passed,12 files|evidence/unit.log|
|First focused run|17 passed,1 failed (new fractional-scroll expectation)|evidence/targeted.log and targeted/trace.zip|
|Corrected focused suite|18 passed,0 failed|evidence/targeted-final.log|
|Prior resize assertion,10 repetitions per project|20 passed,0 failed|evidence/resize-repeat.log|
|Full final Playwright suite|152 passed,0 failed,2.6minutes|evidence/full.log and full/|
|Whole-page/default and prepared-draft axe|6 scans,0 violations; one incomplete contrast rule per scan|evidence/after-axe.json|
|Horizontal Industries axe|4 states,0 violations;0/1/1/1 incomplete checks|evidence/horizontal-axe.json|
|Matched visual/geometry inventory|18 before and18 after records; after overflow0 in every record; desktop travel unchanged|evidence/before-visual.json,after-visual.json|

Desktop/mobile project names both use installed Chromium; mobile is iPhone emulation. Two workers, default retry/timeouts unchanged. Browser command prefix `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e -- ...`; source browser path is local tooling, not a dependency/configuration change.

## Failure retained, investigated and corrected

The first new continuous-progress test expected−2116.8px at fraction0.49 of4320px, but observed−2116px. Trace records scene top2966.515625/header112. Native scroll and ScrollTrigger's installed position parser round to integer pixels (`node_modules/gsap/ScrollTrigger.js`, _parsePosition returns Math.round(value)). The requested fractional position was not the actual representable travel.

Corrected only the **new test's input/expected coordinates**: round the start and travel distance explicitly, scroll to that attainable coordinate, then assert the exact measured transform using the same precision. No tolerance increase, arbitrary delay, new timeout, snap or application correction. All intermediate fractions, forward/reverse and resize observations remain. Initial log/error context/trace retained; corrected focused/full results are separate logs. Existing tests are unchanged.

## Coverage

New tests verify every industry renders once in heading/media/copy order, figure owns its H3 label,100%/200% root text, all eight widths, narrow mobile geometry, no clipping/overflow, panel containment at intermediate0.16/0.49/0.50/0.51 and other progress positions,1440→1920→1440 resize travel, visible boundary location, and no-JS native industry anchors.

Existing tests retain reverse travel, stage release, source-image completion/failures, pointer link activation, keyboard flow/focus, reduced-motion/resize cleanup, no-JS content, all headings/claims, header/navigation, quotation validation/copy/long-mailto workflow and responsive reflow. Previous intermittent Introduction resize assertion remains condition-based with original ratio/tolerance and passed20 repeated executions plus the full suite; it is not a release blocker reopened by the new test's unrelated fractional expectation.

Commands: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`; focused `tests/e2e/phase-11b6.spec.ts tests/e2e/industries.spec.ts --workers=2 --trace=retain-on-failure`; resize `tests/e2e/phase-11b.spec.ts --grep 'mobile editorial rhythm' --repeat-each=10 --workers=2`; full `--workers=2 --trace=retain-on-failure`.

No native Safari/Firefox, VoiceOver/NVDA, physical iOS or native zoom certification. No field-performance or launch approval inferred from a green suite.
