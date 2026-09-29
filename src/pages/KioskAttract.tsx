import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { supportedLanguages } from '@/i18n/config';
import { Sparkles, Shield, Lock, ArrowRight, Volume2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const ARCHIVAL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1920&q=85',
    quoteEn: 'Cultivation of mind should be the ultimate aim of human existence.',
    quoteHi: 'मनुष्य के अस्तित्व का अंतिम लक्ष्य मन का संवर्धन होना चाहिए।',
    source: 'Speech at Bombay, 1942',
    year: '1942'
  },
  {
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=85',
    quoteEn: 'Educate, Agitate, Organize. Have faith in yourselves.',
    quoteHi: 'शिक्षित बनो, संघर्ष करो, संगठित रहो। अपने आप में विश्वास रखो।',
    source: 'Bahishkrit Hitakarini Sabha Address',
    year: '1924'
  },
  {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85',
    quoteEn: 'Democracy is not merely a form of government. It is primarily a mode of associated living.',
    quoteHi: 'लोकतंत्र केवल शासन का एक रूप नहीं है। यह मूल रूप से सहयोगी जीवन का एक स्वरूप है।',
    source: 'Annihilation of Caste',
    year: '1936'
  },
  {
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1920&q=85',
    quoteEn: 'I measure the progress of a community by the degree of progress which women have achieved.',
    quoteHi: 'मैं किसी समुदाय की प्रगति को उस प्रगति की डिग्री से मापता हूँ जो महिलाओं ने हासिल की है।',
    source: 'All-India Depressed Classes Women’s Conference',
    year: '1942'
  }
];

export const KioskAttract: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { setKioskMode, setLanguage, setIsIdle } = useAppStore();

  const [slideIndex, setSlideIndex] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Slide rotation every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % ARCHIVAL_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Hidden admin gesture: 5 taps in top-right corner within 3s
  const handleCornerTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    if (nextCount >= 5) {
      setShowAdminModal(true);
      setTapCount(0);
    }
    setTimeout(() => setTapCount(0), 3000);
  };

  const handleBegin = (langCode?: string) => {
    if (langCode) {
      setLanguage(langCode);
      i18n.changeLanguage(langCode);
    }
    setKioskMode(true);
    setIsIdle(false);
    navigate('/');
  };

  const verifyPin = () => {
    if (adminPin === '1956' || adminPin === '2026') {
      setShowAdminModal(false);
      setKioskMode(false);
      navigate('/admin');
    } else {
      setPinError(true);
    }
  };

  const currentSlide = ARCHIVAL_SLIDES[slideIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A111C] select-none text-white font-sans">
      {/* Hidden Admin Secret Corner Tap Zone */}
      <div
        onClick={handleCornerTap}
        className="absolute top-0 right-0 w-24 h-24 z-50 cursor-pointer"
        title="Admin Tap Zone"
      />

      {/* Ken Burns Archival Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {ARCHIVAL_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
            style={{
              transition: 'opacity 1.5s ease-in-out, transform 8s ease-out',
              transform: idx === slideIndex ? 'scale(1.08)' : 'scale(1.0)'
            }}
          >
            <img
              src={slide.image}
              alt="Dr. Ambedkar Archival Heritage"
              className="w-full h-full object-cover filter brightness-[0.38] contrast-125 saturate-75"
            />
          </div>
        ))}

        {/* Denim Twill Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A111C] via-[#0E1624]/70 to-[#0A111C]/90 pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#DCB35C_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Kiosk Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white p-1.5 border-2 border-[#DCB35C] shadow-2xl flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="/smriti-setu-emblem.png" 
                alt="Smriti Setu Official Crest" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold tracking-wider text-white">
                SMRITI SETU <span className="text-[#DCB35C] font-normal">| स्मृतिसेतु</span>
              </h1>
              <p className="font-mono text-xs text-[#DCB35C] tracking-widest uppercase mt-0.5">
                SMART INDIA HACKATHON 2026 • SIH26096 • HARDWARE KIOSK
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[#DCB35C]/15 text-[#DCB35C] font-mono text-xs font-semibold uppercase tracking-wider">
              Ministry of Social Justice & Empowerment
            </span>
            <span className="px-3 py-1 rounded-md bg-white/[0.06] text-slate-300 font-mono text-xs tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#DCB35C]" />
              National Heritage Archive
            </span>
          </div>
        </div>

        {/* Center: Dynamic Quote & Audio Cue */}
        <div className="max-w-4xl mx-auto text-center my-auto py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2B45]/90 border border-[#DCB35C]/40 text-[#DCB35C] font-mono text-xs uppercase tracking-wider mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WORDS OF BABASAHEB • {currentSlide.year}</span>
          </div>

          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#FBF9F4] drop-shadow-lg mb-4">
            “{currentSlide.quoteEn}”
          </blockquote>

          <p className="font-serif text-xl md:text-2xl text-[#f0c36d] opacity-90 mb-4">
            “{currentSlide.quoteHi}”
          </p>

          <cite className="font-mono text-xs md:text-sm text-[#B8C8DF] not-italic tracking-wide">
            — Dr. B. R. Ambedkar, <span className="text-white font-medium">{currentSlide.source}</span>
          </cite>
        </div>

        {/* Bottom: Massive Touch to Begin + 12 Language Picker */}
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center gap-6">
          {/* Main Pulsing Touch Call to Action */}
          <button
            onClick={() => handleBegin()}
            className="group relative px-10 py-5 bg-[#DCB35C] hover:bg-[#c9a04a] text-[#0E1624] font-serif text-xl md:text-2xl font-bold rounded-2xl shadow-2xl flex items-center gap-4 transition-all transform hover:scale-105 active:scale-95 cursor-pointer min-h-[72px]"
          >
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E1624] opacity-50" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0E1624]" />
            </span>
            <span>TOUCH TO BEGIN / प्रारंभ करने के लिए स्पर्श करें</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Large Script-Based Flag-Free Language Selectors */}
          <div className="w-full">
            <div className="text-center font-mono text-xs text-[#DCB35C] uppercase tracking-widest mb-3">
              CHOOSE LANGUAGE / भाषा का चयन करें (12 INDIAN LANGUAGES)
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleBegin(lang.code)}
                  className="px-4 py-3.5 bg-[#1A2B45]/80 hover:bg-[#DCB35C] text-[#FBF9F4] hover:text-[#0E1624] border border-[#DCB35C]/30 hover:border-[#DCB35C] rounded-xl text-center transition-all active:scale-95 shadow-lg flex flex-col items-center justify-center min-h-[64px]"
                >
                  <span className="font-serif text-base font-bold">{lang.native}</span>
                  <span className="font-mono text-[10px] opacity-75">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Admin PIN Modal */}
      <Modal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        title="Admin Kiosk Exit Security"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#B8C8DF]">
            Enter curator security PIN to exit fullscreen kiosk mode or open maintenance panel.
          </p>
          <div className="flex gap-3">
            <input
              type="password"
              maxLength={4}
              value={adminPin}
              onChange={(e) => {
                setAdminPin(e.target.value);
                setPinError(false);
              }}
              placeholder="PIN (1956)"
              className="flex-1 px-4 py-3 bg-[#121E33] border border-[#DCB35C]/40 rounded-lg text-white font-mono text-lg tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
            />
            <Button onClick={verifyPin} variant="primary">
              Verify PIN
            </Button>
          </div>
          {pinError && (
            <p className="text-xs text-[#FF8577] font-mono">
              Invalid security PIN. Default curator PIN: 1956
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};
