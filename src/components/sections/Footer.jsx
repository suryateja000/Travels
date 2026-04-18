export default function Footer() {
  return (
    <footer className="bg-transparent pt-24 pb-12 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="font-display text-4xl font-bold mb-6 text-[#181311]">Charan <span className="text-[#d85a2b]">Travels</span></h2>
          <p className="text-[#181311]/60 max-w-sm mb-6">Join us for a journey filled with absolute comfort. Reserve your seat online with a few seamless steps.</p>
          <button className="bg-[#181311] text-[#f6ead6] px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-[#d85a2b] transition-colors duration-300">
            Secure Booking
          </button>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-[#181311]">Quick Links</h4>
          <ul className="space-y-4 text-[#181311]/60 text-sm">
            <li><a href="#" className="hover:text-[#d85a2b]">Manage Ticket</a></li>
            <li><a href="#" className="hover:text-[#d85a2b]">Download Ticket</a></li>
            <li><a href="#" className="hover:text-[#d85a2b]">Cancel Ticket</a></li>
            <li><a href="#" className="hover:text-[#d85a2b]">Check Refund Status</a></li>
            <li><a href="#" className="hover:text-[#d85a2b]">FAQ & Policies</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-[#181311]">Head Office</h4>
          <ul className="space-y-4 text-[#181311]/60 text-sm">
            <li>5-178A, B3, 201 Road, Lal Bahadur Nagar, Mangalagiri, Andhra Pradesh</li>
            <li className="text-[#181311] font-bold">charantravels@gmail.com</li>
            <li className="text-[#d85a2b] font-bold font-display text-2xl">99496 92324</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#181311]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#181311]/40 uppercase tracking-widest font-bold">
        <p>2026 © Charan Travels. All Rights Reserved.</p>
        <p>Powered By Ezee Info Cloud Solutions</p>
      </div>
    </footer>
  );
}