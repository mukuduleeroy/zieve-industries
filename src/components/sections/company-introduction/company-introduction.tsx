import { Container, Section, Heading, Text } from '@/components/ui/primitives';
import { introductionContent as content } from '@/content/introduction';
import { introductionMedia } from '@/config/introduction-media';
import { IntroductionMotion } from './introduction-motion';
import { IntroductionMedia } from './introduction-media';

export function CompanyIntroduction() {
  return <Section tabIndex={-1} id={content.id} className="company-introduction" aria-labelledby="introduction-title">
    <Container>
      <IntroductionMotion>
        <div className="introduction-editorial">
          <p className="eyebrow introduction-eyebrow" data-intro-eyebrow>{content.eyebrow}</p>
          <Heading as="h2" id="introduction-title" className="introduction-heading" data-intro-heading>{content.heading}</Heading>
          <div className="introduction-narrative">{content.paragraphs.map(paragraph => <Text key={paragraph} data-intro-paragraph>{paragraph}</Text>)}</div>
          <div className="introduction-signature">
            <span className="introduction-divider" data-intro-divider aria-hidden="true" />
            <Text className="introduction-closing" data-intro-closing>{content.closing}</Text>
          </div>
        </div>
        <IntroductionMedia media={introductionMedia} />
      </IntroductionMotion>
    </Container>
  </Section>;
}
