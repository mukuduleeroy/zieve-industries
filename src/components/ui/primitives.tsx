import NextLink from 'next/link';
import NextImage from 'next/image';
import type { ComponentProps, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-shell', className)} {...props} />;
}
export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('section-shell', className)} {...props} />;
}
type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; size?: 'display' | 'title' | 'subtitle' };
export function Heading({ as: Tag = 'h2', size = 'title', className, ...props }: HeadingProps) {
  return <Tag className={cn(`heading heading-${size}`, className)} {...props} />;
}
export function Text({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('body-text', className)} {...props} />;
}
export function Button({ className, type = 'button', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return <button type={type} className={cn('button', `button-${variant}`, className)} {...props} />;
}
export function Link({ className, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink className={cn('text-link', className)} {...props} />;
}
export function Image({ className, alt, ...props }: ComponentProps<typeof NextImage>) {
  return <NextImage alt={alt} className={cn('media-image', className)} {...props} />;
}

/** Native document anchors retain hashchange, focus, refresh and no-JavaScript semantics. */
export function Anchor({ className, href, ...props }: ComponentProps<'a'>) {
  if (href === '/') return <NextLink href={href} className={cn('text-link', className)} {...props} />;
  return <a href={href} className={cn('text-link', className)} {...props} />;
}
