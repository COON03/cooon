import type { WeaponType } from './game-types';

export interface Recipe {
  id: string;
  inputs: WeaponType[];
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
  },
  {
    id: 'recipe_enhanced_sword',
    inputs: ['Sword', 'Sword', 'Sword'],
    output: {
        type: 'Enhanced Sword',
        name: '대가의 검',
        description: '세 자루의 검을 하나로 합쳐, 비교할 수 없는 예리함을 지녔습니다.',
        multiplier: 3.5
    }
  },
  {
    id: 'recipe_enhanced_axe',
    inputs: ['Axe', 'Axe', 'Axe'],
    output: {
        type: 'Enhanced Axe',
        name: '파괴자의 도끼',
        description: '세 자루의 도끼를 하나로 합쳐, 모든 것을 부술 듯한 파괴력을 가집니다.',
        multiplier: 3.2
    }
  },
  {
    id: 'recipe_enhanced_bow',
    inputs: ['Bow', 'Bow', 'Bow'],
    output: {
        type: 'Enhanced Bow',
        name: '천리안의 활',
        description: '세 개의 활을 하나로 합쳐, 시야 끝의 적도 꿰뚫을 수 있습니다.',
        multiplier: 3.0
    }
  }
];

export const findRecipe = (types: WeaponType[]): Recipe | undefined => {
    const sortedTypes = [...types].sort().join(',');
    if (sortedTypes.length === 0) return undefined;
    return allRecipes.find(r => [...r.inputs].sort().join(',') === sortedTypes);
};
