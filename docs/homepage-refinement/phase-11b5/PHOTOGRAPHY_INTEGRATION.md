# Photography integration status

Phase 11B.5 · 18 November 2026 · local implementation, no deployment.

| Placement | Current production status | This checkpoint |
|---|---|---|
| PH01 Hero | Approved R1 Sunrise Excavator | Preserved |
| PH02 Introduction | Approved component detail | Preserved |
| PH03 Earthmoving | Labelled schematic | Held; new lead awaits rights/crop approval |
| PH04 Elution | Labelled schematic | Held; original/publisher permission absent |
| PH05 Chemicals | Approved process-infrastructure photograph | Preserved |
| PH06 Lubricants | Labelled schematic | Held; new CC lead not creatively selected |
| PH07-B Spares | Approved neutral fasteners | Preserved |
| PH08 Mining | Approved overhead mineral-handling photograph | Preserved in redesigned stage |
| PH09 Civil | Labelled civil works schematic | Held; no blanket worker/brand clearance |
| PH10 Manufacturing | Approved shaft/worker photograph | Preserved in redesigned stage |
| PH11 Agro-processing | Approved silos photograph | Preserved in redesigned stage |

No source photograph, optimized derivative, media configuration, image alt text or provenance caption changed. Source hashes verify public assets and media configuration remain identical. Next Image responsive sizing/error fallback remains in the existing IndustryMedia component.

One justified loading change belongs to the horizontal stage: native lazy loading can leave translated panels unrequested, observed during screenshot QA. An IntersectionObserver arms within600px; only current/next panel images receive eager loading as progress changes. This avoids loading every homepage image eagerly, adds no React scroll-state rerenders and keeps no-JS/mobile SSR lazy loading. Error fallback is still the original labelled schematic. On cleanup the observer disconnects and loading hints return to lazy. Original image files/quality settings are unchanged.

Browser checks verify each active panel's image completes with a nonzero natural width and no unexpected fallback; separate failure tests intentionally block photographs/schematics and retain accessible fallback states. Final captures wait for actual image completion. An early inspection screenshot (`after-stage-initial.png`) and aborted capture are diagnostic only, not acceptance images; final state captures supersede them.
