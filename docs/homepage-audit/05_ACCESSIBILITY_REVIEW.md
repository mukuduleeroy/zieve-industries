# Accessibility review

This is a targeted automated and manual browser inspection, not a WCAG conformance certification or a screen-reader audit.

## Tooling and conditions

Installed axe-core **4.14.1** was found in the existing dependency tree; no package was installed. The audit injects that local engine and runs WCAG 2 A/AA, WCAG 2.1 A/AA and best-practice tags. Raw results, nodes, ratios, passes and incomplete rules are in [browser-audit.json](evidence/browser-audit.json). Eight scans cover 390/1440 default, mobile dialog/desktop dropdown, invalid form and prepared draft. Default captures use reduced motion to eliminate transient visibility effects.

| State | Axe violation rules / nodes | Manual-review rules |
|---|---|---|
| 390 default | color-contrast / 6 | color-contrast / 7 nodes |
| 390 mobile dialog | None | None |
| 390 invalid form | color-contrast / 6 | color-contrast / 9 nodes |
| 390 draft ready | color-contrast / 6 | color-contrast / 9; aria-prohibited-attr / 1 |
| 1440 default | color-contrast / 1 | color-contrast / 7 nodes |
| 1440 dropdown | color-contrast / 1 | color-contrast / 7 nodes |
| 1440 invalid form | color-contrast / 1 | color-contrast / 7 nodes |
| 1440 draft ready | color-contrast / 1 | color-contrast / 7; aria-prohibited-attr / 1 |

## Adjudication

AUD-05: flagged numerals are explicitly aria-hidden decorative ordering accents. Civil 02 is ochre on light surface at 2.92:1; five mobile value numbers are 3.14:1 and below the engine's normal-text threshold. Meaning is available from adjacent headings and lists. These flags warrant documented contrast/design review; they are not asserted here as six failures of essential-text access. Changing a colour globally without considering palette and decorative exemptions would be premature.

Axe cannot resolve several contrast situations involving image/overlay or styled form boundaries. Essential body/headings, CTA text and visible form labels were visually reviewed as readable; this does not replace all pixel-level contrast adjudication after photography. Input borders are muted on white; navy outlines and textual error messages supplement ochre borders. Values/sector numbering should be reviewed independently from essential copy.

AUD-12: a generic div with aria-labelledby does not reliably create a named draft group. Axe labels this **incomplete**, not a violation. The visible H4 and status remain; choose justified semantics and verify with assistive technology.

## Manual browser checks

One main/H1, named header/footer navigation, semantic sections, ordered sector/value lists, H2/H3/H4 hierarchy and address elements are present. Skip link focuses main. Open/close/Escape, focus retention, visible outlines, native select, tab order and inert hidden panels were checked through the unchanged suite and additional keyboard observations. Form fields have explicit labels, required/optional text, descriptions, autocomplete and 16px input text. Invalid form reports four errors and focuses full name. The prepared draft uses a status message and copy feedback uses a polite live region. Presence of those attributes/ARIA snapshots is verified; actual spoken wording/timing is not.

AUD-01 is the important observed robustness defect: the 200% root-font test clips hero text and overflows header controls. It is a resize-text proxy, not native zoom; repeat real browser zoom/text resizing in refinement. Default six-width checks do not detect this.

Reduced-motion preference changes clean up GSAP styles in regression checks, and back to top switches from smooth to instant. Original logo alternatives and honest schematic descriptions exist; decorative hero media has empty alt with visible provenance. No-JavaScript regression paths retain content, native anchors and contact links, while the form stays disabled to avoid unsafe native GET.

## Coverage gap

No live VoiceOver/NVDA testing, physical iOS keyboard audit, native browser zoom or cross-browser suite was available. Chromium device emulation is not Safari. No zero-violation or AA-compliant claim is justified. Priorities: AUD-01, then AUD-05/12 adjudication and AUD-09 real assistive/browser validation.
