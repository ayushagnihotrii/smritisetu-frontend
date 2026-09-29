import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoHeroScrubber } from '@/components/VideoHeroScrubber';
import { 
  MessageSquare, 
  Bot, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Volume2, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Layers,
  Mic,
  Eye,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const QUOTES = [
  {
    quote: 'Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience.',
    quoteHi: 'लोकतंत्र केवल शासन का एक रूप नहीं है। यह मूल रूप से सहयोगी जीवन और सहभागिता का एक तरीका है।',
    source: 'Annihilation of Caste, 1936'
  },
  {
    quote: 'Cultivation of mind should be the ultimate aim of human existence.',
    quoteHi: 'मनुष्य के अस्तित्व का अंतिम लक्ष्य मन का संवर्धन होना चाहिए।',
    source: 'Speech in Bombay, 1942'
  },
  {
    quote: 'Educate, Agitate, Organize. Have faith in yourselves.',
    quoteHi: 'शिक्षित बनो, संघर्ष करो, संगठित रहो। अपने आप में विश्वास रखो।',
    source: 'Bahishkrit Hitakarini Sabha, 1924'
  }
];

const modules = [
  {
    title: 'Ask a Question',
    subtitle: 'AI-Powered Q&A',
    desc: 'Get grounded answers from 2,400+ archival documents with inline citations. Available in 12 Indian languages.',
    icon: MessageSquare,
    path: '/chat',
    features: ['12 Indic Languages & Voice', 'Inline Source Citations', 'Zero-Hallucination Verified'],
  },
  {
    title: 'Talk to Dr. Ambedkar',
    subtitle: 'Interactive AI Avatar',
    desc: 'Converse with an AI avatar powered by WebRTC. Every response is derived from verified archival records.',
    icon: Bot,
    path: '/avatar',
    features: ['Real-time Video Stream', 'Live Subtitles & Audio', 'Barge-in Speech Support'],
  },
  {
    title: 'Explore the Archive',
    subtitle: 'Document Explorer',
    desc: 'Browse digitized writings, speeches, manuscripts, and photographs with deep-zoom scan and OCR view.',
    icon: Search,
    path: '/archive',
    features: ['Deep-Zoom High-Res Scans', 'Side-by-Side OCR View', 'Cryptographic Provenance'],
  },
  {
    title: '3D Life Timeline',
    subtitle: 'Interactive Journey',
    desc: 'Explore 31 milestones from 1891 to 1956 through an interactive 3D timeline linked to source documents.',
    icon: Calendar,
    path: '/timeline',
    features: ['31 Historical Milestones', 'Three.js 3D Perspective', 'Linked Primary Sources'],
  }
];

export const Home: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentQuote = QUOTES[quoteIdx];

  const handleReadQuote = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!isSpeaking) {
        const u = new SpeechSynthesisUtterance(currentQuote.quote);
        u.rate = 0.95;
        u.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(u);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* 1. Fullscreen Video Reveal */}
      <VideoHeroScrubber />

      {/* 2. Hero Section */}
      <section id="main-content" className="site-container pt-24 pb-20">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[#DCB35C] mb-4">
            Smart India Hackathon 2026 • SIH26096
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] mb-6">
            The Digital Archive of{' '}
            <span className="text-[#DCB35C]">Dr. B. R. Ambedkar</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl">
            SmritiSetu (स्मृतिसेतु) preserves and connects generations to the writings, speeches, 
            and constitutional legacy of Babasaheb Ambedkar — powered by AI with strict source grounding.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/chat">
              <Button variant="primary" size="lg" icon={<MessageSquare className="w-5 h-5" />}>
                Ask Archival AI
              </Button>
            </Link>
            <Link to="/archive">
              <Button variant="secondary" size="lg" icon={<Search className="w-5 h-5" />}>
                Explore Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Module Cards */}
      <section className="site-container pb-24">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-2">
            Interactive Modules
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Explore the Archive
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Link
                key={idx}
                to={mod.path}
                className="group relative bg-[#1E293B] hover:bg-[#1E293B]/80 border border-white/[0.06] hover:border-[#DCB35C]/40 rounded-2xl flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#DCB35C]/10 border border-[#DCB35C]/20 flex items-center justify-center text-[#DCB35C] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-[#DCB35C] transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{mod.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {mod.desc}
                  </p>

                  {/* Features */}
                  <div className="mt-auto pt-4 border-t border-white/[0.06] space-y-1.5">
                    {mod.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-[#DCB35C]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-[#DCB35C] transition-colors">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Quote Section */}
      <section className="site-container pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-5 h-5 text-[#DCB35C] mx-auto mb-4" />
          <blockquote className="font-serif text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-3">
            "{currentQuote.quote}"
          </blockquote>
          <p className="font-serif text-sm text-[#DCB35C]/80 mb-1">
            "{currentQuote.quoteHi}"
          </p>
          <p className="text-xs text-slate-500 mb-6">— {currentQuote.source}</p>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={handleReadQuote}
              variant="ghost"
              size="sm"
              icon={<Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-[#DCB35C]' : ''}`} />}
            >
              {isSpeaking ? 'Playing...' : 'Read Aloud'}
            </Button>
            <Button
              onClick={() => setQuoteIdx((prev) => (prev + 1) % QUOTES.length)}
              variant="ghost"
              size="sm"
            >
              Next Quote
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Platform Capabilities */}
      <section className="site-container pb-24">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-2">
            SIH26096 — Ministry of Social Justice & Empowerment
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Core Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: 'Grounded RAG Pipeline',
              desc: 'Zero hallucination. Every answer includes verifiable inline citations linked to original scanned manuscripts.'
            },
            {
              icon: Bot,
              title: 'WebRTC Live Avatar',
              desc: 'Low-latency video streaming, natural voice synthesis, barge-in handling, and live subtitle display.'
            },
            {
              icon: Layers,
              title: 'Touch-First Kiosk',
              desc: '64px+ touch targets, on-screen Indic keyboard, 90-second idle auto-reset, and hidden curator exit.'
            }
          ].map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div key={idx} className="p-6 bg-[#1E293B] rounded-2xl border border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-[#DCB35C]/10 flex items-center justify-center text-[#DCB35C] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
