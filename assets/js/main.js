import { initNavigation } from './navigation.js';
import { initScrollReveal } from './animations.js';
import { initPricing } from './pricing.js';
import { initProductDemo } from './product-demo.js';
import { initTemplateSwitcher } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initPricing();
  initProductDemo();
  initTemplateSwitcher();
});
