# Interaction, motion and conversion review

## Verified interactions

The full existing suite and audit follow-ups exercise normal/reduced motion, navigation, rapid selection, cleanup and geometry. [Regression log](evidence/playwright.log), [keyboard observations](evidence/interaction.json), [raw states](evidence/browser-audit.json).

- Header scroll changes the surface without changing measured header dimensions. Dropdown supports keyboard open, ordinary link Tab order and Escape restoration; its settled [open state](screenshots/1440-navigation-open-stable.png) is readable over the hero. Native mobile dialog locks body scroll, uses Close/Escape and restores opener focus. Existing tests cover focus trapping, submenu and resize release.
- Hero quote reaches the form; audit anchor follow-up places its top below the header (390: form y≈128, header height 96; 1440: form y≈144, header height 112). It does not autofocus a field or force a mobile keyboard. Primary Explore Our Solutions reaches the reserved /solutions route: AUD-02.
- All five solutions synchronise the selected content, media and destination. Mobile native select retains focus; desktop keyboard and repeated changes settle to one state. Inactive articles retain inert/aria-hidden attributes; visibility based only on bounding boxes is not equivalent to keyboard exposure. Polite status reports the selected division.
- Industry panels are sequential scroll content, not a selector/carousel. Their entrances and modest desktop parallax preserve document geometry; reduced motion clears styles. Purpose movements are static content with one-time reveals.
- Advantage supports single-open/null state, ordinary buttons, keyboard focus retention and rapid toggling. Collapsed panels remain inert and excluded from accessibility exposure. No automatic scroll repositioning is used.
- Form validation preserves data, focuses the first error and associates descriptions. Draft preparation, edit invalidation, long-enquiry copy/manual selection and denied clipboard fallback are covered. No email was sent. Footer reuses canonical links; back to top returns focus to main and uses smooth/instant scrolling appropriately.

## Motion judgment

The visual language uses short entrances, minimal icon/indicator movement and bounded image translation. There is no scroll-jacking, pinning, forced carousel or continuous background movement. GSAP contexts, generation guards, observers and preference listeners have cleanup paths; Motion and GSAP generally own separate targets. Existing preference-change and navigation tests pass. Static screenshots alone do not certify animation frame pacing; the local event/long-task evidence is limited, and no physical-device smoothness claim is made.

A first-frame dropdown capture was correctly rejected and recaptured after its transition; this was a capture-timing issue, not an application defect. One-time enhancements keep server content visible, but repeated lazy animation implementations should be profiled before proposing consolidation. No refactor is authorised here.

## Conversion journey

Intended journey: identity → divisions → sector relevance → operating confidence → enquiry. Actual hero discovery exits to a development destination, while persistent Request a Quote provides an effective direct path. Public-release discovery routing is the first conversion concern (AUD-02). The four sector blocks and purpose section add substantial reading before the full form (AUD-07); persistent quote access mitigates but does not remove that effort.

Only four of eight fields are required; optional status and 16px controls are clear. The email preparation button is honest but asks for two stages: prepare, then manually send in an external application. Direct phone/email and full-copy fallback are useful. User-testing should check understanding and completion, including long-enquiry and no-mail-client paths (AUD-08). There is no measured conversion rate, analytics evidence or confirmed delivery. Do not replace this with a success claim or add transport/storage without a separate approved scope.
