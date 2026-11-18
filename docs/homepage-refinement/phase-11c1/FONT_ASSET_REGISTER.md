# Font asset register

Phase 11C.1 · 18 November 2026 · readiness preparation only.

## Verified current state

The PDF text font names recorded in `docs/DESIGN.md` are `BAAAAA+NotoSerif-Bold`, `CAAAAA+NotoSerif-Regular`, and `DAAAAA+NotoSerif-Italic`. They establish family/style identity, not distributable complete webfont assets. OpenSymbol is the PDF bullet font, not an additional website family. Cover lettering is raster artwork and remains independently unverified.

`src/design-system/typography.css` and tokens request Noto Serif, Georgia, Times New Roman, serif. There are no project font binaries, custom FontFace entries or font network requests. CDP platform-font inspection identifies **Georgia, Georgia-Bold and Georgia-Italic** in the current build, including desktop navigation. Naming Noto Serif in CSS does not deliver it. See [inventory](evidence/inventory.json) and [environment](evidence/environment.json).

| Required face | Current use | Available complete local licensed webfont | Status |
|---|---|---|---|
| 400 normal | Body, supporting copy, controls | None | Georgia temporary fallback |
| 700 normal | Headings, navigation, labels | None | Georgia Bold temporary fallback |
| 400 italic | Editorial industry headline | None | Georgia Italic temporary fallback |

No current need for 500/600 or bold italic was found. Rendered style inventory at 390px contains 137 regular, 103 bold and five italic elements; this is a snapshot of current DOM, not a font licence inventory.

## Verified acquisition path, not integration approval

Official Google Fonts repository lists complete variable upstream **TTF** files `NotoSerif[wdth,wght].ttf` and `NotoSerif-Italic[wdth,wght].ttf`; weight axis 100–900 and width 62.5–100. Metadata identifies NotoSerif-v2.015 and source commit `c4a321e123e4d4ff315f57f4e0adf294fe3a95be`. These upstream files have **not been downloaded, hashed or approved for this project**. No complete WOFF2 delivery has been verified locally.

Evidence checked 18 November 2026: [official family directory](https://github.com/google/fonts/tree/main/ofl/notoserif), [font metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/notoserif/METADATA.pb), [SIL Open Font License 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/notoserif/OFL.txt). OFL permits embedding and conversion subject to its conditions; retain copyright/licence and review naming conditions if creating a modified build. No paid font purchase is assumed necessary. Do not redistribute PDF subsets.

## Metrics and future verification

Current Georgia geometry is recorded per viewport and form label in `inventory.json`. At 390px each hero headline line occupies a 350 × 92px box (40px type, 46px line height); supporting copy occupies 350 × 84px. This baseline does not quantify a Noto-versus-Georgia metric difference: no approved Noto binary was rendered. Georgia/Times New Roman also vary by installed platform. Font loading may change wrapping, block height, line breaks and anchor offsets; loading performance and CLS must be remeasured.

| ID / priority | Current status and evidence | Owner / approval | Proposed resolution | Risk | Required verification |
|---|---|---|---|---|---|
| F01 / P1 | Missing complete local faces; inventory shows Georgia | Brand owner approves exact complete family/version and delivery; engineer packages afterwards | Obtain verified upstream assets, pin hashes, retain licence, approve normal width and static/variable WOFF2 strategy explicitly before installation | Medium: reflow and visual identity | Inspect tables, weights/styles, Unicode including Ö/credits, licence; compare PDF; confirm no synthetic styles |
| F02 / P1 | Noto layout and font-loading behaviour untested | Frontend and accessibility QA after F01 approval | Capture Georgia baseline then approved-font comparison; determine swap/metric overrides from measured files, not invented percentages | Medium: overflow/CLS | Header/dropdown/mobile dialog; H1/CTA/caption; introduction; solution selector/panels; industry titles; advantage accordion; mission/vision/values; quotation labels/errors/18rem grid/draft; footer, anchors; 320–1920px, 200% text, 400% browser zoom, reduced motion |

Retain Georgia now. This report proposes an acquisition path for explicit future integration approval; it does not approve or install fonts.
