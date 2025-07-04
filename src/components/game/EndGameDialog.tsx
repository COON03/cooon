import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { GoldCoinIcon } from '@/lib/icons';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateResultImage, type GenerateResultImageInput } from '@/ai/flows/generate-result-image-flow';
import type { Customer } from '@/lib/game-types';
import { Loader2 } from 'lucide-react';

interface EndGameDialogProps {
  gameState: 'playing' | 'won' | 'lost';
  gold: number;
  day: number;
  lastCustomer: Customer | null;
  onPlayAgain: () => void;
}

const EndGameDialog: React.FC<EndGameDialogProps> = ({ gameState, gold, day, lastCustomer, onPlayAgain }) => {
  const isOpen = gameState === 'won' || gameState === 'lost';
  const { toast } = useToast();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlayAgain = () => {
    setGeneratedImage(null);
    onPlayAgain();
  };

  const handleShare = async () => {
    if (isGenerating || !lastCustomer) {
      if (!lastCustomer) {
        toast({ title: "오류", description: "공유할 마지막 손님 정보가 없습니다.", variant: "destructive" });
      }
      return;
    }

    setIsGenerating(true);
    try {
      const input: GenerateResultImageInput = {
        gold,
        day,
        customerSprite: lastCustomer.sprite,
        customerName: lastCustomer.name,
      };
      const result = await generateResultImage(input);
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error("Image generation failed:", error);
      toast({ title: "이미지 생성 실패", description: "결과 이미지 생성 중 오류가 발생했습니다.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen && !generatedImage}>
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
            <Button variant="outline" onClick={handleShare} disabled={isGenerating || !lastCustomer}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isGenerating ? '생성 중...' : '게임 결과 공유하기'}
            </Button>
            <AlertDialogAction onClick={onPlayAgain}>새로운 7일 시작하기</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!generatedImage} onOpenChange={(open) => !open && setGeneratedImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>게임 결과 이미지</DialogTitle>
            <DialogDescription>
              이미지를 마우스 오른쪽 버튼으로 클릭하여 저장하거나, 아래 버튼을 이용해 다운로드하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 bg-black/20 p-2 rounded-lg">
            {generatedImage ? (
              <img src={generatedImage} alt="게임 결과" className="rounded-md w-full object-contain" />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
          <DialogFooter className="mt-4 sm:justify-between">
            <Button variant="outline" onClick={handlePlayAgain}>새로운 7일 시작하기</Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setGeneratedImage(null)}>닫기</Button>
              <a href={generatedImage!} download={`7일의상인_결과.png`} className={buttonVariants({ variant: 'default' })}>
                이미지 다운로드
              </a>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EndGameDialog;
