# Performance review

## Measurement conditions

Local production build, Next.js 16.4.6 / Node 26.13.0 / npm 11.20.0, macOS arm64 Apple M3 (8 CPUs, 16GiB RAM), headless Chromium 159.0.8154.6. Audit browser URL: http://127.0.0.1:3101. Three fresh-context runs per profile, cache disabled, DPR 1, normal motion. Desktop: 1440×900, no CPU/network throttling. Mobile simulation: 390×844, CDP CPU rate 4, latency 150ms, download 1.6Mbps, upload 750Kbps. These are browser emulation parameters, not a real mobile radio/device. Samples ran after screenshot/regression jobs ended to reduce contention; host load still is not controlled laboratory hardware.

[Raw navigation/resource/observer samples](evidence/performance.json), [reproducible harness](evidence/performance-audit.mjs), [run log](evidence/performance.log).

## Observed laboratory samples

| Metric | Desktop runs 1 / 2 / 3 | Mobile runs 1 / 2 / 3 |
|---|---|---|
| First Contentful Paint | 72 / 60 / 60ms | 596 / 596 / 596ms |
| Last observed LCP before scripted interaction | 72 / 60 / 60ms | 596 / 596 / 596ms |
| Navigation loadEventEnd | 94 / 71 / 83ms | 1697 / 1721 / 1695ms |
| Observed layout-shift entries, including full-page scroll | 0 / 0 / 0 | 0 / 0 / 0 |
| Initial long tasks >50ms | 0 / 0 / 0 | 2 / 2 / 2 |
| Long-task excess above 50ms, initial observation window | 0 / 0 / 0ms | 94 / 110 / 105ms |
| Maximum sampled interaction Event Timing duration | 56 / 56 / 48ms | Not emitted above observer threshold |

LCP median is 60ms desktop and 596ms mobile under these conditions. Desktop LCP candidate is the hero's second heading span; mobile is the SVG hero image. No layout-shift entries means an observed CLS contribution of zero in these sessions. It does not guarantee zero CLS on a deployed site or after webfonts/photos. The observers include normal hero/reveal loading and a scripted scroll through the page, not every possible user journey.

The Event Timing sample is a single desktop solution click. Mobile native select interaction emitted no qualifying entry: **do not report zero INP**. A browser-automation command round trip is recorded separately and is not input-to-next-paint. There is insufficient interaction coverage to certify INP, and no real-user p75 CWV/CrUX data exists. Long-task excess is a local diagnostic, **not a Lighthouse TBT score**. Early LCP also does not certify when all animated text becomes comfortably readable.

## Payload and rendering

Each initial normal-motion run recorded **286,761 encoded script bytes** (~280KiB), **908,887 decoded script bytes** (~888KiB), and **16,914 encoded stylesheet bytes**. Script-resource totals were unchanged after scripted traversal: the hero already activates animation code near initial load. Build-wide JS assets total 1,043,383 bytes raw / 333,025 bytes when individually gzipped, including other routes/runtime; this is not the homepage transfer total. Per-resource transfer bytes include protocol overhead; script encoded body sizes are the comparison above.

Source inspection confirms two animation engines plus the validation/form stack. No module attribution/coverage profiler was run, so the report does not guess which library dominates payload. All business copy is server rendered and the form is progressively hydrated. No page errors were observed during capture or measurement. This is not a full React hydration trace or memory-leak certification.

Current visuals are very small SVG schematics. Next Image reserves dimensions for the original JPEG logo; editorial frames reserve aspect ratios and load lower media lazily. Full responsive photography and complete WOFF2 fonts are absent. CDP confirms Georgia-Bold in the hero, so current results include **no custom-font loading cost**. These unusually quick local placeholder paints must not be extrapolated to final images/fonts or production networks.

## Lighthouse and field-data limits

`command -v lighthouse` returned no installed CLI; no Lighthouse package was found in the existing tree. No dependency/download was added. A Lighthouse score, SI, official TBT and Lighthouse accessibility/SEO scores are therefore **not available**. A hosted production environment and real users are absent, so field CWV are also **not available**. Do not invent either result.

## Opportunities, not implemented

AUD-10: agree image/font/JS budgets; inspect build chunks and runtime coverage before considering client-boundary or motion changes. Preserve semantics and no-JavaScript readability. Repeat controlled Lighthouse and device measurements with final assets, normal/reduced motion, interactions and production hosting. AUD-03/04 asset integration must include an explicit performance and CLS retest. No current performance P0 was established, and no production performance approval is justified by this local baseline.
