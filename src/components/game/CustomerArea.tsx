import React from 'react';
import type { Customer } from '@/lib/game-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KnightIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { TimerIcon } from 'lucide-react';

interface CustomerAreaProps {
  customers: Customer[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  timer: number;
  maxTime: number;
}

const CustomerArea: React.FC<CustomerAreaProps> = ({ customers, selectedId, onSelect, timer, maxTime }) => {
  return (
    <div className='flex flex-col h-full'>
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground/90">손님 대기열</h2>
      <ScrollArea className="flex-grow pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customers.length > 0 ? customers.map((customer) => (
            <Card
              key={customer.id}
              onClick={() => onSelect(customer.id)}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/20',
                selectedId === customer.id ? 'ring-2 ring-primary' : 'ring-0'
              )}
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <KnightIcon className="w-10 h-10 text-muted-foreground" />
                <div className="flex-1">
                  <CardTitle>{customer.name}</CardTitle>
                  <CardDescription>"{customer.requestText}"</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>종류: {customer.wants.type}</li>
                  <li>최소 공격력: {customer.wants.minAttack}</li>
                  <li>최소 속도: {customer.wants.minSpeed}</li>
                </ul>
                {selectedId === customer.id && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <div className="flex items-center">
                        <TimerIcon className="w-4 h-4 mr-1.5" />
                        <span>남은 시간</span>
                      </div>
                      <span>{timer}초</span>
                    </div>
                    <Progress value={(timer / maxTime) * 100} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          )) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">오늘은 손님이 더 이상 없네요.</p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CustomerArea;
