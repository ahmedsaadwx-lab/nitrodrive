'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/games/GameCard';
import { clearFavorites, getFavorites } from '@/lib/storage';

export default function FavoritesPage() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { const sync = () => setIds(getFavorites()); sync(); window.addEventListener('nitrodrive:updated', sync); window.addEventListener('storage', sync); return () => { window.removeEventListener('nitrodrive:updated', sync); window.removeEventListener('storage', sync); }; }, []);
  const list = games.filter(game => ids.includes(game.id));
  return <div className="container"><div className="page-head"><div className="eyebrow">Your garage</div><h1>Favorites</h1><p className="muted">Your saved games, ready when you are.</p></div>{list.length ? <><div className="section-head favorites-toolbar"><span className="muted">{list.length} saved {list.length === 1 ? 'game' : 'games'}</span><button className="btn btn-ghost" onClick={clearFavorites}>Clear favorites</button></div><div className="grid game-grid" style={{ paddingBottom: 80 }}>{list.map(game => <GameCard game={game} key={game.id} />)}</div></> : <div className="empty-state favorites-empty"><h2>No favorite games yet.</h2><p className="muted">Tap the heart icon on a game to save it.</p><Link className="btn btn-primary" href="/games">Explore games</Link></div>}</div>;
}
