# Performance baseline and final verification plan

Phase 11C.1 · 18 November 2026 · readiness preparation only.

## Measurement scope

Local **production build**, not a deployed environment. Node v26.13.0, macOS ARM64/Apple M3, 16GiB RAM; headless Chromium 159.0.8154.6, DPR1. Three fresh contexts per profile, browser cache disabled. Desktop unthrottled; mobile uses CDP 4× CPU, 150ms latency, 1.6Mbps down / 750Kbps up. Local Next image optimizer was already warmed by QA; no cold edge/origin, TLS, CDN or field-user conditions were tested. Measurements taken serially after other browser jobs.

Reproduce using `evidence/performance.mjs current` with the production server at 127.0.0.1:3102 and the installed Playwright browser path. It observes PerformanceObserver entries during startup, switches Solutions to chemicals, then traverses the page. [Raw six-run evidence](evidence/performance-current.json). Transfer includes resource-level browser transferSize; it excludes document bytes and is not total on-wire page cost. Full traversal does not activate every hidden solution panel.

| Profile (3 runs) | Observed initial LCP ms, range / median | Sum of non-input layout shifts, all traversal | Initial resource transfer bytes | Initial image transfer bytes | Traversed image transfer bytes |
|---|---|---|---|---|---|
| 1440 × 900, unthrottled desktop | 56–64 / 60 | 0 | 453008 | 134400 | 253494 |
| 390 × 844, throttled mobile emulation | 604–640 / 608 | 0 | 371254 | 52646 | 228808 |

Desktop LCP candidate was the photographic hero image; mobile's reported LCP candidate was the retained schematic layer. The mobile photograph still requested successfully (12,316 encoded bytes at 640px, versus desktop 24,646 at 1920px), but the candidate attribution means the very low local LCP values **must not be presented as final photographic readiness or real-world LCP**. Recheck photo decode/paint and LCP element under production conditions after final assets/fonts. Initial and final observation snapshots are retained separately.

Initial JavaScript resource encoded bodies: **288,392 bytes**, ten scripts, both profiles. Aggregate `.next/static` output is **1,049,620 JS bytes / 334,656 gzip bytes** and **50,918 CSS bytes / 9,665 gzip bytes**; this includes route/build assets and is not the initial route bundle. Compression in this inventory is a local gzip calculation, not evidence of final server compression. No font requests/custom faces occurred.

Desktop traversals observed 0–1 long tasks, maximum 62ms. Throttled mobile observed two per run, maximum 105–115ms. Desktop maximum captured Event Timing durations were 56–104ms; mobile supplied no captured entries above the configured observer threshold. **Neither these maxima nor automationRoundTripMs is INP**; no production field INP, CrUX or RUM exists here. Absence of mobile entries is not zero INP. No pageerror events recorded in these six runs.

## Tablet startup observation

Separate reduced-motion startup inventory captured non-input shifts **0.007976 at 768px** and **0.007460 at 1024px**, versus none at 390/1440 in that inventory. Sources include hero editorial/footer geometry (footer moved 16px); measured root `--header-height` updates to 96px at tablet widths while hero CSS initially falls back to 112px. This is evidence consistent with header-height initialization, not a complete causal proof. These small shifts are below the common 0.1 CLS threshold, but must not be hidden behind desktop/mobile zero results. Full CLS session-window scoring is not computed by this simple sum-of-shifts harness; zero sum implies zero observed shifts only during that run.

## Local image source payload inventory

Bytes below describe optimized local source derivatives, not negotiated Next.js response variants. Source originals/provenance remain in Phase 11A.5 records.

| Public local derivative | Bytes |
|---|---|
| `images/industrial/company/industrial-component-detail.webp` | 306,692 |
| `images/industrial/hero/sunrise-excavator-desktop.webp` | 71,050 |
| `images/industrial/hero/sunrise-excavator-mobile-focus.webp` | 37,514 |
| `images/industrial/industries/grain-handling-silos.webp` | 195,384 |
| `images/industrial/industries/heavy-manufacturing-machined-shaft.webp` | 138,798 |
| `images/industrial/industries/open-pit-mineral-handling.webp` | 638,262 |
| `images/industrial/solutions/chemical-processing-infrastructure.webp` | 415,218 |
| `images/industrial/solutions/neutral-steel-fasteners.webp` | 126,394 |

## Follow-up gates (no optimization performed)

| ID / priority | Current status / evidence | Owner / dependency | Proposed resolution | Risk | Required verification |
|---|---|---|---|---|---|
| M01 / P1 | Local samples only; no final-host field data or agreed budgets | Performance engineer + release owner after final fonts/assets/host approval | Establish final-device lab runs, cold/warm requests and a post-launch field plan. Use proposed good field thresholds LCP ≤2.5s, CLS ≤0.1, INP ≤200ms at 75th percentile; owner confirms budgets | Medium: misleading local extrapolation | Record real network/device, candidate, decode/paint, field sample sufficiency and route distribution; do not claim prelaunch field pass |
| M02 / P2 | Tablet shift measured in separate startup inventory | Frontend/performance owner in separately approved work | Repeat cold startup 768/1024 with screenshots and header-height timeline; isolate initialization cause before proposing a fix | Low–medium: intentional header behaviour could regress | >=5 runs/profile, reduced/default motion, header dimensions, menu, anchor offsets and CLS source/session-window analysis |
| M03 / P2 | Mobile LCP attributed to schematic; desktop photo candidate; successful photo response recorded | Performance QA | Correlate filmstrip, image decode, visibility and LCP candidate after fonts/assets freeze | Medium: wrong visual milestone | Actual photo complete/naturalWidth/currentSrc, visual filmstrip, no-error fallback, cold optimizer and final host tests |
| M04 / P2 | Two mobile >50ms tasks; 288,392 initial encoded JS bytes measured; no approved regression budget | Frontend/performance owner | Profile startup and interactions before identifying costly work; compare to this baseline, do not split/rewrite speculatively | Medium: unmeasured optimization harms interaction | Performance trace task stacks, input delays, initial vs deferred chunks, long-task count/duration, CPU/device conditions |
| M05 / P2 | Existing motion contexts/cleanup and reduced-motion tests present; no long-session memory profile | Frontend QA | Repeated navigation, resize, solution switching, accordion/form/menu and runtime preference toggle; inspect GSAP contexts, duplicate listeners and retained nodes | Medium: lifecycle leak may be session-specific | Ten navigation/unmount cycles on approved environment; focus, listeners, timelines and heap/CPU stabilization |
| M06 / P1 | No shipped webfonts; new font network/metrics cost unknown | Brand/font approval then performance QA | Re-baseline after approved fonts, preserve local delivery plan and measure swap/CLS | Medium: typography changes invalidate baseline | Font requests, cache, subset coverage, real faces, fallback/swap filmstrip, reflow matrix |

Threshold reference: [Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds). Lab samples and simple observers do not establish a 75th-percentile field result. No speculative performance edits were made.
