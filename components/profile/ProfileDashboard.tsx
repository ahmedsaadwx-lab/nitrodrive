'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock3, Flame, Lock, Trash2, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import GameCard from '@/components/games/GameCard';
import DailyChallenge from '@/components/profile/DailyChallenge';
import RecommendationRail from '@/components/profile/RecommendationRail';
import { games } from '@/data/games';
import { clearRecentGames, getAchievements, getFavorites, getCurrentStreak, getGameById, getProgress, getRecentGames, getSessionCount, removeRecentGame, type AchievementState, type PlayerProgress, type RecentGame } from '@/lib/storage';

export default function ProfileDashboard() {
  const [version, setVersion] = useState(0);
  const [progress, setProgress] = useState<PlayerProgress>(() => getProgress());
  const [achievements, setAchievements] = useState<AchievementState[]>(() => getAchievements());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [recent, setRecent] = useState<RecentGame[]>(() => getRecentGames());
  const [sessions, setSessions] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const sync = () => { setProgress(getProgress()); setAchievements(getAchievements()); setFavorites(getFavorites()); setRecent(getRecentGames()); setSessions(getSessionCount()); setStreak(getCurrentStreak()); setVersion(value => value + 1); };
    sync();
    window.addEventListener('nitrodrive:updated', sync);
    return () => window.removeEventListener('nitrodrive:updated', sync);
  }, []);

  const favoriteGames = favorites.map(getGameById).filter(Boolean);
  const recentGames = recent.map(item => ({ ...item, game: getGameById(item.gameId) })).filter(item => item.game);

  return <div className="container profile-page" key={version}>
    <div className="page-head profile-head"><div className="eyebrow">Local player dashboard</div><h1>NitroDrive Player</h1><p className="muted">Your progress stays on this device. No account required.</p></div>
    <section className="profile-overview"><div className="level-panel"><div className="eyebrow">Player level</div><div className="level-line"><strong>Level {progress.level}</strong><span>{progress.currentLevelXp} / {progress.nextLevelXp} XP</span></div><div className="progress-track" role="progressbar" aria-label="Player XP progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.percent}><span style={{ width: `${progress.percent}%` }} /></div><small>{progress.xp} total XP</small></div><div className="profile-stat"><Clock3 size={19} /><strong>{sessions}</strong><span>Games played</span></div><div className="profile-stat"><Trophy size={19} /><strong>{achievements.filter(item => item.unlocked).length}</strong><span>Achievements</span></div><div className="profile-stat streak-stat"><Flame size={19} /><strong>{streak}</strong><span>Current streak</span></div></section>
    <DailyChallenge />
    <section className="dashboard-section" aria-labelledby="achievements-title"><div className="section-head"><div><div className="eyebrow">Milestones</div><h2 id="achievements-title">Achievements</h2></div></div><div className="achievement-grid">{achievements.map(achievement => <article className={`achievement ${achievement.unlocked ? 'is-unlocked' : 'is-locked'}`} key={achievement.id}>{achievement.unlocked ? <Check size={20} /> : <Lock size={18} />}<div><strong>{achievement.title}</strong><p>{achievement.description}</p></div></article>)}</div></section>
    <section className="dashboard-section" aria-labelledby="recent-title"><div className="section-head"><div><div className="eyebrow">Your activity</div><h2 id="recent-title">Recently played</h2></div>{recentGames.length > 0 && <button className="btn btn-ghost" onClick={clearRecentGames}><Trash2 size={14} /> Clear history</button>}</div>{recentGames.length ? <div className="recent-list">{recentGames.map(item => item.game && <article className="recent-item" key={item.gameId}><Image src={item.game.thumbnail} alt={`${item.game.title} thumbnail`} width={120} height={68} /><div><strong>{item.game.title}</strong><small>{item.game.category}</small><small>{new Date(item.lastPlayed).toLocaleDateString()}</small></div><Link className="btn btn-primary" href={`/games/${item.game.slug}`}>Continue</Link><button className="icon-btn" onClick={() => removeRecentGame(item.gameId)} aria-label={`Remove ${item.game.title} from recently played`}><Trash2 size={15} /></button></article>)}</div> : <div className="empty-state">Your recently played games will appear here.</div>}</section>
    <section className="dashboard-section" aria-labelledby="favorites-title"><div className="section-head"><div><div className="eyebrow">Saved for later</div><h2 id="favorites-title">Favorites</h2></div><Link className="btn btn-ghost" href="/favorites">Open favorites</Link></div>{favoriteGames.length ? <div className="grid game-grid">{favoriteGames.slice(0, 4).map(game => game && <GameCard game={game} compact key={game.id} />)}</div> : <div className="empty-state">Your favorite games will appear here.</div>}</section>
    <RecommendationRail />
  </div>;
}
