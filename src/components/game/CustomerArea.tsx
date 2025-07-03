import React from 'react';
import Image from 'next/image';
import type { Customer, CustomerSprite } from '@/lib/game-types';
import { KnightIcon, MageIcon, RogueIcon, VillagerIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import TimerClock from './TimerClock';

interface CustomerAreaProps {
  customers: Customer[];
  activeCustomerId: string | null;
  timer: number;
  maxTime: number;
  departingInfo: { id: string; message: string; status: 'success' | 'fail' } | null;
  impatientDialogue: string | null;
}

const CustomerSpriteCmp = ({ type, mood }: { type: CustomerSprite, mood?: 'happy' | 'angry' | 'impatient' }) => {
  const className = "w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]";
  switch (type) {
    case 'Knight': return <KnightIcon className={className} mood={mood} />;
    case 'Mage': return <MageIcon className={className} mood={mood} />;
    case 'Rogue': return <RogueIcon className={className} mood={mood} />;
    case 'Villager': return <VillagerIcon className={className} mood={mood} />;
    default: return <KnightIcon className={className} mood={mood} />;
  }
};

const CustomerArea: React.FC<CustomerAreaProps> = ({ customers, activeCustomerId, timer, maxTime, departingInfo, impatientDialogue }) => {
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
            const departureStatus = isDeparting ? departingInfo?.status : null;
            const isActuallyActive = customer.id === activeCustomerId && !departingInfo;
            const isVisuallyActive = isActuallyActive || isDeparting;
            const isQueued = index > 0 && !isDeparting;
            const zIndex = 20 - index;
            
            const isImpatient = isActuallyActive && !!impatientDialogue;
            const mood = departureStatus === 'success' ? 'happy' 
                       : departureStatus === 'fail' ? 'angry' 
                       : isImpatient ? 'impatient' 
                       : undefined;

            return (
              <div
                key={customer.id}
                className={cn(
                  'absolute',
                  isActuallyActive && 'animate-talking-bob',
                  departureStatus === 'success' ? 'animate-exit-happy' :
                  departureStatus === 'fail' ? 'animate-exit-angry' :
                  'transition-all duration-1000 ease-in-out'
                )}
                style={{
                    left: isVisuallyActive ? '50%' : `${30 - (index-1) * 15}%`,
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
                  <CustomerSpriteCmp type={customer.sprite} mood={mood} />
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
                  <div className="absolute bottom-full w-auto flex justify-center items-start gap-4 left-1/2 -translate-x-1/2">
                    {/* Left Bubble: Unique / Impatient Dialogue */}
                    <div
                      className={cn(
                        "relative w-44 bg-card text-card-foreground p-3 rounded-lg shadow-lg text-center z-30 animate-bubble-bob",
                         isImpatient && "border-2 border-yellow-400"
                      )}
                    >
                      <p className="text-sm italic">
                        "{isImpatient ? impatientDialogue : activeCustomer.requestText}"
                      </p>
                      <div
                        className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card bottom-[-8px] right-4"
                      ></div>
                    </div>

                    {/* Right Bubble: Requirements */}
                    <div className="relative w-44 bg-card text-card-foreground p-3 rounded-lg shadow-lg z-30">
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="font-semibold mb-2 text-muted-foreground">요구사항</p>
                            <p className="text-accent font-bold text-lg mb-3">{activeCustomer.wants.type}</p>
                             <div className="flex items-center gap-2">
                                <TimerClock progress={(timer / maxTime) * 100} />
                                <span className="text-sm text-muted-foreground font-semibold w-8">{timer}s</span>
                            </div>
                        </div>
                        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card bottom-[-8px] left-4"></div>
                    </div>
                  </div>
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
