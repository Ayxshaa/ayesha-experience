
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 md:py-20 px-6 md:px-12 lg:px-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-10">
        <div className="space-y-4 md:space-y-6">
          <h2 className="font-syncopate text-xl sm:text-2xl md:text-4xl tracking-tighter opacity-80 uppercase leading-tight">
            READY TO MAKE <br className="hidden sm:block" /> GOOD ART?
          </h2>
          <a href="mailto:hello@studio.com" className="block text-base md:text-lg font-light hover:underline opacity-60 hover:opacity-100 transition-opacity">
           https://ayeshashhh.netlify.app/
          </a>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end lg:items-end gap-10 lg:gap-10 w-full lg:w-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-6 md:gap-10 text-[9px] md:text-[10px] font-syncopate tracking-widest opacity-40">
            <div className="space-y-1 md:space-y-2">
              <p className="opacity-100 text-white/60">BUILDING</p>
              <p>Web • 3D • AI</p>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="opacity-100 text-white/60">LEARNING</p>
              <p>DSA • AI Automation</p>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="opacity-100 text-white/60">SHIPPING</p>
              <p>Daily on GitHub</p>
            </div>
          </div>
          
          <div className="text-[8px] md:text-[10px] font-syncopate tracking-[0.2em] md:tracking-[0.3em] opacity-20 mt-auto">
            © 2026 AYESHA QURESHI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
