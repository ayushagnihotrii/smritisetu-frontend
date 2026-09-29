import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'stitched' | 'riveted' | 'leather' | 'parchment';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'stitched',
  children,
  className = '',
  ...props
}) => {
  if (variant === 'leather') {
    return (
      <div className={`leather-patch p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }

  const isRiveted = variant === 'riveted';

  return (
    <div
      className={`stitched-card ${isRiveted ? 'card-riveted' : ''} p-6 relative ${className}`}
      {...props}
    >
      {isRiveted && (
        <>
          <span className="copper-rivet corner-rivet top-left" />
          <span className="copper-rivet corner-rivet top-right" />
          <span className="copper-rivet corner-rivet bottom-left" />
          <span className="copper-rivet corner-rivet bottom-right" />
        </>
      )}
      {children}
    </div>
  );
};
