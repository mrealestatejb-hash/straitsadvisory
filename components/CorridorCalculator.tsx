'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrency } from '@/hooks/useCurrency';

export function CorridorCalculator() {
  const t = useTranslations('calculator');
  const { formatDualPrice } = useCurrency();
  const [budget, setBudget] = useState(500000);

  const jbMultiplier = 3.5; // Approximate value difference
  const jbEquivalent = budget * jbMultiplier;

  const sgdPrice = formatDualPrice(budget);
  const jbPrice = formatDualPrice(jbEquivalent);

  return (
    <div className="bg-background rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
      <p className="text-muted-foreground mb-6">{t('subtitle')}</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('budget')}
          </label>
          <input
            type="range"
            min={200000}
            max={2000000}
            step={50000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-2xl font-bold mt-2">{sgdPrice.primary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground">In Singapore</p>
            <p className="text-lg font-semibold mt-1">~500 sqft condo</p>
            <p className="text-sm text-muted-foreground">Leasehold</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-xl border border-primary">
            <p className="text-sm text-primary">In Johor Bahru</p>
            <p className="text-lg font-semibold mt-1">~1,500 sqft condo</p>
            <p className="text-sm text-primary">Freehold</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Your {sgdPrice.primary} buys {jbMultiplier}x more space in JB
          </p>
        </div>
      </div>
    </div>
  );
}
