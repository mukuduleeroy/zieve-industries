# Phase 11A implementation

Scope: AUD-01 enlarged-text robustness and the explicitly approved homepage-navigation part of AUD-02. All nine sections remain. No inner pages, backend, submission changes, asset replacement, font installation, indexing change or deployment was performed. No package was added.

## Changes and reasoning

[AUD_01_ACCESSIBILITY_FIX.md](AUD_01_ACCESSIBILITY_FIX.md) documents measured overflow, emergency text wrapping, wrapping header controls, bounded dropdown, safe hero actions and a normal-flow hero caption/scroll row. A text-relative container rule also reduces accordion indents and stacks its trigger label only when enlarged text leaves too little reading width. This is a reflow fix, not Phase 11B styling. Normal font sizes, brand colours, original logo, media configuration and motion infrastructure are retained.

[AUD_02_NAVIGATION_FIX.md](AUD_02_NAVIGATION_FIX.md) documents the pre-change link inventory, derived homepage destinations, original panel hash IDs, native document-anchor semantics, post-visibility focus handoff and URL selection context. Canonical routes/status pages remain. The panel action is now an honest solution permalink, not a promise of finished detail content.

## Files created

- `src/content/homepage-navigation.ts`: typed homepage view, shared solution panel IDs and discovery hrefs.
- `tests/discovery.test.ts`: canonical-route preservation and context mapping.
- `tests/e2e/refinement.spec.ts`: required-width/default/enlarged-text geometry, controls, meaningful hero text, caption separation, accordion reading width, keyboard, anchors, direct entry, refresh, history and selector focus.

## Existing files modified

- `src/app/globals.css`
- `src/content/hero.ts`
- `src/content/solutions-showcase.ts`
- `src/components/ui/primitives.tsx`
- `src/components/sections/quotation/quotation-section.tsx`
- `src/components/sections/solutions-showcase/solution-panel.tsx`
- `src/components/sections/solutions-showcase/solutions-showcase.tsx`
- `src/components/sections/company-introduction/company-introduction.tsx`
- `src/components/sections/zieve-advantage/advantage.css`
- `src/components/sections/zieve-advantage/zieve-advantage.tsx`
- `src/components/sections/industry-experience/industry-experience.tsx`
- `src/components/sections/industry-experience/sector-panel.tsx`
- `src/components/sections/hero/hero.tsx`
- `src/components/sections/hero/hero.css`
- `src/components/sections/hero/hero-action.tsx`
- `src/components/sections/hero/hero-media.tsx`
- `src/components/sections/corporate-purpose/corporate-purpose.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/mobile-navigation.tsx`
- `src/components/layout/solutions-disclosure.tsx`
- `src/components/layout/header.css`
- `src/components/layout/footer/site-footer.tsx`
- `src/components/layout/footer/footer-navigation.tsx`
- `src/hooks/use-solution-selection.ts`
- `tests/solutions.test.ts`
- `tests/header.test.ts`
- `tests/footer.test.ts`
- `tests/industries.test.ts`
- `tests/hero.test.ts`
- `tests/e2e/introduction.spec.ts`
- `tests/e2e/solutions.spec.ts`
- `tests/e2e/header.spec.ts`
- `tests/e2e/footer.spec.ts`
- `tests/e2e/hero.spec.ts`
- `tests/e2e/industries.spec.ts`
- `tests/e2e/purpose.spec.ts`

In addition, relevant existing DESIGN, ARCHITECTURE, CONTENT and IMPLEMENTATION documents receive a Phase 11A addendum. All Phase 10 reports remain historical evidence and are not rewritten. The dedicated evidence directory retains measured JSON, command logs, pre-change inventory and capture scripts; screenshots include paired default/enlarged conditions at the four requested widths.

## Tests intentionally updated

Tests expecting /solutions, /about or /solutions/{slug} from homepage discovery now assert the approved section/panel destinations, rather than merely removing navigation checks. Canonical route tests still exercise retained status routes and unknown-service 404s. Header current-page assertions no longer incorrectly mark a homepage section link as the current reserved inner page. Source names/content/provenance assertions remain.

Introduction, industries and purpose cleanup tests explicitly visit the retained /solutions status page before returning so they continue to exercise an actual unmount, even though the discovery action is now same-document. Focus, inertness, reduced-motion, form preservation and overflow assertions are retained or strengthened. The new matrix has a 90-second allowance for seven full navigation/measurement cycles; no existing timeout/assertion was relaxed. Final suite uses two workers to reduce machine contention.

## Limitations and handoff

Native UI browser zoom/text-only resizing and live assistive technology remain unverified; root-font enlargement and CSS viewport reflow equivalents are labelled separately. Approved photography and complete Noto Serif files remain unavailable; see BRAND_DEPENDENCIES.md. Other audit findings are not fixed in this checkpoint. FINAL_QA_REPORT.md records the final gate and exact executed results. Public launch is not authorised.
