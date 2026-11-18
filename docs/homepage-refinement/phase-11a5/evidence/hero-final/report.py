from pathlib import Path
import json,statistics,hashlib
r=Path('docs/homepage-refinement/phase-11a5');e=r/'evidence/hero-final';a=json.loads((e/'acquisition.json').read_text());qa=json.loads((e/'responsive-qa.json').read_text());contrast=json.loads((e/'contrast.json').read_text())
assert all(t['minimumSampledContrast'] >= (3 if i < 2 else 4.5) for row in contrast for i,t in enumerate(row['text'])), 'Contrast check failed'
base='# Phase 11A.5 — final PH01 integration\n\n**R1 Sunrise Excavator is installed. R2 is rejected for this checkpoint.** Updated 2026-11-17. This PH01-only update supersedes the earlier hero hold; the other six configured photographs and four held placements are unchanged.\n\n'
source='[Original Pexels photograph](https://www.pexels.com/photo/silhouette-of-excavator-at-sunrise-11562423/) · [Pexels licence](https://www.pexels.com/license/) · [Detailed terms](https://www.pexels.com/terms-of-service/)\n\n'
assets='| Asset | Dimensions | Bytes | Native crop (left, top, width, height) |\n|---|---|---:|---|\n'
for x in a['assets']:assets+=f"| `{x['path']}` | {x['width']} × {x['height']} | {x['bytes']:,} | {', '.join(str(x['crop'][k]) for k in ['left','top','width','height'])} |\n"
crops='Desktop uses the proposed 2600×1463 native crop starting at (0,650), with object-position **85% 50%**. That position protects tablet supporting-text contrast without changing the overlay. Mobile uses native (1350,0,1100,1750), encoded to 1000px wide, with **50% 50%**. The mobile crop removes excess lower ground and places the excavator below the heading/CTA group at the checked 390px layout. No mirroring, generative edits, recolouring or image URLs from search previews. Original 3648×2736 JPEG was freshly acquired and fully decoded.\n\n'
maintained='Hero copy, typography, action labels/destinations, layout/CSS, overlays, animation logic, design tokens, navigation, quotation form, other sections and all existing approved photographs are unchanged. Only hero-media.ts config, two WebP assets, PH01 tests and documentation changed. No component rebuild, package installation, font/logo/inner-page/deployment changes, Phase 11B or deployment.\n\n'
def save(name,text,history=True):
 old=(e/(name+'-before.md')).read_text()
 if history:text+='\n---\n\n## Earlier six-photo checkpoint — historical\n\nThe records below remain relevant to the other placements. Any PH01 hold or R2 proposal below is superseded by the final R1 decision above.\n\n'+old
 (r/(name+'.md')).write_text(text)
save('IMAGE_SELECTION_REPORT',base+source+crops+assets+'\n**Current state:** seven photographic placements: PH01 R1, PH02, PH05, PH07-B, PH08, PH10, PH11. PH03/PH04/PH06/PH09 remain their labelled schematics. R2 is not installed. No additional selection approval was requested or inferred.\n')
save('IMAGE_SOURCE_REGISTER',base+source+f"Photographer: **Metehan Özaras**. Acquired **{a['acquired'][:10]}** from the original page's Free download link. Full original: {a['originalWidth']}×{a['originalHeight']}, {a['originalBytes']:,} bytes. Working master `{a['localOriginal']}` is outside public/ and temporary; re-acquisition URL/hashes are retained for reproducibility.\n\nDownload: {a['download']}\n\nOriginal SHA-256: `{a['originalSha256']}`. Both derivative hashes are in [acquisition.json](evidence/hero-final/acquisition.json). Native metadata and full decode matched the publisher's dimensions.\n\n"+assets+'\n'+crops+'The image is decorative (`alt=""` inside the existing aria-hidden visual); the visible caption credits Metehan Özaras / Pexels and explicitly says it is not a Zieve site. No equipment ownership, location, customer or project claim was added.\n')
save('IMAGE_LICENSE_REGISTER',base+source+'''## PH01 R1 — source-specific intended-use check

- Individual Pexels file **11562423** names **Metehan Özaras**, reports **3648×2736**, exposes a Free download and links to the Pexels licence. The fresh authorized download matches this subject and dimensions; its original and derivative hashes are recorded.
- Detailed terms §5 permit commercial/noncommercial downloading, copying and modification subject to prohibited uses; §6 makes attribution optional. Cropping and WebP encoding are used in a combined designed website hero, not a standalone stock/resale product.
- The original and crops were inspected. No prominent manufacturer mark, readable brand or identifiable portrait was observed. Distant silhouettes have no recognizable faces. This is generic industrial context; the caption disclaims a Zieve site and does not imply endorsements, employees, inventory or ownership.
- No per-file model/property certificate was supplied or invented; Pexels does not warrant all additional consents. The review is specific to the observed anonymous, unbranded combined website use, not blanket permission for future portrait/brand uses.
- Attribution is optional under the licence, but photographer/publisher credit is displayed in the existing caption. No purchase or third-party permission request occurred.
- Acquired/rechecked **2026-11-17**. R1 direction is explicitly user-approved; R2 rejected. Rights restrictions on PH03/PH09 and the instructed PH04/PH06 holds remain unchanged.

'''+assets)
save('IMAGE_INTEGRATION_REPORT',base+crops+assets+'\n'+maintained+'''The existing HeroImage picture uses its mobile source below 48rem and desktop source at/above 48rem, responsive Next Image srcsets, eager/high-priority photo loading and decorative empty alt text. Only the matching photo crop is requested at a fixed viewport. The existing small schematic underlay/preload remains intact; image failure restores its accurate caption and the original schematic. Double failure leaves readable navy, content and working actions. No video is introduced.

Unit tests verify source-file hashes, the retained independent schematic and optimized markup. Browser tests verify art direction and successful decoding across five widths, high fetch priority, correct stock caption, photo failure, double failure, reduced motion, 200% text reflow and CDP 2× visual magnification. Existing full navigation/form/section regressions run unchanged except obsolete hero-schematic assertions now expect the approved photograph.

''')
perf=base+'## Local before/after measurement\n\nFresh cache-disabled Chromium contexts; two desktop samples (1440×900, DPR1, unthrottled) and two mobile samples (390×844, DPR1, 4× CPU, 150ms latency, 1.6Mbps down/750Kbps up). Same harness and local production server before/after; final timings run after other browser jobs completed. Server-side optimizer caches are warm after QA. These are local laboratory samples, not field CWV, native-device performance, Lighthouse scores or statistical evidence. Image source-body sizes are not total website transfer.\n\n| Profile | State | Median initial LCP ms | Median initial subresource transfer bytes | Full traversal CLS samples |\n|---|---|---:|---:|---|\n'
for label,mobile in [('Desktop',False),('Mobile',True)]:
 for state in ['before','after']:
  d=json.loads((e/f'performance-{state}.json').read_text());rows=[x for x in d['runs'] if x['mobile']==mobile];lcp=[x['initial']['metrics']['lcp'][-1]['start'] for x in rows if x['initial']['metrics']['lcp']];cls=[sum(t['value'] for t in x['final']['metrics']['shifts'] if not t['input']) for x in rows]
  perf+=f"| {label} | {state} | {statistics.median(lcp):.0f} | {statistics.median(x['initialResourceTransferBytes'] for x in rows):,.0f} | {', '.join(f'{x:.5f}' for x in cls)} |\n"
perf+='\nThe before state already includes the six earlier photographs and uses a schematic hero. The after state adds R1. Do not confuse this comparison with the earlier all-schematic baseline below. LCP candidate/paint details and request timings are in the raw before/after JSON. No causal loading improvement is claimed from two samples.\n\n'+assets+'\n## Actual hero responsive delivery\n\n| Viewport | Optimized photo URL | Encoded bytes | Request duration ms |\n|---|---|---:|---:|\n'
for q in qa:
 for res in q['resources']:
  if 'sunrise-excavator' in res['url']:perf+=f"| {q['width']} | {res['url'].replace('http://127.0.0.1:3102','')} | {res['encodedBytes']:,} | {res['duration']:.1f} |\n"
perf+='\nThese five-width resource entries come from responsive screenshot sessions, not the isolated throttled timing benchmark. Reserved hero geometry and source art direction avoid an image-driven resize. Small existing tablet startup hero/header shifts remain documented in responsive QA; zero CLS on every device is not claimed. Next Image and existing loading behavior were reused without changes to header/motion/layout.\n'
save('PERFORMANCE_REPORT',perf)
visual=base+'Actual production-build captures, not the review board:\n\n| Width | Hero | Full homepage | Overflow | Capture CLS |\n|---|---|---|---|---:|\n'
for q in qa:visual+=f"| {q['width']} | [hero](screenshots/hero-final/hero-{q['width']}.png) | [homepage](screenshots/hero-final/homepage-{q['width']}.png) | {'None' if q['scrollWidth']<=q['width'] else 'Present'} | {q['cls']:.5f} |\n"
visual+='\n'+crops+'''## Readability, accessibility and behavior

The actual desktop/mobile screenshots were opened for crop/subject and text inspection. Mobile refinement moves the small excavator away from the last headline line; desktop remains right-weighted with left typography space. Main subject and sunrise focal point remain within the crops. Decorative empty alt is appropriate because the existing text carries the message; photographer/non-ownership provenance remains visible.

Contrast is checked using actual screenshot background pixels after hiding foreground editorial/footer opacity without reflow, plus computed text foreground colours. Sampling every two pixels across the normal text range rectangles gives a conservative background-box check, not antialiased-glyph or complete conformance certification. Measured ratios below are compared to [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 3:1 for the large headline, 4.5:1 for normal supporting copy. The overlay, typography and tokens were not changed; the tablet focal adjustment improved the initial supporting-copy edge case.

| Width | White headline | Amber headline | Supporting copy |
|---|---:|---:|---:|
'''
for q in contrast:visual+=f"| {q['width']} | "+' | '.join(f"{t['minimumSampledContrast']:.2f}:1" for t in q['text'])+' |\n'
visual+='''
All photo requests in the responsive inventory decoded; fixed-viewport browser tests assert only the matching mobile/desktop crop is requested. Existing tests cover header/menu keyboard behavior, Escape/focus/body locking, destinations, no-JavaScript content/actions, reduced-motion static rendering and preference cleanup, 200% root text at seven widths, and 2× CDP page-scale magnification. CDP page scaling is pinch-style visual magnification; native browser-chrome zoom and physical-device/screen-reader validation are not certified by these tests.

No horizontal overflow, clipped actions, new page errors or image-frame collapse was observed. Existing small tablet startup header/hero movement remains outside this image-only change. Final source/CSS/token/component hashes verify the other sections, approved photos and navigation behavior were preserved. No PH03/PH04/PH06/PH09 changes.
'''
save('VISUAL_QA_REPORT',visual)
ready=base+'''**PH01 implementation and verification complete. Stop here; no Phase 11B or deployment.**

- R1 Sunrise Excavator by Metehan Özaras is integrated through the established hero media configuration. R2 rejected. The original schematic remains intact beneath the photograph and on image failure.
- Original Pexels page, detailed commercial/modification/download terms, photographer, acquisition date, native resolution and exact file hashes are recorded. Visible caption identifies illustrative stock and disclaims a Zieve site. No blanket model/property-release claim, purchase or permission request.
- Two optimized local WebP derivatives use the approved desktop starting crop and a refined mobile crop, without mirroring. Existing navy overlay, copy, layout, fonts, CTA destinations, animation behavior and header remain intact.
- ESLint, strict TypeScript and production build passed. **44 unit/component tests across 12 files** and the **full 132-test desktop/mobile Playwright suite** passed.
- Actual homepage/hero screenshots captured at **390, 768, 1024, 1440 and 1920px**. No horizontal overflow or page errors in responsive inventory. Sampled headline/supporting-copy contrast passes the relevant normal-text/large-text thresholds at these widths.
- Responsive image selection/loading, failures, reduced motion, enlarged text, CDP visual magnification and existing navigation/quotation/section regressions checked. Local before/after LCP, payloads and layout shifts measured; no production CWV claim. Native browser-chrome zoom and physical assistive-technology testing remain unverified.
- PH02/PH05/PH07-B/PH08/PH10/PH11 photography is unchanged. **PH03/PH04/PH06/PH09 remain labelled schematics** with their existing rights/instruction holds. No logo/font/inner-page/deployment configuration changes or dependencies added.

## Files changed at this checkpoint

`src/config/hero-media.ts`; two assets under `public/images/industrial/hero/`; `tests/hero.test.ts`, the PH01 assertion in `tests/photography.test.ts`, the hero failure case in `tests/e2e/hero.spec.ts`; new `tests/e2e/hero-photography.spec.ts`; the seven Phase 11A.5 reports, this checkpoint's evidence/screenshots and small documentation status updates. All production component/CSS/motion files and other media maps/assets are unchanged relative to the checkpoint snapshot.

## Evidence and remaining dependencies

See [source register](IMAGE_SOURCE_REGISTER.md), [licence register](IMAGE_LICENSE_REGISTER.md), [visual QA](VISUAL_QA_REPORT.md), [performance report](PERFORMANCE_REPORT.md) and `evidence/hero-final/`. Source-integrity JSON distinguishes this PH01 checkpoint from earlier uncommitted work. Small pre-existing tablet startup hero/header sizing shifts remain recorded; no universal zero-CLS guarantee. Remaining photography dependencies are the four held placements, not further R1 selection approval. Existing broader release requirements (approved brand masters/webfonts and other earlier gates) are unchanged. Nothing was deployed.
'''
save('FINAL_READINESS_REPORT',ready,False)
# Protect pre-existing uncommitted work, not just the Git baseline.
before=json.loads((e/'before-hashes.json').read_text());changed=[p for p,h in before.items() if not Path(p).exists() or hashlib.sha256(Path(p).read_bytes()).hexdigest()!=h];allow={'src/config/hero-media.ts','tests/hero.test.ts','tests/photography.test.ts','tests/e2e/hero.spec.ts'};new=[str(p) for folder in ['src','public','tests'] for p in Path(folder).rglob('*') if p.is_file() and str(p) not in before];(e/'scope-integrity.json').write_text(json.dumps({'changedExistingFiles':changed,'unexpectedExistingChanges':[p for p in changed if p not in allow],'newFiles':new,'otherMediaAndSourcePreserved':not any(p not in allow for p in changed)},indent=2)+'\n')
