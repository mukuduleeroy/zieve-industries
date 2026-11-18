# Architecture

This workspace root is the `zieve-industries` application; no nested project or monorepo is needed. Next.js App Router, React, strict TypeScript and Tailwind CSS v4 form the foundation. Node 22.13+ is recommended for the installed toolchain; verification used Node 26.13.0. Use the committed npm lockfile with `npm ci`.

## Boundaries

- `src/app`: server layout, homepage hero and global styles. The original Phase 0 specimen remains at `/development/foundation` for development checks. Metadata continues to disable indexing while the site is under construction.
- `src/components/ui/primitives.tsx`: Container, Section, Heading, Text, Button, Link and Image. Import named exports directly.
- `src/components/layout/navigation.tsx`: foundational navigation, native disclosure and skip link.
- `src/components/layout/site-header.tsx`: shared sticky header, mounted in the root layout. `solutions-disclosure.tsx` owns desktop disclosure behaviour; `mobile-navigation.tsx` owns the native modal. `brand-link.tsx` and `quote-link.tsx` share artwork and CTA rendering. Styling lives in `header.css`.
- `src/content/navigation.ts`: canonical route registry, shared desktop/mobile navigation and shared quotation form anchor. `src/types/navigation.ts` holds the navigation contracts.
- `src/components/motion`: client-only Motion provider, Reveal and RevealItem.
- `src/hooks/use-scroll-reveal.ts`: optional GSAP/ScrollTrigger hook; registration runs in an effect, scoped contexts revert on cleanup, media queries react to reduced-motion changes.
- `src/design-system`: CSS tokens, typography and numerical motion constants.
- `src/content`: typed, source-referenced static data. No fetching or backend required.
- `src/types`: content contracts. `src/lib`: small shared utilities.
- `src/components/sections/hero`: Section 02 presentation, progressive entrance wrapper, shared CTA interaction and configurable media. Section 03 follows it; later sections remain unimplemented.
- `public`: branding, hero/equipment/processing/industries image directories, videos and icons.
- `tests`: content integrity and browser smoke checks.

Section 01 connects about, solutions, solutions/[slug], industries, why-zieve and contact to minimal development-status destinations. These pages contain no business sections; they avoid broken header links while subsequent content awaits approval. Service slugs are statically generated from typed service data; unknown services return 404. Replace each status page in its existing route directory when that section is approved.

## Motion usage

Wrap chosen content with `<Reveal effect="fade">`, `effect="text"` or `effect="image"`. For staggered groups use `<Reveal effect="stagger"><RevealItem>…</RevealItem></Reveal>`. Reveals run once on viewport entry. For bespoke scroll scenes, call `useScrollReveal<HTMLElement>()`, attach its ref to a wrapper and mark children `data-reveal`. The hook defaults to visible content when reduced motion is preferred. Use one animation engine per subtree and retain cleanup for every future ScrollTrigger timeline.

## Forms and icons

Lucide is available for selected named imports. React Hook Form, Zod and the resolver now power the Section 08 local quotation draft form. No submission endpoint, secrets, analytics or backend is implemented. Server-side validation and transport are separate future work. Three.js is not installed.

## Commands

`npm run dev`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run start`, `npm run test:e2e`.

Playwright tests start a production server on test port 3100 and require a completed build and installed Chromium. `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright` was used during local verification to keep downloaded browser files outside the app. On another machine use `npx playwright install chromium` and omit that environment variable.

## Header interaction model (Section 01)

Desktop uses a disclosure button and ordinary navigation links with native Tab order, not ARIA menu roles. Enter/Space toggle; ArrowDown opens and focuses the first link; Escape closes and restores trigger focus. Outside pointer and focus departure dismiss the panel. Route changes reset disclosure state.

Below the existing xl breakpoint (80rem), a native `dialog.showModal()` provides background inertness and focus containment. Opening focuses Close; Escape/Close/navigation dismiss; closing restores the opener through the native dialog lifecycle. Body overflow and scrollbar compensation are restored on cleanup. A media-query change releases the dialog when resizing to desktop. Native details/summary controls the mobile Solutions group. Dialog padding respects safe areas; the dialog can scroll independently.

A passive scroll listener toggles the header surface at 16px. Geometry remains constant between states. ResizeObserver publishes actual header height for scroll-padding, so skip links and anchors clear the sticky header. CSS-only restrained transitions inherit the existing reduced-motion override. No additional packages or heavy scroll tools are used.


## Hero boundary (Section 02)

`src/content/hero.ts` owns the approved brief copy and source references. It imports canonical routes and the existing email quote action. `src/config/hero-media.ts` selects a typed placeholder/image/video asset; media switching does not require presentation changes. `src/types/hero.ts` makes poster/mobile poster and rights approval metadata mandatory for video.

The server-rendered `Hero` uses existing Container/Section/Heading/Text primitives and server-rendered content slots. Small client boundaries handle the GSAP enhancement, CTA icon interactions and media errors. The GSAP module loads only when motion is permitted, owns a scoped context, and reverts on preference changes/unmount. No ScrollTrigger or parallax is needed for this hero. Motion owns only icon hover/focus transforms; GSAP owns the containing entrance elements. All text and links remain visible without JavaScript.

Background media is decorative (`alt=""`); the visible caption explains its provenance. Photography uses Next Image with eager/high priority loading and optional picture-source art direction. The current SVG is deliberately unoptimised, since it is a small vector. A permanent navy surface plus the original schematic underlay supports error fallback. Video support is lazy and dormant by default; desktop/no-reduced-motion permission is checked before mounting a video source. Posters remain available for mobile, reduced motion and blocked autoplay. A pause control and visibility/intersection cleanup support longer playback.

The native hero-end anchor marks this section's boundary; it does not target or create a future company section. The homepage now contains the hero, Section 03 introduction, Section 04 solutions showcase, Section 05 industries experience, Section 06 advantage accordion, Section 07 corporate purpose, Section 08 quotation experience and the small development footer. The header implementation and its dimensions/scroll behaviour are unchanged.


## Company introduction boundary (Section 03)

`src/components/sections/company-introduction` keeps server presentation, a small client media fallback and the motion boundary separate. `src/content/introduction.ts` holds sourced copy; `src/config/introduction-media.ts` controls media selection/crops/alt/caption, with `src/types/editorial-media.ts` defining its contract. The original placeholder is reused by reference rather than duplicated.

`use-introduction-motion.ts` lazily arms the existing GSAP/ScrollTrigger stack near the viewport and uses the central motion tokens. All DOM selectors for the entrance are scoped to this section; parallax receives an explicit image element. Desktop fine-pointer parallax is separately media-gated. Preference changes and unmount revert contexts and dispose observers/listeners; async generation checks prevent stale animations after navigation. The server baseline remains fully visible. No backend, package, pinned scene or new global motion provider is required.


## Industrial solutions boundary (Section 04)

`src/components/sections/solutions-showcase` separates server section presentation, controlled selection, desktop/mobile controls, the visual panel, media and one-time entrance motion. `src/content/solutions-showcase.ts` derives canonical division data from services/navigation; `src/config/solutions-media.ts` owns media/fallback configuration. Existing editorial-media contracts and UI primitives are reused.

`use-solution-selection.ts` owns a single canonical active slug. Desktop uses ordinary pressed buttons, not menu/tab roles; native Enter/Space activation and optional arrow/Home/End focus movement remain explicit. Mobile uses a labelled native select. Panel content is an overlapping grid with maximum intrinsic text sizing; inactive articles are hidden and inert, while only selected media mounts. A polite status announces changes. Motion receives direct targets, so rapid selection changes do not queue exiting panels or stale callbacks. The GSAP enhancement is isolated to heading/row entrances and cleans up on reduced-motion changes and unmount.

All five detail routes remain the established development-status pages. No backend or additional package is needed. Later homepage sections remain unimplemented.


## Industries boundary (Section 05)

`src/components/sections/industry-experience` separates the server section/sector presentation from small client media-error and motion boundaries. `src/content/industry-experience.ts` preserves sourced sector narratives and derives relevant solution links from the canonical division data. `src/config/industry-media.ts` owns sector media and independent fallbacks using the existing editorial-media contract. No route or backend was added.

All four articles remain in a stable ordered DOM with content before media. Desktop alternation is CSS-only; tablets/mobile stack naturally. `IndustryMotion` uses the existing GSAP and ScrollTrigger packages near each panel, media-gates fine-pointer parallax, and reverts contexts on preference changes/unmount. Server text/images remain visible without JavaScript or with reduced motion. Header, hero, introduction and selector behaviour are unchanged.


## Operating pillars boundary (Section 06)

`src/components/sections/zieve-advantage` separates the server section presentation, client accordion/row presentation and one-time motion boundary. `src/content/advantage.ts` contains typed sourced records; `use-pillar-accordion.ts` owns the validated single-open/null state. The initial first-open state is identical on server, desktop and mobile. No viewport-dependent initial render is used.

GSAP animates the introduction and outer row entrances; Motion handles separate inner panel height/opacity and plus rotation. Collapsed regions remain mounted to support smooth retargeting, but are clipped, aria-hidden and inert. Native button activation and optional directional focus movement do not move focus into panel text or call scrolling APIs. No backend, media or package addition is involved. Later sections remain unimplemented.


## Corporate purpose boundary (Section 07)

`src/components/sections/corporate-purpose` separates server Vision/Mission/Values presentation from one small shared motion boundary. `src/content/purpose.ts` references existing company statements/values and adds presentation labels and typed numbering; canonical business copy is not duplicated.

Three independent `PurposeMotion` instances progressively reveal the static content with the existing GSAP module and motion tokens. No ScrollTrigger or interactive state is required. Contexts/observers/listeners revert on preference changes/unmount, and stale async imports are guarded. Baseline server content is readable without JavaScript. CSS changes column counts and text measures without changing DOM order or adding a different mobile interaction pattern.


## Quotation boundary (Section 08)

`src/components/sections/quotation` separates the server section/contact presentation, client form/fields/draft and motion enhancement. `src/content/anchors.ts` avoids circular imports by owning the shared root form anchor. `src/content/quotation.ts` derives category/sector choices and profile-backed copy. `src/lib/quotation/schema.ts` is reusable validation; `submission.ts` defines a pure typed preparation adapter and URI/copy draft result.

Preparing a draft has no network side effects. A separate native mailto link delegates sending to the visitor's application; long URIs are replaced by complete copyable text. Personal data stays in component memory, never a server request/query/localStorage. Unhydrated fields are disabled to prevent native GET leakage. Field-change revision guards invalidate stale drafts, and preparation never resets the form. The named anchor target relies on existing header scroll-padding plus local scroll-margin, with no automatic field focus. Existing quote link rendering and menu behaviour remain intact.

The implementation notes document backend validation, security, transport/result and testing requirements. No endpoint or delivery provider exists in this checkpoint.


## Section 09 footer

`src/components/layout/footer/site-footer.tsx` is composed in the homepage after main; development-status routes retain their established layouts. Server components split brand, typed navigation groups, contact and utility content. FooterMotion, BackToTop and CopyrightYear are isolated client boundaries. Footer CSS is imported centrally through globals.css to preserve layer order. Content references canonical company/contact/navigation modules; `src/content/footer.ts` holds only presentation configuration. `src/lib/copyright-year.ts` supplies the Harare calendar year. The shared BrandLink priority option defaults to true for the existing header and is false in the footer. No new packages, routes or services.


## Current navigation refinement — Phase 11A

The canonical routes/navigation registry remains for reserved inner pages. `content/homepage-navigation.ts` is the derived destination view consumed by header/mobile/footer and homepage discovery. It references existing section and solution-panel IDs. Native Anchor primitives preserve document hash events/refresh/history, while the bare Home route retains Next Link. Focusable section wrappers work with the existing measured sticky-header offset. The solution selection hook validates URL hashes, retains selector focus on local choice and completes anchor focus only when the selected article is non-inert and visibly rendered; pending work/listeners clean up and user interaction cancels delayed focus.

Earlier boundary notes describing email quote actions, later sections as unimplemented or a development footer are historical checkpoint context. The current homepage includes Sections 01–09, a Section 08 form quote anchor and the corporate footer. No inner-page implementation or submission architecture was added in 11A.

## Phase 11B boundaries

Targeted refinement is confined to existing section styles and the quotation draft wrapper. The prepared draft is an explicitly named `group`, using its existing H4 label without adding a landmark or live wrapper. Existing status/copy announcements, focus, schema and transport are unchanged. Quotation columns now use CSS auto-fit based on available form width and text-relative minimum tracks; there is no responsive JavaScript or additional package. Small-screen Introduction proportions/industry pacing, decorative numeral colour, Vision boundary and mobile hero overlay/credit tracking are CSS changes only. All media assets/configs, navigation architecture and GSAP/Motion lifecycles are preserved. Current evidence: docs/homepage-refinement/phase-11b/FINAL_READINESS_REPORT.md.


## Phase 11B.5 — Industries progressive horizontal stage

IndustryExperience retains server content/H2/ordered articles; IndustryMotion is the client stage boundary, with useIndustryScroll owning one GSAP context/ScrollTrigger. CSS sticky supplies pinning geometry without a ScrollTrigger spacer; actual track width and header/viewport measurements supply travel, scene height and refresh. Fine-pointer/hover/size/motion/content-fit gates, native flow fallback, keyboard versus pointer focus, hash navigation and generation/observer/listener cleanup are documented in homepage-refinement/phase-11b5/HORIZONTAL_SCROLL_ARCHITECTURE.md. Native lazy media is warmed current/next only near the stage; existing IndustryMedia error/caption/optimized-image configuration remains. This supersedes older per-panel reveal/parallax architecture. No wheel hijacker, new animation package, backend or public route.


## Phase 11B.6 — final scoped refinement

SectorPanel uses one heading, one labelled IndustryMedia figure and one copy wrapper; desktop grid placement preserves the mobile DOM reading sequence. useIndustryScroll only adds the copy wrapper to its existing ResizeObserver targets. Its GSAP timeline, measured travel, sticky lifecycle, pointer/keyboard fallback and navigation remain. See homepage-refinement/phase-11b6 for matched evidence and final verification.
