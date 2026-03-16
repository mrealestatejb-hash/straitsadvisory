'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Can foreigners buy property in Johor Bahru?",
    answer: "Yes! Foreigners can purchase freehold property in Johor Bahru with minimal restrictions. The minimum purchase price for foreign buyers is RM1 million. Malaysia offers one of the most foreigner-friendly property ownership policies in Southeast Asia."
  },
  {
    question: "What's the buying process like?",
    answer: "The process typically takes 3-4 months: 1) Property selection and viewing, 2) Booking with deposit (RM10,000-50,000), 3) Sign Sale & Purchase Agreement within 14 days, 4) Loan application if needed, 5) Progressive payments, 6) Key collection. We guide you through every step."
  },
  {
    question: "What's the minimum budget needed?",
    answer: "Properties at R&F Princess Cove start from S$180,000 (approximately RM600,000) for studio units. For a comfortable 2-bedroom unit, budget around S$280,000-350,000. We can help you find options that match your investment goals."
  },
  {
    question: "How far is the RTS Link station?",
    answer: "R&F Princess Cove is just 500-650 meters from the upcoming RTS Link station (Bukit Chagar), opening in January 2027. This means a 5-6 minute walk to cross into Singapore via the new rail link, revolutionizing cross-border commuting."
  },
  {
    question: "What rental yields can I expect?",
    answer: "Current rental yields at R&F Princess Cove range from 6-8% annually, significantly higher than Singapore's 2-3%. With the RTS Link opening in 2027, yields are expected to increase as demand from Singapore commuters grows."
  },
  {
    question: "Do you assist with financing?",
    answer: "Absolutely. We work with Malaysian banks that offer up to 70% financing for foreign buyers. Interest rates are typically 4-5% p.a. We'll connect you with our banking partners and help prepare all required documentation."
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const questionListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const questionItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const answerCardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' as const },
  },
};

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked{' '}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about buying property in Johor Bahru
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="hidden md:grid md:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto"
        >
          {/* Questions List - Left Side */}
          <motion.div variants={questionListVariants} className="col-span-2 space-y-2">
            {faqs.map((faq, index) => (
              <motion.button
                key={index}
                variants={questionItemVariants}
                onClick={() => setActiveIndex(index)}
                whileHover={{
                  x: 4,
                  backgroundColor: 'hsl(var(--muted) / 0.5)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative w-full text-left py-4 px-4 rounded-xl flex items-start gap-3 ${
                  index === activeIndex
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active indicator with layoutId for smooth movement */}
                <span className="relative mt-1.5 w-3 h-3 flex items-center justify-center">
                  {index === activeIndex && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute w-2.5 h-2.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span
                    className={`w-2 h-2 rounded-full border-2 transition-colors duration-200 ${
                      index === activeIndex
                        ? 'border-primary'
                        : 'border-muted-foreground/40'
                    }`}
                  />
                </span>
                <motion.span
                  className="font-medium leading-snug"
                  animate={{
                    color: index === activeIndex ? 'hsl(var(--primary))' : 'inherit',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {faq.question}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>

          {/* Answer Card - Right Side */}
          <motion.div variants={answerCardVariants} className="col-span-3">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full"
            >
              <div className="bg-background rounded-2xl p-8 shadow-xl border h-full min-h-[280px] relative overflow-hidden">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      {faqs[activeIndex].question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {faqs[activeIndex].answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile Layout - Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="md:hidden space-y-3 max-w-2xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={questionItemVariants}
              className="rounded-xl overflow-hidden border bg-background shadow-sm"
            >
              <motion.button
                onClick={() => setExpandedMobile(expandedMobile === index ? -1 : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4"
                whileTap={{ scale: 0.995 }}
              >
                <span
                  className={`font-medium transition-colors duration-200 ${
                    expandedMobile === index ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedMobile === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                      expandedMobile === index ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {expandedMobile === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      <div className="pt-2 border-t">
                        <p className="text-muted-foreground leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
