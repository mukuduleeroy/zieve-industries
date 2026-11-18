# Horizontal composition refinement

Phase 11B.6 · 18 November 2026 · local verification only.

## Observed baseline

Matched baseline shows the Civil image leaving on the left while Manufacturing text enters on the right at global progress0.5. That is a natural continuous transition, not evidence of broken panel widths or mismatched content. The problem is visual grouping on the shared navy background.

## Smallest effective adjustment

A1px amber60%-mixed rule marks the real boundary between enhanced panels. It is a pointer-transparent pseudo-element on each successive list item, inset1rem vertically. It does not change box widths, gutters, travel, snap points, focus, markup reading order or the track's transform. At1440px/progress0.5 the Civil/Manufacturing boundary is at720px; at1920 it is960px. The outgoing image and incoming copy are visibly on opposite sides of that boundary. Natural intermediate compositions remain and reverse scrolling is unchanged.

Each figure now references its own existing H3 through aria-labelledby. No duplicate heading, image or caption was added. Canonical heading→figure→copy markup also supports mobile; desktop CSS places heading/copy in the editorial column with the image spanning their two rows. Existing alternating flow fallback remains; enhanced panels keep text left/media right. No new motion, fading, parallax, carousel, wheel handler or library.

## Geometry and lifecycle

The same useIndustryScroll context, measured track width, header offset, functional start/end, sticky height, progress and release remain. Four full-width panels give4320px travel at1440 and5760px at1920. The boundary is absolute and takes no layout space. ResizeObserver additionally observes the new industry-copy wrapper; it already observed headings/captions/stage/header. Cancellation, fit-key guard, current/next media warming, pointer-aware focus and cleanup remain.

Matched initial/mid/final/reverse/release screenshots and native-scroll videos are indexed in BEFORE_AFTER_REVIEW. New regression checks include0.16/0.49/0.50/0.51 progress, both directions and1440→1920→1440 resizing. Test scroll positions are explicitly pixel-rounded to match native scrolling and ScrollTrigger parsing; precision is unchanged. A first fractional-distance expectation failure is retained in REGRESSION_REPORT.

Visual acceptance remains the user's decision; the change separates adjacent industries without pretending intermediate views can show one complete panel at all times.
