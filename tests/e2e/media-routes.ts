import type { Page } from '@playwright/test';

/** Match both direct schematic URLs and Next Image's encoded local source URLs. */
export async function blockMedia(page: Page, sources: string[]) {
  const blocked = new Set(sources);
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    const source = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
    return source && blocked.has(source) ? route.abort() : route.continue();
  });
}
