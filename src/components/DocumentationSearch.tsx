import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, FileText, ArrowRight } from 'lucide-react';

interface DocItem {
  title: string;
  category: string;
  slug: string;
  excerpt: string;
  tags: string[];
}

const DOCS_INDEX: DocItem[] = [
  {
    title: 'Safe Sequence Mode Guide',
    category: 'Execution Engine',
    slug: '/documentation/safe-sequence-mode',
    excerpt: 'Detailed breakdown of canvas state snapshots, polling intervals, error tile interception, and rate-limit cool-off delays.',
    tags: ['safe', 'verification', 'canvas', 'diff', 'error tile', 'snapshot']
  },
  {
    id: 'turbo',
    title: 'Turbo Interval Mode Guide',
    category: 'Execution Engine',
    slug: '/documentation/turbo-mode',
    excerpt: 'High-speed timed injection without waiting for canvas tile verification. Cadence ranges, human jitter, and best practices.',
    tags: ['turbo', 'interval', 'cadence', 'speed', 'jitter', 'batch']
  },
  {
    title: 'Complete Troubleshooting Guide',
    category: 'Support & Diagnosis',
    slug: '/documentation/troubleshooting',
    excerpt: 'Resolving tab detection lockouts, ProseMirror rich-text cursor issues, 90-second timeouts, and download interruptions.',
    tags: ['troubleshooting', 'error', 'debug', 'tab', 'lock screen', 'prosemirror']
  },
  {
    title: 'Installation & Setup Guide',
    category: 'Getting Started',
    slug: '/setup',
    excerpt: 'Step-by-step installation instructions for unpacked developer builds and published distribution channels.',
    tags: ['install', 'setup', 'unpacked', 'manifest', 'developer mode', 'chrome']
  },
  {
    title: 'Storyboard Continuity Safeguards',
    category: 'Workflow & Continuity',
    slug: '/documentation/safe-sequence-mode#continuity',
    excerpt: 'How Sequence Protector halts the prompt queue when a frame fails, preventing desynchronized story progression.',
    tags: ['storyboard', 'continuity', 'sequence', 'film', 'narrative', 'frames']
  },
  {
    title: 'CSV Import & Queue Management',
    category: 'Data Management',
    slug: '/features#csv-import',
    excerpt: 'Formatting CSV spreadsheets, batch importing hundreds of scenes, and exporting completed session archives.',
    tags: ['csv', 'import', 'export', 'queue', 'bulk', 'spreadsheet']
  },
  {
    title: 'Hardware-Level CDP Dispatch',
    category: 'Engineering Architecture',
    slug: '/how-it-works#cdp',
    excerpt: 'How Chrome DevTools Protocol dispatches authentic isTrusted: true keyboard and mouse events into Google Flow.',
    tags: ['cdp', 'devtools', 'debugger', 'istrusted', 'keyboard', 'events']
  },
  {
    title: 'Privacy Policy & Local Data Storage',
    category: 'Compliance & Legal',
    slug: '/privacy',
    excerpt: 'Verification of zero telemetry, 100% client-side chrome.storage.local persistence, and zero third-party data tracking.',
    tags: ['privacy', 'telemetry', 'storage', 'data', 'security', 'cookies']
  }
];

export default function DocumentationSearch() {
  const [query, setQuery] = useState('');

  const filteredDocs = useMemo(() => {
    if (!query.trim()) return DOCS_INDEX;
    const lower = query.toLowerCase();
    return DOCS_INDEX.filter((doc) =>
      doc.title.toLowerCase().includes(lower) ||
      doc.excerpt.toLowerCase().includes(lower) ||
      doc.category.toLowerCase().includes(lower) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lower))
    );
  }, [query]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brandText-tertiary">
          <Search className="w-5 h-5 text-aqua-liquid" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation, guides, or troubleshooting articles..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm placeholder:text-brandText-tertiary"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-brandText-tertiary hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Count & Category Filter Badge */}
      <div className="flex items-center justify-between text-xs text-brandText-secondary px-1">
        <span>Showing {filteredDocs.length} matching documentation guides</span>
        <span className="font-mono text-[11px] text-aqua-liquid">Index: v1.0.0</span>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc, idx) => (
            <a
              key={idx}
              href={doc.slug}
              className="block p-4 rounded-2xl glass-tier2 hover:border-violet-electric/50 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-aqua-liquid px-2 py-0.5 rounded-md bg-aqua-liquid/10 border border-aqua-liquid/20 inline-block">
                    {doc.category}
                  </span>
                  <h4 className="text-base font-semibold text-white group-hover:text-violet-electric transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-brandText-secondary leading-relaxed line-clamp-2">
                    {doc.excerpt}
                  </p>
                </div>
                <div className="p-2 rounded-xl glass-tier3 text-brandText-tertiary group-hover:text-white group-hover:border-violet-electric/40 shrink-0 mt-1 transition-all">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="text-center p-8 rounded-2xl glass-tier3 border border-white/10 space-y-3">
            <BookOpen className="w-8 h-8 text-brandText-tertiary mx-auto opacity-60" />
            <h4 className="text-sm font-semibold text-white">No matching documentation articles found</h4>
            <p className="text-xs text-brandText-secondary max-w-md mx-auto">
              We couldn't find any articles matching "{query}". Try searching for keywords like "Safe Mode", "CDP", "Rate Limit", or "CSV".
            </p>
            <div className="pt-2">
              <a href="/support" className="text-xs text-aqua-liquid hover:underline font-medium">
                Contact Flowmator Support ➔
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
