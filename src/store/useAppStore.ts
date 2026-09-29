import { create } from 'zustand';

export interface AppState {
  kioskMode: boolean;
  theme: 'museum-day' | 'kiosk-night';
  language: string;
  isIdle: boolean;
  idleCountdown: number;
  showIdleModal: boolean;
  
  setKioskMode: (enabled: boolean) => void;
  setTheme: (theme: 'museum-day' | 'kiosk-night') => void;
  setLanguage: (lang: string) => void;
  setIsIdle: (idle: boolean) => void;
  setIdleCountdown: (count: number) => void;
  setShowIdleModal: (show: boolean) => void;
  resetSession: () => void;
}

const isKioskQuery = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('kiosk') === '1';

export const useAppStore = create<AppState>((set) => ({
  kioskMode: isKioskQuery || false,
  theme: 'kiosk-night',
  language: 'en',
  isIdle: false,
  idleCountdown: 30,
  showIdleModal: false,

  setKioskMode: (enabled) => {
    set({ kioskMode: enabled });
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('kiosk-mode', enabled);
    }
  },
  setTheme: (theme) => {
    set({ theme });
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  },
  setLanguage: (language) => set({ language }),
  setIsIdle: (isIdle) => set({ isIdle }),
  setIdleCountdown: (idleCountdown) => set({ idleCountdown }),
  setShowIdleModal: (showIdleModal) => set({ showIdleModal }),
  resetSession: () => {
    set({
      isIdle: false,
      idleCountdown: 30,
      showIdleModal: false,
    });
  },
}));
