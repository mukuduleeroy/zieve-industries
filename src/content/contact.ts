import { profileSource } from './source';
export const contact = {
  address: '46 Van Praagh Avenue, Miton Park, Harare, Zimbabwe',
  phone: '+263 78 246 8399',
  phoneHref: 'tel:+263782468399',
  email: 'info@zieveindustries.com',
  emailHref: 'mailto:info@zieveindustries.com',
  source: profileSource(3, 12),
} as const;
