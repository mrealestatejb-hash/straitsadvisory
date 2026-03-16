'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  Globe,
  Building2,
  MessageCircle,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const trustSignals = [
  {
    icon: Shield,
    title: 'Dual Licensed',
    description: 'Licensed real estate agency in both Singapore (CEA) and Malaysia (BOVAEA)',
  },
  {
    icon: Award,
    title: '500+ Transactions',
    description: 'Successfully completed over 500 cross-border property transactions',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Bilingual specialists with deep knowledge of SG-JB property markets',
  },
  {
    icon: TrendingUp,
    title: 'Proven Returns',
    description: 'Average 18% capital appreciation and 6.2% rental yields for our clients',
  },
  {
    icon: Globe,
    title: 'End-to-End Service',
    description: 'From property search to legal completion, financing to rental management',
  },
  {
    icon: Building2,
    title: 'Premium Portfolio',
    description: 'Curated selection of high-quality developments near RTS and amenities',
  },
];

const team = [
  {
    name: 'David Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: '15 years in Singapore real estate, pioneer in JB cross-border investments',
  },
  {
    name: 'Sarah Lim',
    role: 'Head of Sales',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Former PropNex top producer, specialist in luxury and waterfront properties',
  },
  {
    name: 'Ahmad Rahman',
    role: 'Malaysia Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Native JB expert, handles legal, financing and property management',
  },
  {
    name: 'Michelle Tan',
    role: 'Client Relations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Ensures seamless client experience from first viewing to key collection',
  },
];

const milestones = [
  { year: '2018', event: 'Founded in Singapore' },
  { year: '2019', event: 'Expanded to Johor Bahru' },
  { year: '2020', event: '100th transaction milestone' },
  { year: '2022', event: 'Launched virtual tour platform' },
  { year: '2023', event: '500+ transactions completed' },
  { year: '2024', event: 'RTS-focused portfolio launch' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Est. 2018
              </span>
            </div>
          </ScrollReveal>

          <TextReveal className="text-4xl md:text-6xl font-bold mb-6" immediate delay={0.2}>
            Singapore&apos;s Gateway to JB Property
          </TextReveal>

          <ScrollReveal>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Straits Advisory is a specialist real estate advisory firm helping
              Singaporeans invest in Johor Bahru property. With the RTS Link
              launching in 2026, we&apos;re positioned to help you capitalize on the
              unprecedented growth in the Singapore-JB corridor.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-muted py-20 mb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Straits Advisory?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trustSignals.map((signal, index) => (
              <ScrollReveal key={signal.title} delay={index * 0.1}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <signal.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{signal.title}</h3>
                  <p className="text-muted-foreground">{signal.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Journey
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {/* Milestones */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <ScrollReveal
                  key={milestone.year}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div
                    className={`relative flex items-center gap-6 ${
                      index % 2 === 0
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse md:text-right'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                      <div className="bg-background border rounded-lg p-4 shadow-sm">
                        <span className="text-2xl font-bold text-primary">
                          {milestone.year}
                        </span>
                        <p className="text-muted-foreground mt-1">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted py-20 mb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Meet the Team
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our bilingual team combines deep expertise in both Singapore and
              Malaysia property markets.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <Card className="overflow-hidden text-center">
                  <div className="aspect-square relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Services
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Property Search & Selection',
                items: [
                  'Curated property recommendations',
                  'Virtual and in-person viewings',
                  'Market analysis and due diligence',
                  'Price negotiation',
                ],
              },
              {
                title: 'Transaction Support',
                items: [
                  'Legal documentation',
                  'Malaysian mortgage arrangement',
                  'Currency exchange guidance',
                  'Stamp duty and tax advice',
                ],
              },
              {
                title: 'Post-Purchase Services',
                items: [
                  'Property management',
                  'Tenant sourcing',
                  'Rental collection',
                  'Maintenance coordination',
                ],
              },
              {
                title: 'Investment Advisory',
                items: [
                  'Portfolio planning',
                  'Exit strategy consultation',
                  'Market updates and insights',
                  'Resale assistance',
                ],
              },
            ].map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your JB Property Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Get in touch with our team for a free consultation and
                personalized property recommendations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg"
                  onClick={() =>
                    window.open('https://wa.me/6591234567', '_blank')
                  }
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +65 9123 4567
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col md:flex-row gap-6 justify-center text-sm opacity-80">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>1 Raffles Place, #20-61, Singapore 048616</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@straitsadvisory.com</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
