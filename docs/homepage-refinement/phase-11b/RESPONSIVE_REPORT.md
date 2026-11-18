# Responsive report

Updated **18 November 2026 (Africa/Harare)**. Phase 11B only.

## Fresh measurements

All required widths tested at default and 200% root text. Default CSS viewport measurements below use reduced motion, DPR1, decoded images and the same 900px height before/after. Heights are descriptive; a shorter page was not the sole objective.

| Width | Before page px | After page px | Delta px | Intro image before→after px | Form after |
|---|---:|---:|---:|---|---|
| 320 | 14904 | 14595 | -309 | 336→210 | single column |
| 375 | 14116 | 13782 | -334 | 402→251 | single column |
| 390 | 14152 | 13812 | -340 | 420→262 | single column |
| 768 | 13009 | 12509 | -500 | 691→432 | paired/aligned |
| 1024 | 9854 | 10173 | +319 | 457→457 | single column |
| 1440 | 10849 | 10850 | +1 | 588→588 | paired/aligned |
| 1920 | 10886 | 10887 | +1 | 586→586 | paired/aligned |

At 1024px the form becomes taller instead of forcing misaligned pairs; that is deliberate. At 768px the full-width form can still support two columns, while the Introduction/Industries rhythm improves. At desktop, photography frames, containers and pacing stay intact. Hero height and credit height match the baseline at all seven widths. No mobile/tablet description or image was hidden, and no reading font or touch target was reduced.

## Verification

No document horizontal overflow at 320/375/390/768/1024/1440/1920px. Eight field bindings/order stay unchanged. Paired controls align; stacked controls follow reading order. Labels, required/optional markers, hints and invalid errors remain unclipped, including 200% text. Existing Phase 11A discovery focus/history, menu/dialog behavior, form anchors and quotation shortcuts pass. Existing CDP 2× magnification is a separate pinch-style test, not native browser-chrome zoom.

Chromium desktop and iPhone-emulated Chromium are not physical Safari/iOS, Firefox, VoiceOver or NVDA validation. 200% root text, narrow CSS viewports and CDP 2× visual magnification are tested separately; native browser-chrome zoom and spoken announcements remain unverified. Axe results and sampled contrast are not a complete WCAG certification. No production field performance or final-font composition claim.

