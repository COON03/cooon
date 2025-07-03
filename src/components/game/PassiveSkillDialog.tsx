import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Heart, Clock, UserMinus } from 'lucide-react';
import type { PassiveSkill, SkillId } from '@/lib/game-types';

interface PassiveSkillDialogProps {
  isOpen: boolean;
  skills: PassiveSkill[];
  onSelectSkill: (skill: PassiveSkill) => void;
}

const SkillIcon = ({ id }: { id: SkillId }) => {
  const className = "w-10 h-10 text-primary";
  switch (id) {
    case 'ADD_GOLD':
      return <Coins className={className} />;
    case 'ADD_HEART':
      return <Heart className={className} />;
    case 'TIMER_BOOST':
      return <Clock className={className} />;
    case 'REDUCE_BAD_CUSTOMERS':
      return <UserMinus className={className} />;
    default:
      return null;
  }
};

const PassiveSkillDialog: React.FC<PassiveSkillDialogProps> = ({ isOpen, skills, onSelectSkill }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center">
            하루 마감! 보너스 선택
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2">
            오늘 하루도 고생하셨습니다! 다음 날을 위해 보너스 효과를 하나 선택하세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className="flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => onSelectSkill(skill)}
            >
              <CardHeader className="p-2">
                <SkillIcon id={skill.id} />
              </CardHeader>
              <CardContent className="p-2">
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassiveSkillDialog;
