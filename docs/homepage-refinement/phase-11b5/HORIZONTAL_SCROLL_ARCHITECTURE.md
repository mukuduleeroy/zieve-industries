# Horizontal Industries architecture

Phase 11B.5 · 18 November 2026 · local implementation, no deployment.

## Progressive enhancement

The server-rendered section owns one H2, an ordered list of four named articles/H3s and existing solution links/media/captions. No duplicated content or artificially focusable panels. `IndustryMotion` is now a small client stage boundary using `useIndustryScroll`; server content is readable before hydration and without JavaScript.

The baseline is navy document flow, with content-first stacking below64rem and existing alternating desktop composition when enhancement is unavailable. All four panels share navy, white text and amber details. Enhanced panels use consistent left text/right4:3 media. Stage-local title scale uses existing tokens; no global typography, colour or font-family change.

## Eligibility and measurement

Horizontal enhancement requires at least80rem width,48rem height, fine pointer, hover capability, no reduced motion, root text size≤20px, and **actual content fit**. Thus coarse-pointer tablets/mobile, enlarged text, narrow/short windows and overflowed panels remain readable vertically. CSS reflow rather than device-name sniffing drives eligibility. A failed fit is memoized by viewport/header/font size to prevent ResizeObserver enable/disable loops.

On enhancement, stage height is actual window height minus measured header height. Horizontal travel is `track.scrollWidth - viewport.clientWidth`. Scene height is stage height plus travel. CSS `position:sticky` keeps the stage below the existing header; GSAP ScrollTrigger maps native vertical travel to a compositor-friendly negative X transform and the progress line. There is **no GSAP pin spacer**, wheel interception, scroll snapping or scroll-jacking. The fourth panel reaches the end before CSS sticky naturally releases.

ResizeObserver watches stage/text/captions/header; viewport/capability changes and image loads coalesce through requestAnimationFrame. Travel/end values are functional, invalidateOnRefresh is enabled, and the owned trigger refreshes against measured geometry. No layout measurement runs in each scroll update; onUpdate changes only an aria-hidden index and warms current/next media. No React state updates per frame.

## Accessibility and navigation

Reduced-motion changes revert translation/trigger and return every article to flow. Keyboard/AT focus entering a panel link (or focus on an offscreen target) permanently switches this scene instance to document flow, then keeps that actual focused link in view. Visible pointer-focus targets stay in place through pointerup/click; pointer/keyboard listeners are removed on cleanup. Native Tab/Shift+Tab semantics are retained; no carousel/ARIA-menu role, focus trap, hidden content or announcement on each scroll frame.

Direct industry-panel hashes start or switch to flow. Generic Industries anchor retains native section focus/scroll semantics. Conservative startup with another hash retains document flow instead of changing document height underneath an existing anchor. Mode removal preserves the current reading panel, or adjusts for removed upstream travel if the reader is below the scene. No artificial focus is assigned to panels. Native history/header/form interactions remain.

## Lifecycle

GSAP/ScrollTrigger import on the client only after capability checks. One scoped context owns the timeline/trigger; stale async generations are rejected. Cleanup reverts the context, removes mode/CSS dimensions, disconnects ResizeObserver/media observers, cancels scheduled frames and removes resize/hash/focus/load/preference listeners. Existing motion engines do not animate the same track. Strict Mode effect cleanup has cancellation guards; repeated preference/resize/navigation tests exercise lifecycle behaviour. No global ScrollTrigger kill, ScrollTrigger defaults or package added.

Remaining validation limits: local Chromium profiles only, no native Safari/Firefox/physical iOS certification; inspect final-font metrics and native zoom again after separately approved asset work. CSS sticky and content-fit fallback deliberately favour reading over forcing horizontal panels into unsuitable windows.
