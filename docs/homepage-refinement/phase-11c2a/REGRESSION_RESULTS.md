# Regression results

Phase 11C.2A · 18 November 2026

## Recorded before/after results

| Run | Executions | Failures | Evidence |
|---|---:|---:|---|
| Prior11C.1 full suite, unchanged original test | 140 | 1 | `../phase-11c1/evidence/playwright.log` |
| Prior11C.1 targeted repeat | 10 | 2 | `../phase-11c1/evidence/repeat-playwright.log` |
| Current unchanged test with trace, 10 per project | 20 | 0 | `evidence/before.log`, `evidence/before/` |
| Current unchanged test without trace, 20 per project | 40 | 0 | `evidence/before-untraced.log` |
| Corrected original test, 20 per project | 40 | 0 | `evidence/after.log` |
| New bidirectional/enlarged-text/motion regression, 20 per project | 40 | 0 | `evidence/after.log` |
| Related responsive/header/hero/introduction/refinement tests | 56 | 0 | `evidence/related.log` |
| Full suite against fresh production build | 142 | 0 | `evidence/full.log` |
| Unit/component tests | 45 (12 files) | 0 | `evidence/unit.log` |

Corrected stress run: **80/80 passed**, two workers, no retries, 2.6minutes. This includes40 executions of the affected original test and40 of the added regression, not80 executions of the original. Original test exercises7 widths per execution (280 observations); new regression exercises13 resize steps ×two text sizes ×two motion preferences =52 per execution (2,080 observations). Total stress-run responsive observations: **2,360**. These are correlated observations within test executions, not2,360 independently isolated tests.

The fresh baseline test repetitions passing does not erase the historical failures. Direct current probes reproduced the underlying immediate-read mismatch:2/48 production samples (JS enabled) and6/120 production samples (JS disabled); all168 settled production measurements correct in the primary probes. A separate transition-control comparison added120 no-JS production samples, all immediately/ultimately correct in all arms; the all-zero result did not establish transition causality. Static control:0/48 mismatches. No-JS probe's initial aborted callback attempt contributes no samples. See FAILURE_REPRODUCTION for methodology and limitations.

Lint (including final evidence scripts), strict TypeScript and production build all passed; `git diff --check` passed. Related56-case run completed in2.0minutes; fresh full142-case run in3.6minutes. All browser runs used two workers, no retries or skipped/quarantined tests. The full suite increased from140 to142 solely because one focused test runs in each of two projects.

## Commands

Build: `npm run build`. Lint: `npm run lint` (repeated after adding evidence scripts). Strict TypeScript: `npm run typecheck`. Unit suite: `npm test`.

All browser commands used `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright`; the path is local tooling, not a project configuration change.

```
npm run test:e2e -- tests/e2e/phase-11b.spec.ts --grep 'mobile editorial rhythm|introduction resize geometry' --repeat-each=20 --workers=2 --output=docs/homepage-refinement/phase-11c2a/evidence/after
npm run test:e2e -- tests/e2e/header.spec.ts tests/e2e/hero.spec.ts tests/e2e/introduction.spec.ts tests/e2e/refinement.spec.ts tests/e2e/phase-11b.spec.ts --workers=2 --trace=retain-on-failure --output=docs/homepage-refinement/phase-11c2a/evidence/related
npm run test:e2e -- --workers=2 --trace=retain-on-failure --output=docs/homepage-refinement/phase-11c2a/evidence/full
```

## Layout and accessibility scope

Original widths320/375/390/768/1024/1440/1920 retained. Added edge widths1023/1024/1025 and1279/1280 exercised ascending/descending;390 mobile baseline and1440 desktop endpoint;100%/200% root text, default/reduced motion, section scrolled into view. No document overflow in successful assertions. Related suites cover header menu/focus/Escape, navigation, hero attribution/fallback, Introduction layout/animation cleanup, and existing enlarged-text/form workflows.

Actual screenshots: `evidence/{desktop,mobile}-introduction-{100,200}-{1023,1024}.png`; initial viewport captures and traces also retained.200% root text is automation, **not native browser/text-only zoom certification**. Desktop/mobile projects are both Chromium. No Safari/Firefox/NVDA/physical iOS claim.

## Source preservation

`evidence/source-before.json`, `source-after.json` and `scope-verification.json` compare178 pre-existing application/public/test/root-configuration files. Only `tests/e2e/phase-11b.spec.ts` changed; no new application/public/test/config files. Reports/evidence are the only additional files. Existing unrelated uncommitted work remains intact. No changes to global Playwright configuration, dependencies, app source, public imagery or release settings.

## Assessment

Repetition, no-JS controls and exact geometry polling support resolution of the identified synchronization gap. Finite local executions cannot prove that no browser or environment can ever fail. A future persistent incorrect layout will continue to fail the unchanged target ratio/precision. Phase11C.1 manual accessibility, font/assets, contact/launch scope and performance gates remain separate outstanding dependencies.
