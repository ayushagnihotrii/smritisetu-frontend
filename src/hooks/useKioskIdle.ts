import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook to manage Kiosk Idle Timer:
 * - 60s inactivity triggers warning countdown modal (30s remaining)
 * - 90s total inactivity triggers full reset to Attract Screen (/kiosk-attract)
 * - Activity (touch, mouse, key) resets the timer
 */
export function useKioskIdle() {
  const { 
    kioskMode, 
    showIdleModal, 
    setShowIdleModal, 
    setIdleCountdown, 
    idleCountdown, 
    resetSession,
    setIsIdle 
  } = useAppStore();

  const navigate = useNavigate();
  const location = useLocation();

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (!kioskMode) return;

    // Clear existing timers
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setShowIdleModal(false);
    setIdleCountdown(30);

    // If on attract screen, no need to trigger warning
    if (location.pathname === '/kiosk-attract') return;

    // Start 60s idle timer -> then open modal with 30s countdown
    idleTimerRef.current = setTimeout(() => {
      setShowIdleModal(true);
      setIdleCountdown(30);

      countdownIntervalRef.current = setInterval(() => {
        const state = useAppStore.getState();
        if (state.idleCountdown <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          state.resetSession();
          state.setIsIdle(true);
          navigate('/kiosk-attract');
        } else {
          state.setIdleCountdown(state.idleCountdown - 1);
        }
      }, 1000);
    }, 60000); // 60 seconds
  };

  useEffect(() => {
    if (!kioskMode) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setShowIdleModal(false);
      return;
    }

    const events = ['pointerdown', 'touchstart', 'mousemove', 'keydown', 'scroll'];
    const handleActivity = () => {
      // If modal is not open, reset timer
      const state = useAppStore.getState();
      if (!state.showIdleModal) {
        resetTimer();
      }
    };

    events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [kioskMode, location.pathname]);

  return { resetTimer };
}
