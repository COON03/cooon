import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allRecipes, Recipe } from '@/lib/recipe-data';
import type { WeaponType } from '@/lib/game-types';
import {
  SwordIcon, AxeIcon, BowIcon, ScytheIcon, WhipIcon, ClawIcon,
  MagicStaffIcon, ChainIcon, RapierIcon, BoomerangIcon
} from '@/lib/icons';
import { Plus, Equal } from 'lucide-react';
import { Card } from '../ui/card';

const WeaponIcon = ({ type }: { type: WeaponType }) => {
  const className = "w-12 h-12";
  switch (type) {
    case 'Sword': return <SwordIcon className={className} />;
    case 'Axe': return <AxeIcon className={className} />;
    case 'Bow': return <BowIcon className={className} />;
    case 'Scythe': return <ScytheIcon className={className} />;
    case 'Whip': return <WhipIcon className={className} />;
    case 'Claw': return <ClawIcon className={className} />;
    case 'Magic Staff': return <MagicStaffIcon className={className} />;
    case 'Chain': return <ChainIcon className={className} />;
    case 'Rapier': return <RapierIcon className={className} />;
    case 'Boomerang': return <BoomerangIcon className={className} />;
    default: return null;
  }
};

const QuestionMarkIcon = ({ className }: { className?: string }) => (
    <div className={`flex items-center justify-center bg-muted/50 rounded-lg ${className}`}>
        <span className="text-4xl font-bold text-muted-foreground">?</span>
    </div>
);


const RecipeEntry = ({ recipe, discovered }: { recipe: Recipe, discovered: boolean }) => {
    return (
        <Card className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2">
                <WeaponIcon type={recipe.inputs[0]} />
                <Plus className="w-6 h-6 text-muted-foreground" />
                <WeaponIcon type={recipe.inputs[1]} />
            </div>
            <Equal className="w-8 h-8 text-primary shrink-0" />
            <div className="flex-1 flex items-center gap-4">
                {discovered ? (
                    <>
                        <WeaponIcon type={recipe.output.type} />
                        <div className='flex-1'>
                            <p className="font-bold text-lg text-accent">{recipe.output.name}</p>
                            <p className="text-sm text-muted-foreground">{recipe.output.description}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <QuestionMarkIcon className="w-12 h-12"/>
                        <div className='flex-1'>
                            <p className="font-bold text-lg text-muted-foreground">조합법 미발견</p>
                            <p className="text-sm text-muted-foreground">새로운 무기를 조합하여 잠금을 해제하세요.</p>
                        </div>
                    </>
                )}
            </div>
        </Card>
    )
};


interface RecipeBookProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  discoveredRecipes: Set<string>; 
}

const RecipeBook: React.FC<RecipeBookProps> = ({ isOpen, onOpenChange, discoveredRecipes }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-center">무기 조합 도감</DialogTitle>
          <DialogDescription className='text-center'>
            새로운 무기를 발견하여 도감을 완성해보세요!
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow h-full pr-6 -mr-6 mt-4">
            <div className="flex flex-col gap-2">
                {allRecipes.map(recipe => (
                    <RecipeEntry key={recipe.id} recipe={recipe} discovered={discoveredRecipes.has(recipe.id)} />
                ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeBook;
