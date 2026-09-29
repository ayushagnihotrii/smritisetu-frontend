import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { useKioskIdle } from '@/hooks/useKioskIdle';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { IdleWarningModal } from '@/components/kiosk/IdleWarningModal';

// Code-split heavy route modules for Lighthouse 90+ performance
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const ArchiveExplorer = lazy(() => import('@/pages/ArchiveExplorer').then(m => ({ default: m.ArchiveExplorer })));
const Chat = lazy(() => import('@/pages/Chat').then(m => ({ default: m.Chat })));
const Avatar = lazy(() => import('@/pages/Avatar').then(m => ({ default: m.Avatar })));
const Timeline = lazy(() => import('@/pages/Timeline').then(m => ({ default: m.Timeline })));
const Admin = lazy(() => import('@/pages/Admin').then(m => ({ default: m.Admin })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const KioskAttract = lazy(() => import('@/pages/KioskAttract').then(m => ({ default: m.KioskAttract })));

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 text-[#DCB35C]">
    <div className="w-12 h-12 border-4 border-[#DCB35C] border-t-transparent rounded-full animate-spin mb-4" />
    <span className="font-mono text-xs uppercase tracking-widest">LOADING ARCHIVAL ASSETS...</span>
  </div>
);

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { kioskMode, theme } = useAppStore();

  // Initialize kiosk idle hook (60s warn, 90s reset)
  useKioskIdle();

  const isAttract = location.pathname === '/kiosk-attract';
  const isAvatar = location.pathname === '/avatar';
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('kiosk-mode', kioskMode);
  }, [theme, kioskMode]);

  return (
    <div className={`app-shell ${kioskMode ? 'kiosk-active' : ''}`}>
      {/* Global Kiosk Idle Warning Countdown Modal */}
      <IdleWarningModal />

      {!isAttract && !isAvatar && <Navbar />}

      <main className={`main-content-flow ${!isHome && !isAttract && !isAvatar ? 'pt-16' : ''}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<ArchiveExplorer />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/avatar" element={<Avatar />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/kiosk-attract" element={<KioskAttract />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      {!isAttract && !isAvatar && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
