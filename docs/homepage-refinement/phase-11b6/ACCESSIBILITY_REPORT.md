# Accessibility and responsive verification

Phase 11B.6 · 18 November 2026 · local verification only.

One semantic structure now serves all industry layouts: H3→labelled figure→editorial headline/description/procurement note→solution links. Each article, heading, image and narrative occurs once. No CSS order property, duplicate content or hidden reading clone. Figures reference their own existing H3; actual image alt/caption remain truthful. Parent article heading relationships remain.

Mobile one-column visual order equals DOM order. Desktop placement puts image alongside the title/copy column; image/title ownership stays within the same article. The panel boundary is a text-free, pointer-transparent pseudo-element, not a new focusable/control/landmark. All meaningful content remains accessible, including offscreen horizontal sectors; keyboard/AT focus returns to document flow as before. Visible pointer targets remain stable until click. No new wheel handler, focus trap, panel tabindex, ARIA-carousel pattern or scroll announcements.

Reduced motion disables the horizontal stage; no-JavaScript output remains readable and anchor-addressable. Touch/coarse-pointer and enlarged-root-text modes remain vertical. Existing sticky header, skip navigation, solution permalink focus, mobile menu body lock,44px links, quotation validation/draft/copy and error fallbacks are retained.

Focused tests cover320/375/390/430/768/1024/1440/1920 at100%/200% root text, DOM/visual order, named figures, unique H3s, no heading clipping/overflow, intermediate containment, resize/reverse/release and no-JS industry anchors. Existing tests additionally cover pointer/keyboard activation, preference toggle cleanup, source image failures, full navigation and form behaviour. Fresh axe result counts are in REGRESSION_REPORT; incomplete contrast/native-control items remain manual review.

Native Safari/VoiceOver, NVDA, physical iOS, native browser zoom and Firefox text-only zoom are not performed here. Root-text automation is not native zoom, mobile Chromium emulation is not iOS, and a named figure test is not spoken-output verification. Prior native/device release matrix remains required; public launch is NO-GO.
