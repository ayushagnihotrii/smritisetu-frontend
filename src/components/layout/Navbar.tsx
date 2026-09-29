import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { supportedLanguages } from '@/i18n/config';
import { 
  BookOpen, 
  Languages, 
  Monitor, 
  Sun, 
  Moon, 
  Menu, 
  X,
  MessageSquare,
  Bot,
  Calendar,
  ShieldCheck,
  Search,
  ArrowDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { kioskMode, setKioskMode, theme, setTheme } = useAppStore();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === '/';

  // Listen to scroll to seamlessly adapt styling from Light Video Scrub to Dark Denim Archive
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.home'), icon: BookOpen },
    { path: '/archive', label: t('nav.archive'), icon: Search },
    { path: '/chat', label: t('nav.chat'), icon: MessageSquare },
    { path: '/avatar', label: t('nav.avatar'), icon: Bot },
    { path: '/timeline', label: t('nav.timeline'), icon: Calendar },
    { path: '/admin', label: t('nav.admin'), icon: ShieldCheck },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  const scrollToHub = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine whether to use Light Cinematic Glass (over white video canvas) or Dark Denim Wash
  const isLightGlass = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
        isLightGlass
          ? 'bg-white/90 backdrop-blur-md border-b border-[#1A2B45]/15 shadow-sm text-[#1A2B45]'
          : 'bg-[#1A2B45]/95 backdrop-blur-md border-b-2 border-dashed border-[#DCB35C]/35 shadow-xl text-white'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* ===================================================================
             LEFT BRAND CREST (EXACTLY MATCHING USER SCREENSHOT)
             =================================================================== */}
        <Link to="/" className="flex items-center gap-3.5 group select-none">
          <div className="w-11 h-11 rounded-xl bg-white p-1 border-2 border-[#DCB35C] flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-[#f0c36d] transition-all overflow-hidden shrink-0">
            <img 
              src="/smriti-setu-emblem.png" 
              alt="Smriti Setu Official Crest" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className={`font-serif text-lg font-extrabold tracking-wide ${isLightGlass ? 'text-[#1A2B45]' : 'text-white'}`}>
              SMRITI SETU
            </div>
            <div className={`font-mono text-[10px] font-semibold tracking-widest uppercase ${isLightGlass ? 'text-[#506584]' : 'text-[#DCB35C]'}`}>
              SIH26096 • DR. B. R. AMBEDKAR ARCHIVE
            </div>
          </div>
        </Link>

        {/* ===================================================================
             CENTER DESKTOP NAV LINKS
             =================================================================== */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? 'bg-[#DCB35C] text-[#0E1624] shadow-sm'
                    : isLightGlass
                    ? 'text-[#1A2B45] hover:bg-[#1A2B45]/10'
                    : 'text-[#B8C8DF] hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ===================================================================
             RIGHT ACTIONS (EXACTLY MATCHING USER SCREENSHOT)
             =================================================================== */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Ministry of Social Justice Selvedge Badge */}
          <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-[#FBF9F4] text-[#1A2B45] font-mono text-[10px] font-bold rounded border border-[#C93B2B]/40 shadow-sm border-l-4 border-l-[#C93B2B] uppercase tracking-wider">
            MINISTRY OF SOCIAL JUSTICE
          </div>

          {/* Skip to Hub button (shown when at the top of the video reveal) */}
          {isHome && (
            <button
              onClick={scrollToHub}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                isLightGlass
                  ? 'bg-[#1A2B45]/10 hover:bg-[#1A2B45]/20 text-[#1A2B45] border border-[#1A2B45]/20'
                  : 'bg-[#DCB35C]/20 hover:bg-[#DCB35C]/30 text-[#DCB35C] border border-[#DCB35C]/40'
              }`}
              title="Skip to Archive Hub"
            >
              <span>Skip to Hub</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          )}

          {/* 12-Language Picker */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs font-mono transition-colors ${
                isLightGlass
                  ? 'bg-[#1A2B45]/5 hover:bg-[#1A2B45]/10 text-[#1A2B45] border-[#1A2B45]/20'
                  : 'bg-[#121E33] hover:bg-[#223C63] text-white border-[#DCB35C]/30'
              }`}
              title="Change Language"
              aria-label="Change Language"
            >
              <Languages className="w-4 h-4 text-[#DCB35C]" />
              <span className="hidden lg:inline">
                {supportedLanguages.find((l) => l.code === i18n.language)?.native || 'English'}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-xl shadow-2xl z-50 p-2 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-mono text-[#DCB35C] uppercase tracking-wider border-b border-[#DCB35C]/20 mb-1">
                  12 Indian Languages (भारतीय भाषाएं)
                </div>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[#DCB35C] text-[#0E1624] font-bold'
                        : 'text-[#B8C8DF] hover:bg-[#223C63] hover:text-white'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] font-mono opacity-70">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Kiosk Mode Toggle */}
          <button
            onClick={() => setKioskMode(!kioskMode)}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              kioskMode
                ? 'bg-[#DCB35C] text-[#0E1624] border-[#DCB35C] font-bold shadow-md'
                : isLightGlass
                ? 'bg-[#1A2B45]/5 hover:bg-[#1A2B45]/10 text-[#1A2B45] border-[#1A2B45]/20'
                : 'bg-[#121E33] hover:bg-[#223C63] text-white border-[#DCB35C]/30'
            }`}
            title={kioskMode ? 'Exit Kiosk Mode' : 'Enter Kiosk Touch Mode'}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">{kioskMode ? 'KIOSK ON' : 'KIOSK'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'kiosk-night' ? 'museum-day' : 'kiosk-night')}
            className={`p-2 rounded-lg border transition-colors ${
              isLightGlass
                ? 'bg-[#1A2B45]/5 hover:bg-[#1A2B45]/10 text-[#1A2B45] border-[#1A2B45]/20'
                : 'bg-[#121E33] hover:bg-[#223C63] text-white border-[#DCB35C]/30'
            }`}
            title="Toggle Museum Theme"
            aria-label="Toggle Theme"
          >
            {theme === 'kiosk-night' ? (
              <Sun className="w-4 h-4 text-[#DCB35C]" />
            ) : (
              <Moon className="w-4 h-4 text-[#1E3A8A]" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 xl:hidden rounded-lg ${isLightGlass ? 'text-[#1A2B45]' : 'text-white'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1A2B45] border-t border-dashed border-[#DCB35C]/30 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DCB35C] text-[#0E1624] font-bold'
                    : 'text-[#B8C8DF] hover:bg-[#223C63] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
