import { RouteStatus } from '@/components/layout/route-status';
import { navigation } from '@/content/navigation';
export default function Page() {
  return <RouteStatus title={navigation[2].label} />;
}
