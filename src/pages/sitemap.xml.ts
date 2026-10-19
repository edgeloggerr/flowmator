import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');
  const currentDate = new Date().toISOString().split('T')[0];

  // Static indexable routes
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: 'features', priority: '0.9', changefreq: 'monthly' },
    { path: 'how-it-works', priority: '0.9', changefreq: 'monthly' },
    { path: 'setup', priority: '0.9', changefreq: 'monthly' },
    { path: 'documentation', priority: '0.8', changefreq: 'weekly' },
    { path: 'documentation/safe-sequence-mode', priority: '0.8', changefreq: 'monthly' },
    { path: 'documentation/turbo-mode', priority: '0.8', changefreq: 'monthly' },
    { path: 'documentation/troubleshooting', priority: '0.8', changefreq: 'weekly' },
    { path: 'blog', priority: '0.9', changefreq: 'daily' },
    { path: 'compare/flowmator-vs-manual-google-flow', priority: '0.7', changefreq: 'monthly' },
    { path: 'use-cases/storyboarding', priority: '0.8', changefreq: 'monthly' },
    { path: 'changelog', priority: '0.7', changefreq: 'monthly' },
    { path: 'support', priority: '0.7', changefreq: 'monthly' },
    { path: 'privacy', priority: '0.4', changefreq: 'yearly' },
    { path: 'terms', priority: '0.4', changefreq: 'yearly' },
  ];

  // Category landing pages
  const categories = [
    'google-flow-ai',
    'prompt-automation',
    'ai-storyboarding',
    'creator-productivity',
    'technical-guides'
  ].map((cat) => ({
    path: `blog/category/${cat}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  // Fetch only non-draft blog posts
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  const articleRoutes = blogPosts.map((post) => ({
    path: `blog/${post.id.replace(/\.mdx?$/, '')}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.data.updatedDate || post.data.publishedDate
  }));

  const allUrls = [...staticRoutes, ...categories, ...articleRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}/${item.path.replace(/^\/+/, '')}</loc>
    <lastmod>${'lastmod' in item && item.lastmod ? item.lastmod : currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex', // Sitemap itself shouldn't be indexed as web content
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
