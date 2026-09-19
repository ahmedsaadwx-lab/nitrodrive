'use client';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFavorites, toggleFavorite } from '@/lib/storage';

export default function FavoriteButton({ gameId }: { gameId: string }) {
  const [favorite, setFavorite] = useState(false);
  useEffect(() => { const sync = () => setFavorite(getFavorites().includes(gameId)); sync(); window.addEventListener('nitrodrive:updated', sync); return () => window.removeEventListener('nitrodrive:updated', sync); }, [gameId]);
  function toggle() { setFavorite(toggleFavorite(gameId)); }
  return <button className={`icon-btn ${favorite ? 'active' : ''}`} onClick={toggle} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>;
}
