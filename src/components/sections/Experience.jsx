// import { useState } from 'react';

// const amenities = [
//   {
//     id: 'berth',
//     label: 'Private Berths',
//     image: '/berths.png', // Replace with your own image URL
//     desc: 'Fully enclosed sleeping berths with privacy curtains. Your personal space at 100 km/h.',
//   },
//   {
//     id: 'washroom',
//     label: 'Onboard Washroom',
//     image: '/washrooms.png', // Replace with your own image URL
//     desc: 'Sanitized onboard restroom — so the journey never has to stop for you.',
//   },
//   {
//     id: 'tv',
//     label: 'Personal TV',
//     image: '/personaltv.png', // Replace with your own image URL
//     desc: 'A private entertainment screen at every berth. Films, music, or silence — your call.',
//   },
//   {
//     id: 'wifi',
//     label: 'Onboard WiFi',
//     image: '/wifi.png', // Replace with your own image URL
//     desc: 'Stay connected or completely offline. High-speed WiFi available throughout the journey.',
//   },
//   {
//     id: 'safety',
//     label: 'CCTV Security',
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
//     desc: 'Full-cabin surveillance and a trained crew. Because peace of mind is part of the fare.',
//   },
// ];

// export default function Experience() {
//   // Start with the first item expanded
//   const [active, setActive] = useState(0);

//   return (
//     <section 
//       id="experience" 
//       className="w-full bg-[#181311] py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden"
//     >
//       {/* Section Header */}
//       <div className="w-full max-w-[90vw] md:max-w-[95vw] 2xl:max-w-7xl mb-12 md:mb-16 px-4 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#d85a2b] font-bold mb-4">
//             The Experience
//           </p>
//           <h2 className="font-['Libre_Bodoni'] text-[#f6ead6] text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.05]">
//             A Departure<br />Like No Other.
//           </h2>
//         </div>
//         <p className="text-[#f6ead6]/50 font-light max-w-xs text-sm md:text-base">
//           Interact with the panels below to explore the premium amenities designed for your absolute comfort.
//         </p>
//       </div>

//       {/* Expanding Interactive Gallery */}
//       <div className="w-full max-w-[90vw] md:max-w-[95vw] 2xl:max-w-7xl h-[65vh] md:h-[70vh] flex flex-col md:flex-row gap-2 md:gap-4 px-4 md:px-0">
//         {amenities.map((item, index) => {
//           const isActive = active === index;

//           return (
//             <div
//               key={item.id}
//               onClick={() => setActive(index)}
//               // The magic is here: flex transitions control the expanding/shrinking
//               className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)]
//                 ${isActive ? 'flex-[4] md:flex-[5]' : 'flex-[1] md:hover:flex-[1.2]'}
//               `}
//             >
//               {/* Background Image */}
//               <img
//                 src={item.image}
//                 alt={item.label}
//                 className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out
//                   ${isActive ? 'scale-100' : 'scale-110 group-hover:scale-105'}
//                 `}
//               />

//               {/* Gradient Overlays for text readability */}
//               <div 
//                 className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700
//                   ${isActive ? 'from-[#181311]/90 via-[#181311]/20 to-transparent opacity-100' : 'from-[#181311]/80 to-[#181311]/40 opacity-100'}
//                 `}
//               ></div>

//               {/* Content Container */}
//               <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                
//                 {/* Number Indicator (Always visible, moves based on state) */}
//                 <div className={`transition-all duration-700 delay-100 flex items-center gap-4
//                   ${isActive ? 'mb-4 translate-y-0 opacity-100' : 'mb-0 md:translate-y-4 opacity-50'}
//                 `}>
//                   <span className="font-mono text-xs md:text-sm tracking-widest text-[#d85a2b] font-bold">
//                     0{index + 1}
//                   </span>
//                   {isActive && <div className="h-[1px] w-12 bg-[#d85a2b]/50"></div>}
//                 </div>

//                 {/* Vertical Inactive Text (Hidden on mobile, shows on desktop when inactive) */}
//                 <div className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 whitespace-nowrap transition-all duration-500
//                   ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-300'}
//                 `}>
//                   <h3 className="font-['Libre_Bodoni'] text-[#f6ead6] text-2xl tracking-wide">
//                     {item.label}
//                   </h3>
//                 </div>

//                 {/* Active Content (Reveals when expanded) */}
//                 <div className={`transition-all duration-[800ms] ease-out
//                   ${isActive ? 'translate-y-0 opacity-100 max-h-48' : 'translate-y-8 opacity-0 max-h-0 md:max-h-none'}
//                 `}>
//                   <h3 className="font-['Libre_Bodoni'] text-[#f6ead6] text-3xl md:text-4xl lg:text-5xl mb-4 whitespace-nowrap">
//                     {item.label}
//                   </h3>
//                   <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
//                     <p className="text-[#f6ead6]/80 font-light text-sm md:text-base leading-relaxed max-w-md">
//                       {item.desc}
//                     </p>
                    
//                     {/* Small circular button */}
//                     <div className="shrink-0 w-12 h-12 rounded-full border border-[#f6ead6]/30 flex items-center justify-center group/btn hover:border-[#d85a2b] transition-colors duration-300">
//                        <svg className="w-5 h-5 text-[#f6ead6] group-hover/btn:text-[#d85a2b] group-hover/btn:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M5 12h14M12 5l7 7-7 7"/>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }









import { useState, useEffect } from 'react';

const amenities = [
  {
    id: 'berth',
    label: 'Private Berths',
    image: '/berths.png', // Replace with your own image URL
    desc: 'Fully enclosed sleeping berths with privacy curtains. Your personal space at 100 km/h.',
  },
  {
    id: 'washroom',
    label: 'Onboard Washroom',
    image: '/washrooms.png', // Replace with your own image URL
    desc: 'Sanitized onboard restroom — so the journey never has to stop for you.',
  },
  {
    id: 'tv',
    label: 'Personal TV',
    image: '/personaltv.png', // Replace with your own image URL
    desc: 'A private entertainment screen at every berth. Films, music, or silence — your call.',
  },
  {
    id: 'wifi',
    label: 'Onboard WiFi',
    image: '/wifi.png', // Replace with your own image URL
    desc: 'Stay connected or completely offline. High-speed WiFi available throughout the journey.',
  },
  {
    id: 'safety',
    label: 'CCTV Security',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
    desc: 'Full-cabin surveillance and a trained crew. Because peace of mind is part of the fare.',
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-play logic
  useEffect(() => {
    // If the user is hovering over the gallery, pause the auto-play
    if (isHovering) return;

    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % amenities.length);
    }, 2000); // Cycles every 4 seconds

    // Cleanup interval on unmount or when hover state changes
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section 
      id="experience" 
      className="w-full bg-[#181311] py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-[90vw] md:max-w-[95vw] 2xl:max-w-7xl mb-12 md:mb-16 px-4 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#d85a2b] font-bold mb-4">
            The Experience
          </p>
          <h2 className="font-['Libre_Bodoni'] text-[#f6ead6] text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.05]">
            A Departure<br />Like No Other.
          </h2>
        </div>
        <p className="text-[#f6ead6]/50 font-light max-w-xs text-sm md:text-base">
          Interact with the panels below to explore the premium amenities designed for your absolute comfort.
        </p>
      </div>

      {/* Expanding Interactive Gallery */}
      <div 
        className="w-full max-w-[90vw] md:max-w-[95vw] 2xl:max-w-7xl h-[65vh] md:h-[70vh] flex flex-col md:flex-row gap-2 md:gap-4 px-4 md:px-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {amenities.map((item, index) => {
          const isActive = active === index;

          return (
            <div
              key={item.id}
              // Changed from onClick to onMouseEnter
              onMouseEnter={() => setActive(index)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                ${isActive ? 'flex-[4] md:flex-[5]' : 'flex-[1] md:hover:flex-[1.2]'}
              `}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.label}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out
                  ${isActive ? 'scale-100' : 'scale-110 group-hover:scale-105'}
                `}
              />

              {/* Gradient Overlays for text readability */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700
                  ${isActive ? 'from-[#181311]/90 via-[#181311]/20 to-transparent opacity-100' : 'from-[#181311]/80 to-[#181311]/40 opacity-100'}
                `}
              ></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                
                {/* Number Indicator (Always visible, moves based on state) */}
                <div className={`transition-all duration-700 delay-100 flex items-center gap-4
                  ${isActive ? 'mb-4 translate-y-0 opacity-100' : 'mb-0 md:translate-y-4 opacity-50'}
                `}>
                  <span className="font-mono text-xs md:text-sm tracking-widest text-[#d85a2b] font-bold">
                    0{index + 1}
                  </span>
                  {isActive && <div className="h-[1px] w-12 bg-[#d85a2b]/50"></div>}
                </div>

                {/* Vertical Inactive Text (Hidden on mobile, shows on desktop when inactive) */}
                <div className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 whitespace-nowrap transition-all duration-500
                  ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 delay-300'}
                `}>
                  <h3 className="font-['Libre_Bodoni'] text-[#f6ead6] text-2xl tracking-wide">
                    {item.label}
                  </h3>
                </div>

                {/* Active Content (Reveals when expanded) */}
                <div className={`transition-all duration-[800ms] ease-out
                  ${isActive ? 'translate-y-0 opacity-100 max-h-48' : 'translate-y-8 opacity-0 max-h-0 md:max-h-none'}
                `}>
                  <h3 className="font-['Libre_Bodoni'] text-[#f6ead6] text-3xl md:text-4xl lg:text-5xl mb-4 whitespace-nowrap">
                    {item.label}
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <p className="text-[#f6ead6]/80 font-light text-sm md:text-base leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                    
                    {/* Small circular button */}
                    <div className="shrink-0 w-12 h-12 rounded-full border border-[#f6ead6]/30 flex items-center justify-center group/btn hover:border-[#d85a2b] transition-colors duration-300">
                       <svg className="w-5 h-5 text-[#f6ead6] group-hover/btn:text-[#d85a2b] group-hover/btn:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}