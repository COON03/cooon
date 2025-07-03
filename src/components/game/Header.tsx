import React from 'react';
import { Progress } from '@/components/ui/progress';
import { GoldCoinIcon } from '@/lib/icons';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HeaderProps {
  day: number;
  maxDays: number;
  gold: number;
  targetGold: number;
}

const Header: React.FC<HeaderProps> = ({ day, maxDays, gold, targetGold }) => {
  const progress = Math.min((gold / targetGold) * 100, 100);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
        7일의 상인: 무기 가게 생존기
      </h1>
      <Card className="w-full sm:w-auto sm:min-w-[300px] bg-card/50">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center text-lg">
                <span className="font-bold">제 {day}일 / {maxDays}일</span>
                <span className="flex items-center font-bold text-yellow-400">
                    <GoldCoinIcon className="w-5 h-5 mr-2" />
                    {gold} G
                </span>
            </div>
            <div>
              <div className='text-sm text-muted-foreground mb-1'>목표: {targetGold} G</div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
      </Card>
    </header>
  );
};

export default Header;
