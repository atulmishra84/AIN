import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = [
    '', 'about', 'platform', 'integrations', 'solutions', 'pricing',
    'security-compliance', 'resources', 'contact', 'demo', 'trust', 'status',
    'careers', 'blog', 'legal/privacy', 'legal/terms', 'legal/dpa', 'accessibility', 'cookies'
  ];

  const now = new Date().toISOString();
  return pages.map((p) => ({
    url: `${base}/${p}`.replace(/\/$/, '').replace(/\/$/, ''),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.6,
  }));
}
