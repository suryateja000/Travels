const STEPS = ['Search', 'Select', 'Seats', 'Details', 'Payment'];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#181311]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between md:justify-start md:gap-0 overflow-x-auto hide-scrollbar">
        {STEPS.map((step, i) => {
          const done   = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step} className="flex items-center shrink-0">
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${
                  done ? 'text-[#181311]/40' : active ? 'text-[#181311] font-bold' : 'text-[#181311]/20'
                }`}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex items-center mx-4 md:mx-8">
                  <div className={`h-[1px] w-8 md:w-16 transition-colors duration-500 ${done ? 'bg-[#181311]/20' : 'bg-[#181311]/5'}`}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}