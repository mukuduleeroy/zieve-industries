import { Container, Section, Heading, Text, Link } from '@/components/ui/primitives';
import { routes } from '@/content/navigation';
/** Development destination only. Replace when the corresponding section is approved. */
export function RouteStatus({ title }: { title: string }) {
  return <main id="main-content" tabIndex={-1}><Section><Container>
    <p className="eyebrow text-muted">Website in development</p>
    <Heading as="h1" className="mt-6 text-brand-navy">{title}</Heading>
    <Text className="mt-6">This destination is reserved. Its content will be implemented in a later section.</Text>
    <Link className="mt-8 inline-block" href={routes.home}>Return to the foundation</Link>
  </Container></Section></main>;
}
