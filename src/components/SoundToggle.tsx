
import React from 'react';

interface Props {
  isMuted: boolean;
  onToggle: () => void;
}

const SoundToggle: React.FC<Props> = ({ isMuted, onToggle }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <button 
        onClick={onToggle}
        className="group relative flex items-center justify-center w-12 h-12 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500"
      >
        <div className="flex gap-[2px] items-center">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-[2px] bg-current rounded-full transition-all duration-300 ${
                isMuted ? 'h-1' : 'animate-pulse'
              }`}
              style={{ 
                height: isMuted ? '4px' : `${Math.random() * 12 + 4}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 text-[10px] font-syncopate tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
          {isMuted ? 'Sound Off' : 'Sound On'}
        </span>
      </button>
    </div>
  );
};

export default SoundToggle;
