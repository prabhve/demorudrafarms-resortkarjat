import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, PhoneCall, Calendar } from 'lucide-react';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)));
      }

      // Detect active section
      const sections = ['overview', 'accommodations', 'amenities', 'dining', 'gallery', 'attractions', 'calculator', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview', id: 'overview' },
    { label: 'Accommodations', href: '#accommodations', id: 'accommodations' },
    { label: 'Amenities', href: '#amenities', id: 'amenities' },
    { label: 'Dining & BBQ', href: '#dining', id: 'dining' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Attractions', href: '#attractions', id: 'attractions' },
    { label: 'Tariff', href: '#calculator', id: 'calculator' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm py-2.5 sm:py-3 text-stone-900'
          : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent py-3.5 sm:py-4 text-white'
      }`}
    >
      {/* Smooth Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Wordmark & Logo */}
        <a
          href="#overview"
          onClick={(e) => handleNavClick(e, '#overview')}
          className="flex items-center gap-2 sm:gap-3 min-w-0 group cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-500/60 bg-amber-500/10 flex items-center justify-center text-amber-500 font-brand font-bold text-sm sm:text-lg transition-transform group-hover:scale-105 shadow-sm shrink-0">
            R
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`font-brand text-xs sm:text-base lg:text-lg font-bold tracking-wider sm:tracking-widest uppercase leading-none truncate transition-colors ${
                scrolled ? 'text-stone-900' : 'text-white'
              }`}
            >
              RUDRA FARMS
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.22em] text-amber-500 font-semibold mt-0.5 truncate">
              & Resort · Karjat
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-semibold uppercase tracking-wider transition-all py-1 relative whitespace-nowrap ${
                  isActive
                    ? 'text-amber-500 font-bold'
                    : scrolled
                    ? 'text-stone-700 hover:text-amber-600'
                    : 'text-stone-200 hover:text-amber-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* AI Concierge Trigger */}
          <button
            type="button"
            onClick={onOpenChat}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
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
            className="px-2.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-1 sm:gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>
              Reserve<span className="hidden sm:inline"> Stay</span>
            </span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`xl:hidden p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer shrink-0 active:scale-95 ${
              scrolled
                ? 'text-stone-800 hover:bg-stone-200/70 bg-stone-100/80'
                : 'text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-5 py-5 border-b bg-[#faf8f5]/98 backdrop-blur-xl border-stone-200 text-stone-900 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-bold uppercase tracking-wider py-3 px-3 rounded-lg border transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-100/70 border-amber-300 text-amber-900 font-extrabold'
                      : 'border-transparent text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </a>
              );
            })}

            <div className="pt-3 flex flex-col gap-2.5 border-t border-stone-200 mt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ask AI Concierge (24/7)</span>
              </button>

              <a
                href="tel:+919082951341"
                className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-stone-100 text-stone-800 text-center flex items-center justify-center gap-2 border border-stone-200 active:scale-98"
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
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-md font-semibold cursor-pointer active:scale-98"
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

