/**
 * SMRITI SETU - CINEMATIC FULLSCREEN FRAME SCRUBBER
 * 60fps/120fps jitter-free canvas rendering with pre-decoded 1080p images,
 * requestAnimationFrame decoupling, and GSAP ScrollTrigger pinning.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class FrameScrubber {
  constructor(options = {}) {
    this.canvas = document.getElementById(options.canvasId || 'revealCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });

    this.frameCount = options.frameCount || 240;
    this.framePrefix = options.framePrefix || '/frames/frame_';
    this.frameExt = options.frameExt || '.jpg';
    this.images = new Array(this.frameCount);
    
    // Smooth frame interpolation (Zero Jitter)
    this.targetFrame = 0;
    this.currentRenderedFrame = -1;
    this.smoothFrame = 0;
    this.isPlaying = false;
    this.animFrameId = null;
    this.lastTime = 0;
    this.isLoaded = false;

    // UI Overlay elements
    this.hudCounter = document.getElementById('cinematicHudCounter');
    this.hudProgress = document.getElementById('cinematicProgressFill');
    this.playBtn = document.getElementById('cinematicPlayBtn');
    this.preloader = document.getElementById('cinematicPreloader');
    this.preloaderFill = document.getElementById('cinematicPreloaderFill');
    this.preloaderPercent = document.getElementById('cinematicPreloaderPercent');

    this.init();
  }

  getFramePath(index) {
    const padded = String(index + 1).padStart(4, '0');
    return `${this.framePrefix}${padded}${this.frameExt}`;
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.max(window.devicePixelRatio || 1, 1.5); // Sharp Retina supersampling

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    if (this.currentRenderedFrame >= 0) {
      this.draw(this.currentRenderedFrame);
    }
  }

  draw(frameIndex) {
    const clamped = Math.max(0, Math.min(Math.round(frameIndex), this.frameCount - 1));
    const img = this.images[clamped];

    const cw = this.canvas.width;
    const ch = this.canvas.height;

    // Pure white canvas background matching video background
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, cw, ch);

    if (!img || !img.complete || img.naturalWidth === 0) {
      const fallback = this.images.find(im => im && im.complete && im.naturalWidth > 0);
      if (fallback) {
        this.renderImageToCanvas(fallback, cw, ch);
      }
      return;
    }

    this.renderImageToCanvas(img, cw, ch);
    this.updateOverlayUI(clamped);
  }

  renderImageToCanvas(img, cw, ch) {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.min(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const x = (cw - nw) / 2;
    const y = (ch - nh) / 2;

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.drawImage(img, 0, 0, iw, ih, x, y, nw, nh);
  }

  updateOverlayUI(index) {
    const frameNum = index + 1;
    if (this.hudCounter) {
      this.hudCounter.textContent = `${String(frameNum).padStart(3, '0')} / ${this.frameCount}`;
    }

    const progress = (index / (this.frameCount - 1)) * 100;
    if (this.hudProgress) {
      this.hudProgress.style.width = `${progress}%`;
    }
  }

  async preloadFrames() {
    let loaded = 0;

    // Load first frame immediately to render without delay
    const firstImg = new Image();
    firstImg.src = this.getFramePath(0);
    firstImg.onload = async () => {
      try { await firstImg.decode(); } catch (e) {}
      this.images[0] = firstImg;
      this.draw(0);
    };

    const loadSingle = async (i) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = this.getFramePath(i);
        img.onload = async () => {
          try {
            await img.decode();
          } catch (e) {}
          this.images[i] = img;
          loaded++;
          this.onProgress(loaded);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          this.onProgress(loaded);
          resolve();
        };
      });
    };

    const batchSize = 16;
    for (let i = 0; i < this.frameCount; i += batchSize) {
      const batch = [];
      for (let j = i; j < Math.min(i + batchSize, this.frameCount); j++) {
        batch.push(loadSingle(j));
      }
      await Promise.all(batch);
    }

    this.isLoaded = true;
    if (this.preloader) {
      this.preloader.classList.add('fade-out');
      setTimeout(() => {
        this.preloader.style.display = 'none';
      }, 500);
    }
  }

  onProgress(loaded) {
    const pct = Math.round((loaded / this.frameCount) * 100);
    if (this.preloaderFill) {
      this.preloaderFill.style.width = `${pct}%`;
    }
    if (this.preloaderPercent) {
      this.preloaderPercent.textContent = `${pct}%`;
    }
  }

  startRenderLoop() {
    const loop = (timestamp) => {
      if (this.isPlaying) {
        const delta = timestamp - this.lastTime;
        const interval = 1000 / 24; // 24 FPS
        if (delta >= interval) {
          this.lastTime = timestamp - (delta % interval);
          this.targetFrame = (this.targetFrame + 1) % this.frameCount;
        }
      }

      // Smooth interpolation for butter-smooth scrub
      const diff = this.targetFrame - this.smoothFrame;
      if (Math.abs(diff) > 0.01) {
        this.smoothFrame += diff * 0.35;
      } else {
        this.smoothFrame = this.targetFrame;
      }

      const rounded = Math.round(this.smoothFrame);
      if (rounded !== this.currentRenderedFrame) {
        this.draw(rounded);
        this.currentRenderedFrame = rounded;
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  setupScrollTrigger() {
    const heroSection = document.getElementById('cinematic-hero');
    if (!heroSection) return;

    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: '+=240%',
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!this.isPlaying) {
          this.targetFrame = self.progress * (this.frameCount - 1);
        }
      }
    });
  }

  setupControls() {
    window.addEventListener('resize', () => this.resizeCanvas());

    if (this.playBtn) {
      this.playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    if (this.canvas) {
      this.canvas.addEventListener('click', () => {
        this.togglePlay();
      });
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.playBtn) {
      if (this.isPlaying) {
        this.playBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
          <span>Pause Reel</span>
        `;
      } else {
        this.playBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Play Full Reel</span>
        `;
      }
    }
    this.lastTime = performance.now();
  }

  init() {
    this.resizeCanvas();
    this.startRenderLoop();
    this.setupControls();
    this.setupScrollTrigger();
    this.preloadFrames();
  }
}
