import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { games, categories } from '@/data/games';
import GameCard from '@/components/games/GameCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContentAd from '@/components/ads/ContentAd';

const tagMap: Record<string, string[]> = { '3d-racing': ['3d'], 'street-racing': ['street racing', 'racing'], 'off-road': ['off-road'], 'car-simulator': ['simulator', 'driving'], rally: ['rally'], parking: ['parking'], 'police-chase': ['police'], 'monster-truck': ['monster trucks', 'monster truck'], drift: ['drift'], 'neon-racing': ['neon'], 'arcade-racing': ['arcade'], 'circuit-racing': ['circuit'], 'retro-racing': ['retro', 'pixel'], 'highway-racing': ['highway'], 'classic-racing': ['classic'] };
const slugFor = (category: string) => category.toLowerCase().replaceAll(' ', '-');

export function generateStaticParams() { return categories.map(category => ({ slug: slugFor(category) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const category = categories.find(item => slugFor(item) === slug); if (!category) return {}; return { title: `${category} Games`, description: `Play NitroDrive ${category.toLowerCase()} games in your browser.`, alternates: { canonical: `/category/${slug}` } }; }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(item => slugFor(item) === slug);
  if (!category) notFound();
  const list = games.filter(game => game.category === category || (tagMap[slug] || [slug]).some(tag => game.tags.includes(tag)));
  return <div className="container category-page"><Breadcrumbs items={[{ label: 'Games', href: '/games' }, { label: category }]} /><div className="page-head"><div className="eyebrow">Category / {category}</div><h1>{category} games</h1><p className="muted">{list.length} {list.length === 1 ? 'game' : 'games'} in the {category.toLowerCase()} garage.</p></div><ContentAd />{list.length ? <div className="grid game-grid" style={{ paddingBottom: 80 }}>{list.map(game => <GameCard game={game} key={game.id} />)}</div> : <div className="empty-state catalog-empty"><h2>No games found</h2><p>Explore the full NitroDrive library for another route.</p><Link className="btn btn-primary" href="/games">Browse all games</Link></div>}</div>;
}
