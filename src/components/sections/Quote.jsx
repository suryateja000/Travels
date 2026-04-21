import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: "Vikram S.",
    route: "Hyderabad — Bangalore",
    text: "I usually dread long bus rides, but this felt like a luxury hotel room on wheels. Slept like a baby.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya R.",
    route: "Chennai — Madurai",
    text: "The privacy of the enclosed berth changes everything. Impeccable service and the WiFi actually worked flawlessly.",
    rating: 5
  },
  {
    id: 3,
    name: "Anand M.",
    route: "Bangalore — Goa",
    text: "They aren't lying when they say it's 'the rarest luxury'. Arrived completely refreshed and ready for my meetings.",
    rating: 5
  },
  {
    id: 4,
    name: "Neha K.",
    route: "Mumbai — Pune",
    text: "The onboard washroom was spotless. The staff was incredibly polite. This is the only way I will travel from now on.",
    rating: 5
  },
  {
    id: 5,
    name: "Karan T.",
    route: "Hyderabad — Chennai",
    text: "Beautiful interiors, silent cabin, and no rough driving. A masterclass in premium travel.",
    rating: 5
  }
];

// Duplicate reviews to ensure the scroll track never runs empty
const extendedReviews = [...reviews, ...reviews, ...reviews];

export default function PromiseAndReviews() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const trackRef = useRef(null);

  const quoteText = "We don't sell tickets. We offer the rarest luxury of all — arriving where you intended, exactly when you planned.";
  const words = quoteText.split(" ");

  useGSAP(() => {
    // 1. Compact Quote Reveal (No Pinning)
    const wordElements = textRef.current.querySelectorAll('.word');
    
    gsap.fromTo(
      wordElements,
      { opacity: 0, filter: 'blur(8px)', y: 15 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        stagger: 0.03, // Faster stagger for a tighter feel
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', 
        },
      }
    );

    gsap.fromTo('.fade-ui', 
      { opacity: 0, y: 15 },
      { 
        opacity: 1, y: 0, duration: 1, stagger: 0.15,
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );

    // 2. High-Contrast Review Cards Scroll
    // The cards slide to the left automatically as the user scrolls down
    gsap.to(trackRef.current, {
      xPercent: -35, 
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%', 
        end: 'bottom top',   
        scrub: 1, // 1 second smooth catch-up
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f6ead6] py-24 md:py-32 overflow-hidden flex flex-col"
    >
      {/* ==================== COMPACT QUOTE HEADER ==================== */}
      <div className="max-w-5xl mx-auto flex flex-col items-center relative w-full px-6 md:px-16 mb-16 md:mb-24">
        
        <div className="fade-ui flex flex-col items-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-[#d85a2b] font-bold mb-4 text-center">
            Our Promise
          </p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#181311]/20 to-transparent"></div>
        </div>

        {/* Scaled down, elegant quote */}
        <h2 
          ref={textRef}
          className="font-['Libre_Bodoni'] text-[#181311] text-center leading-[1.2] tracking-tight flex flex-wrap justify-center max-w-4xl"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)' }}
        >
          {words.map((word, index) => (
            <span 
              key={index} 
              className="word mr-[0.8vw] md:mr-[0.6vw] mb-1 lg:mb-2 will-change-[filter,transform,opacity]"
            >
              {word}
            </span>
          ))}
        </h2>

        <div className="fade-ui flex items-center justify-center gap-4 mt-8">
          <div className="w-8 h-[1px] bg-[#181311]/15"></div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold">
            Charan Travels
          </p>
          <div className="w-8 h-[1px] bg-[#181311]/15"></div>
        </div>
      </div>

      {/* ==================== DARK REVIEW CARDS TRACK ==================== */}
      <div className="w-full relative flex items-center mt-4">
        
        {/* Soft edge masks to blend the track into the light background */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#f6ead6] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#f6ead6] to-transparent z-10 pointer-events-none"></div>

        {/* The moving track */}
        <div 
          ref={trackRef} 
          className="flex gap-4 md:gap-6 px-6 md:px-24 w-max will-change-transform"
        >
          {extendedReviews.map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              // Dark theme card styling applied here
              className="w-[280px] md:w-[400px] shrink-0 bg-[#0c0a09] shadow-2xl shadow-[#181311]/10 rounded-xl p-8 md:p-10 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-6 text-[#d85a2b]">
                  {[...Array(review.rating)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                
                {/* Light text on dark background */}
                <p className="font-['Libre_Bodoni'] text-[#f6ead6]/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="flex flex-col border-t border-[#f6ead6]/10 pt-5 mt-auto">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#f6ead6]">
                  {review.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d85a2b] mt-1.5">
                  {review.route}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}