'use client';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { quotationCategories, quotationIndustries } from '@/content/quotation';
import { quotationLimits as limits, type QuotationData } from '@/lib/quotation/schema';
import { QuotationField } from './form-field';
export function QuotationFields({ register, errors }: { register: UseFormRegister<QuotationData>; errors: FieldErrors<QuotationData> }) {
  const attributes = (name: keyof QuotationData, hint = false) => ({
    id: `quotation-${name}`, 'aria-invalid': !!errors[name],
    'aria-describedby': `${hint ? `quotation-${name}-hint ` : ''}quotation-${name}-error`,
  });
  return <div className="quotation-fields">
    <QuotationField id="quotation-fullName" label="Full name" required error={errors.fullName?.message}><input {...register('fullName')} {...attributes('fullName')} type="text" autoComplete="name" maxLength={limits.fullName} required /></QuotationField>
    <QuotationField id="quotation-email" label="Email address" required error={errors.email?.message}><input {...register('email')} {...attributes('email')} type="email" autoComplete="email" maxLength={limits.email} required /></QuotationField>
    <QuotationField id="quotation-company" label="Company / organisation" error={errors.company?.message}><input {...register('company')} {...attributes('company')} type="text" autoComplete="organization" maxLength={limits.company} /></QuotationField>
    <QuotationField id="quotation-telephone" label="Telephone / WhatsApp" error={errors.telephone?.message}><input {...register('telephone')} {...attributes('telephone')} type="tel" autoComplete="tel" maxLength={limits.telephone} /></QuotationField>
    <QuotationField id="quotation-category" label="Product or service category" required error={errors.category?.message} wide><select {...register('category')} {...attributes('category')} required><option value="">Select a category</option>{quotationCategories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></QuotationField>
    <QuotationField id="quotation-industry" label="Industry sector" error={errors.industry?.message}><select {...register('industry')} {...attributes('industry')}><option value="">Not specified</option>{quotationIndustries.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></QuotationField>
    <QuotationField id="quotation-location" label="Delivery or project location" error={errors.location?.message}><input {...register('location')} {...attributes('location')} type="text" autoComplete="address-level2" maxLength={limits.location} /></QuotationField>
    <QuotationField id="quotation-requirements" label="Requirements / project description" required error={errors.requirements?.message} hint="Up to 4,000 characters. Include quantities, specifications and timing if known." wide><textarea {...register('requirements')} {...attributes('requirements', true)} rows={5} maxLength={limits.requirements} required /></QuotationField>
  </div>;
}
