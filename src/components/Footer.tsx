import React from 'react';
import { useResortData } from '../context/ResortDataContext';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Sparkles, Sliders, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenChat: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat, onOpenAdmin }) => {
  const { resortMeta } = useResortData();

  return (
    <footer id="contact" className="pt-16 pb-36 sm:pb-40 border-t border-stone-200 bg-[#f5f2eb] text-stone-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-amber-600 font-brand font-bold text-lg shadow-sm">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-brand text-lg font-bold tracking-widest text-stone-900 uppercase">
                  {resortMeta.shortName || 'RUDRA FARMS'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">
                  & Resort · Karjat
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Your secluded 4-acre private paradise in Vinegaon, Karjat. Featuring private swimming pool, plush luxury accommodations, lush lawns, and authentic chulha dining.
            </p>

            {/* Quick Action Buttons including Admin CMS Portal */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${resortMeta.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Manager</span>
              </a>

              <button
                type="button"
                onClick={onOpenChat}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Ask AI Concierge</span>
              </button>

              {/* Admin Panel Entry Button */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-amber-300 bg-stone-900 hover:bg-stone-950 border border-stone-700/80 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer shadow-md"
                title="Open Resort Management CMS"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Resort Admin CMS</span>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-extrabold">
                  Full Control
                </span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#overview" className="hover:text-amber-700 transition-colors">Home</a></li>
              <li><a href="#accommodations" className="hover:text-amber-700 transition-colors">Accommodations</a></li>
              <li><a href="#amenities" className="hover:text-amber-700 transition-colors">Amenities & Lawns</a></li>
              <li><a href="#dining" className="hover:text-amber-700 transition-colors">Chulha Dining</a></li>
              <li><a href="#gallery" className="hover:text-amber-700 transition-colors">Visual Gallery</a></li>
              <li><a href="#attractions" className="hover:text-amber-700 transition-colors">Attractions & Map</a></li>
              <li><a href="#calculator" className="hover:text-amber-700 transition-colors">Tariff Calculator</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Reach Out & Visit
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {resortMeta.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`tel:${resortMeta.phones[0]}`} className="hover:text-amber-700 font-mono font-semibold">
                  {resortMeta.phones[0]} (Booking & Inquiries)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`mailto:${resortMeta.email}`} className="hover:text-amber-700">
                  {resortMeta.email}
                </a>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <a
                  href={resortMeta.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 underline"
                >
                  <span>Open verified location on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Sub-link to Admin Portal */}
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-stone-500 hover:text-amber-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar: Spaced generously away from floating buttons on bottom-right */}
        <div className="pt-8 border-t border-stone-300 text-xs text-stone-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:pr-80 lg:pr-96">
          <div>
            © {new Date().getFullYear()} {resortMeta.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px] font-medium text-stone-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Sole Private Buyout
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              100% Pet-Friendly
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              100% DG Power Backup
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
