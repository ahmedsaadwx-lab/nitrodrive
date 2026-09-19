import type { Game } from '@/data/games';

export default function GameTags({ game }: { game: Game }) {
  const tags = [
    ...(game.tags.includes('3d') ? ['3D'] : []),
    ...(game.tags.includes('webgl') ? ['WebGL'] : []),
    ...(game.tags.includes('drift') ? ['Drift'] : []),
    ...(game.tags.includes('stunt') ? ['Stunt'] : []),
    ...(game.multiplayer || game.tags.includes('multiplayer') ? ['Multiplayer'] : []),
    ...(game.mobileSupported ? ['Mobile'] : []),
    ...(game.trending ? ['Trending'] : []),
    ...(game.isNew || game.newGame ? ['New'] : [])
  ];
  return <div className="game-tags" aria-label="Game tags">{Array.from(new Set(tags)).slice(0, 4).map(tag => <span className={`game-tag tag-${tag.toLowerCase()}`} key={tag}>{tag}</span>)}</div>;
}
