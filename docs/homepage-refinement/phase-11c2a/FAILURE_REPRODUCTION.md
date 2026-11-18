# Failure reproduction

Phase 11C.2A · 18 November 2026

## Exact original failure

`tests/e2e/phase-11b.spec.ts`, test **mobile editorial rhythm preserves photographs and hero credit, including reduced motion**, original lines86–87. After `page.setViewportSize({width,height:900})`, the test immediately read `.introduction-image-mask` bounds and asserted `height / width` is close to `width < 1024 ? 3/4 : 6/5`, precision1 (absolute difference strictly less than0.05).

At **1024 × 900 CSS pixels**, expected **1.2**, received **0.7499693539819393** (difference0.45003064601806064). Phase11C.1 full suite:139 passed/1 failed. Ten unchanged repetitions:8 passed/2 failed, one in each configured project. See [prior full log](../phase-11c1/evidence/playwright.log), [prior repeat log](../phase-11c1/evidence/repeat-playwright.log), [prior independent probe](../phase-11c1/evidence/breakpoint-probe.json). Current exact measurements also locate the stale read at1024px; old failure log alone did not print the loop width.

## Current controlled reproduction

Unchanged test, existing production build, default isolation/retries/timeouts; two workers, both configured projects. `desktop` uses Desktop Chrome and `mobile` uses iPhone13 emulation **in Chromium**, not Safari/WebKit. No fixtures use remote stock URLs, backend requests or newly installed fonts. Headless Chromium159.0.8154.6; local macOS ARM64. Browser path `/private/tmp/zieve-playwright`; initial reproduction ran before editing tests.

```
PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e -- tests/e2e/phase-11b.spec.ts --grep 'mobile editorial rhythm' --repeat-each=10 --workers=2 --trace=on --output=docs/homepage-refinement/phase-11c2a/evidence/before
PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e -- tests/e2e/phase-11b.spec.ts --grep 'mobile editorial rhythm' --repeat-each=20 --workers=2 --output=docs/homepage-refinement/phase-11c2a/evidence/before-untraced
```

**20/20 traced and40/40 untraced test executions passed.** These passes are recorded, not substituted for prior failures or interpreted as proof of stability. Tracing changes timing. The race was reproduced separately in direct geometry probes on the same unchanged application, including with application JavaScript disabled.

## Measurement experiments

`evidence/investigate.mjs` runs eight isolated contexts: desktop/mobile × production/static CSS control ×100%/200% root text size. Static control contains the actual Introduction stylesheet, a viewport meta tag and representative markup, with no application components. Each context resizes through390,768,1023,1024,1025,1279,1280,1440,1920,1024,1023,390. It records geometry immediately and after two animation frames (diagnostic comparison, not the fix), matchMedia, CSS aspectRatio, font status, root size, scroll position, header variable, transitions, animation and page errors. Traces/snapshots and1024px screenshots are retained.

**96 resize samples**: production100% had two immediate wrong ratios (one desktop1023px descending, one mobile1024px ascending); all96 correct after frame settling. Static control did not reproduce in48 samples; that alone does not establish an application cause.

`evidence/investigate-nojs.mjs` uses the full production HTML/CSS with **application JavaScript disabled**, five cycles ×12 widths ×two projects =**120 samples**. It records immediate geometry then polls for the same original ratio/precision. **Six stale immediate ratios** (desktop2/mobile4); all120 eventually correct. No header height variable, React hydration, component state callbacks or GSAP ran. The first attempted no-JS probe used an animation-frame callback, which does not execute with page JS disabled; it was stopped and replaced with external condition polling. This aborted diagnostic is not a completed sample or test pass.

Example with JS disabled: desktop1024px, `innerWidth=1024`, matchMedia64rem=true, immediate computed aspectRatio1.33333/1 and ratio0.7499895533; later computed aspectRatio5/6 and ratio1.1999671579. Thus acknowledging viewport dimensions/matchMedia does not guarantee the next immediate geometry read reflects updated responsive styles.

## Evidence access

- [Current measurement JSON](evidence/investigation.json), [no-JS measurements](evidence/nojs-investigation.json).
- [Traced baseline log](evidence/before.log), [untraced baseline log](evidence/before-untraced.log).
- `evidence/before/**/trace.zip` and `evidence/*-trace.zip`: open with `npx playwright show-trace <path>`; traces include DOM snapshots/screenshots.
- `evidence/*-production-*-1024.png`: native browser viewport captures at normal/enlarged text; screenshots show actual current layout, not mockups. Geometric source-of-truth is JSON/traces, because a screenshot may itself wait until the race has passed.

No retries, skips or timeout increases were added. A later, separate diagnostic-only transition control used a mask-specific override in one private browser context arm; it was never applied to release tests or application source. Its120 samples all passed in every arm and did not isolate a transition contribution; see ROOT_CAUSE_ANALYSIS.
