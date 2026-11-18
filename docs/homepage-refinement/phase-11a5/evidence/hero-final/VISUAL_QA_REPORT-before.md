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
