import { SiteFooter } from '@/components/layout/footer/site-footer';
import { CompanyIntroduction } from '@/components/sections/company-introduction/company-introduction';
import { SolutionsShowcase } from '@/components/sections/solutions-showcase/solutions-showcase';
import { IndustryExperience } from '@/components/sections/industry-experience/industry-experience';
import { ZieveAdvantage } from '@/components/sections/zieve-advantage/zieve-advantage';
import { CorporatePurpose } from '@/components/sections/corporate-purpose/corporate-purpose';
import { QuotationSection } from '@/components/sections/quotation/quotation-section';
import { Hero } from '@/components/sections/hero/hero';
export default function HomePage() {
  return <>
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <div id="hero-end" tabIndex={-1} role="group" aria-label="End of the hero" />
      <CompanyIntroduction />
      <SolutionsShowcase />
      <IndustryExperience />
      <ZieveAdvantage />
      <CorporatePurpose />
      <QuotationSection />
    </main>
    <SiteFooter />
  </>;
}
