import React, { useState, useMemo } from 'react';
import { Search, Clock, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface ArticleItem {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedDate: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

interface Props {
  articles: ArticleItem[];
  categories: string[];
}

export default function BlogSearchIsland({ articles, categories }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query.trim()) return true;
      const lower = query.toLowerCase();
      return (
        article.title.toLowerCase().includes(lower) ||
        article.description.toLowerCase().includes(lower) ||
        article.excerpt.toLowerCase().includes(lower) ||
        article.tags.some((t) => t.toLowerCase().includes(lower))
      );
    });
  }, [articles, query, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search Input & Category Filters */}
      <div className="space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brandText-tertiary">
            <Search className="w-5 h-5 text-aqua-liquid" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides by keyword, topic, or technique..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm placeholder:text-brandText-tertiary shadow-lg"
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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['All', ...categories].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'glass-btn-primary shadow-lg scale-105'
                    : 'glass-tier3 text-brandText-secondary hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-brandText-secondary px-1 border-b border-white/5 pb-3">
        <span>Showing {filteredArticles.length} publication{filteredArticles.length === 1 ? '' : 's'}</span>
        <span className="font-mono text-[11px] text-aqua-liquid">Category: {selectedCategory}</span>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <a
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="glass-tier2 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-violet-electric/50 transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-aqua-liquid px-2 py-0.5 rounded-md bg-aqua-liquid/10 border border-aqua-liquid/20">
                    {article.category}
                  </span>
                  <span className="text-brandText-tertiary flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readingTime} min
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-violet-electric transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-brandText-secondary leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-brandText-tertiary">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {article.publishedDate}
                </span>
                <span className="text-aqua-liquid font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 rounded-3xl glass-tier3 border border-white/10 space-y-3">
          <BookOpen className="w-10 h-10 text-brandText-tertiary mx-auto opacity-50" />
          <h4 className="text-base font-semibold text-white">No articles matched your criteria</h4>
          <p className="text-xs text-brandText-secondary max-w-md mx-auto">
            Try adjusting your search terms or clearing the category filter to view all publication guides.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-full glass-btn-secondary text-xs mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
