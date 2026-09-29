import { ARCHIVE_DOCUMENTS, ArchivalDocument } from '@/mocks/documents';
import { TIMELINE_EVENTS, TimelineEvent } from '@/mocks/timelineEvents';
import { QA_DATABASE, QAPair, ArchivalCitation } from '@/mocks/qaDatabase';

export interface SearchParams {
  query?: string;
  type?: string;
  yearRange?: [number, number];
  language?: string;
  topic?: string;
  status?: string;
}

export interface ChatStreamCallbacks {
  onChunk: (chunk: string) => void;
  onCitations: (citations: ArchivalCitation[]) => void;
  onDone: () => void;
  onError?: (err: Error) => void;
}

export interface CuratorItem {
  id: string;
  docTitle: string;
  contributor: string;
  submissionDate: string;
  confidenceScore: number;
  status: 'pending' | 'verified' | 'rejected';
  rawOcr: string;
  correctedOcr: string;
  scanUrl: string;
}

// In-memory curator store for live approvals
let CURATOR_QUEUE: CuratorItem[] = [
  {
    id: 'queue-01',
    docTitle: 'Letter to Dr. John Dewey at Columbia (1916 Draft)',
    contributor: 'Columbia University Rare Book & Manuscript Library',
    submissionDate: '2026-09-24',
    confidenceScore: 94.2,
    status: 'pending',
    rawOcr: 'My dear Professor Dewey,\nI am sending herewith my essay on the mechanisms of social division in India. The influence of your pragmatism has guided my sociological definitions.',
    correctedOcr: 'My dear Professor Dewey,\nI am sending herewith my essay on the mechanisms of social division in India. The influence of your pragmatism has guided my sociological definitions.',
    scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'queue-02',
    docTitle: 'Resolution on Maternity Benefits for Coal Miners (1943)',
    contributor: 'Central Labour Library, New Delhi',
    submissionDate: '2026-09-26',
    confidenceScore: 89.6,
    status: 'pending',
    rawOcr: 'Govt of India. Dept of Labour. Be it enacted that women workers in underground mines shall receive four weeks of paid maternity leave preceding confinement.',
    correctedOcr: 'Government of India. Department of Labour. Be it enacted that women workers in underground mines shall receive four weeks of paid maternity leave preceding confinement.',
    scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80'
  }
];

export const apiClient = {
  // 1. Documents
  getDocuments: async (params?: SearchParams): Promise<ArchivalDocument[]> => {
    await new Promise((r) => setTimeout(r, 150));
    let docs = [...ARCHIVE_DOCUMENTS];

    if (params?.type && params.type !== 'all') {
      docs = docs.filter((d) => d.type === params.type);
    }
    if (params?.yearRange) {
      const [minY, maxY] = params.yearRange;
      docs = docs.filter((d) => d.year >= minY && d.year <= maxY);
    }
    if (params?.language && params.language !== 'all') {
      docs = docs.filter((d) => d.language.toLowerCase().includes(params.language!.toLowerCase()) || d.availableLanguages.some(l => l.toLowerCase() === params.language!.toLowerCase()));
    }
    if (params?.topic && params.topic !== 'all') {
      docs = docs.filter((d) => d.tags.some((t) => t.toLowerCase() === params.topic!.toLowerCase()));
    }
    if (params?.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      docs = docs.filter((d) => 
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q)) ||
        d.scanPages.some(p => p.ocrText.toLowerCase().includes(q))
      );
    }

    return docs;
  },

  getDocumentById: async (id: string): Promise<ArchivalDocument | null> => {
    await new Promise((r) => setTimeout(r, 100));
    return ARCHIVE_DOCUMENTS.find((d) => d.id === id) || null;
  },

  // 2. Search
  searchArchive: async (query: string, filters?: SearchParams) => {
    return apiClient.getDocuments({ ...filters, query });
  },

  // 3. Timeline Events
  getTimelineEvents: async (): Promise<TimelineEvent[]> => {
    await new Promise((r) => setTimeout(r, 100));
    return TIMELINE_EVENTS;
  },

  // 4. RAG Chat Stream (SSE Simulation)
  askChatStream: (
    question: string,
    language: string,
    callbacks: ChatStreamCallbacks
  ): (() => void) => {
    let cancelled = false;

    // Search QA Database for closest match
    const normalizedQ = question.toLowerCase();
    const match = QA_DATABASE.find((item) => {
      const itemQ = item.question.toLowerCase();
      return (
        itemQ.includes(normalizedQ) ||
        normalizedQ.includes(itemQ) ||
        normalizedQ.split(' ').some((word) => word.length > 4 && itemQ.includes(word))
      );
    }) || QA_DATABASE[0];

    const answerText = match.answer;
    const citations = match.citations;

    // Simulate Token streaming over chunks
    const words = answerText.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (cancelled) {
        clearInterval(interval);
        return;
      }

      if (currentIndex < words.length) {
        const nextChunk = (currentIndex === 0 ? '' : ' ') + words[currentIndex];
        callbacks.onChunk(nextChunk);
        currentIndex++;
      } else {
        clearInterval(interval);
        callbacks.onCitations(citations);
        callbacks.onDone();
      }
    }, 45); // 45ms per token stream

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  },

  // 5. Speech to Text (Mock)
  submitSttAudio: async (audioBlob: Blob): Promise<{ text: string; language: string }> => {
    await new Promise((r) => setTimeout(r, 900));
    return {
      text: 'Why did Dr. Ambedkar consider Article 32 the heart and soul of the Constitution?',
      language: 'en'
    };
  },

  // 6. Text to Speech (Mock Browser Web Speech synthesis fallback)
  getTtsAudio: async (text: string, language: string): Promise<{ audioUrl?: string }> => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/\[\d+\]/g, ''));
      utterance.rate = 0.95;
      utterance.pitch = 0.92;
      window.speechSynthesis.speak(utterance);
    }
    return { audioUrl: undefined };
  },

  // 7. WebRTC Avatar SDP Exchange (Mock)
  createAvatarOffer: async (clientSdp: string): Promise<{ sdpAnswer: string; status: 'connected' | 'fallback' }> => {
    await new Promise((r) => setTimeout(r, 800));
    return {
      sdpAnswer: 'v=0\r\no=SmritiSetuAvatar 1956 2026 IN IP4 127.0.0.1\r\ns=AvatarStream',
      status: 'connected'
    };
  },

  // 8. Translation
  translateText: async (text: string, targetLanguage: string): Promise<string> => {
    await new Promise((r) => setTimeout(r, 400));
    if (targetLanguage === 'hi') {
      return `[हिन्दी अनुवाद]: ${text}`;
    }
    if (targetLanguage === 'mr') {
      return `[मराठी भाषांतर]: ${text}`;
    }
    return text;
  },

  // 9. Admin & Curator Queue
  getCuratorQueue: async (): Promise<CuratorItem[]> => {
    await new Promise((r) => setTimeout(r, 120));
    return [...CURATOR_QUEUE];
  },

  verifyCuratorItem: async (id: string, updatedOcr: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 200));
    CURATOR_QUEUE = CURATOR_QUEUE.map((item) =>
      item.id === id ? { ...item, status: 'verified', correctedOcr: updatedOcr } : item
    );
    return true;
  },

  uploadDocument: async (docData: Partial<ArchivalDocument>): Promise<ArchivalDocument> => {
    await new Promise((r) => setTimeout(r, 600));
    const newDoc: ArchivalDocument = {
      id: `doc-${Date.now()}`,
      title: docData.title || 'Untitled Archival Deposit',
      type: docData.type || 'book',
      year: docData.year || 1948,
      date: new Date().toISOString().split('T')[0],
      language: docData.language || 'English',
      availableLanguages: ['English'],
      sourceArchive: docData.sourceArchive || 'Curator Deposit Desk',
      accessionNumber: `AMA-${Date.now().toString().slice(-6)}`,
      verificationStatus: 'verified',
      verificationHash: `SHA256:${Math.random().toString(16).slice(2)}`,
      rights: 'Government of India Archival Commons',
      tags: docData.tags || ['Constitutional Law', 'Social Reform'],
      summary: docData.summary || 'Newly digitized archival document deposited for museum display.',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      citationsCount: 0,
      scanPages: [
        {
          pageNumber: 1,
          scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
          ocrText: docData.summary || 'Archival text verified by curator.'
        }
      ]
    };
    ARCHIVE_DOCUMENTS.unshift(newDoc);
    return newDoc;
  },

  // 10. Analytics
  getAnalyticsSummary: async () => {
    await new Promise((r) => setTimeout(r, 150));
    return {
      totalDocumentsDigitized: 2480,
      verifiedArchivalRecords: 2415,
      totalQueriesAnswered: 18450,
      kioskSessionsToday: 412,
      languagesBreakdown: [
        { name: 'Hindi', value: 38, count: 7011 },
        { name: 'English', value: 29, count: 5350 },
        { name: 'Marathi', value: 18, count: 3321 },
        { name: 'Tamil', value: 8, count: 1476 },
        { name: 'Telugu', value: 4, count: 738 },
        { name: 'Others', value: 3, count: 554 },
      ],
      popularQueries: [
        { query: 'Article 32 as heart and soul', hits: 3410 },
        { query: 'Annihilation of Caste key thesis', hits: 2890 },
        { query: 'Resignation over Hindu Code Bill', hits: 2450 },
        { query: '8-Hour workday and labour reforms', hits: 2120 },
        { query: 'Mahad Chavdar Lake human dignity', hits: 1980 }
      ],
      weeklyTraffic: [
        { day: 'Mon', visitors: 340, queries: 1420 },
        { day: 'Tue', visitors: 420, queries: 1780 },
        { day: 'Wed', visitors: 390, queries: 1650 },
        { day: 'Thu', visitors: 510, queries: 2190 },
        { day: 'Fri', visitors: 580, queries: 2450 },
        { day: 'Sat', visitors: 890, queries: 3820 },
        { day: 'Sun', visitors: 940, queries: 4120 }
      ]
    };
  }
};
