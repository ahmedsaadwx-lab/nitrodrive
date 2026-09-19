'use client';

import { ExternalLink, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Game } from '@/data/games';
import { recordGameOpened, recordGamePlayed } from '@/lib/storage';

export default function GamePlayer({ game }: { game: Game }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(game.gameType !== 'external');
  const [failed, setFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const supportsFullscreen = game.gameType !== 'external' && game.fullscreenSupported !== false;

  useEffect(() => {
    recordGameOpened(game);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => document.removeEventListener('fullscreenchange', onFullscreen);
  }, [game]);

  async function toggleFullscreen() {
    if (!supportsFullscreen || !frameRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await frameRef.current.requestFullscreen();
  }

  function reload() {
    setFailed(false);
    setLoading(true);
    setReloadToken(token => token + 1);
  }

  function handleGameLoaded() {
    setLoading(false);
    recordGamePlayed(game.id);
  }

  if (game.gameType === 'external' && game.gameUrl) {
    return <div className="player-shell"><div className="player external-player"><Image src={game.thumbnail} alt={`${game.title} thumbnail`} fill sizes="(max-width: 900px) 100vw, 70vw"/><div className="external-player-shade"/><div className="player-overlay"><ExternalLink size={30} color="var(--accent)"/><strong>Play on the original site</strong><p className="muted">This game is hosted externally and is not embedded here.</p><a className="btn btn-primary" href={game.gameUrl} target="_blank" rel="noopener noreferrer" onClick={() => recordGamePlayed(game.id)}>Play game <ExternalLink size={14}/></a></div></div><div className="player-toolbar"><Link className="btn btn-secondary" href="/games">Back to games</Link></div></div>;
  }

  return <div className="player-shell"><div className="player" ref={frameRef}>
    {loading && <><Image className="player-thumbnail" src={game.thumbnail} alt="" fill sizes="(max-width: 900px) 100vw, 70vw"/><div className="player-loading-shade"/><div className="player-overlay player-loading"><div className="spinner"/><strong>Preparing your race...</strong><p className="muted">Loading {game.title}</p></div></>}
    {failed ? <div className="player-overlay"><strong>Unable to load this game.</strong><p className="muted">The game did not respond. You can try again or return to the library.</p><div className="player-error-actions"><button className="btn btn-primary" onClick={reload}><RotateCcw size={14}/> Try again</button><Link className="btn btn-secondary" href="/games">Back to games</Link></div></div> : <iframe key={`${game.gamePath}-${reloadToken}`} src={game.gamePath} title={game.title} className={loading ? 'game-frame is-loading' : 'game-frame'} allow="fullscreen; autoplay; gamepad" sandbox="allow-scripts allow-same-origin allow-forms" onLoad={handleGameLoaded} onError={() => { setLoading(false); setFailed(true); }}/>} 
    {supportsFullscreen && <button className="icon-btn player-fullscreen" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</button>}
  </div><div className="player-toolbar"><Link className="btn btn-secondary" href="/games">Back to games</Link>{supportsFullscreen && <button className="btn btn-secondary" onClick={toggleFullscreen}>{fullscreen ? <Minimize2 size={15}/> : <Maximize2 size={15}/>} {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</button>}<button className="btn btn-secondary" onClick={reload}><RotateCcw size={15}/> Reload</button></div></div>;
}
