'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

type Step = 1 | 2 | 3 | 4 | 5 | 'complete';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
}

interface Answers {
  purpose?: string;
  budget?: string;
  area?: string;
  timeline?: string;
  proceed?: string;
}

const stepOptions: Record<number, { key: string; options: string[] }> = {
  1: { key: 'q1', options: ['q1o1', 'q1o2', 'q1o3'] },
  2: { key: 'q2', options: ['q2o1', 'q2o2', 'q2o3', 'q2o4'] },
  3: { key: 'q3', options: ['q3o1', 'q3o2', 'q3o3', 'q3o4'] },
  4: { key: 'q4', options: ['q4o1', 'q4o2', 'q4o3', 'q4o4'] },
  5: { key: 'q5', options: ['q5o1', 'q5o2', 'q5o3'] },
};

export function ChatBot() {
  const t = useTranslations('chat');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [messageId, setMessageId] = useState(0);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(t('welcome'));
      setTimeout(() => {
        addBotMessage(t('q1'));
      }, 500);
    }
  }, []);

  const addBotMessage = (content: string) => {
    setMessageId((prev) => {
      const newId = prev + 1;
      setMessages((msgs) => [...msgs, { id: newId, type: 'bot', content }]);
      return newId;
    });
  };

  const addUserMessage = (content: string) => {
    setMessageId((prev) => {
      const newId = prev + 1;
      setMessages((msgs) => [...msgs, { id: newId, type: 'user', content }]);
      return newId;
    });
  };

  const handleOptionSelect = (optionKey: string, optionText: string) => {
    addUserMessage(optionText);

    // Store answer
    const answerKeys: Record<number, keyof Answers> = {
      1: 'purpose',
      2: 'budget',
      3: 'area',
      4: 'timeline',
      5: 'proceed',
    };

    if (typeof step === 'number') {
      setAnswers((prev) => ({ ...prev, [answerKeys[step]]: optionKey }));

      // Move to next step
      setTimeout(() => {
        if (step < 5) {
          const nextStep = (step + 1) as Step;
          setStep(nextStep);
          addBotMessage(t(stepOptions[nextStep as number].key));
        } else {
          setStep('complete');
          addBotMessage(
            "Thank you! Based on your preferences, I'll connect you with our specialist. They'll reach out within 24 hours with personalized recommendations."
          );
        }
      }, 300);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setAnswers({});
    setStep(1);
    setMessageId(0);
    setTimeout(() => {
      addBotMessage(t('welcome'));
      setTimeout(() => {
        addBotMessage(t('q1'));
      }, 500);
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        </DrawerTrigger>

        <DrawerContent className="h-[85vh] max-h-[700px]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <DrawerTitle>Straits Advisory</DrawerTitle>
                  <p className="text-xs text-muted-foreground">
                    Property Advisor
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DrawerHeader>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Options */}
            {typeof step === 'number' && step <= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {stepOptions[step].options.map((optionKey) => (
                  <Button
                    key={optionKey}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionSelect(optionKey, t(optionKey))}
                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {t(optionKey)}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                ))}
              </motion.div>
            )}

            {/* Complete State */}
            {step === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3 pt-4"
              >
                <Button
                  onClick={() =>
                    window.open('https://wa.me/6591234567', '_blank')
                  }
                  className="w-full"
                >
                  WhatsApp Us Now
                </Button>
                <Button variant="outline" onClick={resetChat}>
                  Start Over
                </Button>
              </motion.div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                {typeof step === 'number'
                  ? `Step ${step} of 5`
                  : 'Assessment Complete'}
              </span>
              <span className="text-xs text-muted-foreground">
                {typeof step === 'number'
                  ? `${Math.round((step / 5) * 100)}%`
                  : '100%'}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{
                  width:
                    typeof step === 'number'
                      ? `${(step / 5) * 100}%`
                      : '100%',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
