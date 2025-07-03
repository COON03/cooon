import type { Weapon, Customer } from './game-types';

export const initialWeapons: Weapon[] = [
  { id: 'w1', name: '녹슨 검', type: 'Sword', attack: 5, speed: 7, price: 20 },
  { id: 'w2', name: '나무꾼의 도끼', type: 'Axe', attack: 8, speed: 4, price: 25 },
  { id: 'w3', name: '연습용 활', type: 'Bow', attack: 6, speed: 9, price: 30 },
  { id: 'w4', name: '낡은 단검', type: 'Sword', attack: 6, speed: 6, price: 22 },
  { id: 'w5', name: '이 빠진 손도끼', type: 'Axe', attack: 9, speed: 3, price: 28 },
  { id: 'w6', name: '부러진 단궁', type: 'Bow', attack: 5, speed: 10, price: 32 },
  { id: 'w7', name: '녹슨 검', type: 'Sword', attack: 5, speed: 7, price: 20 },
  { id: 'w8', name: '나무꾼의 도끼', type: 'Axe', attack: 8, speed: 4, price: 25 },
  { id: 'w9', name: '연습용 활', type: 'Bow', attack: 6, speed: 9, price: 30 },
];

export const allCustomers: Customer[] = [
    { id: 'c1', name: '초보 모험가', sprite: 'Villager', requestText: "빠르고 가벼운 검을 원해요!", wants: { type: 'Sword', minAttack: 4, minSpeed: 6 }, offerMultiplier: 1.5, patience: 30, personality: 'normal' },
    { id: 'c2', name: '성급한 산적', sprite: 'Rogue', requestText: "가장 강력한 도끼를 빨리 가져와!", wants: { type: 'Axe', minAttack: 7, minSpeed: 3 }, offerMultiplier: 1.8, patience: 10, personality: 'impatient' },
    { id: 'c3', name: '엘프 정찰병', sprite: 'Villager', requestText: "신속하고 정확한 활이 필요해.", wants: { type: 'Bow', minAttack: 5, minSpeed: 8 }, offerMultiplier: 1.6, patience: 35, personality: 'normal' },
    { id: 'c4', name: '왕실 기사', sprite: 'Knight', requestText: "균형 잡힌 좋은 검을 찾고 있네.", wants: { type: 'Sword', minAttack: 10, minSpeed: 10 }, offerMultiplier: 2.0, patience: 40, personality: 'normal' },
    { id: 'c5', name: '드워프 전사', sprite: 'Rogue', requestText: "묵직한 한 방이 있는 도끼는 없나?", wants: { type: 'Axe', minAttack: 15, minSpeed: 2 }, offerMultiplier: 2.2, patience: 30, personality: 'normal' },
    { id: 'c6', name: '느긋한 마법사', sprite: 'Mage', requestText: "마력이 깃든 활이 필요합니다. 천천히 보여주세요.", wants: { type: 'Bow', minAttack: 12, minSpeed: 15 }, offerMultiplier: 2.5, patience: 50, personality: 'normal' },
    { id: 'c7', name: '그림자 암살자', sprite: 'Rogue', requestText: "그림자처럼 빠른 단검... 10초 주지.", wants: { type: 'Dagger', minAttack: 18, minSpeed: 25 }, offerMultiplier: 3.0, patience: 10, personality: 'impatient' },
    { id: 'c8', name: '고대 유적 탐험가', sprite: 'Villager', requestText: "이 채찍, 꽤 쓸만해 보이는데... 더 좋은 건 없나?", wants: { type: 'Whip', minAttack: 15, minSpeed: 30 }, offerMultiplier: 3.2, patience: 30, personality: 'normal' },
    { id: 'c9', name: '사령술사', sprite: 'Mage', requestText: "영혼을 거두는 낫이 필요하다.", wants: { type: 'Scythe', minAttack: 25, minSpeed: 18 }, offerMultiplier: 3.5, patience: 45, personality: 'normal' },
    { id: 'c10', name: '왕궁 근위대장', sprite: 'Knight', requestText: "전장을 꿰뚫는 강력한 창을 원한다.", wants: { type: 'Spear', minAttack: 30, minSpeed: 20 }, offerMultiplier: 3.3, patience: 30, personality: 'normal' },
    { id: 'c11', name: '수수께끼의 격투가', sprite: 'Rogue', requestText: "내 주먹보다 강한 클로가 있다면 보여줘.", wants: { type: 'Claw', minAttack: 28, minSpeed: 22 }, offerMultiplier: 3.4, patience: 25, personality: 'normal' },
    { id: 'c12', name: '깐깐한 귀족', sprite: 'Knight', requestText: "내 품격에 맞는 무기는... 아주 찾기 어려울걸? 흠집이라도 있으면 안 되네.", wants: { type: 'Whip', minAttack: 25, minSpeed: 35 }, offerMultiplier: 4.0, patience: 25, personality: 'picky' },
];

export const generateNewItem = (day: number): Weapon => {
    const types: Weapon['type'][] = ['Sword', 'Axe', 'Bow'];
    const type = types[Math.floor(Math.random() * types.length)];
    const baseAttack = 3 + day * 2;
    const baseSpeed = 3 + day * 2;
    
    let name = '';
    let attack = 0;
    let speed = 0;

    switch(type) {
        case 'Sword':
            name = '평범한 롱소드';
            attack = baseAttack + Math.floor(Math.random() * 4);
            speed = baseSpeed + Math.floor(Math.random() * 4) + 2;
            break;
        case 'Axe':
            name = '전투 도끼';
            attack = baseAttack + Math.floor(Math.random() * 4) + 2;
            speed = baseSpeed + Math.floor(Math.random() * 4);
            break;
        case 'Bow':
            name = '사냥꾼의 활';
            attack = baseAttack + Math.floor(Math.random() * 4);
            speed = baseSpeed + Math.floor(Math.random() * 6);
            break;
    }

    return {
        id: `w_new_${Date.now()}_${Math.random()}`,
        name: `${name} #${day}`,
        type,
        attack,
        speed,
        price: Math.floor((attack + speed) * 2.5)
    };
};
