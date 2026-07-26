import { initNavigation } from './navigation.js';
import { initScrollReveal } from './animations.js';
import { initPricing } from './pricing.js?v=20260726.3';
import { initProductDemo } from './product-demo.js';
import { initContactForm } from './contact.js';
import { initPremiumMotion } from './premium-motion.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initPricing();
  initProductDemo();
  initContactForm();
  initPremiumMotion();
});
