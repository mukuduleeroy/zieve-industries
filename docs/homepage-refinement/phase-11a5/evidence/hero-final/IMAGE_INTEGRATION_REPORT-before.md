# Phase 11A.5 — final selection and conditional integration

Updated 2026-11-17. This report supersedes the initial Stage A hold; historical reports remain under evidence/stage-a-reports/. User authorization permits source-verified approved directions and a documented PH07 choice, while expressly holding PH01 until final hero approval. No purchases, permission requests, deployment or Phase 11B work occurred.

## Integration matrix

| Placement | Current state |
|---|---|
| PH01 · Hero | Unchanged live schematic. Original Built/Komatsu candidate rejected. R1/R2 await final visual approval. |
| PH02 · Company Introduction | Integrated conditionally; final visual review pending. |
| PH03 · Solutions — Earthmoving & Construction Equipment | Schematic retained: original shows JCB marks; Pexels detailed terms §5 prohibits commercial branded-content use in relation to goods/services. No separate permission verified. |
| PH04 · Solutions — Elution Plants & Gold Processing | Schematic retained by explicit instruction. No permission requested. |
| PH05 · Solutions — Industrial Chemicals | Integrated conditionally; final visual review pending. |
| PH06 · Solutions — Lubricants & Fluids | Schematic retained by explicit instruction. No permission requested. |
| PH07 · Solutions — Consumables & Spares | Original not used. Cleaner PH07-B selected and integrated. |
| PH08 · Industries — Mining & Mineral Processing | Integrated conditionally; final visual review pending. |
| PH09 · Industries — Civil & Infrastructure Construction | Schematic retained: Blaw-Knox marks and recognizable workers; trademark/release permissions unverified. No substitute silently selected. |
| PH10 · Industries — Manufacturing | Integrated conditionally; final visual review pending. |
| PH11 · Industries — Agro-processing | Integrated conditionally; final visual review pending. |

## Implementation

- Added six optimized local WebP derivatives under public/images/industrial/company, solutions and industries. Native originals are working files outside public/; no runtime stock-service calls or remote image configuration.
- Added src/config/industrial-photography.ts as the typed production photograph map with descriptive alt text, visible contributor/publisher stock credit, responsive focal positions and traceable conditional-approval notes.
- Updated only introduction-media.ts, solutions-media.ts and industry-media.ts bindings. Hero configuration and all original schematic files/objects remain unchanged.
- Reused all existing Next Image wrappers, lazy loading, responsive sizes, aspect-ratio frames, error handling and motion. No component rebuild, CSS redesign, new dependency or client-side package.
- PH02 uses a physically cropped 1600×1920 WebP; the other five use 1800px-wide WebP, quality 82, without enlargement, after full original decode. Native pixels and contributor credits are retained in source evidence; source EXIF does not need to ship publicly. No generative edits or recolouring.
- PH02 5:6, solutions 16:10 and sectors 4:3 frames are unchanged; desktop/mobile positions come from the existing config fields.

## Verification updates

Existing tests now read configured photo alt text instead of assuming all current media is schematic. Media-failure routing handles both direct SVGs and encoded Next Image URLs. Added regression checks for held placements, exact file/hash bindings, distinct company/manufacturing subjects, decoded optimized-photo loading and recovery to the original schematic after a photo fails. Existing double-failure fallback checks still run.

Initial unit/browser failures were stale schematic-only expectations and a new test expecting a relative src after browser normalization. Assertions were corrected to the actual approved configuration/URL pathname; no application behavior was weakened to satisfy tests. The first browser log is retained for traceability. Final results appear in FINAL_READINESS_REPORT.md.

## Preserved scope

All nine sections, content, design tokens, font strategy, original logo, animations, header/menu, discovery anchors, quotation form and inner/deployment configurations remain unchanged. No Phase 11B features or deployment. Final hero approval and PH03/PH09 source-specific rights remain outstanding.
