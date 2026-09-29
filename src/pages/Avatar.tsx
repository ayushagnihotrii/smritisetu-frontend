import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient, ArchivalCitation } from '@/api';
import { QA_DATABASE } from '@/mocks/qaDatabase';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Square, 
  RefreshCw,
  SlidersHorizontal,
  Bot,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

export const Avatar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [subtitle, setSubtitle] = useState('');
  const [activeSources, setActiveSources] = useState<ArchivalCitation[]>([]);
  const [isHandsFree, setIsHandsFree] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSourcesPanel, setShowSourcesPanel] = useState(true);
  const [webrtcStatus, setWebrtcStatus] = useState<'connected' | 'fallback'>('connected');

  // Waveform canvas for speaking / listening
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cancelStreamRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Initial greeting
    setSubtitle('Greetings. I am an AI representation of Dr. B. R. Ambedkar, grounded in my historical writings, speeches, and Constituent Assembly Debates. How may I assist your inquiries into constitutional law, labor rights, or human equality?');
    setActiveSources(QA_DATABASE[0].citations);

    // Dynamic wave animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = avatarState === 'speaking' ? '#f0c36d' : avatarState === 'listening' ? '#38BDF8' : '#506584';
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const amplitude = avatarState === 'speaking' ? 14 : avatarState === 'listening' ? 8 : 2;
        const freq = 0.05;
        const y = h / 2 + Math.sin(x * freq + step) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += 0.08;
      animFrameRef.current = requestAnimationFrame(renderWave);
    };

    animFrameRef.current = requestAnimationFrame(renderWave);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (cancelStreamRef.current) cancelStreamRef.current();
    };
  }, [avatarState]);

  // Simulate asking a question
  const handleAskQuestion = (questionText: string) => {
    // Interrupt existing speech
    handleBargeIn();

    setAvatarState('thinking');
    setSubtitle('Consulting verified archival records...');

    // Small latency simulation (1.2s thinking)
    setTimeout(() => {
      setAvatarState('speaking');
      setSubtitle('');

      cancelStreamRef.current = apiClient.askChatStream(questionText, i18n.language, {
        onChunk: (chunk) => {
          setSubtitle((prev) => prev + chunk);
        },
        onCitations: (citations) => {
          setActiveSources(citations);
        },
        onDone: () => {
          // Speak with Web Speech API
          if (!isMuted && 'speechSynthesis' in window) {
            const cleanText = subtitle.replace(/\[\d+\]/g, '');
            const u = new SpeechSynthesisUtterance(cleanText);
            u.rate = 0.93;
            u.pitch = 0.88;
            u.onend = () => setAvatarState('idle');
            speechUtteranceRef.current = u;
            window.speechSynthesis.speak(u);
          } else {
            setTimeout(() => setAvatarState('idle'), 2500);
          }
        }
      });
    }, 1200);
  };

  // Barge-in / Interrupt
  const handleBargeIn = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (cancelStreamRef.current) cancelStreamRef.current();
    setAvatarState('idle');
  };

  // Push to talk hold
  const handleStartListening = () => {
    handleBargeIn();
    setAvatarState('listening');
    setSubtitle('Listening to your voice...');
  };

  const handleStopListening = () => {
    handleAskQuestion('Why did you declare Article 32 to be the heart and soul of the Constitution?');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070C15] select-none text-white font-sans flex flex-col justify-between">
      {/* 1. Mandatory Disclaimer Banner (Prominently Visible at Top) */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-[#0E1624]/90 border-b border-[#DCB35C]/30 px-4 py-2.5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#f0c36d]" />
          <span className="font-mono text-xs font-semibold text-[#f0c36d] tracking-wide">
            ETHICAL AI NOTICE:
          </span>
          <span className="text-xs text-[#B8C8DF] hidden sm:inline">
            AI-generated representation strictly based on verified historical writings, speeches, and Constituent Assembly Debates.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="selvedge-tape text-[9px]">WEBRTC 1080P STREAM</span>
          <span className="brass-stamp text-[9px] text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block mr-1" />
            LIVE ARCHIVE
          </span>
        </div>
      </div>

      {/* 2. Main Center Avatar Canvas & Visual Representation */}
      <div className="relative flex-1 flex items-center justify-center pt-12 pb-24 overflow-hidden">
        {/* Ambient Aura Rings based on Avatar State */}
        <div
          className={`absolute rounded-full filter blur-3xl transition-all duration-700 pointer-events-none ${
            avatarState === 'listening'
              ? 'w-[500px] h-[500px] bg-[#38BDF8]/20 animate-pulse'
              : avatarState === 'thinking'
              ? 'w-[500px] h-[500px] bg-[#DCB35C]/25 animate-ping'
              : avatarState === 'speaking'
              ? 'w-[600px] h-[600px] bg-[#f0c36d]/20 scale-105'
              : 'w-[400px] h-[400px] bg-[#1E3A8A]/30 scale-95'
          }`}
        />

        {/* Center Portrait / Video Stream Frame */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full border-4 border-[#DCB35C] p-2 shadow-2xl bg-[#0E1624]">
            {/* Corner Decorative Copper Rivets */}
            <span className="copper-rivet corner-rivet top-left" />
            <span className="copper-rivet corner-rivet top-right" />
            <span className="copper-rivet corner-rivet bottom-left" />
            <span className="copper-rivet corner-rivet bottom-right" />

            {/* Avatar Portrait with subtle life animations */}
            <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#1A2B45]">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85"
                alt="Dr. B. R. Ambedkar Representation"
                className={`w-full h-full object-cover filter contrast-125 saturate-90 transition-transform duration-500 ${
                  avatarState === 'speaking'
                    ? 'scale-105 filter brightness-105'
                    : avatarState === 'listening'
                    ? 'scale-102'
                    : 'scale-100'
                }`}
              />

              {/* State Status Overlay Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0E1624]/90 border border-[#DCB35C]/60 text-[10px] font-mono uppercase tracking-wider text-[#DCB35C] flex items-center gap-1.5 shadow-lg">
                <span
                  className={`w-2 h-2 rounded-full ${
                    avatarState === 'speaking'
                      ? 'bg-[#10B981] animate-ping'
                      : avatarState === 'listening'
                      ? 'bg-[#38BDF8] animate-pulse'
                      : avatarState === 'thinking'
                      ? 'bg-[#DCB35C] animate-spin'
                      : 'bg-[#506584]'
                  }`}
                />
                <span>STATE: {avatarState}</span>
              </div>
            </div>
          </div>

          {/* Real-time Waveform Canvas under Portrait */}
          <div className="mt-4">
            <canvas ref={canvasRef} width={320} height={36} className="h-9 w-80 rounded-lg" />
          </div>
        </div>

        {/* 3. Collapsible "Sources & Citations" Side Panel */}
        <div
          className={`absolute right-4 top-16 bottom-28 w-80 sm:w-96 bg-[#1A2B45]/95 border-2 border-dashed border-[#DCB35C]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md z-20 flex flex-col justify-between transition-transform duration-300 ${
            showSourcesPanel ? 'translate-x-0' : 'translate-x-[105%]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCB35C]/20 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  VERIFIED SOURCES ({activeSources.length})
                </span>
              </div>
              <button
                onClick={() => setShowSourcesPanel(false)}
                className="text-xs font-mono text-[#DCB35C] hover:underline"
              >
                Hide
              </button>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {activeSources.map((source) => (
                <div key={source.id} className="p-3 bg-[#121E33] rounded-xl border border-[#DCB35C]/25 text-xs">
                  <div className="flex items-center justify-between text-[#DCB35C] font-mono text-[10px] mb-1">
                    <span>CITATION [{source.index}]</span>
                    <span>YEAR {source.year}</span>
                  </div>
                  <h4 className="font-serif font-bold text-white mb-1.5">{source.docTitle}</h4>
                  <p className="text-[11px] text-[#B8C8DF] italic leading-relaxed mb-2 bg-[#0E1624] p-2 rounded border border-[#DCB35C]/15">
                    "{source.snippet.slice(0, 140)}..."
                  </p>
                  <a
                    href={`/archive?doc=${source.docId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] text-[#f0c36d] hover:underline flex items-center gap-1"
                  >
                    <span>View Archival Scan (Page {source.pageNumber})</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCB35C]/20 text-[10px] font-mono text-[#7C90AF]">
            ARCHIVAL INTEGRITY: ZERO SYNTHETIC HALLUCINATIONS
          </div>
        </div>

        {/* Toggle Sources Panel Button when hidden */}
        {!showSourcesPanel && (
          <button
            onClick={() => setShowSourcesPanel(true)}
            className="absolute right-4 top-20 z-20 px-3 py-2 bg-[#1A2B45] hover:bg-[#223C63] text-[#DCB35C] border border-[#DCB35C]/40 rounded-xl text-xs font-mono shadow-xl flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Show Sources</span>
          </button>
        )}
      </div>

      {/* 4. Streaming Subtitles Strip */}
      <div className="relative z-20 px-6 max-w-4xl mx-auto w-full mb-3 text-center">
        <div className="bg-[#0E1624]/90 border border-[#DCB35C]/40 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <p className="font-serif text-base sm:text-lg md:text-xl text-[#FBF9F4] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 5. Bottom Interactive Controls Deck */}
      <div className="relative z-20 bg-[#0A111C] border-t-2 border-[#DCB35C]/40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Quick Suggested Starter Inquiries */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#DCB35C] uppercase">INQUIRE:</span>
            <button
              onClick={() => handleAskQuestion('Why is Article 32 the heart and soul of the Constitution?')}
              className="px-2.5 py-1 rounded bg-[#1A2B45] hover:bg-[#223C63] border border-[#DCB35C]/30 text-xs text-white truncate max-w-[200px]"
            >
              Article 32 & Rights
            </button>
            <button
              onClick={() => handleAskQuestion('Explain the core thesis of Annihilation of Caste.')}
              className="px-2.5 py-1 rounded bg-[#1A2B45] hover:bg-[#223C63] border border-[#DCB35C]/30 text-xs text-white truncate max-w-[200px]"
            >
              Annihilation of Caste
            </button>
            <button
              onClick={() => handleAskQuestion('What labor protections did you introduce in 1942?')}
              className="px-2.5 py-1 rounded bg-[#1A2B45] hover:bg-[#223C63] border border-[#DCB35C]/30 text-xs text-white truncate max-w-[200px]"
            >
              8-Hour Workday Act
            </button>
          </div>

          {/* Central Push-to-Talk and Barge-in Actions */}
          <div className="flex items-center gap-3 mx-auto">
            {avatarState === 'speaking' ? (
              <Button
                onClick={handleBargeIn}
                variant="primary"
                size="lg"
                icon={<Square className="w-4 h-4 fill-current" />}
                className="bg-[#C93B2B] hover:bg-[#a62b1e] text-white border-none font-bold"
              >
                Interrupt (Barge-In)
              </Button>
            ) : (
              <Button
                onMouseDown={handleStartListening}
                onMouseUp={handleStopListening}
                onTouchStart={handleStartListening}
                onTouchEnd={handleStopListening}
                variant="primary"
                size="kiosk"
                icon={<Mic className="w-6 h-6 animate-pulse" />}
                className="shadow-2xl"
              >
                Hold to Speak to Dr. Ambedkar
              </Button>
            )}

            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="secondary"
              size="md"
              icon={isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            >
              {isMuted ? 'Unmute Audio' : 'Mute Audio'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
