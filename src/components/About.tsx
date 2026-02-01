
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll('.reveal-char');
    if (chars) {
      gsap.fromTo(chars,
        {
          opacity: 0.05,
          color: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(2px)',
        },
        {
          opacity: 1,
          color: 'rgba(255, 255, 255, 1)',
          filter: 'blur(0px)',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.5,
          }
        }
      );
    }
  }, []);

  const WordSplit: React.FC<{ text: string }> = ({ text }) => (
    <span className="mr-[0.2em] md:mr-[0.3em] mb-[0.1em] inline-block whitespace-nowrap">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="reveal-char inline-block will-change-transform transition-colors duration-300"
        >
          {char}
        </span>
      ))}
    </span>
  );

  const PHILOSOPHY_TEXT = [
    "I", "BUILD", "WHERE", "CODE", "MEETS", "CREATIVITY.",
    "TURNING", "SCREENS", "INTO", "LIVING", "EXPERIENCES.",
    "WITH", "ANIMATION", "AND", "THREE.JS", "MAGIC.",
    "STILL", "LEARNING.", "STILL", "CREATING."
  ];


  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 md:py-32 px-6 md:px-12 lg:px-20 flex items-center bg-black/80">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
              <h2 className="font-syncopate text-[10px] tracking-[0.6em] opacity-30 uppercase">
                My Philosophy
              </h2>
              <div className="w-12 h-[1px] bg-white/20" />
              <p className="text-[10px] font-syncopate tracking-[0.2em] opacity-20 uppercase leading-loose hidden lg:block">
                Merging logic <br /> with visceral <br /> emotion.
              </p>
            </div>
          </div>

          <div ref={textRef} className="lg:col-span-9">
            <div className="font-syncopate text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter uppercase flex flex-wrap items-start">
              {PHILOSOPHY_TEXT.map((word, i) => (
                <WordSplit key={i} text={word} />
              ))}
            </div>

            <div className="mt-12 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-32 text-base md:text-lg font-light opacity-60 leading-relaxed border-t border-white/5 pt-12 md:pt-16">
              <div className="space-y-4 md:space-y-6">
                <span className="block font-syncopate text-[9px] md:text-[10px] tracking-[0.4em] opacity-40 uppercase">The Craft</span>
                <p>
                  I don’t just build websites. I create experiences.
                  Every detail, animation, and interaction is designed to feel smooth, meaningful, and alive.
                </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <span className="block font-syncopate text-[9px] md:text-[10px] tracking-[0.4em] opacity-40 uppercase">The Impact</span>
                <p>
                  I blend creativity with modern tech like Three.js to build interactive web experiences that people remember. Simple. Emotional. Different.                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />
    </section>
  );
};

export default About;
