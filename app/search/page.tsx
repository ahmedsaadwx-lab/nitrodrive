import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SearchResults from '@/components/search/SearchResults';

export const metadata: Metadata = { title: 'Search Car Games', description: 'Search NitroDrive racing, drifting, stunt and 3D car games.', robots: { index: false, follow: true } };

export default function SearchPage() {
  return <div className="container content-page"><Breadcrumbs items={[{ label: 'Search games' }]} /><div className="page-head"><div className="eyebrow">Find your next run</div><h1>Search games</h1><p className="muted">Search by title, category, tags, developer or game type.</p></div><SearchResults /></div>;
}
