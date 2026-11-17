import { z } from 'zod';
import { quotationCategories, quotationIndustries } from '@/content/quotation';
export const quotationLimits = { fullName: 120, email: 254, company: 160, telephone: 60, location: 200, requirements: 4000 } as const;
const singleLine = (maximum: number) => z.string().trim().max(maximum, `Use ${maximum} characters or fewer.`).refine(value => !/[\u0000-\u001f\u007f]/.test(value), 'Use a single line without control characters.');
export const quotationSchema = z.object({
  fullName: singleLine(quotationLimits.fullName).min(1, 'Enter your full name.'),
  email: singleLine(quotationLimits.email).min(1, 'Enter your email address.').email('Enter a valid email address.'),
  company: singleLine(quotationLimits.company),
  telephone: singleLine(quotationLimits.telephone),
  category: z.string().refine(value => quotationCategories.some(item => item.value === value), 'Choose a product or service category.'),
  industry: z.string().refine(value => value === '' || quotationIndustries.some(item => item.value === value), 'Choose an industry sector from the list.'),
  location: singleLine(quotationLimits.location),
  requirements: z.string().trim().min(1, 'Describe your requirements or project.').max(quotationLimits.requirements, `Use ${quotationLimits.requirements} characters or fewer.`).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), 'Remove unsupported control characters.'),
});
export type QuotationData = z.infer<typeof quotationSchema>;
export const quotationDefaults: QuotationData = { fullName: '', email: '', company: '', telephone: '', category: '', industry: '', location: '', requirements: '' };
