// import { useState } from 'react';

// const dates = [
//   { label: 'Today, 21 Apr',     value: '2026-04-21' },
//   { label: 'Tomorrow, 22 Apr',  value: '2026-04-22' },
//   { label: '23 Apr',            value: '2026-04-23' },
//   { label: '24 Apr',            value: '2026-04-24' },
// ];

// export default function BookingSearch({ onSearch }) {
//   const [from, setFrom]     = useState('Hyderabad');
//   const [to, setTo]         = useState('Bangalore');
//   const [date, setDate]     = useState(dates[0]);

//   const handleSubmit = () => {
//     if (!from.trim() || !to.trim()) return;
//     onSearch({ from, to, date });
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F2EE] flex flex-col items-center justify-center px-6">
//       <div className="w-full max-w-xl">

//         {/* Eyebrow */}
//         <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#d85a2b] font-bold mb-4">
//           Begin your journey
//         </p>

//         {/* Heading */}
//         <h1 className="font-['Libre_Bodoni'] text-[#181311] text-4xl md:text-5xl leading-tight mb-3">
//           Where are you headed?
//         </h1>
//         <p className="text-[#181311]/50 text-sm font-light mb-10">
//           Choose your route and we'll find the finest available departures.
//         </p>

//         {/* Fields */}
//         <div className="flex flex-col gap-0">
//           {/* Origin */}
//           <div className="flex items-center gap-4 py-5 border-t border-[#181311]/10">
//             <svg className="w-4 h-4 text-[#181311]/30 shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <circle cx="9" cy="9" r="6"/><circle cx="9" cy="9" r="2" fill="currentColor" stroke="none"/>
//             </svg>
//             <div className="flex-1">
//               <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#181311]/40 font-bold mb-1">Origin</p>
//               <input
//                 type="text"
//                 value={from}
//                 onChange={e => setFrom(e.target.value)}
//                 placeholder="Departure city"
//                 className="w-full bg-transparent text-[#181311] text-lg font-light outline-none placeholder-[#181311]/25"
//               />
//             </div>
//           </div>

//           {/* Swap */}
//           <div className="flex items-center gap-4 py-5 border-t border-[#181311]/10">
//             <svg className="w-4 h-4 text-[#181311]/30 shrink-0" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M9 2C6.24 2 4 4.24 4 7c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" fill="currentColor" stroke="none" opacity="0.4"/>
//               <circle cx="9" cy="7" r="2" fill="white" stroke="none"/>
//             </svg>
//             <div className="flex-1">
//               <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#181311]/40 font-bold mb-1">Destination</p>
//               <input
//                 type="text"
//                 value={to}
//                 onChange={e => setTo(e.target.value)}
//                 placeholder="Arrival city"
//                 className="w-full bg-transparent text-[#181311] text-lg font-light outline-none placeholder-[#181311]/25"
//               />
//             </div>
//           </div>

//           {/* Date */}
//           <div className="flex items-start gap-4 py-5 border-t border-b border-[#181311]/10">
//             <svg className="w-4 h-4 text-[#181311]/30 shrink-0 mt-1" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <rect x="2" y="3" width="14" height="13" rx="2"/>
//               <path d="M2 7h14M6 1v4M12 1v4"/>
//             </svg>
//             <div className="flex-1">
//               <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#181311]/40 font-bold mb-3">Departure Date</p>
//               <div className="flex flex-wrap gap-2">
//                 {dates.map(d => (
//                   <button
//                     key={d.value}
//                     onClick={() => setDate(d)}
//                     className={`px-4 py-2 rounded-full border text-sm font-light transition-all duration-200 ${
//                       date.value === d.value
//                         ? 'border-[#181311] bg-[#f6ead6] text-[#181311] font-medium'
//                         : 'border-[#181311]/15 text-[#181311]/60 hover:border-[#181311]/40'
//                     }`}
//                   >
//                     {d.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-8">
//           <button
//             onClick={handleSubmit}
//             className="flex items-center gap-3 bg-[#181311] text-[#f6ead6] px-8 py-4 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#d85a2b] transition-colors duration-300"
//           >
//             Find routes
//             <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <path d="M2 8h12M8 2l6 6-6 6"/>
//             </svg>
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// // }
// import { useState } from 'react';

// const dates = [
//   { day: 'MON', date: '12', value: '2026-04-12' },
//   { day: 'TUE', date: '13', value: '2026-04-13' },
//   { day: 'WED', date: '14', value: '2026-04-14' },
//   { day: 'THU', date: '15', value: '2026-04-15' },
//   { day: 'FRI', date: '16', value: '2026-04-16' },
//   { day: 'SAT', date: '17', value: '2026-04-17' },
// ];

// export default function BookingSearch({ onSearch }) {
//   const [from, setFrom] = useState('Mumbai');
//   const [to, setTo] = useState('Goa');
//   const [selectedDate, setSelectedDate] = useState(dates[1]); // Default to TUE 13

//   const handleSubmit = () => {
//     if (!from.trim() || !to.trim()) return;
//     onSearch?.({ from, to, date: selectedDate.value });
//   };

//   const handleSwap = () => {
//     setFrom(to);
//     setTo(from);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FA] text-[#111827] font-sans flex flex-col justify-center">

//       {/* Main Content */}
//       <main className="w-full max-w-7xl mx-auto px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
//         {/* Left Column: Typography */}
//         <div className="flex flex-col justify-center">
//           <div className="flex items-center justify-between border-t-4 border-blue-600 pt-2 mb-6 w-full max-w-sm">
//             <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Trip Details</p>
//             <p className="text-[10px] font-bold tracking-widest text-gray-500">01 / 03</p>
//           </div>

//           <h1 className="text-5xl md:text-[4.5rem] font-extrabold leading-[0.9] tracking-tighter mb-4 text-[#2D2D2D]">
//             Where are<br />you<br />
//             <span className="text-blue-600 italic">headed?</span>
//           </h1>
          
//           <p className="text-gray-600 mb-6 max-w-md leading-relaxed text-sm">
//             Experience travel that moves with you. Select your route and let the journey begin with high-velocity precision.
//           </p>
//         </div>

//         {/* Right Column: Booking Form */}
//         <div className="flex flex-col justify-center space-y-4">
          
//           {/* Location Picker */}
//           <div className="bg-white rounded-[1.5rem] p-3 flex items-center relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
//             <div className="flex-1 bg-[#F5F5F5] p-4 rounded-xl mr-2">
//               <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-1">From</p>
//               <div className="flex items-center gap-2 mb-1">
//                 <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
//                 <input 
//                   type="text" 
//                   value={from} 
//                   onChange={e => setFrom(e.target.value)}
//                   className="font-bold text-lg bg-transparent outline-none w-full"
//                 />
//               </div>
//               <p className="text-[10px] text-gray-500 ml-6 truncate">Chhatrapati Shivaji Terminal</p>
//             </div>

//             <button 
//               onClick={handleSwap}
//               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 transition z-10"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
//             </button>

//             <div className="flex-1 bg-[#F5F5F5] p-4 rounded-xl ml-2 pl-8">
//               <p className="text-[10px] font-bold tracking-wider text-[#B74134] uppercase mb-1">To</p>
//               <div className="flex items-center gap-2 mb-1">
//                 <svg className="w-4 h-4 text-[#B74134] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
//                 <input 
//                   type="text" 
//                   value={to} 
//                   onChange={e => setTo(e.target.value)}
//                   className="font-bold text-lg bg-transparent outline-none w-full"
//                 />
//               </div>
//               <p className="text-[10px] text-gray-500 ml-6 truncate">Panjim Central Terminal</p>
//             </div>
//           </div>

//           {/* Date Picker */}
//           <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-[10px] font-bold tracking-wider text-gray-800 uppercase">Select Departure Date</p>
//               <div className="flex gap-2">
//                 <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">&lt;</button>
//                 <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">&gt;</button>
//               </div>
//             </div>
            
//             <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
//               {dates.map((d) => (
//                 <button
//                   key={d.value}
//                   onClick={() => setSelectedDate(d)}
//                   className={`flex flex-col items-center justify-center min-w-[64px] h-[72px] rounded-xl transition ${
//                     selectedDate.value === d.value 
//                       ? 'bg-blue-600 text-white shadow-md' 
//                       : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   <span className="text-[9px] font-bold tracking-wider mb-0.5 uppercase">{d.day}</span>
//                   <span className="text-xl font-extrabold">{d.date}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Travelers & Submit */}
//           <div className="flex gap-4">
//             <div className="bg-[#6EF3D6] rounded-[1.5rem] p-5 flex-1 flex flex-col justify-center relative">
//               <p className="text-[10px] font-bold tracking-wider text-[#0B6B56] uppercase mb-1">Travelers</p>
//               <p className="text-xl font-extrabold text-[#0B6B56]">01 Adult</p>
//               <svg className="w-5 h-5 text-[#0B6B56] absolute right-4 bottom-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
//             </div>
            
//             <button 
//               onClick={handleSubmit}
//               className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] p-5 flex-[1.5] flex items-center justify-between transition group shadow-lg shadow-blue-600/20"
//             >
//               <span className="text-lg font-bold ml-2">Find Routes</span>
//               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
//               </div>
//             </button>
//           </div>
          
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className="max-w-7xl mx-auto w-full px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-5">
//         <div className="bg-[#F0F0F0] rounded-[1.5rem] p-6">
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
//             <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3v10h8l-10 10v-10H3l10-10z"/></svg>
//           </div>
//           <h3 className="font-bold text-base mb-1">Instant Booking</h3>
//           <p className="text-gray-500 text-xs leading-relaxed">Secure your seat in seconds with our high-velocity kinetic checkout flow.</p>
//         </div>
        
//         <div className="bg-[#F0F0F0] rounded-[1.5rem] p-6">
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
//             <svg className="w-4 h-4 text-[#B74134]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
//           </div>
//           <h3 className="font-bold text-base mb-1">Premium Safety</h3>
//           <p className="text-gray-500 text-xs leading-relaxed">The Kinetic Voyager standard ensures top-tier maintenance and vetted pilots.</p>
//         </div>

//         <div className="bg-[#F0F0F0] rounded-[1.5rem] p-6">
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
//             <svg className="w-4 h-4 text-[#0B6B56]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 5.92L9 11.8V5.92L17 5.92zm2-2H7v11.16L22 4.15V3.92zM7 19.08L15 13.2v5.88H7v-5.88zM5 22h10v-11.16L0 19.85V20.08z"/></svg>
//           </div>
//           <h3 className="font-bold text-base mb-1">Green Routes</h3>
//           <p className="text-gray-500 text-xs leading-relaxed">Sustainable travel initiatives for every mile covered on our network.</p>
//         </div>
//       </section>

//     </div>
//   );
// }


import { useState } from 'react';

const dates = [
  { day: 'MON', date: '12', value: '2026-04-12' },
  { day: 'TUE', date: '13', value: '2026-04-13' },
  { day: 'WED', date: '14', value: '2026-04-14' },
  { day: 'THU', date: '15', value: '2026-04-15' },
  { day: 'FRI', date: '16', value: '2026-04-16' },
  { day: 'SAT', date: '17', value: '2026-04-17' },
];

export default function BookingSearch({ onSearch }) {
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Goa');
  const [selectedDate, setSelectedDate] = useState(dates[1]); // Default to TUE 13

  const handleSubmit = () => {
    if (!from.trim() || !to.trim()) return;
    onSearch?.({ from, to, date: selectedDate.value });
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] font-sans flex flex-col justify-center py-6 sm:py-10">

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Typography */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between border-t-4 border-blue-600 pt-2 mb-6 w-full max-w-sm">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Trip Details</p>
            <p className="text-[10px] font-bold tracking-widest text-gray-500">01 / 03</p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold leading-tight md:leading-[0.9] tracking-tighter mb-4 text-[#2D2D2D]">
            Where are<br className="hidden sm:block" /> you<br className="hidden sm:block" />
            <span className="text-blue-600 italic"> headed?</span>
          </h1>
          
          <p className="text-gray-600 mb-6 max-w-md leading-relaxed text-sm sm:text-base">
            Experience travel that moves with you. Select your route and let the journey begin with high-velocity precision.
          </p>
        </div>

        {/* Right Column: Booking Form */}
        <div className="flex flex-col justify-center space-y-4">
          
          {/* Location Picker */}
          <div className="bg-white rounded-[1.5rem] p-2 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] gap-2 sm:gap-0">
            <div className="flex-1 bg-[#F5F5F5] p-4 rounded-xl sm:mr-2">
              <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-1">From</p>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <input 
                  type="text" 
                  value={from} 
                  onChange={e => setFrom(e.target.value)}
                  className="font-bold text-lg bg-transparent outline-none w-full"
                />
              </div>
              <p className="text-[10px] text-gray-500 ml-6 truncate">Chhatrapati Shivaji Terminal</p>
            </div>

            <button 
              onClick={handleSwap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg border-4 border-white hover:bg-blue-700 transition z-10 rotate-90 sm:rotate-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </button>

            <div className="flex-1 bg-[#F5F5F5] p-4 rounded-xl sm:ml-2 sm:pl-8">
              <p className="text-[10px] font-bold tracking-wider text-[#B74134] uppercase mb-1">To</p>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-[#B74134] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <input 
                  type="text" 
                  value={to} 
                  onChange={e => setTo(e.target.value)}
                  className="font-bold text-lg bg-transparent outline-none w-full"
                />
              </div>
              <p className="text-[10px] text-gray-500 ml-6 truncate">Panjim Central Terminal</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="bg-white rounded-[1.5rem] p-4 sm:p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-bold tracking-wider text-gray-800 uppercase">Select Departure Date</p>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">&lt;</button>
                <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">&gt;</button>
              </div>
            </div>
            
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center justify-center min-w-[60px] sm:min-w-[64px] h-[64px] sm:h-[72px] rounded-xl transition ${
                    selectedDate.value === d.value 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-wider mb-0.5 uppercase">{d.day}</span>
                  <span className="text-lg sm:text-xl font-extrabold">{d.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Travelers & Submit */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="bg-[#6EF3D6] rounded-[1.5rem] p-4 sm:p-5 flex-1 flex flex-col justify-center relative">
              <p className="text-[10px] font-bold tracking-wider text-[#0B6B56] uppercase mb-1">Travelers</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#0B6B56]">01 Adult</p>
              <svg className="w-5 h-5 text-[#0B6B56] absolute right-4 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            
            <button 
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] p-4 sm:p-5 flex-[1.5] flex items-center justify-between transition group shadow-lg shadow-blue-600/20"
            >
              <span className="text-base sm:text-lg font-bold ml-2">Find Routes</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </button>
          </div>
          
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-0">
        <div className="bg-[#F0F0F0] rounded-[1.25rem] sm:rounded-[1.5rem] p-5 sm:p-6">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3v10h8l-10 10v-10H3l10-10z"/></svg>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Instant Booking</h3>
          <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Secure your seat in seconds with our high-velocity kinetic checkout flow.</p>
        </div>
        
        <div className="bg-[#F0F0F0] rounded-[1.25rem] sm:rounded-[1.5rem] p-5 sm:p-6">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
            <svg className="w-4 h-4 text-[#B74134]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Premium Safety</h3>
          <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">The Kinetic Voyager standard ensures top-tier maintenance and vetted pilots.</p>
        </div>

        <div className="bg-[#F0F0F0] rounded-[1.25rem] sm:rounded-[1.5rem] p-5 sm:p-6">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
            <svg className="w-4 h-4 text-[#0B6B56]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 5.92L9 11.8V5.92L17 5.92zm2-2H7v11.16L22 4.15V3.92zM7 19.08L15 13.2v5.88H7v-5.88zM5 22h10v-11.16L0 19.85V20.08z"/></svg>
          </div>
          <h3 className="font-bold text-sm sm:text-base mb-1">Green Routes</h3>
          <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Sustainable travel initiatives for every mile covered on our network.</p>
        </div>
      </section>

    </div>
  );
}