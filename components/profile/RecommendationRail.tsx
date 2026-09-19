'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import GameCard from '@/components/games/GameCard';
import { getRecommendations } from '@/lib/storage';

export default function RecommendationRail() {
  const [recommendation, setRecommendation] = useState(getRecommendations());

  useEffect(() => {
    const sync = () => setRecommendation(getRecommendations());
    window.addEventListener('nitrodrive:updated', sync);
    return () => window.removeEventListener('nitrodrive:updated', sync);
  }, []);

  const playedCategory = recommendation.primaryCategory;
  return <section className="section recommendation-section" aria-labelledby="recommendation-title"><div className="section-head"><div><div className="eyebrow"><Sparkles size={14} /> {playedCategory ? `Because you played ${playedCategory}` : 'Fresh from the garage'}</div><h2 id="recommendation-title">Recommended for you</h2></div></div><div className="grid game-grid">{recommendation.games.map(game => <GameCard game={game} key={game.id} />)}</div></section>;
}
