# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase-11b.spec.ts >> mobile editorial rhythm preserves photographs and hero credit, including reduced motion
- Location: tests/e2e/phase-11b.spec.ts:81:1

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1.2
Received: 0.7499693539819393

Expected precision:    1
Expected difference: < 0.05
Received difference:   0.45003064601806064
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
          - paragraph [ref=e46]: 01 / WHO WE ARE
          - heading "Built around uptime." [level=2] [ref=e47]
          - generic [ref=e48]:
            - paragraph [ref=e49]: In heavy industry, every hour matters. A machine waiting for parts, a processing plant missing critical inputs or a project delayed by unreliable supply can create significant operational costs.
            - paragraph [ref=e50]: Zieve Industries brings equipment, gold-processing plants, industrial chemicals, lubricants and essential consumables together through one dependable industrial supply partner.
          - paragraph [ref=e53]: Reliable Supply. Real Impact.
        - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e54]:
          - img "Large metal component suspended in an industrial workshop. Not a Zieve facility photograph." [ref=e57]
    - region "One accountable partner. Five core divisions." [ref=e59]:
      - generic [ref=e61]:
        - generic [ref=e62]:
          - paragraph [ref=e63]: 02 / OUR SOLUTIONS
          - heading "One accountable partner. Five core divisions." [level=2] [ref=e64]:
            - generic [ref=e65]: One accountable partner.
            - generic [ref=e66]: Five core divisions.
          - paragraph [ref=e67]: Everything a heavy-industry client needs to acquire, run and maintain their plant and fleet.
        - generic [ref=e68]:
          - group "Choose an industrial solution" [ref=e69]:
            - button "Earthmoving & Construction Equipment" [pressed] [ref=e71] [cursor=pointer]:
              - generic [aria-hidden] [ref=e73]: "01"
            - button "Elution Plants & Gold Processing" [ref=e79] [cursor=pointer]:
              - generic [aria-hidden] [ref=e80]: "02"
            - button "Industrial Chemicals" [ref=e86] [cursor=pointer]:
              - generic [aria-hidden] [ref=e87]: "03"
            - button "Lubricants & Fluids" [ref=e93] [cursor=pointer]:
              - generic [aria-hidden] [ref=e94]: "04"
            - button "Consumables & Spares" [ref=e100] [cursor=pointer]:
              - generic [aria-hidden] [ref=e101]: "05"
          - article [ref=e107]:
            - figure "Illustrative schematic · Approved division photography pending" [ref=e109]:
              - img "Illustrative earthmoving equipment schematic. Not a Zieve facility or inventory photograph." [ref=e111]
            - generic [ref=e113]:
              - paragraph [ref=e114]: Division 01 / 05
              - heading "Built for demanding sites." [level=3] [ref=e115]
              - paragraph [ref=e116]: Excavators, bulldozers, motor graders, compaction rollers, concrete mixers, generators and genuine spare parts.
              - 'link "Link to this solution: Earthmoving & Construction Equipment" [ref=e117] [cursor=pointer]':
                - /url: /#solution-panel-earthmoving-construction
                - text: Link to this solution
          - status [ref=e121]: "Division 01: Earthmoving & Construction Equipment selected."
    - region "Built for the industries that build tomorrow." [ref=e122]:
      - generic [ref=e124]:
        - paragraph [ref=e125]: 03 / INDUSTRIES WE SERVE
        - heading "Built for the industries that build tomorrow." [level=2] [ref=e126]
      - list [ref=e127]:
        - listitem [ref=e128]:
          - article [ref=e129]:
            - generic [ref=e131]:
              - generic [ref=e132]:
                - generic [aria-hidden] [ref=e133]: "01"
                - heading "Mining & Mineral Processing" [level=3] [ref=e134]
                - paragraph [ref=e135]: Equipment and inputs for the recovery chain.
                - paragraph [ref=e136]: Supporting large-scale mining and artisanal and small-scale mining operations through equipment, gold-processing systems, industrial chemicals, lubricants and critical consumables.
                - generic [ref=e137]:
                  - paragraph [ref=e139]: Relevant solutions
                  - list [ref=e140]:
                    - listitem [ref=e141]:
                      - link "Earthmoving & Construction Equipment" [ref=e142] [cursor=pointer]:
                        - /url: /#solution-panel-earthmoving-construction
                    - listitem [ref=e143]:
                      - link "Elution Plants & Gold Processing" [ref=e144] [cursor=pointer]:
                        - /url: /#solution-panel-elution-gold-processing
                    - listitem [ref=e145]:
                      - link "Industrial Chemicals" [ref=e146] [cursor=pointer]:
                        - /url: /#solution-panel-industrial-chemicals
                    - listitem [ref=e147]:
                      - link "Lubricants & Fluids" [ref=e148] [cursor=pointer]:
                        - /url: /#solution-panel-lubricants-fluids
                    - listitem [ref=e149]:
                      - link "Consumables & Spares" [ref=e150] [cursor=pointer]:
                        - /url: /#solution-panel-consumables-spares
              - figure "Illustrative stock photo · Volker Braun / Pexels" [ref=e151]:
                - img "Overhead view of a surface extraction site with processing equipment, stockpiles and access tracks. Not a Zieve facility or employee photograph." [ref=e154]
        - listitem [ref=e156]:
          - article [ref=e157]:
            - generic [ref=e159]:
              - generic [ref=e160]:
                - generic [aria-hidden] [ref=e161]: "02"
                - heading "Civil & Infrastructure Construction" [level=3] [ref=e162]
                - paragraph [ref=e163]: From earthworks to essential infrastructure.
                - paragraph [ref=e164]: Supplying earthmoving machinery, generators, construction-related chemicals, lubricants and maintenance essentials for infrastructure and civil works.
                - paragraph [ref=e165]: For civil contractors, government agencies and public infrastructure procurement.
                - generic [ref=e166]:
                  - paragraph [ref=e168]: Relevant solutions
                  - list [ref=e169]:
                    - listitem [ref=e170]:
                      - link "Earthmoving & Construction Equipment" [ref=e171] [cursor=pointer]:
                        - /url: /#solution-panel-earthmoving-construction
                    - listitem [ref=e172]:
                      - link "Industrial Chemicals" [ref=e173] [cursor=pointer]:
                        - /url: /#solution-panel-industrial-chemicals
                    - listitem [ref=e174]:
                      - link "Lubricants & Fluids" [ref=e175] [cursor=pointer]:
                        - /url: /#solution-panel-lubricants-fluids
                    - listitem [ref=e176]:
                      - link "Consumables & Spares" [ref=e177] [cursor=pointer]:
                        - /url: /#solution-panel-consumables-spares
              - figure "Illustrative sector schematic · Approved photography pending" [ref=e178]:
                - img "Illustrative bridge and civil works scene. Not a Zieve project, facility or customer photograph." [ref=e181]
        - listitem [ref=e183]:
          - article [ref=e184]:
            - generic [ref=e186]:
              - generic [ref=e187]:
                - generic [aria-hidden] [ref=e188]: "03"
                - heading "Manufacturing" [level=3] [ref=e189]
                - paragraph [ref=e190]: Processing inputs. Maintenance essentials.
                - paragraph [ref=e191]: Providing industrial processing chemicals, lubricants, filters, fittings and essential inputs for plant operations.
                - generic [ref=e192]:
                  - paragraph [ref=e194]: Relevant solutions
                  - list [ref=e195]:
                    - listitem [ref=e196]:
                      - link "Industrial Chemicals" [ref=e197] [cursor=pointer]:
                        - /url: /#solution-panel-industrial-chemicals
                    - listitem [ref=e198]:
                      - link "Lubricants & Fluids" [ref=e199] [cursor=pointer]:
                        - /url: /#solution-panel-lubricants-fluids
                    - listitem [ref=e200]:
                      - link "Consumables & Spares" [ref=e201] [cursor=pointer]:
                        - /url: /#solution-panel-consumables-spares
              - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e202]:
                - img "Factory worker in high-visibility clothing beside a large machined metal shaft. Not a Zieve facility or employee photograph." [ref=e205]
        - listitem [ref=e207]:
          - article [ref=e208]:
            - generic [ref=e210]:
              - generic [ref=e211]:
                - generic [aria-hidden] [ref=e212]: "04"
                - heading "Agro-processing" [level=3] [ref=e213]
                - paragraph [ref=e214]: Supporting the processing cycle.
                - paragraph [ref=e215]: Supporting agro-processing facilities through industrial chemicals, machinery-related consumables, lubricants and maintenance inputs.
                - generic [ref=e216]:
                  - paragraph [ref=e218]: Relevant solutions
                  - list [ref=e219]:
                    - listitem [ref=e220]:
                      - link "Industrial Chemicals" [ref=e221] [cursor=pointer]:
                        - /url: /#solution-panel-industrial-chemicals
                    - listitem [ref=e222]:
                      - link "Lubricants & Fluids" [ref=e223] [cursor=pointer]:
                        - /url: /#solution-panel-lubricants-fluids
                    - listitem [ref=e224]:
                      - link "Consumables & Spares" [ref=e225] [cursor=pointer]:
                        - /url: /#solution-panel-consumables-spares
              - figure "Illustrative stock photo · Psilo Cybe / Pexels" [ref=e226]:
                - img "Grain silos linked by an elevated material-handling walkway in warm evening light. Not a Zieve facility or employee photograph." [ref=e229]
    - region "Built on reliability. Driven by performance." [ref=e231]:
      - generic [ref=e233]:
        - generic [ref=e234]:
          - paragraph [ref=e235]: 04 / THE ZIEVE ADVANTAGE
          - heading "Built on reliability. Driven by performance." [level=2] [ref=e236]:
            - generic [ref=e237]: Built on reliability.
            - generic [ref=e238]: Driven by performance.
          - paragraph [ref=e239]: More than a supplier. A dependable partner for the operations that cannot afford to stand still.
          - paragraph [ref=e242]: Supply. Support. Quality. Convenience. Specialisation.
        - generic [ref=e243]:
          - generic [ref=e244]:
            - heading [level=3] [ref=e245]:
              - button "Reliable Supply Chain" [expanded] [ref=e246] [cursor=pointer]:
                - generic [aria-hidden] [ref=e247]: "01"
            - region "Reliable Supply Chain" [ref=e253]:
              - paragraph [ref=e255]: Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.
          - generic [ref=e256]:
            - heading [level=3] [ref=e257]:
              - button "Technical After-Sales Support" [ref=e258] [cursor=pointer]:
                - generic [aria-hidden] [ref=e259]: "02"
            - paragraph [ref=e264]: Support beyond the point of supply, including elution plant commissioning guidance, equipment spares and lubricant specification.
          - generic [ref=e265]:
            - heading [level=3] [ref=e266]:
              - button "Genuine Quality Assurance" [ref=e267] [cursor=pointer]:
                - generic [aria-hidden] [ref=e268]: "03"
            - paragraph [ref=e273]: Authentic, fit-for-purpose products that support dependable performance and reduce operational risks associated with substandard inputs.
          - generic [ref=e274]:
            - heading [level=3] [ref=e275]:
              - button "One-Stop-Shop Convenience" [ref=e276] [cursor=pointer]:
                - generic [aria-hidden] [ref=e277]: "04"
            - paragraph [ref=e282]: Equipment, processing plants, chemicals, lubricants and consumables from one accountable industrial supply partner.
          - generic [ref=e283]:
            - heading [level=3] [ref=e284]:
              - button "Sector Specialisation" [ref=e285] [cursor=pointer]:
                - generic [aria-hidden] [ref=e286]: "05"
            - paragraph [ref=e291]: Technical understanding of mining, construction and processing operations, including recovery rates, haul roads and uptime.
    - region "The standard we operate by." [ref=e292]:
      - generic [ref=e295]:
        - paragraph [ref=e296]: 05 / OUR PURPOSE
        - heading "The standard we operate by." [level=2] [ref=e297]
        - generic [ref=e298]:
          - heading "Our Vision" [level=3] [ref=e299]
          - paragraph [ref=e301]: To be Southern Africa’s most trusted industrial supply partner — the name that mining, construction, and processing leaders rely on to keep their operations productive, profitable, and growing.
      - generic [ref=e304]:
        - heading "Our Mission" [level=3] [ref=e306]
        - paragraph [ref=e308]: To deliver genuine, high-performance equipment, plants, chemicals, and consumables — backed by uncompromising technical support — that maximise our clients’ uptime, recovery, and return on every asset they operate.
      - generic [ref=e311]:
        - heading "Our Core Values" [level=3] [ref=e312]
        - list "Our Core Values" [ref=e314]:
          - listitem [ref=e315]:
            - generic [aria-hidden] [ref=e316]: "01"
            - heading "Reliability" [level=4] [ref=e317]
            - paragraph [ref=e318]: We are measured by our clients’ uptime. Dependability is our first promise.
          - listitem [ref=e319]:
            - generic [aria-hidden] [ref=e320]: "02"
            - heading "Integrity" [level=4] [ref=e321]
            - paragraph [ref=e322]: Genuine products, honest counsel, and transparent dealing in every transaction.
          - listitem [ref=e323]:
            - generic [aria-hidden] [ref=e324]: "03"
            - heading "Partnership" [level=4] [ref=e325]
            - paragraph [ref=e326]: We succeed only when our clients do; we invest in long-term relationships, not one-off sales.
          - listitem [ref=e327]:
            - generic [aria-hidden] [ref=e328]: "04"
            - heading "Excellence" [level=4] [ref=e329]
            - paragraph [ref=e330]: Technical rigour and quality in everything we supply and support.
          - listitem [ref=e331]:
            - generic [aria-hidden] [ref=e332]: "05"
            - heading "Growth" [level=4] [ref=e333]
            - paragraph [ref=e334]: We are committed to building Zimbabwe’s industrial capacity, one well-equipped operation at a time.
    - region "Your next project starts with the right partner." [ref=e335]:
      - generic [ref=e337]:
        - generic [ref=e338]:
          - paragraph [ref=e339]: 06 / PARTNER WITH ZIEVE
          - heading "Your next project starts with the right partner." [level=2] [ref=e340]
          - paragraph [ref=e341]: Whether you're commissioning a gold-recovery circuit, mobilising an equipment fleet or sourcing essential industrial consumables, let's discuss what your operation needs.
          - generic "Zieve Industries contact information" [ref=e342]:
            - generic [ref=e343]:
              - generic [ref=e344]:
                - term [ref=e345]: Visit us
                - definition [ref=e349]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
              - generic [ref=e350]:
                - term [ref=e351]: Call us
                - definition [ref=e354]:
                  - link "+263 78 246 8399" [ref=e355] [cursor=pointer]:
                    - /url: tel:+263782468399
              - generic [ref=e356]:
                - term [ref=e357]: Email us
                - definition [ref=e361]:
                  - link "info@zieveindustries.com" [ref=e362] [cursor=pointer]:
                    - /url: mailto:info@zieveindustries.com
        - form "Prepare a quotation enquiry" [ref=e364]:
          - heading "Prepare a quotation enquiry" [level=3] [ref=e365]
          - paragraph [ref=e366]: Fields marked required are needed to prepare your email. Review the draft, open your email application, then send it manually.
          - group "Your procurement enquiry" [ref=e367]:
            - generic [ref=e369]:
              - generic [ref=e370]:
                - generic [ref=e371]:
                  - text: Full name
                  - generic [ref=e372]: (required)
                - textbox "Full name (required)" [ref=e373]
                - paragraph [ref=e374]
              - generic [ref=e375]:
                - generic [ref=e376]:
                  - text: Email address
                  - generic [ref=e377]: (required)
                - textbox "Email address (required)" [ref=e378]
                - paragraph [ref=e379]
              - generic [ref=e380]:
                - generic [ref=e381]:
                  - text: Company / organisation
                  - generic [ref=e382]: (optional)
                - textbox "Company / organisation (optional)" [ref=e383]
                - paragraph [ref=e384]
              - generic [ref=e385]:
                - generic [ref=e386]:
                  - text: Telephone / WhatsApp
                  - generic [ref=e387]: (optional)
                - textbox "Telephone / WhatsApp (optional)" [ref=e388]
                - paragraph [ref=e389]
              - generic [ref=e390]:
                - generic [ref=e391]:
                  - text: Product or service category
                  - generic [ref=e392]: (required)
                - combobox "Product or service category (required)" [ref=e393]:
                  - option "Select a category" [selected]
                  - option "Earthmoving & Construction Equipment"
                  - option "Elution Plants & Gold Processing"
                  - option "Industrial Chemicals"
                  - option "Lubricants & Fluids"
                  - option "Consumables & Spares"
                - paragraph [ref=e394]
              - generic [ref=e395]:
                - generic [ref=e396]:
                  - text: Industry sector
                  - generic [ref=e397]: (optional)
                - combobox "Industry sector (optional)" [ref=e398]:
                  - option "Not specified" [selected]
                  - option "Mining"
                  - option "Civil & Infrastructure Construction"
                  - option "Manufacturing"
                  - option "Agro-processing"
                  - option "Government / Public Sector"
                  - option "Other"
                - paragraph [ref=e399]
              - generic [ref=e400]:
                - generic [ref=e401]:
                  - text: Delivery or project location
                  - generic [ref=e402]: (optional)
                - textbox "Delivery or project location (optional)" [ref=e403]
                - paragraph [ref=e404]
              - generic [ref=e405]:
                - generic [ref=e406]:
                  - text: Requirements / project description
                  - generic [ref=e407]: (required)
                - textbox "Requirements / project description (required)" [ref=e408]
                - paragraph [ref=e409]: Up to 4,000 characters. Include quantities, specifications and timing if known.
                - paragraph [ref=e410]
            - button "Prepare enquiry email" [ref=e411] [cursor=pointer]
  - contentinfo "Zieve Industries footer" [ref=e412]:
    - generic [ref=e414]:
      - generic [ref=e415]:
        - link "Zieve Industries home" [ref=e417] [cursor=pointer]:
          - /url: /
          - img "Zieve Industries" [ref=e418]
        - generic [ref=e419]:
          - heading "Equipping Industry. Empowering Growth." [level=2] [ref=e420]
          - paragraph [ref=e421]: A dependable industrial supply and equipment partner serving Zimbabwe's mining, construction, manufacturing and agro-processing sectors.
      - generic [ref=e424]:
        - navigation "Footer primary navigation" [ref=e425]:
          - heading "Explore Zieve" [level=3] [ref=e426]
          - list [ref=e427]:
            - listitem [ref=e428]:
              - link "Home" [ref=e429] [cursor=pointer]:
                - /url: /
            - listitem [ref=e430]:
              - link "About Us" [ref=e431] [cursor=pointer]:
                - /url: /#company-introduction
            - listitem [ref=e432]:
              - link "Our Solutions" [ref=e433] [cursor=pointer]:
                - /url: /#industrial-solutions
            - listitem [ref=e434]:
              - link "Industries" [ref=e435] [cursor=pointer]:
                - /url: /#industries-we-serve
            - listitem [ref=e436]:
              - link "Why Zieve" [ref=e437] [cursor=pointer]:
                - /url: /#zieve-advantage
            - listitem [ref=e438]:
              - link "Contact" [ref=e439] [cursor=pointer]:
                - /url: /#partner-with-zieve
        - navigation "Footer solutions navigation" [ref=e440]:
          - heading "Our Solutions" [level=3] [ref=e441]
          - list [ref=e442]:
            - listitem [ref=e443]:
              - link "Earthmoving & Construction Equipment" [ref=e444] [cursor=pointer]:
                - /url: /#solution-panel-earthmoving-construction
            - listitem [ref=e445]:
              - link "Elution Plants & Gold Processing" [ref=e446] [cursor=pointer]:
                - /url: /#solution-panel-elution-gold-processing
            - listitem [ref=e447]:
              - link "Industrial Chemicals" [ref=e448] [cursor=pointer]:
                - /url: /#solution-panel-industrial-chemicals
            - listitem [ref=e449]:
              - link "Lubricants & Fluids" [ref=e450] [cursor=pointer]:
                - /url: /#solution-panel-lubricants-fluids
            - listitem [ref=e451]:
              - link "Consumables & Spares" [ref=e452] [cursor=pointer]:
                - /url: /#solution-panel-consumables-spares
        - generic [ref=e453]:
          - heading "Get in touch" [level=3] [ref=e454]
          - generic [ref=e455]:
            - paragraph [ref=e456]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
            - link "+263 78 246 8399" [ref=e457] [cursor=pointer]:
              - /url: tel:+263782468399
            - link "info@zieveindustries.com" [ref=e458] [cursor=pointer]:
              - /url: mailto:info@zieveindustries.com
          - link "Request a Quote" [ref=e459] [cursor=pointer]:
            - /url: /#request-a-quote
      - generic [ref=e463]:
        - paragraph [ref=e464]: © 2026 Zieve Industries. All rights reserved.
        - paragraph [ref=e465]: Harare, Zimbabwe
        - link "Back to top" [ref=e466] [cursor=pointer]:
          - /url: "#main-content"
  - alert [ref=e470]
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
  73  |   for (const number of await page.locator('.industry-panel:not([data-surface=navy]) .industry-number, .purpose-value-number').all()) await expect(number).toHaveCSS('color', navy);
  74  |   await expect(page.locator('.industry-panel[data-surface=navy] .industry-number')).toHaveCSS('color', amber);
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
  86  |     const frame = await page.locator('.introduction-image-mask').boundingBox();
> 87  |     expect(frame!.height / frame!.width).toBeCloseTo(width < 1024 ? 3 / 4 : 6 / 5, 1);
      |                                          ^ Error: expect(received).toBeCloseTo(expected, precision)
  88  |     await expect(page.locator('.hero-media-caption')).toContainText('Illustrative stock photo');
  89  |     await expect(page.locator('.hero-media-caption')).toContainText('Metehan Özaras / Pexels');
  90  |     const caption = (await page.locator('.hero-media-caption').boundingBox())!;
  91  |     const scroll = (await page.locator('.hero-scroll').boundingBox())!;
  92  |     expect(caption.x < scroll.x + scroll.width && caption.x + caption.width > scroll.x && caption.y < scroll.y + scroll.height && caption.y + caption.height > scroll.y).toBe(false);
  93  |     expect(await page.locator('.hero-media-caption').evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(12);
  94  |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  95  |     await expect(page.locator('.hero-scroll-track > span')).toHaveCSS('animation-name', 'none');
  96  |   }
  97  |   await page.locator('#company-introduction').scrollIntoViewIfNeeded();
  98  |   await expect(page.locator('[data-intro-parallax]')).toHaveCSS('transform', 'none');
  99  |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  100 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  101 |   await expect(page.locator('[data-intro-heading]')).toHaveCSS('opacity', '1');
  102 | });
  103 | 
```