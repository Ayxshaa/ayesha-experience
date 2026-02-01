
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  { id: '01', title: 'Creative Frontend', description: 'Turning ideas into interactive, visually rich web experiences.' },
  { id: '02', title: 'Motion & UI Design', description: 'Crafting smooth animations that guide users and feel natural.' },
  { id: '03', title: 'Three.js & WebGL', description: 'Building immersive 3D scenes that make the web feel alive.' },
  { id: '04', title: 'Creative Logic', description: 'Blending design thinking with clean code to solve real problems.' },
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.exp-item');
    if (items) {
      items.forEach((item) => {
        const line = item.querySelector('.line');
        const content = item.querySelector('.content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' })
          .fromTo(content, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      });
    }
  }, []);

  return (
    <section className="py-20 md:py-40 px-6 md:px-12 lg:px-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32">
          <h2 className="font-syncopate text-white text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-2 md:mb-4 opacity-20 leading-none">
            CAPABILITIES
          </h2>
          <p className="font-syncopate text-[9px] md:text-sm tracking-[0.3em] opacity-40 ml-1 md:ml-2">CORE COMPETENCIES</p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 md:gap-y-12">
          {CAPABILITIES.map((cap) => (
            <div key={cap.id} className="exp-item group relative py-8 md:py-12">
              <div className="line absolute top-0 left-0 w-full h-[1px] bg-white/20 origin-left" />
              <div className="content flex items-start gap-4 md:gap-8">
                <span className="font-syncopate text-[10px] md:text-xs opacity-30 group-hover:opacity-100 transition-opacity duration-500 pt-1 md:pt-2">
                  {cap.id}
                </span>
                <div className="space-y-3 md:space-y-4">
                  <h3 className="font-syncopate text-xl md:text-3xl font-bold tracking-tight uppercase group-hover:text-blue-500 transition-colors duration-500">
                    {cap.title}
                  </h3>
                  <p className="text-sm md:text-lg font-light opacity-50 max-w-md group-hover:opacity-80 transition-opacity duration-500">
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 w-full">
          <div className="mb-10 md:mb-16">
            <h2 className="font-syncopate text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-2 md:mb-4 opacity-20 leading-none">
              Work Experience
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mt-4 " />
          </div>

          <div className="exp-item group relative py-8 md:py-12 border-t border-white/5">
            <div className="line absolute top-0 left-0 w-full h-[1px] bg-white/20 origin-left" />
            <div className="content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-3 space-y-1">
                <h3 className="font-syncopate text-lg md:text-xl font-bold tracking-tight uppercase group-hover:text-blue-500 transition-colors duration-500">
                  Wavelaps
                </h3>
                <span className="font-syncopate text-[10px] md:text-xs opacity-40 block tracking-wider">Sep 2025 – Present</span>
              </div>

              <div className="md:col-span-3">
                <h4 className="font-syncopate text-xs md:text-sm font-bold opacity-70 uppercase tracking-widest text-blue-400/80">
                  Frontend Developer
                </h4>
              </div>

              <div className="md:col-span-6 space-y-6">
                <p className="text-sm md:text-lg font-light opacity-60 leading-relaxed group-hover:opacity-90 transition-opacity duration-500">
                  At Wavelaps, I worked on the main website and the XRCH Hackathon page, building smooth, interactive experiences with React. I created reusable components, added animations to bring the UI to life, and integrated NodeMailer for automated emails and form workflows. I also worked with Cloudflare to improve performance, security, and deployment reliability.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['JavaScript', 'React.js', 'HTML', 'CSS', 'GSAP'].map((tech) => (
                    <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-[9px] font-syncopate uppercase tracking-widest opacity-50 hover:opacity-100 hover:border-white/40 transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Experience;
