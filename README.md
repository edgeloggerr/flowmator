# Flowmator — Product Portfolio & AI Search Optimization Engine

A production-grade, Liquid Glass portfolio, documentation suite, and programmatic SEO publishing system for **Flowmator — Bulk Flow AI Prompt Automator**.

Built with **Astro**, **React**, **TypeScript**, **Tailwind CSS v3**, and **MDX Content Collections**.

---

## 1. Architecture & Capabilities

- **Liquid Glass Design System:** 3-tier material physics (Atmospheric Glass, Interface Glass, Tactile Glass) with soft light & dark slate neumorphism, luminous edge highlights, and zero-dependency Web Audio chimes.
- **Interactive Islands:**
  - `HeroProductPreview.tsx`: Live simulated Google Flow extension control surface with countdowns, state switching, and audio chime.
  - `ModeComparisonIsland.tsx`: Interactive dual-mode switcher (Safe Sequence vs Turbo Interval).
  - `ArchitectureDiagramIsland.tsx`: 6-stage technical pipeline with code inspection.
  - `TroubleshootingAssistant.tsx`: Interactive decision tree diagnosing Google Flow canvas and tab hurdles.
  - `DocumentationSearch.tsx`: Instant client-side search across documentation guides.
  - `BlogSearchIsland.tsx`: Live search and category filtering across the MDX article library.
  - `SupportForm.tsx`: Validated diagnostic report generator with honest frontend status.
  - `StoryboardCarousel.tsx`: Interactive 4-shot storyboard viewer with prompt chain copier.
- **Programmatic SEO (pSEO), AEO & GEO:**
  - Automated XML sitemap generation (`/sitemap.xml`) indexing all static pages, categories, and published articles.
  - LLM discovery endpoints (`/llms.txt` and `/llms-full.txt`) adhering to modern AI citation standards.
  - Rich JSON-LD schemas: `SoftwareApplication`, `TechArticle`, `BreadcrumbList`, `WebSite`, `FAQPage`.
  - Answer-first editorial structure with direct answer summaries on all guides.
  - Dedicated comparison and use-case landing pages (`/compare/flowmator-vs-manual-google-flow`, `/use-cases/storyboarding`).

---

## 2. Directory Structure

```text
flowmator-web/
├── public/
│   └── icons/                 # Authentic Flowmator extension icons
├── src/
│   ├── components/            # Astro & React Liquid Glass interactive islands
│   ├── config/
│   │   └── site.ts            # Centralized SEO & site configuration single source of truth
│   ├── content/
│   │   └── blog/              # 10 MDX articles across 5 topic clusters
│   ├── content.config.ts      # Zod schema validation for blog frontmatter
│   ├── layouts/
│   │   └── Layout.astro       # Master HTML layout with JSON-LD, metadata, navigation & footer
│   ├── pages/
│   │   ├── blog/              # /blog, /blog/[...slug], /blog/category/[category]
│   │   ├── compare/           # pSEO comparison landing pages
│   │   ├── documentation/     # /documentation, safe-sequence-mode, turbo-mode, troubleshooting
│   │   ├── use-cases/         # /use-cases/storyboarding
│   │   ├── changelog.astro    # /changelog
│   │   ├── features.astro     # /features
│   │   ├── how-it-works.astro # /how-it-works
│   │   ├── index.astro        # / (Home page)
│   │   ├── privacy.astro      # /privacy
│   │   ├── setup.astro        # /setup
│   │   ├── support.astro      # /support
│   │   ├── terms.astro        # /terms
│   │   ├── llms.txt.ts        # Dynamic /llms.txt endpoint
│   │   ├── llms-full.txt.ts   # Dynamic /llms-full.txt endpoint
│   │   ├── robots.txt.ts      # Dynamic /robots.txt endpoint
│   │   └── sitemap.xml.ts     # Dynamic /sitemap.xml generator
│   ├── styles/
│   │   └── global.css         # Liquid Glass CSS material tiers and tokens
│   └── utils/
│       └── seo.ts             # SEO schemas & JSON-LD generators
└── scripts/
    └── validate-content.mjs   # Pre-build validation script for frontmatter & links
```

---

## 3. How to Add a New Blog Article

To add a new article to the Flowmator Journal:

1. Create a new `.mdx` or `.md` file inside `src/content/blog/` (e.g. `src/content/blog/my-new-workflow-guide.mdx`).
2. Add the required frontmatter block:

```yaml
---
title: "Your Descriptive Title (Min 10 Characters)"
description: "A comprehensive SEO description summarizing the topic (Min 30 Characters)."
excerpt: "A direct-answer paragraph providing immediate value for AEO/GEO retrieval."
publishedDate: "2026-10-19" # Must be YYYY-MM-DD
author: "Flowmator Editorial Team"
category: "Google Flow AI" # Must match one of the 5 approved categories
tags:
  - Google Flow AI
  - Storyboarding
readingTime: 6
featured: false
relatedSlugs:
  - google-flow-ai-prompt-automation-guide
---
```

3. Write the article in standard Markdown or MDX. Use an answer-first direct answer paragraph immediately after your H2 question heading.
4. Run validation before building:
   ```bash
   npm run content:validate
   ```
5. Run the production build to compile static HTML, update the sitemap, and regenerate `llms.txt`:
   ```bash
   npm run build
   ```

---

## 4. Development & Build Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches local Astro development server on `http://localhost:4321/` |
| `npm run content:validate` | Validates frontmatter, dates, categories, slugs, and internal links |
| `npm run seo:check` | Alias for content and SEO validation |
| `npm run build` | Compiles the full static site (30+ pages) to the `/dist` directory |
| `npm run preview` | Starts a production preview server from `/dist` |

---

## 5. Pre-Deployment Configuration Checklist

Before launching on a public production domain:

1. **Set Canonical Domain in `src/config/site.ts`:**
   Change `url: 'https://flowmator.dev'` to your verified custom domain.
2. **Set Official Chrome Web Store URL (when published):**
   Update `extension.storeListingUrl` in `src/config/site.ts`.
3. **Legal Entity Review:**
   Review the operator notices on `/privacy` and `/terms` to insert your registered company entity, address, and legal jurisdiction.
4. **Deploy Static Assets:**
   Deploy the generated `dist/` directory directly to Cloudflare Pages, Vercel, Netlify, AWS S3/CloudFront, or GitHub Pages. Zero backend servers required.
