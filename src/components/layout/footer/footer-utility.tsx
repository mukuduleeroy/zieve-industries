import { company } from '@/content/company';
import { footerContent } from '@/content/footer';
import { getCopyrightYear } from '@/lib/copyright-year';
import { CopyrightYear } from './copyright-year';
import { BackToTop } from './back-to-top';
export function FooterUtility() {
  return <div className="footer-utility" data-footer-reveal>
    <p>© <CopyrightYear initialYear={getCopyrightYear()} /> {company.name}. All rights reserved.</p>
    <p>{footerContent.location}</p>
    <BackToTop />
  </div>;
}
