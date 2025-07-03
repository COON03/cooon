import React from 'react';
import Image from 'next/image';
import type { Customer, CustomerSprite } from '@/lib/game-types';
import { KnightIcon, MageIcon, RogueIcon, VillagerIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';
import { TimerIcon } from 'lucide-react';

interface CustomerAreaProps {
  customers: Customer[];
  activeCustomerId: string | null;
  timer: number;
  maxTime: number;
  departingInfo: { id: string; message: string } | null;
}

const CustomerSpriteCmp = ({ type }: { type: CustomerSprite }) => {
  const className = "w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]";
  switch (type) {
    case 'Knight': return <KnightIcon className={className} />;
    case 'Mage': return <MageIcon className={className} />;
    case 'Rogue': return <RogueIcon className={className} />;
    case 'Villager': return <VillagerIcon className={className} />;
    default: return <KnightIcon className={className} />;
  }
};

const CustomerArea: React.FC<CustomerAreaProps> = ({ customers, activeCustomerId, timer, maxTime, departingInfo }) => {
  const activeCustomer = customers.find(c => c.id === activeCustomerId);

  return (
    <div className="w-full h-full bg-[#6d5645] relative flex items-end justify-center overflow-hidden">
      <Image
        src="https://placehold.co/1200x800/8d715b/8d715b.png"
        alt="Weapon shop background"
        data-ai-hint="pixel art shop interior"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Shop Counter */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#594236]/80 border-t-4 border-[#4a372d] z-10 shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
        <div className="h-5 bg-[#4a372d]/90 opacity-80 border-b-2 border-black/50"></div>
      </div>

      {/* Customer queue container */}
      <div className="relative w-full h-full flex justify-center items-end z-20">
        {customers.length > 0 ? (
          customers.map((customer, index) => {
            const isDeparting = customer.id === departingInfo?.id;
            const isActuallyActive = customer.id === activeCustomerId && !departingInfo;
            const isVisuallyActive = isActuallyActive || isDeparting;
            const isQueued = index > 0 && !isDeparting;
            const zIndex = 20 - index;

            return (
              <div
                key={customer.id}
                className={cn(
                  'absolute transition-all duration-1000 ease-in-out',
                  isDeparting && 'left-[120%] opacity-0'
                )}
                style={{
                    left: isVisuallyActive ? '60%' : `${45 - (index-1) * 18}%`,
                    bottom: '8rem',
                    transform: `translateX(-50%) scale(${isVisuallyActive ? 1.1 : 1 - index * 0.2})`,
                    zIndex: zIndex,
                }}
              >
                <div className="relative">
                  {isVisuallyActive ? (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                        {customer.name}
                      </div>
                  ) : isQueued ? (
                      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {customer.name}
                      </div>
                  ) : null}
                  <CustomerSpriteCmp type={customer.sprite} />
                </div>
                
                {/* Departing Speech Bubble */}
                {isDeparting && departingInfo && (
                    <div className="absolute bottom-full mb-4 w-64 bg-card text-card-foreground p-3 rounded-lg shadow-lg text-center left-1/2 -translate-x-1/2 z-30">
                        <p className="font-bold text-lg italic text-muted-foreground">"{departingInfo.message}"</p>
                        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                    </div>
                )}
                
                {/* Active Customer Speech Bubbles */}
                {isActuallyActive && activeCustomer && (
                  <>
                    {/* Left Bubble: Unique Dialogue */}
                    <div className="absolute bottom-full w-48 bg-white/95 text-black p-3 rounded-lg shadow-lg text-center z-30 animate-bubble-bob" style={{ right: 'calc(50% + 1rem)' }}>
                        <p className="text-sm italic">"{activeCustomer.requestText}"</p>
                        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white/95 bottom-[-8px] right-4"></div>
                    </div>

                    {/* Right Bubble: Requirements */}
                    <div className="absolute bottom-full w-56 bg-card text-card-foreground p-3 rounded-lg shadow-lg text-center z-30" style={{ left: 'calc(50% + 1rem)' }}>
                        <ul className="text-sm list-disc list-inside text-left mx-auto max-w-max">
                          <li>종류: <span className="font-semibold text-accent">{activeCustomer.wants.type}</span></li>
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
                        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card bottom-[-8px] left-4"></div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-muted-foreground text-center self-center text-lg pb-16 z-10 relative">오늘은 손님이 더 이상 없네요.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerArea;
