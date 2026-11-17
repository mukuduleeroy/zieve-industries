# Responsive review

## Default-size results

| Viewport | Document height | Overflow | Observation |
|---|---:|---|---|
| 375 × 844 | 14,080px | None | Stacked hero/actions, editorial content-first order, open footer. |
| 390 × 844 | 14,117px | None | Clear mobile menu; long industry/form journey. |
| 768 × 1024 | 13,133px | None | Introduction and industries remain stacked; particularly tall image/content rhythm. |
| 1024 × 1080 | 10,034px | None | Editorial columns active, compact header menu retained; paired form label alignment defect. |
| 1440 × 1080 | 11,029px | None | Full desktop header, asymmetric compositions and five-column values. |
| 1920 × 1080 | 11,066px | None | Centred maximum-width content; backgrounds span viewport. |

Heights are observed default states, not immutable budgets; changing solution/accordion, fonts, form draft or viewport height alters them. Source data: [browser-audit.json](evidence/browser-audit.json). Viewport height in that JSON's width records is overwritten by document height; use the capture harness's explicit viewport definition and table above.

The measured container shells share alignment at each width: 1440 has shell x=54.4/width=1331.2, with 57.6px internal gutters; 1920 has shell x=288/width=1344, with 64px gutters. Mobile shell is viewport width with 20px minimum content gutters. No offscreen essential controls were detected at default sizes. Form controls compute to 16px; visible interactive targets sampled are at least 24px high, and the existing/footer tests specifically cover larger touch targets. Mobile footer requires no disclosure interaction.

## Enlarged text: AUD-01 (P1)

[390 enlarged text](screenshots/390-text200-top.png) clips hero words and lets the menu extend right. At 1440 the desktop quote extends to approximately x=1762. The reproduction sets the root font to 200% through the browser only: it approximates text-only resizing and is not a native browser zoom certification. Overflow widths and actual fonts are in [follow-up.json](evidence/follow-up.json). This demonstrates a real robustness gap, while native 200% zoom/400% reflow still require dedicated checks.

## Smaller refinements

[AUD-06](09_PRIORITIZED_FIX_BACKLOG.md#aud-06): [1024 form](screenshots/1024-partner-with-zieve.png) pairs controls with unequal label heights. [AUD-07](09_PRIORITIZED_FIX_BACKLOG.md#aud-07): tablet portrait imagery and four sector sequences create a long reading path. Do not equate long flow with horizontal overflow; it is a design/conversion recommendation.

Mobile behaviour is Chromium emulation. Physical keyboard overlays, native iOS safe-area behaviour and real Safari rendering are unverified (AUD-09).
