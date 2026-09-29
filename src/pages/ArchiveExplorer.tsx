import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiClient, ArchivalDocument } from '@/api';
import { 
  Search, 
  Mic, 
  MicOff, 
  Filter, 
  Grid, 
  List, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Volume2, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  BookOpen, 
  Calendar, 
  Tag, 
  X,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { VirtualKeyboard } from '@/components/kiosk/VirtualKeyboard';

export const ArchiveExplorer: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<ArchivalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedLang, setSelectedLang] = useState('all');
  const [yearRange, setYearRange] = useState<[number, number]>([1891, 1956]);

  // Voice Search Simulation
  const [isListening, setIsListening] = useState(false);

  // Document Deep-Zoom Modal State
  const [selectedDoc, setSelectedDoc] = useState<ArchivalDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'scan' | 'ocr' | 'split'>('split');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  // Kiosk Virtual Keyboard State
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Load documents on mount
  useEffect(() => {
    fetchDocs();
  }, [selectedType, selectedTopic, selectedLang, yearRange]);

  // Handle URL param for auto-opening document
  useEffect(() => {
    const docId = searchParams.get('doc');
    if (docId && documents.length > 0) {
      const found = documents.find((d) => d.id === docId);
      if (found) {
        setSelectedDoc(found);
      }
    }
  }, [searchParams, documents]);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getDocuments({
        type: selectedType,
        topic: selectedTopic,
        language: selectedLang,
        yearRange: yearRange,
        query: searchQuery
      });
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchDocs();
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Fallback simulation
      setIsListening(true);
      setTimeout(() => {
        setSearchQuery('Constituent Assembly Article 32');
        setIsListening(false);
        fetchDocs();
      }, 1500);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        fetchDocs();
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Pan & Zoom controls for scan viewer
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.3, 3.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.3, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Read aloud TTS
  const handleReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!isReadingAloud) {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.92;
        u.onend = () => setIsReadingAloud(false);
        setIsReadingAloud(true);
        window.speechSynthesis.speak(u);
      } else {
        setIsReadingAloud(false);
      }
    }
  };

  const handleTranslate = async (lang: string) => {
    setTargetLang(lang);
    if (!selectedDoc) return;
    const page = selectedDoc.scanPages[activePageIdx];
    if (page) {
      const res = await apiClient.translateText(page.ocrText, lang);
      setTranslatedText(res);
    }
  };

  const handleAskAboutDoc = (doc: ArchivalDocument) => {
    navigate(`/chat?contextDoc=${doc.id}&query=${encodeURIComponent(`Tell me about "${doc.title}"`)}`);
  };

  const allTopics = ['Caste', 'Constitution', 'Economics', 'Labour', 'Civil Rights', 'Buddhism', 'Democracy'];

  return (
    <div className="bg-denim-twill min-h-screen text-[#B8C8DF] pb-24">
      {/* Top Header Strip */}
      <div className="bg-[#121E33] border-b border-[#DCB35C]/25 py-8">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="selvedge-tape">SIH26096 ARCHIVAL CATALOG</span>
                <span className="brass-stamp text-[10px]">2,400+ DIGITIZED MANUSCRIPTS</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                Archival Explorer <span className="text-[#DCB35C] font-normal">| दस्तावेज संग्रह</span>
              </h1>
              <p className="text-xs md:text-sm text-[#B8C8DF] mt-1">
                Deep-zoom original historical scans, verified OCR transcripts, and multilingual translations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                variant="secondary"
                size="md"
                icon={viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="site-container pt-8">
        {/* Search & Filter Bar */}
        <div className="bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl p-5 mb-8 shadow-xl card-riveted">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          {/* Search Input Row */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DCB35C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowKeyboard(true)}
                placeholder="Search writings, speeches, letters, CAD debates, or keywords..."
                className="w-full pl-12 pr-12 py-3.5 bg-[#121E33] border border-[#DCB35C]/40 rounded-xl text-white placeholder-[#7C90AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C90AF] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              type="button"
              onClick={handleVoiceSearch}
              variant="secondary"
              className={isListening ? 'bg-[#FF8577]/20 border-[#FF8577] text-[#FF8577]' : ''}
              icon={isListening ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4 text-[#DCB35C]" />}
              title="Voice Search"
            >
              {isListening ? 'Listening...' : 'Voice Search'}
            </Button>

            <Button type="submit" variant="primary">
              Search Archive
            </Button>
          </form>

          {/* Filter Chips & Year Range Slider */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t border-[#DCB35C]/20 text-xs">
            {/* Type Filter */}
            <div>
              <label className="block font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-1.5">
                DOCUMENT TYPE
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-[#121E33] border border-[#DCB35C]/30 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-[#DCB35C]"
              >
                <option value="all">All Holdings (Books, Speeches, Letters)</option>
                <option value="book">Books & Treatises</option>
                <option value="speech">Speeches & Addresses</option>
                <option value="letter">Archival Letters & Dispatches</option>
                <option value="photo">Historic Photographs</option>
                <option value="cad">Constituent Assembly Debates (CAD)</option>
              </select>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-1.5">
                TOPIC TAG
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 bg-[#121E33] border border-[#DCB35C]/30 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-[#DCB35C]"
              >
                <option value="all">All Topics & Themes</option>
                {allTopics.map((top) => (
                  <option key={top} value={top}>{top}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-1.5">
                PRIMARY LANGUAGE
              </label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full px-3 py-2 bg-[#121E33] border border-[#DCB35C]/30 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-[#DCB35C]"
              >
                <option value="all">All Available Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            {/* Year Range Slider */}
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-1.5">
                <span>YEAR ERA</span>
                <span className="text-white font-bold">{yearRange[0]} — {yearRange[1]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#7C90AF]">1891</span>
                <input
                  type="range"
                  min="1891"
                  max="1956"
                  value={yearRange[1]}
                  onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#DCB35C] cursor-pointer"
                />
                <span className="font-mono text-[10px] text-[#7C90AF]">1956</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-6 font-mono text-xs text-[#7C90AF]">
          <div>
            SHOWING <strong className="text-white">{documents.length}</strong> VERIFIED RECORDS
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>MUSEUM-GRADE AIR-GAPPED VERIFICATION</span>
          </div>
        </div>

        {/* Documents Grid / List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#DCB35C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-mono text-sm text-[#DCB35C]">RETRIEVING ARCHIVAL FACSIMILES...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16 bg-[#1A2B45] rounded-2xl border-2 border-dashed border-[#DCB35C]/30 p-8">
            <BookOpen className="w-12 h-12 text-[#7C90AF] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-white">No archival records match your criteria</h3>
            <p className="text-xs text-[#B8C8DF] mt-1 mb-4">
              Try adjusting your query or expanding the year range.
            </p>
            <Button onClick={() => { setSelectedType('all'); setSelectedTopic('all'); setYearRange([1891, 1956]); setSearchQuery(''); }} variant="secondary">
              Reset Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                variant="riveted"
                className="bg-[#1A2B45] hover:bg-[#223C63] transition-all duration-300 flex flex-col justify-between p-5 cursor-pointer group"
                onClick={() => setSelectedDoc(doc)}
              >
                <div>
                  <div className="h-48 w-full rounded-xl overflow-hidden mb-4 relative bg-[#121E33]">
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="selvedge-tape text-[9px] uppercase">{doc.type}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="bg-[#0E1624]/90 px-2 py-0.5 rounded text-[10px] font-mono text-[#f0c36d] border border-[#DCB35C]/30">
                        {doc.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-[#DCB35C]">{doc.accessionNumber}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#DCB35C] transition-colors line-clamp-2 mb-1">
                    {doc.title}
                  </h3>

                  {doc.originalTitle && (
                    <p className="font-serif text-xs text-[#f0c36d] opacity-90 mb-2">
                      {doc.originalTitle}
                    </p>
                  )}

                  <p className="text-xs text-[#B8C8DF] line-clamp-3 leading-relaxed mb-4">
                    {doc.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {doc.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#121E33] text-[10px] font-mono text-[#B8C8DF] border border-[#DCB35C]/20">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#DCB35C]/20 flex items-center justify-between">
                    <span className="brass-stamp text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-[#f0c36d]" />
                      {doc.citationsCount} Citations
                    </span>
                    <span className="text-xs font-mono text-[#DCB35C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Examine Scans</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="bg-[#1A2B45] hover:bg-[#223C63] border-2 border-dashed border-[#DCB35C]/30 hover:border-[#DCB35C] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors cursor-pointer card-riveted"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#121E33] hidden sm:block">
                    <img src={doc.thumbnail} alt={doc.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="selvedge-tape text-[9px] uppercase">{doc.type}</span>
                      <span className="font-mono text-[10px] text-[#DCB35C]">{doc.year}</span>
                      <span className="font-mono text-[10px] text-[#7C90AF]">{doc.accessionNumber}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white hover:text-[#DCB35C]">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#B8C8DF] line-clamp-1 mt-0.5">{doc.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="brass-stamp text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-[#f0c36d]" />
                    {doc.citationsCount} citations
                  </span>
                  <Button variant="primary" size="sm">
                    Open Scans
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================================
           DOCUMENT DEEP-ZOOM & SIDE-BY-SIDE OCR VIEWER MODAL
           =================================================================== */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[350] flex items-center justify-center p-2 sm:p-4 bg-[#0A111C]/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl h-[92vh] bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-2xl shadow-2xl flex flex-col overflow-hidden card-riveted">
            <span className="copper-rivet corner-rivet top-left" />
            <span className="copper-rivet corner-rivet top-right" />
            <span className="copper-rivet corner-rivet bottom-left" />
            <span className="copper-rivet corner-rivet bottom-right" />

            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#121E33] border-b border-[#DCB35C]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="selvedge-tape text-[9px] uppercase">{selectedDoc.type}</span>
                  <span className="font-mono text-xs text-[#DCB35C]">{selectedDoc.accessionNumber}</span>
                  <span className="font-mono text-xs text-[#7C90AF]">• {selectedDoc.year}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {selectedDoc.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAskAboutDoc(selectedDoc)}
                  variant="primary"
                  size="sm"
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Ask AI About This
                </Button>
                <button
                  onClick={() => {
                    setSelectedDoc(null);
                    setTranslatedText(null);
                  }}
                  className="p-2 text-[#B8C8DF] hover:text-[#DCB35C] rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Viewer Controls Toolbar */}
            <div className="px-4 py-2.5 bg-[#0E1624] border-b border-[#DCB35C]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                {/* View Mode Toggle: Scan | OCR | Split */}
                <div className="flex bg-[#1A2B45] p-0.5 rounded border border-[#DCB35C]/30">
                  <button
                    onClick={() => setActiveTab('scan')}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'scan' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                    }`}
                  >
                    Original Scan
                  </button>
                  <button
                    onClick={() => setActiveTab('split')}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'split' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setActiveTab('ocr')}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'ocr' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                    }`}
                  >
                    Verified OCR
                  </button>
                </div>

                {/* Page Nav */}
                <div className="flex items-center gap-1.5 ml-2 text-[#B8C8DF]">
                  <span>PAGE {activePageIdx + 1} OF {selectedDoc.scanPages.length}</span>
                </div>
              </div>

              {/* Zoom & Audio Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 bg-[#1A2B45] hover:bg-[#223C63] text-white rounded border border-[#DCB35C]/30"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 text-[#DCB35C]" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 bg-[#1A2B45] hover:bg-[#223C63] text-white rounded border border-[#DCB35C]/30"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-[#DCB35C]" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 bg-[#1A2B45] hover:bg-[#223C63] text-white rounded border border-[#DCB35C]/30"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4 text-[#DCB35C]" />
                </button>

                <div className="h-4 w-px bg-[#DCB35C]/30 mx-1" />

                {/* Read Aloud Button */}
                <Button
                  onClick={() => handleReadAloud(selectedDoc.scanPages[activePageIdx]?.ocrText || '')}
                  variant="secondary"
                  size="sm"
                  icon={<Volume2 className={`w-3.5 h-3.5 ${isReadingAloud ? 'animate-pulse text-[#DCB35C]' : ''}`} />}
                >
                  {isReadingAloud ? 'Reading...' : 'Read Aloud'}
                </Button>

                {/* Translation Selector */}
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#DCB35C]" />
                  <select
                    value={targetLang}
                    onChange={(e) => handleTranslate(e.target.value)}
                    className="bg-[#1A2B45] text-white border border-[#DCB35C]/30 rounded px-2 py-1 text-xs"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-[#0A111C]">
              {/* Scan Facsimile Viewer Area */}
              {(activeTab === 'scan' || activeTab === 'split') && (
                <div
                  className={`${activeTab === 'split' ? 'md:col-span-6' : 'md:col-span-12'} h-full relative overflow-hidden bg-[#070B12] flex items-center justify-center cursor-grab active:cursor-grabbing border-r border-[#DCB35C]/20`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    style={{
                      transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                      transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                    }}
                    className="relative max-w-full max-h-full select-none"
                  >
                    <img
                      src={selectedDoc.scanPages[activePageIdx]?.scanUrl || selectedDoc.thumbnail}
                      alt="Archival Scan"
                      className="max-h-[70vh] object-contain shadow-2xl rounded border border-[#DCB35C]/30"
                    />
                  </div>

                  {/* Watermark & Provenance stamp */}
                  <div className="absolute bottom-3 left-3 bg-[#0E1624]/90 px-3 py-1.5 rounded border border-[#DCB35C]/30 font-mono text-[10px] text-[#DCB35C] pointer-events-none">
                    FACSIMILE PROVENANCE: {selectedDoc.sourceArchive}
                  </div>
                </div>
              )}

              {/* OCR Text & Translation Area */}
              {(activeTab === 'ocr' || activeTab === 'split') && (
                <div className={`${activeTab === 'split' ? 'md:col-span-6' : 'md:col-span-12'} h-full overflow-y-auto p-6 bg-[#1A2B45] space-y-6`}>
                  {/* OCR Verification Banner */}
                  <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                      <span className="font-mono text-[#10B981]">100% VERIFIED BY CURATOR</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#7C90AF]">{selectedDoc.verificationHash.slice(0, 18)}...</span>
                  </div>

                  {/* OCR Transcribed Text */}
                  <div>
                    <h4 className="font-mono text-xs text-[#DCB35C] uppercase tracking-wider mb-2">
                      VERIFIED TRANSCRIPTION (PAGE {activePageIdx + 1})
                    </h4>
                    <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/20 font-serif text-sm md:text-base text-white leading-relaxed whitespace-pre-line shadow-inner">
                      {translatedText ? translatedText : selectedDoc.scanPages[activePageIdx]?.ocrText}
                    </div>
                  </div>

                  {/* Document Archival Metadata */}
                  <div className="p-4 bg-[#121E33] rounded-xl border border-[#DCB35C]/20 space-y-2 text-xs">
                    <div className="font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-2">
                      ARCHIVAL PROVENANCE METADATA
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[#B8C8DF]">
                      <div><strong>Accession:</strong> {selectedDoc.accessionNumber}</div>
                      <div><strong>Date:</strong> {selectedDoc.date}</div>
                      <div><strong>Source:</strong> {selectedDoc.sourceArchive}</div>
                      <div><strong>Rights:</strong> {selectedDoc.rights}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Kiosk Virtual On-Screen Keyboard */}
      <VirtualKeyboard
        isOpen={showKeyboard}
        onClose={() => setShowKeyboard(false)}
        onKeyPress={(char) => setSearchQuery((prev) => prev + char)}
        onBackspace={() => setSearchQuery((prev) => prev.slice(0, -1))}
        onEnter={() => {
          setShowKeyboard(false);
          fetchDocs();
        }}
        onClear={() => setSearchQuery('')}
      />
    </div>
  );
};
