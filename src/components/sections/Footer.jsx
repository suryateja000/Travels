export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0c0a09] text-[#f6ead6] px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-10 md:pb-12">

      {/* Top Rule */}
      <div className="max-w-7xl mx-auto border-t border-[#f6ead6]/8 mb-16 md:mb-20"></div>

      {/* Main Grid: Brand col + 3 link cols */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-24">

        {/* COL 1: Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
          <a
            href="/"
            className="font-['Libre_Bodoni'] text-[#f6ead6] text-base tracking-[0.35em] uppercase font-normal"
          >
            Charan Travels
          </a>
          <p className="text-[#f6ead6]/40 text-sm leading-relaxed font-light max-w-[220px]">
            Premium intercity bus travel across South India. Two decades of journeys, each one refined.
          </p>
        </div>

        {/* COL 2: Routes */}
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#f6ead6]/30 font-bold">
            Routes
          </p>
          <ul className="flex flex-col gap-3">
            {[
              'Hyderabad → Bangalore',
              'Hyderabad → Chennai',
              'Hyderabad → Mumbai',
              'All routes',
            ].map((route) => (
              <li key={route}>
                <a
                  href="#"
                  className="text-[#f6ead6]/55 text-sm font-light hover:text-[#f6ead6] transition-colors duration-300 leading-relaxed"
                >
                  {route}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: Company */}
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#f6ead6]/30 font-bold">
            Company
          </p>
          <ul className="flex flex-col gap-3">
            {['About us', 'Careers', 'Press', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#f6ead6]/55 text-sm font-light hover:text-[#f6ead6] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4: Support */}
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#f6ead6]/30 font-bold">
            Support
          </p>
          <ul className="flex flex-col gap-3">
            {['Help centre', 'Track journey', 'Refund policy'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#f6ead6]/55 text-sm font-light hover:text-[#f6ead6] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="tel:+919849692324"
                className="text-[#f6ead6]/70 text-sm font-light hover:text-[#f6ead6] transition-colors duration-300 tracking-wide"
              >
                +91 98496 92324
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar — matches screenshot exactly */}
      <div className="max-w-7xl mx-auto border-t border-[#f6ead6]/8 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#f6ead6]/25 font-medium">
          © 2026 Charan Travels. All rights reserved.
        </p>
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#f6ead6]/25 font-medium">
          GSTIN: 36AAAXX0000X1Z0
        </p>
      </div>

    </footer>
  );
}