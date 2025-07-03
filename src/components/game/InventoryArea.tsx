import React from 'react';
import type { Weapon, WeaponType } from '@/lib/game-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { GoldCoinIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { WeaponIcon } from './WeaponIcon';

interface InventoryAreaProps {
  inventory: Weapon[];
  workshopSlots: (Weapon | null)[];
  onSelect: (id: string) => void;
}

const rareWeaponTypes: WeaponType[] = ['Scythe', 'Magic Staff', 'Chain', 'Claw', 'Rapier', 'Whip', 'Boomerang'];

const InventoryArea: React.FC<InventoryAreaProps> = ({ inventory, onSelect, workshopSlots }) => {
  const workshopIds = workshopSlots.map(w => w?.id).filter(Boolean);

  return (
    <div className='flex flex-col h-full'>
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground/90">인벤토리</h2>
      <ScrollArea className="flex-grow pr-4 -mr-4">
        <div className="grid grid-cols-1 gap-4">
          {inventory.map((weapon) => {
            const isSelected = workshopIds.includes(weapon.id);
            const isRare = rareWeaponTypes.includes(weapon.type);

            return (
            <Card
              key={weapon.id}
              onClick={() => onSelect(weapon.id)}
              className={cn(
                'transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-primary/20',
                isSelected ? 'ring-2 ring-primary' : '',
                isRare && !isSelected && 'border-yellow-400/50 shadow-lg shadow-yellow-400/20'
              )}
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <WeaponIcon type={weapon.type} />
                <div className="flex-1">
                  <CardTitle>{weapon.name}</CardTitle>
                  <CardDescription>{weapon.type}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pb-4 pt-2">
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
