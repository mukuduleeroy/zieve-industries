# Phase 11A regression report

## Final executed results

| Command | Result | Evidence |
|---|---|---|
| `npm run lint` | Pass, exit 0, no warnings/errors | [lint.log](evidence/lint.log) |
| `npm run typecheck` | Pass, exit 0, strict TypeScript | [typecheck.log](evidence/typecheck.log) |
| `npm run build` | Pass, exit 0, all existing static/status routes retained | [build.log](evidence/build.log) |
| `npm test` | Pass, 11 files / **40 tests** | [unit.log](evidence/unit.log) |
| `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e -- --workers=2 --output=docs/homepage-refinement/phase-11a/evidence/final-test-results` | Pass, **122 tests**, 57.7s; no failures/skips reported | [playwright.log](evidence/playwright.log) |

Baseline was 38 unit /112 browser tests. Two unit cases and five browser cases in each project were added; existing tests were retained with the intentionally superseded destinations updated. Desktop Chrome and iPhone-emulated Chromium are the existing projects, not physical Safari.

## What the checks establish

The new cases measure document/text/control bounds at all seven widths and 100/200% root size; verify visible keyboard-operable desktop/mobile controls, no header overlap or expanded-dropdown document overflow, hero CTA/caption separation and useful accordion paragraph width; check generic section focus and sticky offsets from a status route, deep selection/refresh/history, footer contextual links, selector focus and normal-motion narrow reflow. All existing reduced-motion, header/modal, solution/industry, accordion/purpose, media-fallback, no-JavaScript, quotation and footer regressions pass. Canonical route/404 checks still execute.

Introduction/industry/purpose cleanup cases retain actual page-leave/return coverage via the preserved /solutions status page. Only expected discovery destinations/current-page semantics and their replacement assertions changed. No existing interaction assertion was dropped to obtain a pass. The seven-width new matrix gets 90 seconds to run multiple complete interactions; existing timeouts are unchanged.

## Failures discovered and corrected

The first run recorded 113 passes /7 failures in [playwright-initial.log](evidence/playwright-initial.log): superseded About Us expectations, direct-link focus timing and machine-contention timeouts in long multi-width checks. A follow-up recorded 120 passes /2 direct-focus failures in [playwright-focus-follow-up.log](evidence/playwright-focus-follow-up.log). Instrumentation confirmed fragment focus was attempted while computed visibility was hidden even after inert removal. The handoff now waits for visible committed content and cancels on new user interaction/cleanup. Two workers reduce contention without changing assertions. A later expanded-state run recorded 119 passes /3 failures in playwright-expanded-follow-up.log: layout scroll overflow persisted after a visual translate, and a pending deep-link handoff could interrupt programmatic selector focus. The panel now uses a physical layout offset, and anchor focus yields to selector/new focus. Keyboard-open geometry instrumentation confirmed the browser exposes updated bounds on the next rendering frame (1485px then 1440px after 16ms); the unchanged width assertion now polls for settled layout, matching the existing closed-state measurement. No width tolerance was relaxed. The remaining mobile-emulated failure exposed expanded innerWidth (1469px) versus stable layout clientWidth (1440px); containment now uses clientWidth. That intermediate 121-pass/1-failure run is retained in playwright-mobile-viewport-follow-up.log. A focused follow-up passed 10 cases before the final full run. Full-height visual review additionally found/fixed caption overlap and excessively narrow accordion text at enlarged size, with assertions added before the final pass.

## Normal-size visual/geometry comparison

Measurements use the same 900px viewport height, DPR 1, reduced motion and existing fallback font. Before/after top/menu/default full-page screenshots are at 390/768/1024/1440, including enlarged states. [Screenshot index](screenshots/INDEX.md). Individual screenshots may show naturally different anchor/focus states; no unapproved photography/type was substituted. The initial full-page captures do not explicitly preload every offscreen lazy image, so they are contextual comparison captures, not pixel-perfect screenshot baselines for below-fold media. Geometry and affected-component captures are the primary regression evidence.

| Width | Header height before → after | Hero height before → after | Other major section heights |
|---|---|---|---|
| 320 | 96 → 96 | 804.00 → 814.36 | Unchanged |
| 375 | 96 → 96 | 804.00 → 804.00 | Unchanged |
| 390 | 96 → 96 | 804.00 → 804.00 | Unchanged |
| 768 | 96 → 96 | 804.00 → 804.00 | Unchanged |
| 1024 | 96 → 96 | 804.00 → 804.00 | Unchanged |
| 1440 | 112 → 112 | 788.00 → 788.00 | Unchanged |
| 1920 | 112 → 112 | 788.00 → 788.00 | Unchanged |

All four requested visual widths retain default geometry. The 320px hero grows 10.36px for a clear wrapping footer; this is an intended accessibility adjustment. No default-size geometry change was measured in other sections. At enlarged sizes, increased section heights reflect visible wrapping instead of clipped/overflowing copy; the conditional accordion inset change avoids a near single-character column. Scroll state does not change header dimensions. No document overflow hiding is applied.

## Accessibility diagnostics and limits

Installed axe-core final default scans at 390/1440 retain the historical decorative number contrast flags (six/one nodes respectively), not a new essential-copy failure introduced here. [final-browser.json](evidence/final-browser.json) retains raw diagnostics. AUD-05/12 and other audit findings remain outside this checkpoint. Keyboard/inert/ARIA inspection is not a live screen-reader certification.

Native 200/400% browser UI zoom, text-only zoom and physical-device/assistive-technology testing were unavailable. Root-font proxy results and effective 720/360/320 CSS viewport reflow are explicitly separate. No WCAG, public launch or final visual approval is claimed.

One final browser invocation was not executed while automatic approval review reported a usage limit. After the user requested continuation, verification resumed; the final command above exited 0. This was an approval-service availability failure, not an unsafe-action determination.
