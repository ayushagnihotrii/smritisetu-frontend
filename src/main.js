/**
 * SMRITI SETU - APPLICATION MAIN ENTRY
 * Craft-driven frontend architecture uniting GSAP canvas scrubbing,
 * tactile denim design tokens, and archival interactivity.
 */

import './styles/main.css';
import { FrameScrubber } from './scripts/frameScrubber.js';
import { initInteractiveFeatures } from './scripts/interactiveFeatures.js';
import { initGsapAnimations } from './scripts/gsapAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize GSAP Canvas Frame Scrubber (240 video frames at 1080p)
  const scrubber = new FrameScrubber({
    canvasId: 'revealCanvas',
    frameCount: 240,
    framePrefix: '/frames/frame_',
    frameExt: '.jpg'
  });

  // 2. Initialize Catalog, Inspector, Modal & Form
  initInteractiveFeatures();

  // 3. Initialize GSAP ScrollTrigger & Entrance Animations
  initGsapAnimations();

  // 4. Smooth Anchor Scrolling & Active Link Spy
  setupNavigation();
});

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
