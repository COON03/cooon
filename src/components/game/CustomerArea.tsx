import React from 'react';
import type { Customer, CustomerSprite } from '@/lib/game-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KnightIcon, MageIcon, RogueIcon, VillagerIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';
import { TimerIcon } from 'lucide-react';

interface CustomerAreaProps {
  customers: Customer[];
  activeCustomerId: string | null;
  timer: number;
  maxTime: number;
}

const CustomerSpriteCmp = ({ type }: { type: CustomerSprite }) => {
  const className = "w-24 h-24 md:w-32 md:h-32 drop-shadow-lg";
  switch (type) {
    case 'Knight': return <KnightIcon className={className} />;
    case 'Mage': return <MageIcon className={className} />;
    case 'Rogue': return <RogueIcon className={className} />;
    case 'Villager': return <VillagerIcon className={className} />;
    default: return <KnightIcon className={className} />;
  }
};

const CustomerArea: React.FC<CustomerAreaProps> = ({ customers, activeCustomerId, timer, maxTime }) => {
  const activeCustomer = customers.find(c => c.id === activeCustomerId);

  return (
    <div className='flex flex-col h-full'>
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground/90">손님 대기열</h2>
      <div className="flex-grow bg-black/20 rounded-lg p-4 relative flex items-end justify-center overflow-hidden border-2 border-stone-800">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-stone-800 border-t-4 border-stone-900 z-10" />
        
        <div className="relative w-full h-full flex justify-center items-end">
          {customers.length > 0 ? (
            customers.slice().reverse().map((customer, index) => {
              const isFrontOfQueue = index === customers.length - 1;
              return (
                <div
                  key={customer.id}
                  className={cn(
                      'absolute bottom-20 transition-all duration-500 ease-in-out group',
                      isFrontOfQueue ? 'z-30' : 'z-20',
                  )}
                  style={{
                      right: `${10 + index * 12}%`,
                      transform: `scale(${1 - index * 0.15})`,
                      zIndex: 10 + index,
                  }}
                >
                  <div className={cn('transition-transform duration-300', isFrontOfQueue && 'scale-110')}>
                    <CustomerSpriteCmp type={customer.sprite} />
                  </div>
                  
                  {isFrontOfQueue && activeCustomer && (
                    <div className="absolute bottom-full mb-3 w-56 bg-card text-card-foreground p-3 rounded-lg shadow-lg text-center left-1/2 -translate-x-1/2">
                      <p className="font-bold text-lg">{activeCustomer.name}</p>
                      <p className="text-sm my-1">"{activeCustomer.requestText}"</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 text-left mx-auto max-w-max">
                        <li>종류: {activeCustomer.wants.type}</li>
                        <li>최소 공격력: {activeCustomer.wants.minAttack}</li>
                        <li>최소 속도: {activeCustomer.wants.minSpeed}</li>
                      </ul>
                      <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <div className="flex items-center">
                                  <TimerIcon className="w-3 h-3 mr-1" />
                                  <span>남은 시간</span>
                              </div>
                              <span>{timer}초</span>
                          </div>
                          <Progress value={(timer / maxTime) * 100} className="h-1.5" />
                      </div>
                      <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                    </div>
                  )}
                  
                  {!isFrontOfQueue && (
                       <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           {customer.name}
                       </div>
                   )}
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground text-center self-center text-lg">오늘은 손님이 더 이상 없네요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerArea;
