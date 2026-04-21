import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function QuickBookWidget({ onBook }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  // Form State
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        dayNum: date.getDate(),
        dayText: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0,
        fullDate: date,
        formattedStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    return dates;
  };
  
  const upcomingDates = generateDates();
  const [selectedDate, setSelectedDate] = useState(upcomingDates[0]);

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
    if (!window.matchMedia('(hover: hover)').matches) {
      setIsOpen(!isOpen);
    }
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = () => {
    // Prevent empty submissions
    if (!origin.trim() || !destination.trim()) {
      alert("Please enter both an origin and destination.");
      return;
    }

    // Pass the parameters up to the parent component (App.jsx)
    if (onBook) {
      onBook({
        from: origin,
        to: destination,
        date: selectedDate.formattedStr
      });
    }
  };

  return (
    <div 
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* === THE PREMIUM POPUP FORM CARD === */}
      <div 
        ref={cardRef} 
        className="hidden w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-[20px] md:rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:shadow-[0_40px_80px_rgba(0,51,255,0.15)] overflow-hidden mb-4 md:mb-6 border border-gray-100"
      >
        {/* Header / Inputs Section */}
        <div className="relative p-5 md:p-7 bg-[#F8F9FA]">
          
          <button onClick={handleSwap} className="absolute right-6 md:right-8 top-[50%] -translate-y-[50%] w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 hover:border-[#0033FF] text-[#0033FF] group">
            <svg className="group-hover:rotate-180 transition-transform duration-500 w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 10v12"/><path d="m3 14 4-4 4 4"/><path d="m11 20 4 4 4-4"/></svg>
          </button>

          <div className="flex items-center gap-3 md:gap-4 pb-4 md:pb-5 border-b border-gray-200">
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 shrink-0"></div>
            <div className="w-full">
              <p className="text-[8px] md:text-[9px] font-bold tracking-widest text-[#0033FF] uppercase mb-0.5 md:mb-1">From</p>
              <input 
                type="text" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origin City" 
                className="w-full bg-transparent text-gray-900 text-base md:text-xl font-extrabold placeholder-gray-300 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-5">
            <div className="w-2 h-2 rounded-full bg-[#0033FF] shrink-0"></div>
            <div className="w-full">
              <p className="text-[8px] md:text-[9px] font-bold tracking-widest text-[#B74134] uppercase mb-0.5 md:mb-1">To</p>
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination City" 
                className="w-full bg-transparent text-gray-900 text-base md:text-xl font-extrabold placeholder-gray-300 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Date Selection Section */}
        <div className="relative p-5 md:p-6 pt-4 md:pt-5 bg-white">
          <p className="text-[8px] md:text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-3 md:mb-4">Select Departure Date</p>
          
          <div className="relative flex items-center">
            
            {/* touch-pan-x ensures perfectly smooth swiping on mobile devices */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pl-1 pr-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
              {upcomingDates.map((date, idx) => {
                const isSelected = selectedDate.fullDate.getDate() === date.dayNum;
                return (
                  <button 
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`relative flex flex-col items-center justify-center w-12 h-[72px] md:w-[56px] md:h-20 rounded-[12px] md:rounded-[14px] shrink-0 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#0033FF] text-white shadow-md shadow-blue-500/20 scale-105' 
                        : 'bg-[#F8F9FA] text-gray-600 hover:bg-gray-100 border border-gray-50'
                    }`}
                  >
                    <span className="font-extrabold text-lg md:text-[22px] leading-none">{date.dayNum}</span>
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-1 md:mt-1.5 opacity-80">{date.dayText}</span>
                  </button>
                );
              })}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full py-4 md:py-5 bg-[#0033FF] text-white hover:bg-blue-700 transition-colors duration-300 group flex justify-center items-center gap-2"
        >
          <span className="text-[10px] md:text-[11px] tracking-widest font-extrabold uppercase">Find Routes</span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* === PILL-SHAPED FLOATING BUTTON === */}
      <button
        onClick={handleMobileToggle}
        className={`group relative flex items-center justify-center gap-2 md:gap-2.5 h-12 md:h-14 rounded-full shadow-[0_10px_20px_rgba(0,51,255,0.2)] transition-all duration-500 ease-out border border-white/20 overflow-hidden ${
          isOpen ? 'bg-white w-12 md:w-14 cursor-pointer text-gray-400 hover:text-gray-900 border-gray-200' : 'bg-[#0033FF] px-5 md:px-7 hover:bg-blue-700 hover:scale-105 hover:-translate-y-1 cursor-default text-white'
        }`}
      >
        {isOpen ? (
          <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <>
            <svg className="w-4 h-4 md:w-5 md:h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            
            <span className="tracking-widest font-extrabold text-[9px] md:text-[10px] uppercase whitespace-nowrap mt-0.5">
              Plan Trip
            </span>
          </>
        )}
      </button>

    </div>
  );
}