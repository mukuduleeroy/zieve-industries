# Phase 11A.5 — final PH01 integration

**R1 Sunrise Excavator is installed. R2 is rejected for this checkpoint.** Updated 2026-11-17. This PH01-only update supersedes the earlier hero hold; the other six configured photographs and four held placements are unchanged.

Actual production-build captures, not the review board:

| Width | Hero | Full homepage | Overflow | Capture CLS |
|---|---|---|---|---:|
| 390 | [hero](screenshots/hero-final/hero-390.png) | [homepage](screenshots/hero-final/homepage-390.png) | None | 0.00000 |
| 768 | [hero](screenshots/hero-final/hero-768.png) | [homepage](screenshots/hero-final/homepage-768.png) | None | 0.00798 |
| 1024 | [hero](screenshots/hero-final/hero-1024.png) | [homepage](screenshots/hero-final/homepage-1024.png) | None | 0.00746 |
| 1440 | [hero](screenshots/hero-final/hero-1440.png) | [homepage](screenshots/hero-final/homepage-1440.png) | None | 0.00000 |
| 1920 | [hero](screenshots/hero-final/hero-1920.png) | [homepage](screenshots/hero-final/homepage-1920.png) | None | 0.00000 |

Desktop uses the proposed 2600×1463 native crop starting at (0,650), with object-position **85% 50%**. That position protects tablet supporting-text contrast without changing the overlay. Mobile uses native (1350,0,1100,1750), encoded to 1000px wide, with **50% 50%**. The mobile crop removes excess lower ground and places the excavator below the heading/CTA group at the checked 390px layout. No mirroring, generative edits, recolouring or image URLs from search previews. Original 3648×2736 JPEG was freshly acquired and fully decoded.

## Readability, accessibility and behavior

The actual desktop/mobile screenshots were opened for crop/subject and text inspection. Mobile refinement moves the small excavator away from the last headline line; desktop remains right-weighted with left typography space. Main subject and sunrise focal point remain within the crops. Decorative empty alt is appropriate because the existing text carries the message; photographer/non-ownership provenance remains visible.

Contrast is checked using actual screenshot background pixels after hiding foreground editorial/footer opacity without reflow, plus computed text foreground colours. Sampling every two pixels across the normal text range rectangles gives a conservative background-box check, not antialiased-glyph or complete conformance certification. Measured ratios below are compared to [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 3:1 for the large headline, 4.5:1 for normal supporting copy. The overlay, typography and tokens were not changed; the tablet focal adjustment improved the initial supporting-copy edge case.

| Width | White headline | Amber headline | Supporting copy |
|---|---:|---:|---:|
| 390 | 13.36:1 | 5.57:1 | 12.19:1 |
| 768 | 8.76:1 | 3.97:1 | 5.39:1 |
| 1024 | 9.60:1 | 4.78:1 | 7.15:1 |
| 1440 | 10.16:1 | 4.79:1 | 12.96:1 |
| 1920 | 10.58:1 | 5.19:1 | 13.11:1 |

All photo requests in the responsive inventory decoded; fixed-viewport browser tests assert only the matching mobile/desktop crop is requested. Existing tests cover header/menu keyboard behavior, Escape/focus/body locking, destinations, no-JavaScript content/actions, reduced-motion static rendering and preference cleanup, 200% root text at seven widths, and 2× CDP page-scale magnification. CDP page scaling is pinch-style visual magnification; native browser-chrome zoom and physical-device/screen-reader validation are not certified by these tests.

No horizontal overflow, clipped actions, new page errors or image-frame collapse was observed. Existing small tablet startup header/hero movement remains outside this image-only change. Final source/CSS/token/component hashes verify the other sections, approved photos and navigation behavior were preserved. No PH03/PH04/PH06/PH09 changes.

---

## Earlier six-photo checkpoint — historical

The records below remain relevant to the other placements. Any PH01 hold or R2 proposal below is superseded by the final R1 decision above.

# Photography visual QA

Updated 2026-11-17. Conditional Stage B integration only. Hero remains schematic until final visual approval.

## Actual homepage captures

All required screenshots show the production-build homepage with the six configured photographs, not a mock-up. The default earthmoving solution remains schematic by the rights hold; additional active-panel captures show chemicals/spares. Full-page captures use reduced motion and DPR 1 so every section remains static/readable. Existing normal-motion/parallax cleanup is covered by the complete browser suite. Device widths are Chromium emulation, not physical-device or screen-reader certification.

| Viewport | Actual homepage | Horizontal overflow | Page errors | Observed capture CLS |
|---|---|---|---:|---:|
| 390 | [capture](screenshots/homepage-integrated-390.png) | None | 0 | 0.00000 |
| 768 | [capture](screenshots/homepage-integrated-768.png) | None | 0 | 0.00798 |
| 1024 | [capture](screenshots/homepage-integrated-1024.png) | None | 0 | 0.00746 |
| 1440 | [capture](screenshots/homepage-integrated-1440.png) | None | 0 | 0.00000 |
| 1920 | [capture](screenshots/homepage-integrated-1920.png) | None | 0 | 0.00000 |

Desktop/mobile actual screenshots and detailed section captures were opened for inspection. PH02 is component-focused; its public derivative is physically cropped at native x=700, y=54, 2800×3360 before encoding to 1600×1920, excluding the worker partial profile rather than implying a portrait release. PH10 retains a rear-view figure and long shaft, making it distinct from PH02. PH05 keeps the process towers; PH07-B keeps the central neutral fastener; PH08 retains handling paths/equipment; PH11 retains silos/walkway. No colour treatment, new font or typography repositioning was introduced. All displayed images decoded successfully in responsive capture.

Existing navy/white and amber/navy text remains outside these below-fold image frames, so photographs do not become text backgrounds. Captions use the existing light/dark section colours and remain legible. No caption clipping, horizontal overflow, collapsed frames or hero/header overlay collision was seen. The small tablet startup hero/footer movement is fully recorded in PERFORMANCE_REPORT.md; zero CLS at every width is not claimed.

Solutions selection was exercised for both photos and all held schematic divisions. Active photo panel captures: [chemicals desktop](screenshots/solution-industrial-chemicals-1440.png), [chemicals mobile](screenshots/solution-industrial-chemicals-390.png), [spares desktop](screenshots/solution-consumables-spares-1440.png), [spares mobile](screenshots/solution-consumables-spares-390.png). Existing keyboard selection, focus, reserved panel geometry, reduced motion, mobile menu, navigation and quotation regressions passed. Error tests cover optimized-image failure recovering to schematic, then double failure recovering to accessible text without collapsing the frame.

## Hero studies are separate

[Final review board](FINAL_SELECTION_BOARD.html), [desktop](screenshots/final-selection-1440.png), [mobile](screenshots/final-selection-390.png). These are comparative crop/overlay studies, not the implemented hero or evidence of final in-page contrast acceptance. R1 has a distant machine; R2 explicitly proposes horizontal reflection. Final hero visual approval remains required. The original Stage A REVIEW_BOARD.html is historical and contains the now-rejected Built/Komatsu candidate; use FINAL_SELECTION_BOARD.html for the current decision.

## Remaining acceptance

The six integrated photographs still require the user's final visual acceptance. PH01 requires candidate selection/approval; PH03/PH09 require new source-specific rights evidence or a separately approved replacement. PH04/PH06 intentionally remain labelled schematics. No stock scene is described as an actual Zieve facility, employee, customer, project or current inventory.
