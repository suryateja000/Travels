import { useState } from 'react';

// --- DUMMY DATA ---
const BUS_DATA = [
  {
    id: 1, name: 'Royal Scania Multi-Axle', badge: 'AC SLEEPER (2+1)', badgeStyle: 'bg-[#8CA3FF]/20 text-[#0033FF]',
    accentBar: 'bg-[#0033FF]', dep: '21:30', depLoc: 'MAJESTIC', arr: '05:15', arrLoc: 'GACHIBOWLI',
    dur: '07h 45m', stops: 'DIRECT', price: 1250, originalPrice: null, totalSeats: 4, dotColor: 'bg-[#0033FF]',
  },
  {
    id: 2, name: 'Greenline Electric Express', badge: 'ELECTRIC AC SEATER', badgeStyle: 'bg-[#6EF3D6] text-[#0B6B56]',
    accentBar: 'bg-[#0B6B56]', dep: '22:45', depLoc: 'HEBBAL', arr: '06:00', arrLoc: 'MGBS',
    dur: '07h 15m', stops: '1 STOP', price: 1299, originalPrice: 1500, totalSeats: 12, dotColor: 'bg-[#0B6B56]',
  }
];

const LOWER_DECK = [
  { id: 'L1', status: 'available' }, { id: 'L2', status: 'available' }, { id: 'L3', status: 'booked' },
  { id: 'L4', status: 'available' }, { id: 'L5', status: 'available' }, { id: 'L6', status: 'booked' },
  { id: 'L7', status: 'available' }, { id: 'L8', status: 'available' }, { id: 'L9', status: 'booked' }
];

const UPPER_DECK = [
  { id: 'U1', status: 'available' }, { id: 'U2', status: 'booked' },    { id: 'U3', status: 'available' },
  { id: 'U4', status: 'booked' },    { id: 'U5', status: 'booked' },    { id: 'U6', status: 'available' },
  { id: 'U7', status: 'available' }, { id: 'U8', status: 'booked' },    { id: 'U9', status: 'available' }
];

const BOARDING_POINTS = [
  { time: '21:30', loc: 'Majestic', desc: 'OPPOSITE METRO PILLAR 124' },
  { time: '22:00', loc: 'Hebbal', desc: 'BELOW FLY OVER, NEAR POLICE STATION' }
];

export default function BusList({ searchParams, onCheckout }) {
  const [sortTab, setSortTab] = useState('Cheapest');
  const [activeBusTypes, setActiveBusTypes] = useState(['Luxury Scania']);
  const [activeDepTimes, setActiveDepTimes] = useState(['4 PM - 11 PM']);

  const [expandedBusId, setExpandedBusId] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(['L7']); 
  const [selectedBoarding, setSelectedBoarding] = useState('21:30-Majestic');

  const toggleAccordion = (busId) => {
    if (expandedBusId === busId) {
      setExpandedBusId(null);
    } else {
      setExpandedBusId(busId);
      setSelectedSeats([]); 
      setSelectedBoarding('21:30-Majestic'); 
    }
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]);
  };

  const handleProceed = (bus) => {
    if (selectedSeats.length === 0) return;
    const totalTaxes = 84 * selectedSeats.length;
    const totalFare = (bus.price * selectedSeats.length) + totalTaxes;
    
    // Bundle everything together to pass to the next page
    onCheckout({ 
      searchParams, // Passed along to display on the next page
      bus, 
      seats: selectedSeats, 
      totalFare, 
      boarding: selectedBoarding 
    });
  };

  const renderDeck = (seats, title, hasWheel) => (
    <div className="flex-1 w-full sm:w-auto">
      <h4 className="text-[9px] font-bold text-gray-400 tracking-widest text-center mb-3">{title}</h4>
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm relative mx-auto w-fit">
        {hasWheel && (
          <div className="absolute top-3 right-3 text-gray-300">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        )}
        <div className="flex flex-col gap-2.5 mt-5">
          {[0, 1, 2].map(rowIdx => (
            <div key={rowIdx} className="flex justify-between w-full gap-5">
              <div className="flex gap-2">
                {seats.slice(rowIdx * 3, rowIdx * 3 + 2).map(seat => renderSeat(seat))}
              </div>
              <div className="pl-4">
                {renderSeat(seats[rowIdx * 3 + 2])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSeat = (seat) => {
    if (!seat) return <div className="w-8 h-8"></div>;
    const isSelected = selectedSeats.includes(seat.id);
    const isBooked = seat.status === 'booked';
    
    let baseClass = "w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold transition-all ";
    if (isBooked) baseClass += "bg-[#A3A3A3] text-transparent cursor-not-allowed";
    else if (isSelected) baseClass += "bg-[#0033FF] text-white shadow-sm shadow-blue-500/30";
    else baseClass += "bg-white border-[1.5px] border-[#80A6FF] text-[#0033FF] hover:bg-blue-50 cursor-pointer";

    return (
      <button key={seat.id} disabled={isBooked} onClick={() => toggleSeat(seat.id)} className={baseClass}>
        {!isBooked && seat.id}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111827] font-sans flex flex-col">
      {/* Stepper Navigation */}
      <div className="flex items-center justify-center py-6 gap-2 sm:gap-4 w-full px-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 bg-[#0033FF] rounded-full pr-4 pl-1 py-1 shadow-md shrink-0">
          <div className="w-6 h-6 rounded-full bg-white text-[#0033FF] flex items-center justify-center font-bold text-xs">2</div>
          <span className="font-bold text-xs text-white">Select Bus</span>
        </div>
        <div className="h-px w-8 sm:w-16 bg-gray-300 shrink-0"></div>
        <div className="flex items-center gap-1.5 bg-transparent rounded-full pr-3 pl-1 py-1 shrink-0">
          <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-xs">3</div>
          <span className="font-bold text-xs text-gray-400">Payment</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 flex flex-col lg:flex-row gap-6 pb-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
              <h2 className="text-base font-extrabold">Filters</h2>
            </div>
            {/* Bus Type Filter */}
            <div className="mb-6">
              <h3 className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-3">Bus Type</h3>
              <div className="space-y-3">
                {['AC Sleeper', 'Luxury Scania', 'Electric Intercity'].map(type => {
                  const isActive = activeBusTypes.includes(type);
                  return (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setActiveBusTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'bg-[#0033FF] border-[#0033FF]' : 'border-gray-300 group-hover:border-[#0033FF]'}`}>
                        {isActive && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {/* Departure Time */}
            <div className="mb-6">
              <h3 className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-3">Departure Time</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Before 10 AM', '10 AM - 4 PM', '4 PM - 11 PM', 'Night Owl'].map(time => {
                  const isActive = activeDepTimes.includes(time);
                  return (
                    <button key={time} onClick={() => setActiveDepTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time])} className={`py-2 px-1 rounded-lg text-[9px] font-bold transition-all ${isActive ? 'bg-[#0033FF] text-white shadow-sm shadow-blue-500/20' : 'border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Price Range */}
            <div>
              <h3 className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-3">Price Range</h3>
              <div className="relative h-1.5 bg-gray-200 rounded-full mb-2.5 mt-2">
                <div className="absolute left-[15%] right-[30%] h-full bg-[#0033FF] rounded-full"></div>
                <div className="absolute left-[35%] -top-1.5 w-4 h-4 bg-[#0033FF] rounded-full border-[3px] border-white shadow cursor-grab"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Bus List */}
        <div className="flex-1 flex flex-col w-full">
          <div className="bg-white rounded-[1.25rem] p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm border border-gray-100 mb-5 gap-3">
            <div className="pl-2">
              <h1 className="text-base font-extrabold mb-0.5">{BUS_DATA.length} Buses Found</h1>
              {/* DYNAMIC HEADER USING PROPS */}
              <p className="text-[10px] font-medium text-gray-500">
                {searchParams?.from || 'Origin'} <span className="text-[#0033FF]">→</span> {searchParams?.to || 'Destination'} • {searchParams?.date || 'Date'}
              </p>
            </div>
            <div className="flex bg-[#F4F5F7] p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
              {['Earliest', 'Cheapest', 'Premium First'].map(tab => (
                <button key={tab} onClick={() => setSortTab(tab)} className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition ${sortTab === tab ? 'bg-[#0033FF] text-white shadow-sm shadow-blue-500/20' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {BUS_DATA.map((bus) => {
              const isExpanded = expandedBusId === bus.id;
              const numPersons = selectedSeats.length;
              const totalBaseFare = bus.price * numPersons;
              const totalTaxes = 84 * numPersons;
              const totalFare = totalBaseFare + (numPersons > 0 ? totalTaxes : 0);
              
              return (
                <div key={bus.id} className={`bg-white rounded-[1.5rem] shadow-sm transition-all duration-300 overflow-hidden ${isExpanded ? 'border-[1.5px] border-[#0033FF]' : 'border border-gray-100'}`}>
                  {/* Card Header */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50/50">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-[#111827]">{bus.name}</h3>
                        <span className={`text-[8px] sm:text-[9px] font-extrabold px-2.5 py-0.5 rounded-full ${bus.badgeStyle}`}>{bus.badge}</span>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 mt-1">
                        <div className="text-center w-14 sm:w-16">
                          <div className="text-xl sm:text-2xl font-extrabold">{bus.dep}</div>
                          <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase mt-0.5 whitespace-nowrap">{searchParams?.from || bus.depLoc}</div>
                        </div>
                        <div className="flex-1 flex flex-col items-center w-20 sm:w-28 relative px-2">
                          <div className="text-[8px] font-extrabold text-gray-400 mb-1">{bus.dur}</div>
                          <div className="w-full h-[1.5px] bg-gray-200 relative flex items-center justify-between">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            <div className={`w-2 h-2 rounded-full ${bus.dotColor}`}></div>
                          </div>
                        </div>
                        <div className="text-center w-14 sm:w-16">
                          <div className="text-xl sm:text-2xl font-extrabold">{bus.arr}</div>
                          <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase mt-0.5 whitespace-nowrap">{searchParams?.to || bus.arrLoc}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                      <div className="text-left md:text-right mb-0 md:mb-3">
                        {bus.originalPrice && <div className="text-[10px] font-bold text-gray-400 line-through mb-0.5">₹{bus.originalPrice}</div>}
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#0033FF]">₹{bus.price}</div>
                        <div className="text-[9px] font-bold text-[#B74134] flex items-center justify-start md:justify-end gap-1 mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18v3h2v-3h12v3h2v-3H4zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" /></svg>
                          {bus.totalSeats} seats left
                        </div>
                      </div>
                      <button onClick={() => toggleAccordion(bus.id)} className={`bg-[#0033FF] hover:bg-blue-700 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm transition w-auto md:w-32`}>
                        {isExpanded ? 'HIDE SEATS' : 'SELECT SEATS'}
                      </button>
                    </div>
                  </div>

                  {/* Seat Selection Map */}
                  {isExpanded && (
                    <div className="bg-[#FAFAFA] p-4 sm:p-5 flex flex-col xl:flex-row gap-5">
                      <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 flex-1 shadow-sm border border-gray-50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                          <h2 className="text-sm font-extrabold text-gray-800">SELECT YOUR SEATS</h2>
                          <div className="flex flex-wrap items-center gap-3 text-[8px] sm:text-[9px] font-bold text-gray-600 uppercase tracking-wider">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-[#0033FF] rounded-sm"></div> AVAILABLE</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#0033FF] rounded-sm"></div> SELECTED</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#A3A3A3] rounded-sm"></div> BOOKED</div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center">
                          {renderDeck(LOWER_DECK, 'LOWER DECK', true)}
                          {renderDeck(UPPER_DECK, 'UPPER DECK', false)}
                        </div>
                      </div>

                      {/* Right Detail Panel */}
                      <div className="flex flex-col gap-4 w-full xl:w-72 shrink-0">
                        <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-50">
                          <h4 className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-3">BOARDING POINT</h4>
                          <div className="flex flex-col gap-2.5">
                            {BOARDING_POINTS.map(bp => {
                              const pointId = `${bp.time}-${bp.loc}`;
                              const isSelected = selectedBoarding === pointId;
                              return (
                                <div key={pointId} onClick={() => setSelectedBoarding(pointId)} className={`p-2.5 rounded-xl border cursor-pointer transition flex items-start gap-2.5 ${isSelected ? 'border-[#0033FF] bg-blue-50/40' : 'border-gray-100 hover:border-gray-300'}`}>
                                  <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#0033FF]' : 'border-gray-300'}`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0033FF]"></div>}
                                  </div>
                                  <div>
                                    <div className="font-extrabold text-xs text-gray-800">{bp.time} - {bp.loc}</div>
                                    <div className="text-[8px] font-bold text-gray-400 mt-0.5 leading-tight">{bp.desc}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-50">
                          <h4 className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-4">FARE DETAILS</h4>
                          <div className="flex items-center justify-between mb-2.5 text-xs font-bold text-gray-700">
                            <span>Seat {selectedSeats.join(', ') || 'None'} ({numPersons} pax)</span>
                            <span>₹{totalBaseFare.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-[10px] font-extrabold uppercase tracking-wide">
                            <span className="text-[#0B6B56]">TAXES & FEES</span>
                            <span className="text-[#0B6B56]">₹{numPersons > 0 ? totalTaxes.toLocaleString('en-IN') : 0}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs font-extrabold">TOTAL</span>
                            <span className="text-xl font-extrabold text-[#0033FF]">₹{totalFare.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        
                        <button disabled={numPersons === 0} onClick={() => handleProceed(bus)} className="w-full bg-[#A04000] hover:bg-[#8A3600] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-[11px] font-extrabold tracking-widest shadow-md transition mt-1">
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}