# Test and regression report

All commands below were executed during Phase 10 against unchanged production code and existing test files. Earlier reported totals were not reused as evidence. Full current suite is **112**, rather than the earlier 110 plus a separate footer follow-up: the added footer case now runs in both projects.

| Command | Exit/result | Evidence |
|---|---|---|
| `npm run lint` | 0; no warnings/errors on baseline | [lint.log](evidence/lint.log) |
| `npm run typecheck` | 0; strict checks pass | [typecheck.log](evidence/typecheck.log) |
| `npm test` | 0; 10 files / 38 tests passed | [unit.log](evidence/unit.log) |
| `npm run build` | 0; static production build and route generation pass | [build.log](evidence/build.log) |
| `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e -- --output=docs/homepage-audit/evidence/regression-results` | 0; **112 passed**, 57.9s, 4 workers; no failed or skipped tests reported | [playwright.log](evidence/playwright.log) |

An additional final lint invocation, after adding audit-only evidence harnesses, also exited 0 without warnings/errors and is recorded in [lint-final.log](evidence/lint-final.log). Browser tooling uses existing dependencies and locally installed Chromium. The standard regression configuration starts production port 3100; separate audit server uses 3101. No tests, assertions, configuration or package files were changed to obtain these results. Build artefacts and normal TypeScript caches are generated outputs, not production-source changes.

## Existing regression scope

Header disclosure/modal/resize/routes/scroll dimensions; hero content/CTA/layout/fallback/no-JavaScript; introduction layout/media fallback/reduced motion; all solution choices/rapid selection/inert states; four sectors/media/reveal/parallax; all operating pillars/keyboard/rapid interaction; purpose content/provenance/geometry; quote schema/errors/draft/encoding/long-summary/clipboard/anchors/no-JavaScript; footer contacts/routes/year/top-return/geometry/focus/reduced motion. Read individual tests for exact conditions. These are Chromium tests; the iPhone project remains emulated Chromium.

## Audit-only checks

- [browser-audit.mjs](evidence/browser-audit.mjs): six viewports, full/section/state screenshots, computed geometry and installed axe scans. Eight axe scans retain **nonzero contrast flags** and manual-review items; these are reported, not suppressed. The initial desktop dropdown captures caught a transition frame and were discarded; [settled screenshot](screenshots/1440-navigation-open-stable.png) is authoritative.
- [interaction-audit.mjs](evidence/interaction-audit.mjs): keyboard skip/dropdown/modal, solution status/inertness, accordion focus, quote anchor/error association and root-font enlargement.
- [follow-up.mjs](evidence/follow-up.mjs): settled dropdown, CDP actual font and precise enlarged-text overflow evidence.
- [performance-audit.mjs](evidence/performance-audit.mjs): six cold-context cache-disabled samples and build/resource diagnostics. No Lighthouse was available; no score is claimed.

All browser audit harnesses completed successfully. Audit checks are diagnostic observations, not additions to the official regression test count. They found problems that the passing baseline suite does not assert, notably enlarged-text robustness and small-desktop label alignment.

## Integrity and limitations

Before/after SHA-256 records cover src, public, tests, project configuration and existing top-level documentation. [source-integrity.json](evidence/source-integrity.json) records the result. No application fixes were attempted. Automated test pass is not visual completion, native-device certification, accessibility conformance or confirmation of an email being sent.
