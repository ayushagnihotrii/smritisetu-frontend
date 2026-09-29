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
      className="fixed inset-0 z-[350] flex justify-end bg-[#0E1624]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full ${width} h-full bg-[#1A2B45] border-l-2 border-dashed border-[#DCB35C] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#DCB35C]/20 flex items-center justify-between bg-[#121E33]">
          <div>
            <span className="selvedge-tape text-[10px] mb-1.5 inline-block">SOURCE PROVENANCE</span>
            <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
            {subtitle && <p className="font-mono text-xs text-[#f0c36d] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#B8C8DF] hover:text-[#DCB35C] rounded-lg transition-colors focus:outline-none"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
