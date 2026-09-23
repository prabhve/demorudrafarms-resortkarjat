import React, { useState } from 'react';
import { useResortData } from '../context/ResortDataContext';
import {
  Star,
  ShieldCheck,
  Sparkles,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  MessageSquarePlus
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviewsData, resortMeta } = useResortData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = [
    { id: 'all', label: `All Reviews (${reviewsData.length})` },
    { id: 'villa', label: '🏡 Villa Buyouts' },
    { id: 'family', label: '👨‍👩‍👧‍👦 Family Reunions' },
    { id: 'corporate', label: '💼 Corporate Offsites' },
    { id: 'pets', label: '🐾 Pet-Friendly' },
    { id: 'celebration', label: '🎉 Celebrations & Events' }
  ];

  const filteredReviews = reviewsData.filter((item) => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Rating filter
    if (ratingFilter !== 'all' && item.rating !== ratingFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAuthor = item.author.toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      const matchComment = item.comment.toLowerCase().includes(q);
      const matchStay = item.stayType.toLowerCase().includes(q);
      const matchTags = item.highlightTags?.some((t) => t.toLowerCase().includes(q));
      return matchAuthor || matchCity || matchComment || matchStay || matchTags;
    }

    return true;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const avatarGradients = [
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-rose-500 to-red-600',
    'from-cyan-500 to-blue-600'
  ];

  return (
    <section id="reviews" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Experiences · Real Guest Feedback</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Guest Testimonials & Reviews
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Read systematically curated authentic experiences from families, celebration hosts, pet parents, and corporate teams after their stay at Rudra Farms Karjat.
          </p>
        </div>

        {/* Rating Score Summary Strip & Quality Benchmarks */}
        <div className="p-6 sm:p-8 rounded-3xl border border-stone-200 mb-10 bg-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Main Score */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="text-5xl sm:text-6xl font-bold font-mono text-amber-600 tabular-nums">
              {resortMeta.stats.rating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">
                Outstanding Guest Satisfaction
              </div>
              <div className="text-xs text-stone-500 font-medium">
                Based on {resortMeta.stats.reviewsCount} Google & direct traveler reviews
              </div>
            </div>
          </div>

          {/* Sub-ratings with visual progress indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-xs flex-1">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-stone-600 font-semibold">
                <span>Hospitality & Staff</span>
                <span className="font-bold text-stone-900">4.9</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[98%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-stone-600 font-semibold">
                <span>Pool & Cleanliness</span>
                <span className="font-bold text-stone-900">4.8</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-stone-600 font-semibold">
                <span>Chulha Food Taste</span>
                <span className="font-bold text-stone-900">4.9</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[98%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-stone-600 font-semibold">
                <span>Privacy & Grounds</span>
                <span className="font-bold text-stone-900">5.0</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[100%]" />
              </div>
            </div>
          </div>

          {/* Write / Verify Google Review CTA */}
          <div className="shrink-0 flex items-center">
            <a
              href="https://maps.google.com/?q=Rudra+Farms+and+Resort+Karjat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:border-amber-400 bg-stone-50 hover:bg-white text-stone-800 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-600" />
              <span>Review on Google</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Systematic Management Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white shadow-md mb-8 space-y-4">
          {/* Scrollable Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Star Rating Quick Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-stone-100">
            {/* Rating Stars Filter */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-stone-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Rating:
              </span>
              <button
                type="button"
                onClick={() => setRatingFilter('all')}
                className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                  ratingFilter === 'all'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                All Ratings
              </button>
              <button
                type="button"
                onClick={() => setRatingFilter(5)}
                className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1 cursor-pointer ${
                  ratingFilter === 5
                    ? 'bg-amber-400 text-stone-950 border-amber-500 font-bold'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                5 Stars Only
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews by topic, pool, chulha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <Users className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="text-sm font-bold text-stone-700">No reviews found matching your search.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setRatingFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-700 font-bold underline cursor-pointer"
            >
              Reset filters & show all reviews
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((item, idx) => {
              const gradient = avatarGradients[idx % avatarGradients.length];

              return (
                <div
                  key={item.id}
                  className="group p-6 sm:p-7 rounded-3xl border border-stone-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
                >
                  <div className="space-y-3.5">
                    {/* Review Header: User Avatar + Name + Rating + Date */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar Initials with Gradient */}
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0`}
                        >
                          {getInitials(item.author)}
                        </div>

                        <div>
                          <div className="font-brand font-bold text-stone-900 text-base leading-snug">
                            {item.author}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            <span>{item.city}</span>
                            {item.groupSize && (
                              <>
                                <span className="text-stone-300">·</span>
                                <span className="text-stone-600">{item.groupSize}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Stars and Date Row */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {item.date}
                      </span>
                    </div>

                    {/* Review Body Text */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                      "{item.comment}"
                    </p>

                    {/* Highlight Tags */}
                    {item.highlightTags && item.highlightTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.highlightTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-amber-600" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Stay Type */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px]">Accommodated In:</span>
                    <span className="font-bold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-lg text-[11px]">
                      {item.stayType}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
