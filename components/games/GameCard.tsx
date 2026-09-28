import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Game } from '@/data/games';
import FavoriteButton from '@/components/ui/FavoriteButton';
import GameTags from '@/components/games/GameTags';
import CardImage from '@/components/games/CardImage';

const SIZES = '(max-width: 650px) 50vw, 280px';

export default function GameCard({ game, compact = false }: { game: Game; compact?: boolean }) {
  const href = `/games/${game.slug}`;
  const hasRealImage = Boolean(game.image);
  const hasStats = game.rating !== undefined || game.plays !== undefined;

  return (
    <article className={`card game-card game-card-visual${hasRealImage ? ' has-real-image' : ''}${compact ? ' is-compact' : ''}`}>
      <Link href={href} className="thumb-link">
        <div className="thumb">
          {game.image ? (
            <CardImage
              src={game.image}
              fallback={game.thumbnail}
              alt={`${game.title} gameplay screenshot`}
              sizes={SIZES}
            />
          ) : (
            <Image src={game.thumbnail} alt={`${game.title} game cover`} fill sizes={SIZES} />
          )}
          <div className="badges">
            {game.featured && <span className="badge orange">Featured</span>}
            {(game.isNew || game.newGame) && !game.featured && <span className="badge">New</span>}
          </div>
          <span className="thumb-play"><Play size={16} fill="currentColor" /><span>Play game</span></span>
          <div className="thumb-caption">
            <span className="thumb-kicker">{game.subcategory || game.category}</span>
            <h3 className="card-title">{game.title}</h3>
          </div>
        </div>
      </Link>

      <div className="card-body">
        <div className="card-meta">
          <span>{game.difficulty || 'Browser game'}</span>
          {hasStats && (
            <span className="card-local-meta">
              {game.rating !== undefined && <span>★ {game.rating.toFixed(1)}</span>}
              {game.plays !== undefined && <span>{game.plays.toLocaleString()} plays</span>}
            </span>
          )}
        </div>
        {!compact && <GameTags game={game} />}
        {!compact && <p className="card-description">{game.description}</p>}
        {!compact && (
          <div className="card-actions">
            <Link className="btn btn-primary" href={href}><Play size={14} fill="currentColor" /> Play game</Link>
            <FavoriteButton gameId={game.id} />
          </div>
        )}
      </div>
    </article>
  );
}
