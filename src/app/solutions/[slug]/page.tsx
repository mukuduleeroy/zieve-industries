import { notFound } from 'next/navigation';
import { services } from '@/content/services';
import { RouteStatus } from '@/components/layout/route-status';
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return <RouteStatus title={service.name} />;
}
