import React, { useState, useRef } from 'react';
import { useResortData } from '../context/ResortDataContext';
import {
  X,
  Building2,
  BedDouble,
  Sparkles,
  UtensilsCrossed,
  Image as ImageIcon,
  MapPin,
  Calculator,
  Star,
  Sliders,
  Upload,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Video,
  FileText,
  DollarSign,
  Phone,
  Eye,
  Search
} from 'lucide-react';
import { RoomOption, AmenityItem, MenuItem, AttractionItem, ReviewItem } from '../types';
import { GalleryItem, HeroSlide } from '../data/resortData';

type AdminTab =
  | 'overview'
  | 'rooms'
  | 'amenities'
  | 'dining'
  | 'media'
  | 'attractions'
  | 'pricing'
  | 'reviews'
  | 'hero';

export const AdminPanelModal: React.FC = () => {
  const {
    adminOpen,
    setAdminOpen,
    resortMeta,
    updateResortMeta,
    roomsData,
    updateRoom,
    addRoom,
    deleteRoom,
    amenitiesData,
    updateAmenity,
    addAmenity,
    deleteAmenity,
    menuItems,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    galleryItems,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    attractionsData,
    updateAttraction,
    addAttraction,
    deleteAttraction,
    reviewsData,
    updateReview,
    addReview,
    deleteReview,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    pricingConfig,
    updatePricingConfig,
    resetToDefaults
  } = useResortData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for adding new items
  const [showAddDish, setShowAddDish] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showAddAttraction, setShowAddAttraction] = useState(false);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaUploadPreview, setMediaUploadPreview] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'pool' | 'stays' | 'dining' | 'outdoors'>('stays');
  const [newMediaCaption, setNewMediaCaption] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Convert uploaded image or video to Base64 data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Please select a file under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onComplete(result);
        showToast('Media uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  if (!adminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d110f] text-stone-100 flex flex-col overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-[#161c18] border-b border-stone-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold font-brand text-lg">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-brand font-bold text-base sm:text-lg text-white tracking-wide">
                RUDRA FARMS & RESORT
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Live CMS & Control Hub
              </span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Changes Sync Instantly to Live Website</span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all website content back to factory defaults? Any custom uploads will be replaced.')) {
                resetToDefaults();
                showToast('All website data reset to factory default!');
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-700 bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Reset to default data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminOpen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow cursor-pointer"
          >
            <Eye className="w-4 h-4 text-stone-950" />
            <span>Exit & View Live Site</span>
            <X className="w-4 h-4 ml-1" />
          </button>
        </div>
      </header>

      {/* Main CMS Layout: Left Sidebar + Right Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-64 sm:w-72 bg-[#121613] border-r border-stone-800/90 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-4 space-y-1.5">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest px-3 py-2">
              Website Controls
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Resort Info & Contacts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <BedDouble className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Accommodations (Villa)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {roomsData.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('amenities')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'amenities'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Curated Amenities</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {amenitiesData.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dining')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'dining'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Chulha Menu & Dining</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {menuItems.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Photos & Videos CMS</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  {galleryItems.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('attractions')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'attractions'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Karjat Attractions</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {attractionsData.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Tariff & Pricing Engine</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <Star className="w-4 h-4 shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span>Guest Reviews</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                  {reviewsData.length}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'hero'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Hero Carousel & Slides</span>
            </button>
          </div>

          {/* Quick Info at Bottom of Sidebar */}
          <div className="p-4 border-t border-stone-800/80 bg-[#0e1210] text-[11px] text-stone-400 space-y-1">
            <div className="font-semibold text-stone-300">Rudra Farms CMS v2.4</div>
            <div>Owner / Manager Workspace</div>
            <div className="text-amber-400 font-mono text-[10px] pt-1">
              Storage: Local & Session Sync
            </div>
          </div>
        </aside>

        {/* Right Workspace Main Content Area */}
        <main className="flex-1 bg-[#141a16] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW & RESORT META */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                  Resort Identity & Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-stone-400">
                  Update your resort name, phone numbers, WhatsApp, GPS coordinates, and estate statistics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 rounded-2xl bg-[#1b221d] border border-stone-800">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-amber-400">Full Resort Name</label>
                  <input
                    type="text"
                    value={resortMeta.name}
                    onChange={(e) => updateResortMeta({ name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-300">Full Postal Address</label>
                  <input
                    type="text"
                    value={resortMeta.address}
                    onChange={(e) => updateResortMeta({ address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">WhatsApp Inquiry Number</label>
                  <input
                    type="text"
                    value={resortMeta.whatsapp}
                    onChange={(e) => updateResortMeta({ whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Primary Contact Phone</label>
                  <input
                    type="text"
                    value={resortMeta.phones[0]}
                    onChange={(e) =>
                      updateResortMeta({
                        phones: [e.target.value, resortMeta.phones[1], resortMeta.phones[2]]
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Contact Email</label>
                  <input
                    type="email"
                    value={resortMeta.email}
                    onChange={(e) => updateResortMeta({ email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Google Plus Code</label>
                  <input
                    type="text"
                    value={resortMeta.googlePlusCode}
                    onChange={(e) => updateResortMeta({ googlePlusCode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-300">Google Maps Direct Navigation URL</label>
                  <input
                    type="text"
                    value={resortMeta.googleMapsDirectionsUrl}
                    onChange={(e) => updateResortMeta({ googleMapsDirectionsUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Estate Statistics */}
              <div className="p-6 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-4">
                <div className="text-sm font-bold text-white">Estate Quick Statistics</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-stone-400">Total Acres</label>
                    <input
                      type="number"
                      value={resortMeta.stats.estateAcres}
                      onChange={(e) =>
                        updateResortMeta({
                          stats: { ...resortMeta.stats, estateAcres: Number(e.target.value) }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-stone-400">Guest Capacity</label>
                    <input
                      type="number"
                      value={resortMeta.stats.guestCapacity}
                      onChange={(e) =>
                        updateResortMeta({
                          stats: { ...resortMeta.stats, guestCapacity: Number(e.target.value) }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-stone-400">Pool Dimensions</label>
                    <input
                      type="text"
                      value={resortMeta.stats.poolSize}
                      onChange={(e) =>
                        updateResortMeta({
                          stats: { ...resortMeta.stats, poolSize: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-stone-400">Display Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      value={resortMeta.stats.rating}
                      onChange={(e) =>
                        updateResortMeta({
                          stats: { ...resortMeta.stats, rating: Number(e.target.value) }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROOMS & VILLA ACCOMMODATIONS */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Accommodations & Villa Management
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Edit room tariffs, guest capacities, descriptions, and upload high-resolution room photos.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {roomsData.map((room) => (
                  <div
                    key={room.id}
                    className="p-6 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Photo Header with upload button */}
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 border border-stone-700 group">
                        <img
                          src={room.featuredImage}
                          alt={room.titleKey}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  updateRoom(room.id, { featuredImage: dataUrl })
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      {/* Image URL input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Or Direct Image URL
                        </label>
                        <input
                          type="text"
                          value={room.featuredImage}
                          onChange={(e) => updateRoom(room.id, { featuredImage: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          placeholder="https://..."
                        />
                      </div>

                      {/* Pricing Fields */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-emerald-400">
                            Weekday Price (₹)
                          </label>
                          <input
                            type="number"
                            value={room.basePriceWeekday}
                            onChange={(e) =>
                              updateRoom(room.id, { basePriceWeekday: Number(e.target.value) })
                            }
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white font-mono font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-amber-400">
                            Weekend Price (₹)
                          </label>
                          <input
                            type="number"
                            value={room.basePriceWeekend}
                            onChange={(e) =>
                              updateRoom(room.id, { basePriceWeekend: Number(e.target.value) })
                            }
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white font-mono font-bold"
                          />
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Min Guests</label>
                          <input
                            type="number"
                            value={room.capacity.min}
                            onChange={(e) =>
                              updateRoom(room.id, {
                                capacity: { ...room.capacity, min: Number(e.target.value) }
                              })
                            }
                            className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Max Guests</label>
                          <input
                            type="number"
                            value={room.capacity.max}
                            onChange={(e) =>
                              updateRoom(room.id, {
                                capacity: { ...room.capacity, max: Number(e.target.value) }
                              })
                            }
                            className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Bedrooms</label>
                          <input
                            type="number"
                            value={room.capacity.bedrooms}
                            onChange={(e) =>
                              updateRoom(room.id, {
                                capacity: { ...room.capacity, bedrooms: Number(e.target.value) }
                              })
                            }
                            className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Baths</label>
                          <input
                            type="number"
                            value={room.capacity.bathrooms}
                            onChange={(e) =>
                              updateRoom(room.id, {
                                capacity: { ...room.capacity, bathrooms: Number(e.target.value) }
                              })
                            }
                            className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Bed & View */}
                      <div className="space-y-2 pt-2">
                        <div className="space-y-1">
                          <label className="text-[11px] text-stone-300">Bed Arrangement</label>
                          <input
                            type="text"
                            value={room.bedType}
                            onChange={(e) => updateRoom(room.id, { bedType: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] text-stone-300">View Description</label>
                          <input
                            type="text"
                            value={room.view}
                            onChange={(e) => updateRoom(room.id, { view: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Changes Active on Website</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CURATED AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Curated Amenities & Facilities
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Edit titles, descriptions, and feature bullet highlights across all 8 resort amenities.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {amenitiesData.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {item.category}
                      </span>
                      <input
                        type="text"
                        value={item.badge || ''}
                        onChange={(e) => updateAmenity(item.id, { badge: e.target.value })}
                        placeholder="Badge (e.g. 40-Ft Length)"
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[11px] text-amber-300 w-36 text-right"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-white">Amenity Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateAmenity(item.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-stone-400">Description</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateAmenity(item.id, { description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200"
                      />
                    </div>

                    {/* Highlights (comma-separated editable) */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-stone-400">
                        Highlights (separate by commas)
                      </label>
                      <input
                        type="text"
                        value={item.highlights?.join(', ') || ''}
                        onChange={(e) =>
                          updateAmenity(item.id, {
                            highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-amber-200"
                        placeholder="e.g., Rain dance floor, Twilight illumination"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DINING & CHULHA MENU */}
          {activeTab === 'dining' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Chulha Dining & Menu System CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Add new dishes, update rates, toggle Veg/Non-Veg, and set Chef's Special badges.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddDish(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Add New Dish Form Modal */}
              {showAddDish && (
                <div className="p-6 rounded-2xl bg-[#202922] border-2 border-amber-400/80 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Add New Dish to Resort Menu</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowAddDish(false)}
                      className="text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const newDish: MenuItem = {
                        id: `dish-${Date.now()}`,
                        name: formData.get('name') as string,
                        category: formData.get('category') as any,
                        price: Number(formData.get('price')),
                        portion: formData.get('portion') as string,
                        description: formData.get('description') as string,
                        isVeg: formData.get('isVeg') === 'true',
                        isChefSpecial: formData.get('isChefSpecial') === 'true',
                        badge: (formData.get('badge') as string) || undefined
                      };
                      addMenuItem(newDish);
                      setShowAddDish(false);
                      showToast(`Added ${newDish.name} to menu!`);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-300">Dish Name</label>
                      <input
                        name="name"
                        required
                        placeholder="e.g., Paneer Tikka Angara"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Category</label>
                      <select
                        name="category"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      >
                        <option value="nonveg">🍗 Gavran Non-Veg</option>
                        <option value="veg">🌿 Authentic Veg</option>
                        <option value="bbq">🔥 Live Barbecue</option>
                        <option value="breakfast">☕ Farm Breakfast</option>
                        <option value="dessert-beverage">🍹 Cooler / Sweet</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Price (₹)</label>
                      <input
                        name="price"
                        type="number"
                        required
                        placeholder="e.g. 380"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Portion Size</label>
                      <input
                        name="portion"
                        required
                        placeholder="e.g., Serves 2-3"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Dietary</label>
                      <select
                        name="isVeg"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      >
                        <option value="true">Pure Vegetarian (🟢)</option>
                        <option value="false">Non-Vegetarian (🔴)</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-3">
                      <label className="text-xs font-bold text-stone-300">Description</label>
                      <textarea
                        name="description"
                        rows={2}
                        required
                        placeholder="Flavors, preparation style, and ingredients..."
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-3 sm:col-span-3 pt-2">
                      <label className="flex items-center gap-2 text-xs text-amber-300 cursor-pointer">
                        <input type="checkbox" name="isChefSpecial" value="true" className="w-4 h-4" />
                        <span>Highlight as Chef's Special / Bestseller</span>
                      </label>
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddDish(false)}
                        className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 text-xs font-bold hover:bg-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold"
                      >
                        Save Dish
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing Dishes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#1b221d] border border-stone-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            {item.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${item.name} from menu?`)) {
                              deleteMenuItem(item.id);
                              showToast(`Deleted ${item.name}`);
                            }
                          }}
                          className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                          title="Delete dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateMenuItem(item.id, { name: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Price (₹)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              updateMenuItem(item.id, { price: Number(e.target.value) })
                            }
                            className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-amber-400 font-mono font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-stone-400">Portion</label>
                          <input
                            type="text"
                            value={item.portion}
                            onChange={(e) => updateMenuItem(item.id, { portion: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => updateMenuItem(item.id, { description: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-[11px] text-stone-300"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <label className="flex items-center gap-1.5 text-[11px] text-amber-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(item.isChefSpecial)}
                          onChange={(e) =>
                            updateMenuItem(item.id, { isChefSpecial: e.target.checked })
                          }
                          className="w-3.5 h-3.5"
                        />
                        <span>Chef's Special</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-[11px] text-stone-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isVeg}
                          onChange={(e) => updateMenuItem(item.id, { isVeg: e.target.checked })}
                          className="w-3.5 h-3.5"
                        />
                        <span>Veg Dish</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PHOTOS & VIDEOS MEDIA CMS & UPLOADER */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Photos & Videos Media Gallery CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Upload photos/videos directly from device or enter image URLs to update the live resort gallery.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddMedia(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload / Add Media</span>
                </button>
              </div>

              {/* Upload New Photo / Video Form */}
              {showAddMedia && (
                <div className="p-6 rounded-2xl bg-[#202922] border-2 border-amber-400/80 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload New Media to Resort Gallery</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowAddMedia(false)}
                      className="text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Media File Picker Area */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-stone-300">
                        1. Select File from Computer / Phone
                      </div>

                      <div className="border-2 border-dashed border-stone-700 hover:border-amber-400/70 rounded-2xl p-6 text-center bg-stone-900/60 transition-colors flex flex-col items-center justify-center min-h-[160px]">
                        {mediaUploadPreview ? (
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3">
                            {mediaType === 'video' ? (
                              <video
                                src={mediaUploadPreview}
                                controls
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={mediaUploadPreview}
                                alt="Upload Preview"
                                className="w-full h-full object-cover"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => setMediaUploadPreview('')}
                              className="absolute top-2 right-2 p-1 rounded-full bg-stone-900/80 text-white hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-amber-400 mb-2" />
                            <p className="text-xs font-bold text-stone-200">
                              Click to browse or drop photo/video here
                            </p>
                            <p className="text-[11px] text-stone-500 mt-1">
                              Supports JPG, PNG, WEBP, MP4 (up to 10MB)
                            </p>
                          </>
                        )}

                        <label className="mt-3 px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs cursor-pointer shadow">
                          <span>{mediaUploadPreview ? 'Change Selected File' : 'Browse Local Files'}</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file?.type.startsWith('video/')) {
                                setMediaType('video');
                              } else {
                                setMediaType('image');
                              }
                              handleFileUpload(e, (dataUrl) => setMediaUploadPreview(dataUrl));
                            }}
                          />
                        </label>
                      </div>

                      {/* Or direct URL */}
                      <div className="space-y-1 pt-1">
                        <label className="text-[11px] text-stone-400 font-bold uppercase">
                          Or Enter Web Photo/Video URL
                        </label>
                        <input
                          type="text"
                          value={mediaUploadPreview}
                          onChange={(e) => setMediaUploadPreview(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Metadata Fields */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-stone-300">Title / Headline</label>
                          <input
                            type="text"
                            value={newMediaTitle}
                            onChange={(e) => setNewMediaTitle(e.target.value)}
                            placeholder="e.g. Twilight Poolside Cabana"
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-stone-300">Gallery Category</label>
                          <select
                            value={newMediaCategory}
                            onChange={(e) => setNewMediaCategory(e.target.value as any)}
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          >
                            <option value="pool">🏊 Pool & Water Oasis</option>
                            <option value="stays">🏡 Villa & Stays</option>
                            <option value="dining">🍽️ Chulha Dining & BBQ</option>
                            <option value="outdoors">🌿 Lawns & Grounds</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-stone-300">Caption / Description</label>
                          <textarea
                            rows={3}
                            value={newMediaCaption}
                            onChange={(e) => setNewMediaCaption(e.target.value)}
                            placeholder="Describe what guests are seeing..."
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAddMedia(false)}
                          className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 text-xs font-bold hover:bg-stone-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={!mediaUploadPreview || !newMediaTitle}
                          onClick={() => {
                            const newMedia: GalleryItem = {
                              id: `gal-${Date.now()}`,
                              image: mediaUploadPreview,
                              title: newMediaTitle,
                              category: newMediaCategory,
                              caption: newMediaCaption || newMediaTitle
                            };
                            addGalleryItem(newMedia);
                            setShowAddMedia(false);
                            setMediaUploadPreview('');
                            setNewMediaTitle('');
                            setNewMediaCaption('');
                            showToast('New media added to live gallery!');
                          }}
                          className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold disabled:opacity-50 cursor-pointer"
                        >
                          Publish to Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 border border-stone-700 group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${item.title} from gallery?`)) {
                              deleteGalleryItem(item.id);
                              showToast('Deleted gallery photo');
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 text-amber-300">
                          {item.category}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-400 uppercase">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateGalleryItem(item.id, { title: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-stone-400 uppercase">Caption</label>
                        <textarea
                          rows={2}
                          value={item.caption}
                          onChange={(e) => updateGalleryItem(item.id, { caption: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-[11px] text-stone-300"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                      <span>Category:</span>
                      <select
                        value={item.category}
                        onChange={(e) => updateGalleryItem(item.id, { category: e.target.value as any })}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-amber-300 text-xs"
                      >
                        <option value="pool">Pool</option>
                        <option value="stays">Stays</option>
                        <option value="dining">Dining</option>
                        <option value="outdoors">Outdoors</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ATTRACTIONS & SIGHTS */}
          {activeTab === 'attractions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Karjat Attractions & GPS Navigation
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Edit nearby sights, distances in km, drive times, and Google Maps destination coordinates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {attractionsData.map((att) => (
                  <div
                    key={att.id}
                    className="p-5 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-3"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-900">
                      <img src={att.image} alt={att.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase">Sight Name</label>
                      <input
                        type="text"
                        value={att.name}
                        onChange={(e) => updateAttraction(att.id, { name: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-stone-400">Distance (Km)</label>
                        <input
                          type="number"
                          value={att.distanceKm}
                          onChange={(e) =>
                            updateAttraction(att.id, { distanceKm: Number(e.target.value) })
                          }
                          className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-amber-400 font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-stone-400">Drive Time (Min)</label>
                        <input
                          type="number"
                          value={att.driveTimeMin}
                          onChange={(e) =>
                            updateAttraction(att.id, { driveTimeMin: Number(e.target.value) })
                          }
                          className="w-full px-2 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-stone-400">Google Maps Query</label>
                      <input
                        type="text"
                        value={att.mapDestinationQuery}
                        onChange={(e) =>
                          updateAttraction(att.id, { mapDestinationQuery: e.target.value })
                        }
                        className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-[11px] text-stone-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TARIFF CALCULATOR PRICING CONFIG */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                  Tariff Calculator & Pricing Engine
                </h2>
                <p className="text-xs sm:text-sm text-stone-400">
                  Control all calculation parameters for the live instant booking calculator on the website.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-400">
                      Extra Adult Charge (₹ / night)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.extraAdultFee}
                      onChange={(e) =>
                        updatePricingConfig({ extraAdultFee: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono font-bold"
                    />
                    <p className="text-[10px] text-stone-400">
                      Charged per extra adult beyond base room capacity.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-400">
                      Extra Child Charge (₹ / night)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.extraChildFee}
                      onChange={(e) =>
                        updatePricingConfig({ extraChildFee: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono font-bold"
                    />
                    <p className="text-[10px] text-stone-400">
                      Applicable for children aged 6 to 11.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">
                      Breakfast Package (₹ / head / day)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.breakfastPerHead}
                      onChange={(e) =>
                        updatePricingConfig({ breakfastPerHead: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">
                      All-Inclusive Meal Package (₹ / head / day)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.allMealsPerHead}
                      onChange={(e) =>
                        updatePricingConfig({ allMealsPerHead: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">
                      Live Barbecue Add-on (₹ / head)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.bbqAddonPerHead}
                      onChange={(e) =>
                        updatePricingConfig({ bbqAddonPerHead: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">
                      Refundable Security Deposit (₹)
                    </label>
                    <input
                      type="number"
                      value={pricingConfig.securityDeposit}
                      onChange={(e) =>
                        updatePricingConfig({ securityDeposit: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141a16] border border-stone-800 flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Calculator updates in real-time for all visiting guests</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Pricing configuration saved!')}
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold"
                  >
                    Save Pricing Rates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: GUEST REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                    Guest Testimonials & Reviews CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Add new verified reviews, edit guest comments, and manage stay details.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddReview(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Guest Review</span>
                </button>
              </div>

              {/* Add New Review Form */}
              {showAddReview && (
                <div className="p-6 rounded-2xl bg-[#202922] border-2 border-amber-400/80 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-amber-300 text-sm">Add Verified Guest Review</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className="text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const newRev: ReviewItem = {
                        id: `rev-${Date.now()}`,
                        author: formData.get('author') as string,
                        city: formData.get('city') as string,
                        stayType: formData.get('stayType') as string,
                        category: formData.get('category') as any,
                        rating: Number(formData.get('rating')),
                        date: formData.get('date') as string,
                        comment: formData.get('comment') as string,
                        groupSize: formData.get('groupSize') as string
                      };
                      addReview(newRev);
                      setShowAddReview(false);
                      showToast(`Added review by ${newRev.author}`);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Guest Name</label>
                      <input
                        name="author"
                        required
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">City</label>
                      <input
                        name="city"
                        required
                        placeholder="e.g., Mumbai"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Stay Type</label>
                      <input
                        name="stayType"
                        required
                        placeholder="e.g., 4BHK Villa Exclusive Buyout"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Rating (1 to 5 Stars)</label>
                      <select
                        name="rating"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      >
                        <option value="5">★★★★★ (5 Stars)</option>
                        <option value="4">★★★★☆ (4 Stars)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Group Size</label>
                      <input
                        name="groupSize"
                        placeholder="e.g., 18 Guests"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-300">Date</label>
                      <input
                        name="date"
                        defaultValue="Recent Stay"
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-3">
                      <label className="text-xs font-bold text-stone-300">Review Text</label>
                      <textarea
                        name="comment"
                        rows={3}
                        required
                        placeholder="Guest feedback and impressions..."
                        className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddReview(false)}
                        className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 text-xs font-bold hover:bg-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold"
                      >
                        Publish Review
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsData.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{rev.author}</span>
                          <span className="text-[10px] text-stone-400">({rev.city})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete review from ${rev.author}?`)) {
                              deleteReview(rev.id);
                              showToast('Review deleted');
                            }
                          }}
                          className="text-stone-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>

                      <textarea
                        rows={3}
                        value={rev.comment}
                        onChange={(e) => updateReview(rev.id, { comment: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-200"
                      />
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                      <span>{rev.stayType}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: HERO SLIDES & BANNERS */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-brand text-white">
                  Hero Carousel & Cinematic Banners
                </h2>
                <p className="text-xs sm:text-sm text-stone-400">
                  Update homepage hero carousel slide photos, titles, and promotional tagline banners.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="p-5 rounded-2xl bg-[#1b221d] border border-stone-800 space-y-3"
                  >
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-900 group">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Slide Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) =>
                                updateHeroSlide(slide.id, { image: dataUrl })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-400 uppercase">
                        Slide {idx + 1} Badge Tag
                      </label>
                      <input
                        type="text"
                        value={slide.tag}
                        onChange={(e) => updateHeroSlide(slide.id, { tag: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-amber-300 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-300 uppercase">
                        Main Heading
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateHeroSlide(slide.id, { title: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-300 uppercase">
                        Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(slide.id, { subtitle: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
