import { useState } from 'react';

export default function BookingConfirmed({ bookingData, onReset }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] font-sans flex flex-col items-center justify-center p-6 relative">
      
      {/* Top Right Close Button (from image) */}
      <button 
        onClick={onReset}
        className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 text-[10px] font-extrabold tracking-widest uppercase text-gray-500 hover:text-[#0033FF] transition-colors bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Back to site
      </button>

      {/* Main Success Card */}
      <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-xl w-full animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
        
        {/* Animated Success Icon */}
        <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-[0_0_0_4px_rgba(239,246,255,1)] flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full border-2 border-blue-100 animate-ping"></div>
          <div className="w-16 h-16 rounded-full bg-[#0033FF] flex items-center justify-center shadow-lg shadow-blue-500/30 z-10">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-[10px] font-extrabold tracking-widest uppercase text-[#0033FF] mb-4">
          Booking confirmed
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
          Your journey <br />
          <span className="text-[#0033FF]">awaits.</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm font-medium text-gray-500 max-w-sm mb-10 leading-relaxed">
          A confirmation has been sent to your email. We look forward to having you on board.
        </p>

        {/* CTA Button */}
        <button
          onClick={onReset}
          className="bg-[#0033FF] hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xs font-extrabold tracking-widest uppercase shadow-md shadow-blue-500/20 transition-all flex items-center gap-3 group"
        >
          Book another route
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        
      </div>
    </div>
  );
}