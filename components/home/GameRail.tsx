import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Game } from '@/data/games';
import GameCard from '@/components/games/GameCard';

export default function GameRail({ title, eyebrow, games, href = '/games' }: { title: string; eyebrow: string; games: Game[]; href?: string }) {
  if (!games.length) return null;
  return <section className="section game-rail"><div className="container"><div className="section-head"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div><Link className="btn btn-ghost" href={href}>View all <ArrowUpRight size={15} /></Link></div><div className="grid game-grid">{games.slice(0, 4).map(game => <GameCard game={game} key={game.id} />)}</div></div></section>;
}
