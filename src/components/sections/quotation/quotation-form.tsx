'use client';
import { useState, useSyncExternalStore, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Heading } from '@/components/ui/primitives';
import { quotationContent as content } from '@/content/quotation';
import { quotationSchema, quotationDefaults, type QuotationData } from '@/lib/quotation/schema';
import { emailQuotationAdapter, type QuotationSubmissionAdapter, type PreparedQuotation } from '@/lib/quotation/submission';
import { QuotationFields } from './quotation-fields';
import { QuotationDraft } from './quotation-draft';
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export function QuotationForm({ adapter = emailQuotationAdapter }: { adapter?: QuotationSubmissionAdapter }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const revision = useRef(0);
  const [draft, setDraft] = useState<PreparedQuotation | null>(null);
  const [handoffError, setHandoffError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuotationData>({
    resolver: zodResolver(quotationSchema), defaultValues: quotationDefaults, mode: 'onSubmit', reValidateMode: 'onChange', shouldFocusError: true,
  });
  const prepare = async (data: QuotationData, version: number) => {
    try { const prepared = await adapter.prepare(data); if (version === revision.current) { setDraft(prepared); setHandoffError(''); } }
    catch { if (version === revision.current) setHandoffError('The email draft could not be prepared. Your details are still here; try again or use the contact email.'); }
  };
  return <div className="quotation-form-surface" data-quotation-form>
    <form id={content.formId} aria-labelledby="quotation-form-title" aria-describedby="quotation-form-instructions" tabIndex={-1} noValidate onChangeCapture={() => { revision.current++; setDraft(null); setHandoffError(''); }} aria-busy={isSubmitting} onSubmit={event => {
      if (isSubmitting) { event.preventDefault(); return; }
      const version = revision.current;
      void handleSubmit(data => prepare(data, version))(event);
    }}>
      <Heading as="h3" size="subtitle" id="quotation-form-title">{content.formTitle}</Heading>
      <p id="quotation-form-instructions" className="quotation-instructions">{content.instructions}</p>
      <fieldset disabled={!hydrated}>
        <legend className="sr-only">Your procurement enquiry</legend>
        <QuotationFields register={register} errors={errors} />
        <Button type="submit" className="quotation-primary" aria-disabled={isSubmitting}>Prepare enquiry email</Button>
      </fieldset>
      <noscript><p>Enable JavaScript to prepare an email draft, or contact Zieve Industries using the email address alongside this form. These fields stay disabled without JavaScript.</p></noscript>
      {handoffError && <p role="alert" className="quotation-field-error">{handoffError}</p>}
    </form>
    {draft && <QuotationDraft key={draft.summary} draft={draft} />}
  </div>;
}
