import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useResortData } from '../context/ResortDataContext';
import { Calendar, Users, Home, ArrowRight, MessageCircle, Phone, Sparkles, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface HeroProps {
  onSearch: (checkIn: string, checkOut: string, guests: number, roomType: string) => void;
  onExploreClick: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreClick,
  onOpenChat
}) => {
  const { heroSlides, resortMeta } = useResortData();
  const heroRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '40px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [guests, setGuests] = useState(4);
  const [stayType, setStayType] = useState('royal-villa-4bhk');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(checkIn, checkOut, guests, stayType);
  };

  const safeSlideIndex = heroSlides.length > 0 ? currentSlide % heroSlides.length : 0;
  const activeSlideData = heroSlides[safeSlideIndex] || {
    id: 'default',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85',
    tag: 'Exclusive Luxury Buyout',
    title: 'Private 4BHK Villa & Swimming Pool',
    subtitle: 'Surrounded by misty Sahyadri mountain backdrops in Karjat'
  };

  const whatsappQuickUrl = `https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent(
    `Hello Rudra Farms & Resort Karjat! I would like to inquire about booking availability from ${checkIn} to ${checkOut} for ${guests} guests.`
  )}`;

  return (
    <section
      ref={heroRef}
      id="overview"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 overflow-hidden bg-stone-950 text-white"
    >
      {/* Background Slides Carousel with Scroll Parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 h-[125%] -top-[12%] will-change-transform pointer-events-none select-none"
      >
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Cinematic Dual Dark Gradient Overlays for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </motion.div>

      {/* Hero Carousel Navigation Controls (Arrows) */}
      <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-3 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white border border-white/20 transition-all pointer-events-auto hover:scale-110 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-3 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white border border-white/20 transition-all pointer-events-auto hover:scale-110 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Center Content Block with subtle Parallax */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto"
      >
        <div className="max-w-3xl space-y-5 sm:space-y-6 pt-4 sm:pt-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Vinegaon, Karjat Chowk · Maharashtra</span>
          </div>

          {/* Luxury Heading with Distinct Fonts */}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="font-brand text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md">
              RUDRA FARMS
            </h1>
            <p className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-amber-300 font-normal">
              & Resort Karjat
            </p>
          </div>

          {/* Subtitle / Caption */}
          <p className="text-sm sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-light drop-shadow">
            Experience our private 4-acre sanctuary with swimming pool, luxury villa suites, manicured lawns, and authentic Maharashtrian chulha feasts amidst scenic Sahyadri hills.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappQuickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquire</span>
            </a>

            <button
              type="button"
              onClick={onOpenChat}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Concierge</span>
            </button>
          </div>

          {/* Current Slide Caption Indicator */}
          <div className="pt-2 sm:pt-4 flex items-center gap-3 sm:gap-4 text-xs text-stone-300">
            <div className="font-mono text-amber-400 font-bold shrink-0">
              0{currentSlide + 1} / 0{heroSlides.length}
            </div>
            <div className="h-3 w-px bg-white/30 shrink-0" />
            <div className="italic font-medium text-stone-200 truncate text-[11px] sm:text-xs">
              {activeSlideData.subtitle}
            </div>

            {/* Slide Dots Indicator */}
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-6 sm:w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Quick Reservation Strip with High-Contrast Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <form
          onSubmit={handleQuickSubmit}
          className="p-5 sm:p-6 rounded-2xl bg-white backdrop-blur-xl border border-stone-200 text-stone-900 shadow-2xl transition-all"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end">
            {/* Check-In */}
            <div className="space-y-1.5">
              <label htmlFor="quick-checkin" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Check-In Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  id="quick-checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="space-y-1.5">
              <label htmlFor="quick-checkout" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Check-Out Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  id="quick-checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label htmlFor="quick-guests" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Total Guests
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-3 w-4 h-4 text-stone-500 pointer-events-none" />
                <select
                  id="quick-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value={2}>2 Guests (Couple)</option>
                  <option value={4}>4 Guests (Small Family)</option>
                  <option value={8}>8 Guests (Family Group)</option>
                  <option value={12}>12 Guests (Celebration)</option>
                  <option value={16}>16 Guests (Full Villa)</option>
                  <option value={25}>20+ Guests (Corporate / Offsite)</option>
                </select>
              </div>
            </div>

            {/* Stay Type */}
            <div className="space-y-1.5">
              <label htmlFor="quick-staytype" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Accommodation Type
              </label>
              <div className="relative flex items-center">
                <Home className="absolute left-3 w-4 h-4 text-stone-500 pointer-events-none" />
                <select
                  id="quick-staytype"
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="royal-villa-4bhk">4BHK Private Pool Villa</option>
                  <option value="deluxe-cottage">Deluxe Poolside Cottage</option>
                  <option value="family-suite">Executive Family Suite</option>
                  <option value="group-dorm">Group Celebration Dorm</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
