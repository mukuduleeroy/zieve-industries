# Phase 11A.5 — final PH01 integration

**R1 Sunrise Excavator is installed. R2 is rejected for this checkpoint.** Updated 2026-11-17. This PH01-only update supersedes the earlier hero hold; the other six configured photographs and four held placements are unchanged.

## Local before/after measurement

Fresh cache-disabled Chromium contexts; two desktop samples (1440×900, DPR1, unthrottled) and two mobile samples (390×844, DPR1, 4× CPU, 150ms latency, 1.6Mbps down/750Kbps up). Same harness and local production server before/after; final timings run after other browser jobs completed. Server-side optimizer caches are warm after QA. These are local laboratory samples, not field CWV, native-device performance, Lighthouse scores or statistical evidence. Image source-body sizes are not total website transfer.

| Profile | State | Median initial LCP ms | Median initial subresource transfer bytes | Full traversal CLS samples |
|---|---|---:|---:|---|
| Desktop | before | 128 | 427,884 | 0.00000, 0.00000 |
| Desktop | after | 94 | 452,897 | 0.00000, 0.00000 |
| Mobile | before | 600 | 358,460 | 0.00000, 0.00000 |
| Mobile | after | 596 | 371,143 | 0.00000, 0.00000 |

The before state already includes the six earlier photographs and uses a schematic hero. The after state adds R1. Do not confuse this comparison with the earlier all-schematic baseline below. LCP candidate/paint details and request timings are in the raw before/after JSON. No causal loading improvement is claimed from two samples.

| Asset | Dimensions | Bytes | Native crop (left, top, width, height) |
|---|---|---:|---|
| `public/images/industrial/hero/sunrise-excavator-desktop.webp` | 2600 × 1463 | 71,050 | 0, 650, 2600, 1463 |
| `public/images/industrial/hero/sunrise-excavator-mobile-focus.webp` | 1000 × 1591 | 37,514 | 1350, 0, 1100, 1750 |

## Actual hero responsive delivery

| Viewport | Optimized photo URL | Encoded bytes | Request duration ms |
|---|---|---:|---:|
| 390 | /_next/image?url=%2Fimages%2Findustrial%2Fhero%2Fsunrise-excavator-mobile-focus.webp&w=640&q=75 | 12,316 | 107.2 |
| 768 | /_next/image?url=%2Fimages%2Findustrial%2Fhero%2Fsunrise-excavator-desktop.webp&w=828&q=75 | 8,004 | 32.1 |
| 1024 | /_next/image?url=%2Fimages%2Findustrial%2Fhero%2Fsunrise-excavator-desktop.webp&w=1080&q=75 | 11,148 | 15.1 |
| 1440 | /_next/image?url=%2Fimages%2Findustrial%2Fhero%2Fsunrise-excavator-desktop.webp&w=1920&q=75 | 24,646 | 22.7 |
| 1920 | /_next/image?url=%2Fimages%2Findustrial%2Fhero%2Fsunrise-excavator-desktop.webp&w=1920&q=75 | 24,646 | 7.9 |

These five-width resource entries come from responsive screenshot sessions, not the isolated throttled timing benchmark. Reserved hero geometry and source art direction avoid an image-driven resize. Small existing tablet startup hero/header shifts remain documented in responsive QA; zero CLS on every device is not claimed. Next Image and existing loading behavior were reused without changes to header/motion/layout.

---

## Earlier six-photo checkpoint — historical

The records below remain relevant to the other placements. Any PH01 hold or R2 proposal below is superseded by the final R1 decision above.

# Photography performance report

Updated 2026-11-17. Conditional Stage B integration only. Hero remains schematic until final visual approval.

## Method and limits

Headless Chromium on the local Next production server, fresh browser contexts and disabled browser cache, DPR 1. Two desktop samples at 1440×900 without throttling and two mobile samples at 390×844 with 4× CPU throttling, 150ms latency, 1.6Mbps down/750Kbps up. Same measurement harness before and after. The after run was repeated without concurrent browser diagnostics. Local server image-optimizer caches were warm from verification; this does not measure first-ever server-side encoding, remote hosting or field CWV. Two samples are descriptive, not statistical evidence of an improvement.

Initial values are taken after network idle and 2.5s; full traversal switches to chemicals, scrolls through all sections and waits. It does not visit every solution. The separate delivered-images inventory also visits spares. Native source bytes and review-document bytes are not website transfer bytes.

| Profile | Build | Median observed initial LCP, ms | Median initial subresource transfer, bytes | Median traversed image encoded bodies, bytes | Observed full-traversal CLS |
|---|---|---:|---:|---:|---|
| Desktop | before | 106 | 318,362 | 3,985 | 0.00000, 0.00000 |
| Desktop | after | 100 | 427,884 | 226,748 | 0.00000, 0.00000 |
| Mobile | before | 602 | 317,248 | 3,985 | 0.00000, 0.00000 |
| Mobile | after | 596 | 358,460 | 214,392 | 0.00000, 0.00000 |

Photographs increase payload over line schematics. The unchanged hero is still a text/schematic composition; these measurements do not demonstrate hero-photo performance. Differences in small local LCP values are noise, not a claimed loading improvement. No production Core Web Vitals or zero-CLS guarantee is asserted. No page errors were recorded in the sample runs. The harness automation round-trip measurement is not INP.

## Local production assets

| Placement | Native JPEG | WebP master | Master dimensions |
|---|---:|---:|---|
| PH02 | 2,376,666 B | 306,692 B | 1600×1920 |
| PH05 | 10,999,391 B | 415,218 B | 1800×1200 |
| PH07-B | 1,564,566 B | 126,394 B | 1800×1198 |
| PH08 | 10,230,943 B | 638,262 B | 1800×1350 |
| PH10 | 1,646,896 B | 138,798 B | 1800×1200 |
| PH11 | 1,682,892 B | 195,384 B | 1800×1200 |

Six WebP masters total 1,820,748 bytes, versus 28,501,354 original JPEG bytes. This is source-to-derivative storage reduction, not a claim that every master downloads at once. Existing responsive Next Image delivery and lazy loading remain active. Hero receives no new resource or priority change. Review boards/original working files are outside public/ and not loaded by the app.

## Actual local responsive responses

Cache-disabled, DPR 1, reduced-motion delivery inventory (not the throttled timing benchmark). These are encoded response bodies, excluding headers; one entry per requested photo response.

| Viewport | Source | Requested optimizer width | Encoded bytes |
|---|---|---:|---:|
| 390 | industrial-component-detail.webp | 640 | 39,730 |
| 390 | open-pit-mineral-handling.webp | 640 | 69,124 |
| 390 | heavy-manufacturing-machined-shaft.webp | 640 | 29,962 |
| 390 | grain-handling-silos.webp | 640 | 33,576 |
| 390 | chemical-processing-infrastructure.webp | 640 | 41,200 |
| 390 | neutral-steel-fasteners.webp | 640 | 21,152 |
| 1440 | industrial-component-detail.webp | 640 | 39,730 |
| 1440 | open-pit-mineral-handling.webp | 640 | 69,124 |
| 1440 | heavy-manufacturing-machined-shaft.webp | 640 | 29,962 |
| 1440 | grain-handling-silos.webp | 640 | 33,576 |
| 1440 | chemical-processing-infrastructure.webp | 750 | 53,556 |
| 1440 | neutral-steel-fasteners.webp | 750 | 26,536 |

## Tablet layout-stability observation

The required responsive capture recorded small startup shifts at 768px (~0.00798) and 1024px (~0.00746), with 0 in the 390/1440/1920 captures. Detailed sources in tablet-shifts.json identify the hero editorial moving 8px and footer moving 16px at startup, consistent with the existing hero 112px fallback versus measured 96px header variable. This is an inference from the entries and unchanged header/hero sizing code, not a measured pre-integration tablet comparison. No image-frame collapse was observed. The photography scope preserves that header/hero behavior; do not hide this residual observation behind a universal zero-CLS claim.
