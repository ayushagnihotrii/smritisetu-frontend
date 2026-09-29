/**
 * SMRITI SETU - GSAP SCROLL & ENTRANCE ANIMATIONS
 * Strictly adhering to design tokens:
 * Physics: Ease-out curves, 420ms duration, 80ms stagger.
 * Only transform & opacity animated for 60fps performance.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGsapAnimations() {
  const heroElements = document.querySelectorAll('.hero-anim-item');
  if (heroElements.length) {
    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#hero-intro',
          start: 'top 80%'
        }
      }
    );
  }

  const featureRows = document.querySelectorAll('.zigzag-row');
  featureRows.forEach((row) => {
    const textCol = row.querySelector('.zigzag-text-col');
    const visualCol = row.querySelector('.zigzag-visual-col');

    if (textCol && visualCol) {
      gsap.fromTo(
        [textCol, visualCol],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  const catalogGrid = document.getElementById('catalogGrid');
  if (catalogGrid) {
    ScrollTrigger.create({
      trigger: catalogGrid,
      start: 'top 85%',
      onEnter: () => {
        const cards = catalogGrid.querySelectorAll('.record-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.08,
            ease: 'power2.out'
          }
        );
      }
    });
  }

  const dividers = document.querySelectorAll('.stitch-divider');
  dividers.forEach((divider) => {
    gsap.fromTo(
      divider,
      { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
      {
        scaleX: 1,
        opacity: 0.55,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: divider,
          start: 'top 90%'
        }
      }
    );
  });
}
