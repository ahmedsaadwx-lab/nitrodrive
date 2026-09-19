'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CarFront, Play } from 'lucide-react';
import type { Game } from '@/data/games';
import FavoriteButton from '@/components/ui/FavoriteButton';
import GameTags from '@/components/games/GameTags';

export default function GameCard({ game, compact = false }: { game: Game; compact?: boolean }) { return <article className="card game-card"><Link href={`/games/${game.slug}`}><div className="thumb"><Image src={game.thumbnail} alt={`${game.title} game cover`} fill sizes="(max-width: 650px) 50vw, (max-width: 1180px) 25vw, 240px" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.closest('.thumb')?.classList.add('has-error'); }} /><div className="thumb-fallback"><CarFront size={34} /><strong>{game.title}</strong><span>NitroDrive game</span></div><div className="badges">{game.featured && <span className="badge orange">Featured</span>}</div><span className="thumb-play"><Play size={16} fill="currentColor"/><span>Play game</span></span></div></Link><div className="card-body"><Link href={`/games/${game.slug}`}><h3 className="card-title">{game.title}</h3></Link><div className="card-meta"><span>{game.subcategory || game.category}</span><span>{game.difficulty || 'Browser game'}</span></div><GameTags game={game} />{(game.rating !== undefined || game.plays !== undefined) && <div className="card-local-meta">{game.rating !== undefined && <span>★ {game.rating.toFixed(1)}</span>}{game.plays !== undefined && <span>{game.plays.toLocaleString()} plays</span>}</div>}{!compact && <p className="card-description">{game.description}</p>}{!compact && <div className="card-actions"><Link className="btn btn-primary" href={`/games/${game.slug}`}><Play size={14} fill="currentColor"/> Play game</Link><FavoriteButton gameId={game.id}/></div>}</div></article>; }
