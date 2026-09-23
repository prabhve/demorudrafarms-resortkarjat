import React from 'react';
import { motion } from 'motion/react';
import { useResortData } from '../context/ResortDataContext';
import { Waves, Trees, UtensilsCrossed, Flame, Trophy, Gamepad2, Dog, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export const AmenitiesSection: React.FC = () => {

  const { amenitiesData } = useResortData();
  const getIcon = (name: string) => {
    switch (name) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-amber-600" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-emerald-600" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-700" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-600" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-indigo-600" />;
      case 'Dog':
        return <Dog className="w-5 h-5 text-amber-700" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      default:
        return <Waves className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="amenities" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resort Facilities · Estate Experiences</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Curated Resort Amenities
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Immerse yourself in nature without compromising on modern comfort and luxury hospitality across our 4-acre private estate.
          </p>
        </div>

        {/* Bento-styled Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenitiesData.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 sm:p-7 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-50 group-hover:bg-amber-100/70 border border-amber-200/60 transition-colors">
                      {getIcon(item.iconName)}
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-300/40">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-brand text-lg sm:text-xl font-bold text-stone-900 mb-2 leading-snug group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights Bullet Tags */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-stone-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span className="capitalize text-stone-500 font-medium">{item.category} Feature</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Included in Stay
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
