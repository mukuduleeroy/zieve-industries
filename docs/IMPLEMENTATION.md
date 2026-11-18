# Zieve Industries implementation — through Phase 11A

## Phase 0 baseline (completed previously)

Technical foundations and a local development specimen only. No homepage hero, service showcase, Section 01, production content pages, backend or deployment has been implemented. Future section work requires explicit instruction. The approved project structure should be retained; brand asset verification remains open.

## Created files

- Root configuration: `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `README.md`.
- App: `src/app/layout.tsx`, `page.tsx`, `globals.css`; reserved route directories with `.gitkeep` files.
- UI: `src/components/ui/primitives.tsx`.
- Navigation: `src/components/layout/navigation.tsx`.
- Motion: `src/components/motion/provider.tsx`, `reveal.tsx`, `src/hooks/use-scroll-reveal.ts`.
- Design: `src/design-system/tokens.css`, `typography.css`, `motion.ts`.
- Content: `src/content/company.ts`, `services.ts`, `industries.ts`, `navigation.ts`, `contact.ts`, `source.ts`.
- Shared: `src/types/content.ts`, `src/lib/cn.ts`.
- Assets: `public/branding/zieve-logo-profile.jpeg`; reserved image/video/icon directories with `.gitkeep` files.
- Tests: `tests/content.test.ts`, `tests/e2e/foundation.spec.ts`.
- Documentation: `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, `IMPLEMENTATION.md`, `profile-extracted.txt`.

The company profile PDF was supplied by the user and retained without modification. Generated `.next`, browser downloads and test reports are not source assets.

## Installed packages

Runtime: Next.js, React, React DOM, GSAP (ScrollTrigger bundled), Motion for React, Lucide React, React Hook Form, Zod and `@hookform/resolvers`.

Development: TypeScript, Node/React/React DOM types, Tailwind CSS v4, `@tailwindcss/postcss`, ESLint, `eslint-config-next`, Vitest and `@playwright/test`. Exact resolved versions are recorded in `package-lock.json`. No Three.js or additional UI framework installed.

PyMuPDF and Chromium are temporary verification tools outside the app directory, not runtime dependencies.

## Verification

- ESLint: passes without warnings after fixing the PostCSS export.
- Strict TypeScript: passes.
- Vitest: 3 tests pass (division/source integrity, preserved contact and values, live navigation scope).
- Production Next.js build: passes, statically prerenders `/` and the framework not-found route.
- Playwright: 4 tests pass across desktop Chromium and an emulated iPhone viewport. Checks cover skip-link/main focus, responsive overflow, successful logo loading, anchor navigation, client errors and visible content under reduced motion. Desktop and mobile screenshots were captured in ignored `test-results/` artifacts and visually reviewed. These are smoke checks, not a full WCAG audit or cross-browser certification.

The initial sandboxed build was blocked by Turbopack’s local worker port restriction. The same standard build succeeded with approved execution outside the sandbox. Dependency and browser downloads also required network permission. No source workaround or weakened checks were used.

## Remaining requirements

Obtain approved vector logo variants, complete licensed Noto Serif WOFF2 files, cover font identity if needed, and rights-cleared photography/video with ownership and editorial captions. Confirm the profile’s “Miton Park” spelling. No invented imagery is included.

At the Phase 0 handoff, the architecture, typed content and component/motion foundations were ready; brand typography delivery and final visual assets remained pending. Section 01 work, subsequently authorised by the user, is recorded below.


## Section 01 — premium navigation and header

### Scope and resulting behaviour

Implemented the shared responsive header only. The foundation specimen remains the homepage; no hero, company introduction, service showcase or Section 02 content was built. The extracted logo, navy/amber tokens and Noto Serif/Georgia strategy remain intact. No packages were added or changed.

Desktop displays the logo, Home, About Us, Our Solutions, Industries, Why Zieve, Contact and the amber Request a Quote link. The Solutions disclosure derives all five entries from the existing service content. Its first label now uses the exact “Earthmoving & Construction Equipment” wording from profile page 5. An additional overview link reaches `/solutions`.

Request a Quote opens the profile's email address with a prefilled subject. This is a functional email action, not a quotation form or submission backend. About, Solutions, Industries, Why Zieve, Contact and the five solution routes have minimal development-status pages to avoid 404 navigation. They contain only the destination title and a development notice; they are not completed company sections. Unknown solution slugs still return 404.

### Files created

- `src/components/layout/site-header.tsx`: shared sticky header with current-route semantics, passive scroll listener and measured anchor offset.
- `src/components/layout/header.css`: responsive, token-based header styles and reduced-motion-compatible transitions. Imported through `globals.css` after Tailwind so cascade layers retain their intended order.
- `src/components/layout/brand-link.tsx`, `quote-link.tsx`: shared logo and CTA rendering.
- `src/components/layout/solutions-disclosure.tsx`: desktop button and link panel.
- `src/components/layout/mobile-navigation.tsx`: full-height native modal with a scrollable navigation area, persistent close/logo area and persistent quote CTA.
- `src/components/layout/route-status.tsx`: small shared development destination.
- `src/types/navigation.ts`: link/group navigation contracts.
- `src/app/about/page.tsx`, `solutions/page.tsx`, `solutions/[slug]/page.tsx`, `industries/page.tsx`, `why-zieve/page.tsx`, `contact/page.tsx`: route wiring only.
- `tests/header.test.ts`, `tests/e2e/header.spec.ts`: component/content contracts and interaction coverage.

### Existing files changed

- `src/app/layout.tsx`: mounts the header globally after the skip link.
- `src/app/page.tsx`: removes the old development header; existing main content is retained.
- `src/app/globals.css`: imports header styles in the correct layer order.
- `src/content/navigation.ts`: single canonical route/navigation source and contact-derived quote action.
- `src/content/services.ts`: source-backed first service label expanded as requested.
- `src/components/layout/navigation.tsx`: reuses and re-exports the shared navigation item type.
- `tests/content.test.ts`: preserves the content checks and updates the navigation invariant for the implemented route registry.
- `playwright.config.ts`: uses test port 3100 to avoid interrupting the existing local server on port 3000.
- `docs/ARCHITECTURE.md`, `docs/CONTENT.md`, this file: current route and interaction documentation.

### Interactions completed

- Desktop click, Enter and Space disclosure activation; Tab through standard links; ArrowDown shortcut to the first solution; Escape closes and restores trigger focus.
- Outside-pointer and focus-departure dismissal; disclosure reset after navigation.
- Mobile native modal background inertness, initial Close focus, explicit first/last Tab wrapping, Escape cancellation, close control and link dismissal.
- Native details/summary Solutions expansion on keyboard and touch; submenu resets between openings.
- Body scroll locking, scrollbar compensation and style restoration on close/unmount; modal release when resizing to desktop.
- Safe-area padding, independent menu scrolling, persistent mobile controls and active-route indicators.
- Stable header geometry; initial light surface and solid white scrolled surface with restrained shadow; automatic offset for skip/anchor targets.
- Reduced-motion override from the existing design system; no new animation or scroll dependency.

### Verification

- `npm run lint`: passed without warnings.
- `npm run typecheck`: passed; production build also checks TypeScript.
- `npm test`: 6 tests passed across content and header component contracts.
- `npm run build`: passed; existing and development-status routes prerender successfully.
- `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright npm run test:e2e`: 16 tests passed in the final production-browser run.

The browser suite covers desktop disclosure keyboard/pointer dismissal, mobile focus boundaries and Escape, touch submenu navigation, viewport resizing, body-scroll restoration, source-derived hrefs, HTTP route availability, unknown-service 404s, scroll-state geometry, viewport overflow from 320–1920px and reduced motion. Existing foundation tests are retained. Screenshots are saved under ignored `test-results/` and visually reviewed. Verification uses Chromium with desktop and emulated mobile contexts; it is not a full accessibility audit or physical Safari/device certification.

Initial browser failures exposed a CSS cascade-layer import issue and native dialog Tab-boundary behaviour; both were corrected before final verification. Resize checks wait for the effect cleanup rather than treating CSS visibility as proof that scroll locking has been released.

### Remaining issues and Section 02 readiness

No known blocking header defects remain following the checks above. Licensed Noto Serif webfonts and approved vector logo variants are still outstanding from Phase 0. Quote requests currently require the visitor's configured email application. Content destinations remain explicitly marked development status until their sections are approved.

The shared header is ready to remain in place for Section 02. Section 02 has not been implemented and requires explicit instruction after Section 01 review.


## Section 02 — cinematic homepage hero

### Files created

- `src/components/sections/hero/hero.tsx`: semantic server-rendered hero with the exact brief copy, two CTAs and native section-end anchor.
- `src/components/sections/hero/hero.css`: token-based navy/amber composition, responsive crop/spacing, overlays, CTA treatments, finite scroll hint and optional video control.
- `src/components/sections/hero/hero-motion.tsx`, `src/hooks/use-hero-entrance.ts`: progressive GSAP entrance boundary and scoped cleanup.
- `src/components/sections/hero/hero-action.tsx`: existing Link primitive enhanced with restrained Motion icon hover/focus.
- `src/components/sections/hero/hero-media.tsx`, `hero-image.tsx`, `hero-video.tsx`: labelled placeholder, optimised responsive photography, safe error fallback and dormant optional video support.
- `src/content/hero.ts`, `src/config/hero-media.ts`, `src/types/hero.ts`: separate copy, central media selection and typed asset requirements.
- `public/images/hero/industrial-placeholder.svg`, `README.md`: original schematic and detailed replacement/approval instructions.
- `src/app/development/foundation/page.tsx`: original Phase 0 specimen preserved intact at a development-only route.
- `tests/hero.test.ts`, `tests/e2e/hero.spec.ts`: hero contract and browser coverage.

### Files modified

- `src/app/page.tsx`: replaces the development specimen with the hero only and retains a small development footer. A focusable end marker terminates this section; it is not a later homepage section.
- `src/app/layout.tsx`: uses source-backed company/hero content for title and description; construction no-index metadata remains.
- `src/app/globals.css`: imports hero CSS after the existing header stylesheet, within the established Tailwind layer ordering.
- `tests/e2e/foundation.spec.ts`: runs the existing specimen checks at its new `/development/foundation` route. Assertions and coverage are preserved.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: current design, motion, media provenance and scope documentation.

The Section 01 header files, behaviour and geometry are unchanged. No package or lockfile changes were needed.

### Layout and interactions

Desktop uses a near-full-viewport navy canvas, left-aligned serif typography, amber second headline line, dark gradient overlay, right-weighted schematic equipment and paired CTAs. Mobile retains existing fluid type tokens, allows headline wrapping, stacks touch-sized actions and crops the visual separately. Short screens expand with content rather than clipping it. A native anchor provides a keyboard-operable end-of-hero link without inventing Section 03 content.

The primary CTA uses the canonical `/solutions` route. Request a Quote uses the existing contact-derived mailto action; no backend or quotation form is implied.

GSAP animates the background opacity, staggered headline lines, supporting copy and action entrances once. The module is loaded only when reduced motion is not requested; scoped contexts revert when preferences change or the component unmounts. Content stays visible in SSR and without JavaScript, and an unavailable animation chunk leaves the static hero intact. Motion moves CTA icons by 3px on hover/focus, using existing duration tokens and reduced-motion checks. The scroll hint runs twice and rests. No parallax, heavy scroll effects, scale animations, video or 3D dependency is active.

### Asset status and switching

No approved industrial hero photo/video was present. The default visual is original geometric equipment linework, prominently labelled as a placeholder. It neither depicts a real facility nor claims a particular product/project. No unlicensed stock was downloaded, no company photographs were invented and no external media URL was fabricated.

Replace only `src/config/hero-media.ts` after rights approval. Image mode uses Next Image, responsive sizes, eager/high priority loading and optional mobile art direction. Video mode requires desktop/mobile stills, pauses outside the viewport or hidden tabs, provides a pause/play control, and does not mount its source for mobile, reduced-motion or Save-Data visitors. Video code loads only when configured. These optional branches have component/SSR checks, but final real-media playback, crops, byte budgets and browser behaviour must be verified after approved assets are supplied.

The schematic is retained below configured media for failure recovery. If it also fails, the navy surface, truthful caption, heading and functional CTAs remain. Explicit captioning is retained for illustrative media.

### Verification

Final results: ESLint passes without warnings; strict TypeScript passes; the production build passes; all 11 unit/component tests pass; all 28 Playwright tests pass across desktop and emulated mobile Chromium contexts. Desktop/mobile screenshots were visually reviewed. The development specimen and its original checks remain available at `/development/foundation`. No new packages were installed.

Coverage includes the retained foundation and header checks, exact hero text and one H1, CTA hrefs and navigation, desktop/mobile/short-landscape geometry, viewport overflow, reduced-motion preference changes, failed placeholder requests, JavaScript-disabled content and header/modal integration.

### Remaining issues and Section 03 readiness

Approved industrial photography/video, complete licensed Noto Serif webfonts and vector logo variants remain outstanding. The final cinematic photography treatment is intentionally awaiting approved media; current linework is a development placeholder. The solutions and other content destinations remain Section 01 development-status pages. Quote requests require a configured email application.

The hero/header foundation is ready for Section 03 review and subsequent explicit instruction. No company introduction, solutions showcase, industries section or later homepage content has been built.


## Section 03 — company introduction: Built around uptime

### Files created

- `src/content/introduction.ts`: exact Section 03 brief copy, explicitly sourced to the Executive Summary on physical PDF page 2.
- `src/config/introduction-media.ts`: independent introduction media selection, caption, alt description and desktop/mobile crops. Reuses the existing original schematic by source reference.
- `src/types/editorial-media.ts`: typed placeholder/approved-image contract; approved photographs require an approval reference.
- `src/components/sections/company-introduction/company-introduction.tsx`: server-rendered Section/Container/H2/Text composition with narrative, closing statement and figure.
- `src/components/sections/company-introduction/introduction-media.tsx`: lazy Next Image, stable aspect ratio, controlled crops and accessible media-failure fallback.
- `src/components/sections/company-introduction/introduction-motion.tsx`, `src/hooks/use-introduction-motion.ts`: viewport-aware animation boundary and scoped GSAP/ScrollTrigger cleanup.
- `src/components/sections/company-introduction/introduction.css`: responsive editorial grid, light surface, navy type, amber divider/corner detail and overscan for gentle parallax.
- `tests/introduction.test.ts`, `tests/e2e/introduction.spec.ts`: content/component contracts and browser integration checks.

### Files modified

- `src/app/page.tsx`: mounts the introduction immediately after the existing hero-end anchor and before the development footer.
- `src/app/globals.css`: imports the new section stylesheet within the established layer order.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: records Section 03 layout, source, media and motion decisions.

No header/hero components, copy, dimensions, interactions or existing test assertions were changed. No packages or global design tokens were added or changed.

### Layout implementation

The dark hero ends at the existing focusable hero-end marker, followed directly by a light `surface` section with a thin border. The transition has no overlap, pinning or sticky element. The intro uses the existing responsive Container and Section spacing. At the lg breakpoint, a 12-column grid gives the narrative six columns and the visual five, leaving an intentional empty column between them. Columns align vertically around their centres. Below lg, the complete narrative precedes the visual in both DOM and visual order. Text uses existing serif title/body/label tokens and a restrained reading measure.

The H2 follows the homepage's single hero H1. “01 / WHO WE ARE”, both narrative paragraphs and “Reliable Supply. Real Impact.” reproduce the approved brief. They are an editorial adaptation of the Executive Summary, not additional operating claims. No company statistics, clients, experience claims, certifications or projects were introduced.

### Motion implementation

The section reuses Phase 0 motion timing/distance tokens and the established scoped GSAP pattern. IntersectionObserver arms the animation near the viewport; GSAP and the existing ScrollTrigger module load only when motion is permitted. Eyebrow and H2 entrances, paragraph stagger, image-mask reveal, closing statement and amber divider reveal run once on section entry.

Fine-pointer desktop screens receive a maximum 12px image translation in either direction, driven by ScrollTrigger with a short scrub. A 16px physical overscan on each vertical edge prevents gaps; the image is not scaled or pinned. Touch/mobile layouts do not receive parallax. Preference changes, media-query changes and unmounts revert the relevant contexts/triggers. Async imports are guarded against stale updates and failure. Reduced motion and JavaScript-disabled rendering leave all text, the divider and the image visible and static. Motion's existing site infrastructure remains unchanged; no redundant second animation engine is attached to the introduction's elements.

### Media configuration and accessibility

No approved company photography is available. `introduction-media.ts` selects the existing code-authored excavator schematic with its own portrait crop and an explicit illustrative caption. Its alt text says it is a placeholder and not a Zieve facility. No new stock imagery, fabricated company image or external asset URL was added.

The 5:6 image frame reserves its geometry before loading. Imagery is lazy-loaded below the fold; photographs use Next Image optimisation and responsive sizes. SVG remains a small unoptimised vector. Object positions can be changed in the central config. A failed approved photo falls back to the schematic with its correct alt/caption; if that asset also fails, an accessible named navy placeholder retains the same aspect ratio. Replace config only after rights, description and crops are approved.

### Verification

Final results: ESLint passes without warnings; strict TypeScript passes; the production build passes; all 15 unit/component tests and all 40 Playwright tests pass. The full existing foundation/header/hero suite passed without changed assertions. Desktop and mobile screenshots were captured and visually reviewed; the two layout cases were also rerun successfully with sticky UI hidden only for unobstructed section captures. No packages were installed.

New checks cover source-backed copy, H2/figure semantics and SSR visibility; optimised photo markup; two-column and mobile order; hero-to-introduction geometry; reduced-motion and parallax cleanup; missing-media fallback; responsive overflow; context disposal across navigation; and readable content without JavaScript. All existing foundation/header/hero tests are retained.

### Outstanding issues and Section 04 readiness

Approved introduction photography, licensed full Noto Serif webfonts and vector logo variants remain outstanding from the earlier phases. The current image is explicitly illustrative. Real-photograph crops and delivery sizes must be reviewed once media is supplied. Chromium desktop/mobile emulation does not replace a final physical Safari/device/accessibility audit.

Section 03 is verified and ready for review. Section 04 has not been implemented: no Solutions Showcase, Industries, Competitive Advantage or later homepage sections were built. Continue only after explicit instruction.


## Section 04 — interactive industrial solutions showcase

### Files created

- `src/content/solutions-showcase.ts`: section copy, five source-derived divisions, brief descriptions and profile-derived panel headlines. Names/slugs/source references come from services; destinations come from existing solution navigation.
- `src/config/solutions-media.ts`: individual media and fallback mappings for all five canonical service slugs.
- `src/hooks/use-solution-selection.ts`: controlled selection with validation against the five divisions.
- `src/components/sections/solutions-showcase/solutions-showcase.tsx`: server section shell, eyebrow/H2/supporting statement and no-JavaScript division links.
- `src/components/sections/solutions-showcase/solutions-workbench.tsx`: shared active state, navigation/panel composition and polite selection announcement.
- `src/components/sections/solutions-showcase/division-navigation.tsx`: desktop pressed buttons and compact mobile native select.
- `src/components/sections/solutions-showcase/solution-panel.tsx`: identifier, profile headline, description, accessible detail link and direct Motion transitions.
- `src/components/sections/solutions-showcase/solution-media.tsx`: lazy responsive Next Image, truthful caption and per-division fallback handling.
- `src/components/sections/solutions-showcase/solutions-motion.tsx`: scoped one-time GSAP header/row entrance with observer, preference and unmount cleanup.
- `src/components/sections/solutions-showcase/solutions.css`: navy portfolio composition, active state, responsive selector and stable panel sizing.
- `public/images/solutions/{elution,chemicals,lubricants,consumables}-placeholder.svg`, `README.md`: original illustrative linework and replacement instructions. Earthmoving reuses the existing schematic.
- `tests/solutions.test.ts`, `tests/e2e/solutions.spec.ts`: component/content contracts and browser interaction checks.

### Files modified

- `src/app/page.tsx`: mounts the showcase after the introduction, before the existing development footer.
- `src/app/globals.css`: imports the showcase stylesheet within the existing Tailwind layer order.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: updated scope, source, interaction and media documentation.

No completed header, hero, introduction, primitive or detail-page component was rebuilt. No packages or global design tokens were changed. The development footer is unchanged; no new footer, CTA section or later homepage section was built.

### Desktop interaction

A large five-division list sits beside a cinematic visual panel on navy. The first division is selected by default. Native buttons expose `aria-pressed` and `aria-controls`; click, Enter or Space selects. Arrow Up/Down, Home and End move focus within the list without automatically committing a different choice. The active number, indicator, imagery, profile headline, brief description and detail destination all derive from the same controlled slug. There is no hover-only functionality or auto-cycling.

The panel's short headlines are sourced from the profile: “Built for demanding sites.” (page 5), “Engineered recovery.” (page 6), “Chemistry behind performance.” (page 7), “Protection + uptime.” and “Small components can stop big machines.” (page 8). No brands, pricing, stock claims or new technical specifications were added.

### Mobile interaction

Below lg, a labelled native select replaces the desktop list and sits above the visual. All five divisions remain available, touch targets exceed 48px and selection retains focus. The desktop and mobile controls use the same state, so resizing preserves the active division. The native select supports the platform's keyboard/touch selection behaviour rather than forcing the wide desktop list onto a narrow viewport.

### Animation and layout stability

Existing GSAP/motion tokens govern the section heading and staggered division entrance. Motion handles active-indicator scale, the incoming image mask/fade, description entrance and restrained hover feedback. The two engines own separate elements. GSAP observers/contexts and preference listeners are disposed on unmount; stale async imports are guarded.

Selection updates Motion targets directly without queued exit animations or AnimatePresence waits. Rapid changes resolve to the latest selection. All five text panels occupy the same grid area and contribute to sizing; inactive panels are invisible, aria-hidden and inert. Only active media is mounted. A reserved image ratio and caption allowance prevent panel/section height changes during selection. No pinning, scroll-jacking, 3D or persistent animation was introduced. Reduced motion removes timed/displacement transitions.

### Media architecture

No approved division photographs were available. Each division has a distinct labelled local fallback: excavator, elution columns, chemical vessels, lubricant drums/gears, and consumables/PPE. Four new SVGs are original code-authored illustrations; they are not company photos, inventory records, technical specifications or evidence of projects. No unlicensed stock was downloaded and no external asset URL was fabricated.

Replace the `solutionsMedia` configuration with approved local image entries while retaining `solutionPlaceholders` as the fallback mapping. Image entries require an approval reference, truthful alt/caption and desktop/mobile positioning. Photography uses optimised lazy Next Image; vectors are unoptimised. Inactive media is not mounted. A failed photo switches to its own division schematic; if that fails too, a named static placeholder retains the frame. Final photographic crops and delivery sizes require review when assets arrive.

### Accessibility and navigation

The section is a named landmark with an H2; active division content uses an H3. The homepage retains one H1. Hidden panels are excluded from keyboard and accessibility navigation using inert/aria-hidden and CSS visibility; their links are not prefetched. A polite status announces the selected division without moving focus. Focus outlines and navy/amber/paper tokens are retained. Alt descriptions explicitly state that schematics are not Zieve facilities or inventory photographs. A no-JavaScript list preserves all division links and descriptions.

All Explore Solution links use existing slugs/destinations. Existing development-status detail pages remain unchanged; no full individual solution pages were implemented.

### Verification

- ESLint: passed without warnings.
- Strict TypeScript: passed.
- Production build: passed.
- Unit/component tests: all 20 passed.
- Playwright: all 50 passed, including the full existing Sections 01–03/foundation suite.
- Desktop/mobile screenshots: captured and visually reviewed with sticky UI hidden only during section capture.

New browser checks cover all five divisions, default active state, pointer/keyboard selection, mobile selection and focus retention, rapid selection changes, content/media/number/link synchronization, canonical detail navigation, section-height stability, reduced motion, all five missing-media fallbacks, responsive overflow at 320–1440px, active-state preservation across breakpoints and exclusion of inactive links from interaction. Tests use Chromium desktop and emulated mobile contexts; they are not a full assistive-technology or physical-device audit.

### Outstanding issues and Section 05 readiness

Approved division photography, full licensed Noto Serif webfonts and vector logo variants remain outstanding. The current visuals are explicitly illustrative. Existing detail destinations remain development status until those pages are approved.

Section 04 is verified and ready for review. Section 05 has not been implemented. No Industries, Competitive Advantage, Mission & Vision, CTA section, new footer or full Solutions detail page was built. Continue only after explicit instruction.


## Section 05 — industries we serve

### Files created

- `src/content/industry-experience.ts`: four approved sector narratives, editorial application headlines, government/public procurement context, relevant solution links and PDF source references.
- `src/config/industry-media.ts`: four sector-specific local illustration configurations and independent fallback entries, with alt descriptions, captions and crop positions.
- `src/components/sections/industry-experience/industry-experience.tsx`: server section shell, semantic H2 and ordered sequence of four sector panels.
- `src/components/sections/industry-experience/sector-panel.tsx`: content-first editorial panel with oversized number, H3 industry name, operational headline/context, relevant category links and visual.
- `src/components/sections/industry-experience/industry-media.tsx`: lazy responsive Next Image, reserved frame and accessible two-stage media failure handling.
- `src/components/sections/industry-experience/industry-motion.tsx`: per-heading/panel viewport enhancement with scoped GSAP/ScrollTrigger cleanup, guarded asynchronous imports and reduced-motion handling.
- `src/components/sections/industry-experience/industries.css`: alternating desktop composition, tablet/mobile stack, surface variations, numbering and image treatment.
- `public/images/industries/{mining,civil,manufacturing,agro}-placeholder.svg`, `README.md`: original labelled sector line illustrations and media replacement guidance.
- `tests/industries.test.ts`, `tests/e2e/industries.spec.ts`: content/component contracts and browser layout/motion/accessibility/fallback coverage.

### Files modified

- `src/app/page.tsx`: mounts Section 05 after the Solutions Showcase and before the unchanged development footer.
- `src/app/globals.css`: imports the industry stylesheet in the established Tailwind layer order.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: current sector, media, architecture and design documentation.

Existing Sections 01–04, the Phase 0 industry summary, navigation, detail destinations, primitives, tokens and package files are unchanged. No completed component was rebuilt, and no new dependency was installed.

### Layout implementation

Four sequential sector panels replace the selector pattern with an editorial reading experience. The light section opening follows the dark Solutions Showcase directly, without overlap or sticky effects. At lg and above, five columns of copy alternate with six columns of visual, with an empty grid column between them. Explicit row placement preserves the alternating layout. An ordered content-first DOM remains identical on every screen.

Below lg, including tablets, the complete industry name, headline, context and relevant categories precede the image. Existing container/gutter/section spacing and serif tokens are retained. Mining opens on paper; civil works uses the light surface; manufacturing introduces navy/paper contrast; agro-processing returns to paper. Oversized 01–04 identifiers and short amber dividers establish rhythm without adding statistics.

### Content and navigation

The four categories and operational narratives reproduce the user's brief and are referenced to profile pages 3–8. Manufacturing and agro-processing are presented separately from the profile's combined overview label, as requested. Government agencies/public infrastructure procurement are explicitly acknowledged within civil construction, not presented as named customers or contracts. The sector-specific subheadlines are editorial application summaries, not performance claims.

Relevant product links derive from the canonical solution division names/routes. They are native keyboard-operable links with visible focus and touch-sized targets. Existing development-status solution pages remain unchanged. No full industry detail page or invented route was created.

### Motion behaviour

The existing GSAP/ScrollTrigger stack and Phase 0 timing tokens drive one-time section heading/content entrances, image-mask reveals, oversized number entrances and divider reveals. Each panel arms independently near the viewport, so distant panels do not initialise effects at page load. Fine-pointer desktops receive only ±10px of image translation, with 14px overscan to avoid exposed edges. No scaling, pinning, auto-advance or scroll-jacking is used.

Contexts, media queries, observers and preference listeners clean up on unmount; generation guards prevent stale asynchronous animation setup. Reduced motion restores visible text, unmasked images and untransformed numbers/dividers. The server baseline is also fully readable without JavaScript. The existing site's Motion infrastructure remains intact; a second animation engine is not attached to the same industry elements.

### Media configuration

There is still no approved sector photography. Four original geometric scenes distinguish mining/ore handling, bridge/civil works, manufacturing process operations and grain/agro-processing. They are clearly captioned as illustrative, and alt text explicitly excludes Zieve project/facility/customer provenance. No unlicensed photography was downloaded or external media URL fabricated.

`industryMedia` can be replaced entry by entry with approved local photographs while `industryPlaceholders` remains independent. The existing editorial media contract requires image approval references and accurate descriptions. Next Image lazily optimises photographs and uses responsive sizes; SVGs remain small vectors. The 4:3 frame is reserved before loading. Media errors recover to the appropriate sector illustration, then to a named static placeholder without collapsing the frame. Final real-photo crops and byte sizes require review after assets arrive.

### Verification

Final results: ESLint passes without warnings; strict TypeScript and the production build pass; all 24 unit/component tests and all 62 Playwright tests pass. All existing Section 01–04 regression assertions are retained unchanged. Desktop and mobile section captures were visually reviewed with sticky UI hidden only during screenshot capture. No dependencies were added. New browser checks cover all four narratives and government context, canonical solution links, H2/H3 hierarchy, alternating desktop layout, content-first mobile/tablet order, section transition geometry, responsive overflow, reduced-motion preference cleanup, bounded parallax and navigation cleanup, all four failed illustrations, and JavaScript-disabled content. The entire existing regression suite remains included without altered assertions.

### Outstanding issues and Section 06 readiness

Approved industry photographs, complete licensed Noto Serif webfonts and vector logo variants remain outstanding. The line visuals are explicitly illustrative. No claim of named customers, completed projects, certifications or industry performance metrics has been introduced. Verification uses desktop and mobile-emulated Chromium, not a complete physical-device/assistive-technology audit.

Section 05 is verified and ready for review. Section 06 has not been built. No Competitive Advantage, Mission & Vision, quotation CTA, new footer or full industry detail pages were implemented. Continue only after explicit instruction.


## Section 06 — the Zieve advantage: five operating pillars

### Files created

- `src/content/advantage.ts`: typed `OperatingPillar` records and exact Section 06 brief copy, referenced to physical PDF page 10.
- `src/hooks/use-pillar-accordion.ts`: validated, functional single-open/null state with the first pillar initially open.
- `src/components/sections/zieve-advantage/zieve-advantage.tsx`: server section shell, two-line H2, supporting copy, closing statement and no-JavaScript text fallback.
- `src/components/sections/zieve-advantage/pillar-accordion.tsx`: accordion composition and optional Arrow/Home/End focus movement.
- `src/components/sections/zieve-advantage/pillar-row.tsx`: semantic H3/button, ARIA relationships, Motion height/opacity transition and rotating plus indicator.
- `src/components/sections/zieve-advantage/advantage-motion.tsx`: scoped one-time heading/row/divider entrance with reduced-motion, focus and unmount guards.
- `src/components/sections/zieve-advantage/advantage.css`: typography-led navy composition, responsive grid, numbered divider rows, focus and hover states.
- `tests/advantage.test.ts`, `tests/e2e/advantage.spec.ts`: source/component contracts and accordion/accessibility/responsive browser coverage.

### Files modified

- `src/app/page.tsx`: appends Section 06 after the Industries experience and before the existing development footer.
- `src/app/globals.css`: imports the scoped section stylesheet in the established Tailwind layer order.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: records the layout, content, motion and accordion behaviour.

Sections 01–05, existing primitives, navigation, global design tokens and package files are unchanged. No media assets, backend, new package or detail page was added. The existing development footer was not redesigned or replaced.

### Desktop and mobile layout

The navy section follows the final light industry panel. At lg and above, the editorial introduction spans six columns and the five operating-pillar rows span five, separated by an empty column. Thin dividers and restrained amber identifiers replace cards or imagery. Heading and supporting text keep the existing Noto Serif/Georgia strategy and central type/spacing/container tokens.

Below lg, including tablets, the introduction and closing statement come first, followed by the accordion. Rows have at least 88px initial touch targets; descriptions expand in normal document flow with a readable inset aligned to their titles. No columns are compressed onto narrow screens.

### Accordion behaviour

The first pillar is expanded by default on every viewport. This deliberate shared SSR/client state avoids media-query defaults and hydration shifts. A single `openId` controls all five panels; selecting another closes the previous one, and selecting the current pillar permits an all-collapsed state. Functional state updates handle rapid toggles without stale closures.

Native buttons support mouse, Enter and Space. Optional Arrow Up/Down, Home and End keys move focus between triggers without activating a different pillar; Tab remains native. Trigger nodes persist through state changes, preserving focus. Descriptions contain no interactive controls, and collapsed regions are additionally inert/aria-hidden with clipped zero height. There are no scroll-to calls, auto-advance, pinned scenes or focus-transfer callbacks. User-initiated expansion changes document height naturally; initial server geometry already reserves the default open description.

### Motion implementation

GSAP handles only the heading/supporting/closing entrances, staggered outer rows and amber divider. IntersectionObserver starts this once in view; generation/disposal guards prevent stale async setup, and scoped contexts/listeners are reverted on preference changes or unmount. If focus is already inside the section, the entrance does not hide/move the focused control.

Motion handles only the panel height/opacity and plus rotation with the existing fast timing token. Panels remain mounted, and direct animation targets retarget ongoing transitions; no queued exits, delayed state changes or completion callbacks can re-open a stale panel. Reduced motion uses zero-duration accordion transitions and a static entrance. No new animation package or media dependency is required. Static descriptions remain available in the no-JavaScript fallback.

### Accessibility and content

The named section has an H2; each accordion trigger is inside an H3. Every button's `aria-controls` identifies its panel, each region's `aria-labelledby` identifies its trigger, and `aria-expanded` reflects the single controlled state. Closed regions are aria-hidden/inert and cannot expose focusable descendants. Focus outlines use existing amber on navy; numbering, titles and descriptions retain high-contrast paper/amber treatments.

All five titles and the closing phrase trace to page 10. Descriptions and introduction reproduce the user's approved, restrained adaptation. The profile's stronger guarantee language is not introduced; no certification, testimonial, delivery metric, contract value or performance statistic was invented.

### Verification

Final results: ESLint passes without warnings; strict TypeScript and the production build pass; all 27 unit/component tests and all 74 Playwright tests pass. The entire existing Sections 01–05 suite passed without altered assertions. Desktop/mobile screenshots were captured and visually reviewed with sticky UI hidden only during capture. No packages or assets were added. New browser coverage verifies five official pillars, default state, expand/collapse, single-expanded state, button focus, keyboard traversal, ARIA controls/labels/inert relationships, rapid retargeting, responsive columns/stacking, touch-sized controls, reduced-motion cleanup and static text without JavaScript. The full existing regression suite remains included without changed assertions.

### Outstanding issues and Section 07 readiness

No additional brand/media asset is needed by this typography-led section. Full licensed Noto Serif webfonts and vector logo variants remain outstanding from Phase 0, and photography remains pending for earlier image sections. Verification uses desktop and emulated mobile Chromium rather than a complete physical-device/assistive-technology audit.

Section 06 is verified and ready for review. Section 07 has not been implemented. No Mission & Vision, quotation CTA, new footer or later homepage section was built. Continue only after explicit instruction.


## Section 07 — mission, vision and core values

### Files created

- `src/content/purpose.ts`: presentation labels, typed numbered values and direct references to the existing canonical company vision/mission/values and page 11 source.
- `src/components/sections/corporate-purpose/corporate-purpose.tsx`: semantic server section combining the three movements in reading order.
- `src/components/sections/corporate-purpose/purpose-vision.tsx`: navy opening, approved section heading, oversized serif vision statement and subtle decorative linework.
- `src/components/sections/corporate-purpose/purpose-mission.tsx`: contrasting editorial mission passage.
- `src/components/sections/corporate-purpose/purpose-values.tsx`: five numbered values in a ruled typographic sequence; no cards or accordion.
- `src/components/sections/corporate-purpose/purpose-motion.tsx`: independently armed, scoped GSAP reveal boundary for each movement.
- `src/components/sections/corporate-purpose/purpose.css`: token-based vision, mission and values layouts with mobile/tablet/desktop adjustments.
- `tests/purpose.test.ts`, `tests/e2e/purpose.spec.ts`: official-content, semantic, reading-order, responsive, motion and static-rendering coverage.

### Files modified

- `src/app/page.tsx`: appends Section 07 after the advantage section and before the unchanged development footer.
- `src/app/globals.css`: imports the new stylesheet in the established Tailwind layer order.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: records the new section and source/design decisions.

Completed Sections 01–06, the original company data, navigation, global tokens, package files and existing assertions remain unchanged. No media asset, backend, new package or later section was added.

### Vision layout

The navy vision movement follows Section 06's navy surface with a fine separating rule. The amber section label and “The standard we operate by.” H2 lead into “Our Vision” and a large serif statement using the existing title scale. A broad but controlled text measure and generous spacing establish the manifesto-like character. Fine CSS-only linework is decorative, aria-hidden, fixed in geometry and non-interactive.

### Mission layout

The mission moves to the established light surface. Desktop places the H3 label/divider beside a generous readable passage in an asymmetric grid. Below lg the label precedes the text in a single column. Existing subtitle/body, container, gutter and section spacing tokens are reused. There is no imagery or card treatment.

### Core values layout

The values movement uses paper with navy titles and ink text. Five values form a horizontal ruled sequence at xl, three columns at tablet/intermediate widths, and a natural numbered stack on small screens. There are no boxes, hover-dependent details, collapsed descriptions or selection controls. Each value uses an H4 and a complete description. DOM order is always Reliability, Integrity, Partnership, Excellence, Growth.

### Corporate content and accessibility

Vision, mission and descriptions reference `company.ts` rather than duplicating business copy. Page 11 wording, including its typographic apostrophes, is preserved. Section labels and the primary heading follow the approved brief. No company history, awards, certifications, partnerships, environmental promises or other unsupported corporate claims were added.

The section is a named landmark with an H2, then H3 headings for Vision, Mission and Core Values, followed by H4 value names. The homepage retains one H1. The ordered list preserves native reading order; decorative numbers/linework are hidden from assistive technology. All content is present and visible in the server response and without JavaScript. No controls or keyboard patterns from Section 06 were repeated.

### Motion implementation

Each movement arms its own one-time GSAP enhancement when visible. Existing reveal/stagger timing tokens govern the vision heading/statement, mission entrance, values stagger and amber divider animation. No ScrollTrigger, pinning, scroll-jacking or 3D is needed. Contexts, IntersectionObservers and preference listeners are cleaned up on unmount; generation guards cancel stale asynchronous setup. If the animation import fails, the static content remains visible.

Reduced motion avoids loading the animation enhancement and restores any in-progress opacity/transform styles. Animations affect only opacity/transforms, so initial document geometry and reading order are unchanged. No media or additional package was introduced; the site's existing Motion infrastructure is preserved without adding a redundant engine to these static elements.

### Verification

Final results: ESLint passes without warnings; strict TypeScript and the production build pass; all 30 unit/component tests and all 84 Playwright tests pass. The full Sections 01–06 regression suite passed without altered assertions. Desktop/mobile captures were visually reviewed with sticky UI hidden only during capture. No package or media asset was added. New checks cover page 11 source agreement, direct canonical-content reuse, all five values, H2/H3/H4 semantics, Vision→Mission→Values order, responsive mission/value layouts, document overflow, reduced-motion cleanup, stable geometry, navigation cleanup and JavaScript-disabled readability. The entire existing regression suite is retained without changed assertions.

### Outstanding issues and Section 08 readiness

No additional media asset is needed for this section. Licensed full Noto Serif webfonts and vector logo variants remain pending from Phase 0; approved photography remains pending for earlier sections. Testing uses desktop and emulated-mobile Chromium rather than a complete physical-device or assistive-technology audit.

Section 07 is verified and ready for review. Section 08 has not been implemented. No quotation CTA, new footer or later homepage content was built. Continue only after explicit instruction.


## Section 08 — quotation and partnership

### Files created

- `src/content/anchors.ts`: canonical quotation form ID/root anchor used from every route.
- `src/content/quotation.ts`: exact Section 08 editorial copy, page 12 source, existing service categories and industry option labels.
- `src/lib/quotation/schema.ts`: shared Zod validation, typed form values, default values and length limits.
- `src/lib/quotation/submission.ts`: pure email-draft preparation, typed submission adapter boundary and conservative URI-length fallback.
- `src/components/sections/quotation/quotation-section.tsx`: server section shell and editorial/form composition.
- `src/components/sections/quotation/corporate-contact.tsx`: official contact data from the existing company/contact modules.
- `src/components/sections/quotation/form-field.tsx`, `quotation-fields.tsx`: labelled fields, hints, reserved error space, autocomplete and accessible validation relationships.
- `src/components/sections/quotation/quotation-form.tsx`: React Hook Form/Zod integration, safe hydration gate, draft preparation and edit invalidation.
- `src/components/sections/quotation/quotation-draft.tsx`: reviewable summary, explicit native mailto link, clipboard/manual copy fallbacks and truthful status language.
- `src/components/sections/quotation/quotation-motion.tsx`, `quotation.css`: restrained enhancement and responsive navy/light form presentation.
- `tests/quotation.test.ts`, `tests/e2e/quotation.spec.ts`: schema, encoding, SSR safety, form interaction and anchor-navigation tests.

### Files modified

- `src/app/page.tsx`: appends quotation after corporate purpose, before the unchanged development footer.
- `src/app/globals.css`: imports the quotation stylesheet in the established Tailwind layer order.
- `src/content/navigation.ts`: Request a Quote now uses `/#request-a-quote`, replacing the earlier immediate mailto action. Header, mobile and hero presentation reuse this one action automatically.
- `tests/header.test.ts`: updates only the old mailto-specific assertion to the new requested form-anchor contract. Existing navigation, menu and presentation checks remain intact.
- `docs/DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, this file: current form, navigation, data and integration documentation.

No package/lockfile changes, backend endpoint, email delivery service, admin dashboard, complete Contact page or new footer were introduced. Earlier section designs and menu behaviour remain unchanged. Earlier checkpoint notes about an immediate quote email link describe the historical state; Section 08 supersedes that destination.

### Desktop and mobile layout

The asymmetric navy editorial column uses the approved heading/supporting sentence, official address, telephone and email, plus subtle CSS-only linework. The light form panel sits alongside it at lg and above. Below lg, contact/editorial content comes first, then the full-width form. Fields use a comfortable intermediate two-column arrangement when space allows and single-column mobile flow. No fixed viewport-height form or keyboard-trapping overlay is used. Existing serif, navy/amber/paper, spacing and container tokens are retained.

### Fields and validation

Required: full name, email, product/service category and requirements/project description. Optional: company/organisation, telephone/WhatsApp, industry and delivery/project location. The five categories derive from services. Sector choices reuse existing typed sectors where possible, with the requested Mining label, Government/Public Sector and Other choices.

Limits: name 120, email 254, company 160, telephone 60, location 200 and requirements 4,000 characters. Required values are trimmed; email format and category/sector membership are checked. Single-line fields reject control characters, while requirements preserve normal multiline text. Validation begins on submit, then invalid fields revalidate as edited. Inline messages have programmatic descriptions; errors do not clear the form, and the first invalid field receives focus. Empty error lines reserve space to minimise feedback-induced reflow. No new error colour was invented.

### Email handoff

This checkpoint deliberately uses two explicit steps:

1. **Prepare enquiry email** validates locally and creates a reviewable draft/summary.
2. **Open email application** is a real, user-activated mailto link. The visitor must inspect and send the email manually in their application.

The preparation adapter has no transport or delivery side effects. It derives the recipient from `contact.ts`, uses canonical category/sector labels, builds a structured subject/body and percent-encodes the entire subject and body. Multiline requirements use CRLF in the email body. No user data is logged, sent to analytics, stored in localStorage or POSTed to this application. There are no API keys or browser-side email credentials.

A complete encoded URI budget of 1,800 characters is a conservative compatibility choice, not a universal guarantee. When exceeded, no long mailto href is rendered: the complete summary is retained for copying into a new email, with recipient and suggested subject clearly shown. Nothing is silently shortened to fit the URI. Copy is also available for short drafts; if clipboard permissions fail, Select summary enables manual copying. A configured mail application is required for mailto, and operating-system/browser/client limits differ even below the budget.

The UI explicitly says nothing was submitted by the website. It never claims submission, receipt or delivery, and opening the mail client never clears the fields. Editing any field invalidates a prepared draft so its link cannot become stale. Revision checks discard an asynchronous preparation result if the visitor edits while it is pending. The submit control stays focusable while marked busy, preventing focus loss during preparation. Data remains only in page memory and is lost on a reload/navigation; no persistence guarantee is made.

Before hydration and without JavaScript, the fieldset is disabled so an unhandled native GET cannot place personal enquiry data in the URL. A no-JavaScript explanation and the direct official contact links remain available.

### Header/hero integration and motion

Header, mobile-menu and hero quote CTAs now use the shared root form anchor. This works from the homepage and existing detail/status routes. The named form is a valid anchor target with a programmatic title and `tabIndex=-1`; there is no autofocus or scripted focus transfer to the first field, avoiding an unexpected mobile keyboard opening. The existing measured document scroll-padding handles the sticky header; an additional form scroll-margin gives breathing room. Menu close/focus/scroll-lock logic was not redesigned.

GSAP reveals the heading/supporting text and contact details once near the viewport. The form receives only a short opacity entrance, never translated fields or animated validation layout. If focus is inside, animation setup is skipped; focus entering during an entrance reverts it. Reduced motion keeps everything static. Scoped contexts, observers and listeners clean up on preference changes and unmount. Existing CSS timing provides field focus and button hover feedback.

### Accessibility and verification

Named section/H2, named form/H3, explicit labels, required/optional instructions, native input/select/textarea controls, autocomplete, 16px input text, visible focus, aria-invalid and descriptive error IDs are implemented. Status messages describe draft preparation/copy only. Summary text is readonly/selectable, with a manual copy fallback. Responsive tests cover narrow and short viewports without overflow. Mobile results use emulation, not a physical on-screen keyboard/device audit.

Final results: ESLint passes without warnings; strict TypeScript and production build pass; all 35 unit/component tests and all 98 Playwright tests pass. Existing regression checks pass with the one intended quote-destination unit assertion updated. Tests cover official contacts, eight fields, no premature errors, required and email validation, preserved values/focus, valid preparation, structured body/special-character round trips, long-enquiry copying with denied clipboard permission, root/detail/hero/mobile quote anchors, no website POST, responsive/reduced-motion operation and safely disabled no-JavaScript fields. The mailto click is intercepted during QA rather than launching an external application; email delivery is never simulated. Desktop/mobile screenshots were captured and visually reviewed.

### Future secure backend requirements (not implemented)

Before replacing email handoff, agree an owner-approved delivery provider, recipient configuration and data-handling policy. Keep credentials exclusively server-side. Introduce an HTTPS endpoint with server-side use of the shared schema, strict payload/field limits, fixed authorised recipient(s), header-injection protection and safe output encoding. Add origin/CSRF protections appropriate to the chosen endpoint, rate limiting and proportionate abuse protection; never accept an arbitrary email destination from the browser.

Define explicit delivery/preparation result types and truthful UI states before extending the adapter. Add duplicate-request/idempotency handling, bounded timeouts/retries and error responses that preserve entered data. Any provider queue/receipt semantics must distinguish accepted-for-processing from actually delivered. Do not display success solely because a request was attempted.

Define access controls, retention/deletion and redacted operational logging before storing enquiries. Do not log message bodies or personal contact details to analytics. Add server validation, abuse/failure and end-to-end delivery tests, including a controlled test mailbox/provider sandbox. A real integration and production data handling require separate explicit approval; none is configured here.

### Outstanding issues and Section 09 readiness

Mailto relies on a configured external application and cannot verify receipt or delivery. The manual copy route remains available for incompatible clients and long enquiries. The profile spelling “Miton Park” is preserved; earlier typography/logo/photography requirements remain open. No new media asset is needed for this section.

Section 08 is verified and ready for review. Section 09 has not been implemented. The Contact route remains its development-status page; no new footer, backend API, email service, admin UI or later content was built. Continue only after explicit instruction.


## Section 09 — Premium corporate footer

### Scope and file inventory

The homepage development footer is replaced by a modular corporate footer. Earlier homepage sections and inner development-status pages are preserved. No packages, new routes, legal pages, social accounts, external services or backend were added.

Created:
- `src/components/layout/footer/site-footer.tsx`: server layout and named footer landmark.
- `footer-brand.tsx`, `footer-navigation.tsx`, `footer-contact.tsx`, `footer-utility.tsx` in that directory: brand, labelled navigation groups, official contacts and utility bar.
- `footer-motion.tsx`, `back-to-top.tsx`, `copyright-year.tsx` in that directory: isolated client enhancements.
- `footer.css` in that directory: responsive token-based layout and restrained interaction styling.
- `src/content/footer.ts`: typed presentation copy and views over canonical company/contact content.
- `src/lib/copyright-year.ts`: Harare calendar-year calculation.
- `tests/footer.test.ts`, `tests/e2e/footer.spec.ts`: source-rendering, date-boundary and browser checks.

Modified: `src/app/page.tsx`, `src/app/globals.css`, `src/components/layout/brand-link.tsx`, and the four architecture/design/content/implementation documents. BrandLink adds an optional priority flag, defaulting to the existing header behaviour. Footer imagery is lazy and reuses the original extracted JPEG without recolouring or redrawing. Its intrinsic dimensions reserve layout space.

### Layout, content and navigation

The light corporate closing composition retains navy typography, amber accents, a generous editorial brand statement, original artwork and a fine divider. Desktop uses an asymmetric twelve-column brand row followed by primary navigation, solutions and contact columns. Tablet has two navigation columns with contacts below; mobile stacks all groups openly in reading order. No collapsible menus were introduced. The utility bar wraps, then stacks on small screens. The existing maximum-width Container, fluid display/body type, breakpoints and spacing tokens are reused.

The brief mentions an existing sans-serif navigation style, but inspection confirms the approved implementation uses Noto Serif with Georgia/Times fallbacks. That existing strategy is preserved; no new font was introduced. Full licensed webfont delivery remains pending as documented in DESIGN.md.

Company name/tagline derive from company.ts, address/phone/email from contact.ts, all six primary links from navigation, and five solution links from solutionNavigation. The supplied supporting description is preserved exactly in footer.ts; it is approved editorial copy rather than a newly claimed operational achievement. The location label derives from the official address. The profile spelling “Miton Park” is retained.

All internal destinations use established routes/status pages and solution slugs. Request a Quote reuses the Section 08 root form anchor and preserves existing in-memory form values. Telephone/email use the official tel/mailto destinations. The address remains readable plain text; no unverified map coordinates or external map destination were introduced.

### Interactions, performance and accessibility

Back to top is a native anchor to the existing focusable main landmark, progressively enhanced with an explicit focus transfer using preventScroll, a hash replacement and one scrollTo call. Normal motion uses smooth scrolling; reduced motion uses instant scrolling. Modified clicks retain native semantics. Without JavaScript the anchor remains functional. There is no hide/show listener, scroll-jacking or new dependency.

Copyright uses Africa/Harare rather than the build host timezone. A hydration-safe external-store client value refreshes the prerendered year, checks at most daily or at the next local year boundary, and refreshes on visibility return. The timer and listener clean up on unmount. Without JavaScript the build-time year remains; rebuild static output when needed.

An optional, lazily loaded GSAP entrance uses the established reveal/stagger timing, a small vertical offset, opacity and divider scale. Content renders visible by default and remains usable if enhancement fails. Scoped contexts, observers, media-query listeners and focus listeners clean up on unmount/preferences. Focus already in the footer skips animation; focus entering during animation reverts it. Reduced motion is static. Client JavaScript is confined to motion, back-to-top and the year; the content/layout remain server rendered. No additional media downloads were introduced.

The semantic footer has named primary/solutions navigation landmarks, an H2 brand statement, H3 group headings, lists, address markup, descriptive links and an aria-hidden decorative arrow. Existing visible ochre focus outlines are retained. Navy/ink on white and navy on amber preserve the established readable combinations. Links/controls have at least 44px touch height. No new external-window links were introduced.

### Verification

ESLint, strict TypeScript, production build and all 38 unit/component tests pass. The complete browser regression suite passed 110 tests, including the first twelve desktop/mobile footer cases and all previous Section 01–08 checks. A subsequent footer-only run passed all fourteen cases, adding live reduced-motion cleanup, stable geometry and focus-outline checks. Footer checks cover original image loading, exact official contacts, six/five canonical navigation lists, valid detail-route navigation, quotation anchor/value preservation, current year, keyboard back-to-top, normal/reduced scroll behaviour, no-JavaScript navigation, visible focus and widths 320/390/768/1024/1440 without horizontal overflow. Screenshot capture hides the sticky header only in the test image to prevent a viewport-position artefact in tall element captures; production header behaviour is untouched.

Desktop and mobile footer captures are reviewed for alignment, hierarchy, wrapping and spacing. Mobile testing is Chromium device emulation, not a physical device or screen-reader certification. No claim of a complete cross-browser, performance or production accessibility audit is made.

### Outstanding issues and homepage audit readiness

The initial homepage now includes Sections 01–09 and is ready for a dedicated homepage audit and review. Existing release requirements remain: approved complete Noto Serif WOFF2 files, original vector/dark-background logo assets and approved industrial photography (current illustrations remain labelled placeholders), confirmation of the profile address spelling, and completion/approval of development-status inner pages. Indexing remains disabled during development. Quotation email handoff still requires a visitor's email application and cannot confirm delivery; no backend or transport service was introduced.

Section 09 only is implemented. No missing inner/legal pages, new homepage sections or redesigns were undertaken. Stop here for review.


## Phase 11A — critical reflow and discovery fixes

Implemented only AUD-01 and the approved homepage-navigation portion of AUD-02. Existing sections, reserved routes, quotation submission architecture, media configuration/assets, typography tokens and noindex metadata are preserved. Source and evidence inventory, root causes, exact fixes, before/after measurements, mapping, verification and remaining limitations live in [homepage-refinement/phase-11a/IMPLEMENTATION.md](homepage-refinement/phase-11a/IMPLEMENTATION.md), with the release gate in [FINAL_QA_REPORT.md](homepage-refinement/phase-11a/FINAL_QA_REPORT.md). Historical Phase 10 findings remain unchanged. Native browser zoom and assistive-technology validation and pending brand assets still prevent a final public-launch or conformance claim. Stop after this checkpoint for review; Phase 11B needs explicit instruction.

## Phase 11A.5 — conditional photography integration

The final-selection instruction authorizes source-verified approved directions and a documented spares choice, while holding the hero for final visual approval. Six local stock photographs now use the existing media configuration and Next Image components: company introduction (PH02), chemicals (PH05), cleaner neutral fasteners (PH07-B), mining (PH08), manufacturing (PH10) and grain handling (PH11). PH02 is physically cropped to the component, excluding the original worker profile from the public derivative. Visible captions identify illustrative stock and credit contributors/publishers. Native file dimensions, hashes, source-specific licence checks, modification/download terms and intended-use assessments are recorded.

Hero, earthmoving, elution, lubricants and civil remain labelled schematics. Earthmoving's JCB marks and civil's branding/recognizable workers prevent source-specific clearance under the reviewed detailed terms; no silent substitute or blanket release assertion. The user specifically retained elution/lubricants. Two replacement hero crop studies are documentation only: a distant sunrise excavator and a mining shovel with an expressly proposed horizontal reflection. Final hero approval remains required; Google Images access was attempted but unavailable.

Changes are limited to one typed photo map, three media map bindings, six WebP files and relevant unit/browser tests, plus documentation/evidence. Original schematic objects/assets and all production components, CSS, content, header/hero logic, motion, fonts/tokens, logo, navigation, quotation architecture and deployment configuration are preserved. No packages, purchases, permission requests, Phase 11B work or deployment.

Verification and current acceptance limits are consolidated in [Phase 11A.5 readiness](homepage-refinement/phase-11a5/FINAL_READINESS_REPORT.md), with actual five-width screenshots, before/after local laboratory measurements and source/rights registers in the same directory. Historical Stage A reports are archived separately. Small tablet hero/footer startup shifts are recorded; no universal zero-CLS or production CWV claim is made. Stop for final image review.

### Final PH01 — approved R1 hero

The user approved Metehan Özaras's R1 Sunrise Excavator and rejected R2. PH01 now uses two local optimized WebP crops through the existing hero-media configuration, responsive picture/Next Image delivery, high-priority loading and retained schematic underlay/error fallback. The desktop uses the proposed native (0,650,2600,1463) crop at 85% 50%; the refined mobile native (1350,0,1100,1750) crop at 50% 50% keeps the excavator clear of the headline. No mirroring or overlay/typography/layout/motion changes. Source-specific licence, fresh original acquisition and exact asset hashes are recorded in the Phase 11A.5 hero-final evidence. The visible caption credits the contributor and states that this is not a Zieve site.

This checkpoint changes PH01 only. Other media maps and six approved photos, four held schematic placements, content, tokens/fonts/logo, navigation, quotation, inner pages and deployment settings are preserved relative to the checkpoint's hash snapshot. Final screenshots, sampled contrast, local performance, 44 unit tests and 132 browser regressions are consolidated in the updated Phase 11A.5 reports. Native browser-chrome zoom/physical assistive technology are not certified by root-text and CDP magnification checks. Stop here; no deployment or Phase 11B.

## Phase 11B — visual refinement, UX and semantic hardening

Implemented AUD-06 available-width quotation reflow, AUD-05 decorative hierarchy, AUD-12 named draft grouping, AUD-07 restrained small-screen Introduction/Industries pacing, AUD-16 amber Advantage/Vision boundary and the approved mobile-hero visibility/credit refinement. All business content, image files/configs, font/token identity, navigation, form fields/schema/transport and motion behavior are preserved. No dependencies, inner pages, backend, indexing or deployment changes. Detailed baseline/after measurements, screenshots, semantics/contrast and regressions are in [Phase 11B implementation](homepage-refinement/phase-11b/IMPLEMENTATION.md) and [final readiness](homepage-refinement/phase-11b/FINAL_READINESS_REPORT.md). Earlier checkpoints above are historical. Phase 11C requires review and explicit scope approval; public launch is not authorized.


## Phase 11B.5 — targeted homepage experience redesign

Checkpoint A removes six numbered eyebrow DOM nodes and their content fields/stale spacing; semantics/business text stay intact. Checkpoint B researches four remaining photo placements; all retain schematics pending specific rights/creative approval, with Google Images access limitations recorded. Checkpoint C introduces one capability/content-fit-gated horizontal Industries stage through the existing GSAP/ScrollTrigger stack, with CSS sticky geometry, local clipping, normal-flow accessibility fallbacks and owned cleanup. Actual screenshot QA identified lazy transformed-panel loading and pointer-focus click cancellation; current/next near-stage loading and pointer-aware focus handling address them. No source image/token/hero/backend/SEO changes. Phase11C.2A resize polling remains intact. Final commands/results, full file list, screenshots and remaining NO-GO release gates: homepage-refinement/phase-11b5/FINAL_READINESS_REPORT.md and REGRESSION_REPORT.md. No later Phase11C work or deployment.


## Phase 11B.6 — final scoped refinement

Phase11B.6 refines only Industries grouping/order: a real panel-edge divider, shared heading→labelled figure→copy structure and desktop two-row editorial positioning. Existing animation/navigation/image/quotation/brand architecture is preserved; no new photo meets both rights and visual gates. Detailed modified files, matched screenshots/videos,152-case browser verification and local paired performance are in homepage-refinement/phase-11b6/FINAL_READINESS_REPORT.md. No deployment, indexing or Phase11C.2B work.
