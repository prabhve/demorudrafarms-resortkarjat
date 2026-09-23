import React, { useState } from 'react';
import { useResortData } from '../context/ResortDataContext';
import { MapPin, Navigation, Compass, ExternalLink, Car, Train, Clock, Sparkles, Route, Eye } from 'lucide-react';

export const AttractionsMap: React.FC = () => {
  const { attractionsData, resortMeta } = useResortData();
  const [activeRouteTab, setActiveRouteTab] = useState<'mumbai' | 'pune' | 'train'>('mumbai');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sights' },
    { id: 'nature', label: '🌿 Lakes & Valleys' },
    { id: 'waterfall', label: '💧 Waterfalls' },
    { id: 'heritage', label: '🏰 Forts & Caves' },
    { id: 'entertainment', label: '🎬 Bollywood Studio' }
  ];

  const filteredAttractions = attractionsData.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const getDirectionsUrl = (destinationQuery: string) => {
    // Navigates directly with origin as Rudra Farms Karjat
    return `https://www.google.com/maps/dir/?api=1&origin=${resortMeta.coordinates.lat},${resortMeta.coordinates.lng}&destination=${encodeURIComponent(
      destinationQuery
    )}`;
  };

  const getPlaceViewUrl = (destinationQuery: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationQuery)}`;
  };

  return (
    <section id="attractions" className="py-20 sm:py-24 border-t border-stone-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Karjat Valley & Landmarks</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Surrounding Attractions & Map
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            Nestled near Vinegaon & Karjat Chowk, Rudra Farms offers easy scenic access to iconic Sahyadri waterfalls, ancient caves, dams, and viewpoints.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Grid with Prominent Navigation CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredAttractions.map((item) => {
            const navUrl = getDirectionsUrl(item.mapDestinationQuery);
            const viewUrl = getPlaceViewUrl(item.mapDestinationQuery);

            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-stone-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                    {/* Distance & Drive Time Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-900/85 backdrop-blur-md text-amber-300 border border-amber-300/30">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {item.distanceKm} km away
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900/80 backdrop-blur-md text-stone-200">
                        <Clock className="w-3 h-3 text-stone-300" />
                        ~{item.driveTimeMin} mins
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 shadow">
                        {item.category}
                      </span>
                    </div>

                    {/* Title inside visual or just below */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-brand text-xl font-bold text-white leading-snug drop-shadow-md">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 text-[11px] font-medium text-amber-800 bg-amber-50/80 border border-amber-200/60 rounded-xl px-3 py-1.5 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer: Prominent Direct Navigation from Resort */}
                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-2">
                    {/* Primary Button: Navigate from Resort */}
                    <a
                      href={navUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                      <span>Navigate from Hotel</span>
                    </a>

                    {/* Secondary Button: View Location */}
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto p-2.5 rounded-xl text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
                      title="View destination on Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="sm:hidden text-xs">View Map</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map & Driving Directions Dual Container */}
        <div className="rounded-3xl border border-stone-200 bg-white shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 5 Columns: Directions & Address Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive Route Guide</span>
                </div>

                <h3 className="font-brand text-2xl font-bold text-stone-900">
                  Finding Rudra Farms
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Located in <strong className="text-stone-900">Vinegaon, Karjat Chowk</strong>, convenient to both Mumbai (via Mumbai-Pune Expressway / Old Highway) and Pune.
                </p>

                {/* Plus code badge */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="text-xs font-semibold text-stone-600">Google Plus Code:</div>
                  <div className="font-mono text-xs font-bold text-stone-900 bg-white px-2.5 py-1 rounded border border-stone-200">
                    {resortMeta.googlePlusCode}
                  </div>
                </div>

                {/* Route Selector Tabs */}
                <div className="pt-2">
                  <div className="flex rounded-lg border border-stone-200 p-1 bg-stone-100 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveRouteTab('mumbai')}
                      className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                        activeRouteTab === 'mumbai'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      From Mumbai
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRouteTab('pune')}
                      className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                        activeRouteTab === 'pune'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      From Pune
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRouteTab('train')}
                      className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
                        activeRouteTab === 'train'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      By Train
                    </button>
                  </div>

                  <div className="mt-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                    {activeRouteTab === 'mumbai' && (
                      <div className="space-y-1.5">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-amber-600" />
                          <span>Mumbai Drive (approx. 68 km / ~90 mins)</span>
                        </div>
                        <p>
                          Take the Mumbai-Pune Expressway to the Khalapur toll plaza exit, then merge onto the Old Mumbai-Pune Highway toward Karjat Chowk and proceed to Vinegaon.
                        </p>
                      </div>
                    )}

                    {activeRouteTab === 'pune' && (
                      <div className="space-y-1.5">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-amber-600" />
                          <span>Pune Drive (approx. 85 km / ~95 mins)</span>
                        </div>
                        <p>
                          Drive via the Mumbai-Pune Expressway descending through Khandala ghats. Take the Khopoli / Karjat exit onto the Old Highway towards Vinegaon.
                        </p>
                      </div>
                    )}

                    {activeRouteTab === 'train' && (
                      <div className="space-y-1.5">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <Train className="w-3.5 h-3.5 text-amber-600" />
                          <span>Central Railway Local or Express</span>
                        </div>
                        <p>
                          Arrive at Karjat Junction or Chowk railway station. Local autos and cabs directly reach Rudra Farms in Vinegaon in 15–20 minutes.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Open in Google Maps Button */}
              <a
                href={resortMeta.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Resort GPS in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Right 7 Columns: Embedded Google Map */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-stone-100">
              <iframe
                title="Rudra Farms and Resort Karjat Google Map Location"
                src={resortMeta.mapsEmbedUrl}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
