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

const politeTimeoutDialogues = [
    "이번엔 인연이 아니었나 봐요. 다음에 또 올게요.",
    "사정이 있으셨겠죠. 괜찮아요. 좋은 하루 되세요.",
    "준비가 되면 다시 찾아뵐게요. 그때는 꼭 거래하길 바라요."
];

const coldTimeoutDialogues = [
    "흥. 괜히 시간만 낭비했군.",
    "다음엔 좀 더 제대로 준비해 두도록.",
    "이런 식이면 오래 못 버틸 텐데… 알아서 해."
];

const cheerfulRudeTimeoutDialogues = [
    "뭐야~ 오늘 장사 망했네? 하하!",
    "이 가게, 대충하네~ 다음엔 좀 제대로 해봐!",
    "오케이~ 못 산 건 아쉽지만, 재밌었어! 다음에 또 와볼게~"
];

const mageTimeoutDialogues = [
    "별들이 거래를 반기지 않는군요… 때를 다시 보죠.",
    "신의 뜻이 아니었던 모양입니다. 물러가겠습니다.",
    "흐름이 어긋났군요… 다시 정돈되면 찾아오리다."
];

const knightTimeoutDialogues = [
    "명령 철회. 다음 기회에 다시 시도하겠다.",
    "무장 해제. 임무는 다음으로 미룬다.",
    "지금은 때가 아니군. 퇴각한다."
];

export const allCustomers: Customer[] = [
    { 
        id: 'c1', name: '초보 모험가', sprite: 'Villager', requestText: "튼튼한 검 하나만 주세요!", wants: { type: 'Sword' }, offerMultiplier: 1.5, patience: 30, personality: 'normal',
        successDialogues: ["감사합니다. 정말 마음에 들어요!", "고마워요. 다음에도 꼭 올게요."],
        failDialogues: ["아, 이건 제가 찾던 게 아닌데요...", "다음에 다시 오겠습니다."],
        impatientDialogues: ["죄송하지만… 아직 오래 걸릴까요?", "시간이 조금 촉박해서요… 부탁드릴게요.", "혹시 곧 준비되시나요?"],
        timeoutDialogues: politeTimeoutDialogues
    },
    { 
        id: 'c2', name: '성급한 산적', sprite: 'Rogue', requestText: "도끼! 아무 도끼나 빨리!", wants: { type: 'Axe' }, offerMultiplier: 1.8, patience: 10, personality: 'impatient',
        successDialogues: ["크하하! 이걸로 두들겨 팰 생각에 신나는군!", "좋아! 이걸로 당장 써먹어주지!"],
        failDialogues: ["뭐야, 장난해?", "에이, 시간 없는데!"],
        impatientDialogues: ["아직도야? 나 늙겠어~!", "아저씨, 나 졸리다구~!", "지금 자고 있어요~? 빨리요 빨리~!"],
        timeoutDialogues: cheerfulRudeTimeoutDialogues
    },
    { 
        id: 'c3', name: '엘프 정찰병', sprite: 'Villager', requestText: "혹시 활 가지고 계신가요?", wants: { type: 'Bow' }, offerMultiplier: 1.6, patience: 35, personality: 'normal',
        successDialogues: ["이런 물건은 처음이에요. 수고하셨습니다.", "훌륭하네요. 잘 쓰겠습니다."],
        failDialogues: ["흠, 제가 쓰기엔 좀...", "아쉽지만 어쩔 수 없죠."],
        impatientDialogues: ["죄송하지만… 아직 오래 걸릴까요?", "시간이 조금 촉박해서요… 부탁드릴게요."],
        timeoutDialogues: politeTimeoutDialogues
    },
    { 
        id: 'c4', name: '왕실 기사', sprite: 'Knight', requestText: "날렵한 레이피어를 찾고 있네.", wants: { type: 'Rapier' }, offerMultiplier: 2.0, patience: 40, personality: 'normal',
        successDialogues: ["충분히 튼튼하군. 잘 받았다.", "다음엔 검 좀 더 날카롭게 부탁하지."],
        failDialogues: ["기사의 명예에 걸맞지 않는군.", "이런 무기로는 전장에 나설 수 없네."],
        impatientDialogues: ["임무 시간 초과 중이다!", "늦는 건 허락되지 않는다. 지금 당장!", "이런 식으로 전장에 나가겠나?"],
        timeoutDialogues: knightTimeoutDialogues
    },
    { 
        id: 'c5', name: '드워프 전사', sprite: 'Rogue', requestText: "혹시 체인으로 된 무기는 없나?", wants: { type: 'Chain' }, offerMultiplier: 2.2, patience: 30, personality: 'normal',
        successDialogues: ["대장장이 솜씨가 제법이군. 인정하지.", "이걸로 트롤 대가리를 깨부술 수 있겠어."],
        failDialogues: ["내구도가 영... 별로군.", "이걸 쓰라고 만든 건가?"],
        impatientDialogues: ["이 정도도 못 맞추나?", "느려. 시간은 금이야.", "얼른 좀 해줄 수 없나?"],
        timeoutDialogues: coldTimeoutDialogues
    },
    { 
        id: 'c6', name: '느긋한 마법사', sprite: 'Mage', requestText: "마법 스태프가 필요합니다. 천천히 보여주세요.", wants: { type: 'Magic Staff' }, offerMultiplier: 2.5, patience: 50, personality: 'normal',
        successDialogues: ["이 무기의 기운... 훌륭하군요.", "이 무기는 운명이 이끈 것이야."],
        failDialogues: ["마력이 느껴지지 않는군요...", "이런, 제게는 맞지 않는 것 같네요."],
        impatientDialogues: ["시간이 이탈하고 있군… 서두르시게.", "운명은 기다려주지 않소. 재촉하리다!", "나의 인내도 무한하진 않다네."],
        timeoutDialogues: mageTimeoutDialogues
    },
    { 
        id: 'c8', name: '고대 유적 탐험가', sprite: 'Villager', requestText: "이 채찍, 꽤 쓸만해 보이는데... 더 좋은 건 없나?", wants: { type: 'Whip' }, offerMultiplier: 3.2, patience: 30, personality: 'normal',
        successDialogues: ["이야, 이거 물건이네요! 탐험에 딱이겠어요!", "이걸로 어떤 유적이든 문제 없겠어요!"],
        failDialogues: ["이런 걸로는 유적의 위험에 대비할 수 없어.", "더 나은 건 없나?"],
        impatientDialogues: ["아직도야? 나 늙겠어~!", "시간이 조금 촉박해서요… 부탁드릴게요.", "혹시 곧 준비되시나요?"],
        timeoutDialogues: politeTimeoutDialogues
    },
    { 
        id: 'c9', name: '사령술사', sprite: 'Mage', requestText: "영혼을 거두는 낫이 필요하다.", wants: { type: 'Scythe' }, offerMultiplier: 3.5, patience: 45, personality: 'normal',
        successDialogues: ["죽은 자들의 영혼이... 만족하는군.", "이걸로 내 군단을 더 강하게 만들 수 있겠군."],
        failDialogues: ["이런 무기로는 영혼을 거둘 수 없다.", "그림자의 힘이 부족하군."],
        impatientDialogues: ["시간이 이탈하고 있군… 서두르시게.", "나의 인내도 무한하진 않다네.", "영혼들이 기다리고 있다..."],
        timeoutDialogues: mageTimeoutDialogues
    },
    { 
        id: 'c10', name: '왕궁 근위대장', sprite: 'Knight', requestText: "던질 수 있는 무기... 부메랑 같은 건 없나?", wants: { type: 'Boomerang' }, offerMultiplier: 3.3, patience: 30, personality: 'normal',
        successDialogues: ["임무에 도움이 될 것 같습니다. 수고하셨습니다!", "왕국을 위해 잘 쓰도록 하지."],
        failDialogues: ["이걸로 적을 제압할 수 있겠나?", "훈련용으로도 부족하군."],
        impatientDialogues: ["임무 시간 초과 중이다!", "늦는 건 허락되지 않는다. 지금 당장!"],
        timeoutDialogues: knightTimeoutDialogues
    },
    { 
        id: 'c12', name: '깐깐한 귀족', sprite: 'Knight', requestText: "내 품격에 맞는 무기는... 아주 찾기 어려울걸? 채찍이라도 보여주게.", wants: { type: 'Whip' }, offerMultiplier: 4.0, patience: 25, personality: 'picky',
        successDialogues: ["딱히 맘에 드는 건 아니지만, 괜찮네.", "흥, 이 정도면 봐줄만 하군."],
        failDialogues: ["내 품격에 어울리지 않아!", "이런 싸구려를 내게 팔려 하다니!"],
        impatientDialogues: ["내 시간을 낭비하지 말게.", "언제까지 기다려야 하는 건가?", "이 가게, 소문보다 별로군."],
        timeoutDialogues: coldTimeoutDialogues
    },
    { 
        id: 'c_special1', name: '기사단장', sprite: 'Knight', requestText: "왕국 최고의 검을 가져오게.", wants: { type: 'Enhanced Sword' }, offerMultiplier: 1, patience: 25, personality: 'special',
        successDialogues: ["이 무기라면 내 기사들을 맡겨도 되겠군."],
        failDialogues: ["이런 걸로 왕국을 지킬 수 있겠나.", "실망스럽군."],
        impatientDialogues: ["시간이 없네. 서두르게.", "왕국이 기다리고 있다."],
        timeoutDialogues: knightTimeoutDialogues,
        minDay: 5,
    },
    {
        id: 'c_special2', name: '전설의 사냥꾼', sprite: 'Villager', requestText: "최고의 활이 필요하네. 마지막 사냥을 위해.", wants: { type: 'Enhanced Bow' }, offerMultiplier: 1, patience: 20, personality: 'special',
        successDialogues: ["이 활... 마지막 사냥에 쓰기 딱이군."],
        failDialogues: ["이걸로는 전설의 짐승을 상대할 수 없어.", "더 기다릴 수 없네."],
        impatientDialogues: ["바람이 멈추기 전에...", "해는 지고 있네."],
        timeoutDialogues: politeTimeoutDialogues,
        minDay: 5,
        rewardBonus: { type: 'tip_chance' }
    },
    { 
        id: 'c_special3', name: '광전사 베르단', sprite: 'Rogue', requestText: "더 강한 도끼... 모든 걸 부술 도끼...!", wants: { type: 'Enhanced Axe' }, offerMultiplier: 1, patience: 15, personality: 'special',
        successDialogues: ["좋아. 이 도끼로 모든 걸 박살내겠어."],
        failDialogues: ["약하다! 이것론 부족해!", "크아아! 시간이 없다!"],
        impatientDialogues: ["빨리! 더 빨리!", "피가 끓어오른다!"],
        timeoutDialogues: cheerfulRudeTimeoutDialogues,
        minDay: 5,
        rewardBonus: { type: 'trust' }
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
