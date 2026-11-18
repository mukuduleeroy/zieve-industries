# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-11b.spec.ts >> AUD-05 and AUD-16 retain decorative semantics with stronger hierarchy and a clear transition
- Location: tests/e2e/phase-11b.spec.ts:66:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator: locator('.industry-panel[data-surface=navy] .industry-number')
Expected: "rgb(242, 162, 26)"
Error: strict mode violation: locator('.industry-panel[data-surface=navy] .industry-number') resolved to 4 elements:
    1) <span aria-hidden="true" class="industry-number" data-industry-number="true">01</span> aka locator('#industry-mining-mineral-processing').getByText('01')
    2) <span aria-hidden="true" class="industry-number" data-industry-number="true">02</span> aka locator('#industry-civil-infrastructure').getByText('02')
    3) <span aria-hidden="true" class="industry-number" data-industry-number="true">03</span> aka locator('#industry-manufacturing').getByText('03')
    4) <span aria-hidden="true" class="industry-number" data-industry-number="true">04</span> aka locator('#industry-agro-processing').getByText('04')

Call log:
  - Expect "toHaveCSS" locator('.industry-panel[data-surface=navy] .industry-number') with timeout 5000ms
  - waiting for locator('.industry-panel[data-surface=navy] .industry-number')

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
      - button "Open navigation menu" [ref=e8] [cursor=pointer]:
        - generic [ref=e10]: Menu
  - main [ref=e11]:
    - region "Equipping Industry. Empowering Growth." [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e17]:
          - paragraph [ref=e18]: ZIEVE INDUSTRIES · HARARE, ZIMBABWE
          - heading "Equipping Industry. Empowering Growth." [level=1] [ref=e20]:
            - generic [ref=e21]: Equipping Industry.
            - generic [ref=e22]: Empowering Growth.
          - paragraph [ref=e23]: A dependable partner for earthmoving equipment, gold-processing plants, industrial chemicals, lubricants and critical consumables.
          - generic [ref=e24]:
            - link "Explore Our Solutions" [ref=e25] [cursor=pointer]:
              - /url: /#industrial-solutions
            - link "Request a Quote" [ref=e29] [cursor=pointer]:
              - /url: /#request-a-quote
        - generic [ref=e34]:
          - link "Scroll to the end of the hero" [ref=e35] [cursor=pointer]:
            - /url: "#hero-end"
            - generic [ref=e38]: Scroll
          - paragraph [ref=e41]: Illustrative stock photo · Metehan Özaras / Pexels · Not a Zieve site
    - group "End of the hero"
    - region "Built around uptime." [ref=e42]:
      - generic [ref=e44]:
        - generic [ref=e45]:
          - heading "Built around uptime." [level=2] [ref=e46]
          - generic [ref=e47]:
            - paragraph [ref=e48]: In heavy industry, every hour matters. A machine waiting for parts, a processing plant missing critical inputs or a project delayed by unreliable supply can create significant operational costs.
            - paragraph [ref=e49]: Zieve Industries brings equipment, gold-processing plants, industrial chemicals, lubricants and essential consumables together through one dependable industrial supply partner.
          - paragraph [ref=e52]: Reliable Supply. Real Impact.
        - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e53]:
          - img "Large metal component suspended in an industrial workshop. Not a Zieve facility photograph." [ref=e56]
    - region "One accountable partner. Five core divisions." [ref=e58]:
      - generic [ref=e60]:
        - generic [ref=e61]:
          - heading "One accountable partner. Five core divisions." [level=2] [ref=e62]:
            - generic [ref=e63]: One accountable partner.
            - generic [ref=e64]: Five core divisions.
          - paragraph [ref=e65]: Everything a heavy-industry client needs to acquire, run and maintain their plant and fleet.
        - generic [ref=e66]:
          - generic [ref=e67]:
            - generic [ref=e68]: Choose a division
            - combobox "Choose a division" [ref=e69]:
              - option "01 — Earthmoving & Construction Equipment" [selected]
              - option "02 — Elution Plants & Gold Processing"
              - option "03 — Industrial Chemicals"
              - option "04 — Lubricants & Fluids"
              - option "05 — Consumables & Spares"
          - article [ref=e71]:
            - figure "Illustrative schematic · Approved division photography pending" [ref=e73]:
              - img "Illustrative earthmoving equipment schematic. Not a Zieve facility or inventory photograph." [ref=e75]
            - generic [ref=e77]:
              - paragraph [ref=e78]: Division 01 / 05
              - heading "Built for demanding sites." [level=3] [ref=e79]
              - paragraph [ref=e80]: Excavators, bulldozers, motor graders, compaction rollers, concrete mixers, generators and genuine spare parts.
              - 'link "Link to this solution: Earthmoving & Construction Equipment" [ref=e81] [cursor=pointer]':
                - /url: /#solution-panel-earthmoving-construction
                - text: Link to this solution
          - status [ref=e85]: "Division 01: Earthmoving & Construction Equipment selected."
    - region "Built for the industries that build tomorrow." [ref=e86]:
      - generic [ref=e88]:
        - heading "Built for the industries that build tomorrow." [level=2] [ref=e91]
        - list [ref=e93]:
          - listitem [ref=e94]:
            - article [ref=e95]:
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - generic [aria-hidden] [ref=e99]: "01"
                  - heading "Mining & Mineral Processing" [level=3] [ref=e100]
                  - paragraph [ref=e101]: Equipment and inputs for the recovery chain.
                  - paragraph [ref=e102]: Supporting large-scale mining and artisanal and small-scale mining operations through equipment, gold-processing systems, industrial chemicals, lubricants and critical consumables.
                  - generic [ref=e103]:
                    - paragraph [ref=e105]: Relevant solutions
                    - list [ref=e106]:
                      - listitem [ref=e107]:
                        - link "Earthmoving & Construction Equipment" [ref=e108] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e109]:
                        - link "Elution Plants & Gold Processing" [ref=e110] [cursor=pointer]:
                          - /url: /#solution-panel-elution-gold-processing
                      - listitem [ref=e111]:
                        - link "Industrial Chemicals" [ref=e112] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e113]:
                        - link "Lubricants & Fluids" [ref=e114] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e115]:
                        - link "Consumables & Spares" [ref=e116] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Volker Braun / Pexels" [ref=e117]:
                  - img "Overhead view of a surface extraction site with processing equipment, stockpiles and access tracks. Not a Zieve facility or employee photograph." [ref=e120]
          - listitem [ref=e122]:
            - article [ref=e123]:
              - generic [ref=e125]:
                - generic [ref=e126]:
                  - generic [aria-hidden] [ref=e127]: "02"
                  - heading "Civil & Infrastructure Construction" [level=3] [ref=e128]
                  - paragraph [ref=e129]: From earthworks to essential infrastructure.
                  - paragraph [ref=e130]: Supplying earthmoving machinery, generators, construction-related chemicals, lubricants and maintenance essentials for infrastructure and civil works.
                  - paragraph [ref=e131]: For civil contractors, government agencies and public infrastructure procurement.
                  - generic [ref=e132]:
                    - paragraph [ref=e134]: Relevant solutions
                    - list [ref=e135]:
                      - listitem [ref=e136]:
                        - link "Earthmoving & Construction Equipment" [ref=e137] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e138]:
                        - link "Industrial Chemicals" [ref=e139] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e140]:
                        - link "Lubricants & Fluids" [ref=e141] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e142]:
                        - link "Consumables & Spares" [ref=e143] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative sector schematic · Approved photography pending" [ref=e144]:
                  - img "Illustrative bridge and civil works scene. Not a Zieve project, facility or customer photograph." [ref=e147]
          - listitem [ref=e149]:
            - article [ref=e150]:
              - generic [ref=e152]:
                - generic [ref=e153]:
                  - generic [aria-hidden] [ref=e154]: "03"
                  - heading "Manufacturing" [level=3] [ref=e155]
                  - paragraph [ref=e156]: Processing inputs. Maintenance essentials.
                  - paragraph [ref=e157]: Providing industrial processing chemicals, lubricants, filters, fittings and essential inputs for plant operations.
                  - generic [ref=e158]:
                    - paragraph [ref=e160]: Relevant solutions
                    - list [ref=e161]:
                      - listitem [ref=e162]:
                        - link "Industrial Chemicals" [ref=e163] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e164]:
                        - link "Lubricants & Fluids" [ref=e165] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e166]:
                        - link "Consumables & Spares" [ref=e167] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e168]:
                  - img "Factory worker in high-visibility clothing beside a large machined metal shaft. Not a Zieve facility or employee photograph." [ref=e171]
          - listitem [ref=e173]:
            - article [ref=e174]:
              - generic [ref=e176]:
                - generic [ref=e177]:
                  - generic [aria-hidden] [ref=e178]: "04"
                  - heading "Agro-processing" [level=3] [ref=e179]
                  - paragraph [ref=e180]: Supporting the processing cycle.
                  - paragraph [ref=e181]: Supporting agro-processing facilities through industrial chemicals, machinery-related consumables, lubricants and maintenance inputs.
                  - generic [ref=e182]:
                    - paragraph [ref=e184]: Relevant solutions
                    - list [ref=e185]:
                      - listitem [ref=e186]:
                        - link "Industrial Chemicals" [ref=e187] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e188]:
                        - link "Lubricants & Fluids" [ref=e189] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e190]:
                        - link "Consumables & Spares" [ref=e191] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Psilo Cybe / Pexels" [ref=e192]:
                  - img "Grain silos linked by an elevated material-handling walkway in warm evening light. Not a Zieve facility or employee photograph." [ref=e195]
    - region "Built on reliability. Driven by performance." [ref=e197]:
      - generic [ref=e199]:
        - generic [ref=e200]:
          - heading "Built on reliability. Driven by performance." [level=2] [ref=e201]:
            - generic [ref=e202]: Built on reliability.
            - generic [ref=e203]: Driven by performance.
          - paragraph [ref=e204]: More than a supplier. A dependable partner for the operations that cannot afford to stand still.
          - paragraph [ref=e207]: Supply. Support. Quality. Convenience. Specialisation.
        - generic [ref=e208]:
          - generic [ref=e209]:
            - heading [level=3] [ref=e210]:
              - button "Reliable Supply Chain" [expanded] [ref=e211] [cursor=pointer]:
                - generic [aria-hidden] [ref=e212]: "01"
            - region "Reliable Supply Chain" [ref=e218]:
              - paragraph [ref=e220]: Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.
          - generic [ref=e221]:
            - heading [level=3] [ref=e222]:
              - button "Technical After-Sales Support" [ref=e223] [cursor=pointer]:
                - generic [aria-hidden] [ref=e224]: "02"
            - paragraph [ref=e229]: Support beyond the point of supply, including elution plant commissioning guidance, equipment spares and lubricant specification.
          - generic [ref=e230]:
            - heading [level=3] [ref=e231]:
              - button "Genuine Quality Assurance" [ref=e232] [cursor=pointer]:
                - generic [aria-hidden] [ref=e233]: "03"
            - paragraph [ref=e238]: Authentic, fit-for-purpose products that support dependable performance and reduce operational risks associated with substandard inputs.
          - generic [ref=e239]:
            - heading [level=3] [ref=e240]:
              - button "One-Stop-Shop Convenience" [ref=e241] [cursor=pointer]:
                - generic [aria-hidden] [ref=e242]: "04"
            - paragraph [ref=e247]: Equipment, processing plants, chemicals, lubricants and consumables from one accountable industrial supply partner.
          - generic [ref=e248]:
            - heading [level=3] [ref=e249]:
              - button "Sector Specialisation" [ref=e250] [cursor=pointer]:
                - generic [aria-hidden] [ref=e251]: "05"
            - paragraph [ref=e256]: Technical understanding of mining, construction and processing operations, including recovery rates, haul roads and uptime.
    - region "The standard we operate by." [ref=e257]:
      - generic [ref=e260]:
        - heading "The standard we operate by." [level=2] [ref=e261]
        - generic [ref=e262]:
          - heading "Our Vision" [level=3] [ref=e263]
          - paragraph [ref=e265]: To be Southern Africa’s most trusted industrial supply partner — the name that mining, construction, and processing leaders rely on to keep their operations productive, profitable, and growing.
      - generic [ref=e268]:
        - heading "Our Mission" [level=3] [ref=e270]
        - paragraph [ref=e272]: To deliver genuine, high-performance equipment, plants, chemicals, and consumables — backed by uncompromising technical support — that maximise our clients’ uptime, recovery, and return on every asset they operate.
      - generic [ref=e275]:
        - heading "Our Core Values" [level=3] [ref=e276]
        - list "Our Core Values" [ref=e278]:
          - listitem [ref=e279]:
            - generic [aria-hidden] [ref=e280]: "01"
            - heading "Reliability" [level=4] [ref=e281]
            - paragraph [ref=e282]: We are measured by our clients’ uptime. Dependability is our first promise.
          - listitem [ref=e283]:
            - generic [aria-hidden] [ref=e284]: "02"
            - heading "Integrity" [level=4] [ref=e285]
            - paragraph [ref=e286]: Genuine products, honest counsel, and transparent dealing in every transaction.
          - listitem [ref=e287]:
            - generic [aria-hidden] [ref=e288]: "03"
            - heading "Partnership" [level=4] [ref=e289]
            - paragraph [ref=e290]: We succeed only when our clients do; we invest in long-term relationships, not one-off sales.
          - listitem [ref=e291]:
            - generic [aria-hidden] [ref=e292]: "04"
            - heading "Excellence" [level=4] [ref=e293]
            - paragraph [ref=e294]: Technical rigour and quality in everything we supply and support.
          - listitem [ref=e295]:
            - generic [aria-hidden] [ref=e296]: "05"
            - heading "Growth" [level=4] [ref=e297]
            - paragraph [ref=e298]: We are committed to building Zimbabwe’s industrial capacity, one well-equipped operation at a time.
    - region "Your next project starts with the right partner." [ref=e299]:
      - generic [ref=e301]:
        - generic [ref=e302]:
          - heading "Your next project starts with the right partner." [level=2] [ref=e303]
          - paragraph [ref=e304]: Whether you're commissioning a gold-recovery circuit, mobilising an equipment fleet or sourcing essential industrial consumables, let's discuss what your operation needs.
          - generic "Zieve Industries contact information" [ref=e305]:
            - generic [ref=e306]:
              - generic [ref=e307]:
                - term [ref=e308]: Visit us
                - definition [ref=e312]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
              - generic [ref=e313]:
                - term [ref=e314]: Call us
                - definition [ref=e317]:
                  - link "+263 78 246 8399" [ref=e318] [cursor=pointer]:
                    - /url: tel:+263782468399
              - generic [ref=e319]:
                - term [ref=e320]: Email us
                - definition [ref=e324]:
                  - link "info@zieveindustries.com" [ref=e325] [cursor=pointer]:
                    - /url: mailto:info@zieveindustries.com
        - form "Prepare a quotation enquiry" [ref=e327]:
          - heading "Prepare a quotation enquiry" [level=3] [ref=e328]
          - paragraph [ref=e329]: Fields marked required are needed to prepare your email. Review the draft, open your email application, then send it manually.
          - group "Your procurement enquiry" [ref=e330]:
            - generic [ref=e332]:
              - generic [ref=e333]:
                - generic [ref=e334]:
                  - text: Full name
                  - generic [ref=e335]: (required)
                - textbox "Full name (required)" [ref=e336]
                - paragraph [ref=e337]
              - generic [ref=e338]:
                - generic [ref=e339]:
                  - text: Email address
                  - generic [ref=e340]: (required)
                - textbox "Email address (required)" [ref=e341]
                - paragraph [ref=e342]
              - generic [ref=e343]:
                - generic [ref=e344]:
                  - text: Company / organisation
                  - generic [ref=e345]: (optional)
                - textbox "Company / organisation (optional)" [ref=e346]
                - paragraph [ref=e347]
              - generic [ref=e348]:
                - generic [ref=e349]:
                  - text: Telephone / WhatsApp
                  - generic [ref=e350]: (optional)
                - textbox "Telephone / WhatsApp (optional)" [ref=e351]
                - paragraph [ref=e352]
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - text: Product or service category
                  - generic [ref=e355]: (required)
                - combobox "Product or service category (required)" [ref=e356]:
                  - option "Select a category" [selected]
                  - option "Earthmoving & Construction Equipment"
                  - option "Elution Plants & Gold Processing"
                  - option "Industrial Chemicals"
                  - option "Lubricants & Fluids"
                  - option "Consumables & Spares"
                - paragraph [ref=e357]
              - generic [ref=e358]:
                - generic [ref=e359]:
                  - text: Industry sector
                  - generic [ref=e360]: (optional)
                - combobox "Industry sector (optional)" [ref=e361]:
                  - option "Not specified" [selected]
                  - option "Mining"
                  - option "Civil & Infrastructure Construction"
                  - option "Manufacturing"
                  - option "Agro-processing"
                  - option "Government / Public Sector"
                  - option "Other"
                - paragraph [ref=e362]
              - generic [ref=e363]:
                - generic [ref=e364]:
                  - text: Delivery or project location
                  - generic [ref=e365]: (optional)
                - textbox "Delivery or project location (optional)" [ref=e366]
                - paragraph [ref=e367]
              - generic [ref=e368]:
                - generic [ref=e369]:
                  - text: Requirements / project description
                  - generic [ref=e370]: (required)
                - textbox "Requirements / project description (required)" [ref=e371]
                - paragraph [ref=e372]: Up to 4,000 characters. Include quantities, specifications and timing if known.
                - paragraph [ref=e373]
            - button "Prepare enquiry email" [ref=e374] [cursor=pointer]
  - contentinfo "Zieve Industries footer" [ref=e375]:
    - generic [ref=e377]:
      - generic [ref=e378]:
        - link "Zieve Industries home" [ref=e380] [cursor=pointer]:
          - /url: /
          - img "Zieve Industries" [ref=e381]
        - generic [ref=e382]:
          - heading "Equipping Industry. Empowering Growth." [level=2] [ref=e383]
          - paragraph [ref=e384]: A dependable industrial supply and equipment partner serving Zimbabwe's mining, construction, manufacturing and agro-processing sectors.
      - generic [ref=e387]:
        - navigation "Footer primary navigation" [ref=e388]:
          - heading "Explore Zieve" [level=3] [ref=e389]
          - list [ref=e390]:
            - listitem [ref=e391]:
              - link "Home" [ref=e392] [cursor=pointer]:
                - /url: /
            - listitem [ref=e393]:
              - link "About Us" [ref=e394] [cursor=pointer]:
                - /url: /#company-introduction
            - listitem [ref=e395]:
              - link "Our Solutions" [ref=e396] [cursor=pointer]:
                - /url: /#industrial-solutions
            - listitem [ref=e397]:
              - link "Industries" [ref=e398] [cursor=pointer]:
                - /url: /#industries-we-serve
            - listitem [ref=e399]:
              - link "Why Zieve" [ref=e400] [cursor=pointer]:
                - /url: /#zieve-advantage
            - listitem [ref=e401]:
              - link "Contact" [ref=e402] [cursor=pointer]:
                - /url: /#partner-with-zieve
        - navigation "Footer solutions navigation" [ref=e403]:
          - heading "Our Solutions" [level=3] [ref=e404]
          - list [ref=e405]:
            - listitem [ref=e406]:
              - link "Earthmoving & Construction Equipment" [ref=e407] [cursor=pointer]:
                - /url: /#solution-panel-earthmoving-construction
            - listitem [ref=e408]:
              - link "Elution Plants & Gold Processing" [ref=e409] [cursor=pointer]:
                - /url: /#solution-panel-elution-gold-processing
            - listitem [ref=e410]:
              - link "Industrial Chemicals" [ref=e411] [cursor=pointer]:
                - /url: /#solution-panel-industrial-chemicals
            - listitem [ref=e412]:
              - link "Lubricants & Fluids" [ref=e413] [cursor=pointer]:
                - /url: /#solution-panel-lubricants-fluids
            - listitem [ref=e414]:
              - link "Consumables & Spares" [ref=e415] [cursor=pointer]:
                - /url: /#solution-panel-consumables-spares
        - generic [ref=e416]:
          - heading "Get in touch" [level=3] [ref=e417]
          - generic [ref=e418]:
            - paragraph [ref=e419]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
            - link "+263 78 246 8399" [ref=e420] [cursor=pointer]:
              - /url: tel:+263782468399
            - link "info@zieveindustries.com" [ref=e421] [cursor=pointer]:
              - /url: mailto:info@zieveindustries.com
          - link "Request a Quote" [ref=e422] [cursor=pointer]:
            - /url: /#request-a-quote
      - generic [ref=e426]:
        - paragraph [ref=e427]: © 2026 Zieve Industries. All rights reserved.
        - paragraph [ref=e428]: Harare, Zimbabwe
        - link "Back to top" [ref=e429] [cursor=pointer]:
          - /url: "#main-content"
  - alert [ref=e433]
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | const widths = [320, 375, 390, 768, 1024, 1440, 1920];
  3   | 
  4   | test('AUD-06 form columns align or reflow naturally with normal and enlarged labels', async ({ page }) => {
  5   |   test.setTimeout(90_000);
  6   |   await page.emulateMedia({ reducedMotion: 'reduce' });
  7   |   await page.goto('/');
  8   |   for (const size of [100, 200]) for (const width of widths) {
  9   |     await page.setViewportSize({ width, height: 900 });
  10  |     await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, size);
  11  |     await page.locator('#request-a-quote').scrollIntoViewIfNeeded();
  12  |     for (const [first, second] of [['fullName', 'email'], ['company', 'telephone'], ['industry', 'location']]) {
  13  |       const a = await page.locator(`#quotation-${first}`).boundingBox();
  14  |       const b = await page.locator(`#quotation-${second}`).boundingBox();
  15  |       if (Math.abs(a!.x - b!.x) < 1) expect(b!.y).toBeGreaterThanOrEqual(a!.y + a!.height);
  16  |       else expect(Math.abs(a!.y - b!.y), `${width}px, ${size}%: ${first}/${second}`).toBeLessThan(1);
  17  |     }
  18  |     expect(await page.locator('#request-a-quote input, #request-a-quote select, #request-a-quote textarea').count()).toBe(8);
  19  |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  20  |     for (const field of await page.locator('.quotation-field').all()) {
  21  |       const label = await field.locator('label').boundingBox();
  22  |       const control = await field.locator('input,select,textarea').boundingBox();
  23  |       expect(control!.y).toBeGreaterThanOrEqual(label!.y + label!.height);
  24  |     }
  25  |   }
  26  |   await page.evaluate(() => { document.documentElement.style.fontSize = '100%'; });
  27  |   await page.getByRole('button', { name: 'Prepare enquiry email' }).click();
  28  |   await expect(page.locator('#quotation-fullName')).toBeFocused();
  29  |   await expect(page.locator('#quotation-fullName-error')).toHaveText('Enter your full name.');
  30  |   await expect(page.locator('#quotation-fullName')).toHaveAttribute('aria-describedby', 'quotation-fullName-error');
  31  |   for (const width of widths) {
  32  |     await page.setViewportSize({ width, height: 900 });
  33  |     await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  34  |     for (const error of await page.locator('.quotation-field-error').all()) {
  35  |       const bounds = await error.boundingBox();
  36  |       const parent = await error.locator('..').boundingBox();
  37  |       expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(parent!.y + parent!.height + 1);
  38  |       expect(await error.evaluate(e => e.scrollHeight <= e.clientHeight + 1)).toBe(true);
  39  |     }
  40  |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  41  |   }
  42  | });
  43  | 
  44  | test('AUD-12 draft is one named group with the existing keyboard and copy workflow', async ({ page }) => {
  45  |   await page.addInitScript(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {} } }); });
  46  |   await page.goto('/#request-a-quote');
  47  |   await page.locator('#quotation-fullName').fill('Tariro Moyo');
  48  |   await page.locator('#quotation-email').fill('tariro@example.com');
  49  |   await page.locator('#quotation-category').selectOption('earthmoving-construction');
  50  |   await page.locator('#quotation-requirements').fill('Excavator filters and fittings.');
  51  |   const prepare = page.getByRole('button', { name: 'Prepare enquiry email' });
  52  |   await prepare.focus(); await page.keyboard.press('Enter');
  53  |   const draft = page.getByRole('group', { name: 'Your enquiry draft', exact: true });
  54  |   await expect(draft).toHaveCount(1);
  55  |   await expect(prepare).toBeFocused();
  56  |   await expect(draft.getByRole('heading', { level: 4 })).toHaveText('Your enquiry draft');
  57  |   await expect(draft.getByRole('status')).toHaveCount(1);
  58  |   await expect(draft.locator('[aria-live=polite]')).toHaveCount(1);
  59  |   await expect(draft.getByRole('link', { name: 'Open email application' })).toHaveAttribute('href', /^mailto:/);
  60  |   await draft.getByRole('button', { name: 'Copy enquiry summary' }).click();
  61  |   await expect(draft.locator('.quotation-copy-status')).toContainText('Summary copied.');
  62  |   await draft.getByRole('button', { name: 'Select summary' }).click();
  63  |   await expect(draft.getByRole('textbox', { name: 'Enquiry summary' })).toBeFocused();
  64  | });
  65  | 
  66  | test('AUD-05 and AUD-16 retain decorative semantics with stronger hierarchy and a clear transition', async ({ page }) => {
  67  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  68  |   await page.goto('/');
  69  |   const navy = 'rgb(11, 34, 51)', amber = 'rgb(242, 162, 26)';
  70  |   const numbers = page.locator('.industry-number, .purpose-value-number');
  71  |   await expect(numbers).toHaveCount(9);
  72  |   for (const number of await numbers.all()) await expect(number).toHaveAttribute('aria-hidden', 'true');
  73  |   for (const number of await page.locator('.purpose-value-number').all()) await expect(number).toHaveCSS('color', navy);
> 74  |   await expect(page.locator('.industry-panel[data-surface=navy] .industry-number')).toHaveCSS('color', amber);
      |                                                                                     ^ Error: expect(locator).toHaveCSS(expected) failed
  75  |   await expect(page.locator('#purpose-vision')).toHaveCSS('border-top-color', amber);
  76  |   await expect(page.locator('#purpose-vision')).toHaveCSS('border-top-width', '2px');
  77  |   expect(await page.evaluate(() => document.querySelector('#purpose-vision')!.getBoundingClientRect().top - document.querySelector('#zieve-advantage')!.getBoundingClientRect().bottom)).toBe(0);
  78  |   await expect(page.locator('main h1')).toHaveCount(1);
  79  | });
  80  | 
  81  | test('mobile editorial rhythm preserves photographs and hero credit, including reduced motion', async ({ page }) => {
  82  |   await page.emulateMedia({ reducedMotion: 'reduce' });
  83  |   await page.goto('/');
  84  |   for (const width of widths) {
  85  |     await page.setViewportSize({ width, height: 900 });
  86  |     // Viewport acknowledgement can precede responsive style/layout recalculation.
  87  |     // Wait for the rendered geometry, preserving the original ratio and precision.
  88  |     await expect.poll(async () => {
  89  |       const frame = await page.locator('.introduction-image-mask').boundingBox();
  90  |       return frame ? frame.height / frame.width : null;
  91  |     }, { message: `Introduction image ratio after resizing to ${width}px` })
  92  |       .toBeCloseTo(width < 1024 ? 3 / 4 : 6 / 5, 1);
  93  |     await expect(page.locator('.hero-media-caption')).toContainText('Illustrative stock photo');
  94  |     await expect(page.locator('.hero-media-caption')).toContainText('Metehan Özaras / Pexels');
  95  |     const caption = (await page.locator('.hero-media-caption').boundingBox())!;
  96  |     const scroll = (await page.locator('.hero-scroll').boundingBox())!;
  97  |     expect(caption.x < scroll.x + scroll.width && caption.x + caption.width > scroll.x && caption.y < scroll.y + scroll.height && caption.y + caption.height > scroll.y).toBe(false);
  98  |     expect(await page.locator('.hero-media-caption').evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(12);
  99  |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  100 |     await expect(page.locator('.hero-scroll-track > span')).toHaveCSS('animation-name', 'none');
  101 |   }
  102 |   await page.locator('#company-introduction').scrollIntoViewIfNeeded();
  103 |   await expect(page.locator('[data-intro-parallax]')).toHaveCSS('transform', 'none');
  104 |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  105 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  106 |   await expect(page.locator('[data-intro-heading]')).toHaveCSS('opacity', '1');
  107 | });
  108 | 
  109 | test('introduction resize geometry settles in both directions with enlarged text and motion preferences', async ({ page }) => {
  110 |   await page.goto('/');
  111 |   const frame = page.locator('.introduction-image-mask');
  112 |   for (const motion of ['reduce', 'no-preference'] as const) {
  113 |     await page.emulateMedia({ reducedMotion: motion });
  114 |     for (const textSize of [100, 200]) {
  115 |       await page.evaluate(size => { document.documentElement.style.fontSize = `${size}%`; }, textSize);
  116 |       // Cross the image and header breakpoints in both directions, including their edges.
  117 |       for (const width of [390, 1023, 1024, 1025, 1279, 1280, 1440, 1280, 1279, 1025, 1024, 1023, 390]) {
  118 |         await page.setViewportSize({ width, height: 900 });
  119 |         await expect.poll(async () => {
  120 |           const bounds = await frame.boundingBox();
  121 |           return bounds ? bounds.height / bounds.width : null;
  122 |         }, { message: `${width}px, ${textSize}% text, ${motion}: rendered image ratio` })
  123 |           .toBeCloseTo(width < 1024 ? 3 / 4 : 6 / 5, 1);
  124 |         await page.locator('#company-introduction').scrollIntoViewIfNeeded();
  125 |         await expect(frame).toBeVisible();
  126 |         await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth))
  127 |           .toBe(width);
  128 |       }
  129 |     }
  130 |   }
  131 | });
  132 | 
```