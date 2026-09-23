import React, { useState } from 'react';
import { useResortData } from '../context/ResortDataContext';
import { ParallaxImage } from './ParallaxImage';
import { Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { galleryItems } = useResortData();
  const [filter, setFilter] = useState<'all' | 'pool' | 'stays' | 'dining' | 'outdoors'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const prevPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Tour · Estate Vignettes</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Moments at Rudra Farms
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Explore our azure swimming pool, luxury villa suites, lush 4-acre party lawns, and rustic chulha dining in Karjat.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {(['all', 'pool', 'stays', 'dining', 'outdoors'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'all'
                ? 'All Photos'
                : cat === 'pool'
                ? 'Pool & Water'
                : cat === 'stays'
                ? 'Villas & Rooms'
                : cat === 'dining'
                ? 'Chulha & BBQ'
                : 'Lawns & Sunset'}
            </button>
          ))}
        </div>

        {/* Photo Grid with subtle Parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-stone-200 bg-stone-100 shadow-md hover:shadow-xl transition-all"
            >
              <ParallaxImage
                src={item.image}
                alt={item.title}
                containerClassName="aspect-[4/3] w-full"
                speed={idx % 2 === 0 ? 18 : 28}
                scale={1.12}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white z-10 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm leading-tight text-white">{item.title}</div>
                      <div className="text-xs text-amber-300 mt-0.5">{item.caption}</div>
                    </div>
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={prevPhoto}
            aria-label="Previous Photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextPhoto}
            aria-label="Next Photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center text-white mt-4 space-y-1">
              <h3 className="font-brand text-lg font-bold">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-300">
                {filteredItems[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
