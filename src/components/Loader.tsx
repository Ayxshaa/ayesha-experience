
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power4.inOut'
    })
    .to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'expo.inOut'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div ref={logoRef} className="text-center">
        <h2 className="font-syncopate text-2xl tracking-[0.5em] mb-4">AYESHA</h2>
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
