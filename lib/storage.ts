import { libraryGames, games, type Game } from '@/data/games';

export const STORAGE_KEYS = {
  favorites: 'nitrodrive-favorites',
  recent: 'nitrodrive-recent',
  sessions: 'nitrodrive_sessions',
  xp: 'nitrodrive_xp',
  xpActions: 'nitrodrive_xp_actions',
  achievements: 'nitrodrive_achievements',
  streak: 'nitrodrive_streak',
  daily: 'nitrodrive_daily_challenge',
  dailyCompletions: 'nitrodrive_daily_completions'
} as const;

export type RecentGame = { gameId: string; lastPlayed: number };
export type GameSession = { gameId: string; startedAt: number; count: number };
export type DailyChallenge = { date: string; gameId: string; started: boolean; completed: boolean };
export type PlayerProgress = { xp: number; level: number; currentLevelXp: number; nextLevelXp: number; percent: number };
export type AchievementState = { id: string; title: string; description: string; unlocked: boolean };

const XP_LEVELS = [0, 100, 300, 600, 1000, 1500];
const ACHIEVEMENT_IDS = ['first-race', 'speed-addict', 'racing-fan', 'car-explorer', 'nitro-collector', 'daily-driver', 'game-hunter'];

function isBrowser() { return typeof window !== 'undefined'; }

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage can be unavailable in private browsing. */ }
}

function notify() {
  if (isBrowser()) window.dispatchEvent(new CustomEvent('nitrodrive:updated'));
}

export function getFavorites(): string[] {
  return readJson<string[]>(STORAGE_KEYS.favorites, []).filter(id => games.some(game => game.id === id));
}

export function toggleFavorite(gameId: string): boolean {
  const favorites = getFavorites();
  const adding = !favorites.includes(gameId);
  const next = adding ? [...favorites, gameId] : favorites.filter(id => id !== gameId);
  writeJson(STORAGE_KEYS.favorites, next);
  if (adding) awardXpOnce(`favorite:${gameId}`, 5);
  notify();
  return adding;
}

export function clearFavorites() {
  writeJson(STORAGE_KEYS.favorites, []);
  notify();
}

export function getRecentGames(): RecentGame[] {
  const stored = readJson<RecentGame[] | string[]>(STORAGE_KEYS.recent, []);
  if (stored.length && typeof stored[0] === 'string') return (stored as string[]).map((gameId, index) => ({ gameId, lastPlayed: Date.now() - index }));
  return (stored as RecentGame[]).filter(item => item && typeof item.gameId === 'string').sort((a, b) => b.lastPlayed - a.lastPlayed).slice(0, 10);
}

export function removeRecentGame(gameId: string) {
  writeJson(STORAGE_KEYS.recent, getRecentGames().filter(item => item.gameId !== gameId));
  notify();
}

export function clearRecentGames() {
  writeJson(STORAGE_KEYS.recent, []);
  notify();
}

export function getSessions(): Record<string, GameSession> {
  return readJson<Record<string, GameSession>>(STORAGE_KEYS.sessions, {});
}

export function getSessionCount(): number {
  return Object.values(getSessions()).reduce((total, session) => total + session.count, 0);
}

export function recordGameOpened(game: Game) {
  const now = Date.now();
  const recent = getRecentGames().filter(item => item.gameId !== game.id);
  writeJson(STORAGE_KEYS.recent, [{ gameId: game.id, lastPlayed: now }, ...recent].slice(0, 10));
  const sessions = getSessions();
  const existing = sessions[game.id];
  sessions[game.id] = { gameId: game.id, startedAt: now, count: (existing?.count || 0) + 1 };
  writeJson(STORAGE_KEYS.sessions, sessions);
  recordActiveDay();
  awardXpOnce(`open:${game.id}:${todayKey()}`, 5);
  awardXpOnce(`category:${game.category}`, 10);
  completeDailyChallengeIfMatch(game.id);
  updateAchievements();
  notify();
}

export function recordGamePlayed(gameId: string) {
  awardXpOnce(`play:${gameId}:${todayKey()}`, 10);
  updateAchievements();
  notify();
}

export function getDailyChallenge(): DailyChallenge {
  const date = todayKey();
  const index = Math.abs(date.split('-').join('').split('').reduce((total, digit) => total + Number(digit), 0)) % libraryGames.length;
  const saved = readJson<DailyChallenge | null>(STORAGE_KEYS.daily, null);
  if (saved?.date === date && libraryGames.some(game => game.id === saved.gameId)) return saved;
  const challenge = { date, gameId: libraryGames[index]?.id || libraryGames[0].id, started: false, completed: false };
  writeJson(STORAGE_KEYS.daily, challenge);
  return challenge;
}

export function completeDailyChallengeIfMatch(gameId: string) {
  const challenge = getDailyChallenge();
  if (challenge.gameId !== gameId || challenge.completed) return;
  const next = { ...challenge, started: true, completed: true };
  writeJson(STORAGE_KEYS.daily, next);
  const completedDates = Array.from(new Set([...readJson<string[]>(STORAGE_KEYS.dailyCompletions, []), challenge.date])).slice(-60);
  writeJson(STORAGE_KEYS.dailyCompletions, completedDates);
  awardXpOnce(`daily:${challenge.date}`, 25);
  updateAchievements();
}

export function getActiveDates(): string[] { return readJson<string[]>(STORAGE_KEYS.streak, []).filter(Boolean); }

export function recordActiveDay() {
  const dates = Array.from(new Set([...getActiveDates(), todayKey()])).sort().slice(-60);
  writeJson(STORAGE_KEYS.streak, dates);
}

export function getCurrentStreak(): number {
  const dates = new Set(getActiveDates());
  let streak = 0;
  const cursor = new Date();
  while (dates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getDailyCompletions(): number {
  return readJson<string[]>(STORAGE_KEYS.dailyCompletions, []).length;
}

export function getProgress(): PlayerProgress {
  const xp = Math.max(0, readJson<number>(STORAGE_KEYS.xp, 0));
  let level = 1;
  for (let index = 1; index < XP_LEVELS.length; index += 1) if (xp >= XP_LEVELS[index]) level = index + 1;
  const current = XP_LEVELS[level - 1];
  const next = XP_LEVELS[level] || XP_LEVELS[XP_LEVELS.length - 1];
  return { xp, level, currentLevelXp: xp - current, nextLevelXp: Math.max(1, next - current), percent: level === 5 ? 100 : Math.min(100, Math.round(((xp - current) / (next - current)) * 100)) };
}

export function awardXpOnce(actionId: string, amount: number) {
  const actions = readJson<string[]>(STORAGE_KEYS.xpActions, []);
  if (actions.includes(actionId)) return false;
  writeJson(STORAGE_KEYS.xpActions, [...actions, actionId]);
  writeJson(STORAGE_KEYS.xp, readJson<number>(STORAGE_KEYS.xp, 0) + amount);
  return true;
}

export function getAchievements(): AchievementState[] {
  const sessions = getSessions();
  const playedGames = Object.keys(sessions);
  const categories = new Set(playedGames.map(id => games.find(game => game.id === id)?.category).filter(Boolean));
  const dailyCount = getDailyCompletions();
  const unlocked = new Set(readJson<string[]>(STORAGE_KEYS.achievements, []));
  const rules: Array<[string, string, string, boolean]> = [
    ['first-race', 'FIRST RACE', 'Play your first game.', getSessionCount() >= 1],
    ['speed-addict', 'SPEED ADDICT', 'Play 5 game sessions.', getSessionCount() >= 5],
    ['racing-fan', 'RACING FAN', 'Play 10 game sessions.', getSessionCount() >= 10],
    ['car-explorer', 'CAR EXPLORER', 'Play games from 5 categories.', categories.size >= 5],
    ['nitro-collector', 'NITRO COLLECTOR', 'Favorite 5 games.', getFavorites().length >= 5],
    ['daily-driver', 'DAILY DRIVER', 'Play on 3 different active days.', dailyCount >= 3],
    ['game-hunter', 'GAME HUNTER', 'Play 15 different games.', playedGames.length >= 15]
  ];
  return rules.map(([id, title, description, earned]) => { if (earned) unlocked.add(id); return { id, title, description, unlocked: earned || unlocked.has(id) }; });
}

export function updateAchievements() {
  const unlocked = getAchievements().filter(item => item.unlocked).map(item => item.id).filter(id => ACHIEVEMENT_IDS.includes(id));
  writeJson(STORAGE_KEYS.achievements, unlocked);
}

export function getRecommendations(): { primaryCategory?: string; games: Game[] } {
  const sessions = getSessions();
  const counts = new Map<string, number>();
  Object.entries(sessions).forEach(([id, session]) => { const category = games.find(game => game.id === id)?.category; if (category) counts.set(category, (counts.get(category) || 0) + session.count); });
  const primaryCategory = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const recommendations = primaryCategory ? libraryGames.filter(game => game.category === primaryCategory || game.tags.includes(primaryCategory.toLowerCase())).filter(game => !sessions[game.id]).slice(0, 4) : libraryGames.filter(game => game.featured).slice(0, 4);
  return { primaryCategory, games: recommendations.length ? recommendations : libraryGames.filter(game => game.featured).slice(0, 4) };
}

export function todayKey() { return dateKey(new Date()); }
function dateKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
export function getGameById(id: string) { return games.find(game => game.id === id); }
