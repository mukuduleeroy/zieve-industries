# Before/after review

Updated **18 November 2026 (Africa/Harare)**. Phase 11B only.

[Open the paired screenshot board](REVIEW_BOARD.html). The 32 captures comprise matching before/after sets: full homepage at 390/768/1024/1440, hero at 390/1440, form at 768/1024, industry panels and Introduction at 390/768, Advantage/Vision transition at 390/1440, and draft-ready at 390/1024.

All are actual local production-build screenshots at DPR1 with reduced motion and decoded media. Full-page/hero captures retain the header. Tall section/transition/draft captures hide only sticky header/skip-link paint in the screenshot to avoid obscuring content; production visibility/layout is unchanged. The same capture script and fixture data are used on both sides.

| Change | Before → after evidence | Why the result is preferable |
|---|---|---|
| AUD-06 | [before](screenshots/before/quotation-1024.png) → [after](screenshots/after/quotation-1024.png) | Available-width auto-fit tracks: minmax(min(100%,18rem),1fr); wide fields span the grid. Two columns only when the form can support labels, single column otherwise; no fixed label heights. |
| AUD-05 | [before](screenshots/before/industries-390.png) → [after](screenshots/after/industries-390.png) | Navy numerals on light surfaces; amber retained on the navy manufacturing panel and existing accent rules. aria-hidden remains unchanged. |
| AUD-12 | [before](screenshots/before/draft-1024.png) → [after](screenshots/after/draft-1024.png) | Add role="group" to the existing wrapper and keep its existing H4 label. No extra landmark, focus target or live wrapper. |
| AUD-07 | [before](screenshots/before/introduction-768.png) → [after](screenshots/after/introduction-768.png) | Below 64rem: Introduction 4:3 detail frame, 2rem grid gap and 2.5–3.5rem padding. Industry photos remain 4:3; panel gaps and numeral/context spacing tighten modestly. Desktop composition unchanged. |
| AUD-16 | [before](screenshots/before/advantage-vision-1440.png) → [after](screenshots/after/advantage-vision-1440.png) | Use a 2px existing-amber boundary on Vision in place of the faint paper-mix line. Keep both navy surfaces and existing eyebrow/heading hierarchy. |
| Hero finish | [before](screenshots/before/hero-390.png) → [after](screenshots/after/hero-390.png) | Only below 40rem: horizontal navy alpha 88→62%; vertical navy 92% at base, 70% at 12%, transparent at 45%; credit tracking .025em. Source/crops/layout unchanged. |

## Measured interpretation

1024px Company/Telephone and Industry/Location controls were displaced by 22.4px; the after form stacks them, preserving complete labels. The 768px intro image is 432px instead of 691px, retaining a clear machining-detail crop with its credit. Whole-page reductions are 340px at 390 and 500px at 768; 1024 grows 319px to accommodate the intentional form reflow. Desktop height grows only 1px for the new boundary. The desktop 1440 hero raw pixels are identical before/after; mobile subject/credit visibility changes are isolated below 40rem. Content/draft hashes match.

These comparisons support the individual refinements, not a claim that less height alone improves conversion or that user research has validated the journey. No universal visual score or launch approval.
