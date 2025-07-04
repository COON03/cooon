import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allRecipes, Recipe } from '@/lib/recipe-data';
import type { WeaponType } from '@/lib/game-types';
import {
  SwordIcon, AxeIcon, BowIcon, ScytheIcon, WhipIcon,
  MagicStaffIcon, ChainIcon, RapierIcon, BoomerangIcon,
  EnhancedSwordIcon, EnhancedAxeIcon, EnhancedBowIcon
} from '@/lib/icons';
import { Plus, Equal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const WeaponIcon = ({ type }: { type: WeaponType }) => {
  const className = "w-12 h-12";
  switch (type) {
    case 'Sword': return <SwordIcon className={className} />;
    case 'Axe': return <AxeIcon className={className} />;
    case 'Bow': return <BowIcon className={className} />;
    case 'Scythe': return <ScytheIcon className={className} />;
    case 'Whip': return <WhipIcon className={className} />;
    case 'Magic Staff': return <MagicStaffIcon className={className} />;
    case 'Chain': return <ChainIcon className={className} />;
    case 'Rapier': return <RapierIcon className={className} />;
    case 'Boomerang': return <BoomerangIcon className={className} />;
    case 'Enhanced Sword': return <EnhancedSwordIcon className={className} />;
    case 'Enhanced Axe': return <EnhancedAxeIcon className={className} />;
    case 'Enhanced Bow': return <EnhancedBowIcon className={className} />;
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
                {recipe.inputs.map((input, index) => (
                    <React.Fragment key={index}>
                        <WeaponIcon type={input} />
                        {index < recipe.inputs.length - 1 && <Plus className="w-6 h-6 text-muted-foreground" />}
                    </React.Fragment>
                ))}
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
  const [currentPage, setCurrentPage] = useState(0);

  const pagedRecipes = useMemo(() => {
    const getRecipe = (id: string) => allRecipes.find(r => r.id === id);
    return [
      [getRecipe('recipe_rapier'), getRecipe('recipe_magic_staff'), getRecipe('recipe_scythe')],
      [getRecipe('recipe_boomerang'), getRecipe('recipe_magic_staff'), getRecipe('recipe_whip')],
      [getRecipe('recipe_chain'), getRecipe('recipe_scythe'), getRecipe('recipe_whip')],
      [getRecipe('recipe_enhanced_sword'), getRecipe('recipe_enhanced_bow'), getRecipe('recipe_enhanced_axe')],
    ].map(page => page.filter((r): r is Recipe => r !== undefined));
  }, []);

  const totalPages = pagedRecipes.length;

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCurrentPage(0), 150);
    }
  }, [isOpen]);

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
                {pagedRecipes.length > 0 && pagedRecipes[currentPage].map(recipe => (
                    <RecipeEntry key={`${currentPage}-${recipe.id}`} recipe={recipe} discovered={discoveredRecipes.has(recipe.id)} />
                ))}
            </div>
        </ScrollArea>
        <DialogFooter className="flex-row items-center justify-center pt-4 sm:justify-center space-x-2">
           <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 0}>
             <ChevronLeft className="h-4 w-4" />
             <span className="sr-only">Previous Page</span>
           </Button>
           <span className="text-lg font-medium w-20 text-center tabular-nums">{currentPage + 1} / {totalPages}</span>
           <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
             <ChevronRight className="h-4 w-4" />
             <span className="sr-only">Next Page</span>
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeBook;
