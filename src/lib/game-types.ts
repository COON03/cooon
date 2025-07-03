export type WeaponType = 'Sword' | 'Axe' | 'Bow' | 'Scythe' | 'Magic Staff' | 'Chain' | 'Claw' | 'Rapier' | 'Whip' | 'Boomerang';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  price: number;
}

export type CustomerSprite = 'Knight' | 'Mage' | 'Rogue' | 'Villager';

export interface Customer {
  id: string;
  name: string;
  sprite: CustomerSprite;
  requestText: string;
  wants: {
    type: WeaponType;
  };
  offerMultiplier: number; // e.g., 1.2 for 20% over base price
  patience: number; // Transaction time limit in seconds
  personality: 'normal' | 'impatient' | 'picky'; // Affects timer and penalties
}
