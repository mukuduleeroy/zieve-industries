# Phase 11B implementation

Updated **18 November 2026 (Africa/Harare)**. Phase 11B only.

## Mandatory review and baseline

All nine required reports were present at the exact requested paths; no missing-file discrepancy. Read DESIGN, ARCHITECTURE, CONTENT, IMPLEMENTATION, Phase 10 executive/backlog/readiness, Phase 11A QA and final Phase 11A.5 readiness. Historical statements were interpreted against the current R1/seven-photo configuration. Inspected header/navigation, all homepage sections, quote fields/draft, footer, tokens/type and scoped GSAP/Motion/reduced-motion foundations. Current screenshots and source were reviewed before editing; the fresh baseline is recorded independently of Git because prior work is uncommitted.

Fresh baseline: lint, strict TypeScript, production build, **44 unit tests and 132 Playwright tests passed**. Refined build: lint, strict TypeScript, production build, **45 unit tests and 140 full-suite Playwright tests passed**; **8 targeted tests passed again** after adding explicit enlarged-error containment checks. No tests skipped. Exact logs are under evidence/.

## Changes

### AUD-06

- Original: Wrapped labels displaced paired controls by 22.4px at 1024px.
- Production files under src/components/sections/: `quotation/quotation.css`.
- Solution: Available-width auto-fit tracks: minmax(min(100%,18rem),1fr); wide fields span the grid. Two columns only when the form can support labels, single column otherwise; no fixed label heights.
- Evidence: [before](screenshots/before/quotation-1024.png), [after](screenshots/after/quotation-1024.png).
- Accessibility: Label/input bindings, order, errors, autocomplete, keyboard flow and validation preserved. The taller 1024px form is an intentional reading tradeoff.
- Regression risk/results: Low–medium: grid thresholds at enlarged text. Seven widths at 100/200%, including invalid errors, passed.

### AUD-05

- Original: Decorative ochre numerals were faint on light surfaces; axe flagged six at narrow widths and one at desktop.
- Production files under src/components/sections/: `industry-experience/industries.css; corporate-purpose/purpose.css`.
- Solution: Navy numerals on light surfaces; amber retained on the navy manufacturing panel and existing accent rules. aria-hidden remains unchanged.
- Evidence: [before](screenshots/before/industries-390.png), [after](screenshots/after/industries-390.png).
- Accessibility: These are decorative, not essential body text; headings already convey meaning. The change improves hierarchy, not a claim that decorative text automatically violates essential-text criteria.
- Regression risk/results: Low: paint only. Nine aria-hidden numerals and surface-specific colours checked.

### AUD-12

- Original: Generic draft div carried aria-labelledby without a grouping role; axe marked it incomplete.
- Production files under src/components/sections/: `quotation/quotation-draft.tsx`.
- Solution: Add role="group" to the existing wrapper and keep its existing H4 label. No extra landmark, focus target or live wrapper.
- Evidence: [before](screenshots/before/draft-1024.png), [after](screenshots/after/draft-1024.png).
- Accessibility: One existing status and one copy-status live area remain. Preparation focus, copy/select, short mailto and long-enquiry fallback preserved.
- Regression risk/results: Low: accessibility tree. Unit/keyboard/copy/axe checks pass; actual spoken output still needs AT testing.

### AUD-07

- Original: The 768px Introduction image was 691px tall, with repeated large panel spacing through Industries. Editorial concern, not a functional defect.
- Production files under src/components/sections/: `company-introduction/introduction.css; industry-experience/industries.css`.
- Solution: Below 64rem: Introduction 4:3 detail frame, 2rem grid gap and 2.5–3.5rem padding. Industry photos remain 4:3; panel gaps and numeral/context spacing tighten modestly. Desktop composition unchanged.
- Evidence: [before](screenshots/before/introduction-768.png), [after](screenshots/after/introduction-768.png).
- Accessibility: All text, four sector descriptions, existing quotation shortcuts, images/captions and DOM order retained. No carousel, hidden content or smaller type.
- Regression risk/results: Medium: crop and reflow. Actual mobile/tablet photographs reviewed and image/fallback aspect-ratio tests updated.

### AUD-16

- Original: Adjacent navy Advantage/Vision sections had a faint boundary.
- Production files under src/components/sections/: `corporate-purpose/purpose.css`.
- Solution: Use a 2px existing-amber boundary on Vision in place of the faint paper-mix line. Keep both navy surfaces and existing eyebrow/heading hierarchy.
- Evidence: [before](screenshots/before/advantage-vision-1440.png), [after](screenshots/after/advantage-vision-1440.png).
- Accessibility: CSS decoration adds no semantic noise or animation. Existing named sections convey the transition.
- Regression risk/results: Low: static one-pixel height difference. Section adjacency and colour checked.

### Hero finish

- Original: At 390px machinery was almost lost in the combined horizontal and vertical overlay; credit tracking was dense.
- Production files under src/components/sections/: `hero/hero.css`.
- Solution: Only below 40rem: horizontal navy alpha 88→62%; vertical navy 92% at base, 70% at 12%, transparent at 45%; credit tracking .025em. Source/crops/layout unchanged.
- Evidence: [before](screenshots/before/hero-390.png), [after](screenshots/after/hero-390.png).
- Accessibility: Credit and illustrative/non-site statement retained at 12px; footer remains in normal flow. White/supporting text and large amber headline checked against actual backgrounds.
- Regression risk/results: Medium: contrast. Seven-width samples pass; credit/scroll do not overlap. Desktop 1440px hero screenshot is pixel-identical to baseline.

## Test and documentation files

Added tests/e2e/phase-11b.spec.ts (four cases in both projects). Added the draft-group unit assertion in tests/quotation.test.ts. Updated existing Introduction/photo fallback frame assertions to expect 4:3 below 1024px and 5:6 at/above it. Existing assertions were adapted to the intended responsive frame, not removed. Updated DESIGN/ARCHITECTURE/IMPLEMENTATION only to reflect current boundaries; all seven requested phase reports, 32 screenshots, review board and raw evidence are here. No production dependency or package/lockfile change.

## Protected scope

All public files, media configs, content, tokens/type, hooks, schema/transport, App Router/indexing and navigation/footer source hashes match the pre-change snapshot. Main text hashes match at all seven widths; generated draft bodies match before/after. Source-only edits are six existing section files; no new production component or JavaScript interaction. See evidence/scope-integrity.json.

Chromium desktop and iPhone-emulated Chromium are not physical Safari/iOS, Firefox, VoiceOver or NVDA validation. 200% root text, narrow CSS viewports and CDP 2× visual magnification are tested separately; native browser-chrome zoom and spoken announcements remain unverified. Axe results and sampled contrast are not a complete WCAG certification. No production field performance or final-font composition claim.

**CONDITIONAL GO for Phase 11C**, subject to review of Phase 11B and explicit approval of the next scope. **Not public-launch approval.** Remaining gates include licensed complete Noto Serif WOFF2 delivery, vector/alternate logo masters, four held photographic placements, real assistive-technology/native zoom and cross-browser validation, final performance testing, official contact/address confirmation, inner-page readiness and deliberate launch/indexing decisions. Existing noindex remains intact. No Phase 11C work or deployment occurred.

