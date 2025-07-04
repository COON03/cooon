import type { PassiveSkill } from './game-types';

export const allSkills: PassiveSkill[] = [
  {
    id: 'ADD_GOLD',
    title: '비상금',
    description: '즉시 100 골드를 획득합니다.',
  },
  {
    id: 'ADD_HEART',
    title: '격려',
    description: '최대 신뢰도와 현재 신뢰도가 1 증가합니다.',
  },
  {
    id: 'TIMER_BOOST',
    title: '여유',
    description: '손님들의 거래 제한 시간이 영구적으로 5% 증가합니다.',
  },
  {
    id: 'REDUCE_BAD_CUSTOMERS',
    title: '평판 상승',
    description: '성격이 급하거나 까다로운 손님의 등장 확률이 감소합니다.',
  },
];
