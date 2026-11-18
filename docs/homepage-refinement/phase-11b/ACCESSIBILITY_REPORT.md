# Accessibility report

Updated **18 November 2026 (Africa/Harare)**. Phase 11B only.

## Semantics and functional preservation

AUD-12 now uses a named group for the coherent prepared summary/actions. The wrapper itself is not live or focusable; its existing H4, ready status, copy status and Select summary behavior remain. No duplicate ready announcement or new landmark. Draft source/body and mailto/copy architecture are unchanged. Keyboard preparation keeps focus on Prepare; Select summary focuses/selects the readonly text; edit invalidation, validation and long-enquiry manual fallback continue passing.

AUD-06 uses text-relative available-width reflow rather than fixed label heights. Errors/descriptions/field names are unchanged. AUD-05 preserves aria-hidden decorative numerals and strengthens paint on light surfaces; essential headings already carry their meaning. Decorative exemptions are explicitly recognized rather than presenting the original numeral findings as proven essential-body-text violations.

## Axe checks

The already-installed axe-core engine was reused; no dependency added. Scans use WCAG 2 A/AA, 2.1 A/AA and best-practice tags at 390/1024/1440 in default and prepared-draft states.

| Width | State | Before violations (nodes) | After violations | Before generic-label incomplete | After generic-label incomplete |
|---|---|---:|---:|---:|---:|
| 390 | default | 6 | 0 | 0 | 0 |
| 390 | draft | 6 | 0 | 1 | 0 |
| 1024 | default | 6 | 0 | 0 | 0 |
| 1024 | draft | 6 | 0 | 1 | 0 |
| 1440 | default | 1 | 0 | 0 | 0 |
| 1440 | draft | 1 | 0 | 1 | 0 |

Before violations were decorative-number contrast findings. After scans report zero violations and no aria-prohibited-attr incompletes in the tested states. Gradient contrast still produces axe incompletes (seven default hero areas; additional native/draft control uncertainties in ready states). These are not silently counted as passes. Hero areas were separately sampled below; native control appearance/spoken AT behavior still needs release validation. Raw node targets/results are in evidence/{before,after}-axe.json.

## Manual-background contrast sampling

Computed foreground colors were compared with actual DPR1 screenshot backgrounds, with editorial/footer foreground hidden by opacity without reflow; text-node range rectangles are sampled every 2px after paint. Empty decorative spans are excluded. Secondary-button background is suppressed with the editorial group, making its white-text result a conservative lower bound (its own additional navy layer only darkens the real background). Normal copy/credits use 4.5:1; large serif headlines use 3:1. This is a bounded raster/rectangle check, not full glyph or conformance certification.

| Width | Eyebrow | White headline | Amber headline | Copy | Secondary action | Scroll | Credit |
|---|---:|---:|---:|---:|---:|---:|---:|
| 320 | 11.24:1 | 9.64:1 | 3.30:1 | 6.05:1 | 9.94:1 | 14.65:1 | 16.21:1 |
| 375 | 11.08:1 | 9.95:1 | 3.37:1 | 5.84:1 | 10.92:1 | 16.43:1 | 15.27:1 |
| 390 | 11.22:1 | 9.95:1 | 3.49:1 | 6.07:1 | 11.05:1 | 16.43:1 | 15.06:1 |
| 768 | 9.32:1 | 8.76:1 | 3.97:1 | 5.39:1 | 16.60:1 | 16.27:1 | 16.29:1 |
| 1024 | 12.99:1 | 9.60:1 | 4.78:1 | 7.15:1 | 16.80:1 | 16.27:1 | 16.43:1 |
| 1440 | 14.49:1 | 10.16:1 | 4.79:1 | 12.96:1 | 16.46:1 | 16.27:1 | 16.46:1 |
| 1920 | 14.47:1 | 10.58:1 | 5.19:1 | 13.11:1 | 16.62:1 | 16.27:1 | 16.46:1 |

All sampled areas meet their relevant thresholds; minimum large amber ratio is 3.30:1 and supporting-copy minimum is 5.39:1. Existing motion/reduced-motion cleanup and emergency enlarged-word wrapping remain untouched and pass regressions.

Chromium desktop and iPhone-emulated Chromium are not physical Safari/iOS, Firefox, VoiceOver or NVDA validation. 200% root text, narrow CSS viewports and CDP 2× visual magnification are tested separately; native browser-chrome zoom and spoken announcements remain unverified. Axe results and sampled contrast are not a complete WCAG certification. No production field performance or final-font composition claim.

**CONDITIONAL GO for Phase 11C**, subject to review of Phase 11B and explicit approval of the next scope. **Not public-launch approval.** Remaining gates include licensed complete Noto Serif WOFF2 delivery, vector/alternate logo masters, four held photographic placements, real assistive-technology/native zoom and cross-browser validation, final performance testing, official contact/address confirmation, inner-page readiness and deliberate launch/indexing decisions. Existing noindex remains intact. No Phase 11C work or deployment occurred.

