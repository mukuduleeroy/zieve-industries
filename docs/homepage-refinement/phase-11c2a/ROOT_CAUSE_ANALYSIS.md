# Root cause analysis

Phase 11C.2A · 18 November 2026

## Classification: B — test synchronization defect

The test treated viewport-change acknowledgement as a responsive-layout completion barrier (including completion of any short style transition). Its one-shot numeric assertion has no retry semantics. Chromium can expose the new `innerWidth` and matching media query while the immediately queried element still reports the previous CSS aspect ratio and bounds. A later rendering update supplies the expected geometry. The requirement is the **rendered image ratio**, so that is the completion condition the test must observe.

Evidence is stronger than a passing rerun: the original failed in Phase11C.1, current direct probes captured the same stale state, and no-JavaScript production probes reproduced it without application hydration, header ResizeObserver or GSAP. Every settled sample retained the intended ratio. This supports correcting test synchronization; no persistent application defect was found in the measured states. It does not certify all browsers or make the separate known tablet startup shift disappear.

| Investigated factor | Evidence / conclusion |
|---|---|
| Viewport/layout pipeline | New viewport and matchMedia with old computed aspectRatio and bounds captured together; settled geometry correct. Core cause of the unreliable assertion |
| Header breakpoints | Header changes navigation at80rem; image CSS switches at64rem. Regression crosses1023/1024/1025 and1279/1280 in both directions. No-JS reproduction has no measured header variable updates, excluding the header observer as a necessary cause |
| React/hydration/asynchronous state | Production measurements occur after networkidle/readyState complete. No-JS reproduction excludes these callbacks as necessary causes; no page errors captured |
| Fonts | Fonts status loaded, custom face count0; current Georgia fallback, no webfont acquisition. No pending font swap explains the stale aspectRatio |
| CSS transitions | Mask has no authored aspect-ratio transition; existing reduced-motion global duration is0.01ms. Header transitions affect colour/shadow/indicator transforms, not mask aspect ratio. Static CSS alone did not reproduce in48 samples; full no-JS HTML did. A later120-sample control comparing reduced/default motion and a mask-only transition override produced no stale reads or captured active transitions in any arm; this did not isolate whether the tiny duration contributes. No claim is made about the exact Chromium internal scheduling or transition submechanism |
| Animation lifecycle | Failing original test already requests reduced motion. No-JS reproduces without GSAP. Added coverage also exercises default motion without globally disabling animation |
| Scroll | Immediate production stale samples captured atscrollY0; new regression repeatedly scrolls Introduction into view across both resize directions. Scroll not required for reproduction |
| Test isolation | New context per probe and Playwright test; no shared mocked state, changed global config, retries or reused test server. Failure reproduced without cross-test application state |
| Environment/browser | Two configured Chromium profiles reproduce; tracing/repetition may change frequency. This is a synchronization gap exposed by ordinary browser timing, not evidence of a failing host. Native Safari/Firefox and physical iOS are not tested or claimed |

## Correct completion condition

Poll the image's actual `boundingBox()` ratio with Playwright `expect.poll`, keeping exactly the existing expected ratios and `toBeCloseTo(...,1)` precision. A null box fails to meet the numeric condition. The normal assertion deadline remains unchanged. This accepts ordinary render settling but still fails a persistent wrong ratio, missing box or absent element. No fixed frame count or sleep is the production test fix.

Viewport changes may have intermediate layouts; the original test's intent is correct final responsive geometry rather than zero intermediate browser work. Independent overflow, media attribution/caption, scroll-indicator and reduced-motion assertions remain. New coverage broadens breakpoint/reflow checks without changing the approved design.

## Additional transition control

`evidence/transition-control.mjs` / `transition-control.json` compare three no-JS production-page conditions in both profiles,20 rapid1023↔1024 resizes per arm: existing reduced motion, default motion, and reduced motion with a **diagnostic-context-only** mask transition override. All120 immediate and settled samples passed; no active CSS transitions were captured. That all-zero comparison is inconclusive about the short transition contribution, not proof of absence. No transition override was added to production source or release tests. The root-cause classification concerns the demonstrated missing synchronization condition, rather than asserting a specific browser-engine defect.

## Remaining limits

Finite repetitions cannot prove absence of every intermittent failure. All observations are local Chromium; project named mobile is emulation, not a physical device/WebKit.200% root text sizing is a useful existing automation proxy, not native browser or Firefox text-only zoom. Prior11C.1 manual accessibility, fonts, asset, contact, metadata and performance dependencies remain open.
