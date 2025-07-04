import React from 'react';
import type { WeaponType } from '@/lib/game-types';
import { 
    SwordIcon, AxeIcon, BowIcon, ScytheIcon, WhipIcon, 
    MagicStaffIcon, ChainIcon, RapierIcon, BoomerangIcon,
    EnhancedSwordIcon, EnhancedAxeIcon, EnhancedBowIcon
} from '@/lib/icons';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

const rareWeaponTypes: WeaponType[] = ['Scythe', 'Magic Staff', 'Chain', 'Rapier', 'Whip', 'Boomerang', 'Enhanced Sword', 'Enhanced Axe', 'Enhanced Bow'];

export const WeaponIcon = ({ type, className: extraClassName }: { type: WeaponType | 'Random', className?: string }) => {
  const isRare = rareWeaponTypes.includes(type as WeaponType);
  const className = cn("w-10 h-10", isRare && "drop-shadow-[0_0_5px_rgba(250,204,21,0.7)]", extraClassName);

  if (type === 'Random') {
      return (
          <div className={cn("flex items-center justify-center bg-muted/50 rounded-lg w-10 h-10", extraClassName)}>
              <HelpCircle className="w-6 h-6 text-muted-foreground" />
          </div>
      );
  }
  
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
