import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onBookNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  onBookNowClick
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#overview' },
    { label: 'Accommodations', href: '#accommodations' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Dining & BBQ', href: '#dining' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Attractions', href: '#attractions' },
    { label: 'Tariff', href: '#calculator' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm py-3 text-stone-900'
          : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Logo */}
        <a href="#overview" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-full border border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-amber-500 font-brand font-bold text-lg transition-transform group-hover:scale-105 shadow-sm">
            R
          </div>
          <div className="flex flex-col">
            <span
              className={`font-brand text-base sm:text-lg font-bold tracking-widest uppercase leading-none transition-colors ${
                scrolled ? 'text-stone-900' : 'text-white'
              }`}
            >
              RUDRA FARMS
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-amber-500 font-semibold mt-0.5">
              & Resort · Karjat
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors py-1 hover:text-amber-500 whitespace-nowrap ${
                scrolled ? 'text-stone-700' : 'text-stone-200'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* AI Concierge Trigger */}
          <button
            type="button"
            onClick={onOpenChat}
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              scrolled
                ? 'text-amber-900 border-amber-300 bg-amber-50/90 hover:bg-amber-100 shadow-sm'
                : 'text-amber-300 border-amber-400/50 bg-amber-950/40 hover:bg-amber-900/60 backdrop-blur-md'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="whitespace-nowrap">AI Concierge</span>
          </button>

          {/* Reserve Stay Button */}
          <button
            type="button"
            onClick={onBookNowClick}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shrink-0 cursor-pointer"
          >
            Reserve Stay
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`xl:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              scrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-6 py-6 border-b bg-[#faf8f5] border-stone-200 text-stone-900 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider py-2.5 border-b border-stone-200/80 text-stone-800 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ask Rudra AI Concierge</span>
              </button>

              <a
                href="tel:+919082951341"
                className="w-full py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-stone-100 text-stone-800 text-center flex items-center justify-center gap-2 border border-stone-200"
              >
                <PhoneCall className="w-4 h-4 text-stone-600" />
                <span>Call Host (+91 90829 51341)</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNowClick();
                }}
                className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-md font-semibold cursor-pointer"
              >
                Reserve Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
