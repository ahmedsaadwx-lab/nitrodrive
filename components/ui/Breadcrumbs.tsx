import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map(item => <span className="breadcrumb-item" key={`${item.label}-${item.href || 'current'}`}><ChevronRight size={14} />{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}
