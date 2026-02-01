
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/constants/constants';

gsap.registerPlugin(ScrollTrigger);

const Cases: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.project-item');
    if (!items) return;

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-40 px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 md:mb-20 flex justify-between items-end border-b border-white/10 pb-6 md:pb-10">
          <h2 className="font-syncopate text-lg md:text-3xl tracking-tight opacity-50">SELECTED CASES</h2>
          {/* <span className="text-[9px] md:text-xs font-syncopate opacity-30 uppercase tracking-widest hidden sm:block">VIEW ALL PROJECTS</span> */}
        </header>

        <div className="space-y-24 md:space-y-40">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="project-item group relative cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-10">
                <div className="relative z-10 flex-1 order-2 lg:order-1">
                  <span className="block text-[9px] md:text-xs font-syncopate opacity-40 mb-3 md:mb-4 tracking-widest uppercase">
                    {project.year} / {project.category}
                  </span>
                  <h3 className="font-syncopate text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase group-hover:italic transition-all duration-700 leading-none">
                    {project.title}
                  </h3>
                  <div className="mt-6 md:mt-8 space-y-1 overflow-hidden">
                    {project.description.map((line, i) => (
                      <p
                        key={i}
                        className="text-base md:text-xl font-light opacity-60 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-6">
                    {project.deployedLink && (
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-sm border text-[11px] md:text-sm font-syncopate tracking-widest uppercase transition-all duration-300 hover:scale-105"
                        style={{
                          borderColor: project.color,
                          color: project.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = project.color;
                          e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = project.color;
                        }}
                      >
                        <span>Live</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-sm border text-[11px] md:text-sm font-syncopate tracking-widest uppercase transition-all duration-300 hover:scale-105"
                        style={{
                          borderColor: project.color,
                          color: project.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = project.color;
                          e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = project.color;
                        }}
                      >
                        <span>GitHub</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative w-full lg:w-[40%] aspect-[4/3] sm:aspect-video lg:aspect-square overflow-hidden group-hover:scale-105 transition-transform duration-1000 ease-out order-1 lg:order-2 rounded-sm">
                  <img
                    src={`https://picsum.photos/seed/${project.id}/800/1000`}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                    style={{ background: project.color }}
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 md:-bottom-10 left-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
