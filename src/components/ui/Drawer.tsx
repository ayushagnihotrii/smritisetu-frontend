import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-xl',
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[350] flex justify-end bg-[#0A0F1D]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full ${width} h-full bg-[#1E293B] border-l border-slate-700/80 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700/60 flex items-center justify-between bg-[#152033]">
          <div>
            <span className="text-[11px] font-mono text-[#DCB35C] uppercase tracking-wider mb-1 inline-block">
              Source Provenance
            </span>
            <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
            {subtitle && <p className="font-mono text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
};
