import { profileSource } from './source';
export const company = {
  name: 'Zieve Industries',
  tagline: 'Equipping Industry. Empowering Growth.',
  positioning: 'A single, integrated source for heavy-industry operations.',
  description: 'A Harare-based industrial supply and equipment partner delivering a single, integrated source for earthmoving and construction machinery, gold-processing elution plants, industrial chemicals, lubricants, and critical consumables.',
  mission: 'To deliver genuine, high-performance equipment, plants, chemicals, and consumables — backed by uncompromising technical support — that maximise our clients’ uptime, recovery, and return on every asset they operate.',
  vision: 'To be Southern Africa’s most trusted industrial supply partner — the name that mining, construction, and processing leaders rely on to keep their operations productive, profitable, and growing.',
  values: [
    { name: 'Reliability', description: 'We are measured by our clients’ uptime. Dependability is our first promise.' },
    { name: 'Integrity', description: 'Genuine products, honest counsel, and transparent dealing in every transaction.' },
    { name: 'Partnership', description: 'We succeed only when our clients do; we invest in long-term relationships, not one-off sales.' },
    { name: 'Excellence', description: 'Technical rigour and quality in everything we supply and support.' },
    { name: 'Growth', description: 'We are committed to building Zimbabwe’s industrial capacity, one well-equipped operation at a time.' },
  ],
  sources: { identity: profileSource(3, 12), positioning: profileSource(2), missionVisionValues: profileSource(11) },
} as const;
