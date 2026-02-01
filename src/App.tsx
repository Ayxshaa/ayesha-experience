import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Cases from './components/Cases';
import Loader from './components/Loader';
import SoundToggle from './components/SoundToggle';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { NavigationContext, type NavigationContextType } from './context/NavigationContext';
import { useLenis } from './hooks/useLenis';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { scrollToElement } = useLenis();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulated load
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      hero: heroRef,
      about: aboutRef,
      experience: experienceRef,
      cases: casesRef,
    };

    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      scrollToElement(ref.current);
    }
  };

  const navigationContextValue: NavigationContextType = {
    scrollToSection,
  };

  return (
    <NavigationContext.Provider value={navigationContextValue}>
      <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        {loading && <Loader />}
        
        <Navigation />
        <SoundToggle isMuted={isMuted} onToggle={() => setIsMuted(!isMuted)} />

        {/* WebGL Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas 
            shadows 
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* HTML Content */}
        <main className="relative z-10 w-full">
          <div ref={heroRef}>
            <Hero />
          </div>
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={experienceRef}>
            <Experience />
          </div>
          <div ref={casesRef}>
            <Cases />
          </div>
          <Footer />
        </main>

        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50 border-[10px] border-white/5 mix-blend-difference" />
      </div>
    </NavigationContext.Provider>
  );
};

export default App;
