import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VideoHeroScrubber } from '@/components/VideoHeroScrubber';
import { ARCHIVE_DOCUMENTS } from '@/mocks/documents';
import { 
  MessageSquare, 
  Bot, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Volume2, 
  ArrowRight, 
  FileText, 
  BookOpen, 
  Award, 
  Sparkles,
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const QUOTES_OF_THE_DAY = [
  {
    quote: 'Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience.',
    quoteHi: 'लोकतंत्र केवल शासन का एक रूप नहीं है। यह मूल रूप से सहयोगी जीवन और सहभागिता का एक तरीका है।',
    context: 'Annihilation of Caste, 1936'
  },
  {
    quote: 'Cultivation of mind should be the ultimate aim of human existence.',
    quoteHi: 'मनुष्य के अस्तित्व का अंतिम लक्ष्य मन का संवर्धन होना चाहिए।',
    context: 'Speech in Bombay, 1942'
  },
  {
    quote: 'Educate, Agitate, Organize. Have faith in yourselves.',
    quoteHi: 'शिक्षित बनो, संघर्ष करो, संगठित रहो। अपने आप में विश्वास रखो।',
    context: 'Bahishkrit Hitakarini Sabha, 1924'
  }
];

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuote = QUOTES_OF_THE_DAY[quoteIdx];

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

  const primaryActions = [
    {
      moduleCode: 'MOD-01',
      title: 'Ask a Question',
      titleNative: 'एआई से प्रश्न पूछें',
      desc: 'Natural language RAG chat in 12 Indian languages. Every answer is strictly grounded with clickable citations to original scans.',
      icon: MessageSquare,
      path: '/chat',
      badge: 'RAG GROUNDED',
      accentColor: 'from-[#DCB35C] to-[#B87333]',
      capabilities: [
        '12 Indic Languages & Voice Search',
        'Clickable Inline Scan Citations [1], [2]',
        'Zero-Hallucination Verified Passages'
      ]
    },
    {
      moduleCode: 'MOD-02',
      title: 'Talk to Dr. Ambedkar',
      titleNative: 'डॉ. अम्बेडकर से संवाद',
      desc: 'Immersive interactive AI avatar powered by WebRTC. Converse by voice or text; answers derived solely from verified records.',
      icon: Bot,
      path: '/avatar',
      badge: 'LIVE AVATAR',
      accentColor: 'from-[#f0c36d] to-[#DCB35C]',
      capabilities: [
        'Real-time WebRTC 1080p Stream',
        'Live Subtitles & Synced Audio Waveform',
        'Barge-in / Interrupt Speech Support'
      ]
    },
    {
      moduleCode: 'MOD-03',
      title: 'Explore the Archive',
      titleNative: 'दस्तावेज संग्रह खोजें',
      desc: 'Browse 2,400+ digitized writings, speeches, rare manuscripts, and photographs with deep-zoom scan and OCR side-by-side view.',
      icon: Search,
      path: '/archive',
      badge: '2,400+ RECORDS',
      accentColor: 'from-[#38BDF8] to-[#1E3A8A]',
      capabilities: [
        'Deep-Zoom & Pan High-Res Facsimiles',
        'Side-by-Side Original Scan & OCR View',
        'SHA-256 Cryptographic Provenance Hashes'
      ]
    },
    {
      moduleCode: 'MOD-04',
      title: '3D Life Timeline',
      titleNative: '3D जीवन यात्रा (1891–1956)',
      desc: 'Explore Babasaheb\'s momentous journey through an interactive 3D timeline with linked original source documents.',
      icon: Calendar,
      path: '/timeline',
      badge: '3D JOURNEY',
      accentColor: 'from-[#C93B2B] to-[#DCB35C]',
      capabilities: [
        '31 Historical Milestones (1891 to 1956)',
        'Three.js Perspective Rail & Auto-Tour',
        'Linked Primary Historical Scans'
      ]
    }
  ];

  return (
    <div className="bg-denim-twill min-h-screen text-[#B8C8DF]">
      {/* 1. Fullscreen Edge-to-Edge 240-Frame GSAP Video Reveal */}
      <VideoHeroScrubber />

      {/* 2. Main Portal Intro Section */}
      <div id="main-content" className="site-container pt-12 pb-16">
        {/* Archival Specification Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/30 mb-12 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="selvedge-tape">SMART INDIA HACKATHON 2026</span>
            <span className="font-mono text-xs text-[#DCB35C]">
              PROBLEM STATEMENT: <strong>SIH26096</strong> (HARDWARE KIOSK)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="brass-stamp text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f0c36d]" />
              MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="selvedge-tape">RAW INDIGO 14.5 OZ</span>
              <Badge variant="verified">100% VERIFIED ARCHIVE</Badge>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Crafted in Indigo. <br />
              Riveted in <span className="text-[#f0c36d] underline decoration-[#DCB35C]/60 decoration-wavy">Truth</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#B8C8DF] leading-relaxed max-w-2xl font-light">
              <strong>SmritiSetu</strong> (स्मृतिसेतु) is an AI-powered physical-digital heritage archive dedicated to Dr. B. R. Ambedkar. Combining tactile museum kiosk engineering with advanced RAG citation grounding, it connects generations to the living constitutional memory of India.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/chat">
                <Button variant="primary" size="lg" icon={<MessageSquare className="w-5 h-5" />}>
                  Ask Archival AI
                </Button>
              </Link>
              <Link to="/avatar">
                <Button variant="secondary" size="lg" icon={<Bot className="w-5 h-5" />}>
                  Talk to Avatar
                </Button>
              </Link>
              <Link to="/archive">
                <Button variant="ghost" size="lg" icon={<Search className="w-5 h-5" />}>
                  Explore Documents
                </Button>
              </Link>
            </div>
          </div>

          {/* Stitched Heritage Specification Card */}
          <div className="lg:col-span-5">
            <Card variant="riveted" className="bg-[#1A2B45] shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#DCB35C]/20 pb-4 mb-4">
                <span className="selvedge-tape text-[10px]">ACCESSION STANDARD</span>
                <span className="font-mono text-[10px] text-[#f0c36d] uppercase tracking-wider">
                  PERMANENT DEPOSIT
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 border-2 border-[#DCB35C] shadow-xl flex items-center justify-center overflow-hidden shrink-0 mt-1">
                  <img src="/smriti-setu-emblem.png" alt="Smriti Setu Official Emblem" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                    The Fabric of Democratic Heritage
                  </h3>
                  <div className="font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider">
                    Official Insignia • SIH26096 Repository
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#B8C8DF] leading-relaxed mb-6">
                Every constitutional draft, labor charter, and field testimony is preserved with the structural integrity of heavy 3/1 right-hand twill and electrolytic copper fasteners.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/20">
                  <div className="font-mono text-[10px] text-[#7C90AF] uppercase">WEAVE DENSITY</div>
                  <div className="font-serif text-sm font-bold text-[#DCB35C] mt-0.5">3/1 Right-Hand Twill</div>
                </div>
                <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/20">
                  <div className="font-mono text-[10px] text-[#7C90AF] uppercase">RIVET ALLOY</div>
                  <div className="font-serif text-sm font-bold text-[#f0c36d] mt-0.5">Hand-Set Copper Burr</div>
                </div>
                <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/20">
                  <div className="font-mono text-[10px] text-[#7C90AF] uppercase">INDIAN LANGUAGES</div>
                  <div className="font-serif text-sm font-bold text-[#DCB35C] mt-0.5">12 Scheduled Scripts</div>
                </div>
                <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/20">
                  <div className="font-mono text-[10px] text-[#7C90AF] uppercase">GROUNDING POLICY</div>
                  <div className="font-serif text-sm font-bold text-[#f0c36d] mt-0.5">Strict Zero-Hallucination</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 3. Primary Four Touch Kiosk Action Cards */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="selvedge-tape mb-2 inline-block">MUSEUM KIOSK DISCOVERY</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Gateway to Babasaheb's Living Archive
            </h2>
            <p className="text-sm text-[#B8C8DF] mt-2">
              Designed for public touch kiosks and accessible online exploration. Select an interactive module below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {primaryActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.path}
                  className="group relative bg-[#121E33] hover:bg-[#16253D] border border-[#DCB35C]/30 hover:border-[#DCB35C] rounded-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)] overflow-hidden"
                >
                  {/* Top Color Accent Highlight Strip */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${action.accentColor}`} />

                  {/* Card Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Top Status Header */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="font-mono text-[10px] font-bold text-[#DCB35C] bg-[#0A111C]/90 px-2.5 py-1 rounded-md border border-[#DCB35C]/25 tracking-wider">
                        {action.moduleCode}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A2B45] border border-[#DCB35C]/30 text-[10px] font-mono font-bold text-[#f0c36d] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        {action.badge}
                      </span>
                    </div>

                    {/* Icon & Title Header */}
                    <div className="flex items-start gap-3.5 mb-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2B45] to-[#0A111C] border border-[#DCB35C]/40 flex items-center justify-center text-[#DCB35C] shadow-md group-hover:scale-105 group-hover:border-[#DCB35C] group-hover:text-white transition-all shrink-0 mt-0.5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#DCB35C] transition-colors leading-tight">
                          {action.title}
                        </h3>
                        <p className="font-serif text-xs text-[#f0c36d] opacity-90 mt-0.5 truncate">
                          {action.titleNative}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#B8C8DF] leading-relaxed mb-6 font-light">
                      {action.desc}
                    </p>

                    {/* Structured Key Capabilities Checklist (Organized Presentation) */}
                    <div className="mt-auto pt-4 border-t border-[#DCB35C]/15">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[#7C90AF] font-bold mb-2.5 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#DCB35C]" />
                        <span>MODULE SPECIFICATIONS</span>
                      </div>
                      <div className="space-y-2">
                        {action.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-[11px] text-[#A6BCD8] font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#DCB35C] shrink-0 mt-0.5" />
                            <span className="leading-snug">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tactile Button Footer */}
                  <div className="p-4 bg-[#0A111C]/80 border-t border-[#DCB35C]/20 flex items-center justify-between text-xs font-mono font-bold text-[#DCB35C] group-hover:bg-[#DCB35C] group-hover:text-[#0B1320] transition-all">
                    <span className="tracking-wider">LAUNCH MODULE</span>
                    <div className="w-6 h-6 rounded-md bg-[#DCB35C]/15 group-hover:bg-[#0B1320] flex items-center justify-center text-[#DCB35C] group-hover:text-[#DCB35C] transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 4. Quote of the Day Strip */}
        <div className="bg-[#121E33] border-2 border-dashed border-[#f0c36d]/50 rounded-2xl p-6 sm:p-8 mb-20 shadow-2xl relative card-riveted">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DCB35C]" />
                <span className="selvedge-tape text-[10px]">QUOTE OF THE DAY • दैनिक विचार</span>
                <span className="font-mono text-xs text-[#7C90AF]">{currentQuote.context}</span>
              </div>
              <blockquote className="font-serif text-lg sm:text-xl font-semibold text-white italic">
                “{currentQuote.quote}”
              </blockquote>
              <p className="font-serif text-sm text-[#f0c36d]">
                “{currentQuote.quoteHi}”
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={handleReadQuote}
                variant="secondary"
                size="md"
                icon={<Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-[#DCB35C]' : ''}`} />}
              >
                {isSpeaking ? 'Listening...' : 'Read Aloud'}
              </Button>
              <Button
                onClick={() => setQuoteIdx((prev) => (prev + 1) % QUOTES_OF_THE_DAY.length)}
                variant="ghost"
                size="md"
              >
                Next Quote
              </Button>
            </div>
          </div>
        </div>

        {/* 5. Featured Collection Carousel Strip */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="selvedge-tape text-[10px]">VERIFIED HOLDINGS</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured Archival Collections
              </h2>
            </div>
            <Link to="/archive" className="flex items-center gap-1.5 text-xs font-mono text-[#DCB35C] hover:underline">
              <span>View All 2,400+ Records</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARCHIVE_DOCUMENTS.slice(0, 3).map((doc) => (
              <Card key={doc.id} variant="riveted" className="bg-[#1A2B45] hover:bg-[#223C63] transition-colors p-5 flex flex-col justify-between">
                <div>
                  <div className="h-44 w-full rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 selvedge-tape text-[9px] uppercase">
                      {doc.type}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-[#0E1624]/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#f0c36d]">
                      {doc.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white line-clamp-2 mb-1">
                    {doc.title}
                  </h3>
                  <p className="font-serif text-xs text-[#DCB35C] mb-2">{doc.originalTitle}</p>
                  <p className="text-xs text-[#B8C8DF] line-clamp-3 leading-relaxed mb-4">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCB35C]/20 flex items-center justify-between">
                  <span className="brass-stamp text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-[#f0c36d]" />
                    {doc.citationsCount} Citations
                  </span>
                  <Link to={`/archive?doc=${doc.id}`} className="text-xs font-mono text-[#DCB35C] hover:underline">
                    View Scans &rarr;
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 6. Problem Statement SIH26096 Pillar Breakdown */}
        <div className="p-8 rounded-2xl bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 card-riveted shadow-2xl">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <div className="max-w-3xl mb-8">
            <span className="selvedge-tape text-[10px]">SIH26096 ARCHITECTURE</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Ministry of Social Justice and Empowerment — Core Innovations
            </h2>
            <p className="text-xs sm:text-sm text-[#B8C8DF] mt-2 leading-relaxed">
              Addressing Problem Statement SIH26096 with museum-grade physical resilience and state-of-the-art AI ethics:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/20">
              <div className="w-10 h-10 rounded-lg bg-[#DCB35C]/15 flex items-center justify-center text-[#DCB35C] mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white mb-1">Grounded RAG Pipeline</h4>
              <p className="text-xs text-[#B8C8DF] leading-relaxed">
                Zero hallucination policy. Every answer includes verifiable inline citations linked directly to high-res scanned manuscripts.
              </p>
            </div>

            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/20">
              <div className="w-10 h-10 rounded-lg bg-[#DCB35C]/15 flex items-center justify-center text-[#DCB35C] mb-3">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white mb-1">WebRTC Dr. Ambedkar Avatar</h4>
              <p className="text-xs text-[#B8C8DF] leading-relaxed">
                Low-latency video streaming, natural voice synthesis, barge-in interrupt handling, and live subtitle display.
              </p>
            </div>

            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/20">
              <div className="w-10 h-10 rounded-lg bg-[#DCB35C]/15 flex items-center justify-center text-[#DCB35C] mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-white mb-1">Touch-First Kiosk Experience</h4>
              <p className="text-xs text-[#B8C8DF] leading-relaxed">
                64px+ touch targets, on-screen Indic virtual keyboard, 90-second idle auto-reset, and hidden curator exit gesture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
