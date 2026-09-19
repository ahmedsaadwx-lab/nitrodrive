import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ArticleCard from '@/components/blog/ArticleCard';
import { articles } from '@/data/articles';

export const metadata: Metadata = { title: 'Driving Tips', description: 'Useful, original guides for racing, drifting and stunt games.' };

export default function BlogPage() {
  return <div className="container content-page"><Breadcrumbs items={[{ label: 'Driving tips' }]} /><div className="page-head"><div className="eyebrow">Useful content</div><h1>Driving tips</h1><p className="muted">Practical guides for getting more from browser racing games.</p></div><div className="article-grid">{articles.map(article => <ArticleCard article={article} key={article.slug} />)}</div></div>;
}
