import { useState, useEffect } from 'react';
import { ResortDataProvider, useResortData } from './context/ResortDataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { StayShowcase } from './components/StayShowcase';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ParallaxFeatureBanner } from './components/ParallaxFeatureBanner';
import { DiningSection } from './components/DiningSection';
import { GallerySection } from './components/GallerySection';
import { AttractionsMap } from './components/AttractionsMap';
import { BookingCalculator } from './components/BookingCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AIChatModal } from './components/AIChatModal';
import { FloatingActions } from './components/FloatingActions';
import { AdminPanelModal } from './components/AdminPanelModal';

function MainAppContent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedRoomForQuote, setSelectedRoomForQuote] = useState<string>('royal-villa-4bhk');
  const { setAdminOpen } = useResortData();

  useEffect(() => {
    // Permanently maintain crisp, high-contrast luxury styling
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark', 'bg-[#111513]', 'text-stone-100');
    document.body.classList.add('bg-[#FAF8F5]', 'text-stone-900');
    localStorage.removeItem('rudra_theme');
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSearch = (
    _checkIn: string,
    _checkOut: string,
    _guests: number,
    roomType: string
  ) => {
    setSelectedRoomForQuote(roomType);
    scrollToSection('calculator');
  };

  const handleSelectRoomForQuote = (roomId: string) => {
    setSelectedRoomForQuote(roomId);
    scrollToSection('calculator');
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-[#FAF8F5] text-stone-900 selection:bg-amber-400 selection:text-stone-950 relative">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenChat={() => setChatOpen(true)}
        onBookNowClick={() => scrollToSection('calculator')}
      />

      <main>
        {/* Hero Section with Cinematic Carousel & Quick Availability Bar */}
        <Hero
          onSearch={handleQuickSearch}
          onExploreClick={() => scrollToSection('accommodations')}
          onOpenChat={() => setChatOpen(true)}
        />

        {/* Welcome Story Section (High-contrast, bold, clear typography) */}
        <StorySection />

        {/* Accommodation Showcase */}
        <StayShowcase
          onSelectForQuote={handleSelectRoomForQuote}
        />

        {/* Resort Experiences & Amenities Bento */}
        <AmenitiesSection />

        {/* Full-width Cinematic Parallax Panorama */}
        <ParallaxFeatureBanner
          onCheckTariff={() => scrollToSection('calculator')}
        />

        {/* Authentic Dining & Meal Packages */}
        <DiningSection />

        {/* Curated Visual Gallery */}
        <GallerySection />

        {/* Surrounding Karjat Wonders & Live Google Map */}
        <AttractionsMap />

        {/* Stay Tariff & Instant Booking Calculator */}
        <BookingCalculator
          selectedRoomId={selectedRoomForQuote}
        />

        {/* Verified Reviews */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer with integrated Admin CMS Portal trigger */}
      <Footer
        onOpenChat={() => setChatOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* AI Resort Concierge Modal */}
      <AIChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      {/* Full-Control Admin CMS Dashboard Modal */}
      <AdminPanelModal />

      {/* Floating Action Buttons (AI Concierge & WhatsApp) - Fixed overlap with roomy footer bottom padding */}
      <FloatingActions onOpenChat={() => setChatOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <ResortDataProvider>
      <MainAppContent />
    </ResortDataProvider>
  );
}
