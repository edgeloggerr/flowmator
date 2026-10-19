import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);

  let content = `# FLOWMATOR FULL ARCHITECTURE & KNOWLEDGE COMPILATION
Version: ${SITE_CONFIG.extension.version}
Canonical Domain: ${baseUrl}
Product Name: ${SITE_CONFIG.fullName}

============================================================
SECTION 1: PRODUCT IDENTITY & CAPABILITIES
============================================================
${SITE_CONFIG.description}

Key Mechanics:
1. Safe Sequence Mode: Takes pre-dispatch DOM canvas snapshots (indexing img[data-media-id] and <flow-error-tile>), polls for up to 90 seconds, and verifies image tiles > 150x150px before advancing.
2. Turbo Interval Mode: Dispatches prompts at randomized interval ranges (25s to 45s) with 100ms-500ms keystroke jitter for high-throughput batching.
3. Hardware Event Emulation: Attaches via chrome.debugger (CDP v1.3) to dispatch authentic isTrusted: true keyboard and click events into Google Flow's ProseMirror editor.
4. Rate-Limit Cool-off Engine: Automatically pauses for 12 seconds when cloud throttles trigger, clearing quota allocations before retrying.
5. Sequence Protector: Halts the queue and sounds a Web Audio API synthesized sine-wave chime if retries are exhausted, preventing gaps in storyboards.
6. 100% Client-Side Privacy: Persists queues and settings in chrome.storage.local with zero external telemetry.

============================================================
SECTION 2: CORE DOCUMENTATION ABSTRACTS
============================================================

Title: Safe Sequence Mode
URL: ${baseUrl}/documentation/safe-sequence-mode
Summary: The verified automation workflow designed specifically to prevent gaps and broken continuity in multi-shot storyboard sequences. Uses active DOM diffing and halts on error tiles.

Title: Turbo Interval Mode
URL: ${baseUrl}/documentation/turbo-mode
Summary: High-throughput timed prompt injection designed for rapid bulk experimentation. Injects prompts at randomized intervals with keystroke jitter.

Title: Troubleshooting Guide
URL: ${baseUrl}/documentation/troubleshooting
Summary: Resolves tab detection lockouts, ProseMirror rich-text cursor issues, 90-second timeouts, and download interruptions.

============================================================
SECTION 3: EDITORIAL ARTICLES & GUIDES
============================================================
`;

  for (const post of blogPosts) {
    content += `
---
Title: ${post.data.title}
Category: ${post.data.category}
URL: ${baseUrl}/blog/${post.id.replace(/\.mdx?$/, '')}
Published: ${post.data.publishedDate}
Excerpt: ${post.data.excerpt}
Tags: ${post.data.tags.join(', ')}
---
`;
  }

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
