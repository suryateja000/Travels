import { useState } from 'react';

export default function PaymentPage({ bookingData, onBack, onConfirm }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  // Safely extract data with fallbacks
  const searchParams = bookingData?.searchParams || { from: 'Bangalore', to: 'Goa', date: 'Oct 24, 2024' };
  const bus = bookingData?.bus || { name: 'Premium Express' };
  const seats = bookingData?.seats || ['12A', '12B'];
  const numPersons = seats.length || 2;
  
  // Calculate Fare Breakdown
  const baseFare = (bus.price || 1225) * numPersons; 
  const taxes = 91.25 * numPersons; 
  const totalAmount = baseFare + taxes;

  const handleConfirm = () => {
    onConfirm({ ...bookingData, paymentMethod: selectedMethod, finalAmount: totalAmount });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] font-sans flex flex-col">
      

      {/* Stepper Navigation */}
      <div className="flex items-center justify-center py-6 w-full max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={onBack}>
          <div className="w-6 h-6 rounded-full bg-[#0033FF] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[9px] font-bold text-gray-900">Details</span>
        </div>
        
        <div className="h-[2px] w-20 bg-[#0033FF] mx-2 rounded-full mb-4"></div>
        
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-[#0033FF] text-[#0033FF] flex items-center justify-center shadow-sm">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <span className="text-[9px] font-bold text-[#0033FF]">Payment</span>
        </div>

        <div className="h-[2px] w-20 bg-gray-200 mx-2 rounded-full mb-4"></div>
        
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
          </div>
          <span className="text-[9px] font-bold text-gray-400">Ticket</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 py-2 flex flex-col lg:flex-row gap-6 pb-12">
        
        {/* Left Column: Journey Summary */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight mb-5 text-gray-800 leading-tight">
            Your <br/><span className="text-[#0033FF]">Journey.</span>
          </h1>

          <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 flex-1 flex flex-col">
            {/* Bus Image Header */}
            <div className="relative h-36 bg-gray-200 shrink-0">
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop" alt="Bus" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3">
                <div className="bg-[#6EF3D6] text-[#0B6B56] text-[9px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase shadow-sm">
                  {bus.name.includes('Premium') ? 'PREMIUM EXPRESS' : 'PREMIUM EXPRESS'}
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-end pb-4 border-b border-gray-100">
                <div>
                  <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-1">ROUTE</div>
                  <div className="text-base font-extrabold flex items-center gap-1.5">
                    {searchParams.from} <span className="text-[#0033FF] font-medium">→</span> {searchParams.to}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-1">DATE</div>
                  <div className="text-base font-extrabold text-gray-800">{searchParams.date}</div>
                </div>
              </div>

              {/* Seat Details */}
              <div className="py-4 border-b border-gray-100">
                <div className="bg-[#F8F9FA] rounded-xl p-3 flex items-center gap-3 border border-gray-50">
                  <div className="w-10 h-10 bg-[#F5CBA7]/50 rounded-lg flex items-center justify-center text-[#963b10]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2z M5 18v2a1 1 0 001 1h12a1 1 0 001-1v-2 M9 10V6a2 2 0 012-2h2a2 2 0 012 2v4"/></svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">SEAT NUMBER</div>
                    <div className="text-xs font-extrabold text-gray-900">
                      {seats.join(', ')} <span className="text-gray-400 font-medium ml-1">(Lower Berth)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fare Summary */}
              <div className="pt-4 mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Base Fare</span>
                  <span className="text-xs font-bold text-gray-800">₹{baseFare.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-gray-500">Tax & Fees</span>
                  <span className="text-xs font-bold text-gray-800">₹{taxes.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-extrabold text-gray-900">Total Amount</span>
                  <span className="text-xl font-extrabold text-[#0033FF]">₹{totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-3 bg-[#E8FAEB] rounded-lg p-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-[#0B6B56] rounded-full flex items-center justify-center text-white shrink-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-[10px] font-bold text-[#0B6B56]">Safe & Secure Transaction with 256-bit Encryption</span>
          </div>
        </div>

        {/* Right Column: Payment Methods */}
        <div className="flex-1 bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 mb-1">Payment Method</h2>
            <p className="text-xs font-medium text-gray-500 mb-6">Select your preferred way to pay</p>

            <div className="space-y-3">
              
              {/* UPI Option */}
              <div 
                onClick={() => setSelectedMethod('upi')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center transition-all ${
                  selectedMethod === 'upi' ? 'border-[#0033FF] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100/50 text-[#0033FF] flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-gray-900">UPI Payment</div>
                  <div className="text-[10px] font-medium text-gray-500 mt-0.5">GPay, PhonePe, Paytm, Any UPI App</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === 'upi' ? 'border-[#0033FF]' : 'border-gray-300'}`}>
                  {selectedMethod === 'upi' && <div className="w-2 h-2 bg-[#0033FF] rounded-full"></div>}
                </div>
              </div>

              {/* Card Option */}
              <div 
                onClick={() => setSelectedMethod('card')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center transition-all ${
                  selectedMethod === 'card' ? 'border-[#0033FF] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200 bg-[#F8F9FA]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#F5CBA7]/30 text-[#D95D2A] flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-gray-900">Credit / Debit Card</div>
                  <div className="text-[10px] font-medium text-gray-500 mt-0.5">Visa, Mastercard, RuPay, Amex</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === 'card' ? 'border-[#0033FF]' : 'border-gray-300'}`}>
                  {selectedMethod === 'card' && <div className="w-2 h-2 bg-[#0033FF] rounded-full"></div>}
                </div>
              </div>

              {/* Net Banking Option */}
              <div 
                onClick={() => setSelectedMethod('netbanking')}
                className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center transition-all ${
                  selectedMethod === 'netbanking' ? 'border-[#0033FF] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200 bg-[#F8F9FA]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#6EF3D6]/30 text-[#0B6B56] flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9v2h22V9L12 3zm-6.5 8.5v6H7v-6H5.5zm5 0v6H12v-6h-1.5zm5 0v6h1.5v-6h-1.5zM2 20v2h20v-2H2z"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-gray-900">Net Banking</div>
                  <div className="text-[10px] font-medium text-gray-500 mt-0.5">All major Indian banks supported</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === 'netbanking' ? 'border-[#0033FF]' : 'border-gray-300'}`}>
                  {selectedMethod === 'netbanking' && <div className="w-2 h-2 bg-[#0033FF] rounded-full"></div>}
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6">
            <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100">
              <div className="text-[9px] font-extrabold tracking-widest text-gray-400 uppercase mb-3">PAYMENT SUMMARY</div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-medium text-gray-500 mb-0.5">You will pay</div>
                  <div className="text-2xl font-extrabold text-gray-900 tracking-tight">₹{totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                </div>
                <button 
                  onClick={handleConfirm}
                  className="bg-[#0033FF] hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-xs font-extrabold tracking-wide shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5"
                >
                  Confirm Booking
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            
            <p className="text-[9px] text-center font-medium text-gray-500 mt-4 px-2">
              By clicking "Confirm Booking", you agree to our <a href="#" className="text-[#0033FF] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#0033FF] hover:underline">Refund Policy</a>.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}