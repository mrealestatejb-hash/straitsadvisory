import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Configure for performance
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger };
