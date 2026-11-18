# Regression verification

Phase 11B.5 · 18 November 2026 · no deployment.

## Final checks

| Check | Result | Evidence |
|---|---|---|
|Checkpoint A units/types/build|45 units; strict types/build passed|checkpoint-a-unit/types/build logs|
|Checkpoint A heading + Introduction browsers|14 passed|checkpoint-a-playwright.log|
|Stage/heading/media/lifecycle targeted suite|16 passed|targeted-media.log|
|Original resize regression repeated10 per project|20 passed,0 failed|resize-repeat.log|
|Pointer-aware stage regression repeated5 per project|10 passed,0 failed|pointer-repeat.log|
|Final full browser suite|146 passed,0 failed (2.8minutes)|full-verification.log|
|Final units|45 passed across12 files|unit.log|
|ESLint / strict TypeScript / production build|Passed|lint.log,typecheck.log,build.log|
|Whole-page reduced-motion/default-form and draft axe|6 scans,0 reported violations; contrast incomplete items retained|final-axe.json|
|Horizontal Industries axe|4 states,0 reported violations;0/1/1/1 incomplete checks|horizontal-axe.json|
|Responsive/heading inventory|Five widths,0 document overflow,0 numbered eyebrows; H1/H2/H3 equal before/after|after-inventory.json,scope-verification.json|

All browser commands use existing Playwright config, two workers, local production server3100 and `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/zieve-playwright`. No retries, skips, quarantines or timeout increases. No packages installed.

## Preserved failure history and justified corrections

1. A new image-completion assertion initially required an explicit HTMLImageElement guard for strict typing. Corrected; build/types clean. An attempted browser start on the failed build is not counted as a completed suite.
2. Transformed native-lazy images could remain unrequested in screenshot QA. Added near-stage current/next loading and actual completion/no-fallback assertions in each industry panel.
3. Initial full run: **144 passed,2 failed**, both a legacy strict locator expecting one navy panel when the redesign now has four. Updated to assert count4 and amber colour on **every** industry numeral, retaining core-value navy and semantic assertions. Logs/traces preserved in `full.log` / `full/`.
4. Intermediate full run: **146 passed** (`full-before-pointer.log`), but a separate real pointer activation probe still found a link moving between focus and click. This uncovered missing coverage despite a green suite. Pointer-aware focus now preserves visible clicked targets; keyboard/offscreen focus still returns to flow. Added direct pointer navigation to the repeated stage test. The failed probe remains in `pointer-check.log`; the final pointer repeat and full suite supersede its application state.
5. Initial normal-motion whole-page axe snapshots captured transient Introduction entrance colour and offscreen inherited-background ambiguities. Explicit navy panel surfaces preserve intended paint. Final horizontal scans scope Industries (four states); separate whole-page reduced-motion/form scans cover the full document. No colour token changed, rule disabled or issue excluded from those stated scopes. Initial raw results remain `horizontal-axe-initial.json`.

## Existing resize failure

Phase11C.2A established a synchronization defect and preserved exact image ratios/tolerance with condition-based geometry polling. That correction remains intact;20 repeated executions plus the full suite exercise it after this redesign. No fixed wait, weaker ratio, or animation disable was added. Prior historical11C.1 failures are not rewritten; this phase neither starts new Phase11C work nor reopens an already-established cause without evidence.

## Changed expectations are requirement changes, not weakened tests

Removed eyebrow content expectations become absence tests with semantic heading/content preservation. The old industry white-background assertion becomes the requested unified navy. Old per-panel parallax/clip-entry expectations become horizontal progression, reverse travel, media completion, release, keyboard fallback and disposal checks; static fallbacks continue to assert no transforms/clipping. Decorative numeral checks now cover all four navy panels. No business-content, quotation, route, header, no-JS or overflow test was removed.

Final suite covers all four sourced industries, responsive alternation in flow, heading hierarchy, normal/reduced motion, enlarged root text, direct anchors, navigation/back lifecycle, media failure, keyboard focus, pointer click, no horizontal document overflow and existing quotation validation/draft/copy/long-mailto/no-JS behaviour. Both configured projects are Chromium; mobile is iPhone emulation. Native Safari/Firefox/AT/physical iOS remain unverified and public launch remains NO-GO.
