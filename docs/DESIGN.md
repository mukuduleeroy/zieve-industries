# Phase 0 design system

## Evidence

Source: `../Zieve_Industries_Executive_Premium_Company_Profile(1).pdf`, 12 physical pages. Page numbers throughout this repository include the cover. Extracted text is retained in `profile-extracted.txt`. PyMuPDF 1.26.5 inspected embedded font tables, text span colours and vector fills. It was installed in a temporary tooling directory, not as an application dependency.

Text fonts identified: `BAAAAA+NotoSerif-Bold`, `CAAAAA+NotoSerif-Regular`, `DAAAAA+NotoSerif-Italic`. `EAAAAA+OpenSymbol` supplies bullets. These are embedded subset names. The cover is raster artwork; its lettering has no independently verifiable font metadata. Do not extrapolate a new sans-serif brand family from it.

Typography status: family identification verified for PDF text; production webfont delivery pending. CSS requests Noto Serif, then explicitly falls back to Georgia and Times New Roman. This fallback is temporary and not an approved replacement. Obtain licensed complete Noto Serif regular, bold and italic WOFF2 files, add local `@font-face` declarations with `font-display: swap`, and compare against the profile. Do not redistribute extracted PDF font subsets.

The logo is the original 627 × 294 JPEG embedded as PDF image xref 386, extracted without alteration to `public/branding/zieve-logo-profile.jpeg`. Its white background and compression are retained. Obtain an approved vector master and dark-background/monochrome variants before production. Do not redraw it or recolour its pixels to match CSS tokens.

## Tokens

`src/design-system/tokens.css` is the single CSS token source, exposed to Tailwind v4 through `@theme`.

| Token group | Values / basis |
| --- | --- |
| Brand | Navy #0B2233; amber #F2A21A; ochre #C98210, from PDF text/vector metadata |
| Text | Ink #263746; muted #66727D; white #FFFFFF, from text metadata |
| Surface | #F5F7F8, from PDF vector fill |
| Border | #D5DDE2, derived UI support colour, not a claimed brand colour |
| Typeface | Noto Serif; temporary Georgia / Times New Roman fallbacks |
| Sizes | Display 2.5–4.5rem; title 1.875–3rem; subtitle 1.25–1.5rem; body 1–1.125rem; label .75rem |
| Spacing | .25rem base; gutter 1.25–4rem; section 3–6rem |
| Containers | Content 76rem; reading 46rem |
| Grid | 12 columns; 1–2rem gap |
| Borders/radii | 1px; .125rem and .5rem |
| Breakpoints | sm 40rem; md 48rem; lg 64rem; xl 80rem |
| Timing | 180ms interaction; 650ms reveal; 850ms image; cubic-bezier(.22,1,.36,1) |

The layout scales, spacing, radii and timing are new implementation decisions; they are not measurements from the PDF. Motion numerical tokens live in `motion.ts`; keep equivalent CSS durations aligned when changing the motion system. Amber is an accent; navy carries text on amber. Do not use amber for body copy on white.

## Accessible foundations

Semantic headings retain explicit levels independently from visual size. Buttons default to `type="button"`; links handle navigation. Native details/summary offers a keyboard-operable menu primitive. Skip navigation targets a focusable main landmark. All controls have focus indicators. Image alt text is mandatory; use an empty string only for decorative media. Native Next Image width/height or a correctly sized fill parent prevents layout shifts.

Animations are optional. Reduced-motion support exists in both Motion and GSAP; content remains present without animation. Do not combine both engines on the same element. No animation is automatically applied to UI primitives. The Phase 0 specimen does not use entrance animations. Section 02 adds an opt-in, progressively enhanced hero entrance; its text remains visible without JavaScript or with reduced motion.

## Outstanding visual assets

Approved vector logo and alternate treatments; full licensed Noto Serif webfonts; verified cover typeface if it will be used as editable web text; owned equipment/facility/team photography; image rights and captions; approved video/poster assets if later required. Existing profile imagery is explicitly illustrative/editorial and must never be described as a Zieve facility. No company photos or imagery have been invented.


## Section 02 hero treatment

The hero uses the existing navy, amber and paper tokens exclusively. The first tagline line is paper and the second amber over a dark navy overlay. Existing display/body/label tokens, container gutters and border radii are retained. Large right-weighted original equipment linework reserves space for future approved photography; it is not a company image. Photo crops can differ below the existing md breakpoint. The header stays on its existing readable light surface, above the hero.

The hero overrides generic Section padding, then manages its own editorial spacing and minimum viewport height. Small/short screens grow naturally to fit the two CTAs; there is no fixed text container or forced clipping. Asset layers are absolute and logo/image dimensions are reserved. A minimal scroll hint runs twice and then rests. There is no continuous background movement, scroll-jacking, scaling or parallax. Reduced motion disables the entrance, hover displacement, scroll hint and optional video playback.


## Section 03 editorial introduction

The light surface begins immediately after the hero with a thin existing border colour; no overlapping panels are used. A six-column narrative and five-column portrait image leave one column of whitespace at desktop, then stack in content-first order below lg. Existing title/body/label tokens preserve the verified serif strategy. The closing statement sits below a short amber divider; a small amber image-corner detail ties the visual to the brand without implying a company photograph.

The existing schematic is displayed in a reserved 5:6 frame with a truthful illustrative caption. Fine-pointer desktop parallax translates only ±12px inside a clipped, overscanned frame. One-time reveals remain opt-in, and reduced-motion/no-JavaScript states present the complete static editorial section.


## Section 04 interactive industrial portfolio

A dark navy section follows the light introduction. Paper/amber serif heading lines and thin dividers connect the editorial identity to a five-division selector and large visual. Desktop uses an asymmetric 5:7 list/panel composition; below lg a native select sits above the same visual panel. Active rows use an amber indicator and subtle paper tint. Photography/illustrations have a stable frame and visible provenance caption.

Motion uses existing tokens: one-time heading/row entrances, a restrained active indicator and incoming mask/fade/text updates. There is no carousel timer or pinned scene. Reduced motion makes selection immediate. Intrinsic text sizing across overlapping panels and reserved media proportions avoid selection-induced layout shifts. Each division has a distinct, explicitly illustrative schematic until approved photography is supplied.


## Section 05 sequential sector editorial

The light industry opening follows the navy interactive portfolio, then four full-width sector panels establish a different rhythm: oversized serif numbering, industry names and contextual text paired with large 4:3 visuals. Desktop alternates visual left/right; below lg, content precedes imagery. Paper/surface variations and one navy manufacturing panel use only existing brand tokens. Links are underlined text categories rather than cards or another selector.

Original sector schematics remain explicitly illustrative until approved photographs arrive. Stable media frames, lazy responsive loading and clipped overscan avoid layout changes. One-time reveals and restrained ±10px desktop parallax share the existing motion timing and reduced-motion strategy. No pinning or new sticky positioning is used.


## Section 06 architectural operating pillars

A disciplined navy typography-led section follows the light agro-processing panel. Six columns of introduction and five columns of numbered accordion rows use the established asymmetric grid, serif hierarchy, paper text and amber accents. There are no feature cards or decorative images. Below lg, the editorial introduction and closing phrase precede the rows. Thin rules, consistent title insets and generous controls support clear reading and keyboard focus.

The first pillar is open consistently across breakpoints. User-driven expansion follows natural document flow, with restrained fast height/opacity transitions and a plus rotation. The one-time heading/row/divider reveal shares existing timing tokens. Reduced motion removes timed transitions, and no persistent or pinned effects are used.


## Section 07 corporate purpose

Three typographic movements provide a calm counterpart to the operating-pillar accordion. Navy/paper vision text uses a large existing serif title scale with a small amber label and understated linework. Mission shifts to the light surface and a readable asymmetric text passage. Values use a paper, finely ruled five-part sequence, with intermediate columns and a content-first mobile stack. No cards, accordion, carousel or new imagery is used.

The original Noto Serif/Georgia strategy, navy/amber/paper tokens, container widths, responsive sizes and spacing remain intact. One-time vision/mission/value entrances and amber divider reveals use existing motion timing, with a fully static reduced-motion/no-JavaScript baseline. All text remains in normal flow to preserve geometry.


## Section 08 quotation and partnership

A navy editorial/contact column and light form surface create a 5:7 asymmetric desktop composition, then stack in reading order below lg. Existing serif/colour/container/spacing tokens remain unchanged; subtle industrial CSS linework needs no new assets. Fields are full-width on phones, optionally paired on larger screens, with clear required/optional labels, 16px input text and reserved error space. Error borders use amber/ochre accents with explicit navy text rather than a new colour family.

The primary action prepares a reviewable email draft; a separate native link opens the email application. Long enquiries use a complete copy/select summary. The form has no animated layout or automatic focus/keyboard opening, and its entrance is cancelled on interaction. Reduced motion is static. Header/hero quote links reuse a stable named form anchor with sticky-header spacing.


## Section 09 closing composition

The footer uses the established white paper/navy/amber palette and original JPEG logo, a fluid display-size editorial tagline, fine divider, three desktop navigation/contact columns and a wrapping utility bar. Mobile groups stack openly; tablet uses two navigation columns with contacts below. No new font family or token was introduced: despite the brief's sans-serif reference, actual existing navigation uses the documented Noto Serif/Georgia strategy, which is preserved. Link targets reserve 44px height. GSAP enhancement is limited to a subtle entrance and divider reveal, with static reduced-motion rendering and focus-safe cleanup.


## Phase 11A — reflow only

AUD-01 adds emergency word wrapping, wrapping header/modal controls and bounded dropdown space without changing type sizes, brand tokens or breakpoints. The hero caption/scroll footer now participates in normal flow to avoid enlarged-text collisions. Accordion labels/indents adapt through a text-relative container rule only when reading width is insufficient. No photography, fonts or logo assets were replaced. See homepage-refinement/phase-11a for measured normal/enlarged comparisons.
