# AUD-01 — Enlarged-text reflow

## Measured causes before implementation

The baseline browser measurements reproduce the audit: 390px expands to 568px and 1440px to 1762px at 200% root text size. The wider seven-width check also identifies overflow at 320/375 and 1024.

Header flex rows, their menu/quote controls and navigation lists used unwrappable spacing/text without an alternate line. The hero's long serif words exceeded its text width inside a clipped decorative stage. Other sector/value/footer headings also contained words wider than their enlarged-text columns; fixing only the H1 would leave meaningful overflow elsewhere. Computed scrollWidth/clientWidth and element classes are retained in [before-measurements.json](evidence/before-measurements.json).

## Exact changes

- The existing body typography inherits `overflow-wrap: anywhere`, permitting emergency word wrapping only when needed. This does not alter the type scale, family, content or tokens. It covers the measured hero/other editorial word overflow rather than masking it at the document boundary.
- Header inner row, desktop navigation/list and mobile dialog top row can wrap. Flex children have sensible minimum sizing; controls can wrap their own text and keep icons from shrinking. Existing xl/lg breakpoints are unchanged. All navigation remains present and operable.
- The dropdown is bounded by viewport width/remaining height and scrolls internally if necessary. An expanded-state measurement at 1440px/200% exposed a further 44.66px overrun (document width 1485px); a scoped layout effect now measures and adjusts the layout offset of the open panel inside the viewport and places it below a wrapped header. Containment uses documentElement.clientWidth: mobile emulation demonstrated innerWidth can expand to 1469px with an overflowing panel while the layout viewport remains 1440px. Its normal-size position is retained. Resize observers/listeners and inline overrides clean up on close/unmount. The existing measured header offset remains the source for anchor scroll-padding. Header surfaces and sticky behaviour remain intact.
- Hero action minimum sizing permits text reflow while retaining icon/touch dimensions. Full-height captures additionally exposed the absolute media-caption column overlapping the actions at enlarged text sizes. The existing caption and scroll link now occupy a wrapping, normal-flow footer row. HeroMedia retains caption/fallback ownership and accepts server content/scroll slots; its media configuration is unchanged. The flex stage can grow naturally, while its normal minimum viewport height and editorial type remain. The original clipped stage remains for decorative media, but meaningful text now fits within it and grows vertically. No document overflow hiding, typography shrinking, zoom restriction or heading substitution is used.

## Before/after measurements

Same 900px viewport height, DPR 1, reduced motion and system font environment. Document width:

| CSS viewport | Before, 200% root text | After, 200% root text | Expected width |
|---|---:|---:|---:|
| 320 | 568 | 320 | 320 |
| 375 | 568 | 375 | 375 |
| 390 | 568 | 390 | 390 |
| 768 | 768 | 768 | 768 |
| 1024 | 1056 | 1024 | 1024 |
| 1440 | 1762 | 1440 | 1440 |
| 1920 | 1920 | 1920 | 1920 |

Default text size retains 96px compact /112px desktop header heights. At the four requested visual-comparison widths (390/768/1024/1440), hero and other major section heights remain unchanged. At 320px, the normal-flow footer adds approximately 10px of hero height to keep its wrapped caption clear; other section heights remain unchanged. Enlarged-text sections grow as needed rather than concealing overflow. A text-relative accordion container rule removes excessive insets and places long trigger labels on their own row only when required; this avoids the near single-character columns revealed by the measurements. Full normal geometry comparisons and screenshot notes are in REGRESSION_REPORT.md. The extended conditions inspect text range bounds, CTA/control rectangles, header/logo overlap, scroll-indicator/caption separation, keyboard disclosure/modal navigation and both motion preferences.

## Zoom conditions and limitations

**Verified:** 320, 375, 390, 768, 1024, 1440, 1920px CSS viewports at 100% and 200% root font; additional 720/360/320px reflow-equivalent viewports; normal/reduced-motion keyboard operation. These are direct browser layout measurements.

**Not verified:** native browser UI 200% zoom, 400% zoom and text-only zoom in Firefox/Safari. This environment exposes headless Chromium automation rather than a native browser UI zoom control. Root-font enlargement is a proxy and viewport narrowing is a reflow equivalent; neither is reported as native zoom. No deviceScaleFactor/page-scale emulation is mislabeled as browser zoom. Real native zoom/text resizing and assistive technology remain pre-release validation requirements.

No WCAG conformance claim is made. This targeted checkpoint does not implement decorative contrast, form alignment or other Phase 10 visual polish findings. See FINAL_QA_REPORT.md for Phase 11B readiness and the remaining brand dependencies.
