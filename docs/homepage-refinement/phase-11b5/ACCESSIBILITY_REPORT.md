# Accessibility and reflow report

Phase 11B.5 · 18 November 2026 · local implementation, no deployment.

Existing Phase11A anchor discovery, skip navigation, modal focus/scroll lock, solution permalinks, enlarged-text form layout, validation/draft groups and quotation transport are preserved. Only the six decorative section-eyebrow nodes are removed. Semantic section titles/narratives, four industry H3s, meaningful labels and hierarchy remain.

The Industries enhancement never changes DOM reading order or uses aria-hidden/inert on sector content. All sectors are exposed to assistive reading; only decorative sequence/progress marks are aria-hidden. Interactive solution links retain44px targets/focus indicators. A focused sector link switches the stage to ordinary document flow so keyboard and AT users can reach all links without an offscreen transform. No noninteractive panel receives tabindex. Reduced-motion/no-JS/coarse-pointer/enlarged-text states expose every description without animation.

White text/navy surfaces and amber accents use existing tokens. No amber small text on white was introduced. Approved photo credits and alt descriptions remain accurate; civil imagery is explicitly schematic. Media is separate from copy rather than under text, avoiding new photographic text-contrast dependence.

Automated evidence/results are in REGRESSION_REPORT and evidence/. Fresh axe scans include default/prepared enquiry states at390/1024/1440 plus any explicit horizontal-state checks. Incomplete photographic/native-control contrast items remain manual-review limitations; zero reported violations is not a complete WCAG certification.

Native browser zoom, Firefox text-only zoom, VoiceOver/Safari, NVDA and physical iOS testing remain pending from Phase11C.1.200% root-text and narrow CSS viewport automation do not replace these sessions. Source inspection and automated lifecycle checks do not claim native AT spoken-output certification. Public release remains NO-GO.
