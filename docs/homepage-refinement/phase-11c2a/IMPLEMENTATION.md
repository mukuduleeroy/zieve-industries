# Implementation and scope

Phase 11C.2A · 18 November 2026

## Minimum correction

Changed only **`tests/e2e/phase-11b.spec.ts`** in application/test source scope. The original immediate bounds assertion now uses condition-based `expect.poll` to re-read the rendered mask ratio until it satisfies the exact original target and precision. Default assertion timeout is unchanged. Message names the requested width for actionable diagnostics. No viewport acknowledgement, networkidle or fixed delay is substituted for the actual required geometry.

Added one focused test (two configured project executions) covering the same visible mask geometry at390,1023,1024,1025,1279,1280,1440 and descending back to390, under100%/200% root text and reduced/default motion. That is52 resize observations per execution. It scrolls the real section into view, asserts the mask visible and checks document width equals the viewport. Browser/page contexts remain Playwright-isolated. It neither hides overflow nor changes media CSS.

The original seven-width path, exact ratios/tolerance, captions/credit, caption-versus-scroll collision check, minimum caption size, overflow, reduced-motion indicator and parallax/heading checks are retained. No assertions removed. No skip/quarantine, retries, arbitrary sleep, timeout increase, new dependency or global animation disable introduced.

## Files created

Five reports in this directory: FAILURE_REPRODUCTION, ROOT_CAUSE_ANALYSIS, IMPLEMENTATION, REGRESSION_RESULTS and FINAL_RECOMMENDATION. `evidence/` retains immutable prior-source hash snapshot, commands/results, measurement scripts/JSON, traces and screenshots. These are audit tools, not application imports or shipped assets. `investigate-nojs.mjs` records its own no-JS diagnostic method; it is not a release-test fixture or a replacement for native browser testing.

Production source, public assets, configuration, navigation, homepage layout, quotation transport, SEO/indexing, fonts and logo remain unchanged. Existing unrelated uncommitted work from prior phases is preserved. A before/after SHA256 register verifies the allowed source delta.

## Validation

Exact counts and commands are in REGRESSION_RESULTS. The recommendation concerns this synchronization correction only. Broader11C.2B work remains a separately approved checkpoint.
