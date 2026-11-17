import { Container } from '@/components/ui/primitives';
import { homepageNavigation as navigation, homepageSolutionNavigation as solutionNavigation } from '@/content/homepage-navigation';
import { footerContent } from '@/content/footer';
import { FooterBrand } from './footer-brand';
import { FooterNavigation } from './footer-navigation';
import { FooterContact } from './footer-contact';
import { FooterUtility } from './footer-utility';
import { FooterMotion } from './footer-motion';
export function SiteFooter() {
  return <footer className="corporate-footer" aria-label={`${footerContent.companyName} footer`}><Container><FooterMotion>
    <FooterBrand />
    <span className="footer-divider" data-footer-divider aria-hidden="true"><span /></span>
    <div className="footer-groups">
      <FooterNavigation title={footerContent.primaryLabel} label="Footer primary navigation" items={navigation} />
      <FooterNavigation title={footerContent.solutionsLabel} label="Footer solutions navigation" items={solutionNavigation} />
      <FooterContact />
    </div>
    <FooterUtility />
  </FooterMotion></Container></footer>;
}
