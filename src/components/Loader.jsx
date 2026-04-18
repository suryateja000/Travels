import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ progress, isComplete }) {
  const loaderRef = useRef(null);
  const busRef = useRef(null);
  const wheel1Ref = useRef(null);
  const wheel2Ref = useRef(null);

  useGSAP(() => {
    // For a free-fall, the default center pivot point works best!
    gsap.set(busRef.current, { transformOrigin: "center center" });

    // 1. The Standard Drive (0% to 99%)
    if (!isComplete) {
      gsap.to(busRef.current, {
        left: `${progress}%`,
        xPercent: -progress,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to([wheel1Ref.current, wheel2Ref.current], {
        rotation: progress * 10.8, 
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // 2. The Cliff Drop Exit! (100%)
    if (isComplete) {
      const tl = gsap.timeline();
      
      // Step A: Force the bus exactly to the edge of the line
      tl.to(busRef.current, {
        left: '100%',
        xPercent: -100,
        duration: 0.2,
        ease: "none"
      });

      // Step B: The Fall
      const dropTime = 1; 

      // 1. Move horizontally just a bit so it clears the ledge
      tl.to(busRef.current, {
        x: 150, 
        duration: dropTime,
        ease: "none", 
      }, "drop"); // Tag to sync these animations

      // 2. Gravity takes over (accelerates downwards)
      tl.to(busRef.current, {
        y: window.innerHeight, // Fall past the bottom of the screen
        duration: dropTime,
        ease: "power2.in", // 'in' means it starts slow and speeds up falling
      }, "drop");

      // 3. The nose dips down heavily as it falls
      tl.to(busRef.current, {
        rotation: 75, 
        duration: dropTime * 0.8, // Finishes rotating slightly before it leaves screen
        ease: "power1.in",
      }, "drop");

      // 4. Wheels spin wildly in free-fall
      tl.to([wheel1Ref.current, wheel2Ref.current], {
        rotation: "+=1080", 
        duration: dropTime,
        ease: "none",
      }, "drop");
      
      // Step C: Lift the curtain to reveal the site!
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      }, "drop+=0.3"); 
    }
  }, [progress, isComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#4b5c3d] text-white overflow-hidden"
    >
      <div className="w-full max-w-3xl flex flex-col items-center px-12 relative">
        
        <h1 className="text-2xl md:text-4xl tracking-[0.4em] font-light uppercase mb-16 text-zinc-300">
          Preparing Journey
        </h1>

        {/* The Road Container */}
        <div className="w-full h-[2px] bg-zinc-800 relative mt-16">
          <div 
            ref={busRef}
            className="absolute bottom-[2px] w-24 h-10 bg-white rounded-md rounded-tr-2xl rounded-br-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10"
            style={{ left: '0%' }} 
          >
            <div className="absolute top-1.5 left-1.5 right-2 h-4 flex gap-1">
              <div className="bg-zinc-900 w-full h-full rounded-[2px]"></div>
              <div className="bg-zinc-900 w-full h-full rounded-[2px]"></div>
              <div className="bg-zinc-900 w-full h-full rounded-[2px]"></div>
              <div className="bg-zinc-900 w-[120%] h-full rounded-[2px] rounded-tr-lg"></div>
            </div>

            <div 
              ref={wheel1Ref}
              className="absolute -bottom-2 left-3 w-5 h-5 bg-zinc-300 border-[4px] border-zinc-900 rounded-full flex items-center justify-center"
            >
              <div className="w-full h-[2px] bg-zinc-900"></div>
            </div>

            <div 
              ref={wheel2Ref}
              className="absolute -bottom-2 right-4 w-5 h-5 bg-zinc-300 border-[4px] border-zinc-900 rounded-full flex items-center justify-center"
            >
              <div className="w-full h-[2px] bg-zinc-900"></div>
            </div>
            
            <div className="absolute bottom-2 -right-[1px] w-1.5 h-2.5 bg-yellow-400 rounded-l-full shadow-[5px_0_15px_rgba(250,204,21,0.5)]"></div>
          </div>

          {/* The Progress Line */}
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out z-0"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <div className="mt-8 text-sm tracking-[0.2em] text-black uppercase font-bold">
          Boarding... {progress}%
        </div>

      </div>
    </div>
  );
}