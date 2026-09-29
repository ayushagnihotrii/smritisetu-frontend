import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VideoHeroScrubber: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const frameCount = 240;
  const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount));
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const currentRenderedRef = useRef(-1);
  const isPlayingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const getFramePath = (idx: number) => {
    const padded = String(idx + 1).padStart(4, '0');
    return `/frames/frame_${padded}.jpg`;
  };

  const renderFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(Math.round(idx), frameCount - 1));
    const img = imagesRef.current[clamped];

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cw, ch);

    if (!img || !img.complete || img.naturalWidth === 0) {
      const fallback = imagesRef.current.find((im) => im && im.complete && im.naturalWidth > 0);
      if (fallback) {
        drawScaled(ctx, fallback, cw, ch);
      }
      return;
    }

    drawScaled(ctx, img, cw, ch);
    setCurrentFrame(clamped);
  };

  const drawScaled = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) => {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const x = (cw - nw) / 2;
    const y = (ch - nh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, iw, ih, x, y, nw, nh);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.max(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    renderFrame(currentRenderedRef.current >= 0 ? currentRenderedRef.current : 0);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dedicated RAF Render Loop (Zero Jitter)
    const loop = (timestamp: number) => {
      if (isPlayingRef.current) {
        const delta = timestamp - lastTimeRef.current;
        const interval = 1000 / 24;
        if (delta >= interval) {
          lastTimeRef.current = timestamp - (delta % interval);
          targetFrameRef.current = (targetFrameRef.current + 1) % frameCount;
        }
      }

      const diff = targetFrameRef.current - smoothFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        smoothFrameRef.current += diff * 0.35;
      } else {
        smoothFrameRef.current = targetFrameRef.current;
      }

      const rounded = Math.round(smoothFrameRef.current);
      if (rounded !== currentRenderedRef.current) {
        renderFrame(rounded);
        currentRenderedRef.current = rounded;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    // Preload all 240 high-res frames with GPU decode
    let loaded = 0;
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = async () => {
      try { await firstImg.decode(); } catch (e) {}
      imagesRef.current[0] = firstImg;
      renderFrame(0);
    };

    const loadSingle = async (i: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = async () => {
          try { await img.decode(); } catch (e) {}
          imagesRef.current[i] = img;
          loaded++;
          setLoadingPercent(Math.round((loaded / frameCount) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadingPercent(Math.round((loaded / frameCount) * 100));
          resolve();
        };
      });
    };

    (async () => {
      const batchSize = 16;
      for (let i = 0; i < frameCount; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
          batch.push(loadSingle(j));
        }
        await Promise.all(batch);
      }
      setIsLoaded(true);
    })();

    // GSAP ScrollTrigger Pinned Scrub
    const hero = heroRef.current;
    let st: ScrollTrigger | null = null;
    if (hero) {
      st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '+=240%',
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!isPlayingRef.current) {
            targetFrameRef.current = self.progress * (frameCount - 1);
          }
        },
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (st) st.kill();
    };
  }, []);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    isPlayingRef.current = nextState;
    lastTimeRef.current = performance.now();
  };

  const progressPercent = (currentFrame / (frameCount - 1)) * 100;

  return (
    <section id="cinematic-hero" ref={heroRef} className="cinematic-hero-section">
      <div className="cinematic-viewport">
        {/* Preloader */}
        {!isLoaded && (
          <div className="cinematic-preloader">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border-2 border-[#1A2B45]/20 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                <img src="/smriti-setu-emblem.png" alt="Smriti Setu Crest" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-lg font-bold text-[#1A2B45]">SMRITI SETU</span>
            </div>
            <div className="preloader-track">
              <div className="preloader-fill" style={{ width: `${loadingPercent}%` }} />
            </div>
            <div className="font-mono text-xs text-[#506584]">
              INITIALIZING 1080P MASTER REEL: {loadingPercent}%
            </div>
          </div>
        )}

        {/* 240-Frame Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-contain cursor-pointer bg-white"
          onClick={togglePlay}
          aria-label="Dr. B.R. Ambedkar Navy Paint Logo Reveal"
        />


        {/* Floating Bottom Controller Deck (Zero Overlapping Text Boxes) */}
        <div className="cinematic-bottom-deck">
          <div className="cinematic-hud-pill">
            <div className="flex items-center gap-2">
              <span className="rec-dot" />
              <span className="cinematic-hud-counter">
                {String(currentFrame + 1).padStart(3, '0')} / {frameCount}
              </span>
            </div>

            <div className="cinematic-progress-track">
              <div className="cinematic-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <button
              onClick={togglePlay}
              className="cinematic-play-btn"
              title={isPlaying ? 'Pause Reel' : 'Play Full Reel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Reel' : 'Play Full Reel'}</span>
            </button>
          </div>

          <div className="cinematic-scroll-cue">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll down to enter archive</span>
          </div>
        </div>
      </div>
    </section>
  );
};
