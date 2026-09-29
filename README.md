# SmritiSetu (स्मृतिसेतु) — AI Digital Heritage Archive & Museum Kiosk
### Smart India Hackathon 2026 • Problem Statement: SIH26096
**Ministry of Social Justice and Empowerment, Government of India (Hardware / Kiosk Category)**

---

## 🏛️ Project Summary
**SmritiSetu** (स्मृतिसेतु) is a state-of-the-art physical-digital heritage archive and interactive public museum kiosk dedicated to **Babasaheb Dr. B. R. Ambedkar**. Developed for Smart India Hackathon 2026, it solves the challenge of preserving, digitizing, and democratizing access to historical archives while strictly eliminating synthetic AI hallucinations.

### Core Capabilities
1. **Fullscreen 240-Frame 1080p Video Reveal**: An edge-to-edge canvas opening reveal scrubbed smoothly via GSAP ScrollTrigger without jitter or blank space.
2. **Document Explorer**: Search and filter 2,400+ digitized writings, speeches, letters, photographs, and Constituent Assembly Debates (CAD). Features deep-zoom scan viewer, side-by-side OCR transcript, 12-language translation, and TTS read-aloud.
3. **AI Q&A (RAG Chat with Verifiable Citations)**: Natural language inquiry with simulated SSE token streaming. Every claim contains clickable numbered citations `[1]`, `[2]` opening a slide-over panel with the exact source passage and scan page facsimile.
4. **Talk to Dr. Ambedkar (Live AI Avatar)**: Full-screen interactive avatar stream with distinct visual states (`idle`, `listening`, `thinking`, `speaking`), live audio waveform, streaming subtitles, interrupt ("barge-in") handling, and dynamic source verification panel.
5. **3D Life Timeline (1891–1956)**: An interactive Three.js perspective journey across 31 historical milestones with auto-tour mode and an accessible 2D fallback.
6. **Museum Kiosk Mode (`?kiosk=1`)**: Touch-first architecture with 64px+ targets, on-screen Indic virtual keyboard, 90-second inactivity reset with a 60-second warning countdown modal, and hidden curator exit gesture (5 taps in top-right corner + PIN `1956`).
7. **Curator & Admin Verification Desk**: Review queue for newly digitized scans, side-by-side OCR editor, document uploader, and live analytics dashboard.

---

## 🛠️ Technology Stack
- **Framework & Build**: React 18, Vite 6, TypeScript
- **Styling & Aesthetics**: Tailwind CSS with custom Denim & Industrial Craft theme (`#1E3A8A` Ambedkar Indigo, `#DCB35C` Brass, `#B87333` Copper Rivets, `#C93B2B` Selvedge, `#FBF9F4` Warm Parchment)
- **Animation & 3D**: GSAP + ScrollTrigger (1080p canvas frame scrubber), Three.js (3D Timeline rail)
- **Global State & Query**: Zustand (`useAppStore`), TanStack React Query
- **Multilingual Support**: `i18next` + `react-i18next` for 12 Indian Languages (English, हिन्दी, मराठी, தமிழ், తెలుగు, বাংলা, ગુજરાતી, ಕನ್ನಡ, മലയാളം, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, اردو)
- **Audio & Media APIs**: Web Audio API (real-time voice waveforms), SpeechSynthesis (TTS), MediaRecorder & WebRTC interfaces
- **QR Sharing**: `qrcode` library for dynamic session export to mobile devices

---

## 📂 Folder Structure
```
SmritiSetu-frontend/
├── public/
│   ├── frames/                 # 240 high-DPI 1080p master video frames (frame_0001.jpg - frame_0240.jpg)
│   ├── favicon.svg             # Brand crest icon
│   └── smriti_setu_reveal.mp4  # Source video
├── src/
│   ├── api/
│   │   ├── client.ts           # Typed API client (documents, search, SSE chat stream, STT, TTS, WebRTC)
│   │   └── index.ts
│   ├── components/
│   │   ├── kiosk/
│   │   │   ├── IdleWarningModal.tsx  # 30s countdown warning before session reset
│   │   │   └── VirtualKeyboard.tsx   # Touch-screen keyboard (English, Devanagari, Numbers)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Bilingual header, 12-language picker, Kiosk & Theme toggles
│   │   │   └── Footer.tsx      # Selvedge red border & SIH26096 attribution
│   │   ├── ui/
│   │   │   ├── Badge.tsx       # Selvedge, brass, and verified badges
│   │   │   ├── Button.tsx      # 64px+ kiosk touch targets, leather & primary variants
│   │   │   ├── Card.tsx        # Riveted corners & gold chain-stitching
│   │   │   ├── Drawer.tsx      # Slide-over source citation viewer
│   │   │   └── Modal.tsx       # Accessible dialogs
│   │   └── VideoHeroScrubber.tsx # 1080p canvas scrubber with RAF render loop & GSAP pin
│   ├── hooks/
│   │   └── useKioskIdle.ts     # Inactivity detector (60s warn, 90s reset to Attract Screen)
│   ├── i18n/
│   │   └── config.ts           # 12 Indian language configurations and translations
│   ├── mocks/
│   │   ├── documents.ts        # 25+ realistic archival documents (books, CAD debates, speeches, scans)
│   │   ├── timelineEvents.ts   # 31 milestones from 1891 to 1956
│   │   └── qaDatabase.ts       # Multilingual Q&A with exact page-level citations
│   ├── pages/
│   │   ├── Home.tsx            # Hub page with video scrub, 4 major kiosk cards, quote strip
│   │   ├── ArchiveExplorer.tsx # Deep-zoom scan viewer, side-by-side OCR, filters
│   │   ├── Chat.tsx            # Grounded RAG AI Q&A with live citations and audio waveform
│   │   ├── Avatar.tsx          # Full-screen Dr. Ambedkar WebRTC live avatar
│   │   ├── Timeline.tsx        # Three.js 3D interactive timeline (1891-1956)
│   │   ├── Admin.tsx           # Curator review queue, OCR editor, and analytics
│   │   ├── About.tsx           # Mission, RAG architecture diagram, and ethics pledge
│   │   └── KioskAttract.tsx    # Ken Burns archival slideshow, touch-to-begin, language picker
│   ├── store/
│   │   └── useAppStore.ts      # Global Zustand store (kiosk mode, theme, idle state)
│   ├── styles/
│   │   ├── variables.css       # Design tokens, color scales, z-indexes
│   │   ├── denim-texture.css   # 3/1 twill weave, copper rivets, selvedge tape
│   │   ├── theme.css           # Museum Day vs Kiosk Night
│   │   ├── components.css      # Stitching, badges, and layout utilities
│   │   └── main.css            # Tailwind directives and global foundations
│   ├── App.tsx                 # Route-based code splitting and suspense fallbacks
│   └── main.tsx                # React root entry point
├── tailwind.config.js          # Custom colors, fonts, and animation keyframes
├── vite.config.ts              # Code splitting manualChunks (three, gsap, react)
└── package.json
```

---

## 🚀 Setup & Execution

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔌 Switching from Mocks to Real FastAPI Backend
The frontend is built with clean abstraction interfaces in `/src/api/client.ts`. To connect to a live FastAPI backend:

1. Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_WEBRTC_SIGNAL_URL=ws://localhost:8000/api/avatar/ws
   VITE_KIOSK_MODE=false
   ```
2. Replace mock calls in `/src/api/client.ts` with standard `fetch()` or `EventSource` pointing to `import.meta.env.VITE_API_BASE_URL`.

---

## 🖥️ Public Museum Kiosk Instructions
- **Enter Kiosk Mode**: Click the **"KIOSK"** button in the navbar, or add `?kiosk=1` to the URL:
  ```
  http://localhost:5173/?kiosk=1
  ```
- **Kiosk Features**:
  - Touch targets automatically scale to **64px+** height.
  - Text selection and context menus are disabled.
  - On-screen touch keyboard appears whenever an input or search field is focused.
  - **Inactivity Reset**: If unattended for 60 seconds, a 30-second countdown warning appears. If unanswered, the session resets and returns to the Attract Screen (`/kiosk-attract`).
- **Exiting Kiosk Mode (Curator Secret Gesture)**:
  - Rapidly tap the top-right corner of the Attract Screen **5 times** within 3 seconds.
  - Enter the curator PIN: **`1956`** (or `2026`) when prompted.
