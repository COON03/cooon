'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initialWeapons, allCustomers, generateNewItem } from '@/lib/game-data';
import type { Weapon, Customer, WeaponType } from '@/lib/game-types';
import Header from './Header';
import CustomerArea from './CustomerArea';
import InventoryArea from './InventoryArea';
import EndGameDialog from './EndGameDialog';
import RecipeBook from './RecipeBook';
import { findRecipe } from '@/lib/recipe-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Book } from 'lucide-react';

const TARGET_GOLD = 1000;
const MAX_DAYS = 7;
const MAX_TRUST = 100;
const CUSTOMER_TIMER_DEFAULT = 30;
const TRUST_PENALTY = 10;
const PICKY_TRUST_PENALTY = 20;

export default function GameClient() {
  const [day, setDay] = useState(1);
  const [gold, setGold] = useState(100);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  
  const [workshopSlots, setWorkshopSlots] = useState<(Weapon | null)[]>([null, null]);

  const [trust, setTrust] = useState(MAX_TRUST);
  const [customerTimer, setCustomerTimer] = useState(CUSTOMER_TIMER_DEFAULT);
  const [gameStarted, setGameStarted] = useState(false);
  
  const [departingInfo, setDepartingInfo] = useState<{ id: string; message: string } | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const [discoveredRecipes, setDiscoveredRecipes] = useState<Set<string>>(new Set());
  const [isRecipeBookOpen, setIsRecipeBookOpen] = useState(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { toast } = useToast();

  const activeCustomer = customers.length > 0 ? customers[0] : null;
  const selectedCount = workshopSlots.filter(Boolean).length;

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
    const customersPerDay = [0, 10, 13, 16, 20, 24, 27, 30]; 
    const numCustomers = customersPerDay[day] || 30;

    const unlockedCustomers = allCustomers.filter((_, index) => {
        const unlockedCount = Math.min(allCustomers.length, 2 + Math.floor(day * 2));
        return index < unlockedCount;
    });
    
    const difficultCustomers = unlockedCustomers.filter(c => c.personality !== 'normal' || ['Scythe', 'Magic Staff', 'Chain', 'Claw', 'Rapier', 'Whip', 'Boomerang'].includes(c.wants.type));
    
    let potentialPool = [...unlockedCustomers];
    if (difficultCustomers.length > 0) {
      for (let i = 1; i < day; i++) {
          potentialPool.push(...difficultCustomers);
      }
    }

    const shuffled = [...potentialPool].sort(() => 0.5 - Math.random());

    const todaysCustomers: Customer[] = [];
    if (shuffled.length > 0) {
        for (let i = 0; i < numCustomers; i++) {
            todaysCustomers.push(shuffled[i % shuffled.length]);
        }
    }
    
    setCustomers(todaysCustomers.map(c => ({...c, id: `${c.id}_${Math.random()}`})));

    if (todaysCustomers.length > 0) {
      playBellSound();
    }
  }, [day, playBellSound]);
  
  const resetGame = useCallback(() => {
    setDay(1);
    setGold(100);
    setTrust(MAX_TRUST);
    setInventory([...initialWeapons]);
    setGameState('playing');
    setWorkshopSlots([null, null]);
    setDiscoveredRecipes(new Set());
  }, []);

  const handleNextDay = useCallback(() => {
    if (day >= MAX_DAYS) {
      if (gameState === 'playing') {
        setGameState(gold >= TARGET_GOLD ? 'won' : 'lost');
      }
    } else {
      setDay(day + 1);
      setInventory(prev => [...prev, generateNewItem(day + 1)]);
      toast({ title: `제 ${day + 1}일`, description: "새로운 하루가 시작되었습니다." });
    }
    setWorkshopSlots([null, null]);
  }, [day, gameState, gold, toast]);

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

    const meetsReqs = weapon.type === customer.wants.type;

    if (meetsReqs) {
      const salePrice = Math.floor(weapon.price * customer.offerMultiplier);
      setGold(gold + salePrice);
      setInventory(inventory.filter(w => w.id !== weapon.id));
      playBellSound();
      toast({ title: "거래 성공!", description: `${weapon.name}을(를) ${salePrice}골드에 판매했습니다.` });
      setDepartingInfo({ id: customer.id, message: "이거 좋군! 고맙네." });
    } else {
      const penalty = customer.personality === 'picky' ? PICKY_TRUST_PENALTY : TRUST_PENALTY;
      setTrust(t => Math.max(0, t - penalty));
      toast({ variant: "destructive", title: "거래 실패!", description: `손님의 요구에 맞지 않아 신뢰도가 ${penalty} 하락합니다.` });
      setDepartingInfo({ id: customer.id, message: "흠, 이건 내가 찾던 게 아니야." });
    }
    setWorkshopSlots([null, null]);

    setTimeout(() => {
        setCustomers(c => c.slice(1));
        setDepartingInfo(null);
        setIsInteracting(false);
    }, 1200);
  };
  
  const handleCombine = () => {
    const [w1, w2] = workshopSlots;
    if (!w1 || !w2) {
        toast({ variant: "destructive", title: "조합 실패", description: "무기 2개를 선택해주세요." });
        return;
    }

    const recipe = findRecipe(w1.type, w2.type);
    
    setInventory(inventory.filter(w => w.id !== w1.id && w.id !== w2.id));

    if (recipe) {
      let newWeaponData: { name: string, type: WeaponType, multiplier: number };
      const basePrice = w1.price + w2.price;

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

      setInventory(prev => [...prev, finalWeapon]);
      toast({ title: "희귀 무기 조합 성공!", description: `새로운 무기 '${finalWeapon.name}' (${finalWeapon.type})이(가) 탄생했습니다!` });
      
      setDiscoveredRecipes(prev => new Set(prev).add(recipe.id));
    } else {
      const failedWeapon: Weapon = {
        id: `w_fail_${Date.now()}`, name: '실패한 합금', type: w1.type,
        price: Math.floor((w1.price + w2.price) * 0.5),
      };
      setInventory(prev => [...prev, failedWeapon]);
      toast({ variant: "destructive", title: "조합 실패!", description: `알 수 없는 조합입니다. 불안정한 합금이 생성되었습니다.` });
    }
    
    setWorkshopSlots([null, null]);
  };

  const handleClearWorkshop = () => {
    setWorkshopSlots([null, null]);
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
            toast({ variant: "destructive", title: "조합 슬롯이 꽉 찼습니다", description: "최대 2개의 무기만 선택할 수 있습니다." });
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
    if(gameStarted) {
      fetchCustomers();
    }
  }, [day, gameStarted, fetchCustomers]);

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

    if (activeCustomer && gameState === 'playing' && !isInteracting) {
      setCustomerTimer(activeCustomer.patience);
      timerIntervalRef.current = setInterval(() => {
        setCustomerTimer(prev => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            playBellSound();
            
            setIsInteracting(true);
            setDepartingInfo({ id: activeCustomer.id, message: "기다리다 지쳤네. 다음에 오지." });

            setTimeout(() => {
                const penalty = activeCustomer.personality === 'picky' ? PICKY_TRUST_PENALTY : TRUST_PENALTY;
                setTrust(t => Math.max(0, t - penalty));
                toast({ variant: "destructive", title: "시간 초과!", description: `손님이 기다리다 지쳐 떠났습니다. 신뢰도가 ${penalty} 하락합니다.` });
                setCustomers(c => c.slice(1));
                setDepartingInfo(null);
                setIsInteracting(false);
            }, 1200);

            return CUSTOMER_TIMER_DEFAULT;
          }
          if (prev <= Math.floor(activeCustomer.patience / 2) && prev > Math.floor(activeCustomer.patience / 2) - 1) {
            playTickSound();
          }
          return prev - 1;
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
  }, [activeCustomer, gameState, playTickSound, toast, playBellSound, isInteracting]);

  useEffect(() => {
    if (gameStarted && customers.length === 0 && gameState === 'playing' && day <= MAX_DAYS && !isInteracting) {
      const timer = setTimeout(() => {
        handleNextDay();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [customers.length, gameStarted, gameState, day, isInteracting, handleNextDay]);

  useEffect(() => {
    if (trust <= 0 && gameState === 'playing') {
      setGameState('lost');
    }
  }, [trust, gameState]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 md:p-6 lg:p-8 overflow-hidden">
        <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg bg-card hover:bg-card/80"
            onClick={() => setIsRecipeBookOpen(true)}
        >
            <Book className="w-6 h-6" />
            <span className="sr-only">무기 도감 열기</span>
        </Button>

        <Header day={day} maxDays={MAX_DAYS} gold={gold} targetGold={TARGET_GOLD} trust={trust} maxTrust={MAX_TRUST} />
        
        <main className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 overflow-hidden">
            <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                <CustomerArea
                  customers={customers} 
                  activeCustomerId={activeCustomer?.id ?? null}
                  timer={customerTimer}
                  maxTime={activeCustomer?.patience ?? CUSTOMER_TIMER_DEFAULT}
                  departingInfo={departingInfo}
                />
            </div>

            <div className="md:col-span-1 flex flex-col overflow-y-auto">
                 <InventoryArea
                    inventory={inventory}
                    onSelect={handleSelectInventory}
                    workshopSlots={workshopSlots}
                 />
            </div>
        </main>

        <footer className="mt-4 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
                <Button onClick={handleSell} disabled={isInteracting || selectedCount !== 1 || !activeCustomer} size="lg">
                    판매하기
                </Button>
                <Button onClick={handleCombine} disabled={isInteracting || selectedCount !== 2} variant="secondary" size="lg">
                    조합하기
                </Button>
                <Button onClick={handleClearWorkshop} disabled={isInteracting || selectedCount === 0} variant="outline" size="lg">
                    선택 초기화
                </Button>
            </div>
            <Button onClick={handleNextDay} variant="secondary" size="lg" disabled={isInteracting || (customers.length > 0 && day < MAX_DAYS)}>
                다음 날로 ({day}/{MAX_DAYS})
            </Button>
        </footer>

        <EndGameDialog gameState={gameState} gold={gold} onPlayAgain={resetGame} />
        <RecipeBook 
            isOpen={isRecipeBookOpen} 
            onOpenChange={setIsRecipeBookOpen} 
            discoveredRecipes={discoveredRecipes}
        />
    </div>
  );
}
