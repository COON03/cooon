export type WeaponType = 'Sword' | 'Axe' | 'Bow' | 'Scythe' | 'Spear' | 'Dagger' | 'Whip' | 'Claw';

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  attack: number;
  speed: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  requestText: string;
  wants: {
    type: WeaponType;
    minAttack: number;
    minSpeed: number;
  };
  offerMultiplier: number; // e.g., 1.2 for 20% over base price
}
