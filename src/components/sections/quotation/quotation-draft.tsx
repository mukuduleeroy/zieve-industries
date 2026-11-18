'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/primitives';
import type { PreparedQuotation } from '@/lib/quotation/submission';
export function QuotationDraft({ draft }: { draft: PreparedQuotation }) {
  const summary = useRef<HTMLTextAreaElement>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const copy = async () => {
    try { await navigator.clipboard.writeText(draft.summary); setCopyStatus('Summary copied. Paste it into your email application and send it manually.'); }
    catch { setCopyStatus('Clipboard access is unavailable. Use Select summary, then copy the text manually.'); }
  };
  return <div className="quotation-draft" role="group" aria-labelledby="quotation-draft-title">
    <h4 id="quotation-draft-title" className="heading heading-subtitle">Your enquiry draft</h4>
    <p role="status">{draft.kind === 'email' ? 'Your draft is ready to review. Open your email application below and send it manually.' : 'This enquiry is too long for a reliable email link. Copy the complete summary below into a new email instead.'} Nothing has been submitted from this website.</p>
    <p className="quotation-draft-destination"><strong>To:</strong> {draft.to}<br /><strong>Subject:</strong> {draft.subject}</p>
    <label htmlFor="quotation-summary">Enquiry summary</label>
    <textarea ref={summary} id="quotation-summary" readOnly rows={10} value={draft.summary} />
    <div className="quotation-draft-actions">
      {draft.kind === 'email' && <a className="button quotation-primary" href={draft.href}>Open email application</a>}
      <Button variant="secondary" onClick={copy}>Copy enquiry summary</Button>
      <Button variant="secondary" onClick={() => { summary.current?.focus(); summary.current?.select(); }}>Select summary</Button>
    </div>
    <p aria-live="polite" className="quotation-copy-status">{copyStatus}</p>
    <p className="quotation-draft-note">If no email application opens, create an email to {draft.to}, use the subject shown above and paste the summary. A configured email application is required for email links; limits vary by browser and application. Keep your details here until you have sent the email yourself.</p>
  </div>;
}
