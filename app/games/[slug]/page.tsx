import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { games, getGame, categories, getRelatedGames } from '@/data/games';
import GameCard from '@/components/games/GameCard';
import GamePlayer from '@/components/games/GamePlayer';
import FavoriteButton from '@/components/ui/FavoriteButton';
import ShareButton from '@/components/ui/ShareButton';
import RecommendationRail from '@/components/profile/RecommendationRail';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import GameBottomAd from '@/components/ads/GameBottomAd';

export function generateStaticParams() {
  return games.map(game => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  return {
    title: `${game.title} - Play Racing Game | NitroDrive`,
    description: game.description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: { title: `${game.title} | NitroDrive`, description: game.description, images: [game.thumbnail], type: 'website' },
    twitter: { card: 'summary_large_image', title: `${game.title} | NitroDrive`, description: game.description, images: [game.thumbnail] }
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  const related = getRelatedGames(game);
  const isExternal = game.gameType === 'external';
  const sourceName = game.developer || (isExternal ? 'External project' : 'NitroDrive');
  const categoryHref = categories.includes(game.category) ? `/category/${game.category.toLowerCase().replaceAll(' ', '-')}` : '/category/racing';
  const jsonLd = { '@context': 'https://schema.org', '@type': 'VideoGame', name: game.title, description: game.description, genre: game.category, image: game.thumbnail, url: `https://nitrodrive.example/games/${game.slug}` };

  return (
    <div className="container game-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Games', href: '/games' }, { label: game.category, href: categoryHref }, { label: game.title }]} />
      <div className="game-page-heading"><div><Link className="eyebrow game-category-link" href={categoryHref}>{game.category}</Link><h1>{game.title}</h1></div><div className="game-page-actions"><FavoriteButton gameId={game.id} /><ShareButton title={game.title} /></div></div>
      <div className="player-layout">
        <div>
          <GamePlayer game={game} />
          <div className="game-action-bar" aria-label="Game actions"><FavoriteButton gameId={game.id} /><ShareButton title={game.title} /><span className="muted">Actions are saved locally on this device.</span></div>
          <div className="game-back-link"><Link href="/games"><ArrowLeft size={15} /> Back to games</Link></div>
          <GameBottomAd />
          <section className="detail-section"><div className="eyebrow">Overview</div><h2>About the game</h2><p>{game.description}</p></section>
          <section className="detail-section"><div className="eyebrow">Gameplay</div><h2>How to play</h2>{isExternal ? <p>Use the controls and gameplay instructions shown on the original Poki game page.</p> : <ul>{game.controls.map(control => <li key={control}>{control}</li>)}</ul>}</section>
          {!isExternal && <section className="detail-section"><div className="eyebrow">What to expect</div><h2>Game features</h2><ul>{game.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}
          <section className="detail-section source-section"><div className="eyebrow">Attribution</div><h2>Source / License</h2>{isExternal ? <p>This game is provided by {sourceName} and opens on its original website.</p> : <p>Open-source project, hosted locally by NitroDrive under the {game.license} license.</p>}<p><a href={game.sourceRepository} target="_blank" rel="noopener noreferrer">{isExternal && sourceName === 'Poki' ? 'Open on Poki' : 'Original project'}</a></p></section>
        </div>
        <aside className="card info-panel"><div className="eyebrow">Game information</div><h2>{game.title}</h2><div className="stat-grid"><span>Category<strong>{game.category}</strong></span><span>Platform<strong>{game.mobileSupported ? 'Desktop + mobile' : 'Desktop'}</strong></span><span>Technology<strong>{game.technology || 'External game'}</strong></span><span>Source<strong>{sourceName}</strong></span><span>License<strong>{game.license}</strong></span></div><div className="info-tags">{game.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div><p className="muted">{isExternal ? 'This game opens on the original website.' : 'This game is hosted locally by NitroDrive.'}</p></aside>
      </div>
      {related.length > 0 && <section className="section related-section"><div className="section-head"><div><div className="eyebrow">Keep driving</div><h2>Related games</h2></div></div><div className="grid game-grid">{related.map(relatedGame => <GameCard game={relatedGame} key={relatedGame.id} />)}</div></section>}
      <RecommendationRail />
    </div>
  );
}
