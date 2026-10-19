import { SITE_CONFIG, getCanonicalUrl } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export { SITE_CONFIG, getCanonicalUrl };

export function generateSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': SITE_CONFIG.name,
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Chrome, Chromium-based browsers',
    'browserRequirements': 'Requires Google Chrome 116+ (Manifest V3 Side Panel & Debugger API)',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    },
    'description': SITE_CONFIG.description,
    'softwareVersion': SITE_CONFIG.extension.version,
    'url': SITE_CONFIG.url,
    'author': {
      '@type': 'Organization',
      'name': SITE_CONFIG.publisher.name,
      'url': SITE_CONFIG.publisher.url
    }
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_CONFIG.fullName,
    'url': SITE_CONFIG.url,
    'description': SITE_CONFIG.description,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.publisher.name,
      'url': SITE_CONFIG.publisher.url
    }
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
  category?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': article.title,
    'description': article.description,
    'url': article.url,
    'datePublished': article.publishedDate,
    'dateModified': article.modifiedDate || article.publishedDate,
    'image': article.image ? (article.image.startsWith('http') ? article.image : `${SITE_CONFIG.url}${article.image}`) : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
    'inLanguage': 'en-US',
    'articleSection': article.category || 'Guides',
    'keywords': article.keywords?.join(', '),
    'author': {
      '@type': 'Person',
      'name': article.author || 'Flowmator Editorial Team'
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.publisher.name,
      'url': SITE_CONFIG.publisher.url,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_CONFIG.url}/icons/icon128.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url)
    }))
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}
