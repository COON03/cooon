import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GoldCoinIcon } from '@/lib/icons';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface EndGameDialogProps {
  gameState: 'playing' | 'won' | 'lost';
  gold: number;
  onPlayAgain: () => void;
}

const EndGameDialog: React.FC<EndGameDialogProps> = ({ gameState, gold, onPlayAgain }) => {
  const isOpen = gameState === 'won' || gameState === 'lost';
  const { toast } = useToast();

  const handleShare = () => {
    const message = gameState === 'won' 
      ? `가게를 살려냈습니다! 최종 자산: ${gold}G`
      : `파산하고 말았습니다... 최종 자산: ${gold}G`;
    
    navigator.clipboard.writeText(`7일의 상인: ${message} #7일의상인 #무기가게생존기`);
    toast({ title: "클립보드에 복사됨", description: "결과가 클립보드에 복사되었습니다. SNS에 붙여넣어보세요!" });
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center">
            {gameState === 'won' ? '🎉 가게를 지켜냈습니다! 🎉' : '💸 파산하고 말았습니다... 💸'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-4">
            당신의 여정이 끝났습니다. 최종 결과는...
            <div className="my-6">
                <p className="text-lg text-foreground">최종 자산</p>
                <p className="text-4xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                    <GoldCoinIcon className="w-8 h-8" />
                    {gold} G
                </p>
            </div>
            <div className='flex justify-center'>
            {gameState === 'won' 
                ? <Badge className='bg-blue-500 text-white'>도전 성공</Badge> 
                : <Badge variant="destructive">도전 실패</Badge>}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleShare}>SNS에 공유하기</AlertDialogCancel>
          <AlertDialogAction onClick={onPlayAgain}>새로운 7일 시작하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EndGameDialog;
