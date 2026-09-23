import React, { useState } from 'react';
import { RoomOption } from '../types';
import { useResortData } from '../context/ResortDataContext';
import { ParallaxImage } from './ParallaxImage';
import { Users, BedDouble, Bath, Check, ArrowRight, MessageCircle, X, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

interface StayShowcaseProps {
  onSelectForQuote: (roomId: string) => void;
}

export const StayShowcase: React.FC<StayShowcaseProps> = ({
  onSelectForQuote
}) => {
  const { roomsData, resortMeta } = useResortData();
  const [filter, setFilter] = useState<'all' | 'villa' | 'cottage' | 'suite' | 'dorm'>('all');
  const [activeModalRoom, setActiveModalRoom] = useState<RoomOption | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const filteredRooms = filter === 'all'
    ? roomsData
    : roomsData.filter((r) => r.category === filter);

  const getWhatsAppUrlForRoom = (room: RoomOption) => {
    const msg = `Hello Rudra Farms & Resort! I am interested in booking "${room.id}". Could you please share available dates and seasonal offers?`;
    return `https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="accommodations" className="py-20 sm:py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accommodations · Farmhouse & Cottages</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Curated Living Quarters
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Whether booking the entire 4-acre estate for an exclusive private celebration or reserving a serene cottage by the pool.
          </p>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border mb-10 w-fit max-w-full overflow-x-auto bg-stone-100 border-stone-200">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
            }`}
          >
            All Stays
          </button>
          <button
            type="button"
            onClick={() => setFilter('villa')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'villa'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
            }`}
          >
            4BHK Luxury Villa
          </button>
          <button
            type="button"
            onClick={() => setFilter('cottage')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'cottage'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
            }`}
          >
            Deluxe Cottages
          </button>
          <button
            type="button"
            onClick={() => setFilter('suite')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'suite'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
            }`}
          >
            Family Suites
          </button>
          <button
            type="button"
            onClick={() => setFilter('dorm')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'dorm'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
            }`}
          >
            Group Dormitory
          </button>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredRooms.map((room) => {
            const title = room.category === 'villa'
              ? '4BHK Royal Pool Villa (Exclusive Buyout)'
              : room.category === 'cottage'
              ? 'Deluxe Poolside Cottage'
              : room.category === 'suite'
              ? 'Executive Sahyadri Family Suite'
              : 'Grand Celebration Group Dormitory';

            const tag = room.category === 'villa'
              ? 'Complete Sole Privacy · 4 AC Bedrooms & Hall'
              : room.category === 'cottage'
              ? 'Teak Wood Accents · Private Veranda Deck'
              : room.category === 'suite'
              ? 'Spacious 2 Queen Beds · Mountain Vista'
              : 'Ideal for Large Groups, Friends & Offsites';

            const desc = room.category === 'villa'
              ? 'Enjoy complete privacy with our entire 4BHK private pool villa. Includes 4 spacious king bedrooms with ensuite bathrooms, large indoor salon, private pool patio, and personal chulha chef.'
              : room.category === 'cottage'
              ? 'Charming self-contained cottage right next to the crystal swimming pool. Features high timber ceilings, king-size bed, ensuite bathroom, and direct access to green lawns.'
              : room.category === 'suite'
              ? 'Thoughtfully designed for families with children. Boasts two comfortable double beds, garden sit-out patio, modern bathroom fixtures, and panoramic Sahyadri views.'
              : 'Spacious dormitory equipped with individual luxury bunk beds, multiple attached bathrooms, air-conditioning, and ample space for celebrations and corporate teams.';

            return (
              <div
                key={room.id}
                className="rounded-2xl border border-stone-200 bg-white shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Container with Parallax Effect */}
                <ParallaxImage
                  src={room.gallery[0]}
                  alt={title}
                  containerClassName="aspect-[16/10] bg-stone-900"
                  speed={22}
                  scale={1.12}
                >
                  {/* Scrim gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none" />

                  {/* Top Bar inside card - category tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs font-bold tracking-wider uppercase text-amber-300 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-400/30">
                      {room.category === 'villa' ? 'Whole Private Villa' : room.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-white">
                    <div>
                      <div className="text-xs text-amber-300 font-bold">{tag}</div>
                      <div className="text-sm font-semibold text-stone-100">View: {room.view}</div>
                    </div>
                  </div>
                </ParallaxImage>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-brand text-2xl font-bold text-stone-900 leading-tight">
                        {title}
                      </h3>
                      {/* Price per night */}
                      <div className="text-right shrink-0">
                        <div className="text-xs text-stone-500 font-semibold">Starting from</div>
                        <div className="text-xl font-bold text-stone-950 font-mono tabular-nums">
                          ₹{room.basePriceWeekday.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-stone-600 font-sans ml-1">
                            / night
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                      {desc}
                    </p>

                    {/* Metadata Specs */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-stone-700 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>{room.capacity.min}–{room.capacity.max} Guests</span>
                      </div>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-amber-600" />
                        <span>{room.capacity.bedrooms} Bed</span>
                      </div>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-amber-600" />
                        <span>{room.capacity.bathrooms} Baths</span>
                      </div>
                    </div>

                    {/* Key features bullets */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-stone-800 font-medium">
                      {room.keyFeatures.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalRoom(room);
                        setModalImageIndex(0);
                      }}
                      className="text-xs font-bold text-stone-800 hover:text-amber-600 transition-colors flex items-center gap-1 py-1 cursor-pointer"
                    >
                      <span>View Gallery & Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectForQuote(room.id)}
                        className="px-3.5 py-2 text-xs font-bold tracking-wider uppercase rounded-lg text-stone-900 border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        Check Rates
                      </button>

                      <a
                        href={getWhatsAppUrlForRoom(room)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Host</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Details Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-stone-200 bg-white text-stone-900 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalRoom(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Gallery Carousel */}
            <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
              <img
                src={activeModalRoom.gallery[modalImageIndex] || activeModalRoom.gallery[0]}
                alt={activeModalRoom.id}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Prev / Next Buttons */}
              {activeModalRoom.gallery.length > 1 && (
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={() =>
                      setModalImageIndex((prev) =>
                        prev === 0 ? activeModalRoom.gallery.length - 1 : prev - 1
                      )
                    }
                    className="p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-900 transition-colors pointer-events-auto cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setModalImageIndex((prev) =>
                        (prev + 1) % activeModalRoom.gallery.length
                      )
                    }
                    className="p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-900 transition-colors pointer-events-auto cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Counter Pill */}
              <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded bg-stone-950/80 text-white text-xs font-mono font-medium">
                {modalImageIndex + 1} / {activeModalRoom.gallery.length}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-brand text-2xl sm:text-3xl font-bold text-stone-900">
                    {activeModalRoom.category === 'villa'
                      ? '4BHK Royal Pool Villa'
                      : activeModalRoom.category === 'cottage'
                      ? 'Deluxe Poolside Cottage'
                      : activeModalRoom.category === 'suite'
                      ? 'Executive Sahyadri Family Suite'
                      : 'Grand Celebration Group Dormitory'}
                  </h3>
                  <div className="text-xs text-amber-700 font-bold uppercase tracking-wider mt-1">
                    {activeModalRoom.category.toUpperCase()} · {activeModalRoom.view}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500 font-semibold">Weekday / Weekend</div>
                  <div className="text-2xl font-bold text-stone-950 font-mono">
                    ₹{activeModalRoom.basePriceWeekday.toLocaleString('en-IN')}{' '}
                    <span className="text-sm font-normal text-stone-500">
                      / ₹{activeModalRoom.basePriceWeekend.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div>
                  <div className="text-stone-500 font-semibold">Capacity</div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {activeModalRoom.capacity.min}–{activeModalRoom.capacity.max} Guests
                  </div>
                </div>
                <div>
                  <div className="text-stone-500 font-semibold">Bedrooms</div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {activeModalRoom.capacity.bedrooms} Bed
                  </div>
                </div>
                <div>
                  <div className="text-stone-500 font-semibold">Bathrooms</div>
                  <div className="font-bold text-stone-900 mt-0.5">
                    {activeModalRoom.capacity.bathrooms} Ensuite
                  </div>
                </div>
                <div>
                  <div className="text-stone-500 font-semibold">Bedding Setup</div>
                  <div className="font-bold text-stone-900 mt-0.5 truncate">
                    {activeModalRoom.bedType}
                  </div>
                </div>
              </div>

              {/* All Amenities Checkpoints */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                  Included Amenities & Privileges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {activeModalRoom.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveModalRoom(null)}
                  className="px-4 py-2.5 text-xs font-bold text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectForQuote(activeModalRoom.id);
                      setActiveModalRoom(null);
                    }}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow cursor-pointer"
                  >
                    Estimate Rates
                  </button>

                  <a
                    href={getWhatsAppUrlForRoom(activeModalRoom)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
