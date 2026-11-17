# Homepage executive audit

Audited 17 November 2026. **Recommendation: NO-GO for public launch; suitable for controlled review and Phase 11 refinement.** No numerical design/conformance score is assigned.

The homepage is a coherent engineering baseline with a recognisable navy/amber serif identity, honest placeholder provenance, working selectors/accordion/navigation and a carefully qualified email-draft flow. Automated regression results are strong. It is not the finished premium corporate experience: photography and webfont delivery are pending, discovery links still lead to reserved pages, and enlarged text exposes clipping/overflow.

## Evidence and scope

Read DESIGN, ARCHITECTURE, CONTENT and IMPLEMENTATION, the retained 12-page profile text, tokens, typography, global/component CSS, primitives, routing, content/configuration, motion hooks, form/schema/adapter and tests. Inspected live production rendering at 375, 390, 768, 1024, 1440 and 1920px; captured full pages, each major section, navigation, all solution selections, all pillar expansions/collapse, form errors/drafts/long enquiries, footer and top-return states. Follow-up keyboard and enlarged-text conditions are separately identified. [Screenshot index](screenshots/INDEX.md).

Used installed axe-core 4.14.1, Chromium browser inspection/ARIA snapshots, CDP performance/font evidence and all existing checks. No dependency was added. No production component, content, asset, test or existing documentation was modified. Source hashes before/after are retained in evidence.

## Assessment

| Area | Evidence-based conclusion |
|---|---|
| Visual design | Consistent palette, alignment and editorial hierarchy; schematic repetition and missing approved media/type prevent final art-direction approval. |
| Accessibility | Good semantics, keyboard interaction, inert panels and form descriptions. Enlarged-text failure needs attention. Decorative contrast and generic draft labelling need adjudication/refinement. Not a conformance certification. |
| Performance | Six local runs report no layout-shift entries and quick placeholder LCP; client payload and mobile long tasks warrant profiling. No Lighthouse score or production CWV is available. |
| Function | All 38 unit and 112 current browser tests passed. Status routes are intentional but interrupt public discovery. |
| Content | Official identity/contact, five divisions/pillars, mission/vision/values align with source or explicitly approved editorial adaptation. No invented operating metrics were found. |

## Highest priorities

1. AUD-01: enlarged-text overflow/clipping (observed root-font proxy; validate native zoom too).
2. AUD-02: make public discovery destinations useful within authorised scope.
3. AUD-03/AUD-04: obtain approved photography and complete Noto Serif webfonts; retest composition/performance.
4. AUD-05/AUD-06/AUD-12: adjudicate decorative contrast, align wrapped form labels, correct draft grouping semantics.
5. Complete real-browser/assistive-technology validation and final-asset performance testing before release.

Every finding, evidence source, priority, recommendation, complexity and regression risk is in [the backlog](09_PRIORITIZED_FIX_BACKLOG.md). Findings marked subjective are recommendations, not verified defects. No fixes were implemented. Phase 11 requires explicit approval.
