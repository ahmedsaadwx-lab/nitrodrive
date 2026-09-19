import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { articles, getArticle } from '@/data/articles';

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.description, alternates: { canonical: `/blog/${article.slug}` } } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <article className="container article-page"><Breadcrumbs items={[{ label: 'Driving tips', href: '/blog' }, { label: article.title }]} /><div className="article-heading"><div className="eyebrow">{article.category}</div><h1>{article.title}</h1><p className="muted">{article.description}</p></div><div className="article-body">{article.content.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></article>;
}
