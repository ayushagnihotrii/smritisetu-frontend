import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Clock, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const IdleWarningModal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    showIdleModal, 
    setShowIdleModal, 
    idleCountdown, 
    resetSession, 
    setIsIdle 
  } = useAppStore();

  if (!showIdleModal) return null;

  const handleContinue = () => {
    setShowIdleModal(false);
  };

  const handleReset = () => {
    resetSession();
    setIsIdle(true);
    navigate('/kiosk-attract');
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-[#0A111C]/90 backdrop-blur-lg animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-[#1E293B] border border-slate-700/80 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DCB35C]/15 border border-[#DCB35C]/40 flex items-center justify-center">
          <Clock className="w-8 h-8 text-[#DCB35C] animate-pulse" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
          {t('kiosk.idleWarning', 'Are you still there?')}
        </h2>

        <p className="text-sm text-slate-300 mb-6">
          {t('kiosk.idleCountdown', {
            defaultValue: `Session will reset in ${idleCountdown} seconds for the next visitor.`,
            seconds: idleCountdown
          })}
        </p>

        {/* Big Countdown Digits */}
        <div className="font-mono text-5xl font-black text-[#DCB35C] mb-8 tracking-wider">
          00:{String(idleCountdown).padStart(2, '0')}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleContinue}
            variant="primary"
            size="kiosk"
            className="flex-1"
            icon={<CheckCircle2 className="w-5 h-5" />}
          >
            {t('kiosk.continueSession', 'Continue Session')}
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            size="kiosk"
            className="flex-1"
            icon={<RotateCcw className="w-5 h-5" />}
          >
            {t('kiosk.resetNow', 'Reset Now')}
          </Button>
        </div>
      </div>
    </div>
  );
};
