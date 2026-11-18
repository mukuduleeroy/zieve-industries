# Paired local performance and lifecycle review

Phase 11B.6 · 18 November2026 · no production field claim.

## Method

Same script/server/browser/settings before and after; three fresh cache-disabled contexts per profile, each phase run serially after other browser QA completed. Local production Next server127.0.0.1:3102, warm image optimizer, Chromium159.0.8154.6, macOS ARM64, DPR1. Desktop1440×1000 unthrottled; narrow390×844 CDP4×CPU,150ms latency,1.6Mbps down/750Kbps up. Not physical mobile hardware, Lighthouse, cold CDN, field users or a final-font benchmark.

Observers cover startup, one Solutions change and full native vertical traversal through the Industries sequence. Resource sums exclude the document. Raw runs: `performance-before.json`, `performance-after.json`; source `performance.mjs` and summary `performance-summary.json`. No concurrent regression/scanner browser workload during measurements.

|Profile,3 before +3 after|Before initial LCP range / median|After initial LCP range / median|Observed non-input shift sum before / after|
|---|---|---|---|
|1440×1000 desktop|60–68ms /60ms|56–148ms /60ms|0 /0|
|390×844,4×CPU/network emulation|584–604ms /596ms|628–632ms /632ms|0 /0|

Desktop median unchanged60ms, with one after sample148ms. Narrow-view median increased596→632ms (+36ms); these small local samples do not establish causal slowdown or a production regression. LCP attribution is the hero photo on desktop and the retained schematic layer in narrow-view runs, so these values do not establish final photographic readiness. Simple shift sums are not a full CLS session-window implementation; no qualifying shifts were observed in these samples. The previously recorded tablet/header startup shift is not declared fixed by a desktop/mobile-only benchmark.

## Payload and work

Initial encoded JS resource bodies289,464→289,527bytes (+63bytes). Initial resource transfers454,360→454,584bytes desktop and372,606→372,830bytes narrow (+224bytes each). Image transfer unchanged in both phases: desktop134,400 initially/253,494 traversed; narrow52,646/228,808. No new photo file, responsive quality setting or priority was introduced. FontFace inventory empty; no font acquisition, and Georgia remains the temporary strategy.

Desktop observed0 >50ms long tasks in all before/after samples. Narrow runs observed two each; maximum before104–110ms and after104–110ms. No pageerrors in any of the12 runs. Captured Event Timing entries/automationRoundTripMs are not INP; no production INP measured. Aggregate `.next/static` JS/CSS byte/gzip inventories are retained in performance-summary.json; they include multiple route/build assets and are not initial homepage bundle size or proof of final-host compression.

## Lifecycle / measured scope

The GSAP timeline, scoped context, start/end functions, travel, native scrolling, pointer-aware keyboard fallback, fit cache, current/next media warming and cleanup are unchanged. Only the new supporting-copy wrapper joins the existing ResizeObserver targets; callbacks remain coalesced by requestAnimationFrame, with no new per-frame React state or geometry work. The boundary pseudo-element is static and absolute, preserving panel widths. Matched geometry confirms4320/5760px travel at1440/1920 before and after. Reversal, release, responsive recalculation and native image completion pass browser checks.

No speculative optimization or new animation effect. Final native-device traces, final-font reflow, tablet startup, real-network/host budgets and long-session memory/AT verification remain release gates. Local successful tests and low loopback timing are not a production performance certification.
