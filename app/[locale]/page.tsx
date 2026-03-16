'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Home,
  TrendingUp,
  Star,
  Percent,
  MessageCircle,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PropertyCard } from '@/components/PropertyCard';
import { RTSCountdown } from '@/components/RTSCountdown';
import { FAQ } from '@/components/sections/FAQ';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getFeaturedProperties } from '@/lib/properties';

// Get featured properties from lib
const featuredProperties = getFeaturedProperties();

// Sample testimonials
const testimonials = [
  {
    id: 1,
    quote:
      "The team at Straits Advisory made our R&F Princess Cove purchase seamless. We're now earning 7% yield on our investment.",
    name: 'David Tan',
    role: 'Investor',
    property: 'R&F Princess Cove Phase 1',
  },
  {
    id: 2,
    quote:
      "Living in JB with a 5-minute commute to Singapore was the best decision. Our 1100sqft condo at Princess Cove cost less than a 3-room HDB.",
    name: 'Sarah Lim',
    role: 'Homeowner',
    property: 'R&F Princess Cove Phase 2',
  },
  {
    id: 3,
    quote:
      'Professional service from start to finish. They helped us navigate the entire process including legal and financing for our Seine Region unit.',
    name: 'Michael Wong',
    role: 'First-time Buyer',
    property: 'R&F Princess Cove Phase 2',
  },
];

// Stats data
const stats = [
  { value: 500, suffix: '+', label: 'propertiesSold', icon: Home },
  { value: 4.9, suffix: '★', label: 'rating', icon: Star },
  { value: 18, suffix: '%', label: 'capitalGain', icon: TrendingUp },
  { value: 6.2, suffix: '%', label: 'yield', icon: Percent },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current * 10) / 10);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Video Background - Desktop only */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Static Image - Mobile only (saves bandwidth) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-poster.jpg"
          alt="Hero background"
          className="md:hidden absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* RTS Countdown Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <RTSCountdown />
          </motion.div>

          {/* Headline */}
          <TextReveal className="text-5xl md:text-7xl font-bold tracking-tight mb-6" immediate delay={0.3}>
            {t('hero.title')}
          </TextReveal>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="text-lg px-8">
              <Link href={`/${locale}/properties`}>
                {t('hero.cta1')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 bg-white/10 border-white/30 hover:bg-white/20"
            >
              <Link href={`/${locale}/calculator`}>{t('hero.cta2')}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto text-center">
            <ScrollReveal>
              <h2
                className="uppercase font-[800] mb-5"
                style={{
                  color: '#1a1a2e',
                  fontSize: '36px',
                  letterSpacing: '2px',
                }}
              >
                Straits Advisory
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p
                className="uppercase font-semibold mb-8"
                style={{
                  color: '#1a1a2e',
                  fontSize: '14px',
                  letterSpacing: '3px',
                }}
              >
                Technology Meets Expertise
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p
                className="mx-auto"
                style={{
                  color: '#374151',
                  fontSize: '16px',
                  lineHeight: 1.8,
                  maxWidth: '750px',
                }}
              >
                As Malaysia&apos;s most technologically advanced property consultancy, we bring together decades of experience enhanced by cutting-edge AI, real-time analytics and proprietary technology. We serve our clients with transparency and precision, no pressure tactics, just data-driven guidance tailored to your goals.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t(`stats.${stat.label}`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value Comparison Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              {t('comparison.title')}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Singapore Card */}
            <ScrollReveal direction="left">
              <Card className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-lg">🇸🇬</span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {t('comparison.singapore')}
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium">
                      {t('comparison.sgProperty')}
                    </span>
                  </li>
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{t('comparison.sgSize')}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Tenure</span>
                    <span className="font-medium">
                      {t('comparison.sgTenure')}
                    </span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span className="text-muted-foreground">Yield</span>
                    <span className="font-medium">
                      {t('comparison.sgYield')}
                    </span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>

            {/* JB Card */}
            <ScrollReveal direction="right">
              <Card className="p-8 h-full border-primary relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {t('comparison.betterValue')}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg">🇲🇾</span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {t('comparison.johorBahru')}
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium text-primary">
                      {t('comparison.jbProperty')}
                    </span>
                  </li>
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium text-primary">
                      {t('comparison.jbSize')}
                    </span>
                  </li>
                  <li className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Tenure</span>
                    <span className="font-medium text-primary">
                      {t('comparison.jbTenure')}
                    </span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span className="text-muted-foreground">Yield</span>
                    <span className="font-medium text-primary">
                      {t('comparison.jbYield')}
                    </span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('featured.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <ScrollReveal key={property.id} delay={index * 0.1}>
                <PropertyCard property={property} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href={`/${locale}/properties`}>
                  {t('featured.viewAll')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              {t('testimonials.title')}
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {testimonials[activeTestimonial] && (
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl mb-8 italic">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-lg">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="text-muted-foreground">
                        {testimonials[activeTestimonial].role} •{' '}
                        {testimonials[activeTestimonial].property}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeTestimonial
                      ? 'bg-primary'
                      : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl opacity-90 mb-10">{t('cta.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8"
                  onClick={() =>
                    window.open('https://wa.me/6591234567', '_blank')
                  }
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t('cta.whatsapp')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground"
                >
                  Start Assessment
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
