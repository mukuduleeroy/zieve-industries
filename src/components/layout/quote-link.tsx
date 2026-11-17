import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/components/ui/primitives';
import { quoteAction } from '@/content/navigation';
export function QuoteLink() {
  return <Link href={quoteAction.href} className="button quote-link">{quoteAction.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
