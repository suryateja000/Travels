import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasScroll from '../CanvasScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ setProgress, setLoaded }) {
  const heroContainerRef = useRef(null);
  
  // Refs for the 4 main text acts
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null); 
  
  // Refs for the HUD elements and Scroll Indicator
  const hudTopRef = useRef(null);
  const hudBottomRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });

    // Added an initial empty tween to hold Act 1 perfectly still for a moment before fading
    tl.to({}, { duration: 0.5 }) 
    
      // ACT 1: Fades out and moves up (Increased durations to slow it down)
      .to(text1Ref.current, { opacity: 0, y: -40, filter: 'blur(8px)', duration: 1.5 })
      .to(scrollIndicatorRef.current, { opacity: 0, duration: 1.5 }, "<")
      
      // ACT 2: Slides up from below, holds longer, fades out
      .fromTo(text2Ref.current, { opacity: 0, y: 40, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 }, "-=0.5")
      // The +=1.5 acts as a "Hold" so the user can read it while scrolling
      .to(text2Ref.current, { opacity: 0, y: -40, filter: 'blur(8px)', duration: 1.5 }, "+=1.5")
      
      // ACT 3: Slides up, holds longer
      .fromTo(text3Ref.current, { opacity: 0, y: 40, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 }, "-=0.5")
      
      // THE CLEAN EXIT: Fade out Act 3 AND both technical HUDs
      .to([text3Ref.current, hudTopRef.current, hudBottomRef.current], { opacity: 0, duration: 1.5 }, "+=1.5")
      
      // FINAL ACT & BACKGROUND SHIFT: 
      // Background turns to Biscuit, and the massive center text fades in
      .to(heroContainerRef.current, { backgroundColor: "#f6ead6", duration: 1.5 }, "+=2")
      .fromTo(text4Ref.current, { opacity: 0, scale: 0.9, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: "power2.out" }, "<");

  }, { scope: heroContainerRef });

  return (
    <section 
      id="hero-scroll-container" 
      ref={heroContainerRef}
      style={{ backgroundColor: "#181311" }}
      // Increased from 300vh to 400vh to slow down the entire scroll speed
      className="relative w-full h-[400vh]" 
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12">
        
        {/* The Raw Video Canvas */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90">
          <CanvasScroll onProgress={setProgress} onComplete={() => setLoaded(true)} />
        </div> 

        {/* --- THE EDITORIAL HUD OVERLAY (TOP) --- */}
        <div ref={hudTopRef} className="relative z-10 flex justify-between w-full uppercase tracking-[0.3em] text-[10px] md:text-xs font-light text-[#f6ead6] opacity-60 transition-opacity">
          <span>Charan Travels</span>
          <span>Volvo 9600 SLX</span>
        </div>

        {/* Center-Left: Acts 1, 2, and 3 
          MOBILE FIX: Changed from justify-center to justify-start pt-24 on mobile.
          This pushes the text to the top on phones, but keeps it perfectly centered on Desktop. 
        */}
        <div className="relative z-10 flex-grow flex flex-col justify-start pt-[12vh] md:pt-0 md:justify-center w-full max-w-5xl pointer-events-none">
          <div className="relative w-full">
            
            {/* Added top-0 on mobile, md:top-1/2 for desktop */}
            <h1 ref={text1Ref} className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 font-['Libre_Bodoni'] text-left text-[#f6ead6] text-5xl md:text-7xl lg:text-8xl tracking-wide leading-[1.1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              Awaken to the<br />Journey.
            </h1>

            <h1 ref={text2Ref} className="absolute opacity-0 left-0 top-0 md:top-1/2 md:-translate-y-1/2 font-['Libre_Bodoni'] text-left text-[#f6ead6] text-5xl md:text-7xl lg:text-8xl tracking-wide leading-[1.1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              Redefining<br />the Route.
            </h1>

            <h1 ref={text3Ref} className="absolute opacity-0 left-0 top-0 md:top-1/2 md:-translate-y-1/2 font-['Libre_Bodoni'] text-left text-[#f6ead6] text-5xl md:text-7xl lg:text-8xl tracking-wide leading-[1.1] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              The Dawn of<br />Premium<br />Travel.
            </h1>

          </div>
        </div>

        {/* ACT 4: Dead-Center, Massive "Cover" Text */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <h1 ref={text4Ref} className="opacity-0 font-['Libre_Bodoni'] text-center text-[#181311] text-6xl md:text-8xl lg:text-[12rem] tracking-tighter leading-none">
            Where the Journey<br />Begins...
          </h1>
        </div>

        {/* Bottom Bar: Geolocation & Scroll Indicator */}
        <div ref={hudBottomRef} className="relative z-10 flex items-end w-full pb-4 text-[#f6ead6] transition-opacity">
          
          <div className="flex flex-col gap-1 items-start uppercase tracking-[0.2em] text-[9px] md:text-[10px] opacity-40">
            <span>System Online</span>
            <span>17.6868° N, 83.2185° E</span>
          </div>

          <div ref={scrollIndicatorRef} className="absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
            <span className="uppercase tracking-[0.4em] text-[9px] [writing-mode:vertical-rl] rotate-180">Scroll</span>
            <div className="w-[1px] h-12 md:h-24 bg-[#f6ead6] opacity-30"></div>
          </div>

        </div>

      </div>
    </section>
  );
}