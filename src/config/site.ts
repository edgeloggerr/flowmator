export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  url: string;
  defaultOgImage: string;
  locale: string;
  publisher: {
    name: string;
    type: string;
    url: string;
  };
  social: {
    twitter?: string;
    github?: string;
  };
  extension: {
    version: string;
    manifestVersion: number;
    platform: string;
    verifiedTargets: string[];
    storeListingUrl?: string; // Configurable placeholder for official Chrome Web Store link
  };
  contact: {
    supportPath: string;
    issueTracker?: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Flowmator',
  fullName: 'Flowmator — Bulk Flow AI Prompt Automator',
  tagline: 'Your prompts. In perfect sequence.',
  description: 'Automate bulk prompt workflows in Google Flow AI with intelligent sequencing, DOM-level result verification, automatic rate-limit cool-off delays, and storyboard continuity safeguards.',
  url: 'https://flowmator.dev', // Production canonical domain
  defaultOgImage: '/icons/icon128.png',
  locale: 'en_US',
  publisher: {
    name: 'Flowmator Studio',
    type: 'Organization',
    url: 'https://flowmator.dev'
  },
  social: {
    twitter: '@flowmator',
    github: 'https://github.com/flowmator'
  },
  extension: {
    version: '1.0.0',
    manifestVersion: 3,
    platform: 'Chromium / Chrome Extension',
    verifiedTargets: ['https://flow.google.com', 'https://labs.google/flow'],
    storeListingUrl: undefined // Set when official Web Store URL is published
  },
  contact: {
    supportPath: '/support',
    issueTracker: 'https://github.com/flowmator/issues'
  }
};

/**
 * Returns the canonical URL for a given path using the verified site origin.
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = SITE_CONFIG.url.replace(/\/+$/, '');
  return cleanPath ? `${base}/${cleanPath}` : base;
}
