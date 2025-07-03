import React from 'react';
import { Progress } from '@/components/ui/progress';
import { GoldCoinIcon } from '@/lib/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  day: number;
  maxDays: number;
  gold: number;
  targetGold: number;
  lives: number;
  maxLives: number;
}

const Header: React.FC<HeaderProps> = ({ day, maxDays, gold, targetGold, lives, maxLives }) => {
  const goldProgress = Math.min((gold / targetGold) * 100, 100);
  const hearts = Array.from({ length: maxLives }, (_, i) => i < lives);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
        7일의 상인: 무기 가게 생존기
      </h1>
      <Card className="w-full sm:w-auto sm:min-w-[350px] bg-card/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center text-lg">
                <span className="font-bold">제 {day}일 / {maxDays}일</span>
                <span className="flex items-center font-bold text-yellow-400">
                    <GoldCoinIcon className="w-5 h-5 mr-2" />
                    {gold} G
                </span>
            </div>
            <div>
              <div className='text-sm text-muted-foreground mb-1'>목표: {targetGold} G</div>
              <Progress value={goldProgress} className="h-3" />
            </div>
            <div>
              <div className='text-sm text-muted-foreground mb-1 flex items-center'>
                생명력
              </div>
              <div className="flex items-center gap-1">
                {hearts.map((isFilled, i) => (
                    <Heart key={i} className={cn('w-6 h-6', isFilled ? 'text-red-500 fill-current' : 'text-muted/50')} />
                ))}
              </div>
            </div>
          </CardContent>
      </Card>
    </header>
  );
};

export default Header;
