import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Cabin() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  // Converted direct Google Drive link
const videoUrl = "/landing page.mp4";
  useGSAP(() => {
    // Subtle parallax on the background
    gsap.to(bgRef.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Text reveal
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
      }
    );
  }, { scope: containerRef });

  // Start the video at 17 seconds as soon as it loads
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 17;
    }
  };

  // When the video ends, reset it back to 17 seconds and play again
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 17;
      videoRef.current.play();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0c0a09]"
    >
      {/* Background video with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-[-15%] z-0"
        style={{ top: '-15%', bottom: '-15%' }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Overlay layers */}
      <div className="absolute inset-0 z-[1] bg-[#0c0a09]/10"></div>
      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 90%, #0c0a09 40%)',
        }}
      ></div>

      {/* Horizontal grain lines */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #f6ead6 0px, #f6ead6 1px, transparent 1px, transparent 8px)',
        }}
      ></div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center gap-8 px-6">
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-[#d85a2b] font-bold opacity-80">
          Volvo 9600 SLX
        </p>

        <h2 className="font-['Libre_Bodoni'] text-[#f6ead6] text-5xl md:text-7xl lg:text-[8rem] tracking-wide leading-[1.05] drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
          Your Private<br />Cabin,<br />In Motion.
        </h2>

        {/* Thin rule */}
        <div className="w-[1px] h-12 bg-[#f6ead6]/20"></div>

        {/* CTA */}
        <a
          href="#book"
          className="group inline-flex items-center gap-4 border border-[#f6ead6]/20 hover:border-[#d85a2b] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#d85a2b]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold text-[#f6ead6] group-hover:text-[#d85a2b] transition-colors duration-300">
            Book Ticket
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#f6ead6] group-hover:text-[#d85a2b] group-hover:translate-x-1 transition-all duration-300"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-8 left-8 md:left-16 z-10">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#f6ead6]/20 font-medium">
          17.6868° N, 83.2185° E
        </p>
      </div>
      <div className="absolute bottom-8 right-8 md:right-16 z-10">
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#f6ead6]/20 font-medium">
          Cabin Class — Premium Sleeper
        </p>
      </div>
    </section>
  );
}