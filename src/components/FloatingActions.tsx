import React, { useState, useEffect } from 'react';
import { useResortData } from '../context/ResortDataContext';
import { Sparkles, ArrowUp, X, Bot } from 'lucide-react';

interface FloatingActionsProps {
  onOpenChat: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenChat }) => {
  const { resortMeta } = useResortData();
  const [showTooltip, setShowTooltip] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <aside aria-label="Quick Contact and Concierge" className="fixed bottom-4 sm:bottom-5 right-3 sm:right-5 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto">
      {/* Floating Welcome Bubble / Proactive Prompt */}
      {showTooltip && (
        <div className="relative mb-1 max-w-[240px] sm:max-w-[260px] p-3 rounded-2xl bg-stone-900/95 backdrop-blur-md text-white border border-stone-700/80 shadow-2xl animate-fade-in text-xs flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 pr-2">
            <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">
              Need Instant Help?
            </div>
            <p className="text-[11px] text-stone-200 mt-0.5 leading-snug">
              Ask our 24/7 AI Concierge or chat directly on WhatsApp!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            title="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Downward triangle pointer */}
          <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-stone-900 border-r border-b border-stone-700/80 rotate-45" />
        </div>
      )}

      {/* Floating Buttons Dock */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Back to Top Smooth Scroll Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2.5 sm:p-3 rounded-full bg-stone-900/90 text-amber-400 border border-amber-500/40 hover:bg-stone-900 hover:text-amber-300 hover:border-amber-400 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer hover:-translate-y-1"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* 1. AI Concierge Floating Button */}
        <button
          type="button"
          onClick={onOpenChat}
          className="group relative flex items-center gap-2 pl-3 pr-3.5 sm:pl-3.5 sm:pr-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/25 border border-amber-300 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Open AI Concierge Assistant"
        >
          {/* Outer Glow Ring on Hover */}
          <div className="absolute -inset-1 rounded-full bg-amber-400/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Sparkle Icon Container */}
          <div className="relative p-1.5 rounded-full bg-stone-950/10 text-stone-950 group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-stone-950/20 text-stone-950" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-700" />
            </span>
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold tracking-tight text-stone-950 text-xs sm:text-sm">
              AI Concierge
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-800/80 hidden sm:inline">
              Instant 24/7
            </span>
          </div>
        </button>

        {/* 2. WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent(
            'Hello Rudra Farms & Resort, I would like to inquire about booking a stay in Karjat.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 pl-3 pr-3.5 sm:pl-3.5 sm:pr-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 border border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-600/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Direct WhatsApp Chat with Resort Manager"
        >
          <div className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="relative p-1.5 rounded-full bg-white/15 text-white group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.82 2.791.82 3.181 0 5.768-2.587 5.768-5.766.001-3.181-2.585-5.766-5.768-5.766zm3.385 8.163c-.145.408-.847.785-1.177.834-.329.05-.688.082-2.18-.535-1.898-.787-3.117-2.73-3.212-2.857-.095-.128-.77-1.025-.77-1.956 0-.93.486-1.385.66-1.576.174-.191.38-.239.507-.239.127 0 .254.001.365.006.118.006.275-.045.43.327.16.386.547 1.336.595 1.433.048.097.08.21.016.337-.064.127-.096.206-.191.318-.095.111-.2.249-.286.334-.095.095-.195.198-.084.388.111.19.493.813 1.057 1.315.727.647 1.339.847 1.53.942.19.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.429-.095.174.064 1.11.524 1.3.619.191.095.318.143.365.222.048.079.048.46-.097.868z" />
            </svg>

            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold tracking-wider text-white text-xs sm:text-sm">
              WhatsApp
            </span>
            <span className="text-[9px] font-semibold text-emerald-100 hidden sm:inline normal-case tracking-normal">
              Online Now
            </span>
          </div>
        </a>
      </div>
    </aside>
  );
};

