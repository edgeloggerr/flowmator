import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');

  const content = `# ============================================================
# FLOWMATOR ROBOTS & SEARCH DISCOVERABILITY POLICY
# ============================================================
# Site Origin: ${baseUrl}
# Owner-configurable policy for standard search & AI retrieval crawlers.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /draft/

# AI Retrieval & Search Crawlers (Explicitly Allowed for Organic Search & Citation)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap Location
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
