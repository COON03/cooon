import React from 'react';
import type { Weapon } from '@/lib/game-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SwordIcon, AxeIcon, BowIcon, GoldCoinIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface InventoryAreaProps {
  inventory: Weapon[];
  selectedId: string | null;
  workshopSlots: (Weapon | null)[];
  onSelect: (id: string) => void;
}

const WeaponIcon = ({ type }: { type: Weapon['type'] }) => {
  switch (type) {
    case 'Sword': return <SwordIcon className="w-10 h-10" />;
    case 'Axe': return <AxeIcon className="w-10 h-10" />;
    case 'Bow': return <BowIcon className="w-10 h-10" />;
    default: return null;
  }
};

const InventoryArea: React.FC<InventoryAreaProps> = ({ inventory, selectedId, onSelect, workshopSlots }) => {
  const isWorkshopFull = workshopSlots.every(slot => slot !== null);
  const workshopIds = workshopSlots.map(w => w?.id);

  return (
    <div className='flex flex-col h-full'>
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground/90">인벤토리</h2>
      <ScrollArea className="flex-grow pr-4 -mr-4">
        <div className="grid grid-cols-1 gap-4">
          {inventory.map((weapon) => {
            const isInWorkshop = workshopIds.includes(weapon.id);
            const isSelected = selectedId === weapon.id && !isInWorkshop;
            const isDisabled = (isWorkshopFull && !isInWorkshop) || (selectedId !== null && !isSelected);

            return (
            <Card
              key={weapon.id}
              onClick={() => !isDisabled && onSelect(weapon.id)}
              className={cn(
                'transition-all duration-200',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:shadow-primary/20',
                isSelected ? 'ring-2 ring-primary' : '',
                isInWorkshop ? 'ring-2 ring-purple-500 bg-purple-900/20' : ''
              )}
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <WeaponIcon type={weapon.type} />
                <div className="flex-1">
                  <CardTitle>{weapon.name}</CardTitle>
                  <CardDescription>{weapon.type}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pb-2">
                <div className="font-semibold">공격력: <span className="text-red-400">{weapon.attack}</span></div>
                <div className="font-semibold">속도: <span className="text-blue-400">{weapon.speed}</span></div>
              </CardContent>
              <CardFooter className="pb-4">
                <div className="flex items-center font-bold text-yellow-400">
                  <GoldCoinIcon className="w-4 h-4 mr-1"/>
                  <span>{weapon.price} G</span>
                </div>
              </CardFooter>
            </Card>
          )})}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InventoryArea;
