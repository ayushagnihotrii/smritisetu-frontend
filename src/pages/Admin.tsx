import React, { useState, useEffect } from 'react';
import { apiClient, CuratorItem } from '@/api';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Upload, 
  CheckCircle, 
  BarChart3, 
  Lock, 
  FileText, 
  Eye, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Globe, 
  Edit3,
  Sparkles,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('curator@smritisetu.gov.in');
  const [password, setPassword] = useState('ambedkar1891');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'queue' | 'upload' | 'analytics'>('queue');
  const [queueItems, setQueueItems] = useState<CuratorItem[]>([]);
  const [selectedQueueItem, setSelectedQueueItem] = useState<CuratorItem | null>(null);
  const [editedOcr, setEditedOcr] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // New Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('book');
  const [uploadYear, setUploadYear] = useState('1948');
  const [uploadSummary, setUploadSummary] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Analytics Data
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    loadQueue();
    loadAnalytics();
  }, []);

  const loadQueue = async () => {
    const data = await apiClient.getCuratorQueue();
    setQueueItems(data);
    if (data.length > 0 && !selectedQueueItem) {
      setSelectedQueueItem(data[0]);
      setEditedOcr(data[0].correctedOcr);
    }
  };

  const loadAnalytics = async () => {
    const data = await apiClient.getAnalyticsSummary();
    setAnalytics(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSelectQueueItem = (item: CuratorItem) => {
    setSelectedQueueItem(item);
    setEditedOcr(item.correctedOcr);
  };

  const handleVerifyItem = async () => {
    if (!selectedQueueItem) return;
    setIsVerifying(true);
    try {
      await apiClient.verifyCuratorItem(selectedQueueItem.id, editedOcr);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DCB35C', '#f0c36d', '#1E3A8A']
      });
      await loadQueue();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiClient.uploadDocument({
      title: uploadTitle,
      type: uploadType as any,
      year: parseInt(uploadYear),
      summary: uploadSummary
    });
    setUploadSuccess(true);
    setUploadTitle('');
    setUploadSummary('');
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  // If not logged in, show curator login gate
  if (!isAuthenticated) {
    return (
      <div className="bg-denim-twill min-h-screen text-[#B8C8DF] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-2xl p-8 shadow-2xl card-riveted">
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />

          <div className="w-14 h-14 rounded-2xl bg-[#DCB35C]/15 border border-[#DCB35C]/40 flex items-center justify-center text-[#DCB35C] mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-white text-center mb-1">
            Curator & Admin Portal
          </h2>
          <p className="text-xs text-[#B8C8DF] text-center mb-6">
            Authorized personnel login for human-in-the-loop archival OCR verification.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                CURATOR ID / EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                SECURE TOKEN / PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
                required
              />
            </div>

            <div className="p-3 bg-[#121E33] rounded-lg border border-[#DCB35C]/20 text-[11px] font-mono text-[#DCB35C]">
              DEMO CREDENTIALS: <br />
              Email: <strong>curator@smritisetu.gov.in</strong> | PIN: <strong>ambedkar1891</strong>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3.5">
              Access Verification Desk
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-denim-twill min-h-screen text-[#B8C8DF] pb-24">
      {/* Top Header */}
      <div className="bg-[#121E33] border-b border-[#DCB35C]/25 py-6">
        <div className="site-container flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="selvedge-tape text-[9px]">HUMAN-IN-THE-LOOP VERIFICATION</span>
              <span className="brass-stamp text-[10px]">CURATOR DESK ACTIVE</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Curator & Archival Review Desk <span className="text-[#DCB35C] font-normal">| समीक्षा पोर्टल</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#DCB35C] hidden sm:inline">{email}</span>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="secondary"
              size="sm"
              icon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-[#0E1624] border-b border-[#DCB35C]/20 py-2">
        <div className="site-container flex items-center gap-3">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'queue' ? 'bg-[#DCB35C] text-[#0E1624]' : 'bg-[#1A2B45] text-[#B8C8DF] hover:bg-[#223C63]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verification Queue ({queueItems.filter((q) => q.status === 'pending').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'upload' ? 'bg-[#DCB35C] text-[#0E1624]' : 'bg-[#1A2B45] text-[#B8C8DF] hover:bg-[#223C63]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Deposit New Record</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'analytics' ? 'bg-[#DCB35C] text-[#0E1624]' : 'bg-[#1A2B45] text-[#B8C8DF] hover:bg-[#223C63]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="site-container pt-8">
        {/* TAB 1: REVIEW QUEUE (SIDE-BY-SIDE OCR VERIFIER) */}
        {activeTab === 'queue' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Queue List */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-xs text-[#DCB35C] uppercase tracking-wider block mb-2">
                PENDING ARCHIVAL SUBMISSIONS
              </span>

              {queueItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectQueueItem(item)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedQueueItem?.id === item.id
                      ? 'bg-[#223C63] border-[#DCB35C] shadow-lg'
                      : 'bg-[#1A2B45] border-[#DCB35C]/20 hover:border-[#DCB35C]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#7C90AF] mb-1">
                    <span>{item.submissionDate}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        item.status === 'verified'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#DCB35C]/20 text-[#DCB35C]'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-white text-sm mb-1">{item.docTitle}</h4>
                  <p className="text-[11px] text-[#B8C8DF] truncate">{item.contributor}</p>

                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#DCB35C]">
                    <span>OCR CONFIDENCE: {item.confidenceScore}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side-by-Side Reviewer */}
            {selectedQueueItem && (
              <div className="lg:col-span-8 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-2xl p-6 shadow-2xl card-riveted">
                <span className="copper-rivet corner-rivet top-left" />
                <span className="copper-rivet corner-rivet top-right" />
                <span className="copper-rivet corner-rivet bottom-left" />
                <span className="copper-rivet corner-rivet bottom-right" />

                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#DCB35C]/20 mb-6 gap-2">
                  <div>
                    <span className="selvedge-tape text-[10px]">CORRECTION DESK</span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      {selectedQueueItem.docTitle}
                    </h3>
                  </div>

                  <Button
                    onClick={handleVerifyItem}
                    variant="primary"
                    loading={isVerifying}
                    icon={<CheckCircle className="w-4 h-4" />}
                  >
                    {selectedQueueItem.status === 'verified' ? 'Re-Approve & Publish' : 'Approve & Publish to AI'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Original Scan */}
                  <div>
                    <label className="block font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider mb-2">
                      ORIGINAL SCAN FACSIMILE
                    </label>
                    <div className="rounded-xl overflow-hidden border border-[#DCB35C]/30 bg-[#0A111C] h-80 flex items-center justify-center">
                      <img
                        src={selectedQueueItem.scanUrl}
                        alt="Scan"
                        className="max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Right: Editable OCR Text */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono text-[10px] text-[#DCB35C] uppercase tracking-wider">
                        EDITABLE OCR TRANSCRIPT
                      </label>
                      <span className="text-[10px] font-mono text-[#10B981]">
                        EDIT & CORRECT
                      </span>
                    </div>
                    <textarea
                      value={editedOcr}
                      onChange={(e) => setEditedOcr(e.target.value)}
                      rows={12}
                      className="w-full p-4 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white font-serif text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DEPOSIT NEW RECORD FORM */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto bg-[#1A2B45] border-2 border-dashed border-[#DCB35C] rounded-2xl p-8 card-riveted shadow-2xl">
            <span className="copper-rivet corner-rivet top-left" />
            <span className="copper-rivet corner-rivet top-right" />
            <span className="copper-rivet corner-rivet bottom-left" />
            <span className="copper-rivet corner-rivet bottom-right" />

            <div className="text-center mb-6">
              <span className="selvedge-tape mb-1 inline-block">PERMANENT ACCESSION</span>
              <h2 className="font-serif text-2xl font-bold text-white">
                Deposit Archival Document
              </h2>
              <p className="text-xs text-[#B8C8DF] mt-1">
                Upload scans, metadata, and OCR content to expand the grounded knowledge base.
              </p>
            </div>

            {uploadSuccess && (
              <div className="p-4 bg-[#10B981]/20 border border-[#10B981] rounded-xl text-xs text-[#10B981] mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Document successfully deposited and published to the AI RAG index!</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                  DOCUMENT TITLE
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Speech at All-India Scheduled Castes Federation, Bombay (1944)"
                  required
                  className="w-full px-4 py-3 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                    DOCUMENT TYPE
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="w-full px-4 py-3 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none"
                  >
                    <option value="book">Book / Treatise</option>
                    <option value="speech">Public Speech</option>
                    <option value="letter">Historical Letter</option>
                    <option value="photo">Photographic Negative</option>
                    <option value="cad">Constituent Assembly Debate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                    YEAR ERA
                  </label>
                  <input
                    type="number"
                    min="1891"
                    max="1956"
                    value={uploadYear}
                    onChange={(e) => setUploadYear(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#DCB35C] uppercase mb-1">
                  HISTORICAL SUMMARY & OCR CONTENT
                </label>
                <textarea
                  value={uploadSummary}
                  onChange={(e) => setUploadSummary(e.target.value)}
                  rows={4}
                  placeholder="Provide verbatim transcribed text or archival overview..."
                  required
                  className="w-full p-4 bg-[#121E33] border border-[#DCB35C]/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#DCB35C]"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full py-3.5">
                Submit for Archival Ingestion
              </Button>
            </form>
          </div>
        )}

        {/* TAB 3: ANALYTICS DASHBOARD */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl shadow-xl card-riveted">
                <div className="font-mono text-[10px] text-[#7C90AF] uppercase">TOTAL DIGITIZED HOLDINGS</div>
                <div className="font-serif text-3xl font-bold text-white mt-1">{analytics.totalDocumentsDigitized}</div>
                <div className="text-xs text-[#10B981] mt-2 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+12 this week</span>
                </div>
              </div>

              <div className="p-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl shadow-xl card-riveted">
                <div className="font-mono text-[10px] text-[#7C90AF] uppercase">VERIFIED ARCHIVAL RECORDS</div>
                <div className="font-serif text-3xl font-bold text-[#DCB35C] mt-1">{analytics.verifiedArchivalRecords}</div>
                <div className="text-xs text-[#DCB35C] mt-2 font-mono">97.3% verified rate</div>
              </div>

              <div className="p-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl shadow-xl card-riveted">
                <div className="font-mono text-[10px] text-[#7C90AF] uppercase">TOTAL QUERIES ANSWERED</div>
                <div className="font-serif text-3xl font-bold text-white mt-1">{analytics.totalQueriesAnswered}</div>
                <div className="text-xs text-[#f0c36d] mt-2 font-mono">100% cited grounding</div>
              </div>

              <div className="p-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/40 rounded-2xl shadow-xl card-riveted">
                <div className="font-mono text-[10px] text-[#7C90AF] uppercase">KIOSK SESSIONS TODAY</div>
                <div className="font-serif text-3xl font-bold text-[#f0c36d] mt-1">{analytics.kioskSessionsToday}</div>
                <div className="text-xs text-[#10B981] mt-2 font-mono">Avg time: 4m 18s</div>
              </div>
            </div>

            {/* Language Breakdown & Popular Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Language Breakdown */}
              <div className="lg:col-span-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/30 rounded-2xl p-6 shadow-xl card-riveted">
                <span className="selvedge-tape text-[10px] mb-2 inline-block">12 INDIAN LANGUAGES</span>
                <h3 className="font-serif text-xl font-bold text-white mb-4">
                  Language Distribution of Inquiries
                </h3>

                <div className="space-y-3">
                  {analytics.languagesBreakdown.map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-white">{item.name}</span>
                        <span className="text-[#DCB35C]">{item.count} queries ({item.value}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#121E33] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#DCB35C] rounded-full"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Historical Questions */}
              <div className="lg:col-span-6 bg-[#1A2B45] border-2 border-dashed border-[#DCB35C]/30 rounded-2xl p-6 shadow-xl card-riveted">
                <span className="selvedge-tape text-[10px] mb-2 inline-block">INQUIRY TRENDS</span>
                <h3 className="font-serif text-xl font-bold text-white mb-4">
                  Most Frequent Archival Questions
                </h3>

                <div className="space-y-3">
                  {analytics.popularQueries.map((q: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121E33] rounded-xl border border-[#DCB35C]/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#DCB35C]/20 text-[#DCB35C] font-mono text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-white font-medium">{q.query}</span>
                      </div>
                      <span className="text-xs font-mono text-[#f0c36d]">{q.hits} hits</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
