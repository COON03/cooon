import type { Weapon, Customer, WeaponType } from './game-types';

export const initialWeapons: Weapon[] = [
  { id: 'w1', name: '기본 검', type: 'Sword', price: 20 },
  { id: 'w2', name: '기본 도끼', type: 'Axe', price: 25 },
  { id: 'w3', name: '기본 활', type: 'Bow', price: 30 },
  { id: 'w4', name: '여분의 검', type: 'Sword', price: 20 },
];

export const allCustomers: Customer[] = [
    { id: 'c1', name: '초보 모험가', sprite: 'Villager', requestText: "튼튼한 검 하나만 주세요!", wants: { type: 'Sword' }, offerMultiplier: 1.5, patience: 30, personality: 'normal' },
    { id: 'c2', name: '성급한 산적', sprite: 'Rogue', requestText: "도끼! 아무 도끼나 빨리!", wants: { type: 'Axe' }, offerMultiplier: 1.8, patience: 10, personality: 'impatient' },
    { id: 'c3', name: '엘프 정찰병', sprite: 'Villager', requestText: "혹시 활 가지고 계신가요?", wants: { type: 'Bow' }, offerMultiplier: 1.6, patience: 35, personality: 'normal' },
    { id: 'c4', name: '왕실 기사', sprite: 'Knight', requestText: "날렵한 레이피어를 찾고 있네.", wants: { type: 'Rapier' }, offerMultiplier: 2.0, patience: 40, personality: 'normal' },
    { id: 'c5', name: '드워프 전사', sprite: 'Rogue', requestText: "혹시 체인으로 된 무기는 없나?", wants: { type: 'Chain' }, offerMultiplier: 2.2, patience: 30, personality: 'normal' },
    { id: 'c6', name: '느긋한 마법사', sprite: 'Mage', requestText: "마법 스태프가 필요합니다. 천천히 보여주세요.", wants: { type: 'Magic Staff' }, offerMultiplier: 2.5, patience: 50, personality: 'normal' },
    { id: 'c7', name: '그림자 암살자', sprite: 'Rogue', requestText: "손에 장착할 클로... 10초 주지.", wants: { type: 'Claw' }, offerMultiplier: 3.0, patience: 10, personality: 'impatient' },
    { id: 'c8', name: '고대 유적 탐험가', sprite: 'Villager', requestText: "이 채찍, 꽤 쓸만해 보이는데... 더 좋은 건 없나?", wants: { type: 'Whip' }, offerMultiplier: 3.2, patience: 30, personality: 'normal' },
    { id: 'c9', name: '사령술사', sprite: 'Mage', requestText: "영혼을 거두는 낫이 필요하다.", wants: { type: 'Scythe' }, offerMultiplier: 3.5, patience: 45, personality: 'normal' },
    { id: 'c10', name: '왕궁 근위대장', sprite: 'Knight', requestText: "던질 수 있는 무기... 부메랑 같은 건 없나?", wants: { type: 'Boomerang' }, offerMultiplier: 3.3, patience: 30, personality: 'normal' },
    { id: 'c11', name: '수수께끼의 격투가', sprite: 'Rogue', requestText: "내 주먹보다 강한 클로가 있다면 보여줘.", wants: { type: 'Claw' }, offerMultiplier: 3.4, patience: 25, personality: 'normal' },
    { id: 'c12', name: '깐깐한 귀족', sprite: 'Knight', requestText: "내 품격에 맞는 무기는... 아주 찾기 어려울걸? 채찍이라도 보여주게.", wants: { type: 'Whip' }, offerMultiplier: 4.0, patience: 25, personality: 'picky' },
];

export const generateNewItem = (day: number, type: 'Sword' | 'Axe' | 'Bow'): Weapon => {
    
    let name = '';
    let price = 0;

    switch(type) {
        case 'Sword':
            name = '보급용 검';
            price = 20 + day * 2;
            break;
        case 'Axe':
            name = '보급용 도끼';
            price = 25 + day * 2;
            break;
        case 'Bow':
            name = '보급용 활';
            price = 30 + day * 2;
            break;
    }

    return {
        id: `w_new_${type}_${Date.now()}_${Math.random()}`,
        name: `${name}`,
        type: type,
        price: Math.floor(price)
    };
};
