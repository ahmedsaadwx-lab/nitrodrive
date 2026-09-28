import type { MetadataRoute } from 'next';
import { games, categories } from '@/data/games';
import { articles } from '@/data/articles';
import { absoluteUrl } from '@/lib/seo';

const slugify = (value: string) => value.toLowerCase().replaceAll(' ', '-');
const publicPages = ['/', '/games', '/blog', '/privacy-policy', '/terms', '/cookie-policy', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  // Games marked unavailable are noindexed on their page, so they are kept out of the sitemap too.
  const indexableGames = games.filter(game => game.status !== 'unavailable');
  // Only list category pages that actually have games (avoids empty/thin pages in the sitemap).
  const activeCategories = categories.filter(category =>
    indexableGames.some(game => game.category === category || game.tags.includes(category.toLowerCase()))
  );

  const paths = [
    ...publicPages,
    ...activeCategories.map(category => `/category/${slugify(category)}`),
    ...indexableGames.map(game => `/games/${game.slug}`),
    ...articles.map(article => `/blog/${article.slug}`)
  ];

  // De-duplicate so no URL is ever listed twice.
  return Array.from(new Set(paths.map(path => absoluteUrl(path)))).map(url => ({ url }));
}
