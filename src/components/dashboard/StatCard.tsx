
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    label?: string;
  };
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  className,
}: StatCardProps) {
  const isPositiveChange = change && change.value > 0;
  const isNegativeChange = change && change.value < 0;
  const isNeutralChange = change && change.value === 0;

  return (
    <div className={cn('stat-card', className)}>
      <div className="flex justify-between items-start">
        <div className="stat-label">{title}</div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={cn(
          "stat-change",
          isPositiveChange && "stat-change-positive",
          isNegativeChange && "stat-change-negative",
          isNeutralChange && "text-muted-foreground"
        )}>
          {isPositiveChange && <TrendingUp className="h-4 w-4" />}
          {isNegativeChange && <TrendingDown className="h-4 w-4" />}
          {isNeutralChange && <MinusIcon className="h-4 w-4" />}
          <span>
            {isPositiveChange ? '+' : ''}{change.value}%
            {change.label && ` ${change.label}`}
          </span>
        </div>
      )}
    </div>
  );
}
