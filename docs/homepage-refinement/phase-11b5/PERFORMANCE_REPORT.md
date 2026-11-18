# Local performance and animation report

Phase 11B.5 · 18 November 2026 · no field-performance or deployment claim.

## Method

Six serial samples after regression/scanner browsers completed: three desktop1440×1000 and three mobile390×844, DPR1, fresh cache-disabled contexts against local production Next.js on127.0.0.1:3102. Headless Chromium159.0.8154.6/macOS ARM64. Desktop unthrottled; mobile CDP4×CPU,150ms latency,1.6Mbps down/750Kbps up. Next image optimizer was warm from QA. Script/raw evidence: `evidence/performance.mjs`, `performance-final.json`, `performance.log`.

Observers record LCP entries, non-input layout shifts, Event Timing and long tasks through startup, one Solutions switch and a full vertical traversal (including the sticky scene). Resource transfer sums exclude the document and are not exact total on-wire page cost. Not Lighthouse, real-user monitoring, a cold CDN/origin or physical device.

| Profile | Observed initial LCP range / median | Observed non-input shift sum | Initial resource transfer | Initial / traversed image transfer |
|---|---|---|---|---|
|Desktop,3 runs|44–48ms /44ms|0 in all3|454,360bytes|134,400 /253,494bytes|
|Throttled mobile emulation,3 runs|540–552ms /548ms|0 in all3|372,606bytes|52,646 /228,808bytes|

Desktop LCP candidate was the hero photograph; mobile's reported candidate was the retained schematic layer. Very low loopback figures and that candidate limitation must not be used as photographic readiness or production LCP claims. Photographic loading/completion is verified separately in actual panel/hero tests and final screenshots. Simple shift sums do not implement standard CLS session-window scoring; these samples observed no qualifying shifts, not a universal zero-CLS guarantee. The known tablet header startup observation from11C.1 remains an open dependency, not something this redesign claims to fix.

## Payload and main-thread observations

- Initial encoded JavaScript resource bodies: **289,464bytes** in both profiles. Prior11C.1 local inventory recorded288,392: difference1,072bytes. Desktop height here1000 versus earlier900, and measurements are not a paired performance experiment; no speedup or causal LCP comparison is claimed.
- Entire `.next/static` inventory: JS1,052,366bytes /335,728bytes locally gzip-compressed; CSS53,365 /10,036bytes. This includes multiple route/build assets, not just initial homepage delivery; actual host compression is unverified.
- Initial/traversed image payloads match the prior inventory for these resource selections. Public source assets/media configuration are unchanged; no new photo download or larger quality setting.
- No custom FontFace entries; no approved Noto webfonts installed. Georgia fallback remains; these results must be rerun after any approved font integration.
- Desktop traversals: no observed >50ms long tasks. Mobile: two per run, maximum58–60ms. This is a small local sample, not a final-device budget or trace-level attribution.
- Maximum captured desktop Event Timing duration56ms; no mobile entry captured at observer threshold. These values and automationRoundTripMs **are not INP**. No production field INP measured.
- No pageerror events in the six samples.

## Measured corrections and architecture cost

The actual QA issue was lazy imagery remaining unrequested in transformed panels; bounded current/next warming near the stage fixes delivery without making every homepage image eager. A fit-key guard prevents repeated enable/revert work when content cannot fit. One GSAP transform/progress timeline owns the scene; no per-frame React render, global wheel handler, extra animation package or new overlapping per-image parallax. Frame callbacks coalesce resize/layout work; scroll updates do not repeatedly measure geometry. Scoped cleanup reverts context, observers, listeners and loading hints.

Reproduction: build, start the local production preview, then run `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright node docs/homepage-refinement/phase-11b5/evidence/performance.mjs final`. CPU/network emulation and warm optimizer are explicitly part of this method.

## Remaining performance gates

Final approved fonts/assets, native Safari/tablet startup, real network/device traces, long-session lifecycle profiling and final-host LCP/CLS/INP budgets remain separate release work. No deployment, speculative bundle rewrite or unrelated optimization performed. Observed local results support the scoped implementation; public launch remains NO-GO.
