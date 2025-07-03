import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Weapon } from '@/lib/game-types';
import { AxeIcon, BowIcon, SwordIcon, ScytheIcon, SpearIcon, DaggerIcon, WhipIcon, ClawIcon } from '@/lib/icons';

interface WorkshopAreaProps {
  slots: (Weapon | null)[];
  onCombine: () => void;
  onClear: () => void;
}

const WeaponIcon = ({ type }: { type: Weapon['type'] }) => {
    switch (type) {
      case 'Sword': return <SwordIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Axe': return <AxeIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Bow': return <BowIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Scythe': return <ScytheIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Spear': return <SpearIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Dagger': return <DaggerIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Whip': return <WhipIcon className="w-12 h-12 text-muted-foreground" />;
      case 'Claw': return <ClawIcon className="w-12 h-12 text-muted-foreground" />;
      default: return null;
    }
};

const WorkshopSlot: React.FC<{ weapon: Weapon | null }> = ({ weapon }) => {
    return (
        <Card className="h-40 flex items-center justify-center bg-black/40 border-dashed border-slate-400">
            {weapon ? (
                <div className="text-center p-2 text-white">
                    <WeaponIcon type={weapon.type} />
                    <p className="font-bold mt-2 truncate">{weapon.name}</p>
                    <p className="text-xs text-slate-300">공: {weapon.attack} / 속: {weapon.speed}</p>
                </div>
            ) : (
                <p className="text-muted-foreground">무기 선택</p>
            )}
        </Card>
    );
};


const WorkshopArea: React.FC<WorkshopAreaProps> = ({ slots, onCombine, onClear }) => {
  return (
    <div className='flex flex-col'>
      <h2 className="text-2xl font-headline font-semibold mb-4 text-white/90 drop-shadow-md">대장간 (무기 조합)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <WorkshopSlot weapon={slots[0]} />
        <p className="text-4xl font-bold text-center text-white drop-shadow-lg">+</p>
        <WorkshopSlot weapon={slots[1]} />
      </div>
      <div className="flex gap-4 mt-4 justify-end">
        <Button onClick={onClear} variant="outline">초기화</Button>
        <Button onClick={onCombine} disabled={!slots[0] || !slots[1]}>조합하기</Button>
      </div>
    </div>
  );
};

export default WorkshopArea;
