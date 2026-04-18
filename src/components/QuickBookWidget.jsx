import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function QuickBookWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        dayNum: date.getDate(),
        dayText: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0,
        fullDate: date
      });
    }
    return dates;
  };
  
  const upcomingDates = generateDates();
  const [selectedDate, setSelectedDate] = useState(upcomingDates[0].fullDate);

  // Smooth GSAP animations
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(cardRef.current, 
        { y: 50, opacity: 0, scale: 0.9, transformOrigin: "bottom right" },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", display: "block" }
      );
    } else if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 20, opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in", display: "none"
      });
    }
  }, [isOpen]);

  // --- DESKTOP HOVER LOGIC ---
  const handleMouseEnter = () => {
    // Only trigger hover logic if the device supports hovering (e.g., has a mouse)
    if (window.matchMedia('(hover: hover)').matches) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 400); 
    }
  };

  // --- MOBILE TAP LOGIC ---
  const handleMobileToggle = () => {
    // Allows mobile users to tap to open/close
    if (!window.matchMedia('(hover: hover)').matches) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div 
      // Adjusted positioning to be slightly tighter to the edge on mobile
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* === THE PREMIUM POPUP FORM CARD === */}
      <div 
        ref={cardRef} 
        // RESPONSIVE WIDTH: Takes full screen width minus padding on mobile, fixed 380px on desktop
        className="hidden w-[calc(100vw-2rem)] sm:w-[380px] bg-[#f6ead6] rounded-[20px] md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:shadow-[0_40px_80px_rgba(0,0,0,0.2)] overflow-hidden mb-4 md:mb-6 border border-[#181311]/10"
      >
        {/* Header / Inputs Section - Padding scales down on mobile */}
        <div className="relative p-5 md:p-7 bg-[#ffffff]">
          
          <button className="absolute right-6 md:right-8 top-[50%] -translate-y-[50%] w-8 h-8 md:w-10 md:h-10 bg-[#ffffff] border border-[#181311]/10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 hover:border-[#d85a2b] text-[#181311] group">
            <svg className="group-hover:rotate-180 transition-transform duration-500 w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 10v12"/><path d="m3 14 4-4 4 4"/><path d="m11 20 4 4 4-4"/></svg>
          </button>

          <div className="flex items-center gap-3 md:gap-4 pb-4 md:pb-5 border-b border-[#181311]/5">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#d85a2b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <div className="w-full">
              <p className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-[#181311]/40 uppercase font-bold mb-0.5 md:mb-1">Origin</p>
              {/* text-base on mobile prevents iOS from auto-zooming into the input field */}
              <input 
                type="text" 
                placeholder="Select Departure" 
                className="w-full bg-transparent text-[#181311] font-display text-base md:text-xl font-bold placeholder-[#181311]/20 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-5">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#181311]/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div className="w-full">
              <p className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-[#181311]/40 uppercase font-bold mb-0.5 md:mb-1">Destination</p>
              <input 
                type="text" 
                placeholder="Select Arrival" 
                className="w-full bg-transparent text-[#181311] font-display text-base md:text-xl font-bold placeholder-[#181311]/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Date Selection Section */}
        <div className="relative p-5 md:p-6 pt-4 md:pt-5 bg-[#f6ead6]">
          <p className="text-[8px] md:text-[9px] font-mono tracking-[0.2em] text-[#181311]/50 uppercase font-bold mb-3 md:mb-4">Departure Date</p>
          
          <div className="relative flex items-center">
            <div className="flex flex-col items-center justify-center pr-3 md:pr-5 mr-1 border-r border-[#181311]/10 shrink-0">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d85a2b] mb-1 md:mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-widest text-[#181311]">APR</span>
              <span className="text-[9px] md:text-[10px] font-mono text-[#181311]/40">2026</span>
            </div>

            {/* touch-pan-x ensures perfectly smooth swiping on mobile devices */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pl-1 pr-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
              {upcomingDates.map((date, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedDate(date.fullDate)}
                  className={`relative flex flex-col items-center justify-center w-12 h-[72px] md:w-[52px] md:h-20 rounded-[12px] md:rounded-[14px] shrink-0 transition-all duration-300 ${
                    selectedDate.getDate() === date.dayNum 
                      ? 'bg-[#181311] text-[#f6ead6] shadow-[0_8px_16px_rgba(24,19,17,0.25)] scale-105' 
                      : 'bg-[#ffffff] text-[#181311] hover:bg-[#181311]/5 border border-[#181311]/5'
                  }`}
                >
                  {date.isToday && selectedDate.getDate() === date.dayNum && (
                    <span className="absolute -top-2.5 md:-top-3 text-[8px] md:text-[9px] font-mono tracking-widest font-bold text-[#d85a2b] uppercase">Now</span>
                  )}
                  <span className="font-display text-lg md:text-[22px] font-bold leading-none">{date.dayNum}</span>
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-1 md:mt-1.5 opacity-50">{date.dayText}</span>
                </button>
              ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-[#f6ead6] to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Premium Submit Button */}
        <button className="w-full py-4 md:py-6 bg-[#d85a2b] text-[#ffffff] hover:bg-[#181311] transition-colors duration-500 group flex justify-center items-center gap-3">
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase">Confirm Booking</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* === PILL-SHAPED FLOATING BUTTON === */}
      <button
        // Re-added onClick specifically for mobile tap support
        onClick={handleMobileToggle}
        className={`group relative flex items-center justify-center gap-2 md:gap-3 h-12 md:h-14 rounded-full shadow-[0_10px_20px_rgba(24,19,17,0.3)] md:shadow-[0_15px_30px_rgba(24,19,17,0.3)] transition-all duration-500 ease-out border border-white/10 overflow-hidden ${
          isOpen ? 'bg-[#d85a2b] w-12 md:w-14 cursor-pointer' : 'bg-[#181311] px-5 md:px-7 hover:bg-[#d85a2b] hover:scale-105 hover:-translate-y-1 cursor-default'
        }`}
      >
        {isOpen ? (
          <svg className="w-4 h-4 md:w-5 md:h-5 text-[#f6ead6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-[#f6ead6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
            
            <span className="font-mono tracking-[0.15em] md:tracking-[0.2em] font-bold text-[#f6ead6] text-[9px] md:text-[10px] uppercase whitespace-nowrap">
              Book Route
            </span>
          </>
        )}
      </button>

    </div>
  );
}