# Visual refinement report

Updated **18 November 2026 (Africa/Harare)**. Phase 11B only.

[Before/after review board](REVIEW_BOARD.html) · [comparison notes](BEFORE_AFTER_REVIEW.md)

## AUD-06

Wrapped labels displaced paired controls by 22.4px at 1024px. Available-width auto-fit tracks: minmax(min(100%,18rem),1fr); wide fields span the grid. Two columns only when the form can support labels, single column otherwise; no fixed label heights.

[Before](screenshots/before/quotation-1024.png) · [After](screenshots/after/quotation-1024.png). Label/input bindings, order, errors, autocomplete, keyboard flow and validation preserved. The taller 1024px form is an intentional reading tradeoff. Risk/result: Low–medium: grid thresholds at enlarged text. Seven widths at 100/200%, including invalid errors, passed.

## AUD-05

Decorative ochre numerals were faint on light surfaces; axe flagged six at narrow widths and one at desktop. Navy numerals on light surfaces; amber retained on the navy manufacturing panel and existing accent rules. aria-hidden remains unchanged.

[Before](screenshots/before/industries-390.png) · [After](screenshots/after/industries-390.png). These are decorative, not essential body text; headings already convey meaning. The change improves hierarchy, not a claim that decorative text automatically violates essential-text criteria. Risk/result: Low: paint only. Nine aria-hidden numerals and surface-specific colours checked.

## AUD-12

Generic draft div carried aria-labelledby without a grouping role; axe marked it incomplete. Add role="group" to the existing wrapper and keep its existing H4 label. No extra landmark, focus target or live wrapper.

[Before](screenshots/before/draft-1024.png) · [After](screenshots/after/draft-1024.png). One existing status and one copy-status live area remain. Preparation focus, copy/select, short mailto and long-enquiry fallback preserved. Risk/result: Low: accessibility tree. Unit/keyboard/copy/axe checks pass; actual spoken output still needs AT testing.

## AUD-07

The 768px Introduction image was 691px tall, with repeated large panel spacing through Industries. Editorial concern, not a functional defect. Below 64rem: Introduction 4:3 detail frame, 2rem grid gap and 2.5–3.5rem padding. Industry photos remain 4:3; panel gaps and numeral/context spacing tighten modestly. Desktop composition unchanged.

[Before](screenshots/before/introduction-768.png) · [After](screenshots/after/introduction-768.png). All text, four sector descriptions, existing quotation shortcuts, images/captions and DOM order retained. No carousel, hidden content or smaller type. Risk/result: Medium: crop and reflow. Actual mobile/tablet photographs reviewed and image/fallback aspect-ratio tests updated.

## AUD-16

Adjacent navy Advantage/Vision sections had a faint boundary. Use a 2px existing-amber boundary on Vision in place of the faint paper-mix line. Keep both navy surfaces and existing eyebrow/heading hierarchy.

[Before](screenshots/before/advantage-vision-1440.png) · [After](screenshots/after/advantage-vision-1440.png). CSS decoration adds no semantic noise or animation. Existing named sections convey the transition. Risk/result: Low: static one-pixel height difference. Section adjacency and colour checked.

## Hero finish

At 390px machinery was almost lost in the combined horizontal and vertical overlay; credit tracking was dense. Only below 40rem: horizontal navy alpha 88→62%; vertical navy 92% at base, 70% at 12%, transparent at 45%; credit tracking .025em. Source/crops/layout unchanged.

[Before](screenshots/before/hero-390.png) · [After](screenshots/after/hero-390.png). Credit and illustrative/non-site statement retained at 12px; footer remains in normal flow. White/supporting text and large amber headline checked against actual backgrounds. Risk/result: Medium: contrast. Seven-width samples pass; credit/scroll do not overlap. Desktop 1440px hero screenshot is pixel-identical to baseline.

## Cross-section consistency decision

Shared containers, headings, buttons, source imagery/caption alignment and desktop rhythm already form a coherent system. No extra changes were made to Header, Solutions, Advantage accordion, Mission/Values layout, quotation transport or Footer. The only boundary treatment is the documented Advantage/Vision rule. No gradients outside the existing hero overlay, cards, new palette, new typography system or animation were introduced. Desktop page height changes by one pixel solely because the boundary changes from 1px to 2px.

The actual after screenshots were opened for inspection: the casting detail remains legible in the shorter tablet frame, the form labels/controls now stack evenly at 1024px, the mobile excavator edge is more visible, its credit remains readable and the amber rule identifies the new editorial movement. These are evidence-linked judgments, not a design score or user-research claim.

Fresh baseline: lint, strict TypeScript, production build, **44 unit tests and 132 Playwright tests passed**. Refined build: lint, strict TypeScript, production build, **45 unit tests and 140 full-suite Playwright tests passed**; **8 targeted tests passed again** after adding explicit enlarged-error containment checks. No tests skipped. Exact logs are under evidence/.

