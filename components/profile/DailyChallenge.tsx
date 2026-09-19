'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Check, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDailyChallenge, getGameById, type DailyChallenge } from '@/lib/storage';

export default function DailyChallenge({ compact = false }: { compact?: boolean }) {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);

  useEffect(() => {
    const sync = () => setChallenge(getDailyChallenge());
    sync();
    window.addEventListener('nitrodrive:updated', sync);
    return () => window.removeEventListener('nitrodrive:updated', sync);
  }, []);

  const game = challenge ? getGameById(challenge.gameId) : undefined;
  if (!game || !challenge) return null;

  return <section className={`daily-challenge ${compact ? 'is-compact' : ''}`} aria-labelledby="daily-challenge-title"><div className="daily-challenge-art"><Image src={game.thumbnail} alt={`${game.title} thumbnail`} fill sizes="(max-width: 700px) 100vw, 360px" /></div><div className="daily-challenge-copy"><div className="eyebrow"><CalendarDays size={14} /> Today's race</div><h2 id="daily-challenge-title">{game.title}</h2><p>Complete today's challenge.</p>{challenge.completed ? <div className="challenge-completed"><Check size={16} /> Challenge completed</div> : <Link className="btn btn-primary" href={`/games/${game.slug}`}><Play size={14} fill="currentColor" /> Play challenge</Link>}</div></section>;
}
