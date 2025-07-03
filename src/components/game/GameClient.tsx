'use client';

import React, { useState, useEffect } from 'react';
import { initialWeapons, allCustomers, generateNewItem } from '@/lib/game-data';
import type { Weapon, Customer } from '@/lib/game-types';
import Header from './Header';
import CustomerArea from './CustomerArea';
import InventoryArea from './InventoryArea';
import WorkshopArea from './WorkshopArea';
import EndGameDialog from './EndGameDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const TARGET_GOLD = 1000;
const MAX_DAYS = 7;

export default function GameClient() {
  const [day, setDay] = useState(1);
  const [gold, setGold] = useState(100);
  const [inventory, setInventory] = useState<Weapon[]>(initialWeapons);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [workshopSlots, setWorkshopSlots] = useState<(Weapon | null)[]>([null, null]);

  const { toast } = useToast();

  const resetGame = () => {
    setDay(1);
    setGold(100);
    setInventory(initialWeapons);
    fetchCustomers();
    setGameState('playing');
    setSelectedInventoryId(null);
    setSelectedCustomerId(null);
    setWorkshopSlots([null, null]);
  };

  const fetchCustomers = () => {
    const shuffled = [...allCustomers].sort(() => 0.5 - Math.random());
    setCustomers(shuffled.slice(0, 2));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSell = () => {
    if (!selectedInventoryId || !selectedCustomerId) return;
    const weapon = inventory.find(w => w.id === selectedInventoryId);
    const customer = customers.find(c => c.id === selectedCustomerId);

    if (!weapon || !customer) return;

    const meetsReqs = weapon.type === customer.wants.type &&
                      weapon.attack >= customer.wants.minAttack &&
                      weapon.speed >= customer.wants.minSpeed;

    if (meetsReqs) {
      const salePrice = Math.floor(weapon.price * customer.offerMultiplier);
      setGold(gold + salePrice);
      setInventory(inventory.filter(w => w.id !== weapon.id));
      setCustomers(customers.filter(c => c.id !== customer.id));
      toast({ title: "거래 성공!", description: `${weapon.name}을(를) ${salePrice}골드에 판매했습니다.` });
    } else {
      toast({ variant: "destructive", title: "거래 실패!", description: "손님의 요구사항에 맞지 않는 무기입니다." });
    }
    setSelectedInventoryId(null);
    setSelectedCustomerId(null);
  };
  
  const handleNextDay = () => {
    if (day + 1 > MAX_DAYS) {
      setGameState(gold >= TARGET_GOLD ? 'won' : 'lost');
    } else {
      setDay(day + 1);
      fetchCustomers();
      // Add a new random item to inventory each day
      setInventory(prev => [...prev, generateNewItem(day + 1)]);
      toast({ title: `제 ${day + 1}일`, description: "새로운 하루가 시작되었습니다." });
    }
    setSelectedInventoryId(null);
    setSelectedCustomerId(null);
  };

  const handleCombine = () => {
    if (!workshopSlots[0] || !workshopSlots[1]) {
        toast({ variant: "destructive", title: "조합 실패", description: "무기 2개를 선택해주세요." });
        return;
    }
    const [w1, w2] = workshopSlots;

    // Remove from inventory
    setInventory(inventory.filter(w => w.id !== w1.id && w.id !== w2.id));

    // Combine logic
    const newWeapon: Weapon = {
        id: `w_comb_${Date.now()}`,
        name: `${w1.name.split(' ')[0]}-${w2.name.split(' ')[0]} 합금`,
        type: w1.type, // For simplicity, keep first weapon's type
        attack: Math.floor((w1.attack + w2.attack) * 0.8),
        speed: Math.floor((w1.speed + w2.speed) * 0.8),
        price: Math.floor((w1.price + w2.price) * 1.1),
    };
    
    setInventory(prev => [...prev, newWeapon]);
    setWorkshopSlots([null, null]);
    toast({ title: "조합 성공!", description: `새로운 무기 ${newWeapon.name}이(가) 탄생했습니다!` });
  };

  const handleSelectInventory = (id: string) => {
    if (workshopSlots[0] && workshopSlots[0].id !== id && !workshopSlots[1]) {
        setWorkshopSlots([workshopSlots[0], inventory.find(w => w.id === id) || null]);
    } else if (!workshopSlots[0]) {
        setWorkshopSlots([inventory.find(w => w.id === id) || null, null]);
    } else {
      setSelectedInventoryId(id === selectedInventoryId ? null : id);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 md:p-6 lg:p-8 overflow-hidden">
        <Header day={day} maxDays={MAX_DAYS} gold={gold} targetGold={TARGET_GOLD} />
        
        <main className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 overflow-hidden">
            <div className="md:col-span-2 grid grid-rows-2 gap-6 overflow-hidden">
                <CustomerArea customers={customers} selectedId={selectedCustomerId} onSelect={setSelectedCustomerId} />
                <WorkshopArea slots={workshopSlots} onCombine={handleCombine} onClear={() => setWorkshopSlots([null, null])} />
            </div>

            <div className="md:col-span-1 overflow-y-auto">
                 <InventoryArea inventory={inventory} selectedId={selectedInventoryId} onSelect={handleSelectInventory} workshopSlots={workshopSlots} />
            </div>
        </main>

        <footer className="mt-6 flex justify-between items-center">
          <Button onClick={handleSell} disabled={!selectedInventoryId || !selectedCustomerId} size="lg">
            선택한 무기 판매
          </Button>
          <Button onClick={handleNextDay} variant="secondary" size="lg">
            다음 날로 ({day}/{MAX_DAYS})
          </Button>
        </footer>

        <EndGameDialog gameState={gameState} gold={gold} onPlayAgain={resetGame} />
    </div>
  );
}
