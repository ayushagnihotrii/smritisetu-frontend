import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { supportedLanguages } from '@/i18n/config';
import { 
  Languages, 
  Monitor, 
  Menu, 
  X,
  MessageSquare,
  Bot,
  Calendar,
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { kioskMode, setKioskMode } = useAppStore();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/archive', label: 'Archive', icon: Search },
    { path: '/chat', label: 'Ask AI', icon: MessageSquare },
    { path: '/avatar', label: 'Avatar', icon: Bot },
    { path: '/timeline', label: 'Timeline', icon: Calendar },
    { path: '/admin', label: 'Admin', icon: ShieldCheck },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  const isLightGlass = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
        isLightGlass
          ? 'bg-white/92 backdrop-blur-xl border-b border-slate-200/60 text-slate-800'
          : 'bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/[0.06] text-white'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group select-none shrink-0">
          <div className="w-9 h-9 rounded-lg bg-white p-0.5 border border-[#DCB35C]/40 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden shrink-0">
            <img 
              src="/smriti-setu-emblem.png" 
              alt="Smriti Setu" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className={`font-serif text-base font-bold tracking-wide ${isLightGlass ? 'text-slate-900' : 'text-white'}`}>
              SmritiSetu
            </div>
            <div className={`font-mono text-[10px] font-medium tracking-wider uppercase ${isLightGlass ? 'text-slate-500' : 'text-slate-400'}`}>
              SIH26096 • Heritage Archive
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DCB35C] text-slate-900'
                    : isLightGlass
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isLightGlass
                  ? 'hover:bg-slate-100 text-slate-600'
                  : 'hover:bg-white/[0.06] text-slate-400'
              }`}
              title="Change Language"
              aria-label="Change Language"
            >
              <Languages className="w-4 h-4" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl z-50 p-1.5 max-h-80 overflow-y-auto">
                <div className="px-3 py-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Select Language
                </div>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[#DCB35C] text-slate-900 font-semibold'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-xs font-mono opacity-60">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Kiosk Toggle */}
          <button
            onClick={() => setKioskMode(!kioskMode)}
            className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-colors ${
              kioskMode
                ? 'bg-[#DCB35C] text-slate-900'
                : isLightGlass
                ? 'hover:bg-slate-100 text-slate-600'
                : 'hover:bg-white/[0.06] text-slate-400'
            }`}
            title={kioskMode ? 'Exit Kiosk Mode' : 'Kiosk Mode'}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">{kioskMode ? 'Kiosk On' : 'Kiosk'}</span>
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 lg:hidden rounded-lg ${isLightGlass ? 'text-slate-700' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t border-white/[0.06] p-3 space-y-1">
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
                    ? 'bg-[#DCB35C] text-slate-900 font-semibold'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
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
