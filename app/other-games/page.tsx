import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CatalogBrowser from '@/components/catalog/CatalogBrowser';
import TopAd from '@/components/ads/TopAd';

export const metadata: Metadata = {
  title: 'Other Games',
  description: 'Explore NitroDrive action, arcade, puzzle, sports, strategy and casual browser games.',
  alternates: { canonical: '/other-games' },
  openGraph: { title: 'Other Games | NitroDrive', description: 'Explore more browser games beyond the garage.' }
};

export default function OtherGamesPage() {
  return <div className="container catalog-page"><Breadcrumbs items={[{ label: 'Other Games' }]} /><div className="page-head"><div className="eyebrow">Beyond the garage</div><h1>Other games</h1><p className="muted">A growing home for action, arcade, puzzle, sports and casual games from legitimate sources.</p></div><TopAd /><CatalogBrowser /></div>;
}