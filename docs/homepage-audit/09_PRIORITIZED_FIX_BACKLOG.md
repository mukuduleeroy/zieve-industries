# Prioritized fix backlog

No fixes are implemented. P0 = critical release blocker; P1 = major defect/dependency; P2 = meaningful improvement or release-validation gap; P3 = minor polish. No P0 defect was established. P1 does not mean every item is an application bug: brand dependencies and known development scope are identified explicitly.

| ID | Priority | Area | Finding |
|---|---|---|---|
| [AUD-01](#aud-01) | P1 | Header and hero | Enlarged text overflows and clips |
| [AUD-02](#aud-02) | P1 | Hero, header, solutions, industry links and footer | Discovery links interrupt the homepage journey |
| [AUD-03](#aud-03) | P1 | Hero, introduction, solutions and industries | Approved industrial photography is absent |
| [AUD-04](#aud-04) | P1 | Sitewide typography | Verified font identity is not yet delivered as a webfont |
| [AUD-05](#aud-05) | P2 | Industries and core values | Axe flags decorative number contrast |
| [AUD-06](#aud-06) | P2 | Quotation form at small desktop | Paired fields lose vertical alignment when labels wrap |
| [AUD-07](#aud-07) | P2 | Homepage composition, especially tablet/mobile | The editorial journey is long before the full enquiry form |
| [AUD-08](#aud-08) | P2 | Quotation conversion | Mail handoff has unavoidable delivery and retention limits |
| [AUD-09](#aud-09) | P2 | Accessibility and browser coverage | Assistive-technology and cross-browser release validation is incomplete |
| [AUD-10](#aud-10) | P2 | Performance and animation delivery | The placeholder performance baseline needs final-asset budgets and profiling |
| [AUD-11](#aud-11) | P2 | Engineering documentation | Some architecture summaries still describe older checkpoints |
| [AUD-12](#aud-12) | P2 | Quotation draft accessibility | The draft wrapper has an unsupported generic-element label |
| [AUD-13](#aud-13) | P3 | Header and footer logo | Only the extracted raster logo is available |
| [AUD-14](#aud-14) | P2 | Official contact content | Source address spelling needs owner confirmation |
| [AUD-15](#aud-15) | P2 | Release configuration | Indexing remains intentionally disabled |
| [AUD-16](#aud-16) | P3 | Section transitions and art direction | Adjacent dark advantage/vision sections soften the section boundary |

## AUD-01

**Enlarged text overflows and clips**

- Affected section: Header and hero.
- Severity: P1.
- Description: Verified in a 200% root-font enlargement proxy: document widths become 568px at a 390px viewport and 1762px at 1440px. Menu/desktop quote controls extend right; the mobile hero clips unbroken heading words inside its clipped stage. Native browser text-only zoom remains to be repeated.
- Evidence: [390 enlargement](screenshots/390-text200-top.png), [1440 enlargement](screenshots/1440-text200-top.png), [measured overflow](evidence/follow-up.json).
- User impact: Low-vision visitors can lose text and controls when enlarging type.
- Recommended fix: Make header layout respond to available content space and ensure long heading words reflow at enlarged text sizes. Retest true browser text resizing, 200% zoom and narrow reflow without hiding overflow.
- Estimated complexity: Medium.
- Regression risk: Medium: breakpoint, heading and header geometry regressions.

## AUD-02

**Discovery links interrupt the homepage journey**

- Affected section: Hero, header, solutions, industry links and footer.
- Severity: P1.
- Description: The hero primary action targets /solutions, which renders a reserved development-status destination. All five solution detail routes and other major navigation destinations are also status pages by explicit checkpoint design; HTTP success is not content completion.
- Evidence: [Destination](screenshots/solutions-destination-status.png), src/content/hero.ts, src/components/layout/route-status.tsx, evidence/playwright.log.
- User impact: Visitors leave the functioning homepage exploration for an unfinished page.
- Recommended fix: Before launch, agree whether homepage discovery links should reach existing section anchors until separately authorised inner pages are complete. Do not build those pages as an audit fix without scope approval.
- Estimated complexity: Medium; high if new inner pages are authorised.
- Regression risk: Medium: canonical links, header active states and anchor focus.

## AUD-03

**Approved industrial photography is absent**

- Affected section: Hero, introduction, solutions and industries.
- Severity: P1.
- Description: Every configured industrial visual remains an explicitly labelled schematic. The same excavator appears in the hero, introduction and initial solution. The rendering is truthful but does not yet deliver the intended cinematic photographic direction.
- Evidence: [Desktop composition](screenshots/1440-homepage.png), [Hero](screenshots/1920-hero.png), src/config/*-media.ts.
- User impact: Technical credibility and visual differentiation are weaker than the intended premium experience.
- Recommended fix: Obtain approved photography with rights/captions/crops and integrate through existing configurations in a separately authorised phase. Keep provenance truthful; do not invent facilities or projects.
- Estimated complexity: Medium plus external asset lead time.
- Regression risk: Medium: LCP, aspect ratio, crops, contrast and mobile legibility.

## AUD-04

**Verified font identity is not yet delivered as a webfont**

- Affected section: Sitewide typography.
- Severity: P1.
- Description: CSS names Noto Serif but contains no complete local @font-face asset. CDP platform-font inspection reports Georgia-Bold for the hero at both sampled widths. This matches the documented temporary fallback, not final Noto Serif delivery.
- Evidence: [Actual font evidence](evidence/follow-up.json), docs/DESIGN.md, src/design-system/typography.css.
- User impact: Visitors see device-dependent typography and final line wrapping remains unapproved.
- Recommended fix: Obtain approved complete licensed Noto Serif WOFF2 files and verify weights, italic, loading, fallback metrics and full-page composition after integration. Do not distribute PDF subsets.
- Estimated complexity: Medium plus external asset approval.
- Regression risk: Medium: line wrapping, CTA width, section height and font-induced shifts.

## AUD-05

**Axe flags decorative number contrast**

- Affected section: Industries and core values.
- Severity: P2.
- Description: At 390px, axe reports civil-sector 02 at 2.92:1 against surface (expected large-text 3:1), plus five 20px regular-weight value numbers at 3.14:1 (rule expects 4.5:1). At 1440px only civil 02 is flagged; value numbers reach large-text size. All these numerals are aria-hidden and decorative; essential headings carry their meaning.
- Evidence: [Raw axe results](evidence/browser-audit.json), [Purpose](screenshots/390-our-purpose.png), src/components/sections/industry-experience/sector-panel.tsx, purpose-values.tsx.
- User impact: Decorative hierarchy is faint for some visitors; automated reports require documented human adjudication.
- Recommended fix: Review decorative-text exemption and visual intent explicitly. Prefer an existing higher-contrast navy treatment on light surfaces where appropriate; retain amber as an accent. Do not label this alone a confirmed essential-text WCAG failure.
- Estimated complexity: Low.
- Regression risk: Low: decorative colour changes.

## AUD-06

**Paired fields lose vertical alignment when labels wrap**

- Affected section: Quotation form at small desktop.
- Severity: P2.
- Description: At 1024px Company / organisation wraps its optional marker while the adjacent telephone label fits; delivery location wraps while the adjacent industry label fits. Inputs in a shared row consequently start at different heights.
- Evidence: [1024 form](screenshots/1024-partner-with-zieve.png), quotation.css.
- User impact: Uneven field rhythm looks unfinished and weakens scanning.
- Recommended fix: Use row-aligned labels/controls or switch affected pairs to single-column layout when available form width is insufficient.
- Estimated complexity: Low–medium.
- Regression risk: Low: field sizing and narrow-layout checks.

## AUD-07

**The editorial journey is long before the full enquiry form**

- Affected section: Homepage composition, especially tablet/mobile.
- Severity: P2.
- Description: Observed default page heights: 14,080px at 375 and 13,133px at 768. Industries alone occupies 4,035/4,375px respectively; the 768 introduction is 1,289px. The repeated tall illustration/text rhythm dominates the middle journey. This is a creative/conversion recommendation, not a broken layout.
- Evidence: [375 homepage](screenshots/375-homepage.png), [768 introduction](screenshots/768-company-introduction.png), evidence/browser-audit.json.
- User impact: High reading/scroll effort may delay industry recognition and enquiry, though the persistent quote action provides a shortcut.
- Recommended fix: Review reading priorities and illustration proportions at tablet/mobile after final imagery; consider an approved existing quote anchor near relevant context. Validate with users rather than remove approved content indiscriminately.
- Estimated complexity: Medium.
- Regression risk: Medium: narrative order, content and section spacing.

## AUD-08

**Mail handoff has unavoidable delivery and retention limits**

- Affected section: Quotation conversion.
- Severity: P2.
- Description: The form truthfully prepares a draft and offers copy/select fallback; there is no server submission. Data stays in memory and is lost on reload/full navigation. A long draft substantially extends the page. This is an accepted current architecture constraint, not a failed transport.
- Evidence: [Draft](screenshots/1440-form-draft.png), [Long enquiry](screenshots/390-form-long-enquiry.png), quotation-form.tsx, quotation-draft.tsx.
- User impact: Visitors without a configured email application must copy manually; completed work can be lost on leaving the page.
- Recommended fix: User-test the two-step handoff and copy path. Consider clearer brief pre-submit expectations and a separately approved retention/submission strategy only if business needs justify it. Never claim delivery or add storage/backend without approval.
- Estimated complexity: Medium for UX; high for separately authorised transport.
- Regression risk: Medium–high: personal-data handling, truthful statuses and draft invalidation.

## AUD-09

**Assistive-technology and cross-browser release validation is incomplete**

- Affected section: Accessibility and browser coverage.
- Severity: P2.
- Description: Existing projects are Desktop Chrome and an iPhone-emulated Chromium configuration; neither constitutes physical Safari/iOS testing. Axe and ARIA snapshots cannot verify actual spoken announcements. No VoiceOver/NVDA session was available.
- Evidence: playwright.config.ts, [Browser environment](evidence/performance.json), [interaction checks](evidence/interaction.json).
- User impact: Browser-specific modal, focus, live-region or form issues may remain undiscovered.
- Recommended fix: Before a conformance claim/public release, test VoiceOver/Safari and NVDA/Firefox or Chrome, real mobile keyboard/safe areas, native select behaviour and actual zoom/reflow.
- Estimated complexity: Medium.
- Regression risk: Low application risk; testing may expose fixes.

## AUD-10

**The placeholder performance baseline needs final-asset budgets and profiling**

- Affected section: Performance and animation delivery.
- Severity: P2.
- Description: Six local samples observe zero CLS entries, but initial script resources total 286,761 encoded bytes and 908,887 decoded bytes. Throttled mobile has two initial long tasks per run (maximum 106–118ms). GSAP, Motion and form libraries are part of a meaningful client workload. Lighthouse is unavailable and there are no real-user metrics.
- Evidence: [Raw performance samples](evidence/performance.json), [Reproduction harness](evidence/performance-audit.mjs).
- User impact: A slower device or final photography/fonts may change responsiveness and loading materially.
- Recommended fix: Set explicit asset/JS budgets and profile the largest route chunks and animation lifecycle after real assets arrive. Repeat Lighthouse in an available approved environment and obtain production field data; optimise only with evidence.
- Estimated complexity: Medium.
- Regression risk: Medium: hydration, reveal timing and lazy module boundaries.

## AUD-11

**Some architecture summaries still describe older checkpoints**

- Affected section: Engineering documentation.
- Severity: P2.
- Description: ARCHITECTURE.md retains earlier statements that later sections are unimplemented, refers to a small development footer and an email quote action, alongside newer correct section appendices. Chronological IMPLEMENTATION.md notes are history, but current architecture summaries are ambiguous.
- Evidence: docs/ARCHITECTURE.md: Boundaries, Hero boundary and Industrial solutions boundary; docs/CONTENT.md historical sections.
- User impact: A future implementer may follow obsolete component/destination assumptions.
- Recommended fix: In a separately authorised refinement, update current architecture summaries and clearly label superseded historical notes while retaining provenance.
- Estimated complexity: Low.
- Regression risk: Low: documentation only.

## AUD-12

**The draft wrapper has an unsupported generic-element label**

- Affected section: Quotation draft accessibility.
- Severity: P2.
- Description: Axe marks aria-prohibited-attr as incomplete/manual review on div.quotation-draft with aria-labelledby. The title is visibly present, but the generic div is not reliably exposed as a named group/region.
- Evidence: [Raw draft-ready axe states](evidence/browser-audit.json), src/components/sections/quotation/quotation-draft.tsx.
- User impact: Assistive technology may not expose the intended draft grouping, although the H4 and status text remain readable.
- Recommended fix: Use a justified semantic section/group or remove the unnecessary label; validate focus and live announcements with assistive technology. This is a manual-review finding, not an axe-reported violation.
- Estimated complexity: Low.
- Regression risk: Low: accessibility tree and announcement checks.

## AUD-13

**Only the extracted raster logo is available**

- Affected section: Header and footer logo.
- Severity: P3.
- Description: The original 627×294 JPEG is correctly reused, with its white background and compression. There is no approved vector/dark-background variant; no logo was redrawn.
- Evidence: [Desktop footer](screenshots/1440-footer.png), public/branding/zieve-logo-profile.jpeg, docs/DESIGN.md.
- User impact: Current treatment is usable but less flexible at high pixel densities and future dark contexts.
- Recommended fix: Obtain approved vector and alternate logo masters; preserve original identity and validate display sizes rather than tracing or recolouring.
- Estimated complexity: Low plus external asset lead time.
- Regression risk: Low: dimensions, loading priority and logo alternatives.

## AUD-14

**Source address spelling needs owner confirmation**

- Affected section: Official contact content.
- Severity: P2.
- Description: Website and PDF pages 3/12 consistently say Miton Park. This audit cannot establish that this is the intended postal/locality spelling. It is not a verified website transcription defect.
- Evidence: docs/profile-extracted.txt pages 3/12, src/content/contact.ts, [Footer](screenshots/390-footer.png).
- User impact: An inaccurate official address would harm visit/delivery confidence.
- Recommended fix: Ask the company owner to confirm the complete address before publication; change canonical contact content only after that confirmation.
- Estimated complexity: Low plus owner response.
- Regression risk: Low: shared content/contact snapshots.

## AUD-15

**Indexing remains intentionally disabled**

- Affected section: Release configuration.
- Severity: P2.
- Description: Root metadata sets robots index:false and follow:false. This is appropriate during development but must be an explicit launch decision rather than an accidental production carry-over.
- Evidence: src/app/layout.tsx, [Build log](evidence/build.log).
- User impact: Public discovery will be constrained if development metadata is deployed unchanged.
- Recommended fix: Keep noindex during review; perform an approved release metadata/destination audit once public content is complete.
- Estimated complexity: Low.
- Regression risk: Low: search visibility and development exposure.

## AUD-16

**Adjacent dark advantage/vision sections soften the section boundary**

- Affected section: Section transitions and art direction.
- Severity: P3.
- Description: Advantage flows directly into navy Vision with only a thin rule; repeated eyebrow/divider and the reused excavator contribute to a uniform editorial cadence. The palette itself is coherent. This is subjective art direction, not a functional error.
- Evidence: [Desktop composition](screenshots/1440-homepage.png), [Purpose](screenshots/1440-our-purpose.png).
- User impact: Readers may perceive the two narratives as one extended dark block.
- Recommended fix: Review spacing and content hierarchy after final photography/type without introducing unapproved colours or unnecessary decorative effects.
- Estimated complexity: Low–medium.
- Regression risk: Low: spacing and visual hierarchy.
