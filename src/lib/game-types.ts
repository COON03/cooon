export type WeaponType = 'Sword' | 'Axe' | 'Bow' | 'Scythe' | 'Magic Staff' | 'Chain' | 'Rapier' | 'Whip' | 'Boomerang' | 'Enhanced Sword' | 'Enhanced Axe' | 'Enhanced Bow';

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
  patience: number; // Transaction time limit in seconds
  personality: 'normal' | 'impatient' | 'picky' | 'special';
  successDialogues: string[];
  failDialogues: string[];
  impatientDialogues: string[];
  timeoutDialogues: string[];
  minDay?: number;
  rewardBonus?: { type: 'trust' | 'tip_chance' };
}

export type SkillId = 'ADD_GOLD' | 'ADD_HEART' | 'TIMER_BOOST' | 'REDUCE_BAD_CUSTOMERS';

export interface PassiveSkill {
  id: SkillId;
  title: string;
  description: string;
}
