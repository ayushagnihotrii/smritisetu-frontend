import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'leather' | 'ghost' | 'kiosk-action';
  size?: 'sm' | 'md' | 'lg' | 'kiosk';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#DCB35C] focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    kiosk: 'px-8 py-4 text-lg font-semibold gap-3 min-h-[64px] min-w-[180px]', // Kiosk 64px+ touch target
  };

  const variantStyles = {
    primary: 'bg-[#DCB35C] text-[#0E1624] hover:bg-[#c9a04a] active:translate-y-0.5 shadow-md font-semibold',
    secondary: 'bg-transparent text-white border border-[#DCB35C]/50 hover:bg-[#DCB35C]/15 active:translate-y-0.5',
    leather: 'bg-[#8B4513] text-[#F4EEDC] border border-[#f0c36d]/60 hover:bg-[#783a0e] shadow-lg active:translate-y-0.5',
    ghost: 'bg-transparent text-[#B8C8DF] hover:text-white hover:bg-white/5',
    'kiosk-action': 'bg-[#1E3A8A] text-white border-2 border-[#DCB35C] hover:bg-[#1A2B45] shadow-xl text-lg font-bold',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
