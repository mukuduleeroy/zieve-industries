# Before/after visual review

Phase 11B.5 · 18 November 2026 · no deployment.

## Capture method

Actual local production-build Chromium screenshots, DPR1,1000px viewport height at390,768,1024,1440,1920px. Before screenshots were captured before production source edits; `before-inventory.json` retains heading/eyebrow/overflow measurements. Full-page comparisons use reduced motion so every section remains legible and long-page content is not concealed by entrance effects. Horizontal state screenshots use normal motion, not mocked transforms or disabled animations. Final image captures wait for actual active image completion.

| Width | Before full homepage | After full homepage | After Industries flow opening |
|---|---|---|---|
|390|[Before](screenshots/before-390-homepage.png)|[After](screenshots/after-390-homepage.png)|[Flow](screenshots/after-390-industries.png)|
|768|[Before](screenshots/before-768-homepage.png)|[After](screenshots/after-768-homepage.png)|[Flow](screenshots/after-768-industries.png)|
|1024|[Before](screenshots/before-1024-homepage.png)|[After](screenshots/after-1024-homepage.png)|[Flow](screenshots/after-1024-industries.png)|
|1440|[Before](screenshots/before-1440-homepage.png)|[After](screenshots/after-1440-homepage.png)|[Reduced flow](screenshots/after-1440-industries.png)|
|1920|[Before](screenshots/before-1920-homepage.png)|[After](screenshots/after-1920-homepage.png)|[Reduced flow](screenshots/after-1920-industries.png)|

Baseline per-section `before-*-industries.png` captures used scrollIntoViewIfNeeded on the tall section and may centre the section rather than show its opening. Full-page files are the composition comparison; final flow opening captures deliberately use native block-start scrolling. Earlier `after-stage-initial.png` is an inspection diagnostic, not an acceptance image.

## Horizontal sequence

| State |1440px|1920px|
|---|---|---|
|Initial / Mining|[Initial](screenshots/after-1440-initial.png)|[Initial](screenshots/after-1920-initial.png)|
|Midway / between second and third|[Midway](screenshots/after-1440-midway.png)|[Midway](screenshots/after-1920-midway.png)|
|Final / Agro-processing|[Final](screenshots/after-1440-final.png)|[Final](screenshots/after-1920-final.png)|
|Reverse / Civil schematic|[Reverse](screenshots/after-1440-reverse.png)|[Reverse](screenshots/after-1920-reverse.png)|
|Stage release into Advantage|[Release](screenshots/after-1440-release.png)|[Release](screenshots/after-1920-release.png)|
|Reduced motion|[Normal flow](screenshots/after-1440-reduced.png)|[Normal flow](screenshots/after-1920-reduced.png)|

`horizontal-qa.json` records actual geometry: stage top approximately112px during progression, then approximately−128px after240px beyond release; root document overflow0 in all ten horizontal states. Both directions are observed. Five-width after inventory reports overflow0 and zero numbered section eyebrows. Before/after H1/H2/H3 sequences match exactly.

## Review outcome and limitations

Six decorative labels and their empty spacing are removed; actual titles and all nine homepage parts remain. The unified navy stage uses retained photographs and a truthful civil schematic, serif text, amber progress and consistent content/media hierarchy. Mobile/touch/enlarged/reduced/no-JS views read vertically; sticky navigation stays readable. The next Advantage section is reached by normal native scrolling, without overlap/pin spacer conflicts. Header/hero/logo/form assets and copy are unchanged.

Early QA identified unrequested lazy media in translated panels and pointer-focus click cancellation. Both led to scoped corrections and fresh verification rather than accepting a screenshot-only result. Mid-travel panels naturally cross the stage boundary; the user can continue or reverse native scrolling, and keyboard focus switches to reading flow. This is a continuous scroll story, not a timed carousel.

Final subjective acceptance belongs to the user. No new photo has final crop/brand approval; held placements remain explicitly schematic. Native browser/device/AT and final Noto-font verification remain outstanding release requirements.
