# AUD-02 — Homepage discovery navigation

## Pre-change inventory

The [complete link inventory](evidence/LINK_INVENTORY.md) records labels, area, original destination/status, replacement and rationale for every baseline anchor. It was captured before source changes in [links-before.json](evidence/links-before.json). Canonical routes were valid HTTP destinations but rendered reserved-page UI.

## Approved mapping

| Discovery label | Old destination | New destination |
|---|---|---|
| Home | / | / (retained) |
| About Us | /about | /#company-introduction |
| Our Solutions / hero discovery / overview | /solutions | /#industrial-solutions |
| Industries | /industries | /#industries-we-serve |
| Why Zieve | /why-zieve | /#zieve-advantage |
| Contact | /contact | /#partner-with-zieve (official contact block and form) |
| Each of five named solutions | /solutions/{slug} | /#solution-panel-{slug} |
| Request a Quote | /#request-a-quote | Retained exactly |

Mission/Vision/Values retain their existing section ID and reading order; there was no separate discovery link needing replacement. No new navigation item or duplicate section ID was introduced. All existing development routes remain available directly and through browser history. Indexing configuration is unchanged.

## Architecture and behaviour

`homepage-navigation.ts` derives the homepage labels and children from canonical navigation/services, with a separate destination view. `navigation.ts`, its canonical routes and status-page contracts remain intact. Header/mobile/footer consume the homepage view; hero uses the solutions anchor; division data supplies the same context-preserving links to solution panels and industry recommendations. Existing quote configuration and submission architecture are untouched.

A native Anchor primitive reuses existing link styling for document navigation, preserving native hashchange, refresh, history and no-JavaScript section navigation. The bare Home route keeps Next Link behaviour. Relevant section wrappers receive tabIndex=-1 so native anchor activation has a meaningful focus target. Sticky-header scroll-padding continues to use the existing measured header height.

The selection hook validates hash slugs against the existing divisions. Initial entry, hashchange and popstate select the matching panel; a separate post-commit effect waits for computed visibility, then focuses and aligns the visible, non-inert article. Pending focus yields to an already-focused selector and is cancelled by a new focus/pointer/key interaction and on cleanup. The focus effect and subscription frame/listeners clean up. This ordering fixes a race discovered by the new direct-link checks: a timed callback could previously attempt focus before the inert attribute was removed.

Selector activation keeps focus on the button/native select and replaces the current URL hash without scrolling or adding history entries. Native discovery links add normal anchor history. Back/forward and refresh therefore retain solution context. Unknown slugs are ignored rather than used as arbitrary selectors or routes. No new router, query framework or package is needed.

The existing panel action now says **Link to this solution**. It is an honest permalink to the visible panel rather than “Explore Solution” suggesting an unfinished detail page. Accessible text includes the division name. This intentionally limited behaviour does not pretend to replace future detailed product pages.

## Coverage and limits

Checks cover generic and solution-specific links from desktop/mobile/header/footer/industry contexts, direct entry, refresh, history, sticky offset, focus, quotation preservation and canonical route availability. JavaScript is required for interactive deep selection as it was for the selector; without it, generic anchors/contact links and the existing noscript list of all five descriptions remain available. No full solution detail experience or future inner page was built.

See REGRESSION_REPORT.md for executed results and FINAL_QA_REPORT.md for remaining release limitations. Historical Phase 10 audit reports remain unchanged.
