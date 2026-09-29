import React from 'react';
import { ShieldCheck, Tag } from 'lucide-react';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'verified' | 'category' | 'selvedge' | 'brass';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'secondary',
  children,
  className = '',
}) => {
  if (variant === 'verified') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
        {children}
      </span>
    );
  }

  if (variant === 'primary' || variant === 'brass') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-[#DCB35C]/15 text-[#DCB35C] border border-[#DCB35C]/30 ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'selvedge') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wider bg-white/[0.06] text-slate-300 border border-slate-700/60 ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono text-slate-300 bg-[#1E293B] border border-slate-700/60 ${className}`}>
      <Tag className="w-3 h-3 mr-1 text-[#DCB35C]" />
      {children}
    </span>
  );
};
