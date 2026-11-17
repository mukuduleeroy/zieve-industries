# Visual design review

Assessment derives from actual rendered captures, not source inspection alone. Compare [1440 composition](screenshots/1440-homepage.png), [375 composition](screenshots/375-homepage.png), [1920 hero](screenshots/1920-hero.png) and the [section index](screenshots/INDEX.md). Static comparison screenshots wait for fonts/image decoding; motion is reduced for deterministic geometry. Actual font inspection reports Georgia, not a delivered Noto Serif webfont.

## Section review

| Section | Strengths | Findings/recommendations |
|---|---|---|
| 01 Header | Real logo, stable light surface, clear amber quote action, restrained underline, readable dropdown. | Enlarged type breaks fit (AUD-01). Logo variant pending (AUD-13). Dropdown must be judged from the stable open capture, not its entrance frame. |
| 02 Hero | Strong left hierarchy, restrained palette, readable copy, visible primary/secondary actions; right-weighted machinery. | Schematic is honest but not cinematic photography; repeated excavator and temporary Georgia prevent final approval (AUD-03/04). |
| 03 Introduction | Clean dark-to-light transition, credible uptime narrative, good reading measure and asymmetric desktop columns. | Repeats hero visual; portrait frame dominates tablet stacking (AUD-03/07). |
| 04 Solutions | Distinct dark portfolio moment, clear active state and numbered choices; native mobile selector. | Placeholder media weakens division differentiation. Reserved detail destinations reduce conversion value (AUD-02/03). |
| 05 Industries | Alternating composition, differentiated surfaces and relevant underlined solution links. | Four tall sequences dominate scroll length; civil 02 contrast flag (AUD-05/07). No carousel/industry state machine exists: these are sequential panels with reveals. |
| 06 Advantage | Numbered rules and single-open interaction establish a disciplined technical tone without generic feature cards. | Dark Vision immediately following can merge into one long visual block (AUD-16, subjective). |
| 07 Purpose | Large vision, restrained mission and ruled values provide clear hierarchy. | Small decorative value numbers trigger mobile contrast flags (AUD-05); final font will affect long-line balance (AUD-04). |
| 08 Quotation | Strong contact/form separation; direct contact alternatives; explicit email-preparation language. | Uneven paired input baselines at 1024 (AUD-06). Form/draft length increases completion effort (AUD-08). |
| 09 Footer | Original logo, prominent closing statement, useful open groups and quiet utility bar. | Final brand assets pending; otherwise a coherent close. Repeated tagline is purposeful brand reinforcement, not an invented claim. |

## Whole-page creative direction

The experience shares the same maximum-width alignment, serif family strategy, navy/amber palette, dividers and controlled corner details. It avoids an unrelated template font or arbitrary colour family. Heading prominence, contrast of essential copy and amber CTA prominence are generally strong at default text sizes. Container measurements align within each viewport across header and section shells.

Section transitions are mostly clear: light introduction to dark solutions, light industry opening to alternating sectors, dark advantage/vision to light mission/values, navy enquiry to white footer. No overlapping panels or sticky-section collisions were seen. The weakness is repetition and length rather than inconsistent brand colour. Persistent empty dark space at taller hero viewports is an intentional near-full-viewport choice, but must be judged again with approved photography. Do not add decoration to compensate for missing assets.

A premium final judgment is withheld pending photography and actual font delivery. The hierarchy is promising; the current illustrative composition is a development presentation. Subjective opportunities and verified defects remain distinct in [AUD-03/04/07/16](09_PRIORITIZED_FIX_BACKLOG.md).
