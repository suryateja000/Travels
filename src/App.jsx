import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import PremiumBackground from './components/PremiumBackground'; // Import the new background
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import Routes from './components/sections/Routes';
import Footer from './components/sections/Footer';
import QuickBookWidget from './components/QuickBookWidget.jsx'

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1500); 
    }
  }, [isLoaded]);

  return (
    // Make sure the main wrapper is transparent so the background shows through
    <main className="relative text-[#181311] min-h-screen font-sans selection:bg-[#d85a2b] selection:text-white z-0">
      
      <PremiumBackground /> 
      
      <Loader progress={loadingProgress} isComplete={isLoaded} />
      <QuickBookWidget/>
      
      <Hero setProgress={setLoadingProgress} setLoaded={setIsLoaded} />
      <Intro />
      <Routes />
      <Footer />
    </main>
  );
}

export default App;