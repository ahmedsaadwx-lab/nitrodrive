import Link from 'next/link';
import type { Article } from '@/data/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return <article className="article-card"><div className="eyebrow">{article.category}</div><h2>{article.title}</h2><p>{article.description}</p><Link className="btn btn-ghost" href={`/blog/${article.slug}`}>Read article <span aria-hidden="true">→</span></Link></article>;
}
