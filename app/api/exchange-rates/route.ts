import { NextResponse } from 'next/server';

const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/SGD';

let cachedRates: { rates: Record<string, number>; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return NextResponse.json({ rates: cachedRates.rates });
  }

  try {
    const res = await fetch(EXCHANGE_API_URL);
    const data = await res.json();

    cachedRates = {
      rates: {
        SGD: 1,
        MYR: data.rates.MYR,
        USD: data.rates.USD,
      },
      timestamp: Date.now(),
    };

    return NextResponse.json({ rates: cachedRates.rates });
  } catch {
    return NextResponse.json({
      rates: { SGD: 1, MYR: 3.35, USD: 0.74 },
    });
  }
}
