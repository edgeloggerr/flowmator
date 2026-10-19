import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.resolve('./src/content/blog');
const VALID_CATEGORIES = [
  'Google Flow AI',
  'Prompt Automation',
  'AI Storyboarding',
  'Creator Productivity',
  'Technical Guides'
];

console.log('\x1b[36m%s\x1b[0m', '🔍 Starting Flowmator Content & SEO Validation...\n');

if (!fs.existsSync(BLOG_DIR)) {
  console.error('\x1b[31m%s\x1b[0m', `❌ Error: Blog directory not found at ${BLOG_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

if (files.length === 0) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: No articles found in src/content/blog/');
  process.exit(1);
}

let errors = 0;
let warnings = 0;
const seenSlugs = new Set();
const seenTitles = new Set();

files.forEach((file) => {
  const filePath = path.join(BLOG_DIR, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace(/\.mdx?$/, '');

  // Extract frontmatter
  const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Missing frontmatter block`);
    errors++;
    return;
  }

  const fmLines = fmMatch[1].split(/\r?\n/);
  const data = {};
  fmLines.forEach((line) => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  });

  // 1. Slug check
  if (seenSlugs.has(slug)) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Duplicate slug: "${slug}"`);
    errors++;
  }
  seenSlugs.add(slug);

  // 2. Title check
  if (!data.title || data.title.length < 10) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Missing or too short title (min 10 chars)`);
    errors++;
  } else if (seenTitles.has(data.title.toLowerCase())) {
    console.warn('\x1b[33m%s\x1b[0m', `[${file}] ⚠️ Warning: Suspicious duplicate title: "${data.title}"`);
    warnings++;
  }
  if (data.title) seenTitles.add(data.title.toLowerCase());

  // 3. Description check for SEO
  if (!data.description || data.description.length < 30) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Description missing or too short for SEO (min 30 chars)`);
    errors++;
  }

  // 4. Excerpt check
  if (!data.excerpt || data.excerpt.length < 20) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Excerpt missing or too short (min 20 chars)`);
    errors++;
  }

  // 5. Date format check (YYYY-MM-DD)
  if (!data.publishedDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedDate)) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Invalid publishedDate format (must be YYYY-MM-DD): "${data.publishedDate}"`);
    errors++;
  }

  // 6. Category check
  if (!data.category || !VALID_CATEGORIES.includes(data.category)) {
    console.error('\x1b[31m%s\x1b[0m', `[${file}] ❌ Invalid category "${data.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
    errors++;
  }

  // 7. Internal links check
  const internalLinkRegex = /\]\((\/[^)]+)\)/g;
  let linkMatch;
  while ((linkMatch = internalLinkRegex.exec(rawContent)) !== null) {
    const link = linkMatch[1].split('#')[0]; // strip anchor
    // basic sanity check
    if (link.startsWith('/blog/') && !link.includes('/category/')) {
      const targetSlug = link.replace('/blog/', '').replace(/\/$/, '');
      if (!files.some((f) => f.replace(/\.mdx?$/, '') === targetSlug)) {
        console.warn('\x1b[33m%s\x1b[0m', `[${file}] ⚠️ Broken or pending internal blog link: "${link}"`);
        warnings++;
      }
    }
  }

  console.log('\x1b[32m%s\x1b[0m', `✔ [${file}] Validated (${data.category})`);
});

console.log('\n============================================================');
console.log(`Articles Verified: ${files.length}`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);
console.log('============================================================\n');

if (errors > 0) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Content validation failed with errors. Fix before production build.');
  process.exit(1);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ All blog articles and frontmatter schemas passed validation!');
  process.exit(0);
}
