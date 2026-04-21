import { useState, useEffect } from 'react';
import Loader            from './components/Loader';
import PremiumBackground from './components/PremiumBackground';
import Navbar            from './components/Navbar';
import Hero              from './components/sections/Hero';
import Experience        from './components/sections/Experience';
import Cabin             from './components/sections/Cabin';
import Routes            from './components/sections/Routes';
import Quote             from './components/sections/Quote';
import Footer            from './components/sections/Footer';
import QuickBookWidget   from './components/QuickBookWidget.jsx';
import BookingFlow       from './components/booking/BookingFlow';

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded]               = useState(false);
  const [showBooking, setShowBooking]         = useState(false);

  useEffect(() => {
    // Open booking page when hash is #book, close it if hash is removed
    const checkHash = () => {
      if (window.location.hash === '#book') {
        setShowBooking(true);
      } else {
        setShowBooking(false);
      }
    };
    
    checkHash(); // Check on initial load
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1500);
    }
  }, [isLoaded]);

  const handleCloseBooking = () => {
    setShowBooking(false);
    // Cleanly remove the hash from the URL without triggering a page reload
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  const handleOpenBooking = () => {
    window.location.hash = 'book';
  };

  // Booking flow full-screen overlay
  if (showBooking) {
    return (
      <div className="relative min-h-screen bg-[#F4F5F7] text-[#111827] font-sans">
        {/* Close / back to landing - Modernized to match new Booking UI */}
        <button
          onClick={handleCloseBooking}
          className="fixed top-6 right-6 z-[999] flex items-center gap-2 text-[10px] font-extrabold tracking-widest uppercase text-gray-500 hover:text-[#0033FF] transition-colors bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Back to site
        </button>
        
        <BookingFlow />
      </div>
    );
  }

  // Main Landing Page
  return (
    <main className="relative text-[#111827] min-h-screen font-sans selection:bg-[#0033FF] selection:text-white z-0">
      <PremiumBackground />
      <Loader progress={loadingProgress} isComplete={isLoaded} />
      
      {isLoaded && <Navbar onBook={handleOpenBooking} />}
      <QuickBookWidget onBook={handleOpenBooking} />
      
      <Hero setProgress={setLoadingProgress} setLoaded={setIsLoaded} />
      <Experience />
      <Routes />
      <Cabin />
      <Quote />
      <Footer onBook={handleOpenBooking} />
    </main>
  );
}

export default App;