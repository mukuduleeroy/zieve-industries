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
                  - paragraph [ref=e152]: Equipment and inputs for the recovery chain.
                  - paragraph [ref=e153]: Supporting large-scale mining and artisanal and small-scale mining operations through equipment, gold-processing systems, industrial chemicals, lubricants and critical consumables.
                  - generic [ref=e154]:
                    - paragraph [ref=e156]: Relevant solutions
                    - list [ref=e157]:
                      - listitem [ref=e158]:
                        - link "Earthmoving & Construction Equipment" [ref=e159] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e160]:
                        - link "Elution Plants & Gold Processing" [ref=e161] [cursor=pointer]:
                          - /url: /#solution-panel-elution-gold-processing
                      - listitem [ref=e162]:
                        - link "Industrial Chemicals" [ref=e163] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e164]:
                        - link "Lubricants & Fluids" [ref=e165] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e166]:
                        - link "Consumables & Spares" [ref=e167] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Volker Braun / Pexels" [ref=e168]:
                  - img "Overhead view of a surface extraction site with processing equipment, stockpiles and access tracks. Not a Zieve facility or employee photograph." [ref=e171]
          - listitem [ref=e173]:
            - article [ref=e174]:
              - generic [ref=e176]:
                - generic [ref=e177]:
                  - generic [aria-hidden] [ref=e178]: "02"
                  - heading "Civil & Infrastructure Construction" [level=3] [ref=e179]
                  - paragraph [ref=e180]: From earthworks to essential infrastructure.
                  - paragraph [ref=e181]: Supplying earthmoving machinery, generators, construction-related chemicals, lubricants and maintenance essentials for infrastructure and civil works.
                  - paragraph [ref=e182]: For civil contractors, government agencies and public infrastructure procurement.
                  - generic [ref=e183]:
                    - paragraph [ref=e185]: Relevant solutions
                    - list [ref=e186]:
                      - listitem [ref=e187]:
                        - link "Earthmoving & Construction Equipment" [ref=e188] [cursor=pointer]:
                          - /url: /#solution-panel-earthmoving-construction
                      - listitem [ref=e189]:
                        - link "Industrial Chemicals" [ref=e190] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e191]:
                        - link "Lubricants & Fluids" [ref=e192] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e193]:
                        - link "Consumables & Spares" [ref=e194] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative sector schematic · Approved photography pending" [ref=e195]:
                  - img "Illustrative bridge and civil works scene. Not a Zieve project, facility or customer photograph." [ref=e198]
          - listitem [ref=e200]:
            - article [ref=e201]:
              - generic [ref=e203]:
                - generic [ref=e204]:
                  - generic [aria-hidden] [ref=e205]: "03"
                  - heading "Manufacturing" [level=3] [ref=e206]
                  - paragraph [ref=e207]: Processing inputs. Maintenance essentials.
                  - paragraph [ref=e208]: Providing industrial processing chemicals, lubricants, filters, fittings and essential inputs for plant operations.
                  - generic [ref=e209]:
                    - paragraph [ref=e211]: Relevant solutions
                    - list [ref=e212]:
                      - listitem [ref=e213]:
                        - link "Industrial Chemicals" [ref=e214] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e215]:
                        - link "Lubricants & Fluids" [ref=e216] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e217]:
                        - link "Consumables & Spares" [ref=e218] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Kateryna Babaieva / Pexels" [ref=e219]:
                  - img "Factory worker in high-visibility clothing beside a large machined metal shaft. Not a Zieve facility or employee photograph." [ref=e222]
          - listitem [ref=e224]:
            - article [ref=e225]:
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - generic [aria-hidden] [ref=e229]: "04"
                  - heading "Agro-processing" [level=3] [ref=e230]
                  - paragraph [ref=e231]: Supporting the processing cycle.
                  - paragraph [ref=e232]: Supporting agro-processing facilities through industrial chemicals, machinery-related consumables, lubricants and maintenance inputs.
                  - generic [ref=e233]:
                    - paragraph [ref=e235]: Relevant solutions
                    - list [ref=e236]:
                      - listitem [ref=e237]:
                        - link "Industrial Chemicals" [ref=e238] [cursor=pointer]:
                          - /url: /#solution-panel-industrial-chemicals
                      - listitem [ref=e239]:
                        - link "Lubricants & Fluids" [ref=e240] [cursor=pointer]:
                          - /url: /#solution-panel-lubricants-fluids
                      - listitem [ref=e241]:
                        - link "Consumables & Spares" [ref=e242] [cursor=pointer]:
                          - /url: /#solution-panel-consumables-spares
                - figure "Illustrative stock photo · Psilo Cybe / Pexels" [ref=e243]:
                  - img "Grain silos linked by an elevated material-handling walkway in warm evening light. Not a Zieve facility or employee photograph." [ref=e246]
    - region "Built on reliability. Driven by performance." [ref=e248]:
      - generic [ref=e250]:
        - generic [ref=e251]:
          - heading "Built on reliability. Driven by performance." [level=2] [ref=e252]:
            - generic [ref=e253]: Built on reliability.
            - generic [ref=e254]: Driven by performance.
          - paragraph [ref=e255]: More than a supplier. A dependable partner for the operations that cannot afford to stand still.
          - paragraph [ref=e258]: Supply. Support. Quality. Convenience. Specialisation.
        - generic [ref=e259]:
          - generic [ref=e260]:
            - heading [level=3] [ref=e261]:
              - button "Reliable Supply Chain" [expanded] [ref=e262] [cursor=pointer]:
                - generic [aria-hidden] [ref=e263]: "01"
            - region "Reliable Supply Chain" [ref=e269]:
              - paragraph [ref=e271]: Our Harare base and disciplined inventory approach help clients obtain the equipment, materials and consumables they need to keep operations moving.
          - generic [ref=e272]:
            - heading [level=3] [ref=e273]:
              - button "Technical After-Sales Support" [ref=e274] [cursor=pointer]:
                - generic [aria-hidden] [ref=e275]: "02"
            - paragraph [ref=e280]: Support beyond the point of supply, including elution plant commissioning guidance, equipment spares and lubricant specification.
          - generic [ref=e281]:
            - heading [level=3] [ref=e282]:
              - button "Genuine Quality Assurance" [ref=e283] [cursor=pointer]:
                - generic [aria-hidden] [ref=e284]: "03"
            - paragraph [ref=e289]: Authentic, fit-for-purpose products that support dependable performance and reduce operational risks associated with substandard inputs.
          - generic [ref=e290]:
            - heading [level=3] [ref=e291]:
              - button "One-Stop-Shop Convenience" [ref=e292] [cursor=pointer]:
                - generic [aria-hidden] [ref=e293]: "04"
            - paragraph [ref=e298]: Equipment, processing plants, chemicals, lubricants and consumables from one accountable industrial supply partner.
          - generic [ref=e299]:
            - heading [level=3] [ref=e300]:
              - button "Sector Specialisation" [ref=e301] [cursor=pointer]:
                - generic [aria-hidden] [ref=e302]: "05"
            - paragraph [ref=e307]: Technical understanding of mining, construction and processing operations, including recovery rates, haul roads and uptime.
    - region "The standard we operate by." [ref=e308]:
      - generic [ref=e311]:
        - heading "The standard we operate by." [level=2] [ref=e312]
        - generic [ref=e313]:
          - heading "Our Vision" [level=3] [ref=e314]
          - paragraph [ref=e316]: To be Southern Africa’s most trusted industrial supply partner — the name that mining, construction, and processing leaders rely on to keep their operations productive, profitable, and growing.
      - generic [ref=e319]:
        - heading "Our Mission" [level=3] [ref=e321]
        - paragraph [ref=e323]: To deliver genuine, high-performance equipment, plants, chemicals, and consumables — backed by uncompromising technical support — that maximise our clients’ uptime, recovery, and return on every asset they operate.
      - generic [ref=e326]:
        - heading "Our Core Values" [level=3] [ref=e327]
        - list "Our Core Values" [ref=e329]:
          - listitem [ref=e330]:
            - generic [aria-hidden] [ref=e331]: "01"
            - heading "Reliability" [level=4] [ref=e332]
            - paragraph [ref=e333]: We are measured by our clients’ uptime. Dependability is our first promise.
          - listitem [ref=e334]:
            - generic [aria-hidden] [ref=e335]: "02"
            - heading "Integrity" [level=4] [ref=e336]
            - paragraph [ref=e337]: Genuine products, honest counsel, and transparent dealing in every transaction.
          - listitem [ref=e338]:
            - generic [aria-hidden] [ref=e339]: "03"
            - heading "Partnership" [level=4] [ref=e340]
            - paragraph [ref=e341]: We succeed only when our clients do; we invest in long-term relationships, not one-off sales.
          - listitem [ref=e342]:
            - generic [aria-hidden] [ref=e343]: "04"
            - heading "Excellence" [level=4] [ref=e344]
            - paragraph [ref=e345]: Technical rigour and quality in everything we supply and support.
          - listitem [ref=e346]:
            - generic [aria-hidden] [ref=e347]: "05"
            - heading "Growth" [level=4] [ref=e348]
            - paragraph [ref=e349]: We are committed to building Zimbabwe’s industrial capacity, one well-equipped operation at a time.
    - region "Your next project starts with the right partner." [ref=e350]:
      - generic [ref=e352]:
        - generic [ref=e353]:
          - heading "Your next project starts with the right partner." [level=2] [ref=e354]
          - paragraph [ref=e355]: Whether you're commissioning a gold-recovery circuit, mobilising an equipment fleet or sourcing essential industrial consumables, let's discuss what your operation needs.
          - generic "Zieve Industries contact information" [ref=e356]:
            - generic [ref=e357]:
              - generic [ref=e358]:
                - term [ref=e359]: Visit us
                - definition [ref=e363]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
              - generic [ref=e364]:
                - term [ref=e365]: Call us
                - definition [ref=e368]:
                  - link "+263 78 246 8399" [ref=e369] [cursor=pointer]:
                    - /url: tel:+263782468399
              - generic [ref=e370]:
                - term [ref=e371]: Email us
                - definition [ref=e375]:
                  - link "info@zieveindustries.com" [ref=e376] [cursor=pointer]:
                    - /url: mailto:info@zieveindustries.com
        - form "Prepare a quotation enquiry" [ref=e378]:
          - heading "Prepare a quotation enquiry" [level=3] [ref=e379]
          - paragraph [ref=e380]: Fields marked required are needed to prepare your email. Review the draft, open your email application, then send it manually.
          - group "Your procurement enquiry" [ref=e381]:
            - generic [ref=e383]:
              - generic [ref=e384]:
                - generic [ref=e385]:
                  - text: Full name
                  - generic [ref=e386]: (required)
                - textbox "Full name (required)" [ref=e387]
                - paragraph [ref=e388]
              - generic [ref=e389]:
                - generic [ref=e390]:
                  - text: Email address
                  - generic [ref=e391]: (required)
                - textbox "Email address (required)" [ref=e392]
                - paragraph [ref=e393]
              - generic [ref=e394]:
                - generic [ref=e395]:
                  - text: Company / organisation
                  - generic [ref=e396]: (optional)
                - textbox "Company / organisation (optional)" [ref=e397]
                - paragraph [ref=e398]
              - generic [ref=e399]:
                - generic [ref=e400]:
                  - text: Telephone / WhatsApp
                  - generic [ref=e401]: (optional)
                - textbox "Telephone / WhatsApp (optional)" [ref=e402]
                - paragraph [ref=e403]
              - generic [ref=e404]:
                - generic [ref=e405]:
                  - text: Product or service category
                  - generic [ref=e406]: (required)
                - combobox "Product or service category (required)" [ref=e407]:
                  - option "Select a category" [selected]
                  - option "Earthmoving & Construction Equipment"
                  - option "Elution Plants & Gold Processing"
                  - option "Industrial Chemicals"
                  - option "Lubricants & Fluids"
                  - option "Consumables & Spares"
                - paragraph [ref=e408]
              - generic [ref=e409]:
                - generic [ref=e410]:
                  - text: Industry sector
                  - generic [ref=e411]: (optional)
                - combobox "Industry sector (optional)" [ref=e412]:
                  - option "Not specified" [selected]
                  - option "Mining"
                  - option "Civil & Infrastructure Construction"
                  - option "Manufacturing"
                  - option "Agro-processing"
                  - option "Government / Public Sector"
                  - option "Other"
                - paragraph [ref=e413]
              - generic [ref=e414]:
                - generic [ref=e415]:
                  - text: Delivery or project location
                  - generic [ref=e416]: (optional)
                - textbox "Delivery or project location (optional)" [ref=e417]
                - paragraph [ref=e418]
              - generic [ref=e419]:
                - generic [ref=e420]:
                  - text: Requirements / project description
                  - generic [ref=e421]: (required)
                - textbox "Requirements / project description (required)" [ref=e422]
                - paragraph [ref=e423]: Up to 4,000 characters. Include quantities, specifications and timing if known.
                - paragraph [ref=e424]
            - button "Prepare enquiry email" [ref=e425] [cursor=pointer]
  - contentinfo "Zieve Industries footer" [ref=e426]:
    - generic [ref=e428]:
      - generic [ref=e429]:
        - link "Zieve Industries home" [ref=e431] [cursor=pointer]:
          - /url: /
          - img "Zieve Industries" [ref=e432]
        - generic [ref=e433]:
          - heading "Equipping Industry. Empowering Growth." [level=2] [ref=e434]
          - paragraph [ref=e435]: A dependable industrial supply and equipment partner serving Zimbabwe's mining, construction, manufacturing and agro-processing sectors.
      - generic [ref=e438]:
        - navigation "Footer primary navigation" [ref=e439]:
          - heading "Explore Zieve" [level=3] [ref=e440]
          - list [ref=e441]:
            - listitem [ref=e442]:
              - link "Home" [ref=e443] [cursor=pointer]:
                - /url: /
            - listitem [ref=e444]:
              - link "About Us" [ref=e445] [cursor=pointer]:
                - /url: /#company-introduction
            - listitem [ref=e446]:
              - link "Our Solutions" [ref=e447] [cursor=pointer]:
                - /url: /#industrial-solutions
            - listitem [ref=e448]:
              - link "Industries" [ref=e449] [cursor=pointer]:
                - /url: /#industries-we-serve
            - listitem [ref=e450]:
              - link "Why Zieve" [ref=e451] [cursor=pointer]:
                - /url: /#zieve-advantage
            - listitem [ref=e452]:
              - link "Contact" [ref=e453] [cursor=pointer]:
                - /url: /#partner-with-zieve
        - navigation "Footer solutions navigation" [ref=e454]:
          - heading "Our Solutions" [level=3] [ref=e455]
          - list [ref=e456]:
            - listitem [ref=e457]:
              - link "Earthmoving & Construction Equipment" [ref=e458] [cursor=pointer]:
                - /url: /#solution-panel-earthmoving-construction
            - listitem [ref=e459]:
              - link "Elution Plants & Gold Processing" [ref=e460] [cursor=pointer]:
                - /url: /#solution-panel-elution-gold-processing
            - listitem [ref=e461]:
              - link "Industrial Chemicals" [ref=e462] [cursor=pointer]:
                - /url: /#solution-panel-industrial-chemicals
            - listitem [ref=e463]:
              - link "Lubricants & Fluids" [ref=e464] [cursor=pointer]:
                - /url: /#solution-panel-lubricants-fluids
            - listitem [ref=e465]:
              - link "Consumables & Spares" [ref=e466] [cursor=pointer]:
                - /url: /#solution-panel-consumables-spares
        - generic [ref=e467]:
          - heading "Get in touch" [level=3] [ref=e468]
          - generic [ref=e469]:
            - paragraph [ref=e470]: 46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe
            - link "+263 78 246 8399" [ref=e471] [cursor=pointer]:
              - /url: tel:+263782468399
            - link "info@zieveindustries.com" [ref=e472] [cursor=pointer]:
              - /url: mailto:info@zieveindustries.com
          - link "Request a Quote" [ref=e473] [cursor=pointer]:
            - /url: /#request-a-quote
      - generic [ref=e477]:
        - paragraph [ref=e478]: © 2026 Zieve Industries. All rights reserved.
        - paragraph [ref=e479]: Harare, Zimbabwe
        - link "Back to top" [ref=e480] [cursor=pointer]:
          - /url: "#main-content"
  - alert [ref=e484]
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