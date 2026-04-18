export default function Features() {
  return (
    <section className="bg-white py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="font-display text-5xl font-bold mb-6 text-[#181311]">The Charan Standard</h2>
        <p className="max-w-2xl mx-auto text-[#181311]/60 text-lg">We offer a complete end-to-end travel experience with our professional crew, round-the-clock command centre, and uncompromising luxury.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Transparent Fares", desc: "We partner with top carriers to bring you the best deals without hidden fees." },
          { title: "Curated Cabins", desc: "Unwind in our clean, secure, and highly sanitized sleeper berths." },
          { title: "Frictionless Booking", desc: "A streamlined digital experience makes securing your seat effortless." },
          { title: "Concierge Crew", desc: "Our trained staff handles your luggage and ensures a seamless check-in." }
        ].map((feature, i) => (
          <div key={i} className="bg-[#faf7f2] p-8 rounded-2xl hover:bg-[#181311] hover:text-[#f6ead6] transition-colors duration-500 group">
            <div className="w-12 h-12 bg-[#f6ead6] group-hover:bg-[#d85a2b] group-hover:text-[#181311] rounded-full mb-6 flex items-center justify-center font-display font-bold text-xl transition-colors duration-500">
              {i + 1}
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-[#181311]/60 group-hover:text-[#f6ead6]/70 leading-relaxed transition-colors duration-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}