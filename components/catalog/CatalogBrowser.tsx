'use client';

import { Search, SlidersHorizontal, Grid2X2, List } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import GameCard from '@/components/games/GameCard';
import { games } from '@/data/games';
import { filterGames, type GameSort } from '@/lib/game-query';

export default function CatalogBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sort, setSort] = useState<GameSort>('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [initialized, setInitialized] = useState(false);
  const categories = Array.from(new Set(games.map(game => game.category))).sort();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    setCategory(params.get('category') || 'all');
    setSort((params.get('sort') as GameSort) || 'featured');
    setDifficulty(params.get('difficulty') || 'all');
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('category', category.toLowerCase().replaceAll(' ', '-'));
    if (difficulty !== 'all') params.set('difficulty', difficulty);
    if (sort !== 'featured') params.set('sort', sort);
    window.history.replaceState(null, '', params.toString() ? `/games?${params.toString()}` : '/games');
  }, [category, difficulty, initialized, query, sort]);

  const filtered = useMemo(() => filterGames(games, query, category === 'all' ? 'all' : category.replaceAll('-', ' '), difficulty, sort), [category, difficulty, query, sort]);
  const reset = () => { setQuery(''); setCategory('all'); setDifficulty('all'); setSort('featured'); };

  return <section aria-label="Game catalog"><div className="catalog-controls"><label className="catalog-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, category, tag or developer" aria-label="Search games" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}</label><label className="catalog-select"><SlidersHorizontal size={15} /><span className="sr-only">Category</span><select value={category} onChange={event => setCategory(event.target.value)}><option value="all">All cars</option>{categories.map(item => <option value={item} key={item}>{item}</option>)}</select></label><label className="catalog-select"><span className="sr-only">Difficulty</span><select value={difficulty} onChange={event => setDifficulty(event.target.value)}><option value="all">All difficulty</option><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></label><label className="catalog-select"><span className="sr-only">Sort games</span><select value={sort} onChange={event => setSort(event.target.value as GameSort)}><option value="featured">Featured first</option><option value="most-played">Most played</option><option value="highest-rated">Highest rated</option><option value="newest">Newest</option><option value="az">A-Z</option><option value="za">Z-A</option></select></label><div className="view-toggle" aria-label="Catalog view"><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Grid2X2 size={16} /></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><List size={17} /></button></div></div><div className="catalog-summary"><span>{filtered.length} {filtered.length === 1 ? 'game' : 'games'} found</span>{(query || category !== 'all' || difficulty !== 'all' || sort !== 'featured') && <button className="btn btn-ghost" onClick={reset}>Clear filters</button>}</div>{filtered.length ? <div className={`grid game-grid catalog-grid ${view === 'list' ? 'list-view' : ''}`}>{filtered.map(game => <GameCard game={game} key={game.id} />)}</div> : <div className="empty-state catalog-empty"><h2>No games found</h2><p>Try another search such as racing, drift, stunt or 3D.</p><button className="btn btn-primary" onClick={reset}>Browse all games</button></div>}</section>;
}
