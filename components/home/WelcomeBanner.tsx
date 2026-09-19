'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRecentGames } from '@/lib/storage';

export default function WelcomeBanner() {
  const [hasHistory, setHasHistory] = useState(false);
  useEffect(() => { const sync = () => setHasHistory(getRecentGames().length > 0); sync(); window.addEventListener('nitrodrive:updated', sync); return () => window.removeEventListener('nitrodrive:updated', sync); }, []);
  return <section className="welcome-banner"><div><div className="eyebrow">{hasHistory ? 'Welcome back' : 'Welcome to NitroDrive'}</div><h2>{hasHistory ? 'Your next run is waiting.' : 'Pick a line and make it yours.'}</h2></div><Link className="btn btn-secondary" href={hasHistory ? '/profile' : '#featured-games'}>{hasHistory ? 'Open dashboard' : 'Explore games'}</Link></section>;
}
