'use client';

import Image from 'next/image';
import Link from 'next/link';
import { History, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGameById, getRecentGames, removeRecentGame, clearRecentGames, type RecentGame } from '@/lib/storage';

export default function RecentlyPlayed() {
  const [recent, setRecent] = useState<RecentGame[]>([]);
  useEffect(() => { const sync = () => setRecent(getRecentGames()); sync(); window.addEventListener('nitrodrive:updated', sync); window.addEventListener('storage', sync); return () => { window.removeEventListener('nitrodrive:updated', sync); window.removeEventListener('storage', sync); }; }, []);
  const recentGames = recent.map(item => ({ ...item, game: getGameById(item.gameId) })).filter(item => item.game);
  return <section className="section recent-section" aria-labelledby="recently-played-title"><div className="container"><div className="section-head"><div><div className="eyebrow"><History size={14} /> Continue playing</div><h2 id="recently-played-title">Recently played</h2></div>{recentGames.length > 0 && <button className="btn btn-ghost" onClick={clearRecentGames}><Trash2 size={14} /> Clear history</button>}</div>{recentGames.length ? <div className="recent-list">{recentGames.map(item => item.game && <article className="recent-item" key={item.gameId}><Image src={item.game.thumbnail} alt={`${item.game.title} thumbnail`} width={120} height={68} /><div><strong>{item.game.title}</strong><small>{item.game.category}</small></div><Link className="btn btn-primary" href={`/games/${item.game.slug}`}>Continue</Link><button className="icon-btn" onClick={() => removeRecentGame(item.gameId)} aria-label={`Remove ${item.game.title} from recently played`}><Trash2 size={15} /></button></article>)}</div> : <div className="empty-state">Your recently played games will appear here.</div>}</div></section>;
}
