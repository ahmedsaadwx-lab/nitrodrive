import type { Game } from '@/data/games';

export type GameSort = 'most-played' | 'highest-rated' | 'newest' | 'az' | 'za' | 'featured';

export function searchGames(games: Game[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return games;
  return games.filter(game => `${game.title} ${game.category} ${game.tags.join(' ')} ${game.description} ${game.developer || ''} ${game.gameType} ${game.platform || ''}`.toLowerCase().includes(normalized));
}

export function sortGames(games: Game[], sort: GameSort) {
  return [...games].sort((a, b) => {
    if (sort === 'most-played') return (b.plays || 0) - (a.plays || 0) || Number(Boolean(b.trending)) - Number(Boolean(a.trending));
    if (sort === 'highest-rated') return (b.rating || 0) - (a.rating || 0) || a.title.localeCompare(b.title);
    if (sort === 'newest') return Number(Boolean(b.isNew || b.newGame)) - Number(Boolean(a.isNew || a.newGame)) || (b.releaseYear || 0) - (a.releaseYear || 0);
    if (sort === 'za') return b.title.localeCompare(a.title);
    if (sort === 'az') return a.title.localeCompare(b.title);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || Number(Boolean(b.trending)) - Number(Boolean(a.trending));
  });
}

export function filterGames(games: Game[], query: string, category: string, difficulty: string, sort: GameSort) {
  const normalizedCategory = category.toLowerCase();
  const categoryFiltered = category === 'all' ? games : games.filter(game => game.category.toLowerCase() === normalizedCategory || game.tags.includes(normalizedCategory) || (normalizedCategory === '3d racing' && game.tags.includes('3d')));
  const difficultyFiltered = difficulty === 'all' ? categoryFiltered : categoryFiltered.filter(game => game.difficulty === difficulty);
  return sortGames(searchGames(difficultyFiltered, query), sort);
}