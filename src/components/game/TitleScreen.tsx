'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Crown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface TitleScreenProps {
  onStartGame: () => void;
  hasWon: boolean;
}

const HowToPlayDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-64">하는 방법</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline">게임 방법</DialogTitle>
          <DialogDescription>
            7일 안에 가게를 살려내세요!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 pr-6 -mr-6">
          <div className="space-y-4 text-left text-foreground">
            <div>
              <h3 className="font-bold text-lg text-primary">목표</h3>
              <p>폐업 위기의 무기 가게 주인인 당신! 7일 동안 매일 목표 금액을 달성하여 가게를 지켜내야 합니다. 매일 목표 금액을 넘기지 못하면 게임에서 패배합니다.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">손님 응대</h3>
              <p>가게에는 다양한 손님들이 찾아옵니다. 손님들은 각자 원하는 무기 종류를 요구합니다. 손님의 요구에 맞는 무기를 판매하면 골드를 얻을 수 있습니다. 하지만 잘못된 무기를 주거나 너무 오래 기다리게 하면 신뢰도가 감소합니다.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">무기 조합</h3>
              <p>인벤토리에서 무기 2개를 선택하여 '대장간'에서 조합할 수 있습니다. 조합을 통해 더 비싸고 강력한 희귀 무기를 만들 수 있습니다. 어떤 무기들을 조합해야 할지는 '무기 도감'을 참고하거나 직접 실험해보세요!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">재고 관리</h3>
              <p>기본 무기(검, 도끼, 활)는 재고가 3개 미만으로 떨어지면 다음 날 자동으로 보충됩니다. 희귀 무기는 조합을 통해서만 얻을 수 있습니다.</p>
            </div>
             <div>
              <h3 className="font-bold text-lg text-primary">하루 마무리</h3>
              <p>하루의 목표 금액을 달성하거나 모든 손님을 응대하면 하루가 끝납니다. 하루가 끝나면 다음 날에 도움이 될 특별한 '스킬'을 선택할 수 있는 기회가 주어집니다.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}


const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame, hasWon }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background text-foreground relative font-body">
       <div className="absolute inset-0 w-full h-full z-0">
         <Image
            src="https://placehold.co/1200x800/8d715b/8d715b.png"
            alt="Weapon shop background"
            data-ai-hint="pixel art shop interior"
            fill
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
       </div>
      
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {hasWon && (
        <div className="absolute top-8 right-8 text-yellow-400 z-20">
          <Crown className="w-16 h-16 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]" />
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white p-8 bg-black/60 rounded-lg shadow-2xl">
        <h1 className="text-6xl font-headline mb-4 text-primary drop-shadow-lg">7일의 상인</h1>
        <p className="text-2xl mb-10 text-muted-foreground">무기 가게 생존기</p>
        <div className="flex flex-col space-y-4">
          <Button onClick={onStartGame} size="lg" className="w-64">게임 시작</Button>
          <Button variant="secondary" size="lg" className="w-64" disabled>이어하기</Button>
          <HowToPlayDialog />
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
