import React from 'react';
import type { Weapon, WeaponType } from '@/lib/game-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SwordIcon, AxeIcon, BowIcon, GoldCoinIcon, ScytheIcon, SpearIcon, DaggerIcon, WhipIcon, ClawIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface InventoryAreaProps {
  inventory: Weapon[];
  workshopSlots: (Weapon | null)[];
  onSelect: (id: string) => void;
}

const rareWeaponTypes: WeaponType[] = ['Scythe', 'Spear', 'Dagger', 'Whip', 'Claw'];

const WeaponIcon = ({ type }: { type: Weapon['type'] }) => {
  const isRare = rareWeaponTypes.includes(type);
  const className = cn("w-10 h-10", isRare && "drop-shadow-[0_0_5px_rgba(250,204,21,0.7)]");

  switch (type) {
    case 'Sword': return <SwordIcon className={className} />;
    case 'Axe': return <AxeIcon className={className} />;
    case 'Bow': return <BowIcon className={className} />;
    case 'Scythe': return <ScytheIcon className={className} />;
    case 'Spear': return <SpearIcon className={className} />;
    case 'Dagger': return <DaggerIcon className={className} />;
    case 'Whip': return <WhipIcon className={className} />;
    case 'Claw': return <ClawIcon className={className} />;
    default: return null;
  }
};

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
