import { useState } from 'react';

const BOARDING = [
  { name: 'Miyapur Metro',  time: '21:00' },
  { name: 'KPHB Bus Stop',  time: '21:15' },
  { name: 'Ameerpet',       time: '21:30' },
  { name: 'Mehdipatnam',    time: '21:45' },
];
const DROPPING = [
  { name: 'Majestic Bus Stand', time: '05:30' },
  { name: 'Silk Board',         time: '05:50' },
  { name: 'Koramangala',        time: '06:05' },
  { name: 'HSR Layout',         time: '06:20' },
];

function buildDeckSeats(prefix, takenIndexes) {
  const seats = [];
  for (let row = 1; row <= 7; row++) {
    const cols = ['A','B','C'];
    cols.forEach((col, ci) => {
      const globalIdx = (row - 1) * 3 + ci;
      seats.push({
        id: `${prefix}${row}${col}`,
        label: `${prefix.toUpperCase()}${row}${col}`,
        row,
        col,
        taken: takenIndexes.includes(globalIdx),
      });
    });
  }
  return seats;
}

function DeckGrid({ prefix, seats, selected, onToggle }) {
  const rows = [1,2,3,4,5,6,7];
  return (
    <div className="flex flex-col gap-2">
      {rows.map(r => {
        const rowSeats = seats.filter(s => s.row === r);
        const sA = rowSeats.find(s => s.col === 'A');
        const sB = rowSeats.find(s => s.col === 'B');
        const sC = rowSeats.find(s => s.col === 'C');
        return (
          <div key={r} className="flex items-center gap-1.5">
            <span className="w-4 text-[10px] text-[#181311]/30 text-center shrink-0">{r}</span>
            {[sA, sB].map(s => s ? (
              <SeatBox key={s.id} seat={s} selected={selected.includes(s.id)} onToggle={onToggle} />
            ) : (
              <div key={`empty-${r}`} className="w-14 h-12 shrink-0"/>
            ))}
            {/* aisle gap */}
            <div className="w-4 shrink-0"/>
            {sC ? (
              <SeatBox seat={sC} selected={selected.includes(sC.id)} onToggle={onToggle} />
            ) : (
              <div className="w-14 h-12 shrink-0"/>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SeatBox({ seat, selected, onToggle }) {
  if (seat.taken) {
    return (
      <div className="w-14 h-12 rounded-md border border-[#181311]/10 bg-[#181311]/6 flex flex-col items-center justify-center gap-0.5 shrink-0 cursor-not-allowed opacity-40">
        <span className="text-[10px] font-medium text-[#181311]/50">{seat.label}</span>
      </div>
    );
  }
  return (
    <button
      onClick={() => onToggle(seat.id)}
      className={`w-14 h-12 rounded-md border flex flex-col items-center justify-center gap-0.5 shrink-0 transition-all duration-200 ${
        selected
          ? 'bg-[#181311] border-[#181311] scale-105'
          : 'bg-white border-[#181311]/15 hover:border-[#181311]/50 hover:scale-102'
      }`}
    >
      <span className={`text-[11px] font-medium ${selected ? 'text-[#f6ead6]' : 'text-[#181311]'}`}>{seat.label}</span>
      <span className={`text-[9px] ${selected ? 'text-[#f6ead6]/60' : 'text-[#181311]/40'}`}>₹1450</span>
    </button>
  );
}

export default function SeatSelection({ bus, takenLower, takenUpper, search, inline, onContinue, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boarding, setBoarding]           = useState(0);
  const [dropping, setDropping]           = useState(0);

  const lowerSeats = buildDeckSeats('L', takenLower);
  const upperSeats = buildDeckSeats('U', takenUpper);

  const toggleSeat = (id) => {
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const total = selectedSeats.length * bus.price;

  return (
    <div className={inline ? '' : 'min-h-screen bg-[#F5F2EE] px-6 md:px-12 py-8'}>
      {!inline && (
        <div className="max-w-6xl mx-auto mb-6">
          <button onClick={onBack}
            className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-[#181311]/50 hover:text-[#181311] transition-colors mb-6">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L4 6l4 4"/></svg>
            Back to results
          </button>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#d85a2b] font-bold mb-2">Seat selection</p>
          <h2 className="font-['Libre_Bodoni'] text-[#181311] text-3xl mb-1">{bus.name}</h2>
          <p className="text-[#181311]/50 text-sm">{search.from} → {search.to} · {bus.dep} — {bus.arr} · {bus.dur}</p>
        </div>
      )}

      <div className={inline ? '' : 'max-w-6xl mx-auto'}>
        {/* Boarding & Dropping */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#181311]/8">
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold mb-4">Boarding point</p>
            <div className="flex flex-col gap-0">
              {BOARDING.map((p,i) => (
                <button key={i} onClick={() => setBoarding(i)}
                  className="flex items-center gap-3 py-3 border-b border-[#181311]/6 last:border-b-0 text-left w-full transition-colors group">
                  <div className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center transition-all ${boarding===i ? 'border-[#181311]' : 'border-[#181311]/30 group-hover:border-[#181311]/60'}`}>
                    {boarding===i && <div className="w-1.5 h-1.5 rounded-full bg-[#181311]"/>}
                  </div>
                  <span className={`text-sm flex-1 ${boarding===i ? 'text-[#181311] font-medium' : 'text-[#181311]/55'}`}>{p.name}</span>
                  <span className="font-mono text-[10px] text-[#181311]/35">{p.time}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold mb-4">Dropping point</p>
            <div className="flex flex-col gap-0">
              {DROPPING.map((p,i) => (
                <button key={i} onClick={() => setDropping(i)}
                  className="flex items-center gap-3 py-3 border-b border-[#181311]/6 last:border-b-0 text-left w-full transition-colors group">
                  <div className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center transition-all ${dropping===i ? 'border-[#181311]' : 'border-[#181311]/30 group-hover:border-[#181311]/60'}`}>
                    {dropping===i && <div className="w-1.5 h-1.5 rounded-full bg-[#181311]"/>}
                  </div>
                  <span className={`text-sm flex-1 ${dropping===i ? 'text-[#181311] font-medium' : 'text-[#181311]/55'}`}>{p.name}</span>
                  <span className="font-mono text-[10px] text-[#181311]/35">{p.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seat map + Panel */}
        <div className="grid grid-cols-[1fr_240px] gap-8 items-start">

          {/* Seat maps: Lower + Upper side by side */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {/* Lower deck */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold">Lower berth</span>
                  <div className="flex-1 h-px bg-[#181311]/8"/>
                </div>
                <div className="border border-[#181311]/10 rounded-xl p-4 bg-white/50 relative">
                  {/* driver */}
                  <div className="absolute top-2 right-2 w-7 h-7 border border-[#181311]/10 rounded-full flex items-center justify-center opacity-25">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="8" cy="5" r="2.5"/><path d="M2.5 14c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5"/>
                    </svg>
                  </div>
                  <DeckGrid prefix="L" seats={lowerSeats} selected={selectedSeats} onToggle={toggleSeat}/>
                </div>
              </div>

              {/* Upper deck */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold">Upper berth</span>
                  <div className="flex-1 h-px bg-[#181311]/8"/>
                </div>
                <div className="border border-[#181311]/10 rounded-xl p-4 bg-white/50 relative">
                  <div className="absolute top-2 right-2 w-7 h-7 border border-[#181311]/10 rounded-full flex items-center justify-center opacity-10">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="8" cy="5" r="2.5"/><path d="M2.5 14c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5"/>
                    </svg>
                  </div>
                  <DeckGrid prefix="U" seats={upperSeats} selected={selectedSeats} onToggle={toggleSeat}/>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-5 mt-4">
              {[
                { cls: 'bg-white border-[#181311]/15', label: 'Available' },
                { cls: 'bg-[#181311] border-[#181311]', label: 'Selected' },
                { cls: 'bg-[#181311]/6 border-[#181311]/10 opacity-40', label: 'Taken' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-4 h-3 rounded-[3px] border ${l.cls}`}/>
                  <span className="text-[11px] text-[#181311]/50">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary panel */}
          <div className="border border-[#181311]/10 rounded-xl p-5 bg-white/70 sticky top-24">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#181311]/40 font-bold mb-3">Your selection</p>
            <p className="text-[13px] font-medium text-[#181311] mb-0.5">{bus.name}</p>
            <p className="text-[11px] text-[#181311]/50 mb-4">{search.from} → {search.to} · {bus.dep}</p>

            <div className="h-px bg-[#181311]/8 mb-4"/>

            {/* Selected seats */}
            <div className="flex flex-col gap-2 min-h-[48px] mb-5">
              {selectedSeats.length === 0 ? (
                <p className="text-[12px] text-[#181311]/35 italic">No seats selected</p>
              ) : (
                selectedSeats.map(sid => (
                  <div key={sid} className="flex items-center justify-between bg-[#F5F2EE] rounded-lg px-3 py-2">
                    <div>
                      <span className="text-[12px] font-medium text-[#181311]">
                        {sid.startsWith('L') ? 'Lower' : 'Upper'} {sid.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#181311]/60">₹{bus.price.toLocaleString('en-IN')}</span>
                      <button onClick={() => toggleSeat(sid)} className="text-[#181311]/30 hover:text-[#181311] text-base leading-none">×</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="h-px bg-[#181311]/8 mb-4"/>

            <div className="flex justify-between text-[12px] text-[#181311]/60 mb-1.5">
              <span>Seats selected</span><span>{selectedSeats.length}</span>
            </div>
            <div className="flex justify-between text-[12px] text-[#181311]/60 mb-3">
              <span>Per seat</span><span>₹{bus.price.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-px bg-[#181311]/8 mb-3"/>
            <div className="flex justify-between text-[15px] font-medium text-[#181311] mb-5">
              <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => selectedSeats.length > 0 && onContinue(selectedSeats)}
              disabled={selectedSeats.length === 0}
              className={`w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3.5 rounded-full transition-all duration-300 ${
                selectedSeats.length > 0
                  ? 'bg-[#181311] text-[#f6ead6] hover:bg-[#d85a2b]'
                  : 'bg-[#181311]/8 text-[#181311]/30 cursor-not-allowed'
              }`}
            >
              Continue
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 6h8M6 2l4 4-4 4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}