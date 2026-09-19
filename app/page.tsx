import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, CarFront, Flag, Play, Sparkles } from 'lucide-react';
import { libraryGames, pokiGames } from '@/data/games';
import GameCard from '@/components/games/GameCard';
import GameRail from '@/components/home/GameRail';
import RecentlyPlayed from '@/components/home/RecentlyPlayed';
import WelcomeBanner from '@/components/home/WelcomeBanner';
import DailyChallenge from '@/components/profile/DailyChallenge';
import RecommendationRail from '@/components/profile/RecommendationRail';
import AdContainer from '@/components/ui/AdContainer';
import ArticleCard from '@/components/blog/ArticleCard';
import { articles } from '@/data/articles';

const rides = [
  { label: 'Racing', href: '/category/racing', icon: Flag, games: libraryGames.filter(game => game.tags.includes('racing')), description: 'High-speed city trials and arena runs.' },
  { label: 'Stunt Racing', href: '/category/stunt', icon: Sparkles, games: libraryGames.filter(game => game.category === 'Stunt Racing'), description: 'Flips, jumps and precision-built tracks.' },
  { label: '3D Driving', href: '/category/3d-racing', icon: CarFront, games: libraryGames.filter(game => game.tags.includes('3d')), description: 'Open maps, sports cars and free-roam driving.' }
];

export default function Home() {
  const featuredGames = pokiGames;
  const lead = featuredGames.find(game => game.id === '3d-car-simulator') || featuredGames[0];
  if (!lead) return null;
  const trendingGames = libraryGames.filter(game => game.trending);
  const racingGames = libraryGames.filter(game => game.tags.includes('racing'));
  const threeDGames = libraryGames.filter(game => game.tags.includes('3d'));
  const stuntGames = libraryGames.filter(game => game.tags.includes('stunt') || game.tags.includes('drift'));
  return (
    <>
      <section className="hero hero-phase-two">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-content">
          <div className="eyebrow">NitroDrive / Phase 02</div>
          <h1>Race into<br /><span>the action</span></h1>
          <p>Play powerful racing and stunt games directly in your browser.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#featured-games"><ArrowDown size={15} /> Play now</a>
            <a className="btn btn-secondary" href="#choose-your-ride">Explore games <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-note"><span /> Four handpicked driving experiences</div>
        </div>
        <div className="hero-car" aria-hidden="true"><div className="car-body"><div className="wheel one" /><div className="wheel two" /></div></div>
      </section>

      <main>
        <AdContainer label="Advertisement" />
        <div className="container"><WelcomeBanner /><DailyChallenge compact /></div>
        <section className="section featured-section" id="featured-games" aria-labelledby="featured-games-title">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">The current lineup</div><h2 id="featured-games-title">Featured games</h2></div>
              <span className="section-count">{featuredGames.length} playable titles</span>
            </div>
            <div className="feature-lead"><div className="feature-copy"><div className="eyebrow">{lead.category}</div><h3>{lead.title}</h3><p>{lead.description}</p><Link className="btn btn-primary" href={`/games/${lead.slug}`}><Play size={15} fill="currentColor" /> Play now</Link></div><Link href={`/games/${lead.slug}`} className="feature-art"><Image src={lead.thumbnail} alt={`${lead.title} cover`} fill sizes="(max-width: 700px) 100vw, 55vw" priority /></Link></div><div className="grid game-grid mini-rail">{featuredGames.slice(1, 5).map(game => <GameCard game={game} key={game.id} />)}</div>
          </div>
        </section>

        <GameRail title="Trending now" eyebrow="The community is driving" games={trendingGames} />
        <GameRail title="Racing" eyebrow="Find your pace" games={racingGames} href="/category/racing" />
        <GameRail title="3D driving" eyebrow="Built for immersion" games={threeDGames} href="/category/3d-racing" />
        <GameRail title="Stunt & drift" eyebrow="Take the risky line" games={stuntGames} href="/category/stunt" />

        <section className="section section-dark rides-section" id="choose-your-ride" aria-labelledby="choose-your-ride-title">
          <div className="container">
            <div className="section-head"><div><div className="eyebrow">Find your line</div><h2 id="choose-your-ride-title">Choose your ride</h2></div></div>
            <div className="ride-grid">{rides.map(({ label, href, icon: Icon, games, description }) => <Link className="ride-card" href={href} key={label}><span className="ride-icon"><Icon size={21} /></span><span><strong>{label}</strong><small>{description}</small><em>{games.length} {games.length === 1 ? 'game' : 'games'} <ArrowUpRight size={13} /></em></span></Link>)}</div>
          </div>
        </section>

        <RecentlyPlayed />
        <div className="container"><RecommendationRail /></div>
        <section className="section useful-content"><div className="container"><div className="section-head"><div><div className="eyebrow">Drive smarter</div><h2>Useful content</h2></div><Link className="btn btn-ghost" href="/blog">View all <ArrowUpRight size={15} /></Link></div><div className="article-grid">{articles.slice(0, 2).map(article => <ArticleCard article={article} key={article.slug} />)}</div></div></section>
        <AdContainer label="Advertisement" />
      </main>
    </>
  );
}
