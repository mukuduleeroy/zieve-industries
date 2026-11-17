import { ArrowUpRight, Check } from 'lucide-react';
import { Container, Section, Heading, Text, Button, Link } from '@/components/ui/primitives';
export default function FoundationPage() {
  return <>
    <main id="main-content" tabIndex={-1}>
      <Section id="foundation"><Container>
        <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-brand-ochre" /><p className="eyebrow">Development environment · Phase 0</p></div>
        <Heading as="h1" size="display" className="mt-6 max-w-3xl text-brand-navy">A foundation for what comes next.</Heading>
        <Text className="mt-6 text-muted">The Zieve Industries website foundation: a considered system of colour, typography and reusable components. Website sections are awaiting implementation.</Text>
        <div className="mt-10 flex flex-wrap items-center gap-6"><Button disabled><Check size={16} aria-hidden="true" /> Foundation preview</Button><Link href="#system">Explore the system <ArrowUpRight size={16} className="inline" aria-hidden="true" /></Link></div>
      </Container></Section>
      <Section id="system" aria-labelledby="system-title" className="border-y border-line bg-surface"><Container>
        <p className="eyebrow text-muted">Design system / 001</p>
        <Heading id="system-title" className="mt-4 text-brand-navy">Profile-led. Built to extend.</Heading>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div><Heading as="h3" size="subtitle">The core palette</Heading><div className="mt-6 grid grid-cols-2 gap-4"><div><div className="swatch bg-brand-navy" /><Text className="mt-3">Navy<br /><span className="text-sm text-muted">#0B2233</span></Text></div><div><div className="swatch bg-brand-amber" /><Text className="mt-3">Amber<br /><span className="text-sm text-muted">#F2A21A</span></Text></div></div></div>
          <div><Heading as="h3" size="subtitle">Typography & rhythm</Heading><Text className="mt-6">Noto Serif is identified in the profile’s embedded text. Georgia provides a temporary local fallback while licensed webfont files are obtained.</Text><p className="eyebrow mt-6 text-muted">Fluid type · Responsive spacing · Accessible controls</p></div>
        </div>
      </Container></Section>
    </main>
    <footer className="py-8"><Container className="flex flex-wrap justify-between gap-4 text-sm text-muted"><p>Zieve Industries</p><p>Phase 0 only · No website sections released</p></Container></footer>
  </>;
}
