export type WeaponType = 'Sword' | 'Axe' | 'Bow' | 'Scythe' | 'Spear' | 'Dagger' | 'Whip' | 'Claw';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  attack: number;
  speed: number;
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
    minAttack: number;
    minSpeed: number;
  };
  offerMultiplier: number; // e.g., 1.2 for 20% over base price
  patience: number; // Transaction time limit in seconds
  personality: 'normal' | 'impatient' | 'picky'; // Affects timer and penalties
}
