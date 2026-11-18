# Logo asset register

Phase 11C.1 · 18 November 2026 · readiness preparation only.

## Existing asset and use

Original profile extraction: `public/branding/zieve-logo-profile.jpeg`, **627 × 294px, 30,554 bytes, JPEG, no alpha**. Original visually inspected; navy/amber artwork and white background remain intact. It is the original logo image, not ordinary text or a recreated mark.

`BrandLink` uses `aria-label="Zieve Industries home"` and image `alt="Zieve Industries"`, intrinsic 627 × 294 dimensions and Next.js Image delivery. Header displays 132 × approximately 61.89px below 1280px and 158 × approximately 74.08px at/above 1280px. Footer displays 158 × approximately 74.08px. Mobile dialog also reuses BrandLink; it is hidden when closed. Footer image is lazy loaded. Source aspect ratio is preserved. Actual optimized requests, display sizes and accessible names are in [inventory](evidence/inventory.json).

The baked white background suits current white header/footer treatment. A dark-background asset is only needed if a future approved placement requires one; no recolouring is authorized or necessary for this checkpoint.

| ID / priority | Current status / evidence | Owner / approval dependency | Proposed resolution | Implementation risk | Required verification |
|---|---|---|---|---|---|
| L01 / P2 | Only extracted JPEG; no approved vector master in project | Brand owner/designer supplies and approves master, or explicitly accepts raster for release | Obtain authentic SVG/vector master with correct geometry, viewBox, colour values, clear space and usage rights; retain source/provenance | Medium: incorrect artwork or unsanitized SVG | Compare with original at responsive sizes; inspect SVG scripts/external refs; aspect ratio, DPI1/2/3 quality, dimensions and CLS |
| L02 / P2 conditional | No separately approved light/dark variants | Brand owner | Confirm current light-background original; request genuine dark variant only for an approved use; do not trace, redraw, recolour or invert | Medium: identity drift | Approved background/contrast, small-size legibility, consistent header/footer/menu treatment |
| L03 / P3 | Shared `sizes` says 132px below 80rem; footer is actually 158px | Frontend follow-up after review | Review footer-specific sizes hint only if measured delivery/quality warrants it | Low: unnecessary transfer or undersampling | Inspect currentSrc and image sharpness at DPR1/2/3, layout unchanged, optimized payload |
| L04 / P2 | Current accessible name is correct in inventory; screen-reader interaction remains unverified | Accessibility QA | Retain meaningful home-link name and avoid redundant spoken text during any future asset integration | Low | VoiceOver/NVDA home-link announcement, keyboard focus, mobile dialog naming and focus return |

No logo files, colours, sizing or rendering code changed.
