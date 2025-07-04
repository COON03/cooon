import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GoldCoinIcon, KnightIcon, MageIcon } from '@/lib/icons';
import { Badge } from '../ui/badge';

interface EndGameDialogProps {
  gameState: 'playing' | 'won' | 'lost';
  gold: number;
  onPlayAgain: () => void;
  onReturnToTitle: () => void;
}

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div
      className="absolute w-2 h-4 rounded-sm"
      style={{
        ...style,
        animationName: 'confetti-fall',
        animationTimingFunction: 'linear',
        animationIterationCount: '1',
      }}
    />
  );
};

const EndGameDialog: React.FC<EndGameDialogProps> = ({ gameState, gold, onPlayAgain, onReturnToTitle }) => {
  const isOpen = gameState === 'won' || gameState === 'lost';
  const [confetti, setConfetti] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    if (gameState === 'won') {
      const pieces = Array.from({ length: 150 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${-20 + Math.random() * -80}px`,
        transform: `rotate(${Math.random() * 360}deg)`,
        backgroundColor: `hsl(${Math.random() * 360}, 90%, 65%)`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      }));
      setConfetti(pieces);
    } else {
      setConfetti([]);
    }
  }, [gameState]);


  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-xl overflow-visible">
        {gameState === 'won' && (
            <div className="absolute inset-0 pointer-events-none z-0">
                {confetti.map((style, index) => (
                    <ConfettiPiece key={index} style={style} />
                ))}
            </div>
        )}
        {gameState === 'won' && (
          <>
            <div className="absolute -left-24 bottom-4 animate-cheer drop-shadow-lg z-10" style={{ animationDelay: '0s' }}>
                <KnightIcon mood="happy" className="w-40 h-40" />
            </div>
            <div className="absolute -right-24 bottom-4 animate-cheer drop-shadow-lg z-10" style={{ animationDelay: '0.5s' }}>
                <MageIcon mood="happy" className="w-40 h-40" />
            </div>
          </>
        )}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center relative z-20">
            {gameState === 'won' ? '🎉 가게를 지켜냈습니다! 🎉' : '💸 파산하고 말았습니다... 💸'}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-center pt-4 relative z-20">
              당신의 여정이 끝났습니다. 최종 결과는...
              <div className="my-6">
                <div className="text-lg text-foreground">최종 자산</div>
                <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                  <GoldCoinIcon className="w-8 h-8" />
                  {gold} G
                </div>
              </div>
              <div className='flex justify-center'>
                {gameState === 'won'
                  ? <Badge className='bg-blue-500 text-white'>도전 성공</Badge>
                  : <Badge variant="destructive">도전 실패</Badge>}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='relative z-20'>
          {gameState === 'won' ? (
            <AlertDialogAction onClick={onReturnToTitle}>타이틀로 가기</AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={onPlayAgain}>새로운 7일 시작하기</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EndGameDialog;
