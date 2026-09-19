import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CatalogBrowser from '@/components/catalog/CatalogBrowser';
import TopAd from '@/components/ads/TopAd';

export const metadata: Metadata = { title: 'All Car Games', description: 'Browse NitroDrive racing, 3D driving, stunt, off-road and simulator games.', alternates: { canonical: '/games' } };

export default function GamesPage() {
  return <div className="container catalog-page"><Breadcrumbs items={[{ label: 'Games' }]} /><div className="page-head"><div className="eyebrow">The full garage</div><h1>All games</h1><p className="muted">Search the NitroDrive library and find your next line.</p></div><TopAd /><CatalogBrowser /></div>;
}
