# Content provenance

The sole business source is the supplied executive premium company profile, retained at the workspace root. Source page references are physical PDF pages; page 1 is the cover. `profile-extracted.txt` allows text review without modifying the source PDF.

| File | Content | Source pages |
| --- | --- | --- |
| company.ts | Registered name, positioning, description, tagline | 2, 3, 12 |
| company.ts | Mission, vision and five core values | 11 |
| services.ts | Five service divisions, key offerings and client groups | 4–8 |
| industries.ts | Sectors served | 3 |
| contact.ts | Address, phone and email | 3, 12 |
| navigation.ts | Header navigation, canonical routes and quote action | User-supplied Section 01 labels; service labels from pages 4–8; quote email from pages 3, 12 |

The description is a condensed source excerpt. Service offering strings normalise table formatting without expanding scope. No achievements, clients, certificates, partnerships, projects or operating statistics have been added. The elution capacities are sourced product specifications, not invented operating statistics. Market assertions in the profile are not repeated as verified current market facts.

The address intentionally retains **Miton Park**, the spelling in the profile. Confirm this spelling with the owner before publication; do not silently substitute Milton Park. Telephone URI formatting removes spaces only. No operating hours, social accounts, registration number or map coordinates have been invented.

Profile image captions describe illustrative/editorial contexts. The only extracted image used in the app is the actual logo. Future illustrative assets require clear labelling and must not imply Zieve ownership or completed projects.

The development preview contains interface copy, not marketing claims. Future pages should import business content from these files rather than duplicate it. Preserve source references whenever content is extended.

Section 01 uses “Earthmoving & Construction Equipment” from page 5 as the first division label. Desktop and mobile derive their five solution links from the same services array. The quote CTA opens the source email address with a prefilled subject; it does not claim a working enquiry backend. Route-status copy is explicitly development UI, not company marketing content.


Section 02 copy lives in `src/content/hero.ts`. The eyebrow, supporting sentence and CTA label are the user's exact Section 02 brief, consistent with profile pages 2–4. The two headline lines reproduce the existing company tagline (page 12). The quote destination remains the email address from pages 3 and 12. No new claims, statistics or achievements were added.

`public/images/hero/industrial-placeholder.svg` is original code-authored geometric linework. It is explicitly a schematic placeholder, not a facility photo, equipment specification or record of company work. No stock or PDF editorial photographs were republished for the hero. The visible caption continues to identify the missing approved photography. Future image/video config must record rights approval and preserve an accurate caption.


Section 03 content lives in `src/content/introduction.ts`. “Built around uptime.” and “Reliable Supply. Real Impact.” come from the Executive Summary on physical PDF page 2. The narrative and eyebrow are the user's approved editorial adaptation of that summary. They explain the costs of supply downtime and the integrated industrial-supply positioning without adding operating achievements or statistics. The introduction media reuses the existing illustrative equipment schematic, with explicit non-facility alt text and caption; approved photography remains pending.


Section 04 uses `src/content/solutions-showcase.ts`. Names, slugs and source references derive from the existing services array, with routes reused from solution navigation. The section heading, supporting sentence and division descriptions are the user's approved brief, consistent with portfolio pages 4–8. Short panel headlines reproduce profile captions/headings from pages 5–8 with sentence case/punctuation. There are no added availability, price, product-brand or operating-specification claims. Division identifiers 01–05 are portfolio positions, not business statistics.

The five visual fallbacks are distinct illustrative line schematics. Four are newly code-authored; equipment reuses the existing schematic. Every image/caption identifies the illustrative status and avoids claiming actual facilities or inventory. Rights-approved photography is still pending. Replacement configuration is isolated in `src/config/solutions-media.ts`.


Section 05 uses `src/content/industry-experience.ts` with source references to physical PDF pages 3–8. The user-approved four narratives retain Mining & Mineral Processing, Civil & Infrastructure Construction, Manufacturing and Agro-processing. The profile's combined manufacturing/agro-processing category is split editorially for these panels; the original Phase 0 overview remains unchanged. Civil construction explicitly includes government agencies and public infrastructure procurement as sectors/procurement contexts, not named contracts or completed work. Application subheadlines are editorial summaries, not historical achievements or performance guarantees. Relevant product categories reuse existing solution names and routes.

Four original sector illustrations are clearly labelled placeholders and explicitly do not depict Zieve projects, facilities or customers. Photography is pending; configuration and rights references live in `src/config/industry-media.ts`.


Section 06 content is centralized in `src/content/advantage.ts`, including the five typed operating pillars. Names and the closing sentence trace to physical PDF page 10. The user's Section 06 descriptions deliberately soften the original profile's guarantee wording; those exact supplied descriptions are retained. No testimonials, certifications, guarantees, delivery metrics, contracts or performance statistics were added. The introductory heading/supporting sentence are the approved brief's editorial copy.


Section 07 uses `src/content/purpose.ts` as a presentation view over `company.ts`. It references the canonical vision, mission and five values directly, with the original physical page 11 source. It does not duplicate or paraphrase the statements. Typographic apostrophes from the profile remain intact. The eyebrow and section heading follow the user's brief. No new corporate history, award, certification, external partnership or environmental claim was introduced.


Section 08 uses `src/content/quotation.ts` for the user's approved page 12 adaptation. The official address/telephone/email remain exclusively in `contact.ts`; the profile's “Miton Park” spelling is preserved. Company identity comes from `company.ts`, categories from services, and industry labels reuse the sector data with the requested Government/Public Sector and Other options. No response times, stock promises, procurement achievements or delivery guarantees were added.

Request a Quote now points to the stable Section 08 form anchor throughout the header/mobile menu and hero, superseding earlier checkpoint notes describing an immediate mailto link. The form's separate mailto adapter still uses the official contact recipient. All form/draft language states that email must be sent manually and never claims website delivery.


Section 09 uses `src/content/footer.ts` for the exact supplied editorial supporting description and label configuration. Company name/tagline reference company.ts; contacts reference contact.ts; primary and solution links reference the existing canonical navigation arrays without duplicate route data. Harare, Zimbabwe derives from the official address. Request a Quote targets the existing Section 08 form. No legal claims, social accounts, statistics, map location or new corporate achievements were invented. Copyright uses the current Harare calendar year; it does not claim a founding date.


Phase 11A retains all canonical route definitions and profile copy but gives homepage discovery a separate derived anchor view. Primary exploration points to existing introduction/solutions/industries/advantage/contact sections; each named division points to its existing solution-panel hash. Request a Quote remains /#request-a-quote. The panel action now reads “Link to this solution” to describe its permalink purpose. No brand assets, business descriptions, claims or source data changed. See the Phase 11A link inventory for the complete old/new mapping.
