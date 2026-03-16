'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Calculator,
  Home,
  Building2,
  Maximize,
  Shield,
  Percent,
  ArrowRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCurrency } from '@/hooks/useCurrency';

// Singapore property estimates based on budget
function getSingaporeProperty(budget: number) {
  if (budget < 400000) {
    return {
      type: 'Resale HDB 3-Room',
      size: '650-750',
      tenure: '60-70 year lease remaining',
      yield: '2.0-2.5%',
      location: 'Outskirts / Mature estates',
    };
  } else if (budget < 600000) {
    return {
      type: 'Resale HDB 4-Room',
      size: '850-950',
      tenure: '70-80 year lease remaining',
      yield: '2.0-2.5%',
      location: 'Mature estates',
    };
  } else if (budget < 900000) {
    return {
      type: 'Resale HDB 5-Room / EC',
      size: '1,000-1,200',
      tenure: '80-90 year lease remaining',
      yield: '2.5-3.0%',
      location: 'Mature estates',
    };
  } else if (budget < 1200000) {
    return {
      type: 'Small Condo (OCR)',
      size: '500-700',
      tenure: '99-year leasehold',
      yield: '2.5-3.0%',
      location: 'Outside Central Region',
    };
  } else if (budget < 1600000) {
    return {
      type: 'Condo 2-Bedroom (RCR)',
      size: '600-800',
      tenure: '99-year leasehold',
      yield: '3.0-3.5%',
      location: 'Rest of Central Region',
    };
  } else {
    return {
      type: 'Condo 3-Bedroom (RCR)',
      size: '900-1,100',
      tenure: '99-year leasehold',
      yield: '3.0-3.5%',
      location: 'Rest of Central Region',
    };
  }
}

// JB property estimates based on budget
function getJBProperty(budget: number) {
  if (budget < 400000) {
    return {
      type: 'Luxury Condo 2-Bed',
      size: '900-1,100',
      tenure: 'Freehold',
      yield: '6.0-7.0%',
      location: 'Near RTS Station',
      multiplier: '1.5x',
    };
  } else if (budget < 600000) {
    return {
      type: 'Luxury Condo 3-Bed',
      size: '1,200-1,500',
      tenure: 'Freehold',
      yield: '6.5-7.5%',
      location: 'Prime waterfront / RTS area',
      multiplier: '1.8x',
    };
  } else if (budget < 900000) {
    return {
      type: 'Premium Condo 4-Bed',
      size: '1,600-2,000',
      tenure: 'Freehold',
      yield: '6.0-7.0%',
      location: 'Waterfront / Golf resort',
      multiplier: '2x',
    };
  } else if (budget < 1200000) {
    return {
      type: 'Penthouse / Duplex',
      size: '2,200-2,800',
      tenure: 'Freehold',
      yield: '5.5-6.5%',
      location: 'Premium developments',
      multiplier: '2.5x',
    };
  } else if (budget < 1600000) {
    return {
      type: 'Luxury Penthouse',
      size: '3,000-4,000',
      tenure: 'Freehold',
      yield: '5.0-6.0%',
      location: 'Iconic towers',
      multiplier: '3x',
    };
  } else {
    return {
      type: 'Super Penthouse / Bungalow',
      size: '4,000-6,000',
      tenure: 'Freehold',
      yield: '4.5-5.5%',
      location: 'Ultra-premium locations',
      multiplier: '3.5x',
    };
  }
}

export default function CalculatorPage() {
  const locale = useLocale();
  const t = useTranslations('calculator');
  const { formatPrice } = useCurrency();

  const [budget, setBudget] = useState(500000);

  const sgProperty = getSingaporeProperty(budget);
  const jbProperty = getJBProperty(budget);

  const formatBudget = (value: number) => {
    if (value >= 1000000) {
      return `S$${(value / 1000000).toFixed(1)}M`;
    }
    return `S$${value / 1000}K`;
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
          </ScrollReveal>
          <TextReveal className="text-4xl md:text-5xl font-bold mb-4" immediate delay={0.2}>
            {t('title')}
          </TextReveal>
          <ScrollReveal>
            <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
          </ScrollReveal>
        </div>

        {/* Budget Slider */}
        <ScrollReveal>
          <Card className="p-8 mb-12 max-w-2xl mx-auto">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              {t('budget')}
            </label>
            <div className="text-5xl font-bold text-primary mb-6">
              {formatBudget(budget)}
            </div>
            <input
              type="range"
              min={200000}
              max={2000000}
              step={50000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>S$200K</span>
              <span>S$2M</span>
            </div>
          </Card>
        </ScrollReveal>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Singapore Card */}
          <ScrollReveal direction="left">
            <Card className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-2xl">🇸🇬</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Singapore</h3>
                  <p className="text-sm text-muted-foreground">
                    What {formatBudget(budget)} buys
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Property Type
                    </p>
                    <p className="font-semibold">{sgProperty.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Maximize className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold">{sgProperty.size} sqft</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-semibold">{sgProperty.tenure}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Percent className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Rental Yield
                    </p>
                    <p className="font-semibold">{sgProperty.yield}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{sgProperty.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          {/* JB Card */}
          <ScrollReveal direction="right">
            <Card className="p-6 h-full border-primary relative overflow-hidden">
              {/* Better Value Badge */}
              <div className="absolute top-4 right-4">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
                >
                  <TrendingUp className="w-3 h-3" />
                  {jbProperty.multiplier} More Space
                </motion.span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">🇲🇾</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Johor Bahru</h3>
                  <p className="text-sm text-muted-foreground">
                    What {formatBudget(budget)} buys
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Building2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Property Type
                    </p>
                    <p className="font-semibold text-primary">
                      {jbProperty.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Maximize className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold text-primary">
                      {jbProperty.size} sqft
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-semibold text-primary">
                      {jbProperty.tenure}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Percent className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Rental Yield
                    </p>
                    <p className="font-semibold text-primary">
                      {jbProperty.yield}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-primary">
                      {jbProperty.location}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link
                href={`/${locale}/properties?maxPrice=${budget}`}
              >
                View Matching Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Properties within your {formatBudget(budget)} budget
            </p>
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground text-center">
            * Estimates are based on current market conditions and are for
            illustrative purposes only. Actual property prices, sizes, and
            yields may vary. Contact us for personalized recommendations.
          </p>
        </div>
      </div>
    </main>
  );
}
