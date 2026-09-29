import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'elevated' | 'interactive' | 'stitched' | 'riveted' | 'leather' | 'parchment';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-[#1E293B]/80 border border-slate-700/60 rounded-xl p-6 transition-all duration-200';
  
  let variantClasses = '';
  if (variant === 'elevated' || variant === 'riveted') {
    variantClasses = 'shadow-xl hover:shadow-2xl hover:border-slate-600/80';
  } else if (variant === 'interactive') {
    variantClasses = 'hover:border-[#DCB35C]/60 hover:bg-[#1E293B] cursor-pointer shadow-md hover:shadow-xl';
  } else if (variant === 'subtle') {
    variantClasses = 'bg-[#131F33]/60 border-slate-800';
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
