import type { ReactNode } from 'react';
export function QuotationField({ id, label, required = false, error, hint, children, wide = false }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return <div className={`quotation-field${wide ? ' quotation-field-wide' : ''}`}>
    <label htmlFor={id}>{label} <span>({required ? 'required' : 'optional'})</span></label>
    {children}
    {hint && <p id={`${id}-hint`} className="quotation-field-hint">{hint}</p>}
    <p id={`${id}-error`} className="quotation-field-error" aria-live="polite">{error ?? ''}</p>
  </div>;
}
