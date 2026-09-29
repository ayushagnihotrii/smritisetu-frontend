import React from 'react';
import { ShieldCheck, Tag, FileText } from 'lucide-react';

export interface BadgeProps {
  variant?: 'selvedge' | 'brass' | 'verified' | 'category';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'selvedge',
  children,
  className = '',
}) => {
  if (variant === 'selvedge') {
    return (
      <span className={`selvedge-tape ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'brass') {
    return (
      <span className={`brass-stamp ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'verified') {
    return (
      <span className={`brass-stamp text-[#f0c36d] bg-[#f0c36d]/10 border border-[#f0c36d]/30 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#f0c36d]" />
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#1A2B45] text-[#B8C8DF] border border-[#DCB35C]/20 ${className}`}>
      <Tag className="w-3 h-3 mr-1 text-[#DCB35C]" />
      {children}
    </span>
  );
};
