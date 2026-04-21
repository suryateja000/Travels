import { useState } from 'react';

export default function PassengerDetails({ bookingData, onBack, onConfirm }) {
  const { searchParams, bus, seats, totalFare } = bookingData;
  const [form, setForm] = useState({ name: '', age: '', gender: 'Male', phone: '', email: '' });

  const handleConfirm = () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill in required fields.");
      return;
    }
    onConfirm({ ...bookingData, passengerInfo: form });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111827] font-sans flex flex-col pt-12 pb-12">
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 py-4 flex flex-col lg:flex-row gap-8 pb-12">
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-48 bg-gray-900">
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop" alt="Bus Interior" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="text-[#E88E36] text-[9px] font-extrabold tracking-widest uppercase mb-1">SELECTED JOURNEY</div>
                <div className="text-white text-lg font-extrabold tracking-tight uppercase">{bus.name}</div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-end pb-5 border-b border-gray-100">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">DEPARTURE DATE</div>
                  <div className="text-lg font-extrabold">{searchParams?.date || '24 Oct, 2023'}</div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <div className="flex-1 bg-[#F4F5F7] rounded-[1.25rem] p-4">
                  <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">SEATS</div>
                  <div className="flex flex-wrap gap-2">
                    {seats.map(seat => (
                      <div key={seat} className="bg-[#0033FF] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md">{seat}</div>
                    ))}
                  </div>
                </div>
                <div className="flex-[1.2] bg-[#F4F5F7] rounded-[1.25rem] p-4 flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">TOTAL AMOUNT</div>
                  <div className="text-xl font-extrabold">₹{totalFare.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight mb-2">PASSENGER DETAILS</h1>
            <p className="text-xs font-medium text-gray-500 mb-8">Please enter your information exactly as it appears on your travel ID.</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-2">
                <label className="block text-[9px] font-extrabold text-[#0033FF] tracking-widest uppercase mb-2">FULL NAME</label>
                <input type="text" placeholder="Johnathan Doe" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-[#F4F5F7] rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none border border-transparent focus:border-[#0033FF] transition" />
              </div>
              <div className="md:col-span-2 mt-2">
                <label className="block text-[9px] font-extrabold text-[#0033FF] tracking-widest uppercase mb-2">EMAIL ADDRESS</label>
                <input type="email" placeholder="john.doe@kinetic.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-[#F4F5F7] rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none border border-transparent focus:border-[#0033FF] transition" />
              </div>
              <div className="md:col-span-2 mt-2">
                <label className="block text-[9px] font-extrabold text-[#0033FF] tracking-widest uppercase mb-2">PHONE NUMBER</label>
                <div className="flex gap-2">
                  <input type="text" defaultValue="+91" className="w-16 bg-[#F4F5F7] rounded-xl px-2 py-3 text-sm font-bold text-gray-800 text-center outline-none border border-transparent focus:border-[#0033FF] transition" />
                  <input type="tel" placeholder="9876543210" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="flex-1 bg-[#F4F5F7] rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none border border-transparent focus:border-[#0033FF] transition" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button onClick={handleConfirm} className="flex-[2] bg-[#0033FF] hover:bg-blue-700 text-white py-3.5 rounded-xl text-xs font-extrabold tracking-widest shadow-md transition uppercase">
              Confirm Booking
            </button>
            <button onClick={onBack} className="flex-1 bg-[#E5E7EB] hover:bg-gray-300 text-gray-700 py-3.5 rounded-xl text-xs font-extrabold tracking-widest transition uppercase">
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}