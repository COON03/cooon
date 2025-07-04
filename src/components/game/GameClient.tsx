'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initialWeapons, allCustomers, generateNewItem } from '@/lib/game-data';
import type { Weapon, Customer, WeaponType, PassiveSkill } from '@/lib/game-types';
import Header from './Header';
import CustomerArea from './CustomerArea';
import InventoryArea from './InventoryArea';
import EndGameDialog from './EndGameDialog';
import RecipeBook from './RecipeBook';
import { findRecipe, allRecipes, type Recipe } from '@/lib/recipe-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Book, Home } from 'lucide-react';
import { WeaponIcon } from './WeaponIcon';
import { Card } from '../ui/card';
import PassiveSkillDialog from './PassiveSkillDialog';
import { allSkills } from '@/lib/skill-data';

const DAILY_TARGETS = [0, 390, 520, 650, 900, 1170, 1550, 1940]; // Day 0 is unused
const MAX_DAYS = 7;
const INITIAL_LIVES = 3;
const CUSTOMER_TIMER_DEFAULT = 30;

const getRandomDialogue = (dialogues: string[] | undefined, defaultMessage: string): string => {
  if (!dialogues || dialogues.length === 0) return defaultMessage;
  return dialogues[Math.floor(Math.random() * dialogues.length)];
};

interface GameClientProps {
  onReturnToTitle: () => void;
  onGameWon: () => void;
}

export default function GameClient({ onReturnToTitle, onGameWon }: GameClientProps) {
  const [day, setDay] = useState(1);
  const [gold, setGold] = useState(0);
  const [cumulativeRevenue, setCumulativeRevenue] = useState(0);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  
  const [workshopSlots, setWorkshopSlots] = useState<(Weapon | null)[]>([null, null, null]);

  const [lives, setLives] = useState(INITIAL_LIVES);
  const [maxLives, setMaxLives] = useState(INITIAL_LIVES);
  const [customerTimer, setCustomerTimer] = useState(CUSTOMER_TIMER_DEFAULT);
  const [gameStarted, setGameStarted] = useState(false);
  
  const [departingInfo, setDepartingInfo] = useState<{ id: string; message: string; status: 'success' | 'fail' } | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const [discoveredRecipes, setDiscoveredRecipes] = useState<Set<string>>(new Set());
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState(false);
  
  const [combinationPreview, setCombinationPreview] = useState<{
    name: string;
    type: WeaponType | 'Random';
  } | null>(null);

  // Passive skill states
  const [isSkillSelectionOpen, setIsSkillSelectionOpen] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<PassiveSkill[]>([]);
  const [timerBonus, setTimerBonus] = useState(1.0);
  const [badCustomerRate, setBadCustomerRate] = useState(1.0);
  const [impatientDialogue, setImpatientDialogue] = useState<string | null>(null);
  const [isDayCleared, setIsDayCleared] = useState(false);
  const [lastServedCustomer, setLastServedCustomer] = useState<Customer | null>(null);
  const [servedCustomersCount, setServedCustomersCount] = useState(0);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isUpdatingInventory = useRef(false);

  const { toast } = useToast();

  const activeCustomer = customers.length > 0 ? customers[0] : null;
  const selectedCount = workshopSlots.filter(Boolean).length;
  const currentTargetGold = DAILY_TARGETS[day] || DAILY_TARGETS[MAX_DAYS];

  let dayPenalty = 1.0;
  if (day >= 4) {
    dayPenalty = 1.0 - (day - 3) * 0.05; // Day 4: 0.95, Day 5: 0.9, Day 6: 0.85, Day 7: 0.8
  }

  const sortedInventory = React.useMemo(() => {
    const getFamily = (type: WeaponType): string => {
        if (['Sword', 'Rapier', 'Enhanced Sword'].includes(type)) return 'Sword';
        if (['Bow', 'Boomerang', 'Enhanced Bow'].includes(type)) return 'Bow';
        if (['Axe', 'Chain', 'Enhanced Axe'].includes(type)) return 'Axe';
        return 'Other';
    };

    const familySortOrder = ['Sword', 'Bow', 'Axe', 'Other'];
    const typeSortOrder: WeaponType[] = ['Sword', 'Rapier', 'Enhanced Sword', 'Bow', 'Boomerang', 'Enhanced Bow', 'Axe', 'Chain', 'Enhanced Axe', 'Scythe', 'Whip', 'Magic Staff'];

    return [...inventory].sort((a, b) => {
        const familyA = getFamily(a.type);
        const familyB = getFamily(b.type);

        const familyAIndex = familySortOrder.indexOf(familyA);
        const familyBIndex = familySortOrder.indexOf(familyB);

        if (familyAIndex !== familyBIndex) return familyAIndex - familyBIndex;
        
        const typeAIndex = typeSortOrder.indexOf(a.type);
        const typeBIndex = typeSortOrder.indexOf(b.type);
        if (typeAIndex !== typeBIndex) return typeAIndex - typeBIndex;

        const nameCompare = a.name.localeCompare(b.name);
        if (nameCompare !== 0) return nameCompare;
        
        return a.price - b.price;
    });
  }, [inventory]);

  const playTickSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const oscillator = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(1000, audioCtxRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioCtxRef.current.currentTime + 0.15);
  }, []);

  const playBellSound = useCallback(() => {
    if (!audioCtxRef.current) return;
    const time = audioCtxRef.current.currentTime;
    const osc1 = audioCtxRef.current.createOscillator();
    const gain1 = audioCtxRef.current.createGain();
    osc1.connect(gain1);
    gain1.connect(audioCtxRef.current.destination);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, time);
    gain1.gain.setValueAtTime(0.3, time);
    gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    const osc2 = audioCtxRef.current.createOscillator();
    const gain2 = audioCtxRef.current.createGain();
    osc2.connect(gain2);
    gain2.connect(audioCtxRef.current.destination);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1500, time + 0.1);
    gain2.gain.setValueAtTime(0.2, time + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

    osc1.start(time);
    osc1.stop(time + 0.5);
    osc2.start(time + 0.1);
    osc2.stop(time + 0.6);
  }, []);

  const fetchCustomers = useCallback(() => {
    const customersPerDay = [0, 15, 18, 22, 26, 30, 34, 40];
    const numCustomers = customersPerDay[day] || 40;

    const availableCustomers = allCustomers.filter(c => !c.minDay || c.minDay <= day);
    const specialCustomers = availableCustomers.filter(c => c.personality === 'special');
    const normalCustomers = availableCustomers.filter(c => c.personality !== 'special');

    let potentialPool: Customer[] = [];

    if (day === 1) {
      // Day 1: Adjust Rapier customer ratio to ~20%
      const rapierCustomer = normalCustomers.find(c => c.wants.type === 'Rapier');
      const otherCustomers = normalCustomers.filter(c => c.wants.type !== 'Rapier');

      potentialPool = [...otherCustomers];
      if (otherCustomers.length > 0) {
        // We add one more non-rapier customer to achieve a 4:1 ratio (20%).
        // On day 1, there are 3 other customer types, so adding one more makes it 4.
        potentialPool.push(otherCustomers[Math.floor(Math.random() * otherCustomers.length)]);
      }
      
      if (rapierCustomer) {
        potentialPool.push(rapierCustomer);
      }
    } else {
        potentialPool = [...normalCustomers];
        if (normalCustomers.length > 0) {
          const difficultCustomers = normalCustomers.filter(c => c.personality !== 'normal' || ['Scythe', 'Magic Staff', 'Chain', 'Rapier', 'Whip', 'Boomerang'].includes(c.wants.type));
          if (difficultCustomers.length > 0) {
            const difficultyMultiplier = day >= 4 ? 1.5 : 1.0;
            const difficultCustomersToAdd = Math.max(1, Math.floor((day - 1) * badCustomerRate * difficultyMultiplier));
            for (let i = 0; i < difficultCustomersToAdd; i++) {
                potentialPool.push(...difficultCustomers);
            }
          }
        }
    }

    const todaysCustomers: Customer[] = [];
    if (potentialPool.length > 0) {
      // Generate the list of customers for the day from the normal pool
      for (let i = 0; i < numCustomers; i++) {
        todaysCustomers.push(potentialPool[Math.floor(Math.random() * potentialPool.length)]);
      }
    }

    // From day 5, ensure at least one special customer is placed in the middle of the queue.
    if (day >= 5 && specialCustomers.length > 0 && todaysCustomers.length > 0) {
        if (!todaysCustomers.some(c => c.personality === 'special')) {
          const randomSpecialCustomer = specialCustomers[Math.floor(Math.random() * specialCustomers.length)];
          
          // Place the special customer somewhere in the middle half of the day's queue
          const queueLength = todaysCustomers.length;
          // e.g. for 20 customers, from index 5 to 14.
          const startRange = Math.floor(queueLength * 0.25);
          const range = Math.floor(queueLength * 0.5);
          const insertionIndex = startRange + Math.floor(Math.random() * range);

          // Replace a customer at that index.
          todaysCustomers[insertionIndex] = randomSpecialCustomer;
        }
    }
    
    setCustomers(c => {
      const newCustomers = todaysCustomers.map(cust => ({...cust, id: `${cust.id}_${Math.random()}`}));
      if (newCustomers.length > 0 && c.length === 0) {
        playBellSound();
      }
      return [...c, ...newCustomers];
    });

  }, [day, playBellSound, badCustomerRate]);
  
  const startNewDay = useCallback((startingGold: number) => {
    const nextDay = day + 1;
    setDay(nextDay);
    setGold(startingGold);
    
    toast({ 
        title: `제 ${nextDay}일`, 
        description: "새로운 하루가 시작되었습니다." 
    });
    
    setWorkshopSlots([null, null, null]);
    setIsDayCleared(false);
    
    // Using a timeout to ensure state updates before fetching new customers.
    setTimeout(() => {
        fetchCustomers();
    }, 100);

  }, [day, toast, fetchCustomers]);

  const handleNextDay = useCallback(() => {
    if (gold < currentTargetGold) {
      setGameState('lost');
      return;
    }

    if (day >= MAX_DAYS) {
      setGameState('won');
      onGameWon();
      return;
    }
    
    // Open skill selection
    let skillPool = [...allSkills];
    if (maxLives >= 5) {
      skillPool = skillPool.filter(skill => skill.id !== 'ADD_HEART');
    }
    const shuffledSkills = skillPool.sort(() => 0.5 - Math.random());
    setAvailableSkills(shuffledSkills.slice(0, 3));
    setIsSkillSelectionOpen(true);

  }, [day, gold, currentTargetGold, onGameWon, maxLives]);

  const handleSelectSkill = useCallback((skill: PassiveSkill) => {
    setIsSkillSelectionOpen(false);

    let startingGoldForNextDay = 0;

    switch (skill.id) {
      case 'ADD_GOLD':
        startingGoldForNextDay += 100;
        toast({ title: "스킬 획득!", description: skill.description });
        break;
      case 'ADD_HEART':
        if (maxLives < 5) {
            setMaxLives(l => l + 1);
            setLives(l => l + 1);
        }
        toast({ title: "스킬 획득!", description: skill.description });
        break;
      case 'TIMER_BOOST':
        setTimerBonus(b => b + 0.05);
        toast({ title: "스킬 획득!", description: skill.description });
        break;
      case 'REDUCE_BAD_CUSTOMERS':
        setBadCustomerRate(r => Math.max(0.5, r - 0.25));
        toast({ title: "스킬 획득!", description: skill.description });
        break;
    }
    
    startNewDay(startingGoldForNextDay);

  }, [startNewDay, toast, maxLives]);

  const resetGame = useCallback(() => {
    setDay(1);
    setGold(0);
    setCumulativeRevenue(0);
    setLives(INITIAL_LIVES);
    setMaxLives(INITIAL_LIVES);
    setTimerBonus(1.0);
    setBadCustomerRate(1.0);
    setInventory([...initialWeapons]);
    setCustomers([]);
    setGameState('playing');
    setWorkshopSlots([null, null, null]);
    setIsDayCleared(false);
    setDiscoveredRecipes(new Set());
    setLastServedCustomer(null);
    setServedCustomersCount(0);
    // Fetch initial customers
    setTimeout(() => fetchCustomers(), 100);
  }, [fetchCustomers]);

  const handleSell = () => {
    const selectedItems = workshopSlots.filter(Boolean) as Weapon[];
    if (selectedItems.length !== 1 || !activeCustomer || isInteracting) return;

    setIsInteracting(true);
    const weapon = selectedItems[0];
    const customer = customers[0];

    if (!weapon || !customer) {
        setIsInteracting(false);
        return;
    }
    
    setLastServedCustomer(customer);

    const meetsReqs = weapon.type === customer.wants.type;
    const bonus = customer.rewardBonus;

    if (meetsReqs) {
      const salePrice = weapon.price;
      let totalGain = salePrice;
      
      const wasNotImpatient = impatientDialogue === null;
      const tipChance = 0.07 + (bonus?.type === 'tip_chance' ? 0.43 : 0);
      const isTipping = wasNotImpatient && Math.random() < tipChance;
      let tipAmount = 0;

      if (isTipping) {
        tipAmount = Math.floor(Math.random() * 41) + 10; // 10 to 50
        totalGain += tipAmount;
      }

      const newGold = gold + totalGain;
      setGold(newGold);
      setCumulativeRevenue(rev => rev + totalGain);
      setInventory(inventory.filter(w => w.id !== weapon.id));
      playBellSound();
      
      if (bonus?.type === 'trust') {
          setLives(l => Math.min(maxLives, l + 1));
          toast({ title: "특별한 거래! ❤️", description: "거래에 만족한 손님이 신뢰도를 높여주었습니다!" });
      }

      if(isTipping) {
        toast({ 
          title: "특별한 거래! 💰", 
          description: `${weapon.name} 판매와 함께 팁으로 ${tipAmount}G를 받았습니다!`
        });
      } else {
        toast({ 
          title: "거래 성공!", 
          description: `${weapon.name}을(를) ${salePrice}골드에 판매했습니다.` 
        });
      }
      
      const message = getRandomDialogue(customer.successDialogues, "이거 좋군! 고맙네.");
      setDepartingInfo({ id: customer.id, message, status: 'success' });

      if (newGold >= currentTargetGold) {
        setIsDayCleared(true);
      }
    } else {
      setLives(l => Math.max(0, l - 1));
      toast({ variant: "destructive", title: "거래 실패!", description: `손님의 요구에 맞지 않아 신뢰도가 1 감소합니다.` });
      
      const message = getRandomDialogue(customer.failDialogues, "흠, 이건 내가 찾던 게 아니야.");
      setDepartingInfo({ id: customer.id, message, status: 'fail' });
    }
    setWorkshopSlots([null, null, null]);

    setTimeout(() => {
        setServedCustomersCount(prev => prev + 1);
        setCustomers(c => c.slice(1));
        setDepartingInfo(null);
        setIsInteracting(false);
    }, 1200);
  };
  
  const handleCombine = () => {
    const selectedItems = workshopSlots.filter(Boolean) as Weapon[];
    if (selectedItems.length < 2) {
      toast({ variant: "destructive", title: "조합 실패", description: "무기를 2개 이상 선택해주세요." });
      return;
    }
    
    const types = selectedItems.map(w => w.type);
    const recipe = findRecipe(types);
    
    if (recipe) {
        const selectedIds = selectedItems.map(w => w.id);
        const lastItem = selectedItems[selectedItems.length - 1];
        const insertionIndex = inventory.findIndex(w => w.id === lastItem.id);
        if (insertionIndex === -1) return;

        let inventoryAfterRemoval = inventory.filter(w => !selectedIds.includes(w.id));
      
        let newWeaponData: { name: string, type: WeaponType, multiplier: number };
        const basePrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

        if (recipe.isRandom && recipe.randomOutputs) {
            newWeaponData = recipe.randomOutputs[Math.floor(Math.random() * recipe.randomOutputs.length)];
        } else {
            newWeaponData = recipe.output;
        }
      
        const finalWeapon: Weapon = { 
            id: `w_rare_${Date.now()}`, 
            name: newWeaponData.name, 
            type: newWeaponData.type, 
            price: Math.floor(basePrice * newWeaponData.multiplier) 
        };

        inventoryAfterRemoval.splice(insertionIndex, 0, finalWeapon);
        setInventory(inventoryAfterRemoval);

        toast({ title: "희귀 무기 조합 성공!", description: `새로운 무기 '${finalWeapon.name}' (${finalWeapon.type})이(가) 탄생했습니다!` });
      
        if (!discoveredRecipes.has(recipe.id)) {
            setDiscoveredRecipes(prev => new Set(prev).add(recipe.id));
        }
        setWorkshopSlots([finalWeapon, null, null]);
    } else {
      toast({ variant: "destructive", title: "조합 불가", description: "알 수 없는 조합입니다. 다른 무기를 선택해주세요." });
    }
  };

  const handleClearWorkshop = () => {
    setWorkshopSlots([null, null, null]);
  };
  
  const handleSelectInventory = (id: string) => {
    const clickedItem = inventory.find(w => w.id === id);
    if (!clickedItem) return;

    const slotIndex = workshopSlots.findIndex(s => s?.id === id);

    if (slotIndex > -1) {
        const newSlots = [...workshopSlots];
        newSlots[slotIndex] = null;
        setWorkshopSlots(newSlots);
    } else {
        const emptySlotIndex = workshopSlots.findIndex(s => s === null);
        if (emptySlotIndex !== -1) {
            const newSlots = [...workshopSlots];
            newSlots[emptySlotIndex] = clickedItem;
            setWorkshopSlots(newSlots);
        } else {
            toast({ variant: "destructive", title: "조합 슬롯이 꽉 찼습니다", description: "최대 3개의 무기만 선택할 수 있습니다." });
        }
    }
  };

  useEffect(() => {
    if (!gameStarted) {
      resetGame();
      setGameStarted(true);
    }
  }, [gameStarted, resetGame]);

  useEffect(() => {
    const selectedItems = workshopSlots.filter(Boolean) as Weapon[];
    if (selectedItems.length >= 2) {
      const types = selectedItems.map(w => w.type);
      const recipe = findRecipe(types);
      if (recipe) {
        if (recipe.isRandom) {
          setCombinationPreview({ name: '랜덤 무기', type: 'Random' });
        } else {
          setCombinationPreview(recipe.output);
        }
      } else {
        setCombinationPreview(null);
      }
    } else {
      setCombinationPreview(null);
    }
  }, [workshopSlots]);

  useEffect(() => {
    const initAudio = () => {
        if (!audioCtxRef.current) {
            try {
              audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
              console.error("Web Audio API is not supported in this browser");
            }
        }
        window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setImpatientDialogue(null); // Reset for new customer

    if (activeCustomer && gameState === 'playing' && !isInteracting && !isDayCleared) {
      const patience = Math.floor(activeCustomer.patience * timerBonus * dayPenalty);
      setCustomerTimer(patience);

      timerIntervalRef.current = setInterval(() => {
        setCustomerTimer(prev => {
          const newTimerValue = prev - 1;

          if (newTimerValue <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            playBellSound();
            
            setLastServedCustomer(activeCustomer);
            
            setIsInteracting(true);
            const message = getRandomDialogue(activeCustomer.timeoutDialogues, "기다리다 지쳤네. 다음에 오지.");
            setDepartingInfo({ id: activeCustomer.id, message, status: 'fail' });

            setTimeout(() => {
                setLives(l => Math.max(0, l - 1));
                toast({ variant: "destructive", title: "시간 초과!", description: `손님이 기다리다 지쳐 떠났습니다. 신뢰도가 1 하락합니다.` });
                setServedCustomersCount(prev => prev + 1);
                setCustomers(c => c.slice(1));
                setDepartingInfo(null);
                setIsInteracting(false);
            }, 1200);

            return CUSTOMER_TIMER_DEFAULT;
          }

          if (newTimerValue <= Math.floor(patience * 0.4)) {
            setImpatientDialogue(currentDialogue => {
              if (currentDialogue === null) {
                return getRandomDialogue(activeCustomer.impatientDialogues, "시간이 없는데...");
              }
              return currentDialogue;
            });
          }
          
          if (newTimerValue <= Math.floor(patience / 2) && newTimerValue > Math.floor(patience / 2) - 1) {
            playTickSound();
          }
          return newTimerValue;
        });
      }, 1000);
    } else {
        setCustomerTimer(CUSTOMER_TIMER_DEFAULT);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [activeCustomer, gameState, isInteracting, timerBonus, playBellSound, playTickSound, toast, isDayCleared, dayPenalty]);

  useEffect(() => {
    // This effect manages the customer queue when the game is active.
    
    // Do nothing if the game is not playing, a transaction is happening, or the day's goal is met.
    if (gameState !== 'playing' || isInteracting || isDayCleared) {
      return;
    }

    // Fetch more customers if the queue is running low to ensure a continuous flow.
    const shouldFetchMoreCustomers = gameStarted && customers.length < 5;
    if (shouldFetchMoreCustomers) {
      fetchCustomers();
    }
  }, [customers.length, gameStarted, gameState, isInteracting, isDayCleared, fetchCustomers]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('lost');
    }
  }, [lives, gameState]);

  useEffect(() => {
    if (isUpdatingInventory.current) {
        isUpdatingInventory.current = false;
        return;
    }

    const basicWeaponTypes: ('Sword' | 'Axe' | 'Bow')[] = ['Sword', 'Axe', 'Bow'];
    const itemsToAdd: Weapon[] = [];
    const initialStockCount = 3;

    basicWeaponTypes.forEach(type => {
        const count = inventory.filter(w => w.type === type).length;
        if (count < initialStockCount) {
            const itemsToCreate = initialStockCount - count;
            for (let i = 0; i < itemsToCreate; i++) {
                itemsToAdd.push(generateNewItem(day, type));
            }
        }
    });

    if (itemsToAdd.length > 0) {
        isUpdatingInventory.current = true;
        setInventory(prev => [...prev, ...itemsToAdd]);
        toast({ 
            title: "재고 자동 보충!",
            description: `부족한 기본 무기(${itemsToAdd.map(i => i.type).join(', ')})가 보충되었습니다.`
        });
    }
  }, [inventory, day, toast]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
            <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full shadow-lg bg-card hover:bg-card/80"
                onClick={onReturnToTitle}
            >
                <Home className="w-6 h-6" />
                <span className="sr-only">타이틀로</span>
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full shadow-lg bg-card hover:bg-card/80"
                onClick={() => setIsRecipeBookOpen(true)}
            >
                <Book className="w-6 h-6" />
                <span className="sr-only">무기 도감 열기</span>
            </Button>
        </div>

        <Header 
          day={day} 
          maxDays={MAX_DAYS} 
          gold={gold} 
          targetGold={currentTargetGold} 
          lives={lives} 
          maxLives={maxLives} 
          servedCustomersCount={servedCustomersCount}
        />
        
        <main className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 overflow-hidden">
            <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                <CustomerArea
                  customers={customers} 
                  activeCustomerId={activeCustomer?.id ?? null}
                  timer={customerTimer}
                  maxTime={activeCustomer ? Math.floor(activeCustomer.patience * timerBonus * dayPenalty) : CUSTOMER_TIMER_DEFAULT}
                  departingInfo={departingInfo}
                  impatientDialogue={impatientDialogue}
                />
            </div>

            <div className="md:col-span-1 flex flex-col overflow-y-auto">
                 <InventoryArea
                    inventory={sortedInventory}
                    onSelect={handleSelectInventory}
                    workshopSlots={workshopSlots}
                 />
            </div>
        </main>

        <footer className="mt-4 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
                <Button onClick={handleSell} disabled={isInteracting || selectedCount !== 1 || !activeCustomer || isDayCleared} size="lg">
                    판매하기
                </Button>
                
                <div className="flex items-center gap-2">
                    <Button 
                        onClick={handleCombine} 
                        disabled={isInteracting || !combinationPreview || isDayCleared || selectedCount < 2} 
                        variant="secondary" 
                        size="lg"
                    >
                        {combinationPreview ? `${combinationPreview.name} 만들기` : '조합하기'}
                    </Button>
                    {combinationPreview && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-5 w-5" />
                            <Card className="flex items-center justify-center p-1 bg-muted">
                                <WeaponIcon type={combinationPreview.type} className="w-8 h-8"/>
                            </Card>
                        </div>
                    )}
                </div>

                <Button onClick={handleClearWorkshop} disabled={isInteracting || selectedCount === 0 || isDayCleared} variant="outline" size="lg">
                    선택 초기화
                </Button>
            </div>
            {isDayCleared && day < MAX_DAYS && (
              <Button onClick={handleNextDay} variant="secondary" size="lg" disabled={isInteracting}>
                  목표 달성! 다음 날로
              </Button>
            )}
        </footer>

        <EndGameDialog 
            gameState={gameState} 
            gold={cumulativeRevenue} 
            onPlayAgain={resetGame}
            onReturnToTitle={onReturnToTitle}
        />
        <RecipeBook 
            isOpen={isRecipeBookOpen} 
            onOpenChange={setIsRecipeBookOpen} 
            discoveredRecipes={discoveredRecipes}
        />
        <PassiveSkillDialog 
            isOpen={isSkillSelectionOpen}
            skills={availableSkills}
            onSelectSkill={handleSelectSkill}
        />
    </div>
  );
}
