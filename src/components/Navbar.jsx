import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${
        scrolled
          ? 'bg-[#0f0d0b]/90 backdrop-blur-md border-b border-[#f6ead6]/5'
          : 'bg-[#0f0d0b]/90'
      }`}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 py-5 md:py-6 flex items-center justify-between">

        {/* LEFT: Brand */}
        <a
          href="/"
          className="font-['Libre_Bodoni'] text-[#f6ead6] text-sm md:text-base tracking-[0.35em] uppercase font-normal select-none"
        >
          Charan Travels
        </a>

        {/* RIGHT: Nav Links */}
        <div className="flex items-center gap-8 md:gap-12 lg:gap-16">
          
            <a
              
              className="hidden md:block font-mono text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#f6ead6]/60 hover:text-[#f6ead6] transition-colors duration-300 font-medium"
            >
              VOLVO 9600 SLX
            </a>
          

          {/* BOOK — slightly elevated */}
          <a
  href="#book"
  className="bg-[#d85a2b] hover:bg-[#bf4f25] text-white font-mono text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-bold px-4 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
>
  Book
</a>
        </div>

      </div>
    </nav>
  );
}