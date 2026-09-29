import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0E1624]/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-[#1A2B45] border-2 border-dashed border-[#f0c36d] rounded-lg shadow-2xl p-6 md:p-8 card-riveted`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="copper-rivet corner-rivet top-left" />
        <span className="copper-rivet corner-rivet top-right" />
        <span className="copper-rivet corner-rivet bottom-left" />
        <span className="copper-rivet corner-rivet bottom-right" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#B8C8DF] hover:text-[#DCB35C] rounded-md transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <h3 className="font-serif text-xl font-bold text-white mb-4 pr-8 border-b border-[#DCB35C]/20 pb-3">
            {title}
          </h3>
        )}

        <div className="text-[#B8C8DF]">{children}</div>
      </div>
    </div>
  );
};
