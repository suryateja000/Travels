import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01',
    title: 'Transparent Fares',
    desc: 'No hidden charges. The price you see is the price you pay — down to the last rupee.',
  },
  {
    num: '02',
    title: 'Curated Cabins',
    desc: 'Orthopedic berths, personal climate, and sanitized interiors. Every seat, a private retreat.',
  },
  {
    num: '03',
    title: 'Frictionless Booking',
    desc: 'A streamlined digital experience that takes you from search to confirmed in under a minute.',
  },
  {
    num: '04',
    title: 'Concierge Crew',
    desc: 'Trained staff. Handled luggage. A seamless check-in that begins before you board.',
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0f0d0b] py-28 md:py-40 px-8 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div ref={headingRef} className="max-w-7xl mx-auto mb-20 md:mb-28">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#d85a2b] font-bold mb-5">
          The Standard
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-['Libre_Bodoni'] text-[#f6ead6] text-4xl md:text-6xl lg:text-7xl tracking-wide leading-[1.1]">
            The Charan<br />Standard.
          </h2>
          <p className="text-[#f6ead6]/40 text-sm md:text-base font-light max-w-sm leading-relaxed md:text-right">
            Premium intercity travel, refined to its essence. Every detail considered. Every journey, deliberate.
          </p>
        </div>
        {/* Rule */}
        <div ref={lineRef} className="w-full h-[1px] bg-[#f6ead6]/10 mt-12 origin-left"></div>
      </div>

      {/* Feature grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative border-r border-[#f6ead6]/8 last:border-r-0 px-0 md:px-10 py-10 md:py-0 first:pl-0 cursor-default"
          >
            {/* Number */}
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#f6ead6]/20 uppercase mb-8 font-bold group-hover:text-[#d85a2b] transition-colors duration-500">
              {feature.num}
            </p>

            {/* Title */}
            <h3 className="font-['Libre_Bodoni'] text-[#f6ead6] text-xl md:text-2xl tracking-wide leading-tight mb-5 group-hover:text-[#f6ead6] transition-colors duration-300">
              {feature.title}
            </h3>

            {/* Desc */}
            <p className="text-[#f6ead6]/40 text-sm leading-relaxed font-light group-hover:text-[#f6ead6]/60 transition-colors duration-500">
              {feature.desc}
            </p>

            {/* Bottom accent line */}
            <div className="mt-10 w-6 h-[2px] bg-[#d85a2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500 origin-left"></div>
          </div>
        ))}
      </div>
    </section>
  );
}