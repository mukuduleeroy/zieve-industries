# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-11b6.spec.ts >> continuous panel containment and boundaries survive intermediate progress, reversal and resize
- Location: tests/e2e/phase-11b6.spec.ts:34:1

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: -2116.8
Received: -2116

Expected precision:    0
Expected difference: < 0.5
Received difference:   0.8000000000001819

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Zieve Industries home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Zieve Industries" [ref=e6]
      - navigation "Main navigation" [ref=e7]:
        - list [ref=e8]:
          - listitem [ref=e9]:
            - link "Home" [ref=e10] [cursor=pointer]:
              - /url: /
          - listitem [ref=e11]:
            - link "About Us" [ref=e12] [cursor=pointer]:
              - /url: /#company-introduction
          - listitem [ref=e13]:
            - button "Our Solutions" [ref=e15] [cursor=pointer]
          - listitem [ref=e18]:
            - link "Industries" [ref=e19] [cursor=pointer]:
              - /url: /#industries-we-serve
          - listitem [ref=e20]:
            - link "Why Zieve" [ref=e21] [cursor=pointer]:
              - /url: /#zieve-advantage
          - listitem [ref=e22]:
            - link "Contact" [ref=e23] [cursor=pointer]:
              - /url: /#partner-with-zieve
        - link "Request a Quote" [ref=e24] [cursor=pointer]:
          - /url: /#request-a-quote
  - main [ref=e28]:
    - region "Equipping Industry. Empowering Growth." [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e34]:
          - paragraph [ref=e35]: ZIEVE INDUSTRIES · HARARE, ZIMBABWE
          - heading "Equipping Industry. Empowering Growth." [level=1] [ref=e37]:
            - generic [ref=e38]: Equipping Industry.
            - generic [ref=e39]: Empowering Growth.
          - paragraph [ref=e40]: A dependable partner for earthmoving equipment, gold-processing plants, industrial chemicals, lubricants and critical consumables.
          - generic [ref=e41]:
            - link "Explore Our Solutions" [ref=e42] [cursor=pointer]:
              - /url: /#industrial-solutions
            - link "Request a Quote" [ref=e46] [cursor=pointer]:
              - /url: /#request-a-quote
        - generic [ref=e51]:
          - link "Scroll to the end of the hero" [ref=e52] [cursor=pointer]:
            - /url: "#hero-end"
            - generic [ref=e55]: Scroll
          - paragraph [ref=e58]: Illustrative stock photo · Metehan Özaras / Pexels · Not a Zieve site
    - group "End of the hero"
    - region "Built around uptime." [ref=e59]:
      - generic [ref=e61]:
        - generic [ref=e62]:
          - heading "Built around uptime." [level=2] [ref=e63]
          - generic [ref=e64]:
            - paragraph [ref=e65]: In heavy industry, every hour matters. A machine waiting for parts, a processing plant missing critical inputs or a project delayed by unreliable supply can create significant operational costs.
            - paragraph [ref=e66]: Zieve Industries brings equipment, gold-processing plants, industrial chemicals, lubricants and essential consumables together through one dependable industrial supply partner.
          - paragraph [ref=e69]: Reliable Supply. Real Impact.
        - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e70]:
          - img "Large metal component suspended in an industrial workshop. Not a Zieve facility photograph." [ref=e73]
    - region "One accountable partner. Five core divisions." [ref=e75]:
      - generic [ref=e77]:
        - generic [ref=e78]:
          - heading "One accountable partner. Five core divisions." [level=2] [ref=e79]:
            - generic [ref=e80]: One accountable partner.
            - generic [ref=e81]: Five core divisions.
          - paragraph [ref=e82]: Everything a heavy-industry client needs to acquire, run and maintain their plant and fleet.
        - generic [ref=e83]:
          - group "Choose an industrial solution" [ref=e84]:
            - button "Earthmoving & Construction Equipment" [pressed] [ref=e86] [cursor=pointer]:
              - generic [aria-hidden] [ref=e88]: "01"
            - button "Elution Plants & Gold Processing" [ref=e94] [cursor=pointer]:
              - generic [aria-hidden] [ref=e95]: "02"
            - button "Industrial Chemicals" [ref=e101] [cursor=pointer]:
              - generic [aria-hidden] [ref=e102]: "03"
            - button "Lubricants & Fluids" [ref=e108] [cursor=pointer]:
              - generic [aria-hidden] [ref=e109]: "04"
            - button "Consumables & Spares" [ref=e115] [cursor=pointer]:
              - generic [aria-hidden] [ref=e116]: "05"
          - article [ref=e122]:
            - figure "Illustrative schematic · Approved division photography pending" [ref=e124]:
              - img "Illustrative earthmoving equipment schematic. Not a Zieve facility or inventory photograph." [ref=e126]
            - generic [ref=e128]:
              - paragraph [ref=e129]: Division 01 / 05
              - heading "Built for demanding sites." [level=3] [ref=e130]
              - paragraph [ref=e131]: Excavators, bulldozers, motor graders, compaction rollers, concrete mixers, generators and genuine spare parts.
              - 'link "Link to this solution: Earthmoving & Construction Equipment" [ref=e132] [cursor=pointer]':
                - /url: /#solution-panel-earthmoving-construction
                - text: Link to this solution
          - status [ref=e136]: "Division 01: Earthmoving & Construction Equipment selected."
    - region "Built for the industries that build tomorrow." [ref=e137]:
      - generic [ref=e139]:
        - heading "Built for the industries that build tomorrow." [level=2] [ref=e142]
        - list [ref=e144]:
          - listitem [ref=e145]:
            - article [ref=e146]:
              - generic [ref=e148]:
                - generic [ref=e149]:
                  - generic [aria-hidden] [ref=e150]: "01"
                  - heading "Mining & Mineral Processing" [level=3] [ref=e151]
                - figure "Mining & Mineral Processing" [ref=e152]:
                  - img "Overhead view of a surface extraction site with processing equipment, stockpiles and access tracks. Not a Zieve facility or employee photograph." [ref=e155]
                  - generic [ref=e156]: Illustrative stock photo · Volker Braun / Pexels
                - generic [ref=e157]:
                  - paragraph [ref=e158]: Equipment and inputs for the recovery chain.
                  - paragraph [ref=e159]: Supporting large-scale mining and artisanal and small-scale mining operations through equipment, gold-processing systems, industrial chemicals, lubricants and critical consumables.
                  - generic [ref=e160]:
                    - paragraph [ref=e162]: Relevant solutions
                    - list [ref=e163]:
                      - listitem [ref=e164]:
                        - link "Earthmoving & Construction Equipment" [ref=e165] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e166]:
                        - link "Elution Plants & Gold Processing" [ref=e167] [cursor=pointer]:
                          - /url: /#solution-panel-elution-gold-processing
                      - listitem [ref=e168]:
                        - link "Industrial Chemicals" [ref=e169] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e170]:
                        - link "Lubricants & Fluids" [ref=e171] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e172]:
                        - link "Consumables & Spares" [ref=e173] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
          - listitem [ref=e174]:
            - article [ref=e175]:
              - generic [ref=e177]:
                - generic [ref=e178]:
                  - generic [aria-hidden] [ref=e179]: "02"
                  - heading "Civil & Infrastructure Construction" [level=3] [ref=e180]
                - figure "Civil & Infrastructure Construction" [ref=e181]:
                  - img "Illustrative bridge and civil works scene. Not a Zieve project, facility or customer photograph." [ref=e184]
                  - generic [ref=e185]: Illustrative sector schematic · Approved photography pending
                - generic [ref=e186]:
                  - paragraph [ref=e187]: From earthworks to essential infrastructure.
                  - paragraph [ref=e188]: Supplying earthmoving machinery, generators, construction-related chemicals, lubricants and maintenance essentials for infrastructure and civil works.
                  - paragraph [ref=e189]: For civil contractors, government agencies and public infrastructure procurement.
                  - generic [ref=e190]:
                    - paragraph [ref=e192]: Relevant solutions
                    - list [ref=e193]:
                      - listitem [ref=e194]:
                        - link "Earthmoving & Construction Equipment" [ref=e195] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e196]:
                        - link "Industrial Chemicals" [ref=e197] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e198]:
                        - link "Lubricants & Fluids" [ref=e199] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e200]:
                        - link "Consumables & Spares" [ref=e201] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
          - listitem [ref=e202]:
            - article [ref=e203]:
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - generic [aria-hidden] [ref=e207]: "03"
                  - heading "Manufacturing" [level=3] [ref=e208]
                - figure "Manufacturing" [ref=e209]:
                  - img "Factory worker in high-visibility clothing beside a large machined metal shaft. Not a Zieve facility or employee photograph." [ref=e212]
                  - generic [ref=e213]: Illustrative stock photo · Kateryna Babaieva / Pexels
                - generic [ref=e214]:
                  - paragraph [ref=e215]: Processing inputs. Maintenance essentials.
                  - paragraph [ref=e216]: Providing industrial processing chemicals, lubricants, filters, fittings and essential inputs for plant operations.
                  - generic [ref=e217]:
                    - paragraph [ref=e219]: Relevant solutions
                    - list [ref=e220]:
                      - listitem [ref=e221]:
                        - link "Industrial Chemicals" [ref=e222] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e223]:
                        - link "Lubricants & Fluids" [ref=e224] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e225]:
                        - link "Consumables & Spares" [ref=e226] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
          - listitem [ref=e227]:
            - article [ref=e228]:
              - generic [ref=e230]:
                - generic [ref=e231]:
                  - generic [aria-hidden] [ref=e232]: "04"
                  - heading "Agro-processing" [level=3] [ref=e233]
                - figure "Agro-processing" [ref=e234]:
                  - img "Grain silos linked by an elevated material-handling walkway in warm evening light. Not a Zieve facility or employee photograph." [ref=e237]
                  - generic [ref=e238]: Illustrative stock photo · Psilo Cybe / Pexels
                - generic [ref=e239]:
                  - paragraph [ref=e240]: Supporting the processing cycle.
                  - paragraph [ref=e241]: Supporting agro-processing facilities through industrial chemicals, machinery-related consumables, lubricants and maintenance inputs.
                  - generic [ref=e242]:
                    - paragraph [ref=e244]: Relevant solutions
                    - list [ref=e245]:
                      - listitem [ref=e246]:
                        - link "Industrial Chemicals" [ref=e247] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e248]:
                        - link "Lubricants & Fluids" [ref=e249] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e250]:
                        - link "Consumables & Spares" [ref=e251] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
        - generic [aria-hidden] [ref=e253]:
          - generic [ref=e254]: "02"
          - generic [ref=e257]: "04"
    - region "Built on reliability. Driven by performance." [ref=e258]:
      - generic [ref=e260]:
        - generic [ref=e261]:
          - heading "Built on reliability. Driven by performance." [level=2] [ref=e262]:
            - generic [ref=e263]: Built on reliability.
            - generic [ref=e264]: Driven by performance.
          - paragraph [ref=e265]: More than a supplier. A dependable partner for the operations that cannot afford to stand still.
          - paragraph [ref=e268]: Supply. Support. Quality. Convenience. Specialisation.
        - generic [ref=e269]:
          - generic [ref=e270]:
            - heading [level=3] [ref=e271]:
              - button "Reliable Supply Chain" [expanded] [ref=e272] [cursor=pointer]:
                - generic [aria-hidden] [ref=e273]: "01"
            - region "Reliable Supply Chain" [ref=e279]:
              - paragraph [ref=e281]: Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.
          - generic [ref=e282]:
            - heading [level=3] [ref=e283]:
              - button "Technical After-Sales Support" [ref=e284] [cursor=pointer]:
                - generic [aria-hidden] [ref=e285]: "02"
            - paragraph [ref=e290]: Support beyond the point of supply, including elution plant commissioning guidance, equipment spares and lubricant specification.
          - generic [ref=e291]:
            - heading [level=3] [ref=e292]:
              - button "Genuine Quality Assurance" [ref=e293] [cursor=pointer]:
                - generic [aria-hidden] [ref=e294]: "03"
            - paragraph [ref=e299]: Authentic, fit-for-purpose products that support dependable performance and reduce operational risks associated with substandard inputs.
          - generic [ref=e300]:
            - heading [level=3] [ref=e301]:
              - button "One-Stop-Shop Convenience" [ref=e302] [cursor=pointer]:
                - generic [aria-hidden] [ref=e303]: "04"
            - paragraph [ref=e308]: Equipment, processing plants, chemicals, lubricants and consumables from one accountable industrial supply partner.
          - generic [ref=e309]:
            - heading [level=3] [ref=e310]:
              - button "Sector Specialisation" [ref=e311] [cursor=pointer]:
                - generic [aria-hidden] [ref=e312]: "05"
            - paragraph [ref=e317]: Technical understanding of mining, construction and processing operations, including recovery rates, haul roads and uptime.
    - region "The standard we operate by." [ref=e318]:
      - generic [ref=e321]:
        - heading "The standard we operate by." [level=2] [ref=e322]
        - generic [ref=e323]:
          - heading "Our Vision" [level=3] [ref=e324]
          - paragraph [ref=e326]: To be Southern Africa’s most trusted industrial supply partner — the name that mining, construction, and processing leaders rely on to keep their operations productive, profitable, and growing.
      - generic [ref=e329]:
        - heading "Our Mission" [level=3] [ref=e331]
        - paragraph [ref=e333]: To deliver genuine, high-performance equipment, plants, chemicals, and consumables — backed by uncompromising technical support — that maximise our clients’ uptime, recovery, and return on every asset they operate.
      - generic [ref=e336]:
        - heading "Our Core Values" [level=3] [ref=e337]
        - list "Our Core Values" [ref=e339]:
          - listitem [ref=e340]:
            - generic [aria-hidden] [ref=e341]: "01"
            - heading "Reliability" [level=4] [ref=e342]
            - paragraph [ref=e343]: We are measured by our clients’ uptime. Dependability is our first promise.
          - listitem [ref=e344]:
            - generic [aria-hidden] [ref=e345]: "02"
            - heading "Integrity" [level=4] [ref=e346]
            - paragraph [ref=e347]: Genuine products, honest counsel, and transparent dealing in every transaction.
          - listitem [ref=e348]:
            - generic [aria-hidden] [ref=e349]: "03"
            - heading "Partnership" [level=4] [ref=e350]
            - paragraph [ref=e351]: We succeed only when our clients do; we invest in long-term relationships, not one-off sales.
          - listitem [ref=e352]:
            - generic [aria-hidden] [ref=e353]: "04"
            - heading "Excellence" [level=4] [ref=e354]
            - paragraph [ref=e355]: Technical rigour and quality in everything we supply and support.
          - listitem [ref=e356]:
            - generic [aria-hidden] [ref=e357]: "05"
            - heading "Growth" [level=4] [ref=e358]
            - paragraph [ref=e359]: We are committed to building Zimbabwe’s industrial capacity, one well-equipped operation at a time.
    - region "Your next project starts with the right partner." [ref=e360]:
      - generic [ref=e362]:
        - generic [ref=e363]:
          - heading "Your next project starts with the right partner." [level=2] [ref=e364]
          - paragraph [ref=e365]: Whether you're commissioning a gold-recovery circuit, mobilising an equipment fleet or sourcing essential industrial consumables, let's discuss what your operation needs.
          - generic "Zieve Industries contact information" [ref=e366]:
            - generic [ref=e367]:
              - generic [ref=e368]:
                - term [ref=e369]: Visit us
                - definition [ref=e373]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
              - generic [ref=e374]:
                - term [ref=e375]: Call us
                - definition [ref=e378]:
                  - link "+263 78 246 8399" [ref=e379] [cursor=pointer]:
                    - /url: tel:+263782468399
              - generic [ref=e380]:
                - term [ref=e381]: Email us
                - definition [ref=e385]:
                  - link "info@zieveindustries.com" [ref=e386] [cursor=pointer]:
                    - /url: mailto:info@zieveindustries.com
        - form "Prepare a quotation enquiry" [ref=e388]:
          - heading "Prepare a quotation enquiry" [level=3] [ref=e389]
          - paragraph [ref=e390]: Fields marked required are needed to prepare your email. Review the draft, open your email application, then send it manually.
          - group "Your procurement enquiry" [ref=e391]:
            - generic [ref=e393]:
              - generic [ref=e394]:
                - generic [ref=e395]:
                  - text: Full name
                  - generic [ref=e396]: (required)
                - textbox "Full name (required)" [ref=e397]
                - paragraph [ref=e398]
              - generic [ref=e399]:
                - generic [ref=e400]:
                  - text: Email address
                  - generic [ref=e401]: (required)
                - textbox "Email address (required)" [ref=e402]
                - paragraph [ref=e403]
              - generic [ref=e404]:
                - generic [ref=e405]:
                  - text: Company / organisation
                  - generic [ref=e406]: (optional)
                - textbox "Company / organisation (optional)" [ref=e407]
                - paragraph [ref=e408]
              - generic [ref=e409]:
                - generic [ref=e410]:
                  - text: Telephone / WhatsApp
                  - generic [ref=e411]: (optional)
                - textbox "Telephone / WhatsApp (optional)" [ref=e412]
                - paragraph [ref=e413]
              - generic [ref=e414]:
                - generic [ref=e415]:
                  - text: Product or service category
                  - generic [ref=e416]: (required)
                - combobox "Product or service category (required)" [ref=e417]:
                  - option "Select a category" [selected]
                  - option "Earthmoving & Construction Equipment"
                  - option "Elution Plants & Gold Processing"
                  - option "Industrial Chemicals"
                  - option "Lubricants & Fluids"
                  - option "Consumables & Spares"
                - paragraph [ref=e418]
              - generic [ref=e419]:
                - generic [ref=e420]:
                  - text: Industry sector
                  - generic [ref=e421]: (optional)
                - combobox "Industry sector (optional)" [ref=e422]:
                  - option "Not specified" [selected]
                  - option "Mining"
                  - option "Civil & Infrastructure Construction"
                  - option "Manufacturing"
                  - option "Agro-processing"
                  - option "Government / Public Sector"
                  - option "Other"
                - paragraph [ref=e423]
              - generic [ref=e424]:
                - generic [ref=e425]:
                  - text: Delivery or project location
                  - generic [ref=e426]: (optional)
                - textbox "Delivery or project location (optional)" [ref=e427]
                - paragraph [ref=e428]
              - generic [ref=e429]:
                - generic [ref=e430]:
                  - text: Requirements / project description
                  - generic [ref=e431]: (required)
                - textbox "Requirements / project description (required)" [ref=e432]
                - paragraph [ref=e433]: Up to 4,000 characters. Include quantities, specifications and timing if known.
                - paragraph [ref=e434]
            - button "Prepare enquiry email" [ref=e435] [cursor=pointer]
  - contentinfo "Zieve Industries footer" [ref=e436]:
    - generic [ref=e438]:
      - generic [ref=e439]:
        - link "Zieve Industries home" [ref=e441] [cursor=pointer]:
          - /url: /
          - img "Zieve Industries" [ref=e442]
        - generic [ref=e443]:
          - heading "Equipping Industry. Empowering Growth." [level=2] [ref=e444]
          - paragraph [ref=e445]: A dependable industrial supply and equipment partner serving Zimbabwe's mining, construction, manufacturing and agro-processing sectors.
      - generic [ref=e448]:
        - navigation "Footer primary navigation" [ref=e449]:
          - heading "Explore Zieve" [level=3] [ref=e450]
          - list [ref=e451]:
            - listitem [ref=e452]:
              - link "Home" [ref=e453] [cursor=pointer]:
                - /url: /
            - listitem [ref=e454]:
              - link "About Us" [ref=e455] [cursor=pointer]:
                - /url: /#company-introduction
            - listitem [ref=e456]:
              - link "Our Solutions" [ref=e457] [cursor=pointer]:
                - /url: /#industrial-solutions
            - listitem [ref=e458]:
              - link "Industries" [ref=e459] [cursor=pointer]:
                - /url: /#industries-we-serve
            - listitem [ref=e460]:
              - link "Why Zieve" [ref=e461] [cursor=pointer]:
                - /url: /#zieve-advantage
            - listitem [ref=e462]:
              - link "Contact" [ref=e463] [cursor=pointer]:
                - /url: /#partner-with-zieve
        - navigation "Footer solutions navigation" [ref=e464]:
          - heading "Our Solutions" [level=3] [ref=e465]
          - list [ref=e466]:
            - listitem [ref=e467]:
              - link "Earthmoving & Construction Equipment" [ref=e468] [cursor=pointer]:
                - /url: /#solution-panel-earthmoving-construction
            - listitem [ref=e469]:
              - link "Elution Plants & Gold Processing" [ref=e470] [cursor=pointer]:
                - /url: /#solution-panel-elution-gold-processing
            - listitem [ref=e471]:
              - link "Industrial Chemicals" [ref=e472] [cursor=pointer]:
                - /url: /#solution-panel-industrial-chemicals
            - listitem [ref=e473]:
              - link "Lubricants & Fluids" [ref=e474] [cursor=pointer]:
                - /url: /#solution-panel-lubricants-fluids
            - listitem [ref=e475]:
              - link "Consumables & Spares" [ref=e476] [cursor=pointer]:
                - /url: /#solution-panel-consumables-spares
        - generic [ref=e477]:
          - heading "Get in touch" [level=3] [ref=e478]
          - generic [ref=e479]:
            - paragraph [ref=e480]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
            - link "+263 78 246 8399" [ref=e481] [cursor=pointer]:
              - /url: tel:+263782468399
            - link "info@zieveindustries.com" [ref=e482] [cursor=pointer]:
              - /url: mailto:info@zieveindustries.com
          - link "Request a Quote" [ref=e483] [cursor=pointer]:
            - /url: /#request-a-quote
      - generic [ref=e487]:
        - paragraph [ref=e488]: © 2026 Zieve Industries. All rights reserved.
        - paragraph [ref=e489]: Harare, Zimbabwe
        - link "Back to top" [ref=e490] [cursor=pointer]:
          - /url: "#main-content"
  - alert [ref=e494]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { industrySectors } from '../../src/content/industry-experience';
  3  | 
  4  | const widths = [320, 375, 390, 430, 768, 1024, 1440, 1920];
  5  | 
  6  | test('industry media follows its heading in DOM and mobile layout before all supporting copy', async ({ page }) => {
  7  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  8  |   await page.goto('/');
  9  |   for (const size of [100, 200]) for (const width of widths) {
  10 |     await page.setViewportSize({ width, height: 1000 });
  11 |     await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, size);
  12 |     for (const sector of industrySectors) {
  13 |       const panel = page.locator(`#industry-${sector.slug}`);
  14 |       await panel.scrollIntoViewIfNeeded();
  15 |       await expect(panel.getByRole('heading', { name: sector.name, exact: true })).toHaveCount(1);
  16 |       await expect(panel.getByRole('figure', { name: sector.name, exact: true })).toHaveCount(1);
  17 |       await expect(panel.getByRole('figure')).toHaveAttribute('aria-labelledby', `industry-title-${sector.slug}`);
  18 |       const geometry = await panel.evaluate(el => {
  19 |         const title = el.querySelector('h3')!, media = el.querySelector('figure')!, copy = el.querySelector('.industry-copy')!;
  20 |         return { title: title.getBoundingClientRect().toJSON(), media: media.getBoundingClientRect().toJSON(), copy: copy.getBoundingClientRect().toJSON(), order: Boolean(title.compareDocumentPosition(media) & Node.DOCUMENT_POSITION_FOLLOWING) && Boolean(media.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING), unclippedTitle: title.scrollWidth <= title.clientWidth + 1 };
  21 |       });
  22 |       expect(geometry.order).toBe(true);
  23 |       expect(geometry.unclippedTitle).toBe(true);
  24 |       if (width < 1024) {
  25 |         expect(geometry.media.top).toBeGreaterThan(geometry.title.bottom);
  26 |         expect(geometry.copy.top).toBeGreaterThan(geometry.media.bottom);
  27 |       }
  28 |     }
  29 |     await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  30 |     await expect(page.locator('.industry-scene')).not.toHaveAttribute('data-horizontal', 'true');
  31 |   }
  32 | });
  33 | 
  34 | test('continuous panel containment and boundaries survive intermediate progress, reversal and resize', async ({ page }, testInfo) => {
  35 |   await page.setViewportSize({ width: 1440, height: 1000 });
  36 |   await page.goto('/');
  37 |   const scene = page.locator('.industry-scene');
  38 |   if (testInfo.project.name === 'mobile') {
  39 |     await expect(scene).not.toHaveAttribute('data-horizontal', 'true');
  40 |     await expect(page.locator('.industry-stage')).toHaveCSS('position', 'static');
  41 |     return;
  42 |   }
  43 |   for (const width of [1440, 1920, 1440]) {
  44 |     await page.setViewportSize({ width, height: 1000 });
  45 |     await expect(scene).toHaveAttribute('data-horizontal', 'true');
  46 |     await expect.poll(() => scene.evaluate(el => parseFloat((el as HTMLElement).style.getPropertyValue('--industry-travel')))).toBe(width * 3);
  47 |     for (const fraction of [0, .16, 1 / 3, .49, .5, .51, 2 / 3, 1, .5, .2]) {
  48 |       const g = await scene.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, header: document.querySelector('header')!.getBoundingClientRect().height, travel: parseFloat((el as HTMLElement).style.getPropertyValue('--industry-travel')) }));
  49 |       await page.evaluate(({ g, fraction }) => scrollTo(0, g.top - g.header + g.travel * fraction), { g, fraction });
> 50 |       await expect.poll(() => page.locator('.industry-sector-list').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeCloseTo(-g.travel * fraction, 0);
     |                                                                                                                                        ^ Error: expect(received).toBeCloseTo(expected, precision)
  51 |       for (const panel of await page.locator('.industry-panel').all()) {
  52 |         const bounds = await panel.boundingBox();
  53 |         for (const selector of ['h3', 'figure', '.industry-copy']) {
  54 |           const child = (await panel.locator(selector).boundingBox())!;
  55 |           expect(child.x).toBeGreaterThanOrEqual(bounds!.x);
  56 |           expect(child.x + child.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
  57 |         }
  58 |       }
  59 |       if (fraction === .5) {
  60 |         const boundary = page.locator('.industry-sector-list > li').nth(2);
  61 |         expect((await boundary.boundingBox())!.x).toBeCloseTo(width / 2, 0);
  62 |         await expect(boundary).toHaveCSS('position', 'relative');
  63 |         expect(await boundary.evaluate(el => getComputedStyle(el, '::before').content)).toBe('""');
  64 |       }
  65 |       await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  66 |     }
  67 |   }
  68 | });
  69 | 
  70 | test('no-JavaScript industry anchors retain one heading, labelled photograph and following copy', async ({ browser, baseURL }) => {
  71 |   const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 1000 } });
  72 |   const page = await context.newPage();
  73 |   for (const sector of industrySectors) {
  74 |     await page.goto(`/#industry-${sector.slug}`);
  75 |     const panel = page.locator(`#industry-${sector.slug}`);
  76 |     await expect(panel.getByRole('heading')).toBeInViewport();
  77 |     await expect(panel.getByRole('figure', { name: sector.name })).toHaveCount(1);
  78 |     const image = (await panel.locator('figure').boundingBox())!;
  79 |     const heading = (await panel.locator('h3').boundingBox())!;
  80 |     const copy = (await panel.locator('.industry-copy').boundingBox())!;
  81 |     expect(image.y).toBeGreaterThan(heading.y + heading.height);
  82 |     expect(copy.y).toBeGreaterThan(image.y + image.height);
  83 |     await expect(panel.getByText(sector.description, { exact: true })).toBeVisible();
  84 |     await expect(page.locator('.industry-stage')).toHaveCSS('position', 'static');
  85 |   }
  86 |   await context.close();
  87 | });
  88 | 
```