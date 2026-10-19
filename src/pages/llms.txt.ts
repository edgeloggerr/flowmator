import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);

  const content = `# Flowmator — Bulk Flow AI Prompt Automator
> ${SITE_CONFIG.description}

Flowmator is an independent, client-side Chromium extension for visual creators, storyboarders, and filmmakers generating sequential images on Google Flow AI (labs.google / flow.google). It replaces blind timer-based scripts with DOM canvas state verification, hardware-level Chromium DevTools Protocol (CDP) event emulation, and rate-limit cool-off delays.

## Canonical Product Pages
- Homepage: ${baseUrl}/
- Features Breakdown: ${baseUrl}/features
- Technical Architecture: ${baseUrl}/how-it-works
- Installation & Setup: ${baseUrl}/setup
- Documentation Portal: ${baseUrl}/documentation
- Product Changelog: ${baseUrl}/changelog
- Support & Diagnostics: ${baseUrl}/support

## Core Documentation & Manuals
- Safe Sequence Mode (Verified Execution): ${baseUrl}/documentation/safe-sequence-mode
- Turbo Interval Mode (Rapid Timed Push): ${baseUrl}/documentation/turbo-mode
- Troubleshooting & Diagnostic Guide: ${baseUrl}/documentation/troubleshooting

## Verified Publications & Engineering Guides
${blogPosts
  .map(
    (post) => `- ${post.data.title}: ${baseUrl}/blog/${post.id.replace(/\.mdx?$/, '')}
  > ${post.data.excerpt}`
  )
  .join('\n')}

## Independent Product Status
Flowmator is an independent software tool developed by and for creators. It is not affiliated with, endorsed by, or sponsored by Google LLC or Alphabet Inc. "Google Flow" and "Google Labs" are trademarks of their respective owners.
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
