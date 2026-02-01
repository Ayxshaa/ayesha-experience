
import React, { useContext } from 'react';
import { NavigationContext } from '@/context/NavigationContext';

const Navigation: React.FC = () => {
  const { scrollToSection } = useContext(NavigationContext);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 pointer-events-none">
      <div className="pointer-events-auto">
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="group flex items-center gap-2 md:gap-3"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-500 bg-white/5 backdrop-blur-sm" />
          <span className="font-syncopate text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] font-bold">AYESHA.</span>
        </a>
      </div>

      <div className="hidden lg:flex gap-12 pointer-events-auto">
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="text-[10px] font-syncopate tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">HOME</a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-[10px] font-syncopate tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">ABOUT</a>
        <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="text-[10px] font-syncopate tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">VALUES</a>
        <a href="#cases" onClick={(e) => handleNavClick(e, 'cases')} className="text-[10px] font-syncopate tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">PROJECTS</a>
      </div>

      {/* <button className="pointer-events-auto flex flex-col gap-1 md:gap-1.5 group p-2">
        <div className="w-6 md:w-8 h-[1px] bg-white group-hover:translate-x-1 transition-transform" />
        <div className="w-4 md:w-6 h-[1px] bg-white group-hover:translate-x-2 transition-transform" />
        <div className="w-6 md:w-8 h-[1px] bg-white group-hover:translate-x-1 transition-transform" />
      </button> */}
    </nav>
  );
};

export default Navigation;
