import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumBackground() {
  const containerRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useGSAP(() => {
    // This timeline links the movement of the soft lighting to the user's scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // A higher scrub number makes the movement feel heavier and more luxurious
      }
    });

    // Gently drift and scale the warm orbs around the screen
    tl.to(orb1Ref.current, { y: "40vh", x: "-10vw", scale: 1.3, duration: 1 }, 0)
      .to(orb2Ref.current, { y: "-30vh", x: "20vw", scale: 1.5, duration: 1 }, 0)
      .to(orb3Ref.current, { y: "50vh", x: "-20vw", scale: 0.9, duration: 1 }, 0);

  }, { scope: containerRef });

  return (
    // The base color is a very clean, warm off-white
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden bg-[#FCFAF8] pointer-events-none">
      
      {/* THE WARM BISCUIT ORBS */}
      {/* Top Right: The primary biscuit color */}
      <div ref={orb1Ref} className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-[#FFE0AE] mix-blend-multiply blur-[120px] opacity-70 will-change-transform"></div>
      
      {/* Bottom Left: A slightly deeper, muted cream for contrast */}
      <div ref={orb2Ref} className="absolute bottom-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-[#F6EAD6] mix-blend-multiply blur-[140px] opacity-80 will-change-transform"></div>
      
      {/* Center/Drifting: A bright, light golden-peach for highlights */}
      <div ref={orb3Ref} className="absolute top-[30%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#FFF2D4] mix-blend-multiply blur-[100px] opacity-60 will-change-transform"></div>

      {/* THE FROSTED GLASS LAYER */}
      {/* This blends the hard circles into a seamless, silky gradient */}
      <div className="absolute inset-0 backdrop-blur-[80px] bg-white/30"></div>

      {/* SUBTLE GRAIN (Optional luxury detail) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}