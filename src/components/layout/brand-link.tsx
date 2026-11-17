import { Image, Link } from '@/components/ui/primitives';
import { routes } from '@/content/navigation';
export function BrandLink({ priority = true }: { priority?: boolean } = {}) {
  return <Link href={routes.home} className="brand-link" aria-label="Zieve Industries home">
    <Image src="/branding/zieve-logo-profile.jpeg" alt="Zieve Industries" width={627} height={294} sizes="(min-width: 80rem) 158px, 132px" priority={priority} />
  </Link>;
}
