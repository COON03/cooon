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
    { id: 'c1', name: '초보 모험가', requestText: "빠르고 가벼운 검을 원해요!", wants: { type: 'Sword', minAttack: 4, minSpeed: 6 }, offerMultiplier: 1.5 },
    { id: 'c2', name: '산적 두목', requestText: "가장 강력한 도끼를 가져와!", wants: { type: 'Axe', minAttack: 7, minSpeed: 3 }, offerMultiplier: 1.8 },
    { id: 'c3', name: '엘프 정찰병', requestText: "신속하고 정확한 활이 필요해.", wants: { type: 'Bow', minAttack: 5, minSpeed: 8 }, offerMultiplier: 1.6 },
    { id: 'c4', name: '왕실 기사', requestText: "균형 잡힌 좋은 검을 찾고 있네.", wants: { type: 'Sword', minAttack: 10, minSpeed: 10 }, offerMultiplier: 2.0 },
    { id: 'c5', name: '드워프 전사', requestText: "묵직한 한 방이 있는 도끼는 없나?", wants: { type: 'Axe', minAttack: 15, minSpeed: 2 }, offerMultiplier: 2.2 },
    { id: 'c6', name: '그림자 암살자', requestText: "어둠 속에서 활시위를 당길 것이다.", wants: { type: 'Bow', minAttack: 12, minSpeed: 15 }, offerMultiplier: 2.5 },
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
