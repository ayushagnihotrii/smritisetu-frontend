import React, { useState } from 'react';
import { Delete, CornerDownLeft, Globe, Space, X } from 'lucide-react';

export interface VirtualKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onClear: () => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  isOpen,
  onClose,
  onKeyPress,
  onBackspace,
  onEnter,
  onClear,
}) => {
  const [layout, setLayout] = useState<'en' | 'devanagari' | 'num'>('en');

  if (!isOpen) return null;

  // Sound feedback for tactile kiosk feel
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  };

  const handleKey = (char: string) => {
    playClickSound();
    onKeyPress(char);
  };

  const handleBksp = () => {
    playClickSound();
    onBackspace();
  };

  const enRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '?', '!']
  ];

  const devanagariRows = [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं'],
    ['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ'],
    ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ'],
    ['ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
    ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', '्']
  ];

  const numRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['@', '#', '$', '%', '&', '-', '+', '(', ')', '/'],
    ['=', '*', '"', "'", ':', ';', '!', '?', '.', ',']
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[400] bg-[#0E1624]/95 border-t-2 border-[#DCB35C] p-3 md:p-5 shadow-2xl backdrop-blur-md animate-slideUp">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#DCB35C]/15 text-[#DCB35C] font-mono text-[10px] font-semibold uppercase tracking-wider">
              Kiosk On-Screen Keyboard
            </span>
            <div className="flex bg-[#1E293B] p-0.5 rounded border border-slate-700/60 text-xs">
              <button
                onClick={() => setLayout('en')}
                className={`px-3 py-1 rounded transition-colors ${
                  layout === 'en' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLayout('devanagari')}
                className={`px-3 py-1 rounded transition-colors ${
                  layout === 'devanagari' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                }`}
              >
                हिन्दी / मराठी
              </button>
              <button
                onClick={() => setLayout('num')}
                className={`px-3 py-1 rounded transition-colors ${
                  layout === 'num' ? 'bg-[#DCB35C] text-[#0E1624] font-bold' : 'text-[#B8C8DF]'
                }`}
              >
                123 / ?&
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="px-3 py-1 bg-[#1A2B45] text-xs font-mono text-[#f0c36d] hover:bg-[#223C63] border border-[#DCB35C]/30 rounded transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8C8DF] hover:text-[#DCB35C] rounded-lg transition-colors"
              aria-label="Hide keyboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Keyboard Keys Matrix */}
        <div className="flex flex-col gap-1.5 pt-1">
          {layout === 'en' &&
            enRows.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1.5">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKey(key.toLowerCase())}
                    className="flex-1 max-w-[68px] h-12 md:h-14 bg-[#1A2B45] hover:bg-[#223C63] text-white border border-[#DCB35C]/30 rounded-lg text-lg font-serif font-bold shadow-sm active:bg-[#DCB35C] active:text-[#0E1624] active:scale-95 transition-all select-none"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}

          {layout === 'devanagari' &&
            devanagariRows.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKey(key)}
                    className="flex-1 max-w-[62px] h-11 md:h-13 bg-[#1A2B45] hover:bg-[#223C63] text-white border border-[#DCB35C]/30 rounded-lg text-lg font-serif font-bold shadow-sm active:bg-[#DCB35C] active:text-[#0E1624] active:scale-95 transition-all select-none"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}

          {layout === 'num' &&
            numRows.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1.5">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKey(key)}
                    className="flex-1 max-w-[68px] h-12 md:h-14 bg-[#1A2B45] hover:bg-[#223C63] text-[#f0c36d] border border-[#DCB35C]/30 rounded-lg text-lg font-mono font-bold shadow-sm active:bg-[#DCB35C] active:text-[#0E1624] active:scale-95 transition-all select-none"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}

          {/* Bottom Action Row (Space, Backspace, Enter) */}
          <div className="flex justify-center gap-2 mt-1">
            <button
              onClick={handleBksp}
              className="flex items-center justify-center gap-1 px-4 h-12 md:h-14 bg-[#2D1B1E] text-[#FF8577] border border-[#FF8577]/40 rounded-lg font-mono text-sm font-bold min-w-[100px] active:bg-[#FF8577] active:text-[#0E1624] transition-all"
            >
              <Delete className="w-5 h-5" />
              <span>DEL</span>
            </button>

            <button
              onClick={() => handleKey(' ')}
              className="flex-1 max-w-[360px] h-12 md:h-14 bg-[#1A2B45] hover:bg-[#223C63] text-white border border-[#DCB35C]/40 rounded-lg flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest active:bg-[#DCB35C] active:text-[#0E1624] transition-all"
            >
              <Space className="w-4 h-4" />
              <span>SPACE</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onEnter();
              }}
              className="flex items-center justify-center gap-1 px-5 h-12 md:h-14 bg-[#DCB35C] text-[#0E1624] rounded-lg font-mono text-sm font-bold min-w-[120px] shadow-lg active:scale-95 transition-all"
            >
              <span>ENTER</span>
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
