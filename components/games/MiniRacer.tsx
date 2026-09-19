'use client';
import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function MiniRacer() {
  const [lane, setLane] = useState(1);
  const [score, setScore] = useState(0);
  const [road, setRoad] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const laneRef = useRef(1);
  const scoreRef = useRef(0);
  const crashedRef = useRef(false);

  function move(direction: number) {
    if (crashedRef.current) return;
    const next = Math.max(0, Math.min(2, laneRef.current + direction));
    laneRef.current = next;
    setLane(next);
  }

  function restart() {
    laneRef.current = 1;
    scoreRef.current = 0;
    crashedRef.current = false;
    setLane(1);
    setScore(0);
    setCrashed(false);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') move(-1);
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') move(1);
      if (event.key.toLowerCase() === 'r') restart();
    };
    window.addEventListener('keydown', onKey);
    const timer = window.setInterval(() => {
      if (!crashedRef.current) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setRoad(value => (value + 6) % 72);
        if (scoreRef.current % 120 === 0) {
          crashedRef.current = true;
          setCrashed(true);
        }
      }
    }, 100);
    return () => { window.removeEventListener('keydown', onKey); window.clearInterval(timer); };
  }, []);

  return <div className="mini-racer" aria-label="Playable MiniRacer game">
    <div className="mini-hud"><span>SCORE <strong>{score}</strong></span><span>ARROWS / A D</span></div>
    <div className="mini-sky"><div className="mini-sun"/></div>
    <div className="mini-road" style={{ backgroundPositionY: road }}>
      <div className="road-line line-one"/><div className="road-line line-two"/>
      <div className="traffic traffic-one"/><div className="traffic traffic-two"/>
      <div className="player-car" style={{ left: `${lane * 33.333 + 16.666}%` }}/>
    </div>
    <div className="mini-controls"><button onClick={() => move(-1)} aria-label="Move left">←</button><button onClick={() => move(1)} aria-label="Move right">→</button></div>
    {crashed && <div className="crash-screen"><strong>RUN COMPLETE</strong><span>Score: {score}</span><button className="btn btn-primary" onClick={restart}><RotateCcw size={14}/> Restart</button></div>}
  </div>;
}
