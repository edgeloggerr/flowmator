import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// Extract publication dates from blog MDX frontmatter for sitemap lastmod
function getBlogMetadataMap() {
  const blogDir = path.resolve('./src/content/blog');
  const metaMap = new Map();
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const slug = file.replace(/\.mdx?$/, '');
        const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (fmMatch) {
          let publishedDate = '';
          let updatedDate = '';
          let draft = false;
          fmMatch[1].split(/\r?\n/).forEach((line) => {
            const parts = line.split(':');
            if (parts.length >= 2) {
              const key = parts[0].trim();
              const val = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
              if (key === 'publishedDate') publishedDate = val;
              if (key === 'updatedDate') updatedDate = val;
              if (key === 'draft') draft = val === 'true';
            }
          });
          metaMap.set(slug, {
            lastmod: updatedDate || publishedDate,
            draft
          });
        }
      } catch (e) {
        // Ignore read errors gracefully
      }
    }
  }
  return metaMap;
}

const blogMeta = getBlogMetadataMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://flowmator.dev',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml'
  },
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'nord',
        wrap: true,
      },
    }),
    sitemap({
      filter: (page) => {
        // Exclude text endpoints, internal xml endpoints, or drafts
        if (
          page.endsWith('.txt') ||
          page.endsWith('.xml') ||
          page.includes('/draft/')
        ) {
          return false;
        }
        // Exclude draft blog posts if any
        const blogMatch = page.match(/\/blog\/([^/]+)\/?$/);
        if (blogMatch && blogMatch[1] && !blogMatch[1].startsWith('category')) {
          const meta = blogMeta.get(blogMatch[1]);
          if (meta?.draft) return false;
        }
        return true;
      },
      serialize: (item) => {
        const url = new URL(item.url);
        const pathname = url.pathname;

        let priority = 0.7;
        let changefreq = 'weekly';
        let lastmod = item.lastmod || new Date();

        if (pathname === '/' || pathname === '') {
          priority = 1.0;
          changefreq = 'weekly';
        } else if (
          pathname.startsWith('/features') ||
          pathname.startsWith('/how-it-works') ||
          pathname.startsWith('/setup') ||
          pathname === '/documentation/' ||
          pathname === '/documentation'
        ) {
          priority = 0.9;
          changefreq = 'monthly';
        } else if (pathname.startsWith('/documentation/')) {
          priority = 0.8;
          changefreq = 'weekly';
        } else if (pathname === '/blog/' || pathname === '/blog') {
          priority = 0.9;
          changefreq = 'daily';
        } else if (pathname.startsWith('/blog/category/')) {
          priority = 0.7;
          changefreq = 'weekly';
        } else if (pathname.startsWith('/blog/')) {
          priority = 0.8;
          changefreq = 'monthly';
          const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
          const meta = blogMeta.get(slug);
          if (meta?.lastmod) {
            lastmod = new Date(meta.lastmod);
          }
        } else if (pathname.startsWith('/compare/') || pathname.startsWith('/use-cases/')) {
          priority = 0.8;
          changefreq = 'monthly';
        } else if (pathname.startsWith('/changelog') || pathname.startsWith('/support')) {
          priority = 0.7;
          changefreq = 'monthly';
        } else if (pathname.startsWith('/privacy') || pathname.startsWith('/terms')) {
          priority = 0.4;
          changefreq = 'yearly';
        }

        return {
          ...item,
          priority,
          changefreq,
          lastmod
        };
      }
    })
  ]
});
