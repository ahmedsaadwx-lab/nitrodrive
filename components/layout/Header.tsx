'use client';
import Link from 'next/link';
import { Menu, Search, Heart, X } from 'lucide-react';
import { useState } from 'react';
import SearchOverlay from '@/components/ui/SearchOverlay';

export default function Header() {
  const [menu, setMenu] = useState(false); const [search, setSearch] = useState(false);
  return <><header><div className="container nav"><Link href="/" className="logo">NITRO<span>DRIVE</span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/games">Games</Link><Link href="/category/racing">Racing</Link><Link href="/category/stunt">Stunt</Link><Link href="/category/3d-racing">3D</Link><Link href="/profile">Profile</Link></nav><div className="nav-actions"><Link href="/favorites" className="icon-btn" aria-label="Favorites"><Heart size={17}/></Link><button className="icon-btn" onClick={() => setSearch(true)} aria-label="Search"><Search size={17}/></button><button className="icon-btn menu-btn" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'}>{menu ? <X size={19}/> : <Menu size={19}/>}</button></div></div>{menu && <nav className="mobile-nav container" style={{padding:'16px 0 22px',display:'grid',gap:16}}><Link href="/" onClick={() => setMenu(false)}>Home</Link><Link href="/games" onClick={() => setMenu(false)}>Games</Link><Link href="/category/racing" onClick={() => setMenu(false)}>Racing</Link><Link href="/category/stunt" onClick={() => setMenu(false)}>Stunt Racing</Link><Link href="/category/3d-racing" onClick={() => setMenu(false)}>3D Driving</Link><Link href="/favorites" onClick={() => setMenu(false)}>Favorites</Link><Link href="/profile" onClick={() => setMenu(false)}>Profile</Link></nav>}</header>{search && <SearchOverlay close={() => setSearch(false)}/>}</>;
}
