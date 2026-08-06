import { initNavigation } from './navigation.js';
import { initScrollReveal } from './animations.js';
import { initPricing } from './pricing.js?v=20260806.1';
import { initProductDemo } from './product-demo.js';
import { initContactForm } from './contact.js?v=20260806.1';
import { initPremiumMotion } from './premium-motion.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initPricing();
  initProductDemo();
  initContactForm();
  initPremiumMotion();
});
