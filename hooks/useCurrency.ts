'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import type { ExchangeRates } from '@/lib/currency';

const CACHE_KEY = 'exchange_rates';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useCurrency() {
  const locale = useLocale();
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  const defaultCurrency = locale.includes('MY') ? 'MYR' : 'SGD';
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    async function fetchRates() {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRates(data);
          return;
        }
      }

      const res = await fetch('/api/exchange-rates');
      const data = await res.json();

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data.rates,
          timestamp: Date.now(),
        })
      );

      setRates(data.rates);
    }

    fetchRates();
  }, []);

  const formatPrice = useCallback(
    (priceInSGD: number): string => {
      if (!rates) {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'SGD',
          maximumFractionDigits: 0,
        }).format(priceInSGD);
      }

      const converted =
        currency === 'SGD'
          ? priceInSGD
          : priceInSGD * (rates.MYR / rates.SGD);

      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(converted);
    },
    [rates, currency, locale]
  );

  const formatDualPrice = useCallback(
    (priceInSGD: number): { primary: string; secondary: string } => {
      const myrRate = rates?.MYR || 3.35;
      const priceInMYR = priceInSGD * myrRate;

      return {
        primary: new Intl.NumberFormat('en-SG', {
          style: 'currency',
          currency: 'SGD',
          maximumFractionDigits: 0,
        }).format(priceInSGD),
        secondary: new Intl.NumberFormat('ms-MY', {
          style: 'currency',
          currency: 'MYR',
          maximumFractionDigits: 0,
        }).format(priceInMYR),
      };
    },
    [rates]
  );

  return {
    currency,
    setCurrency,
    formatPrice,
    formatDualPrice,
    isLoading: !rates,
  };
}
