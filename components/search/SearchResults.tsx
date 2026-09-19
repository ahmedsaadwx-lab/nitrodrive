'use client';

import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import GameCard from '@/components/games/GameCard';
import { games } from '@/data/games';
import { searchGames } from '@/lib/game-query';

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [initialized, setInitialized] = useState(false);
  useEffect(() => { setQuery(new URLSearchParams(window.location.search).get('q') || ''); setInitialized(true); }, []);
  useEffect(() => { if (initialized) window.history.replaceState(null, '', query ? `/search?q=${encodeURIComponent(query)}` : '/search'); }, [initialized, query]);
  const results = useMemo(() => searchGames(games, query), [query]);
  return <section className="search-page-tool"><label className="catalog-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search racing, drift, 3D, developer..." aria-label="Search games" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}</label><div className="catalog-summary"><span>{query ? `${results.length} ${results.length === 1 ? 'game' : 'games'} found` : 'Search the full NitroDrive library'}</span></div>{results.length ? <div className="grid game-grid">{results.map(game => <GameCard game={game} key={game.id} />)}</div> : <div className="empty-state catalog-empty"><h2>No games found</h2><p>Try another search such as racing, drift, stunt or 3D.</p><Link className="btn btn-primary" href="/games">Browse all games</Link></div>}</section>;
}
