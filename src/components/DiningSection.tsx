import React, { useState } from 'react';
import { useResortData } from '../context/ResortDataContext';
import { ParallaxImage } from './ParallaxImage';
import {
  Utensils,
  Check,
  MessageCircle,
  Sparkles,
  Flame,
  Coffee,
  Star,
  Search,
  Filter,
  FlameKindling,
  GlassWater
} from 'lucide-react';

export const DiningSection: React.FC = () => {
  const { menuItems, resortMeta } = useResortData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'nonveg', label: '🍗 Gavran Non-Veg' },
    { id: 'veg', label: '🌿 Authentic Veg' },
    { id: 'bbq', label: '🔥 Live Barbecue' },
    { id: 'breakfast', label: '☕ Farm Breakfast' },
    { id: 'dessert-beverage', label: '🍹 Coolers & Sweets' }
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    // Dietary filter
    if (dietFilter === 'veg' && !item.isVeg) return false;
    if (dietFilter === 'nonveg' && item.isVeg) return false;
    if (dietFilter === 'special' && !item.isChefSpecial) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      return matchName || matchDesc;
    }

    return true;
  });

  return (
    <section id="dining" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cuisine & Farm-To-Table Feasts</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Authentic Chulha Dining & Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Relish rustic farm flavors cooked over wood-fired clay chulha stoves alongside sizzling live barbecue grills under starry Sahyadri skies.
          </p>

          {/* Dietary tags banner */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-stone-700">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              100% Pure Veg Kitchen Available
            </span>
            <span className="flex items-center gap-1.5 bg-red-50 text-red-800 px-2.5 py-1 rounded-full border border-red-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              Authentic Gavran Non-Veg Feasts
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Jain Meals on Advance Request
            </span>
          </div>
        </div>

        {/* Parallax Visual Culinary Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Chulha Experience */}
          <div className="rounded-3xl overflow-hidden border border-stone-200 bg-stone-900 shadow-xl relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
              alt="Authentic Maharashtrian Chulha Cooking at Rudra Farms"
              containerClassName="aspect-[16/10] sm:aspect-[16/9]"
              speed={24}
              scale={1.14}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Wood-Fired Hearth</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
                <div className="font-brand text-xl font-bold text-white drop-shadow">
                  Traditional Clay Chulha Preparation
                </div>
                <p className="text-xs text-stone-200 font-light max-w-md">
                  Slow-cooked Gavran chicken curry, pitla, and hand-tossed jowar-bajra bhakris prepared over fragrant firewood by local village culinary masters.
                </p>
              </div>
            </ParallaxImage>
          </div>

          {/* Barbecue & Starlit Dining */}
          <div className="rounded-3xl overflow-hidden border border-stone-200 bg-stone-900 shadow-xl relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
              alt="Live Barbecue and Starlit Dinners at Rudra Farms Karjat"
              containerClassName="aspect-[16/10] sm:aspect-[16/9]"
              speed={30}
              scale={1.14}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Evening Ambiance</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
                <div className="font-brand text-xl font-bold text-white drop-shadow">
                  Live Barbecue & Starlit Lawn Dining
                </div>
                <p className="text-xs text-stone-200 font-light max-w-md">
                  Charcoal-grilled paneer tikkas, spiced chicken skewers, and soothing evening hot tea served under open Sahyadri skies with music.
                </p>
              </div>
            </ParallaxImage>
          </div>
        </div>

        {/* Interactive Menu System Container */}
        <div className="rounded-3xl border border-stone-200 bg-white shadow-xl overflow-hidden mb-12">
          {/* Menu Top Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white border-b border-stone-700/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Utensils className="w-4 h-4" />
                <span>A-La-Carte Farm Menu & Rates</span>
              </div>
              <h3 className="font-brand text-2xl sm:text-3xl font-bold text-white">
                Farm Kitchen Fresh Offerings
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                Freshly prepared on order using native spices, cold-pressed oils, and farm vegetables.
              </p>
            </div>

            {/* Quick WhatsApp Order Enquiry */}
            <a
              href={`https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent('Hello Rudra Farms Kitchen! I would like to enquire about your dining menu and customized meal options.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center gap-2 w-fit shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-stone-950" />
              <span>Order / Enquire Menu</span>
            </a>
          </div>

          {/* Category Tabs & Filter Controls */}
          <div className="p-6 sm:p-8 border-b border-stone-100 bg-[#fdfcfa] space-y-4">
            {/* Scrollable Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md scale-102'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Dietary & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              {/* Dietary Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-stone-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter:
                </span>
                <button
                  type="button"
                  onClick={() => setDietFilter('all')}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    dietFilter === 'all'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  All ({menuItems.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDietFilter('veg')}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    dietFilter === 'veg'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-emerald-800 border-stone-200 hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Pure Veg
                </button>
                <button
                  type="button"
                  onClick={() => setDietFilter('nonveg')}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    dietFilter === 'nonveg'
                      ? 'bg-red-700 text-white border-red-700 shadow-sm'
                      : 'bg-white text-red-800 border-stone-200 hover:bg-red-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Non-Veg
                </button>
                <button
                  type="button"
                  onClick={() => setDietFilter('special')}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    dietFilter === 'special'
                      ? 'bg-amber-400 text-stone-950 border-amber-500 font-bold shadow-sm'
                      : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                  ★ Chef's Special / Bestsellers
                </button>
              </div>

              {/* Search Box */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chicken, bhakri, misal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-stone-200 text-xs bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="p-6 sm:p-8">
            {filteredMenuItems.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <Utensils className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-semibold">No dishes match your selected filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setDietFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-amber-700 font-bold underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item) => {
                  const isSpecial = item.isChefSpecial;

                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        isSpecial
                          ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white shadow-lg hover:shadow-2xl hover:-translate-y-1 ring-2 ring-amber-400/20'
                          : 'border border-stone-200 bg-white hover:border-stone-300 shadow-md hover:shadow-xl hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Top Badges & Food Indicator */}
                      <div>
                        <div className="flex items-center justify-between mb-3 gap-2">
                          {/* Recommended/Bestseller Special Badge */}
                          {isSpecial ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-sm border border-amber-300">
                              <Star className="w-3 h-3 fill-stone-950 text-stone-950" />
                              <span>{item.badge || "CHEF'S SPECIAL"}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded">
                              {item.category === 'nonveg'
                                ? 'Non-Veg Gravy'
                                : item.category === 'veg'
                                ? 'Pure Veg'
                                : item.category === 'bbq'
                                ? 'Barbecue'
                                : item.category === 'breakfast'
                                ? 'Breakfast'
                                : 'Beverage'}
                            </span>
                          )}

                          {/* Indian Food Veg / Non-Veg Icon */}
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                              item.isVeg ? 'border-emerald-600' : 'border-red-600'
                            }`}
                            title={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Dish Name & Price Header */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-brand text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                            {item.name}
                          </h4>
                          <div className="text-right shrink-0">
                            <div className="text-lg sm:text-xl font-mono font-bold text-amber-700">
                              ₹{item.price}
                            </div>
                            <div className="text-[10px] font-medium text-stone-500">
                              {item.portion}
                            </div>
                          </div>
                        </div>

                        {/* Dish Description */}
                        <p className="text-xs text-stone-600 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Bottom: Portion note + WhatsApp Quick Add / Enquire */}
                      <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-stone-500 font-medium">
                          Fresh Chulha Prep
                        </span>

                        <a
                          href={`https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent(
                            `Hello Rudra Farms! I would like to order/enquire about ${item.name} (₹${item.price} - ${item.portion}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            isSpecial
                              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-sm'
                              : 'bg-stone-100 hover:bg-amber-100 text-stone-800'
                          }`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-stone-900" />
                          <span>Order Dish</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Meal Package Comparison Cards */}
        <div className="p-6 sm:p-8 rounded-3xl border border-stone-200 bg-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-1">
                <Utensils className="w-3.5 h-3.5" />
                <span>All-Inclusive Food Plans</span>
              </div>
              <h3 className="font-brand text-2xl font-bold text-stone-900">
                Curated Farm Meal Packages
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Choose the dining plan that fits your vacation rhythm.
              </p>
            </div>

            <a
              href={`https://wa.me/${resortMeta.whatsapp}?text=${encodeURIComponent('Hello Rudra Farms, could you please share the current dining menu & per-person food package rates?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-xl text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-2 w-fit shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Request Full Menu PDF</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1: Room Only */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-md transition-all">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Flexible Option</div>
              <div className="font-brand text-xl font-bold text-stone-900 mb-2">Room Only (EP)</div>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Order a la carte as you please from our farm kitchen during your stay.
              </p>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Stay only included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>A-la-carte snacks & meals billed as ordered</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tea/Coffee service on demand</span>
                </li>
              </ul>
            </div>

            {/* Plan 2: Bed & Breakfast */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-md transition-all">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Morning Kickstart</div>
              <div className="font-brand text-xl font-bold text-stone-900 mb-2">Bed & Breakfast (CP)</div>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Hearty Maharashtrian breakfast buffet with freshly brewed tea & coffee.
              </p>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full breakfast spread included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Poha, Misal Pav, Upma, Eggs & Chai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lunch & dinner a-la-carte</span>
                </li>
              </ul>
            </div>

            {/* Plan 3: All-Inclusive Feast */}
            <div className="p-6 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-orange-50/30 to-white shadow-md relative">
              <div className="absolute -top-3 right-6 bg-amber-400 text-stone-950 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow">
                ★ Recommended for Groups
              </div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Most Popular</div>
              <div className="font-brand text-xl font-bold text-stone-900 mb-2">Full Farm Feast (AP)</div>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                All 4 meals: Lunch, Hi-Tea, Dinner with Live BBQ, and Next-day Breakfast.
              </p>
              <ul className="text-xs text-stone-800 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Welcome drink & authentic farm lunch</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Evening high tea with hot pakoras & chai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Evening BBQ starters & grand chulha dinner</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Traditional next-day breakfast spread</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
