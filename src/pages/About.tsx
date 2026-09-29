import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Layers, 
  Search, 
  Database, 
  Cpu, 
  Bot, 
  CheckCircle,
  FileText,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const About: React.FC = () => {
  return (
    <div className="bg-denim-twill min-h-screen text-[#B8C8DF] pb-24">
      {/* Top Banner */}
      <div className="bg-[#121E33] border-b border-[#DCB35C]/25 py-8">
        <div className="site-container">
          <div className="flex items-center gap-2 mb-2">
            <span className="selvedge-tape">SIH26096 ARCHIVAL MANDATE</span>
            <span className="brass-stamp text-[10px]">MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
            About SmritiSetu (स्मृतिसेतु) & AI Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#B8C8DF] mt-1">
            Preserving Dr. B. R. Ambedkar's monumental heritage with verifiable AI grounding and tactile museum kiosk engineering.
          </p>
        </div>
      </div>

      <div className="site-container pt-10 space-y-12 max-w-5xl">
        {/* Mission Statement */}
        <div className="bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-2xl p-8 card-riveted shadow-2xl">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Project Mission & Hackathon Mandate
          </h2>
          <p className="text-sm text-[#B8C8DF] leading-relaxed mb-4">
            Developed for <strong>Smart India Hackathon 2026 (Problem Statement SIH26096)</strong> under the aegis of the <strong>Ministry of Social Justice and Empowerment, Government of India</strong> (Hardware/Kiosk Category).
          </p>
          <p className="text-sm text-[#B8C8DF] leading-relaxed">
            SmritiSetu bridges physical archives with cutting-edge artificial intelligence. It digitizes over 2,400 writings, speeches, letters, photographs, and Constituent Assembly Debates of Dr. Babasaheb Ambedkar, making them universally accessible in 12 Indian languages through touch-first museum kiosks and responsive web portals.
          </p>
        </div>

        {/* How the AI Works: Interactive Visual Architecture Diagram */}
        <div className="bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl p-8 card-riveted shadow-2xl">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <div className="mb-6">
            <span className="selvedge-tape text-[10px]">SYSTEM DESIGN</span>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">
              How the Grounded RAG Pipeline Works
            </h2>
            <p className="text-xs text-[#B8C8DF] mt-1">
              Step-by-step visual schematic of our zero-hallucination citation engine:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/30 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] flex items-center justify-center font-bold mb-3 font-mono">
                1
              </div>
              <Database className="w-6 h-6 text-[#DCB35C] mb-2" />
              <h4 className="font-serif font-bold text-white text-xs mb-1">Archival Digitization</h4>
              <p className="text-[11px] text-[#B8C8DF]">
                Original scans processed via high-accuracy OCR and cryptographically signed with SHA-256 hashes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/30 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] flex items-center justify-center font-bold mb-3 font-mono">
                2
              </div>
              <Search className="w-6 h-6 text-[#DCB35C] mb-2" />
              <h4 className="font-serif font-bold text-white text-xs mb-1">Semantic Embedding</h4>
              <p className="text-[11px] text-[#B8C8DF]">
                Passages chunked into multi-lingual dense vector embeddings for Indic languages.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/30 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] flex items-center justify-center font-bold mb-3 font-mono">
                3
              </div>
              <Cpu className="w-6 h-6 text-[#DCB35C] mb-2" />
              <h4 className="font-serif font-bold text-white text-xs mb-1">Hybrid Reranker</h4>
              <p className="text-[11px] text-[#B8C8DF]">
                BM25 keyword search blended with cross-encoder semantic reranking to retrieve top 5 passages.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/30 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] flex items-center justify-center font-bold mb-3 font-mono">
                4
              </div>
              <ShieldCheck className="w-6 h-6 text-[#10B981] mb-2" />
              <h4 className="font-serif font-bold text-white text-xs mb-1">Strict Grounding</h4>
              <p className="text-[11px] text-[#B8C8DF]">
                LLM generates responses conditioned solely on retrieved citations; ungrounded statements are rejected.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/30 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] flex items-center justify-center font-bold mb-3 font-mono">
                5
              </div>
              <Bot className="w-6 h-6 text-[#f0c36d] mb-2" />
              <h4 className="font-serif font-bold text-white text-xs mb-1">WebRTC Avatar</h4>
              <p className="text-[11px] text-[#B8C8DF]">
                Synthesizes low-latency audio-visual stream and real-time live subtitles with clickable scan citations.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible AI & Archival Ethics Statement */}
        <div className="bg-[#121E33] border-2 border-dashed border-[#10B981]/50 rounded-2xl p-8 card-riveted shadow-2xl">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-[#10B981]" />
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Responsible AI & Archival Integrity Charter
              </h3>
              <p className="text-xs text-[#10B981] font-mono">
                PLEDGE OF HISTORICAL FIDELITY & PUBLIC TRUST
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#B8C8DF] leading-relaxed">
            <p>
              1. <strong>Zero Synthetic Fabrication:</strong> SmritiSetu will never generate speculative quotes or attribute stances to Dr. B. R. Ambedkar that cannot be directly traced to cataloged archival documents.
            </p>
            <p>
              2. <strong>Mandatory Verifiability:</strong> Every conversational response includes clickable inline citations [1], [2] allowing visitors to view the exact facsimile scan and page number of the original manuscript.
            </p>
            <p>
              3. <strong>Human-in-the-Loop Curation:</strong> All newly deposited materials undergo curator verification and OCR correction before entering the active RAG vector index.
            </p>
            <p>
              4. <strong>Universal Accessibility (WCAG 2.2 AA):</strong> Designed with high contrast, touch targets exceeding 64px, on-screen keyboards for 12 Indian languages, and screen-reader support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
