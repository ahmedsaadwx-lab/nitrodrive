import type { MetadataRoute } from 'next';
import { games, categories } from '@/data/games';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = 'https://nitrodrive.example';
	const publicPages = ['', '/games', '/blog', '/privacy-policy', '/terms', '/cookie-policy', '/contact'];
	return [...publicPages.map(path => ({ url: `${base}${path}` })), ...categories.map(category => ({ url: `${base}/category/${category.toLowerCase().replaceAll(' ', '-')}` })), ...games.map(game => ({ url: `${base}/games/${game.slug}` })), ...articles.map(article => ({ url: `${base}/blog/${article.slug}` }))];
}
