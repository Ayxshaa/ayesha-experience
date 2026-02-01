
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SOCIAL_LINKS } from '@/constants/constants';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll('.char');
    const tl = gsap.timeline();

    // Reset initial states to ensure they are ready for animation
    gsap.set(chars, { y: '100%', opacity: 0 });

    // Animate the "3D" question headline - Starts shortly after load
    if (chars) {
      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.02,
        ease: 'power4.out'
      }, 0.5);
    }

    // Animate the lead text and links
    if (leadRef.current) {
      tl.fromTo(leadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        1.0
      );
    }
  }, []);

  const SplitText = ({ text }: { text: string }) => (
    <span className="inline-block overflow-hidden py-1">
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block origin-bottom will-change-transform">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col items-center text-center relative z-20">

        {/* Main Title: Refined, smaller font size with high tracking for cinematic feel */}
        <h2
          ref={titleRef}
          className="font-syncopate text-[10px] sm:text-xs md:text-sm lg:text-[0.75vw] font-bold tracking-[0.6em] uppercase pointer-events-none text-white block leading-tight"
        >
          <div className="flex flex-wrap justify-center text-[20px]">
            <SplitText text="WISH YOUR WEBSITE LIVES IN 3D ??" />
          </div>
        </h2>

        <div
          ref={leadRef}
          className="mt-20 md:mt-32 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 w-full max-w-5xl"
        >
          <div className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl text-center lg:text-left">
            <p className="mb-2 md:mb-4 opacity-80">
              We are a multidisciplinary studio at the intersection of art, design and technology.
            </p>
            <p className="opacity-50 text-xs sm:text-sm md:text-base italic font-medium tracking-wide">
              Crafting spatial experiences that breathe on the web.
            </p>
          </div>

          <div className="flex flex-row gap-8 text-[9px] md:text-[10px] font-syncopate tracking-widest opacity-40 uppercase">
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
              LinkedIn
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
              Github
            </a>
           
          </div>
        </div>
      </div>

      {/* Floating indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <span className="text-[8px] tracking-[0.4em] font-syncopate uppercase">Deep Dive</span>
        <div className="w-[1px] h-10 bg-white" />
      </div>
    </section>
  );
};

export default Hero;
