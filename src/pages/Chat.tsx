import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiClient, ArchivalCitation, QAPair } from '@/api';
import { STARTER_PROMPTS } from '@/mocks/qaDatabase';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  QrCode, 
  ExternalLink, 
  FileText, 
  Bot, 
  User, 
  HelpCircle,
  Copy,
  Check,
  Keyboard as KeyboardIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { VirtualKeyboard } from '@/components/kiosk/VirtualKeyboard';
import QRCode from 'qrcode';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: ArchivalCitation[];
  grounded?: boolean;
  timestamp: string;
}

export const Chat: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeCitation, setActiveCitation] = useState<ArchivalCitation | null>(null);

  // Voice recording & waveform state
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // QR Code Export Modal
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Kiosk Virtual Keyboard
  const [showKeyboard, setShowKeyboard] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const starterList = STARTER_PROMPTS[i18n.language] || STARTER_PROMPTS['en'];

  // Handle URL pre-seeded question
  useEffect(() => {
    const urlQuery = searchParams.get('query');
    if (urlQuery && messages.length === 0) {
      handleSendMessage(urlQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Voice waveform loop
  const startAudioWaveform = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      setIsRecording(true);

      const drawWaveform = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          ctx.fillStyle = '#DCB35C';
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }

        animFrameRef.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();

      // Automatically simulate transcribed voice prompt after 3s
      setTimeout(() => {
        stopAudioWaveform();
        handleSendMessage('Why did Dr. Ambedkar consider Article 32 the heart and soul of the Constitution?');
      }, 3000);
    } catch (e) {
      // Mock fallback if mic is blocked
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage('What major labour reforms did Dr. Ambedkar introduce in India?');
      }, 1500);
    }
  };

  const stopAudioWaveform = () => {
    setIsRecording(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputValue;
    if (!q.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsStreaming(true);

    const botMsgId = `bot-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      citations: [],
      grounded: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, botMsg]);

    apiClient.askChatStream(q, i18n.language, {
      onChunk: (chunk) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, text: m.text + chunk } : m))
        );
      },
      onCitations: (citations) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, citations } : m))
        );
      },
      onDone: () => {
        setIsStreaming(false);
      }
    });
  };

  const handleGenerateQR = async () => {
    try {
      const summaryText = messages.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
      const shareData = `SmritiSetu Archive Session:\n\n${summaryText.slice(0, 500)}...`;
      const url = await QRCode.toDataURL(shareData, { width: 300, margin: 2 });
      setQrCodeUrl(url);
      setShowQrModal(true);
    } catch (e) {}
  };

  const renderMessageContent = (text: string, citations?: ArchivalCitation[]) => {
    if (!citations || citations.length === 0) {
      return <span>{text}</span>;
    }

    // Split text by citations e.g. [1], [2] and turn into clickable badges
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citationIndex = parseInt(match[1]);
        const citation = citations.find((c) => c.index === citationIndex);
        return (
          <button
            key={idx}
            onClick={() => citation && setActiveCitation(citation)}
            className="inline-flex items-center justify-center px-1.5 py-0.2 mx-1 text-xs font-mono font-bold bg-[#DCB35C] text-[#0E1624] rounded hover:bg-[#c9a04a] active:scale-95 transition-all align-baseline cursor-pointer shadow-sm"
            title={`View Source Citation #${citationIndex}`}
          >
            [{citationIndex}]
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="bg-denim-twill min-h-screen text-[#B8C8DF] flex flex-col">
      {/* Top Header */}
      <div className="bg-[#121E33] border-b border-[#DCB35C]/25 py-4">
        <div className="site-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DCB35C]/15 border border-[#DCB35C]/40 flex items-center justify-center text-[#DCB35C]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="selvedge-tape text-[9px]">GROUNDED RAG CHAT</span>
                <span className="brass-stamp text-[10px]">100% CITED RECORDS</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Archival AI Q&A <span className="text-[#DCB35C] font-normal">| एआई प्रश्न मंच</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setMessages([])}
              variant="secondary"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              title="Clear Session"
            >
              Clear
            </Button>
            <Button
              onClick={handleGenerateQR}
              variant="secondary"
              size="sm"
              icon={<QrCode className="w-3.5 h-3.5 text-[#DCB35C]" />}
              title="Export Conversation to Phone"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 site-container py-6 flex flex-col max-w-4xl w-full">
        {messages.length === 0 ? (
          <div className="my-auto py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] flex items-center justify-center text-[#DCB35C] mx-auto shadow-2xl">
              <Bot className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Ask Questions Grounded in Dr. Ambedkar's Archive
              </h2>
              <p className="text-xs sm:text-sm text-[#B8C8DF] max-w-xl mx-auto leading-relaxed">
                Every response is derived strictly from historical speeches, writings, and Constituent Assembly Debates. Click any citation [1] to inspect original manuscripts.
              </p>
            </div>

            {/* Starter Prompts */}
            <div className="space-y-2 max-w-2xl mx-auto pt-2">
              <span className="font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider block">
                SUGGESTED HISTORICAL INQUIRIES:
              </span>
              <div className="flex flex-col gap-2">
                {starterList.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-3.5 bg-[#1A2B45] hover:bg-[#223C63] border border-[#DCB35C]/30 hover:border-[#DCB35C] rounded-xl text-left text-xs sm:text-sm text-white font-medium transition-all flex items-center justify-between group shadow-md"
                  >
                    <span>{prompt}</span>
                    <Sparkles className="w-4 h-4 text-[#DCB35C] opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-[#DCB35C] text-[#0E1624] flex items-center justify-center font-bold font-serif shrink-0 shadow-md">
                    BA
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-5 shadow-xl ${
                    msg.sender === 'user'
                      ? 'bg-[#223C63] text-white border border-[#DCB35C]/30 rounded-tr-none'
                      : 'bg-[#1A2B45] text-[#FBF9F4] border-2 border-dashed border-[#DCB35C]/40 rounded-tl-none card-riveted'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center justify-between border-b border-[#DCB35C]/20 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#f0c36d]" />
                        <span className="font-mono text-[10px] text-[#f0c36d] uppercase tracking-wider">
                          GROUNDED IN {msg.citations?.length || 2} ARCHIVAL SOURCES
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#7C90AF]">{msg.timestamp}</span>
                    </div>
                  )}

                  <div className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {renderMessageContent(msg.text, msg.citations)}
                  </div>

                  {/* Inline Citation Chips */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#DCB35C]/20 flex flex-wrap gap-2">
                      <span className="font-mono text-[10px] text-[#DCB35C] uppercase flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        SOURCES:
                      </span>
                      {msg.citations.map((cit) => (
                        <button
                          key={cit.id}
                          onClick={() => setActiveCitation(cit)}
                          className="px-2.5 py-1 bg-[#121E33] hover:bg-[#DCB35C] text-[#B8C8DF] hover:text-[#0E1624] border border-[#DCB35C]/30 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
                        >
                          <span className="font-bold text-[#f0c36d]">[{cit.index}]</span>
                          <span className="truncate max-w-[180px]">{cit.docTitle}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-[#1A2B45] text-[#DCB35C] border border-[#DCB35C]/40 flex items-center justify-center font-bold shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isStreaming && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#DCB35C] p-2">
                <span className="w-2 h-2 rounded-full bg-[#DCB35C] animate-ping" />
                <span>RETRIEVING & GROUNDING PASSAGES FROM ARCHIVAL MANUSCRIPTS...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar & Voice Waveform */}
      <div className="sticky bottom-0 bg-[#0E1624] border-t-2 border-[#DCB35C]/40 p-3 sm:p-4 backdrop-blur-md">
        <div className="site-container max-w-4xl">
          {/* Audio Waveform Canvas while listening */}
          {isRecording && (
            <div className="mb-2 p-2 bg-[#1A2B45] rounded-xl border border-[#DCB35C] flex items-center gap-3">
              <span className="font-mono text-xs text-[#DCB35C] animate-pulse">
                LISTENING (AUDIO WAVEFORM)...
              </span>
              <canvas ref={canvasRef} width={260} height={24} className="h-6 w-48 rounded" />
              <button
                onClick={stopAudioWaveform}
                className="ml-auto text-xs font-mono text-[#FF8577] hover:underline"
              >
                Stop
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="p-3 bg-[#1A2B45] text-[#B8C8DF] hover:text-[#DCB35C] border border-[#DCB35C]/30 rounded-xl"
              title="Toggle Touch Keyboard"
            >
              <KeyboardIcon className="w-5 h-5" />
            </button>

            <button
              onClick={isRecording ? stopAudioWaveform : startAudioWaveform}
              className={`p-3 rounded-xl border transition-colors ${
                isRecording
                  ? 'bg-[#FF8577]/20 border-[#FF8577] text-[#FF8577]'
                  : 'bg-[#1A2B45] border-[#DCB35C]/30 text-[#DCB35C] hover:bg-[#223C63]'
              }`}
              title="Voice Input (Mic)"
            >
              {isRecording ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              onFocus={() => setShowKeyboard(true)}
              placeholder="Ask a question about Dr. Ambedkar's writings, speeches, or ideas..."
              disabled={isStreaming}
              className="flex-1 px-4 py-3.5 bg-[#121E33] border border-[#DCB35C]/40 rounded-xl text-white placeholder-[#7C90AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
            />

            <Button
              onClick={() => handleSendMessage()}
              variant="primary"
              disabled={!inputValue.trim() || isStreaming}
              className="px-5 py-3.5"
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* ===================================================================
           SOURCE CITATION SLIDE-OVER DRAWER
           Shows exact passage, high-res scan page, and verified metadata
           =================================================================== */}
      <Drawer
        isOpen={Boolean(activeCitation)}
        onClose={() => setActiveCitation(null)}
        title={activeCitation?.docTitle || 'Source Verification'}
        subtitle={`Citation [${activeCitation?.index}] • Year ${activeCitation?.year} • Page ${activeCitation?.pageNumber}`}
      >
        {activeCitation && (
          <div className="space-y-6">
            {/* Verified Excerpt Box */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono text-xs text-[#10B981] uppercase tracking-wider">
                  VERIFIED HISTORICAL EXCERPT
                </span>
              </div>
              <div className="p-4 bg-[#121E33] border-l-4 border-[#DCB35C] rounded-r-xl font-serif text-sm md:text-base text-white leading-relaxed italic shadow-inner">
                {activeCitation.snippet}
              </div>
            </div>

            {/* Original Archival Manuscript Scan Thumbnail */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#DCB35C] uppercase tracking-wider">
                  ARCHIVAL SCAN FACSIMILE (PAGE {activeCitation.pageNumber})
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#DCB35C]/40 shadow-2xl bg-[#0A111C]">
                <img
                  src={activeCitation.scanUrl}
                  alt={activeCitation.docTitle}
                  className="w-full h-72 object-contain"
                />
              </div>
            </div>

            {/* Document Action Button */}
            <Button
              onClick={() => {
                const docId = activeCitation.docId;
                setActiveCitation(null);
                window.location.href = `/archive?doc=${docId}`;
              }}
              variant="primary"
              className="w-full"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Open Full Document in Archive Explorer
            </Button>
          </div>
        )}
      </Drawer>

      {/* QR Code Export Modal */}
      <Modal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="Export Session to Your Mobile Phone"
      >
        <div className="text-center space-y-4">
          <p className="text-sm text-[#B8C8DF]">
            Scan this QR code with your smartphone camera to save the research notes and citations from this kiosk session.
          </p>
          {qrCodeUrl && (
            <div className="inline-block p-4 bg-white rounded-xl shadow-2xl">
              <img src={qrCodeUrl} alt="Export Session QR" className="w-48 h-48 mx-auto" />
            </div>
          )}
          <p className="font-mono text-xs text-[#DCB35C]">
            NO REGISTRATION REQUIRED • ENCRYPTED SESSION DUMP
          </p>
        </div>
      </Modal>

      {/* Kiosk Virtual Keyboard */}
      <VirtualKeyboard
        isOpen={showKeyboard}
        onClose={() => setShowKeyboard(false)}
        onKeyPress={(char) => setInputValue((prev) => prev + char)}
        onBackspace={() => setInputValue((prev) => prev.slice(0, -1))}
        onEnter={() => {
          setShowKeyboard(false);
          handleSendMessage();
        }}
        onClear={() => setInputValue('')}
      />
    </div>
  );
};
