import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { STORY_DATA } from '../data/resortData';
import { Sparkles, CheckCircle2, ShieldCheck, MapPin, Trees } from 'lucide-react';

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll controls for the dual-image composition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Primary image subtle vertical drift
  const primaryImgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  // Secondary overlay card counter-drift
  const secondaryCardY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  // Subtle badge float
  const badgeY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left 6 Columns: Story Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{STORY_DATA.badge}</span>
            </div>

            <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 leading-[1.15]">
              {STORY_DATA.heading}
            </h2>

            <p className="text-base sm:text-lg font-semibold text-stone-800 leading-relaxed">
              {STORY_DATA.subheading}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
              {STORY_DATA.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sole Exclusive Villa Buyouts</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>40-Ft Swimming Pool & Rain Dance</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authentic Maharashtrian Chulha</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Pet-Friendly 4-Acre Grounds</span>
              </div>
            </div>

            {/* Location verified note */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 pt-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Vinegaon, Karjat Chowk · 90 mins from Mumbai & Pune</span>
            </div>
          </div>

          {/* Right 6 Columns: Layered Parallax Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Parallax Frame: 4-Acre Villa & Pool */}
              <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-900 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                <motion.div
                  style={{ y: primaryImgY, scale: 1.15 }}
                  className="w-full h-full will-change-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85"
                    alt="Rudra Farms Karjat Villa and Sparkling Swimming Pool"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Subtle scrim gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20 pointer-events-none" />

                {/* Primary Card Caption */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 text-white flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                      The Sanctuary
                    </div>
                    <div className="text-sm sm:text-base font-brand font-bold text-white">
                      40-Ft Pool & Private Villa Grounds
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-stone-900/80 backdrop-blur-md border border-white/20 text-emerald-400">
                    4-Acre Gated
                  </span>
                </div>
              </div>

              {/* Secondary Overlapping Parallax Card: Chulha Feasts & Bonfire */}
              <motion.div
                style={{ y: secondaryCardY }}
                className="absolute -bottom-6 left-2 sm:-bottom-8 sm:-left-6 w-48 sm:w-64 rounded-2xl overflow-hidden border-2 border-white bg-stone-900 shadow-2xl will-change-transform z-20"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=85"
                    alt="Live Bonfire & BBQ at Rudra Farms"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                      Night Ambiance
                    </div>
                    <div className="text-xs font-bold font-brand text-white truncate">
                      Bonfire & Starlit BBQ
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Brass Stamp / Badge */}
              <motion.div
                style={{ y: badgeY }}
                className="absolute top-2 right-2 sm:-top-5 sm:-right-5 z-20 bg-amber-400 text-stone-950 p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-amber-300 flex items-center gap-2 sm:gap-2.5 will-change-transform"
              >
                <div className="p-1.5 sm:p-2 rounded-xl bg-stone-950 text-amber-400">
                  <Trees className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-[11px] sm:text-xs font-mono uppercase tracking-wider leading-none">
                    4+ ACRES
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-stone-900 font-semibold mt-0.5">
                    Sahyadri Foothills
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Estate Dimensions & Stat Grid Strip */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl border border-stone-200 bg-white shadow-xl">
            {STORY_DATA.stats.map((st, i) => (
              <div key={i} className="space-y-1 sm:space-y-1.5 pl-2 border-l-2 border-amber-400">
                <div className="text-2xl sm:text-4xl font-bold font-mono text-amber-600 tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-800">
                  {st.label}
                </div>
                <div className="text-[11px] text-stone-500">
                  {i === 0
                    ? 'Manicured green expanse'
                    : i === 1
                    ? 'With rain dance setup'
                    : i === 2
                    ? 'Runs all ACs & appliances'
                    : 'Verified traveler reviews'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
