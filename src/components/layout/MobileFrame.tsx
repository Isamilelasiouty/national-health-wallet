import React from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { Smartphone, RotateCcw, Wifi, Battery, Signal, X } from 'lucide-react';

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobileSimulation, toggleMobileSimulation } = useHealthWallet();

  if (!isMobileSimulation) {
    return (
      <>
        {children}
        {/* Floating Quick Button for Mobile Experience */}
        <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
          <button
            onClick={toggleMobileSimulation}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#1B6B46] hover:bg-[#155336] text-white rounded-2xl shadow-xl border border-[#2D8259] text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
            title="تجربة عرض المنظومة كأنها تطبيق موبايل حقيقي داخل إطار هاتف ذكي"
          >
            <Smartphone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>تجربة تطبيق الموبايل</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-sm">390×820</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0E1712]/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Simulation Header Controls */}
      <div className="w-full max-w-[440px] flex items-center justify-between pb-3 text-white text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold">محاكي الهاتف الذكي (390 × 820)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMobileSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>عرض المتصفح الكامل</span>
          </button>
          <button
            onClick={toggleMobileSimulation}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-white"
            aria-label="إغلاق المحاكي"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Realistic Smartphone Shell (390px x 820px screen) */}
      <div className="relative w-[406px] h-[836px] bg-[#1E2420] rounded-[52px] p-2 shadow-2xl border-4 border-[#3A453E] ring-1 ring-black/40 flex flex-col shrink-0">
        {/* Outer Phone Buttons Accent */}
        <div className="absolute -left-1.5 top-24 w-1.5 h-10 bg-[#3A453E] rounded-l-md" />
        <div className="absolute -left-1.5 top-38 w-1.5 h-12 bg-[#3A453E] rounded-l-md" />
        <div className="absolute -left-1.5 top-53 w-1.5 h-12 bg-[#3A453E] rounded-l-md" />
        <div className="absolute -right-1.5 top-32 w-1.5 h-16 bg-[#3A453E] rounded-r-md" />

        {/* Screen Bezel & Dynamic Island Container */}
        <div className="relative w-[390px] h-[820px] bg-[#F5F9F6] dark:bg-[#0A150F] rounded-[44px] overflow-hidden flex flex-col border border-black/20">
          {/* Status Bar */}
          <div className="relative z-50 h-11 bg-white/80 dark:bg-[#12241A]/80 backdrop-blur-md px-6 flex items-center justify-between text-xs font-semibold select-none border-b border-black/5 dark:border-white/5">
            <span className="font-mono text-xs text-gray-800 dark:text-gray-200">09:41</span>

            {/* Dynamic Island / Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-gray-700" />
            </div>

            <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Interactive Screen Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative [container-type:inline-size]">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-5 bg-white/80 dark:bg-[#12241A]/80 backdrop-blur-md flex items-center justify-center shrink-0 border-t border-black/5 dark:border-white/5">
            <div className="w-32 h-1 bg-black/40 dark:bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
