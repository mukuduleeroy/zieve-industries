# Mobile industry hierarchy

Phase 11B.6 · 18 November 2026 · local verification only.

## Shared content structure

Every article now renders exactly once in this DOM order:

1. Existing number and H3 industry name.
2. Existing IndustryMedia figure, actual image/schematic and truthful credit.
3. Existing editorial headline, description/procurement note and relevant solution links.

The former single editorial wrapper is split into heading and supporting-copy wrappers around the existing figure. CSS does not reorder the mobile DOM. No duplicated content, visually hidden clone, positive tabindex or artificial panel focus. Figure naming references the existing H3; actual descriptive image alt and captions are unchanged.

Below64rem, the one-column grid follows DOM order directly. The existing2rem section-internal grid gap and4:3 media frame remain. Desktop uses a two-row editorial column with the figure spanning those rows, including reversed desktop flow fallback; enhanced stage keeps the approved left text/right image composition. All company copy/links remain intact.

## Evidence

Fresh matched before/after viewports320,375,390,430×1000 show the first Mining photograph immediately after its name, instead of after all copy and solution links. The italic editorial headline now follows the credit. Full-panel screenshots preserve every paragraph/link; viewport captures demonstrate earlier visual impact. Actual screenshots use existing local photos and schematic, not mockups. 200% root-text captures at390/1440 and the eight-width regression verify reflow.

Automated checks require H3 before figure and figure before copy both in DOM and narrow-screen geometry; each H3/figure/content occurs once. Figure dimensions, heading clipping, document overflow and no-JS anchor order are checked. Touch-emulated contexts retain vertical flow. All existing44px links, object-fit/object-position, image error fallback and responsive sizes remain.

Native browser zoom, Firefox text-only zoom, VoiceOver/NVDA and physical iOS remain manual release gates; DOM order and root-text automation do not certify actual spoken output. No horizontal scrolling is introduced on narrow touch devices.
