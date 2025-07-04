'use client';

import { useState, useEffect } from 'react';
import GameClient from '@/components/game/GameClient';
import TitleScreen from '@/components/game/TitleScreen';

export default function Home() {
  const [screen, setScreen] = useState<'title' | 'game'>('title');
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    // This effect runs once on mount to check if the game has been won previously.
    const gameWon = localStorage.getItem('gameWon');
    if (gameWon === 'true') {
      setHasWon(true);
    }
  }, []);

  const handleStartGame = () => {
    setScreen('game');
  };

  const handleReturnToTitle = () => {
    // When returning to title, re-check win state in case it was just achieved.
    const gameWon = localStorage.getItem('gameWon');
    if (gameWon === 'true') {
      setHasWon(true);
    }
    setScreen('title');
  };

  const handleGameWon = () => {
    localStorage.setItem('gameWon', 'true');
    setHasWon(true);
  };

  if (screen === 'title') {
    return <TitleScreen onStartGame={handleStartGame} hasWon={hasWon} />;
  }

  return <GameClient onReturnToTitle={handleReturnToTitle} onGameWon={handleGameWon} />;
}
