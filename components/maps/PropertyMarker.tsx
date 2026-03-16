'use client';

import { motion } from 'framer-motion';

interface PropertyMarkerProps {
  price: number;
  isSelected: boolean;
  onClick?: () => void;
}

export function PropertyMarker({ price, isSelected, onClick }: PropertyMarkerProps) {
  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected ? 'z-10' : 'z-0'
      }`}
    >
      <div
        className={`
          px-3 py-1.5 rounded-full font-semibold text-sm whitespace-nowrap
          shadow-lg transition-colors duration-200
          ${
            isSelected
              ? 'bg-primary text-primary-foreground scale-110'
              : 'bg-background text-foreground hover:bg-primary hover:text-primary-foreground'
          }
        `}
      >
        S${(price / 1000).toFixed(0)}K
      </div>
      <div
        className={`
          w-3 h-3 rotate-45 mx-auto -mt-1.5
          transition-colors duration-200
          ${isSelected ? 'bg-primary' : 'bg-background'}
        `}
      />
    </motion.div>
  );
}
