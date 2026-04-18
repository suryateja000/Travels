import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const containerRef = useRef(null);
  const busWrapperRef = useRef(null);
  const exteriorRef = useRef(null);
  const interiorRef = useRef(null);
  const hotspotsRef = useRef(null);

  
  const features = [
    {
      id: "privacy",
      title: "PRIVATE BERTHS",
      desc: "Quiet, personal space.",
      top: "37%",  
      left: "38%", 
      layout: "bottom-full left-1/2 -translate-x-1/2 mb-1 md:mb-3 flex-col-reverse items-center",
      lineClass: "w-[1px] h-12 md:h-20 origin-bottom", 
      textAlign: "text-center pb-2 md:pb-4 w-max max-w-[100px] md:max-w-[220px]" 
    },
    {
      id: "climate",
      title: "ORTHOPEDIC MATTRESSES",
      desc: "Vibration-absorbing foam.",
      top: "49%",
      left: "60%", 
      layout: "bottom-full left-1/2 -translate-x-1/2 mb-1 md:mb-3 flex-col-reverse items-center",
      lineClass: "w-[1px] h-20 md:h-32 origin-bottom", 
      textAlign: "text-center pb-2 md:pb-4 w-max max-w-[100px] md:max-w-[220px]"
    },
    {
      id: "facilities",
      title: "ONBOARD RESTROOM",
      desc: "Sanitized amenities.",
      top: "58%",  
      left: "29%", 
      layout: "top-full left-1/2 -translate-x-1/2 mt-1 md:mt-3 flex-col items-center",
      lineClass: "w-[1px] h-10 md:h-20 origin-top", 
      textAlign: "text-center pt-2 md:pt-4 w-max max-w-[100px] md:max-w-[220px]"
    },
    {
      id: "comfort",
      title: "PERSONAL CLIMATE",
      desc: "Adjustable AC vents.",
      top: "66%",  
      left: "50%", 
      layout: "top-full left-1/2 -translate-x-1/2 mt-1 md:mt-3 flex-col items-center",
      lineClass: "w-[1px] h-12 md:h-20 origin-top", 
      textAlign: "text-center pt-2 md:pt-4 w-max max-w-[120px] md:max-w-[220px]"
    },
    {
      id: "safety",
      title: "VOLVO SAFETY",
      desc: "Advanced stability.",
      top: "50%",
      left: "68%", 
      layout: "top-full left-1/2 -translate-x-1/2 mt-1 md:mt-3 flex-col items-center",
      lineClass: "w-[1px] h-10 md:h-20 origin-top", 
      textAlign: "text-center pt-2 md:pt-4 w-max max-w-[120px] md:max-w-[220px]"
    }
  ];


  useGSAP(() => {
    gsap.set(busWrapperRef.current, { x: "-100vw", scale: 1 });
    gsap.set(interiorRef.current, { opacity: 0 });

    const dots = gsap.utils.toArray('.hotspot-dot');
    const lines = gsap.utils.toArray('.hotspot-line');
    const texts = gsap.utils.toArray('.hotspot-text');
    
    gsap.set(dots, { scale: 0 });
    gsap.set(lines, { scale: 0 }); 
    gsap.set(texts, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });

    tl.to(busWrapperRef.current, { x: "0vw", duration: 1.5, ease: "power2.inOut" })
      .to(exteriorRef.current, { opacity: 0, duration: 0.6, ease: "none" }, "+=0.2") 
      .to(interiorRef.current, { opacity: 1, duration: 0.6, ease: "none" }, "<") 
      .to(dots, { scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" })
      .to(lines, { scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.1")
      .to(texts, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.2");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-transparent text-[#181311] z-20">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-8 md:top-12 left-6 md:left-16 z-20 pointer-events-none pr-6">
          <h2 className="font-display text-4xl md:text-7xl font-normal tracking-wide uppercase leading-[1.1] md:leading-[0.9] text-[#181311]">
            Volvo 9600<br className="md:hidden" /> slx
          </h2>
          <div className="w-10 md:w-16 h-[3px] md:h-[4px] bg-[#d85a2b] mt-3 md:mt-5"></div>
          <p className="text-[10px] md:text-sm font-mono tracking-[0.3em] font-bold text-[#181311]/60 uppercase mt-3 md:mt-6">Internal Systems</p>
        </div>

        <div className="w-full h-full flex items-center justify-center mt-8 md:mt-0">
          <div ref={busWrapperRef} className="relative w-[140vw] sm:w-[120vw] md:w-[75vw] shrink-0 aspect-[3/1] flex items-center justify-center will-change-transform">
            <img 
              ref={exteriorRef}
              src="/bus-exterior.png" 
              alt="Volvo Bus Exterior"
              className="absolute w-full h-full object-contain object-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] md:drop-shadow-[0_45px_65px_rgba(0,0,0,0.25)]"
            />

            <img 
              ref={interiorRef}
              src="/bus-interior.png" 
              alt="Volvo Bus Interior"
              className="absolute w-full h-full object-contain object-center mix-blend-multiply"
            />
            
            <div ref={hotspotsRef} className="absolute inset-0 z-10 pointer-events-none">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="absolute block" 
                  style={{ top: feature.top, left: feature.left }}
                >
                  <div className="relative flex items-center justify-center w-5 h-5 -ml-[10px] -mt-[10px]">
                    <div className="hotspot-dot absolute w-2.5 h-2.5 md:w-3 md:h-3 bg-[#d85a2b] rounded-full"></div>
                    <div className="hotspot-dot absolute w-full h-full border-2 border-[#d85a2b] rounded-full animate-ping opacity-50 hidden md:block"></div>
                  </div>

                  <div className={`absolute flex ${feature.layout}`}>
                    <div className={`hotspot-line bg-[#d85a2b]/60 ${feature.lineClass}`}></div>
                    <div className={`hotspot-text ${feature.textAlign}`}>
                      <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] font-bold text-[#d85a2b] uppercase mb-0 md:mb-2 leading-tight md:leading-normal">{feature.title}</p>
                      {/* Subtext explicitly set to dark color for readability */}
                      <p className="hidden md:block text-sm text-[#181311]/80 leading-relaxed font-medium">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}