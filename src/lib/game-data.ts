import type { Weapon, Customer, WeaponType } from './game-types';

export const initialWeapons: Weapon[] = [
  { id: 'w_s1', name: '기본 검', type: 'Sword', price: 20 },
  { id: 'w_s2', name: '기본 검', type: 'Sword', price: 20 },
  { id: 'w_s3', name: '기본 검', type: 'Sword', price: 20 },
  { id: 'w_a1', name: '기본 도끼', type: 'Axe', price: 25 },
  { id: 'w_a2', name: '기본 도끼', type: 'Axe', price: 25 },
  { id: 'w_a3', name: '기본 도끼', type: 'Axe', price: 25 },
  { id: 'w_b1', name: '기본 활', type: 'Bow', price: 30 },
  { id: 'w_b2', name: '기본 활', type: 'Bow', price: 30 },
  { id: 'w_b3', name: '기본 활', type: 'Bow', price: 30 },
];

export const allCustomers: Customer[] = [
    { 
        id: 'c1', name: '초보 모험가', sprite: 'Villager', requestText: "튼튼한 검 하나만 주세요!", wants: { type: 'Sword' }, offerMultiplier: 1.5, patience: 30, personality: 'normal',
        successDialogues: ["감사합니다. 정말 마음에 들어요!", "고마워요. 다음에도 꼭 올게요."],
        failDialogues: ["아, 이건 제가 찾던 게 아닌데요...", "다음에 다시 오겠습니다."]
    },
    { 
        id: 'c2', name: '성급한 산적', sprite: 'Rogue', requestText: "도끼! 아무 도끼나 빨리!", wants: { type: 'Axe' }, offerMultiplier: 1.8, patience: 10, personality: 'impatient',
        successDialogues: ["야, 이거 꽤 괜찮은데?", "오, 쓸만하군!"],
        failDialogues: ["뭐야, 장난해?", "에이, 시간 없는데!"]
    },
    { 
        id: 'c3', name: '엘프 정찰병', sprite: 'Villager', requestText: "혹시 활 가지고 계신가요?", wants: { type: 'Bow' }, offerMultiplier: 1.6, patience: 35, personality: 'normal',
        successDialogues: ["이런 물건은 처음이에요. 수고하셨습니다.", "훌륭하네요. 잘 쓰겠습니다."],
        failDialogues: ["흠, 제가 쓰기엔 좀...", "아쉽지만 어쩔 수 없죠."]
    },
    { 
        id: 'c4', name: '왕실 기사', sprite: 'Knight', requestText: "날렵한 레이피어를 찾고 있네.", wants: { type: 'Rapier' }, offerMultiplier: 2.0, patience: 40, personality: 'normal',
        successDialogues: ["충분히 튼튼하군. 잘 받았다.", "다음엔 검 좀 더 날카롭게 부탁하지."],
        failDialogues: ["기사의 명예에 걸맞지 않는군.", "이런 무기로는 전장에 나설 수 없네."]
    },
    { 
        id: 'c5', name: '드워프 전사', sprite: 'Rogue', requestText: "혹시 체인으로 된 무기는 없나?", wants: { type: 'Chain' }, offerMultiplier: 2.2, patience: 30, personality: 'normal',
        successDialogues: ["나쁘지 않군. 다음에도 기대하지.", "오호, 이 정도면 쓸만해."],
        failDialogues: ["내구도가 영... 별로군.", "이걸 쓰라고 만든 건가?"]
    },
    { 
        id: 'c6', name: '느긋한 마법사', sprite: 'Mage', requestText: "마법 스태프가 필요합니다. 천천히 보여주세요.", wants: { type: 'Magic Staff' }, offerMultiplier: 2.5, patience: 50, personality: 'normal',
        successDialogues: ["이 무기의 기운... 훌륭하군요.", "이 무기는 운명이 이끈 것이야."],
        failDialogues: ["마력이 느껴지지 않는군요...", "이런, 제게는 맞지 않는 것 같네요."]
    },
    { 
        id: 'c7', name: '그림자 암살자', sprite: 'Rogue', requestText: "손에 장착할 클로... 10초 주지.", wants: { type: 'Claw' }, offerMultiplier: 3.0, patience: 10, personality: 'impatient',
        successDialogues: ["흥, 그럭저럭 쓸만하군.", "이 정도면... 만족하지."],
        failDialogues: ["시간 낭비였군.", "실망스럽군."]
    },
    { 
        id: 'c8', name: '고대 유적 탐험가', sprite: 'Villager', requestText: "이 채찍, 꽤 쓸만해 보이는데... 더 좋은 건 없나?", wants: { type: 'Whip' }, offerMultiplier: 3.2, patience: 30, personality: 'normal',
        successDialogues: ["고마워~ 아저씨~!", "이거라면 탐험에 도움이 되겠어!"],
        failDialogues: ["이런 걸로는 유적의 위험에 대비할 수 없어.", "더 나은 건 없나?"]
    },
    { 
        id: 'c9', name: '사령술사', sprite: 'Mage', requestText: "영혼을 거두는 낫이 필요하다.", wants: { type: 'Scythe' }, offerMultiplier: 3.5, patience: 45, personality: 'normal',
        successDialogues: ["성역을 지킬 수 있겠군. 감사를 표하오.", "죽은 자들의 영혼이... 만족하는군."],
        failDialogues: ["이런 무기로는 영혼을 거둘 수 없다.", "그림자의 힘이 부족하군."]
    },
    { 
        id: 'c10', name: '왕궁 근위대장', sprite: 'Knight', requestText: "던질 수 있는 무기... 부메랑 같은 건 없나?", wants: { type: 'Boomerang' }, offerMultiplier: 3.3, patience: 30, personality: 'normal',
        successDialogues: ["임무에 도움이 될 것 같습니다. 수고하셨습니다!", "왕국을 위해 잘 쓰도록 하지."],
        failDialogues: ["이걸로 적을 제압할 수 있겠나?", "훈련용으로도 부족하군."]
    },
    { 
        id: 'c11', name: '수수께끼의 격투가', sprite: 'Rogue', requestText: "내 주먹보다 강한 클로가 있다면 보여줘.", wants: { type: 'Claw' }, offerMultiplier: 3.4, patience: 25, personality: 'normal',
        successDialogues: ["나쁘지 않군. 다음에도 기대하지.", "내 기술을 쓰기에 부족함이 없겠어."],
        failDialogues: ["내 주먹보다 약하군.", "맨손이 낫겠어."]
    },
    { 
        id: 'c12', name: '깐깐한 귀족', sprite: 'Knight', requestText: "내 품격에 맞는 무기는... 아주 찾기 어려울걸? 채찍이라도 보여주게.", wants: { type: 'Whip' }, offerMultiplier: 4.0, patience: 25, personality: 'picky',
        successDialogues: ["딱히 맘에 드는 건 아니지만, 괜찮네.", "흥, 이 정도면 봐줄만 하군."],
        failDialogues: ["내 품격에 어울리지 않아!", "이런 싸구려를 내게 팔려 하다니!"]
    },
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
