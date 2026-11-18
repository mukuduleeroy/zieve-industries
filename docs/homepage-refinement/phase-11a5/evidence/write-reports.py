from pathlib import Path
import json
r=Path(__file__).resolve().parent.parent
items=json.loads((r/'evidence/shortlist.json').read_text())
licenses={
'U1':('Unsplash standard copyright licence','https://unsplash.com/license','https://unsplash.com/terms','Asset pages explicitly identify the standard free licence. Commercial website use and modification are permitted; attribution is optional. Do not resell unmodified images or build a competing collection. This copyright licence does not itself clear depicted people, logos/brands or other protected works. No Unsplash API integration is being used.'),
'P1':('Pexels licence','https://www.pexels.com/license/','https://www.pexels.com/terms-of-service/','Asset pages link to the free licence. Website/marketing use and editing are permitted; attribution is optional. Do not imply endorsement, depict people offensively, resell unchanged copies, redistribute as stock, or turn an image into a business mark. Asset-specific model/property releases were not exposed by the inspected pages; no independent release certificate is claimed.'),
'R1':('Publisher permission required',None,None,'A public technical PDF is a reference, not a stock licence. No permission for Zieve website publication, derivatives/crops or third-party marks was found. Original image and photographer/release details remain unverified. Keep the schematic until written permission and brand approval are obtained.')}
source='# Image source register\n\nStage A shortlist, checked 17 November 2026. **None is production-ready or brand-approved.** Nine source pages expose a free copyright licence; two are permission leads. Small permitted review copies are in previews/, not public/. All local public filenames below are proposed, not existing asset URLs.\n\n'
for x in items:
 dims=f"{x['width']} × {x['height']} ({x['width']/x['height']:.4f}:1)"if x['width']else'Unknown; original must be supplied'
 source+=f'''## {x['id']} — {x['placement']}

- Visual objective: {x['objective']}
- Search direction: {x['keywords']}.
- Candidate: {x['title']}.
- Original publisher: [{x['owner']}]({x['source']}).
- Original image URL: {('['+x['original']+']('+x['original']+')')if x['original']else'Not available as a verified standalone photograph; use the publisher PDF reference above to request its original. No URL is fabricated.'}
- Dimensions/aspect: {dims}. Evidence: {x['resolutionEvidence']}.
- Target frame: {x['ratio']}; desktop crop {x['desktop']}; mobile crop {x['mobile']}. Crop positions are proposals pending full-resolution/in-page QA.
- Proposed local file: `{x['localFilename']}`.
- Alt: {('Empty alt (decorative hero background); identity/copy remain live text')if not x['alt']else x['alt']}
- Proposed provenance caption: {x['caption']}
- Licence: {x['license']} in IMAGE_LICENSE_REGISTER.md.
- Approval: {x['approval']}; production ready: **No**.
- Assessment: {x['assessment']}

'''
(r/'IMAGE_SOURCE_REGISTER.md').write_text(source)
lic='# Image licence register\n\nThis register distinguishes verified publisher copyright terms, unresolved third-party/release issues, and Zieve brand approval. A free licence is not a claim of public-domain status, independent copyright-title verification or universal model/property clearance. No paid licence or publisher permission has been obtained. No source asset is marked production-ready.\n\n'
for code,(name,url,terms,summary)in licenses.items():
 lic+=f'## {code} — {name}\n\n{summary}\n\n'
 if url:lic+=f'Evidence: [licence]({url}), [terms]({terms}), and the corresponding original asset page in IMAGE_SOURCE_REGISTER.md. Checked 17 November 2026.\n\n'
 lic+='Placements: '+', '.join(x['id']for x in items if x['license']==code)+'.\n\n'
lic+='''## Per-asset release and approval decisions

| Asset | Verified | Remaining issue | Production status |
|---|---|---|---|
| PH01 | Standard free copyright terms; public source; native JPEG dimensions. | Prominent Built/Komatsu marks. Copyright permission does not establish a Zieve partnership or trademark licence. Brand/legal assessment of incidental depiction/crop remains; do not approve by inference. | Pending |
| PH02 | Pexels page/licence and source dimensions. | Worker/property clearance not independently certified; do not call the person a Zieve employee. | Pending |
| PH03 | Pexels page/licence and source dimensions. | Check small equipment marks at final size; no availability/ownership claim. | Pending |
| PH04 | Publisher identifies the photographed process as elution/electrowinning. | No republication/crop permission, original resolution or photographer authority verified. | Blocked; retain schematic |
| PH05 | Standard free copyright terms and native dimensions. | Identified third-party industrial site; no implication Zieve manufactures chemicals there. | Pending |
| PH06 | Publisher reference matches industrial lubrication. | SKF photograph/marks, original and publication permission unresolved. | Blocked; retain schematic |
| PH07 | Standard free copyright terms and native dimensions. | Clamps/fittings only; do not imply actual Zieve stock or all spares categories. | Pending |
| PH08 | Pexels page/licence and source dimensions. | Location/mineral not established; no unsupported Zimbabwe/gold claim. | Pending |
| PH09 | Pexels page/licence and source dimensions. | People and machine marks need final review; no Zieve contract/endorsement claim. | Pending |
| PH10 | Pexels page/licence and source dimensions. | Model/property details not independently certified; no Zieve factory/employee claim. | Pending |
| PH11 | Pexels page/licence and source dimensions. | Grain handling/storage context only; no ownership or milling claim. | Pending |

## Paid alternatives: not purchased

- **GOLD-B:** [Depositphotos 260719180, YAYImages](https://depositphotos.com/photo/permanently-fixed-overhead-crane-towers-floatations-tanks-gold-processing-plant-260719180.html). Publisher lists a gold-processing flotation-tank installation, 2848×4288 native tier. This is **not proof of an AARL/Zadra elution circuit**; use only if a broader gold-processing scene is expressly accepted. It is a paid candidate, not a free download. Original licensed binary URL is unavailable before acquisition; no preview is installed.
- **LUBE-B:** [Depositphotos 53640267, amnachphoto](https://depositphotos.com/photo/grease-gun-for-lubricant-work-or-lubricant-bearing-53640267.html). Publisher lists a grease gun on white, 4990×3327. Technically related but weaker editorial fit than a real application photograph. Paid, not purchased; original binary unavailable before acquisition.
- **LUBE-C:** [Depositphotos 469197200, rocharibeiro](https://depositphotos.com/photo/bottles-transferred-conveyor-belt-system-industrial-machine-automotive-lubricating-oil-469197200.html). Lubricating-oil bottling machinery, 2592×3872 native tier. An explicitly identified oil-production context, but not a maintenance scene; portrait-to-landscape crop remains unassessed. Paid, not purchased.

[Depositphotos agreement](https://depositphotos.com/license.html) describes permitted site use and modification under the applicable paid licence; editorial-only material cannot become commercial marketing. Client/account authority, release status, final tier, current price and licence evidence must be confirmed at acquisition. The listed doubled “super” sizes are not treated as native detail. No purchase, trial enrolment, watermark removal or account access was attempted.

Adobe Stock's [licence information](https://stock.adobe.com/license-terms) was also reviewed as a commercial-library route. No exact Adobe asset was verified to satisfy the difficult technical placements; a search result alone is not selected/licensed content.

## Acquisition and retention

After explicit brand approval, open each original page, recheck its licence/status, use its official original download control, preserve photographer/source/date/terms evidence and hash the acquired file. Do not treat a resized review copy as the high-resolution original. For PH04/PH06, ask the rights holder for the standalone original, permission for commercial Zieve website display and responsive crops/optimisation, credit wording and any brand/model/property conditions. No outreach has been sent. If permission is refused/unclear, retain the schematic or commission/licence another technically relevant photograph; do not substitute a generic factory silently.
'''
(r/'IMAGE_LICENSE_REGISTER.md').write_text(lic)
(r/'IMAGE_RESEARCH.md').write_text('''# Industrial photography research — Stage A

## Project review

Reviewed DESIGN, ARCHITECTURE, CONTENT and IMPLEMENTATION; Phase 10 executive/backlog/readiness findings; current Phase 11A QA; all four media configurations; hero, introduction, solutions and industry media/fallback presentation; Next image settings, fluid tokens/breakpoints and scoped GSAP/Motion reveals. The existing architecture already separates source/configuration from selection/motion/content. All nine homepage sections and the current navy/amber, Noto Serif/Georgia, original logo and schematic provenance remain untouched.

## Method and limitations

The exact requested Google Images hero search was attempted, but the browsing tool reported the Google Images endpoint inaccessible. General image search was used as a discovery fallback, then original Unsplash/Pexels, technical publishers and reputable commercial-library pages were opened. No Google thumbnail was used or treated as a licence. Domain-targeted and subject-specific searches covered excavators at golden hour, engineering/maintenance, earthmoving, gold elution/electrowinning, chemical processes, lubrication/grease applications, clean components, surface mining, roadwork, manufacturing and grain handling.

Original pages, author names, free/paid status and general licence terms were checked. JPEG source-header probes established native dimensions for the three selected Unsplash files; Pexels dimensions come from original asset pages. Small review derivatives were acquired only from public free-license source image URLs. No full-resolution production originals, paid/watermarked stock binaries, login-restricted assets or AI-generated substitutes were acquired.

The nine proposed free-license photographs and five additional reviewed alternatives are visible in local review files. Each was inspected as an actual photograph rather than selected from its title alone. Camera/date metadata and visual appearance support conventional photography, but this is not forensic authenticity or release certification. Publisher PDF references for the two specialist gaps establish subject relevance, not permission or full-resolution crop approval.

## Visual direction

Prefer a right-weighted yellow machine against natural light, engineered components rather than generic offices, real process vessels, active roadwork, large manufacturing hardware and identifiable grain-handling infrastructure. Keep neutral steel, earth and warm-light tones compatible with existing navy/amber. Never change the corporate palette to accommodate a source. The hero and introduction use distinct files; each proposed placement is distinct. Company/manufacturing share a photographer for coherence but need paired review to avoid repetition.

## Rejected / downgraded candidates

| Candidate | Decision |
|---|---|
| [Pexels 7568430, cottonbro](https://www.pexels.com/photo/a-pile-of-metal-spare-parts-7568430/) | Rejected: visibly worn/rusted scrap conflicts with fit-for-purpose/genuine supply positioning. |
| [Pexels 9241775, Mikhail Nilov](https://www.pexels.com/photo/a-person-with-a-machine-9241775/) | Rejected: staged portrait with eyewear on head near a small exposed machine is weaker technical/safety communication. |
| [Pexels 18631420, Vladimir Srajber](https://www.pexels.com/photo/machinery-in-factory-18631420/) | Downgraded: prominent labels and branded packaging dominate the machine detail. |
| [Pexels 31762068, Vadym Alyekseyenko](https://www.pexels.com/photo/yellow-excavator-at-sunset-on-construction-site-31762068/) | Hero reserve only: machinery occupies the left text area, fences/poles clutter the composition. |
| [Pexels 3862635, ThisIsEngineering](https://www.pexels.com/photo/female-engineer-with-equipment-3862635/) | Reserve only: credible technical portrait but laboratory setting is less aligned with heavy industry. |
| [Pexels 4741958](https://www.pexels.com/photo/purification-tanks-of-old-wastewater-treatment-plant-4741958/) | Rejected at source screening: abandoned wastewater/chemical site, not dependable operational supply. |
| [Vecteezy 74419435](https://www.vecteezy.com/photo/74419435-lubricating-heavy-duty-gears-in-an-industrial-workshop) | Rejected: publisher explicitly marks it AI-generated. |
| [Metso elution page](https://www.metso.com/portfolio/elution-and-goldroom-plant/) | Technical reference only; no Zieve republication rights, and process renders must not be passed off as photographs. |

Subject mismatch and unknown rights were not traded for a superficially industrial look. See the selection report and rights register for the remaining gate.
''')
(r/'IMAGE_SELECTION_REPORT.md').write_text('''# Stage A image selection — review required

**Research shortlist ready; no production integration approved or performed.**

Open [REVIEW_BOARD.html](REVIEW_BOARD.html) locally, or view [desktop board](screenshots/research-board-1440.png) and [mobile board](screenshots/research-board-390.png). These are research/crop studies, not modified homepage screenshots. Exact sources, original URLs, native dimensions, proposed local filenames, captions and alt text are in IMAGE_SOURCE_REGISTER.md; rights evidence is in IMAGE_LICENSE_REGISTER.md.

| Placement | Proposal | Decision requested |
|---|---|---|
| Hero | PH01, Built Robotics excavator | Approve composition/crop direction only after reviewing conspicuous third-party marks. |
| Company | PH02, heavy component and worker | Approve technical editorial direction and portrait crop. |
| Earthmoving | PH03, tracked excavator on gravel | Approve distinct daylight equipment image. |
| Elution/gold | PH04, identified elution/electrowinning photo | Retain schematic unless original/permission is supplied; GOLD-B is a paid, broader-processing alternative. |
| Chemicals | PH05, chemical/refinery infrastructure | Approve as illustrative application context, never a Zieve production site. |
| Lubricants | PH06, machinery lubrication application | Retain schematic pending owner permission, or authorise research/acquisition of a suitable paid alternative. |
| Spares | PH07, threaded clamps/fittings | Conditional choice: approve the reflective macro treatment or request a quieter product still life. |
| Mining | PH08, aerial extraction/handling | Approve context without claiming gold or Zimbabwe location. |
| Civil | PH09, road paving at twilight | Approve activity and cool/warm contrast. |
| Manufacturing | PH10, machined shaft and worker | Approve paired use with PH02; distinct image, same photographer. |
| Agro-processing | PH11, grain silos/transfer structure | Approve grain-handling context without claiming a milling installation. |

## Creative conclusions

PH01 provides the clearest left typography space and right machinery weight, but a narrow mobile cover crop cannot show the whole machine. The study intentionally retains the cab/tracks; inspect that tradeoff rather than promise an impossible full-boom crop. PH02/PH10 communicate real scale and engineering. PH05 is explicitly chemical-process context, PH08 is mineral extraction/handling, PH09 is active roadwork, and PH11 is grain handling rather than a generic farm. PH07 is category-accurate but its highlights are a subjective style choice. Final colour treatment and in-page contrast cannot be approved from review derivatives.

## Explicit gate

Section 16 of the user's brief says: “STOP and request review if images require paid licenses, permissions or subjective brand approval.” All selections require brand judgment; PH04/PH06 additionally need permission. Therefore Stage B is not started. The nine free-license source records are copyright-license eligible, **not universally release-cleared or production-ready**. No purchased licence is implied by a paid shortlist entry.

Requested review: approve/reject the nine free-license image/crop directions and state whether to retain the two specialist schematics or pursue owner/paid alternatives. Approval of this shortlist does not authorise purchasing stock, contacting publishers, deploying or implementing Phase 11B. A paid asset must have explicit budget/acquisition approval and a suitable licence before integration.
''')
(r/'IMAGE_INTEGRATION_REPORT.md').write_text('''# Image integration report

**Stage A only — Stage B not started.** No application/configuration/asset files were modified and no image was placed in public/. Existing schematics and provenance labels remain active. Proposed filenames in the inventory are plans, not installed assets. No remote hosts were added to Next configuration.

## Existing implementation and approved-stage plan

| Placement | Existing configuration | Preserved presentation |
|---|---|---|
| Hero | src/config/hero-media.ts | Viewport-cover image, current navy overlay, live heading/actions, wrapping caption/scroll footer, decorative empty alt, restrained entrance. |
| Introduction | src/config/introduction-media.ts | 5:6 reserved mask, descriptive alt/caption, responsive sizes and existing image reveal/parallax. |
| Five divisions | src/config/solutions-media.ts | 16:10 frames, active-only media, existing selector/keyboard/inert panels, responsive sizing and reduced motion. |
| Four sectors | src/config/industry-media.ts | 4:3 frames, alternating content-first layout, lazy images, existing masks/parallax and reduced motion. |

Once approved, acquire originals through the original publishers' download controls; record final files/rights evidence and export appropriately sized local WebP photographs under public/images/industrial/{hero,company,solutions,industries}. Preserve independent schematic fallback entries and accurate stock captions. Do not use the 1200px research copies as production masters. Do not make remote URLs into permanent production dependencies.

Use existing next/image optimisation. Below-fold images are lazy and have established sizes; preserve frame ratios and focal points. The hero image is the only high-priority photograph. Review its current schematic underlay, which is also marked priority, when switching kinds so a fallback does not compete unnecessarily with the primary image; any such change must be restricted to necessary photo/fallback presentation. Native art-direction support already exists for an approved mobile source. No Three.js, new gallery library, new section, typography change or routing framework is needed.

Two rights-blocked entries stay as schematics unless appropriate written permission/paid rights and brand approval are recorded. Never publish the reference PDFs, their watermarked stock previews or a generic unrelated plant as a substitute.

## Required Stage B verification

Verify original-resolution crops in the actual application at 375/390/768/1024/1440/1920px, normal/reduced motion, active division changes, image failures and small screens. Inspect hero contrast against the existing gradient without redesigning it; preserve Phase 11A enlarged-text and discovery behaviour. Run lint, strict TypeScript, production build, unit/component and full Playwright tests. Compare local image requests/bytes, loading priority, LCP and CLS with a freshly measured baseline using identical conditions. Record client vs production limitations. No after-integration claim can be made before this stage.
''')
(r/'PERFORMANCE_REPORT.md').write_text('''# Photography performance report — Stage A

**No photography has been integrated. No before/after improvement, LCP gain, CLS guarantee or production Core Web Vitals is claimed.**

The original source dimensions in the register are suitability evidence, not proposed transfer sizes. Fourteen small review derivatives are stored only in documentation; their measured bytes are in evidence/review-downloads.json. They are not loaded by the application and must not be counted as website image payload.

Existing image presentation reserves frame geometry, lazily loads below-fold imagery and exposes responsive sizes. Hero photography has high priority; the current decorative schematic underlay is also priority and must be checked when switching to an approved photo. Existing local Next Image support avoids broad remotePatterns or runtime stock-service dependencies.

## Delivery targets for the approved stage

Use native masters with sufficient crop detail. Evaluate a roughly 2560px long-edge hero master (and an explicitly approved mobile crop if needed), and roughly 1600–2000px long-edge below-fold masters, then inspect delivered DPR/srcset quality. Those are starting targets, not final output dimensions or measured bytes. Retain the 5:6, 16:10 and 4:3 frame geometry. Test WebP quality visually rather than set an arbitrary compression level that erases equipment detail. Prefer a single primary hero request, bounded source sizes and lazy lower images.

A photo will substantially outweigh a schematic. Actual transfer budgets must follow full-resolution approval, crop/encoding and production responsive delivery. Do not compare a thumbnail's byte count with a full hero and call it an optimisation.

The fresh unchanged-application regression baseline is recorded under evidence/. Current baseline screenshots contain schematics. After Stage B, repeat local measurement under identical viewport/device/network/CPU/cache conditions and distinguish laboratory samples from field CWV. Until then, image optimisation, final-image loading, LCP/CLS comparison and animation smoothness with photos remain **pending**, not passed.
''')
(r/'VISUAL_QA_REPORT.md').write_text('''# Visual QA — Stage A research

## What was actually reviewed

The downloaded free-license review derivatives were opened and inspected. Bad scrap/portrait/branded-packaging choices were rejected or downgraded. The research board shows nine proposed photographs in approximate target frames and two clearly held permission references; the hero has separate landscape/narrow crop studies. It is a standalone documentation artefact, not an injection into the website.

Desktop/mobile screenshots of that board and unchanged homepage baseline are in screenshots/. Research crop boards are captured at 375/390/768/1024/1440/1920px, while full baseline homepage captures use desktop/mobile. Board typography and navy overlay merely support image evaluation; they do not certify the exact final homepage contrast or composition. Final original-resolution contrast, object positioning, transition smoothness, fallbacks, overflow and CLS with photographs remain Stage B requirements.

## Placement cautions

- Hero: clear left space, strong right machine; narrow crop loses part of the boom. Built/Komatsu marks remain visible. No implied partnership/ownership.
- Company/manufacturing: relevant, distinct heavy-engineering subjects; same photographer creates tonal coherence but paired use may feel repetitive. People are not Zieve staff; model/property details are not independently certified.
- Chemicals: process infrastructure, not Zieve chemical production.
- Spares: fittings/clamps only; reflective colour treatment is conditional, not automatically “premium”.
- Mining: surface extraction/handling; no inferred commodity or geography.
- Civil: useful work context; inspect faces, blur and glare at final dimensions.
- Agro: grain handling/storage, not a verified food-processing line.
- Gold/lubricants: specialist crop/photo quality cannot be signed off from a source PDF reference; keep schematics pending originals and permission.

No image is represented as an actual Zieve facility, project, inventory, employee or customer. Existing live schematic provenance remains unchanged. No claim that photography QA has passed the actual website is made before integration.
''')
(r/'FINAL_READINESS_REPORT.md').write_text('''# Phase 11A.5 readiness — Stage A

**Research and review package complete; HOLD at the user's Stage A approval gate.** Stage B is not started, and AUD-03 is not yet resolved.

- Eleven distinct placements inventoried: nine proposed free-copyright-license photographs and two technically relevant permission leads. Additional free alternatives/rejections and paid alternatives are recorded.
- Original publisher/licence pages were opened. Photographer/contributor names, URLs, native dimensions where verified, crop direction, proposed files, alt/caption and approval status are recorded. Two originals remain unavailable; those fields explicitly say unknown rather than inventing an asset URL.
- Copyright permission, model/property/trademark issues and Zieve brand approval are separate. No photo is labelled production-ready; no paid licence or publisher permission was acquired. Free does not mean public domain or blanket brand endorsement.
- Only documentation, review copies and review screenshots were created. The existing site, media configs, original logo, fonts/tokens, navigation, all nine sections, schematics and quotation handling remain unchanged. Source integrity is recorded in evidence/scope-integrity.json.
- Verification run here is the unchanged-application baseline, not an after-image result. Exact lint/type/build/unit/browser results are in evidence logs; final original-image performance and in-page responsive QA remain pending approval/integration.
- Approval needed: review the nine proposed image/crop directions; decide whether to keep the two specialist schematics or pursue verified owner/paid alternatives. Specific source/brand concerns are in the selection and licence registers.

The gate originates in Section 16 of the supplied brief: “STOP and request review if images require paid licenses, permissions or subjective brand approval.” This task meets those conditions. No request to pay, download unlicensed originals, publish images, start Phase 11B, change typography or deploy is inferred.

After explicit selection/rights approval, Stage B can acquire approved originals, integrate through the existing configuration/fallback architecture, execute all requested verification and produce a real before/after report. Stop here for review.
''')
