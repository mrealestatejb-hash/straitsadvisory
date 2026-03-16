export interface ExchangeRates {
  SGD: number;
  MYR: number;
  USD: number;
}

export function formatCurrency(
  amount: number,
  currency: string = 'SGD',
  locale: string = 'en-SG'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): number {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = rates[fromCurrency as keyof ExchangeRates] || 1;
  const toRate = rates[toCurrency as keyof ExchangeRates] || 1;

  return (amount / fromRate) * toRate;
}
