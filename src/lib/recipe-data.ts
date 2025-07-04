import type { WeaponType } from './game-types';

export interface Recipe {
  id: string;
  inputs: [WeaponType, WeaponType];
  output: {
    type: WeaponType;
    name: string;
    description: string;
    multiplier: number;
  };
  isRandom?: boolean;
  randomOutputs?: {
    type: WeaponType;
    name: string;
    multiplier: number;
  }[];
}

export const allRecipes: Recipe[] = [
  {
    id: 'recipe_scythe',
    inputs: ['Axe', 'Sword'],
    output: { 
      type: 'Scythe', 
      name: '영혼 수확의 낫',
      description: '도끼의 파괴력과 검의 예리함을 합친 무시무시한 무기.',
      multiplier: 1.8,
    },
  },
  {
    id: 'recipe_magic_staff',
    inputs: ['Bow', 'Sword'],
    output: { 
      type: 'Magic Staff',
      name: '신비한 마법 스태프',
      description: '활의 유연성과 검의 견고함이 만나 마력이 깃들었습니다.',
      multiplier: 2.2,
    },
  },
  {
    id: 'recipe_whip',
    inputs: ['Axe', 'Bow'],
    output: { 
      type: 'Whip',
      name: '가시 채찍',
      description: '도끼의 가시와 활의 탄력이 만나 유연하면서도 치명적인 무기가 되었습니다.',
      multiplier: 1.9,
    },
  },
  {
    id: 'recipe_rapier',
    inputs: ['Sword', 'Sword'],
    output: {
      type: 'Rapier',
      name: '결투용 레이피어',
      description: '두 검의 날카로움을 하나로 모아, 빠르고 정확한 찌르기에 특화되었습니다.',
      multiplier: 1.7,
    },
  },
  {
    id: 'recipe_boomerang',
    inputs: ['Bow', 'Bow'],
    output: {
      type: 'Boomerang',
      name: '마력 깃든 부메랑',
      description: '두 활의 탄성을 합쳐, 던지면 반드시 주인에게 돌아오는 신기한 무기.',
      multiplier: 1.7,
    },
  },
  {
    id: 'recipe_chain',
    inputs: ['Axe', 'Axe'],
    output: { 
      type: 'Chain', 
      name: '가시 사슬',
      description: '두 도끼의 육중함을 합쳐, 적을 속박하는 가시 사슬이 되었습니다.',
      multiplier: 1.8
    },
  }
];

export const findRecipe = (type1: WeaponType, type2: WeaponType): Recipe | undefined => {
    const sortedTypes = [type1, type2].sort().join(',');
    return allRecipes.find(r => r.inputs.sort().join(',') === sortedTypes);
};
