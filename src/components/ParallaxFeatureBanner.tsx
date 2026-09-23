import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useResortData } from '../context/ResortDataContext';
import { MessageCircle, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface ParallaxFeatureBannerProps {
  onCheckTariff?: () => void;
}

export const ParallaxFeatureBanner: React.FC<ParallaxFeatureBannerProps> = ({
  onCheckTariff
}) => {
  const { resortMeta } = useResortData();
  const containerRef = useRef<HTMLElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth cinematic vertical translation for the panoramic background
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
    >
      {/* Background Image Layer with Scroll Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2200&q=85"
          alt="Sahyadri mountain vistas surrounding Rudra Farms Karjat"
          className="w-full h-full object-cover object-center brightness-[0.78]"
        />
      </motion.div>

      {/* Luxury Vignette & Contrast Overlays */}
      <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/70" />
      <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/70" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Sahyadri Foothills · Vinegaon, Karjat</span>
        </div>

        {/* Cinematic Title */}
        <div className="space-y-3">
          <h2 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg">
            Where Sahyadri Whispers and Farm Life Slows Down
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            Misty morning breezes, crystal swimming pool laughter, rustic wood-fired meals, and midnight bonfire stargazing — an exclusive 4-acre sanctuary reserved just for your group.
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-amber-200 pt-2">
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Sole Buyout Available
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            90 Mins from Mumbai & Pune
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Pets Welcome Freely
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          {onCheckTariff && (
            <button
              type="button"
              onClick={onCheckTariff}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate Stay Tariff</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href={`https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent('Hello Rudra Farms & Resort Karjat! I was inspired by your mountain estate and would love to check weekend villa availability.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/40 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
