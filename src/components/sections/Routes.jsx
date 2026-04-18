import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Routes() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // 9 Curated locations.
  const routes = [
    {
      id: "01", city: "Kashmir",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80",
      classes: "left-[4vw] md:left-[6vw] top-[6vh] md:top-[12vh] -rotate-6 md:-rotate-6", 
      z: 10
    },
    {
      id: "02", city: "Rajasthan",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
      classes: "left-[48vw] md:left-[22vw] top-[10vh] md:top-[8vh] rotate-6 md:rotate-3", 
      z: 20
    },
    {
      id: "03", city: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      classes: "left-[8vw] md:left-[14vw] top-[18vh] md:top-[42vh] -rotate-3 md:-rotate-12", 
      z: 30
    },
    {
      id: "04", city: "Varanasi",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
      classes: "left-[50vw] md:left-[32vw] top-[26vh] md:top-[48vh] rotate-8 md:rotate-6", 
      z: 40
    },
    {
      id: "05", city: "Meghalaya",
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&q=80", // Updated lush green image
      classes: "left-[6vw] md:left-[42vw] top-[34vh] md:top-[18vh] -rotate-8 md:-rotate-3", 
      z: 50
    },
    {
      id: "06", city: "Ladakh",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
      classes: "left-[52vw] md:left-[55vw] top-[40vh] md:top-[52vh] rotate-4 md:rotate-12", 
      z: 60
    },
    {
      id: "07", city: "Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      classes: "left-[10vw] md:left-[64vw] top-[48vh] md:top-[12vh] -rotate-12 md:-rotate-8", 
      z: 70
    },
    {
      id: "08", city: "Spiti",
      image: "https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?w=800&q=80",
      classes: "left-[45vw] md:left-[72vw] top-[54vh] md:top-[42vh] rotate-6 md:rotate-4", 
      z: 80
    },
    {
      id: "09", city: "Hampi",
      image: "https://i.pinimg.com/736x/5f/c7/33/5fc73327902f1043fa6cef603c7eff4f.jpg",
      classes: "left-[22vw] md:left-[80vw] top-[62vh] md:top-[16vh] -rotate-2 md:-rotate-6", 
      z: 90
    }
  ];

  useGSAP(() => {
    // 1. Instantly hide all 9 cards below the screen
    gsap.set(cardsRef.current, { 
      y: "150vh", // Increased drop depth so they have further to fly up
      opacity: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // 2. Animate them up to their zero-point (which is the CSS position defined in the array)
    tl.to(cardsRef.current, {
      y: "0vh",
      opacity: 1,
      stagger: 0.1, // Faster stagger since there are 9 cards now
      duration: 1.5,
      ease: "power3.out" 
    });

  }, { scope: containerRef });

  return (
    <section id="routes-section" ref={containerRef} className="relative w-full h-[500vh] bg-transparent z-20">
      {/* The sticky wrapper locks the viewport while you scroll down the 500vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          {/* CHANGED: Completely removed font-black. Added font-normal. */}
          <h2 className="font-display text-[22vw] md:text-[16vw] font-normal text-[#D4B895] leading-[0.8] uppercase text-center">
            Explore
            <br/>
            India
          </h2>
        </div>

        {/* The Scattered Cards */}
        <div className="relative w-full h-full max-w-[1800px] mx-auto">
          {routes.map((route, index) => (
            <div 
              key={route.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ zIndex: route.z }}
              // Adjusted card sizes: 42vw for the mobile zig-zag, 14vw for the wide desktop spread
              className={`absolute w-[42vw] md:w-[14vw] aspect-[3/4] bg-[#ffffff] p-2 md:p-3 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] will-change-transform ${route.classes}`}
            >
              {/* Image Container */}
              <div className="relative w-full h-[75%] rounded-md overflow-hidden group">
                <img 
                  src={route.image} 
                  alt={route.city} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              {/* Card Typography */}
              <div className="w-full h-[25%] flex flex-col justify-center px-1 pt-1 md:pt-2">
                {/* Dynamically sizing text based on city name length to prevent breaking */}
                <h3 className={`font-display font-bold uppercase tracking-tight text-[#181311] leading-none ${route.city.length > 8 ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                  {route.city}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}